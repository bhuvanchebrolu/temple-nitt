"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

const months = [

  { id: "apr", label: "Apr" },
  { id: "may", label: "May" },
  { id: "jun", label: "Jun" },
  { id: "jul", label: "Jul" },
  { id: "aug", label: "Aug" },
  { id: "sep", label: "Sep" },
  { id: "oct", label: "Oct" },
  { id: "nov", label: "Nov" },
  { id: "dec", label: "Dec" },
  { id: "jan", label: "Jan" },
  { id: "feb", label: "Feb" },
  { id: "mar", label: "Mar" },
];

export default function CalendarPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "calendarRow"] | order(order asc)`,
        );
        setRows(data);
      } catch (error) {
        console.error("Failed to fetch calendar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendar();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#fffcf7] flex items-center justify-center">
        <p className="font-serif italic text-maroon animate-pulse text-xl">
          Loading Sacred Grid...
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#fffcf7] py-12 px-4">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-maroon">
            Special Pooja{" "}
            <span className="italic font-light text-accent">Calendar</span>
          </h1>
          <div className="w-20 h-1 bg-accent mx-auto mt-4" />
        </header>

        {/* Professional Table Container */}
        <div className="bg-white rounded-3xl border border-accent/20 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-maroon text-accent">
                  {/* Sticky First Column Header */}
                  <th className="p-4 font-serif text-base sticky left-0 bg-maroon z-30 border-b border-accent/20 border-r border-accent/10 min-w-[180px]">
                    Vrathams / Months
                  </th>
                  {months.map((m) => (
                    <th
                      key={m.id}
                      className="p-4 font-serif text-sm text-center border-b border-accent/20 min-w-[80px]"
                    >
                      {m.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/5">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-accent/5 transition-colors">
                    {/* Sticky Event Name Row Label */}
                    <td className="p-4 font-bold text-maroon sticky left-0 bg-white z-20 border-r border-accent/20 shadow-[2px_0_5px_rgba(0,0,0,0.03)] text-sm uppercase tracking-tighter">
                      {row.eventName}
                    </td>

                    {/* Month Columns for each Event */}
                    {months.map((m) => {
                      const dates = row[m.id];
                      return (
                        <td key={m.id} className="p-2 text-center align-middle">
                          {dates ? (
                            <div className="flex flex-wrap justify-center gap-1">
                              {dates
                                .split(",")
                                .map((d: string, dIdx: number) => (
                                  <span
                                    key={dIdx}
                                    className="inline-block bg-orange-50 text-maroon text-[11px] font-bold px-1.5 py-0.5 rounded border border-orange-100 min-w-[22px]"
                                  >
                                    {d.trim()}
                                  </span>
                                ))}
                            </div>
                          ) : (
                            <span className="text-gray-200 text-xs">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-accent text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-maroon-light transition-colors shadow-md"
          >
            <span>→</span> Pooja Services & Charges
          </Link>
        </div>

        <footer className="mt-10 text-center">
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            Shri Vidya Ganapathi Temple • NIT Trichy
          </p>
        </footer>
      </div>
    </main>
  );
}
