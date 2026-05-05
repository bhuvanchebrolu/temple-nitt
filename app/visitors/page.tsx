"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type Visitor = {
  _id: string;
  name: string;
  title?: string;
  location?: string;
  date?: string;
  photo?: any;
  note?: string;
};

export default function TempleVisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selected, setSelected] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "templeVisitor"] | order(order asc)`)
      .then((data) => setVisitors(data))
      .catch((err) => console.error("Failed to fetch visitors:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#fffcf7] text-slate-900 overflow-x-hidden font-sans">
      {/* --- HEADER --- */}
      <section className="py-10 px-6 text-center border-b border-accent/10 bg-[#fffcf7]">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon">
          Visits of{" "}
          <span className="italic font-light text-accent">Swamijis & Spiritual Persona</span>
        </h1>
        <div className="w-16 h-1 bg-accent mx-auto mt-4" />
      </section>

      {/* --- VISITORS GRID --- */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center py-20 italic animate-pulse text-orange-800">
            Loading Sacred Visitors...
          </div>
        ) : visitors.length === 0 ? (
          <div className="text-center py-20 text-gray-400 italic">
            Visitor records coming soon...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {visitors.map((visitor) => (
              <div
                key={visitor._id}
                onClick={() => setSelected(visitor)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-orange-400 active:scale-95">
                  {visitor.photo ? (
                    <Image
                      src={urlFor(visitor.photo).width(400).url()}
                      alt={visitor.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-orange-50">
                      <span className="text-5xl text-maroon/30 font-serif">ॐ</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5a1f1f]/90 via-[#5a1f1f]/20 to-transparent flex flex-col justify-end p-4 md:p-6 text-center">
                    <span className="text-[9px] md:text-[10px] text-orange-200 font-bold uppercase tracking-[0.2em] mb-1 drop-shadow-md">
                      Tap to know more
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-maroon transition-colors leading-tight">
                    {visitor.title ? `${visitor.title} ` : ""}{visitor.name}
                  </p>
                  {visitor.location && (
                    <p className="text-[9px] md:text-[10px] text-maroon/70 uppercase tracking-widest mt-1 font-medium">
                      {visitor.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- MODAL --- */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-maroon/40 animate-in fade-in duration-500">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-maroon hover:text-white transition-all z-50 shadow-sm border border-orange-100"
            >
              <span className="text-lg">✕</span>
            </button>

            {/* Image */}
            <div className="relative w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-auto bg-gray-50 border-b md:border-b-0 md:border-r border-orange-50">
              {selected.photo ? (
                <Image
                  src={urlFor(selected.photo).width(600).url()}
                  alt={selected.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-50">
                  <span className="text-8xl text-maroon/20 font-serif">ॐ</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30 overflow-y-auto">
              {selected.title && (
                <p className="text-[10px] text-maroon uppercase tracking-[0.3em] font-bold mb-2">
                  {selected.title}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950 mb-4 tracking-tight leading-tight">
                {selected.name}
              </h2>
              <div className="h-1 w-16 bg-accent mb-6" />

              <div className="space-y-2 mb-6">
                {selected.location && (
                  <p className="text-sm text-gray-500 font-medium">
                    <span className="uppercase tracking-widest text-[10px] text-gray-400 font-bold mr-2">From</span>
                    {selected.location}
                  </p>
                )}
                {selected.date && (
                  <p className="text-sm text-gray-500 font-medium">
                    <span className="uppercase tracking-widest text-[10px] text-gray-400 font-bold mr-2">Visited</span>
                    {selected.date}
                  </p>
                )}
              </div>

              {selected.note && (
                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light italic">
                  &quot;{selected.note}&quot;
                </p>
              )}

              <div className="mt-10 pt-8 border-t border-orange-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-serif text-xl">
                  ॐ
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  Graced our Temple
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
