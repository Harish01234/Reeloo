'use client'
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-color1 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-color4 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">Reeloo</h1>
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-color2 transition">Home</a>
          <a href="/dashboard" className="hover:text-color2 transition">Dashboard</a>
          <a href="/about" className="hover:text-color2 transition">About</a>
          <a href="#" className="hover:text-color2 transition">Contact</a>
        </div>
        <div className="flex space-x-4">
          {session ? (
            <button onClick={() => signOut()} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-semibold">
              Sign Out
            </button>
          ) : (
            <>
              <button onClick={() => window.location.href = "/signup"} className="bg-color3 text-white px-5 py-2 rounded-lg hover:bg-color2 transition font-semibold">
                Sign Up
              </button>
              <button onClick={() => window.location.href = "/signin"} className="bg-color2 text-white px-5 py-2 rounded-lg hover:bg-color3 transition font-semibold">
                Login
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-5xl font-extrabold text-color4 leading-tight">
          Welcome to Reeloo
        </h2>
        <p className="text-xl text-gray-500 mt-4 max-w-2xl">
          Your go-to platform for amazing experiences. Discover, connect, and enjoy seamless interactions.
        </p>
        <button className="mt-8 bg-color3 text-white px-8 py-3 rounded-lg hover:bg-color2 transition font-semibold text-lg">
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
