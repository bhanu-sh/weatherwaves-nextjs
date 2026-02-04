"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import LiquidGlassCard from "@/components/LiquidGlassCard";

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
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url("/assets/weathers/${weatherType}.jpg")`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="block text-center text-3xl font-bold mb-6">
          WeatherWaves
        </Link>

        {/* ================= SEARCH ================= */}
        <LiquidGlassCard className="w-full max-w-xl mx-auto mb-10">
          <form
            onSubmit={onSearch}
            className="h-16 flex items-center px-4"
          >
            <input
              className="flex-1 bg-transparent outline-none text-white placeholder-white/70 text-lg"
              placeholder="Enter city name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="ml-4 px-5 py-2 rounded-xl bg-white/90 text-black font-semibold"
            >
              Search
            </button>
          </form>
        </LiquidGlassCard>

        {/* ================= CURRENT WEATHER ================= */}
        <LiquidGlassCard className="w-full max-w-md mx-auto mb-10">
          <div className="h-[280px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{current.name}</h2>
              <p className="text-5xl font-bold mt-2">
                {Math.round(current.main.temp)}°C
              </p>

              <div className="flex items-center gap-2 mt-2">
                <img
                  src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
                  className="w-10"
                  alt=""
                />
                <p className="text-lg">{current.weather[0].main}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>💨 Wind: {Math.round(current.wind.speed)} m/s</p>
              <p>💧 Humidity: {current.main.humidity}%</p>
              <p>🌡 Pressure: {current.main.pressure} hPa</p>
              <p>👁 Visibility: {current.visibility / 1000} km</p>
            </div>
          </div>
        </LiquidGlassCard>

        {/* ================= HOURLY ================= */}
        <h3 className="text-xl font-semibold mb-3">Next 24 Hours</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {forecast.slice(0, 8).map((item, i) => (
            <LiquidGlassCard key={i}>
              <div className="h-[140px] p-4 text-center flex flex-col justify-between">
                <p className="text-sm">
                  {new Date(item.dt_txt).getHours()}:00
                </p>

                <img
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  className="mx-auto w-10"
                  alt=""
                />

                <p className="font-semibold">
                  {Math.round(item.main.temp)}°
                </p>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* ================= 5 DAY ================= */}
        <h3 className="text-xl font-semibold mb-3">5 Day Forecast</h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {forecast
            .filter((_, i) => i % 8 === 0)
            .map((day, i) => (
              <LiquidGlassCard key={i}>
                <div className="h-[160px] p-4 text-center flex flex-col justify-between">
                  <p className="text-sm">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>

                  <img
                    src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    className="mx-auto w-10"
                    alt=""
                  />

                  <p className="font-semibold">
                    {Math.round(day.main.temp)}°
                  </p>
                </div>
              </LiquidGlassCard>
            ))}
        </div>
      </div>
    </div>
  );
}