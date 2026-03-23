import HomeView from "@/components/HomeView";

export const metadata = {
  title: "WeatherWaves - Premium Weather Experience",
  description: "Experience real-time weather data, stunningly presented. Get current conditions and a 5-day forecast for any city in the world.",
  openGraph: {
    title: "WeatherWaves - Premium Weather Experience",
    description: "Experience real-time weather data, stunningly presented.",
    images: ["/assets/weathers/Clear.jpg"],
  },
};

export default function Home() {
  return <HomeView />;
}
