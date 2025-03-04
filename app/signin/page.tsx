'use client';

import Login from "../components/signin";

import { useSession, signOut } from "next-auth/react";

export default function Signin() {
  const { data: session } = useSession();
  return (
    <div className="bg-color1 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-color4 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10">
        <h1 className="text-3xl font-extrabold tracking-wide">Reeloo</h1>
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-color2 transition">Home</a>
          <a href="#" className="hover:text-color2 transition">About</a>
          <a href="#" className="hover:text-color2 transition">Contact</a>
        </div>
        <div className="flex space-x-4">
         {
          session && (
            <button
              onClick={() => signOut()}
              className="bg-color3 text-white px-5 py-2 rounded-lg hover:bg-color2 transition font-semibold"
            >
              Logout
            </button>
          )
         }
         
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center mt-20">
        <Login />
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-color4 text-white text-center py-4 mt-auto">
        <p className="text-sm">© 2024 Reeloo. All rights reserved.</p>
      </footer>
    </div>
  );
}
