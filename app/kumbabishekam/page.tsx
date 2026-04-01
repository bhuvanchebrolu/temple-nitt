"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

// initialSchedule serves as the structural template.
// The 'link' property will be updated dynamically via Sanity.
const initialSchedule = [
  {
    date: "03 April 2026",
    tamilDate: "20th Panguni",
    day: "Friday",
    sessions: [
      {
        type: "Morning",
        time: "09:00 am - 12:30 pm",
        slotId: "3_april_morning",
        link: "#",
      },
      {
        type: "Evening",
        time: "05:30 pm - 09:00 pm",
        slotId: "3_april_evening",
        link: "#",
      },
    ],
  },
  {
    date: "04 April 2026",
    tamilDate: "21st Panguni",
    day: "Saturday",
    sessions: [
      {
        type: "Morning",
        time: "08:30 am - 12:30 pm",
        slotId: "4_april_morning",
        link: "#",
      },
      {
        type: "Evening",
        time: "04:00 pm - 09:30 pm",
        slotId: "4_april_evening",
        link: "#",
      },
    ],
  },
  {
    date: "05 April 2026",
    tamilDate: "22nd Panguni",
    day: "Sunday",
    sessions: [
      {
        type: "Morning",
        time: "08:30 am - 12:30 pm",
        slotId: "5_april_morning",
        link: "#",
      },
      {
        type: "Evening",
        time: "04:00 pm - 09:30 pm",
        slotId: "5_april_evening",
        link: "#",
      },
    ],
  },
  {
    date: "06 April 2026",
    tamilDate: "23rd Panguni",
    day: "Monday",
    sessions: [
      {
        type: "Morning",
        time: "05:00 am - 12:00 pm",
        slotId: "6_april_morning",
        link: "#",
      },
    ],
  },
];

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
  const [schedule, setSchedule] = useState(initialSchedule);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // Fetching the mapping from Sanity
        const links = await client.fetch(
          `*[_type == "webcast"]{sessionSlot, youtubeLink}`,
        );

        // Merging Sanity URLs into our local schedule structure
        const updatedSchedule = initialSchedule.map((day) => ({
          ...day,
          sessions: day.sessions.map((session) => {
            const match = links.find(
              (l: any) => l.sessionSlot === session.slotId,
            );
            return { ...session, link: match ? match.youtubeLink : "#" };
          }),
        }));

        setSchedule(updatedSchedule);
      } catch (err) {
        console.error("Error fetching webcast links:", err);
      }
    };

    fetchLinks();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffcf7] overflow-x-hidden font-sans">
      {/* --- 1. THE GRAND HERO --- */}
      <section className="relative h-[85vh] md:h-[90vh] flex items-center justify-center bg-maroon overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

        {/* Sacred Glow */}
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
          {/* Left Column: Title & Video */}
          <div className="lg:col-span-5 space-y-8">
            <div className="lg:sticky lg:top-32 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-serif text-maroon leading-tight mb-6 md:mb-8">
                Live <br className="hidden lg:block" />
                <span className="italic font-light text-gray-400">
                  Webcast Schedule
                </span>
              </h2>

              <div className="relative group rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video mb-8 border border-accent/10">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src="/Kumbabishekam_video.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="p-6 md:p-8 bg-white border border-accent/10 rounded-2xl md:rounded-[2rem] shadow-sm">
                <h5 className="font-bold text-[10px] uppercase tracking-widest text-accent mb-3">
                  Contact for Seva
                </h5>
                <p className="text-maroon font-serif text-lg md:text-xl font-bold">
                  Mrs. Karthika Panneerselvam
                </p>
                <p className="text-gray-500 mt-1 font-medium font-mono tracking-wider">
                  +91 90476 92112
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Webcast Grid */}
          <div className="lg:col-span-7">
            <div className="space-y-6 md:space-y-0 md:overflow-hidden md:rounded-[2.5rem] md:border md:border-accent/20 md:shadow-2xl md:bg-white">
              {/* Desktop Table (Hidden on Mobile) */}
              <table className="hidden md:table w-full text-left border-collapse">
                <thead className="bg-maroon text-accent">
                  <tr>
                    <th className="p-6 font-serif text-lg font-bold border-b border-accent/20">
                      Date & Day
                    </th>
                    <th className="p-6 font-serif text-lg font-bold border-b border-accent/20">
                      Session
                    </th>
                    <th className="p-6 font-serif text-lg font-bold border-b border-accent/20">
                      Timing
                    </th>
                    <th className="p-6 font-serif text-lg font-bold border-b border-accent/20">
                      Webcast
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {schedule.map((row, idx) => (
                    <React.Fragment key={idx}>
                      {row.sessions.map((session, sIdx) => (
                        <tr
                          key={sIdx}
                          className="hover:bg-accent/5 border-b border-accent/10 last:border-0"
                        >
                          {sIdx === 0 && (
                            <td
                              className="p-6 border-r border-accent/10 bg-[#fffcf7]"
                              rowSpan={row.sessions.length}
                            >
                              <p className="font-bold text-maroon text-lg">
                                {row.date}
                              </p>
                              <p className="text-xs text-accent uppercase tracking-widest font-bold mt-1">
                                {row.tamilDate}
                              </p>
                              <p className="text-sm text-gray-500 italic mt-2">
                                {row.day}
                              </p>
                            </td>
                          )}
                          <td className="p-6">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${session.type === "Morning" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}
                            >
                              {session.type}
                            </span>
                          </td>
                          <td className="p-6 font-medium text-sm text-gray-600 font-mono tracking-tight">
                            {session.time}
                          </td>
                          <td className="p-6">
                            {session.link !== "#" ? (
                              <a
                                href={session.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-maroon hover:text-accent flex items-center gap-1 transition-colors"
                              >
                                WATCH LIVE <span>↗</span>
                              </a>
                            ) : (
                              <span className="text-xs font-bold text-gray-300 cursor-default">
                                LINK SOON
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards (Visible only on Phone) */}
              <div className="md:hidden space-y-4">
                {schedule.map((row, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-accent/20 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <div className="bg-maroon p-4 text-center">
                      <p className="text-white font-bold">
                        {row.date} ({row.day})
                      </p>
                      <p className="text-accent text-[10px] font-bold uppercase">
                        {row.tamilDate}
                      </p>
                    </div>
                    <div className="p-4 space-y-4">
                      {row.sessions.map((session, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between py-2 border-b border-accent/5 last:border-0"
                        >
                          <div>
                            <p
                              className={`text-[10px] font-bold uppercase ${session.type === "Morning" ? "text-orange-600" : "text-blue-600"}`}
                            >
                              {session.type}
                            </p>
                            <p className="text-xs font-mono text-gray-600">
                              {session.time}
                            </p>
                          </div>
                          {session.link !== "#" ? (
                            <a
                              href={session.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-creme text-maroon text-[10px] font-bold rounded-lg border border-accent/10"
                            >
                              WATCH LIVE
                            </a>
                          ) : (
                            <span className="px-4 py-2 text-gray-300 text-[10px] font-bold italic">
                              SOON
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. INVITATIONS --- */}
      <section className="py-12 md:py-16 bg-creme/30 border-y border-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-3xl md:text-5xl font-serif text-maroon">
              Official Invitations
            </h3>
            <div className="w-16 md:w-24 h-0.5 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
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

      {/* --- 1. FEATURED SECTION: MANDALA POOJAI --- */}
      <section
        id="mandala-poojai"
        className="mb-16 md:mb-32 px-4 md:px-0 scroll-mt-20"
      >
        {/* Reduced border-radius and padding for mobile */}
        <div className="relative p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-xl overflow-hidden">
          {/* Scaled down background Om symbol for mobile */}
          <div className="absolute right-[-5%] top-[-5%] text-[8rem] md:text-[15rem] font-serif text-orange-200/20 pointer-events-none select-none">
            ॐ
          </div>

          {/* Grid stacks on mobile (default), 2 columns on lg screens */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                Upcoming Special Pooja
              </span>

              {/* Adjusted text sizes for smaller screens */}
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

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 max-w-md">
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

            {/* Right Column: Card styling adjusted for mobile spacing */}
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-orange-100 shadow-sm">
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
                  {/* Grid stays 1 col on small phones, 2 on sm devices up */}
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
