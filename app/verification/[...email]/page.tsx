"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/app/components/Navbar"; // Adjust the path if needed

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.email) {
      setEmail(decodeURIComponent(params.email as string)); // Decode %40 to @
    }
  }, [params]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setPopup({ message: "Email not found. Please try again.", type: "error" });
      return;
    }

    setLoading(true);
    setPopup(null);

    try {
      const requestBody = JSON.stringify({ email, otp: Number(otp) });

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({ message: data.message, type: "success" });
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setPopup({ message: data.message || "Verification failed. Please try again.", type: "error" });
      }
    } catch (error) {
      setPopup({ message: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Centered Content */}
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-5 border border-gray-300 mt-10">
          <h2 className="text-2xl font-bold text-center text-blue-600">Verify Your Account</h2>

          <form onSubmit={handleVerification} className="space-y-4">
            {/* Email Field (Disabled) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email || ""}
                disabled
                className="w-full p-3 border border-gray-300 rounded-md mt-1 bg-gray-100 text-gray-700"
              />
            </div>

            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Submit Button with Loader */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Popup Notification (Non-overlapping) */}
      {popup && (
  <div
    className="fixed bottom-5 right-5 p-4 rounded-lg flex items-center space-x-3 shadow-lg border border-gray-300 w-80 bg-opacity-90 backdrop-blur-md z-50"
    style={{
      backgroundColor: popup.type === "success" ? "#34D399" : "#EF4444",
      color: "#ffffff",
    }}
  >
    {popup.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
    <p className="text-sm flex-1">{popup.message}</p>
    <button onClick={() => setPopup(null)} className="text-white hover:text-gray-200">
      ✕
    </button>
  </div>
)}

    </div>
  );
};

export default VerificationPage;
