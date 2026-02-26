"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Search, ChevronLeft, MapPin, Droplets, Wind, Gauge, Eye, Thermometer } from "lucide-react";
import Loader from "@/components/Loader";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import Image from "next/image";

export default function WeatherPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city);
  const router = useRouter();

  const [search, setSearch] = useState(city);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const [currentRes, forecastRes] = await Promise.all([
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: city,
            units: "metric",
            appid: process.env.NEXT_PUBLIC_API_KEY,
          },
        }),
        axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: city,
            units: "metric",
            appid: process.env.NEXT_PUBLIC_API_KEY,
          },
        }),
      ]);

      setCurrent(currentRes.data);
      setForecast(forecastRes.data.list);
    } catch {
      toast.error("City not found");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const onSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/${encodeURIComponent(search.trim())}`);
  };

  if (loading) return <Loader />;
  if (!current) return null;

  const weatherType = current.weather?.[0]?.main || "Clear";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-white overflow-hidden font-sans"
      style={{
        backgroundImage: `url("/assets/weathers/${weatherType}.jpg")`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pb-20 overflow-y-auto h-screen custom-scrollbar">
        {/* ================= HEADER ================= */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="text-2xl font-bold tracking-wide">WeatherWaves</span>
          </Link>

          {/* ================= SEARCH ================= */}
          <LiquidGlassCard className="w-full md:w-96 rounded-2xl">
            <form onSubmit={onSearch} className="flex items-center px-4 py-2 hover:bg-white/5 transition-colors focus-within:bg-white/10 rounded-2xl">
              <Search className="w-5 h-5 text-white/70 mr-3" />
              <input
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/50 text-base"
                placeholder="Search another city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </LiquidGlassCard>
        </motion.div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: CURRENT WEATHER */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <LiquidGlassCard className="h-full rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-8 flex flex-col h-full bg-gradient-to-br from-white/10 to-transparent">
                <div className="flex items-center gap-3 text-white/90 mb-4">
                  <MapPin className="w-6 h-6 text-red-400" />
                  <h2 className="text-3xl font-bold tracking-tight">{current.name}</h2>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <h1 className="text-7xl font-extrabold tracking-tighter">
                    {Math.round(current.main.temp)}°
                  </h1>
                  <img
                    src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
                    className="w-28 h-28 drop-shadow-xl scale-125"
                    alt={current.weather[0].main}
                  />
                </div>

                <p className="text-xl font-medium mt-4 capitalize text-white/90">
                  {current.weather[0].description}
                </p>

                <div className="mt-auto pt-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Wind className="w-5 h-5 text-blue-300" />
                      <div>
                        <p className="text-xs text-white/60">Wind</p>
                        <p className="font-semibold text-sm">{Math.round(current.wind.speed)} m/s</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Droplets className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-xs text-white/60">Humidity</p>
                        <p className="font-semibold text-sm">{current.main.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Gauge className="w-5 h-5 text-purple-300" />
                      <div>
                        <p className="text-xs text-white/60">Pressure</p>
                        <p className="font-semibold text-sm">{current.main.pressure} hPa</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Eye className="w-5 h-5 text-gray-300" />
                      <div>
                        <p className="text-xs text-white/60">Visibility</p>
                        <p className="font-semibold text-sm">{(current.visibility / 1000).toFixed(1)} km</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* RIGHT: FORECASTS */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* HOURLY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="w-5 h-5 text-white/80" />
                <h3 className="text-lg font-semibold tracking-wide text-white/90">Today's Forecast</h3>
              </div>
              
              <LiquidGlassCard className="rounded-3xl p-6">
                <div className="flex flex-row overflow-x-auto gap-4 custom-scrollbar pb-2">
                  {forecast.slice(0, 8).map((item, i) => (
                    <div key={i} className="flex-shrink-0 w-24 flex flex-col items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <p className="text-sm text-white/80 font-medium">
                        {new Date(item.dt_txt).getHours()}:00
                      </p>
                      <img
                        src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        className="w-12 h-12 my-2 drop-shadow-md"
                        alt=""
                      />
                      <p className="font-bold text-lg">
                        {Math.round(item.main.temp)}°
                      </p>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* 5 DAY */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold tracking-wide text-white/90 mb-4">5-Day Forecast</h3>
              
              <LiquidGlassCard className="rounded-3xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecast
                    .filter((_, i) => i % 8 === 0)
                    .map((day, i) => (
                      <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-lg transition-all">
                        <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">
                          {new Date(day.dt_txt).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <div className="w-16 h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-full mb-3 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                          <img
                            src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                            className="w-10 h-10 drop-shadow-md"
                            alt=""
                          />
                        </div>
                        <p className="font-bold text-xl">
                          {Math.round(day.main.temp)}°
                        </p>
                      </div>
                    ))}
                </div>
              </LiquidGlassCard>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
