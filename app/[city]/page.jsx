import WeatherView from "@/components/WeatherView";
import axios from "axios";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.city);
  
  try {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        units: "metric",
        appid: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    
    const data = res.data;
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;
    
    return {
      title: `Weather in ${data.name} - ${temp}°C ${condition}`,
      description: `Current weather in ${data.name}: ${temp}°C with ${data.weather[0].description}. Check out the 5-day forecast.`,
      openGraph: {
        title: `Weather in ${data.name}`,
        description: `Currently ${temp}°C and ${condition} in ${data.name}.`,
        images: [`https://openweathermap.org/img/wn/${icon}@4x.png`],
      },
      icons: {
        icon: `https://openweathermap.org/img/wn/${icon}@4x.png`,
        apple: `https://openweathermap.org/img/wn/${icon}@4x.png`,
      },
    };
  } catch (error) {
    return {
      title: "Weather Not Found",
      description: "Could not find weather for this city.",
    };
  }
}

async function getWeatherData(city) {
  try {
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
    return { current: currentRes.data, forecast: forecastRes.data.list };
  } catch (error) {
    return null;
  }
}

export default async function WeatherPage({ params }) {
  const resolvedParams = await params;
  const city = decodeURIComponent(resolvedParams.city);
  const data = await getWeatherData(city);

  return (
    <WeatherView 
      city={city} 
      initialData={data?.current} 
      initialForecast={data?.forecast} 
    />
  );
}
