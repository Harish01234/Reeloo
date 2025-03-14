"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-color1 p-6 rounded-lg shadow-md"
    >
      <div>
        <label className="block text-color4 font-medium mb-1">Title</label>
        <input
          type="text"
          className={`w-full p-2 border rounded bg-color2 text-color4 focus:outline-none focus:ring-2 focus:ring-color3 ${errors.title ? "border-red-500" : "border-color3"}`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div>
        <label className="block text-color4 font-medium mb-1">Description</label>
        <textarea
          className={`w-full p-2 border rounded bg-color2 text-color4 focus:outline-none focus:ring-2 focus:ring-color3 ${errors.description ? "border-red-500" : "border-color3"}`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>

      <div>
        <label className="block text-color4 font-medium mb-1">Upload Video</label>
        <FileUpload
          fileType="video"
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
        />
        {uploadProgress > 0 && (
          <div className="w-full bg-color2 rounded-full h-2.5 mt-2">
            <div
              className="bg-color3 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 rounded bg-color4 text-white hover:bg-color3 transition disabled:opacity-50 flex items-center justify-center"
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing Video...
          </>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}
