"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

type WebcastEntry = { date: string; day: string; session?: string; subtitle?: string; url: string };
type WebcastGroup = { title: string; entries: WebcastEntry[] };

const mandalaCharges = [
  { type: "Flowers", price: "Rs. 500" },
  { type: "Abishegam & Prasadam", price: "Rs. 1,000" },
  { type: "Abishegam, Flowers & Prasadam", price: "Rs. 1,500" },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const element = document.getElementById("mandala-poojai");
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export default function KumbabishekamPage() {
  const [webcastGroups, setWebcastGroups] = useState<WebcastGroup[]>([]);
  const [videoUrl, setVideoUrl] = useState("/Kumbabishekam_video.mp4");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [webcasts, balalayamData] = await Promise.all([
          client.fetch(
            `*[_type == "webcast" && defined(title) && defined(date) && defined(url)] | order(date asc){ title, date, day, session, subtitle, url }`,
          ),
          client.fetch(
            `*[_type == "balalayam"][0]{ "url": videoFile.asset->url }`,
          ),
        ]);

        if (balalayamData?.url) {
          setVideoUrl(balalayamData.url);
        }

        // Group by title, entries already sorted by date from GROQ
        const grouped: Record<string, WebcastGroup> = {};
        for (const doc of webcasts) {
          if (!grouped[doc.title]) {
            grouped[doc.title] = { title: doc.title, entries: [] };
          }
          grouped[doc.title].entries.push({
            date: doc.date,
            day: doc.day,
            session: doc.session,
            subtitle: doc.subtitle,
            url: doc.url,
          });
        }
        setWebcastGroups(Object.values(grouped));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffcf7] overflow-x-hidden font-sans">
      {/* --- 1. THE GRAND HERO --- */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center bg-maroon overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="relative z-10 text-center px-4 md:px-6">
          <div className="inline-block mb-4 md:mb-6 px-4 md:px-6 py-2 border border-accent/30 rounded-full backdrop-blur-sm">
            <p className="text-accent text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]">
              Sacred Consecration Ceremony
            </p>
          </div>
          <h1 className="text-5xl md:text-[10rem] font-serif font-bold text-white tracking-tighter leading-none">
            Maha <br />
            <span className="italic text-accent font-light">Kumbabishekam</span>
          </h1>
          <div className="mt-8 md:mt-12 flex flex-col items-center justify-center gap-6 md:gap-8">
            <Link
              href="#mandala-poojai"
              onClick={scrollToSection}
              className="w-full md:w-auto px-10 py-4 bg-accent text-maroon rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-xl active:scale-95 text-center"
            >
              Sponsor Pooja
            </Link>
            <p className="text-white/60 font-serif italic text-lg md:text-xl">
              Restoring the Divine Resonance
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* --- 2. VIDEO & WEBCAST SCHEDULE --- */}
      <section className="py-12 md:py-24 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="lg:sticky lg:top-32 text-center lg:text-left">
              <div className="relative group rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video mb-6 border border-accent/10">
                <video
                  key={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  suppressHydrationWarning
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://drive.google.com/drive/folders/1zqGvirXEBy3ADJvY5RNdcc0V6nXXVYdG?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-accent text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-maroon-light transition-colors shadow-md"
                >
                  ↗ Event Videos
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {webcastGroups.length === 0 ? (
              <div className="text-center py-20 text-gray-400 font-serif italic">
                Webcast links will appear here once added.
              </div>
            ) : (
              webcastGroups.map((group) => (
                <div
                  key={group.title}
                  className="overflow-hidden rounded-[2rem] border border-accent/20 shadow-xl bg-white"
                >
                  {/* Group title header */}
                  <div className="bg-maroon px-6 py-4">
                    <h3 className="font-serif text-lg font-bold text-accent">
                      {group.title}
                    </h3>
                  </div>

                  {/* Desktop table */}
                  <table className="hidden md:table w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-maroon/5 text-gray-500">
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider border-b border-accent/10">
                          Date
                        </th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider border-b border-accent/10">
                          Day
                        </th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider border-b border-accent/10">
                          Session
                        </th>
                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider border-b border-accent/10 text-right">
                          Watch
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.entries.map((entry, i) => (
                        <tr
                          key={i}
                          className="border-b border-accent/5 last:border-0 hover:bg-accent/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <p className="font-bold text-maroon">{entry.date}</p>
                            {entry.subtitle && (
                              <p className="text-xs text-gray-500 mt-0.5">{entry.subtitle}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-500 italic text-sm">
                            {entry.day}
                          </td>
                          <td className="px-6 py-4">
                            {entry.session ? (
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${entry.session === "Morning" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                                {entry.session}
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-maroon text-accent text-[10px] font-bold rounded-lg hover:bg-maroon-light transition-colors shadow-sm"
                            >
                              ▶ Watch Live
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile list */}
                  <div className="md:hidden divide-y divide-accent/10">
                    {group.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="font-bold text-maroon text-sm">{entry.date}</p>
                          {entry.subtitle && (
                            <p className="text-xs text-gray-500 mt-0.5">{entry.subtitle}</p>
                          )}
                          <p className="text-xs text-gray-400 italic">{entry.day}</p>
                          {entry.session && (
                            <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${entry.session === "Morning" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                              {entry.session}
                            </span>
                          )}
                        </div>
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-maroon text-accent text-[10px] font-bold rounded-lg hover:bg-maroon-light transition-colors shadow-sm whitespace-nowrap"
                        >
                          ▶ Watch Live
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- 3. INVITATIONS --- */}
      <section className="py-12 md:py-16 bg-creme/30 border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8 md:mb-16">
          <h3 className="text-3xl md:text-5xl font-serif text-maroon">
            Official Invitations
          </h3>
          <div className="w-16 md:w-24 h-0.5 bg-accent mx-auto mt-4" />
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto mt-10">
            {[
              {
                title: "English Invitation",
                lang: "English",
                file: "/Eng.pdf",
              },
              { title: "Tamil Invitation", lang: "Tamil", file: "/Tam.pdf" },
            ].map((pdf, idx) => (
              <a
                key={idx}
                href={pdf.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-accent/5 hover:border-accent/30 shadow-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <p className="text-[8px] md:text-[10px] font-bold text-accent uppercase tracking-widest mb-1">
                    {pdf.lang} Version
                  </p>
                  <h4 className="text-lg md:text-xl font-serif font-bold text-maroon">
                    {pdf.title}
                  </h4>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-creme flex items-center justify-center text-maroon text-lg md:text-xl">
                  ↗
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. FEATURED SECTION: MANDALA POOJAI --- */}
      <section
        id="mandala-poojai"
        className="mb-16 md:mb-32 px-4 md:px-0 scroll-mt-20"
      >
        <div className="relative p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="absolute right-[-5%] top-[-5%] text-[8rem] md:text-[15rem] font-serif text-orange-200/20 pointer-events-none select-none">
            ॐ
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                Upcoming Special Pooja
              </span>
              <h2 className="text-3xl md:text-6xl font-serif font-bold text-gray-900 mb-4 md:mb-6 text-balance">
                Mandala <span className="italic text-primary">Poojai</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-light italic">
                The Shri Vidya Ganapathi Temple invites devotees to participate
                in the sacred Mandala Poojai, commencing from the
                <span className="font-semibold text-gray-900 ml-1">
                  evening of 6th April
                </span>
                . Seek divine blessings for your family.
              </p>
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 max-w-md text-left">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Sponsorship Details
                </h4>
                {mandalaCharges.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-start gap-4 py-3 border-b border-orange-100/50"
                  >
                    <span className="text-gray-700 font-serif text-sm md:text-base leading-tight">
                      {item.type}
                    </span>
                    <span className="font-bold text-primary whitespace-nowrap text-sm md:text-base shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-orange-100 shadow-sm text-left">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-6 md:mb-8">
                Kumbabishekam Committee
              </h3>
              <div className="space-y-6">
                <div className="p-5 md:p-6 rounded-2xl bg-gray-900 text-white shadow-lg shadow-gray-200">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-orange-300 mb-2">
                    Payment Instruction
                  </p>
                  <p className="text-[11px] md:text-xs font-light text-gray-300 leading-relaxed mb-5">
                    We invite devotees to use the following Google Form to
                    contribute and share information of payment transfer along
                    with the names, gothram, nakshatrams and rasi of you and
                    your family for Sankalpam.
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSekr7zlnQ6nMqO6E7DZqQOFCOAakWRz-pB_ElOxaYDFfP0pxg/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-5 py-3 bg-orange-400 hover:bg-orange-500 text-gray-900 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="p-4 rounded-xl bg-orange-50/50 group">
                      <p className="text-[10px] md:text-xs text-gray-400 mb-1">
                        Jayarama Gurukkal
                      </p>
                      <p className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                        86100 22453
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50/50 group">
                      <p className="text-[10px] md:text-xs text-gray-400 mb-1">
                        Sriram
                      </p>
                      <p className="text-base md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
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
    </main>
  );
}
