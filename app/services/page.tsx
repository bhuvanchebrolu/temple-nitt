"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

type Pooja = {
  _id: string;
  priority: number;
  type:
    | "daily"
    | "special"
    | "student_subscription"
    | "alumni_subscription"
    | "maintenance";
  description: string;
  timing: string;
  charges: string;
};

const POOJA_QUERY = `*[_type == "pooja"] | order(priority asc)`;

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

  const getCategoryName = (type: string) => {
    switch (type) {
      case "daily": return "Daily Pooja";
      case "special": return "Special Pooja";
      case "student_subscription": return "Annual Subscription - Students";
      case "alumni_subscription": return "Annual Subscription - Staff & Alumni";
      case "maintenance": return "Maintenance Contribution";
      default: return type;
    }
  };

  const getRowStyles = (type: string) => {
    switch (type) {
      case "daily": return "bg-orange-100/80";
      case "special": return "bg-rose-100/80";
      case "student_subscription": return "bg-blue-100/80";
      case "alumni_subscription": return "bg-indigo-100/80";
      case "maintenance": return "bg-emerald-100/80";
      default: return "bg-slate-50";
    }
  };

  return (
    <main className="relative min-h-screen pt-6 md:pt-10 pb-20 md:pb-40 bg-[#fffefc] text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* --- Header --- */}
        <header className="max-w-4xl mb-10 md:mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/5 border border-primary/10">
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold text-primary">
              Rituals & Offerings
            </h2>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-gray-950">
            Pooja <span className="italic text-primary">Services</span>
          </h1>
        </header>

        {loading ? (
          <div className="text-center py-20 font-serif italic opacity-50 animate-pulse text-xl md:text-2xl">
            Loading Pooja service list...
          </div>
        ) : (
          /* Horizontal scroll wrapper for the table on small screens */
          <div className="overflow-x-auto rounded-xl border border-slate-900 bg-white shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="py-3 px-3 md:px-4 text-xs md:text-sm font-bold border border-slate-900">
                    Name
                  </th>
                  <th className="py-3 px-3 md:px-4 text-xs md:text-sm font-bold border border-slate-900">
                    Service
                  </th>
                  <th className="py-3 px-3 md:px-4 text-xs md:text-sm font-bold border border-slate-900">
                    Schedule
                  </th>
                  <th className="py-3 px-3 md:px-4 text-xs md:text-sm font-bold border border-slate-900 text-right">
                    Charges
                  </th>
                </tr>
              </thead>
              <tbody>
                {poojas.map((p) => (
                  <tr
                    key={p._id}
                    className={`transition-colors duration-200 ${getRowStyles(p.type)}`}
                  >
                    <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm font-semibold text-gray-900 border border-slate-900">
                      {getCategoryName(p.type)}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm text-gray-700 border border-slate-900">
                      {p.description}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm text-gray-600 border border-slate-900 italic">
                      {p.timing}
                    </td>
                    <td className="py-3 md:py-4 px-3 md:px-4 text-xs md:text-sm text-right font-mono font-medium text-black border border-slate-900 whitespace-nowrap">
                      {p.charges}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Payment Instructions Section --- */}
        <div className="mt-12 md:mt-20 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-950 text-white shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl -mr-24 -mt-24 md:-mr-32 md:-mt-32" />

          <h3 className="text-xl md:text-2xl font-serif mb-6 md:mb-8 text-orange-200 border-b border-white/10 pb-4">
            Payment Instructions
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
            <div className="space-y-4 md:space-y-6 text-sm opacity-90 leading-relaxed">
              <p className="flex gap-3">
                <span className="text-primary-400 font-bold">1.</span>
                Devotees can make payments via IMPS/NEFT/RTGS from Indian
                Accounts.
              </p>
              <p className="flex gap-3">
                <span className="text-primary-400 font-bold">2.</span>
                Kindly share information of payment transfer along with the
                names, gothram, nakshatrams and rasi of you and your family for
                Sankalpam.
              </p>

              <div className="mt-6 space-y-4 bg-white/5 p-4 md:p-6 rounded-xl border border-white/10">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/5 pb-2 gap-1">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary-400 font-bold">
                    Email
                  </span>
                  <a
                    href="mailto:srividyaganapathitemplenitt@gmail.com"
                    className="text-[11px] md:text-xs hover:text-primary transition-colors break-all"
                  >
                    srividyaganapathitemplenitt@gmail.com
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary-400 font-bold">
                    Whatsapp
                  </span>
                  <div className="text-left sm:text-right text-[11px] md:text-xs space-y-1">
                    <p className="flex justify-between sm:justify-end gap-4">
                      <span className="text-white/60">Jayarama Gurukkal:</span>{" "}
                      86100 22453
                    </p>
                    <p className="flex justify-between sm:justify-end gap-4">
                      <span className="text-white/60">Sriram:</span> 96111 91544
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 self-center shadow-inner">
              <div className="space-y-4 text-[11px] md:text-xs">
                {[
                  [
                    "Beneficiary",
                    "Sri Vidya Ganapathi Seva Samithi",
                    "text-orange-200 font-bold",
                  ],
                  ["Bank", "State Bank of India", ""],
                  [
                    "Account No",
                    "10023884193",
                    "font-mono text-white tracking-widest",
                  ],
                  [
                    "IFSC Code",
                    "SBIN0001617",
                    "font-mono text-white tracking-widest",
                  ],
                  ["Type", "Savings Account", ""],
                ].map(([label, value, css]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-white/5 pb-2 gap-4"
                  >
                    <span className="text-white uppercase tracking-tighter text-[9px] md:text-[10px] shrink-0">
                      {label}
                    </span>
                    <span className={`${css} text-right break-words`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 md:mt-24 text-center">
          <div className="text-4xl md:text-5xl py-4 md:py-5 text-red-900 opacity-50 select-none cursor-default">
            ॐ
          </div>
         
        </footer>
      </div>
    </main>
  );
}