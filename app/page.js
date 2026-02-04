"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const searchLocation = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    router.push(`/${location.trim()}`);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`,
        );
        const data = res.data;

        if (data?.name) router.push(`/${data.name}`);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
  };
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url("/assets/weathers/Clear.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4">
        <Link href="/" className="text-white ">
          <h1 className="text-center text-4xl text-shadow-lg text-shadow-black/50 font-bold">
            WeatherWaves
          </h1>
        </Link>

        <div className="mx-5 text-center my-3">
          <form onSubmit={searchLocation}>
            <div className="mb-4">
              <input
                className="px-4 py-2 border rounded-xl border-white"
                placeholder="Enter City Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-lg">
                Search
              </button>
            </div>
          </form>

          <button className="btn text-white" onClick={getLocation}>
            <i className="fa-solid fa-location-crosshairs"></i> Get Current
            Location
          </button>
        </div>
      </div>
    </div>
  );
}
