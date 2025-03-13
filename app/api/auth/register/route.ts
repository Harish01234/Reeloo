import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

import nodemailer from 'nodemailer';
// Ensure the database is connected before handling requests
connectToDatabase();

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, SES, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address here (e.g., gmail)
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });
  
  // Generate a 6-digit OTP using basic JS logic
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  // Function to send OTP email
  const sendOTPEmail = async (email: string, otp: string) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  };

export async function POST(req: NextRequest) {
   
    try {
        const { email, password } = await req.json();

        if(!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        if(user)
        {
            return NextResponse.json({error:"user already exists with this email"},{status:400})
        }    

        // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); 
        await User.create({email,password,otp,otpExpiry});

        // Send OTP email   
        await sendOTPEmail(email, otp);

        return NextResponse.json({message:"user registered succesfully"},{status:201})

    } catch (error) {
        
        return NextResponse.json({error:"failed to register user"},{status:500})
    }
}
