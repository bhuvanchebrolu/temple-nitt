"use client";

import React from "react";

export default function UniversalPrayer() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#fffefc] overflow-hidden px-6">
      {/* --- Aesthetic Background Elements --- */}
      {/* Subtle mandala-like glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-orange-100/30 rounded-full blur-[100px] -z-10" />

      {/* Decorative Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-orange-200/50 rounded-tl-3xl hidden md:block" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-orange-200/50 rounded-br-3xl hidden md:block" />

      <div className="max-w-3xl w-full text-center relative z-10 py-20">
        {/* --- Header --- */}
        <header className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-950">
            Universal <span className="italic text-orange-600/80">Prayer</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent mx-auto mt-8 opacity-50" />
        </header>

        {/* --- Prayer Content --- */}
        <article className="space-y-16 md:space-y-10">
          {/* Devanagari Script */}
          <div className="space-y-4">
            <p className="text-3xl md:text-5xl font-serif text-gray-900 leading-relaxed tracking-wide">
              असतो मा सद्गमय <br />
              तमसो मा ज्योतिर्गमय <br />
              मृत्योर्मा-अमृतङ्गमय।
            </p>
          </div>

          {/* Transliteration */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-400 mb-6">
              Transliteration
            </h4>
            <p className="text-xl md:text-2xl font-serif italic text-gray-600 leading-relaxed">
              Asatoma Sad-gamaya <br />
              Tamasoma Jyotir-gamaya <br />
              Mrtyorma Amrtam-gamaya
            </p>
          </div>

          {/* Translation */}
          <div className="max-w-xl mx-auto pt-12 border-t border-orange-100">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-orange-400 mb-8">
              Meaning
            </h4>
            <div className="space-y-4 text-lg md:text-xl font-light text-gray-500 leading-relaxed">
              <p className="hover:text-gray-900 transition-colors duration-500">
                Lead me from the{" "}
                <span className="text-gray-800 font-medium">unreal</span> to the{" "}
                <span className="text-orange-700 font-medium">real</span>
              </p>
              <p className="hover:text-gray-900 transition-colors duration-500">
                Lead me from{" "}
                <span className="text-gray-800 font-medium">darkness</span> to{" "}
                <span className="text-orange-700 font-medium">light</span>
              </p>
              <p className="hover:text-gray-900 transition-colors duration-500">
                Lead me from{" "}
                <span className="text-gray-800 font-medium">death</span> to{" "}
                <span className="text-orange-700 font-medium">immortality</span>
              </p>
            </div>
          </div>
        </article>

        {/* --- Footer Accent --- */}
        <footer className="mt-24 md:mt-32">
          <div className="text-4xl md:text-5xl py-4 md:py-5 text-red-900 opacity-50 select-none cursor-default">
            ॐ
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400 font-bold mt-6">
            Peace • Light • Truth
          </p>
        </footer>
      </div>
    </main>
  );
}
