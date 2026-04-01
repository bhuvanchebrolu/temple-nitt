import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-8 relative overflow-hidden font-sans">
      {/* Subtle background glow to match the rest of the site */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-white text-2xl font-serif font-bold tracking-tight">
            Sri Vidhya Ganapathi{" "}
            <span className="text-orange-500/80 italic font-medium">
              Temple
            </span>
          </h3>
          <p className="text-sm leading-relaxed font-light max-w-xs">
            An oasis of Peace and Tranquility within NIT, Trichy where one can
            recharge Spiritually to face the world with confidence and inner
            courage; with compassion and love.
          </p>
        </div>

        {/* Quick Links Section - Reconfigured to 2 Columns */}
        <div className="space-y-6">
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em]">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-m font-light">
            <li>
              <Link
                href="/about"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/prayer"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Universal Prayer
              </Link>
            </li>
            <li>
              <Link
                href="/kumbabishekam"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Kumbabishekam
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Pooja Services
              </Link>
            </li>
            <li>
              <Link
                href="/staff"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Temple Committee
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/timings"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Timings
              </Link>
            </li>
            <li>
              <Link
                href="/calendar"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Special Pooja Calendar
              </Link>
            </li>
            <li>
              <Link
                href="/classes"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Balavikas Classes
              </Link>
            </li>
            <li>
              <Link
                href="/saraswati_hall"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Saraswati Mandapam
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className="hover:text-orange-400 transition-colors duration-300 block"
              >
                Library
              </Link>
            </li>
            {/* New links added below will automatically fill the two columns */}
          </ul>
        </div>

        {/* Contact Section with Vertical Divider */}
        <div className="relative md:pl-12">
          {/* Vertical Divider - Visible on medium screens and up */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-700 to-transparent" />

          <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-6">
            Contact Us
          </h4>
          <div className="space-y-6">
            <div className="group">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                Location
              </p>
              <p className="text-sm font-light leading-relaxed">
                Shri Vidya Ganapathi Temple,
                <br /> NIT Trichy, Tamil Nadu
              </p>
            </div>
            <div className="group">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                Email
              </p>
              <p className="text-sm font-light truncate selection:bg-orange-500/30">
                srividyaganapathitemplenitt@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-600">
        <p>© 2026 NIT Trichy Temple. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
