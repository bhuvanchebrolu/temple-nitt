"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type Pooja = {
  _id: string;
  name: string;
  type: "daily" | "special";
  description: string;
  timing: string;
  charges: string;
};

const POOJA_QUERY = `*[_type == "pooja"] | order(name asc)`;

const mandalaCharges = [
  { type: "Flowers", price: "Rs. 500" },
  { type: "Abishegam & Prasadam", price: "Rs. 1,000" },
  { type: "Abishegam, Flowers & Prasadam", price: "Rs. 1,500" },
];

export default function PoojariServices() {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const data = await client.fetch(POOJA_QUERY);
        setPoojas(data);
      } catch (error) {
        console.error("Sanity fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoojas();
  }, []);

  const dailyPoojas = poojas.filter((p) => p.type === "daily");
  const specialPoojas = poojas.filter((p) => p.type === "special");

  return (
    <main className="relative min-h-screen pt-10 pb-40 bg-[#fffefc] text-slate-900 overflow-hidden font-sans">
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* --- Header Section --- */}
        <header className="max-w-4xl mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/5 border border-primary/10 shadow-[0_0_20px_rgba(180,83,9,0.05)]">
            <h2 className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary">
              Rituals & Offerings
            </h2>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 text-gray-950">
            Pooja{" "}
            <span className="italic text-primary/80 font-medium">Services</span>
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-light max-w-2xl">
            Experience traditional Vedic ceremonies performed with precision,
            devotion, and absolute adherence to sacred Shastras.
          </p>
        </header>

        {/* --- 1. FEATURED SECTION: MANDALA POOJAI --- */}
        <section className="mb-32">
          <div className="relative p-1 md:p-12 rounded-[4rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-xl overflow-hidden">
            <div className="absolute right-[-2%] top-[-10%] text-[15rem] font-serif text-orange-200/20 pointer-events-none select-none">
              ॐ
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  Upcoming Special Pooja
                </span>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 text-balance">
                  Mandala <span className="italic text-primary">Poojai</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light italic">
                  The Shri Vidya Ganapathi Temple invites devotees to
                  participate in the sacred Mandala Poojai, commencing from the
                  <span className="font-semibold text-gray-900">
                    {" "}
                    evening of 6th April
                  </span>
                  . Seek divine blessings for your family.
                </p>

                <div className="space-y-4 mb-10 max-w-md">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400">
                    Sponsorship Details
                  </h4>
                  {mandalaCharges.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b border-orange-100/50"
                    >
                      <span className="text-gray-700 font-serif">
                        {item.type}
                      </span>
                      <span className="font-bold text-primary">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-orange-100 shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                  Kumbabishekam Committee
                </h3>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gray-900 text-white mt-4 shadow-lg shadow-gray-200">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-300 mb-2">
                      Payment Instruction
                    </p>
                    <p className="text-xs font-light text-gray-300 leading-relaxed mb-4">
                      We invite devotees to use the following Google Form to
                      contribute and share information of payment transfer along
                      with the names, gothram, nakshatrams and rasi of you and
                      your family for Sankalpam.
                    </p>

                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSekr7zlnQ6nMqO6E7DZqQOFCOAakWRz-pB_ElOxaYDFfP0pxg/viewform?usp=publish-editor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-orange-400 hover:bg-orange-500 text-gray-900 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
                    >
                      <span>Fill Google Form</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="pt-6 border-t border-orange-50">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
                      Contact Coordinators
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-orange-50/50 group">
                        <p className="text-xs text-gray-400 mb-1">
                          Jayarama Gurukkal
                        </p>
                        <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                          86100 22453
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-orange-50/50 group">
                        <p className="text-xs text-gray-400 mb-1">Sriram</p>
                        <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                          96111 91544
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. DYNAMIC PARALLEL SERVICES GRID --- */}
        {loading ? (
          <div className="text-center py-20 font-serif italic opacity-50 animate-pulse text-2xl">
            Loading sacred poojas...
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-10">
            {/* Daily Poojas Section */}
            <section>
              <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-gray-400 mb-10 pl-4">
                Daily Poojas
              </h3>
              <div className="grid gap-6">
                {dailyPoojas.map((p) => (
                  <div
                    key={p._id}
                    className="group relative p-8 bg-white/60 hover:bg-white rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all duration-700 shadow-sm hover:shadow-xl hover:-translate-y-1 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-[15px] text-primary uppercase tracking-[0.1em] font-bold mb-3">
                        {p.timing}
                      </p>
                      <h4 className="text-3xl font-serif font-bold text-gray-950 group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-sm text-gray-400 font-medium italic mt-1 font-serif">
                        {p.description}
                      </p>
                    </div>
                    <div className="text-right border-l border-gray-100 pl-8 min-w-[140px]">
                      <span className="block text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1 font-sans">
                        Charge
                      </span>
                      <span className="text-2xl font-light text-gray-900 group-hover:scale-110 block transition-transform">
                        {p.charges}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Special Poojas Section */}
            <section>
              <h3 className="text-sm uppercase tracking-[0.4em] font-bold text-gray-400 mb-10 pl-4">
                Special Poojas
              </h3>
              <div className="grid gap-6">
                {specialPoojas.map((p) => (
                  <div
                    key={p._id}
                    className="group relative p-8 bg-white/60 hover:bg-white rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-all duration-700 shadow-sm hover:shadow-xl hover:-translate-y-1 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-[15px] text-primary uppercase tracking-[0.1em] font-bold mb-3">
                        {p.timing}
                      </p>
                      <h4 className="text-3xl font-serif font-bold text-gray-950 group-hover:text-primary transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-sm text-gray-400 font-medium italic mt-1 font-serif">
                        {p.description}
                      </p>
                    </div>
                    <div className="text-right border-l border-gray-100 pl-8 min-w-[140px]">
                      <span className="block text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1 font-sans">
                        Charge
                      </span>
                      <span className="text-2xl font-light text-gray-900 group-hover:scale-110 block transition-transform">
                        {p.charges}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --- 3. SACRED CONTRIBUTIONS SECTION (REFINED) --- */}
        <section className="pt-10 border-t border-gray-200">
          <div className="mb-16 text-center">
            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary mb-3">
              Sacred Contributions
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif font-bold text-gray-950">
              Support the{" "}
              <span className="italic text-primary/80 font-medium">
                Sannidhi
              </span>
            </h3>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100">
              {/* Instruction */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 text-center italic">
                Kindly transfer contributions to the Temple bank account below
                and inform{" "}
                <span className="font-semibold text-gray-900">
                  Mr. R. Gururaj
                </span>{" "}
                via email at{" "}
                <span className="font-medium text-primary break-all">
                  srividyaganapathitemplenitt@gmail.com
                </span>
              </p>

              {/* Account Details */}
              <div className="space-y-0 text-1xl">
                <div className="flex justify-between pb-3">
                  <span className="text-gray-500">Account Name</span>
                  <span className="font-semibold text-gray-900">
                    Sri Vidya Ganapathi Seva Samithi
                  </span>
                </div>

                <div className="flex justify-between pb-3">
                  <span className="text-gray-500">Account Number</span>
                  <span className="font-semibold tracking-wider text-gray-900">
                    10023884193
                  </span>
                </div>

                <div className="flex justify-between pb-3">
                  <span className="text-gray-500">Bank</span>
                  <span className="font-semibold text-gray-900">
                    SBI, NITT Branch
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">IFSC Code</span>
                  <span className="font-semibold text-gray-900">
                    SBIN0001617
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer Accent --- */}
        <footer className="mt-40 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="pt-12 flex flex-col items-center gap-4">
            <div className="text-5xl font-serif text-primary/10 select-none hover:text-primary/30 transition-colors duration-1000">
              ॐ
            </div>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.5em] font-bold">
              Kumbabishekam Committee
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
