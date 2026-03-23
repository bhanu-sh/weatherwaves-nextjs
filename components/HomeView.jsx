"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, CloudSun } from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import toast from "react-hot-toast";

export default function HomeView() {
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
    <div className="relative flex flex-col items-center justify-center min-h-screen font-sans text-white">
      {/* Fixed background to prevent mobile scroll gaps */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/assets/weathers/Clear.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-3xl px-4 sm:px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-8 w-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CloudSun className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
          <h1 className="text-4xl sm:text-6xl md:text-7xl text-white font-extrabold tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] text-center wrap-break-word w-full">
            WeatherWaves
          </h1>
        </motion.div>

        <p className="text-white/90 text-xl md:text-2xl font-medium mb-12 text-center drop-shadow-md max-w-xl">
          Experience real-time weather data, stunningly presented.
        </p>

        <LiquidGlassCard className="w-full sm:w-125 md:w-150 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 flex flex-col gap-5 bg-black/10">
            {/* Search Form */}
            <form
              onSubmit={searchLocation}
              className="flex items-center w-full bg-black/20 focus-within:bg-black/40 border border-white/20 focus-within:border-white/50 rounded-2xl px-4 py-2 h-16 transition-all duration-300 shadow-inner group"
            >
              <Search className="text-white/70 group-focus-within:text-white w-6 h-6 mr-3 shrink-0 transition-colors" />
              <input
                className="flex-1 w-full bg-transparent text-white text-lg sm:text-xl placeholder-white/50 outline-none"
                placeholder="Search for a city..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="ml-3 px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md shrink-0 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Go
              </button>
            </form>

            <div className="flex items-center justify-center py-1">
              <div className="h-px bg-white/20 w-full" />
              <span className="px-4 text-white/50 text-sm font-semibold uppercase tracking-wider">
                or
              </span>
              <div className="h-px bg-white/20 w-full" />
            </div>

            {/* Current Location */}
            <button
              onClick={getLocation}
              disabled={isLoading}
              className="w-full h-16 flex items-center justify-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-white font-bold text-lg shadow-lg hover:shadow-white/10 disabled:opacity-50 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
              ) : (
                <MapPin className="w-6 h-6 text-emerald-400" />
              )}
              <span>
                {isLoading ? "Locating..." : "Use Current Location"}
              </span>
            </button>
          </div>
        </LiquidGlassCard>
      </motion.div>
    </div>
  );
}
