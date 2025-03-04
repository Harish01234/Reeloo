"use client";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-6">
      {/* Navbar */}
      <nav className="bg-color4 text-color1 p-4 w-full max-w-4xl rounded-xl shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        {session && (
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:inline">{session.user?.name} ({session.user?.email})</span>
            <button onClick={() => window.location.href = "/upload"} className="px-4 py-2 bg-color3 text-color1 rounded-lg hover:bg-color2 transition">
              Upload Video
            </button>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Video Section */}
      <div className="mt-8 bg-color2 text-color4 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center">
        <VideoFeed videos={videos} />
      </div>
    </div>
  );
}
