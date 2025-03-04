import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

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

        await User.create({email,password})

        return NextResponse.json({message:"user registered succesfully"},{status:201})

    } catch (error) {
        
        return NextResponse.json({error:"failed to register user"},{status:500})
    }
}
