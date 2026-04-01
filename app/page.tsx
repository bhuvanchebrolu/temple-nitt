"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // 1. Logic to show only between April 6th and May 24th (48 days)
    const now = new Date();
    const startDate = new Date("2026-03-06T00:00:00");
    const endDate = new Date("2026-05-24T23:59:59");

    if (now >= startDate && now <= endDate) {
      // Check if user has already closed it in this session to avoid annoyance
      const isClosed = sessionStorage.getItem("mandalaOverlayClosed");
      if (!isClosed) {
        // Small delay for better UX
        const timer = setTimeout(() => setShowOverlay(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const closeOverlay = () => {
    setShowOverlay(false);
    sessionStorage.setItem("mandalaOverlayClosed", "true");
  };

  return (
    <main className="relative">
      {/* --- MANDALA POOJA OVERLAY --- */}
      {showOverlay && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 backdrop-blur-md bg-maroon/20 animate-in fade-in duration-500">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={closeOverlay} />

          <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Close Button */}
            <button
              onClick={closeOverlay}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all z-20"
            >
              ✕
            </button>

            {/* Content Link */}
            <Link href="/kumbabishekam#mandala-poojai" className="block p-1">
              <div className="p-8 md:p-12 border-4 border-dashed border-orange-100 rounded-[2.8rem] text-center hover:border-orange-300 transition-colors">
                <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Upcoming Event
                </span>

                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-950 mb-4">
                  Mandala <span className="italic text-primary">Poojai</span>
                </h2>

                <p className="text-gray-600 mb-8 font-light italic">
                  Commencing from the evening of 6th April. Join us for divine
                  grace and celebration.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-orange-50 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase text-orange-400">
                      Flowers
                    </p>
                    <p className="font-bold text-gray-900">₹500</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase text-orange-400">
                      Abishegam
                    </p>
                    <p className="font-bold text-gray-900">₹1000</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase text-orange-400">
                      Full Seva
                    </p>
                    <p className="font-bold text-gray-900">₹1500</p>
                  </div>
                </div>

                <div className="inline-block px-8 py-4 bg-maroon text-white font-bold rounded-full text-xs tracking-widest hover:bg-primary transition-all shadow-lg">
                  VIEW DETAILS & SPONSOR
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* --- EXISTING HOME CONTENT --- */}
      <section className="relative py-12 md:py-20 bg-[#faf7f2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10 md:gap-12">
          {/* Left Content */}
          <div className="z-10 text-center md:text-left order-2 md:order-1">
            <h2 className="text-[var(--primary)] font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
              Sri Vidya Ganapathi Temple
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight mb-6">
              Preserving our <br />
              <span className="italic">Dharma & Heritage</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Established in 1968, the temple stands as a guardian of the
              campus, removing obstacles and fostering spiritual peace through
              Veda Rakshanam and traditional Seva.
            </p>

            {/* Responsive Button Group */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2">
              <Link
                href="/about"
                className="border border-gray-300 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-bold rounded-sm hover:bg-gray-50 transition text-center"
              >
                VIEW MORE
              </Link>
              <Link
                href="/kumbabishekam"
                className="border border-gray-300 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-bold rounded-sm hover:bg-gray-50 transition text-center"
              >
                KUMBABISHEKAM
              </Link>
              <Link
                href="/services"
                className="border border-gray-300 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-xs font-bold rounded-sm hover:bg-gray-50 transition text-center"
              >
                MANDALA POOJA
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[300px] md:h-[500px] w-full bg-gray-200 rounded-tr-[60px] md:rounded-tr-[100px] rounded-bl-[60px] md:rounded-bl-[100px] overflow-hidden shadow-2xl order-1 md:order-2">
            <div className="absolute inset-0 bg-[url('/temple.jpg')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-orange-900/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Narrative History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gray-400 mb-2">
              The Genesis
            </h2>
            <h3 className="text-3xl font-serif font-bold text-gray-900">
              A Legacy Since 1968
            </h3>
          </div>
          <div className="prose prose-lg text-gray-600 font-light leading-relaxed italic text-justify">
            <p className="mb-6">
              Way back in{" "}
              <span className="text-red-900 font-semibold italic">1968</span>,
              when the first batch of the then{" "}
              <span className="text-red-900 font-medium">
                Regional Engineering College, Trichy (RECT)
              </span>{" "}
              was still in study, a mishap occurred that highlighted the
              spiritual need to install a deity of{" "}
              <span className="text-gray-950 font-medium">Lord Ganapathi</span>
              —the remover of all obstacles. This was felt deeply, as the
              college campus was built by clearing several villages and their
              local shrines.
            </p>
            <p className="mb-6">
              During those early years, a group of dedicated students led by{" "}
              <span className="text-gray-900 font-semibold">
                Mr. G.V. Raman
              </span>{" "}
              met with the Principal to propose the installation. Receiving
              immediate clearance, they were allocated space near the garage of
              that time. Under the initiative of the future{" "}
              <span className="text-gray-900 font-semibold">
                Capt. Srinivasan
              </span>
              , the students traveled to Trichy in search of a Ganesha idol.
            </p>
            <p className="mb-6">
              A beautiful idol was found and purchased for{" "}
              <span className="font-medium text-gray-900">Rs. 300</span>. As{" "}
              <span className="text-gray-950 font-medium italic">
                Vinayaka Chaturthi
              </span>{" "}
              approached, the then Assistant Registrar,{" "}
              <span className="text-gray-900 font-semibold">
                Mr. Nagashesaiah
              </span>
              , helped construct a platform and a modest shed. The Ganesha was
              formally installed at the location now identified in front of the
              current{" "}
              <span className="text-gray-950 font-medium">
                Shri Vidya Ganapathi Sannidhi
              </span>
              .
            </p>
            <p className="mb-6">
              The <span className="italic">Gurukkal</span> from the{" "}
              <span className="text-gray-900 font-semibold">
                Ucchi Pillaiyar Temple
              </span>{" "}
              was brought to perform the rituals, and a sacred{" "}
              <span className="text-orange-800 font-medium">
                Sandalwood Paste (Sandana Kappu) Alankaram
              </span>{" "}
              was offered to the deity. From that day forward, the student
              community began contributing one or two rupees monthly to maintain
              the temple.
            </p>
            <p className="">
              Contractors{" "}
              <span className="text-gray-900 font-semibold">
                Raghava and Veera
              </span>{" "}
              provided the structural frame, while students paid for the
              finishing and painting. The{" "}
              <span className="text-green-800 font-medium">
                Campus Garden Club
              </span>{" "}
              joined the effort by planting a variety of flower-bearing shrubs,
              which were lovingly watered and tended to by the students every
              single day.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats/Services */}
      <section className="py-16 bg-[#faf7f2] border-t border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          {/* Item 1 */}
          <div className="flex flex-col items-center min-w-[120px]">
            <p className="text-3xl font-serif font-bold text-[var(--primary)]">
              1968
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mt-2">
              Established
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center min-w-[120px]">
            <p className="text-3xl font-serif font-bold text-[var(--primary)]">
              2026
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mt-2">
              Upcoming Events
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center min-w-[120px]">
            <p className="text-3xl font-serif font-bold text-[var(--primary)]">
              Dharma
            </p>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold mt-2">
              Seva
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
