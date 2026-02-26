"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Wind, CloudSun } from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchLocation = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    router.push(`/${encodeURIComponent(location.trim())}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = res.data;

          if (data?.name) {
            router.push(`/${encodeURIComponent(data.name)}`);
          }
        } catch (error) {
          console.error("Error: ", error);
          toast.error("Failed to get current location weather.");
          setIsLoading(false);
        }
      },
      () => {
        toast.error("Location access denied.");
        setIsLoading(false);
      }
    );
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen font-sans"
      style={{
        backgroundImage: `url("/assets/weathers/Clear.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Absolute overlay for modern contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />

      <motion.div
        className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CloudSun className="w-12 h-12 text-white/90 drop-shadow-lg" />
          <h1 className="text-5xl md:text-6xl text-white font-bold tracking-tight drop-shadow-xl">
            WeatherWaves
          </h1>
        </motion.div>

        <p className="text-white/80 text-lg md:text-xl font-medium mb-12 text-center drop-shadow-md">
          Discover realtime weather, stunningly presented.
        </p>

        <LiquidGlassCard className="w-full">
          <div className="p-2 sm:p-3 flex flex-col sm:flex-row gap-2 bg-white/5 rounded-3xl">
            <form
              onSubmit={searchLocation}
              className="flex-1 flex items-center bg-transparent border border-white/20 rounded-2xl px-4 py-3 sm:py-0 h-14 hover:bg-white/5 transition-colors focus-within:border-white/50 focus-within:bg-white/10"
            >
              <Search className="text-white/70 w-5 h-5 mr-3" />
              <input
                className="w-full bg-transparent text-white text-lg placeholder-white/50 outline-none"
                placeholder="Search for a city..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="hidden sm:block ml-2 px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                Go
              </button>
            </form>

            <button
              onClick={getLocation}
              disabled={isLoading}
              className="h-14 px-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-600/80 hover:bg-blue-600 transition-colors border border-blue-400/30 text-white font-medium shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
              <span className="whitespace-nowrap">
                {isLoading ? "Locating..." : "Current"}
              </span>
            </button>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </div>
  );
}
