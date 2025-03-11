"use client";

import React, { useState } from "react";
import { Menu, X, Home, Info, Video, Upload } from "lucide-react";
import { signOut ,useSession} from "next-auth/react";

function Navbar() {

    const { data: session } = useSession();
      const [menuOpen, setMenuOpen] = useState(false);

    
  return (
    <nav className="w-full bg-color4 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10">
    <h1 className="text-3xl font-extrabold tracking-wide">Reeloo</h1>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center gap-x-6 text-lg font-medium">
      <a href="/" className="hover:text-color2 transition">Home</a>
      <a href="/about" className="hover:text-color2 transition">About</a>
      <a href="/reels" className="hover:text-color2 transition">Reels</a>
     <a href="/upload" className="hover:text-color2 transition">Upload</a>

     {session ? (
  <button
    onClick={() => signOut()}
    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
  >
    Logout
  </button>
) : (
  <button
    onClick={() => window.location.href = "/signin"}
    className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
  >
    Login
  </button>
)}

    </div>


    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-white focus:outline-none"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={28} /> : <Menu size={28} />}
    </button>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="absolute top-16 left-0 w-full bg-color4 flex flex-col items-center space-y-4 py-4 shadow-lg md:hidden">
        <a href="/" className="flex items-center space-x-2 text-lg hover:text-color2 transition">
          <Home size={22} /> <span>Home</span>
        </a>
        <a href="/about" className="flex items-center space-x-2 text-lg hover:text-color2 transition">
          <Info size={22} /> <span>About</span>
        </a>
        <a href="/reels" className="flex items-center space-x-2 text-lg hover:text-color2 transition">
          <Video size={22} /> <span>Reels</span>
        </a>
        <a href="/upload" className="flex items-center space-x-2 text-lg hover:text-color2 transition">
          <Upload size={22} /> <span>Upload</span>
        </a>
        <button
          onClick={() => signOut()}
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>
    )}
  </nav>

  )
}

export default Navbar