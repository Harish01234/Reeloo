'use client';

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";

export default function Profile() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    apiClient.getVideos().then((data) => setVideos(data));
  }, []);

  return (
    <div className="bg-color1 min-h-screen flex flex-col items-center px-6 py-8 text-color4">
      {/* Navbar */}
      <nav className="w-full max-w-4xl bg-color4 text-white p-4 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">Reeloo</h1>
        {session && (
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline font-medium">{session.user?.name} ({session.user?.email})</span>
            <button onClick={() => window.location.href = "/upload"} className="px-5 py-2 bg-color3 text-white rounded-lg hover:bg-color2 transition font-semibold">
              Upload Video
            </button>
            <button
              onClick={() => signOut()}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Profile Header */}
      <section className="mt-10 bg-color2 text-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold">Welcome, {session?.user?.name || "User"}!</h2>
        <p className="text-lg mt-2 text-gray-200">Manage your videos and enjoy seamless interactions.</p>
      </section>

      {/* Video Section */}
      <div className="mt-8 bg-color3 text-color1 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Your Uploaded Videos</h3>
        <VideoFeed videos={videos} />
      </div>
    </div>
  );
}
