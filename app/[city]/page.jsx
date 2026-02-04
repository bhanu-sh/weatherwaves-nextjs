"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

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
        backgroundImage: `url("/weathers/${weatherType}.jpg")`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="block text-center text-3xl font-bold mb-6">
          WeatherWaves
        </Link>

        {/* Search */}
        <form onSubmit={onSearch} className="mb-8">
          <div className="flex glass rounded-xl overflow-hidden">
            <input
              className="flex-1 bg-transparent px-4 py-3 outline-none placeholder-white/70"
              placeholder="Enter city name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-white text-black px-6 font-semibold">
              Search
            </button>
          </div>
        </form>

        {/* Current Weather */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="glass p-6">
            <h2 className="text-2xl font-semibold">{current.name}</h2>
            <p className="text-5xl font-bold my-2">
              {Math.round(current.main.temp)}°C
            </p>
            <img
              src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
              alt=""
              className="w-14"
            />
            <p className="text-lg">{current.weather[0].main}</p>
          </div>

          <div className="glass p-6 space-y-2">
            <p>Humidity: {current.main.humidity}%</p>
            <p>Visibility: {current.visibility / 1000} km</p>
            <p>Wind: {Math.round(current.wind.speed)} m/s</p>
            <p>Pressure: {current.main.pressure} hPa</p>
          </div>
        </div>

        {/* Hourly Forecast */}
        <h3 className="text-xl font-semibold mb-3">Next 24 Hours</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {forecast.slice(0, 8).map((item, i) => (
            <div key={i} className="glass-card min-w-[100px]">
              <p className="text-sm">
                {new Date(item.dt_txt).getHours()}:00
              </p>
              <img
                src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt=""
                className="mx-auto"
              />
              <p className="font-semibold">
                {Math.round(item.main.temp)}°
              </p>
            </div>
          ))}
        </div>

        {/* 5 Day Forecast */}
        <h3 className="text-xl font-semibold mb-3">5 Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {forecast
            .filter((_, i) => i % 8 === 0)
            .map((day, i) => (
              <div key={i} className="glass-card">
                <p className="text-sm">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt=""
                  className="mx-auto"
                />
                <p className="font-semibold">
                  {Math.round(day.main.temp)}°
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}