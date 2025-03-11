"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import Reels from "../components/reelcomponent";
import { IVideo } from "@/models/Video";
import { Menu, X, Home, Info, Mail, Upload } from "lucide-react";
import { signOut } from "next-auth/react";
import Navbar from "@/app/components/Navbar";

interface Video {
  _id: string;
  videoUrl: string;
}

export default function ReelsPage() {
  const [reelsState, setReels] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const reels: IVideo[] = await apiClient.getVideos();
        const formattedReels = reels.map((video) => ({
          _id: video._id?.toString() || "",
          videoUrl: video.videoUrl,
        }));
        setReels(formattedReels);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-color4 text-color1 text-xl">
        Loading Reels...
      </div>
    );
  }

  return (
    <div className="bg-color4 min-h-screen">
     {/*navbar*/}
      <Navbar />
     
      {/* Reels Section */}
      <div className="flex justify-center items-center mt-16">
        <Reels videos={reelsState} />
      </div>
    </div>
  );
}
