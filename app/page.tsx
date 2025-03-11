'use client'
import { useSession, signOut } from "next-auth/react";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-color1 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-5xl font-extrabold text-color4 leading-tight">
          Welcome to Reeloo
        </h2>
        <p className="text-xl text-gray-500 mt-4 max-w-2xl">
          Your go-to platform for amazing experiences. Discover, connect, and enjoy seamless interactions.
        </p>
        <button onClick={() => window.location.href = "/upload"} className="mt-8 bg-color3 text-white px-8 py-3 rounded-lg hover:bg-color2 transition font-semibold text-lg">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full bg-color4 text-white text-center py-4 mt-6">
        <p className="text-sm">© 2024 Reeloo. All rights reserved.</p>
      </footer>
    </div>
  );
}
