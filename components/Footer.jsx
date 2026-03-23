import Link from "next/link";
import { Github, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 w-full py-8 text-white/60">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg font-bold text-white mb-1">WeatherWaves</p>
          <p className="text-sm">
            © {currentYear} | Designed with precision.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium tracking-wide flex items-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <span className="text-white font-semibold">Bhanu Sharma</span>
          </p>
          <div className="flex items-center gap-4 mt-1">
            <Link
              href="https://bhanu-sharma.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300"
              title="Personal Website"
            >
              <Globe className="w-4 h-4" />
            </Link>
            <Link
              href="https://github.com/bhanu-sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="text-sm flex gap-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/test" className="hover:text-white transition-colors">
            Test Lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
