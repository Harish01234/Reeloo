import { useState, useEffect, useRef, useMemo } from "react";
import { IKVideo } from "imagekitio-next";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Video {
    _id: string;
    videoUrl: string;
}

interface ReelsProps {
    videos: Video[];
}

export default function Reels({ videos }: ReelsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Shuffle videos once when videos change
    const shuffledVideos = useMemo(() => {
        return [...videos].sort(() => Math.random() - 0.5);
    }, [videos]);

    useEffect(() => {
        const playCurrentVideo = async () => {
            const currentVideo = videoRefs.current[currentIndex];
            if (!currentVideo) return;

            try {
                if (hasInteracted) {
                    currentVideo.muted = false;
                    setIsMuted(false);
                }
                await currentVideo.play();
            } catch (err) {
                console.log('Playback failed:', err);
            }
        };

        // Pause all videos except the current one
        videoRefs.current.forEach((video, index) => {
            if (video && index !== currentIndex) {
                video.pause();
            }
        });

        playCurrentVideo();
    }, [currentIndex, hasInteracted]);

    const handleUserInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
            setIsMuted(false);
        }
    };

    const handleScroll = (e: React.WheelEvent) => {
        handleUserInteraction();
        setCurrentIndex(prev => Math.max(0, Math.min(prev + (e.deltaY > 0 ? 1 : -1), shuffledVideos.length - 1)));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        handleUserInteraction();
        if (e.key === "ArrowDown") {
            setCurrentIndex(prev => Math.min(prev + 1, shuffledVideos.length - 1));
        } else if (e.key === "ArrowUp") {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        }
    };

    return (
        <div
            className="relative w-full h-screen flex flex-col items-center overflow-hidden bg-black"
            onWheel={handleScroll}
            onKeyDown={handleKeyPress}
            onClick={handleUserInteraction}
            tabIndex={0}
            autoFocus
        >
            {shuffledVideos.map((video, index) => (
                <div
                    key={video._id}
                    className={`absolute w-full h-full flex justify-center items-center transition-transform duration-500 ${
                        index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                >
                    {/* ✅ FIX: Ensures the video is always fully visible on PC & Mobile */}
                    <div className="relative w-full h-full flex justify-center items-center">
                        <IKVideo
                            path={video.videoUrl}
                            transformation={[{ height: "1920", width: "1080" }]}
                            autoPlay={index === currentIndex}
                            muted={!hasInteracted && isMuted}
                            loop
                            playsInline
                            className="w-auto h-full max-h-screen object-contain"
                            onLoadedMetadata={(e) => {
                                videoRefs.current[index] = e.target as HTMLVideoElement;
                                if (index === 0 && !hasInteracted) {
                                    (e.target as HTMLVideoElement).play().catch(() => null);
                                }
                            }}
                        />
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={(e) => {
                    handleUserInteraction();
                    setCurrentIndex(prev => Math.max(prev - 1, 0));
                    e.stopPropagation();
                }}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-gray-900 bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
            >
                <ChevronUp size={24} />
            </button>
            <button
                onClick={(e) => {
                    handleUserInteraction();
                    setCurrentIndex(prev => Math.min(prev + 1, shuffledVideos.length - 1));
                    e.stopPropagation();
                }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-gray-900 bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
            >
                <ChevronDown size={24} />
            </button>
        </div>
    );
}
