"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const allLinks = [
  { name: "Home", href: "/" },
  { name: "Universal Prayer", href: "/prayer" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Kumbabishekam", href: "/kumbabishekam" },
  { name: "Temple Committee", href: "/staff" },
  { name: "Saraswati Mandapam", href: "/saraswati_hall" },
  { name: "History", href: "/history" },
  { name: "Articles", href: "/articles" },
  { name: "Timings", href: "/timings" },
  { name: "Pooja Services", href: "/services" },
  { name: "Special Pooja Calendar 2026", href: "/calendar" },
  { name: "Balavihar Classes", href: "/classes" },
  { name: "Library", href: "/library" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/70 backdrop-blur-md border-gray-200/50 shadow-sm"
          : "bg-white border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative z-[60]">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="text-xl font-serif font-bold text-primary tracking-tight group-hover:text-primary/80 transition-colors">
            Sri Vidhya Ganapathi Temple
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-grey-900 font-bold">
            NIT Trichy
          </span>
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-primary transition-colors focus:outline-none cursor-pointer group"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-[80px] right-0 w-full md:max-w-xs bg-white border-l border-b border-gray-100 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top 
          /* CRITICAL FIXES BELOW */
          max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar
          ${
            isOpen
              ? "opacity-100 translate-y-0 scale-y-100 pointer-events-auto"
              : "opacity-0 -translate-y-4 scale-y-95 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col p-3 gap-1">
          {allLinks.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: isOpen ? `${index * 20}ms` : "0ms" }}
              className={`text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-2 mb-4 h-px w-full bg-gray-100 md:hidden" />
        </nav>
      </div>

      {/* Inline Style for the scrollbar to keep it sleek */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </header>
  );
}
