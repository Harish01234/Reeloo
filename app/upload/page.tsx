"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import Navbar from "../components/Navbar";

export default function VideoUploadPage() {
  return (
    <div className="bg-color2 min-h-screen text-color4 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 py-16 flex flex-col items-center gap-12">
        <div className="max-w-2xl w-full bg-color1 p-10 rounded-2xl shadow-lg border border-color3">
          <h1 className="text-4xl font-bold text-color4 mb-8 text-center">Upload New Reel</h1>
          <VideoUploadForm />
        </div>
      </div>
    </div>
  );
}
