import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | WeatherWaves",
    default: "WeatherWaves - Premium Weather Experience",
  },
  description:
    "A premium weather application tracking real-time conditions with stunning visuals.",
  keywords: [
    "weather",
    "forecast",
    "real-time",
    "stunning visuals",
    "weather app",
  ],
  authors: [{ name: "WeatherWaves Team" }],
  creator: "WeatherWaves Team",
  publisher: "WeatherWaves",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "WeatherWaves",
    description: "Experience real-time weather data, stunningly presented.",
    url: "https://weatherwaves.vercel.app",
    siteName: "WeatherWaves",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherWaves",
    description: "Experience real-time weather data, stunningly presented.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WeatherWaves",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "16px",
            },
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
