"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Ensure your Sanity client is configured here

// Static mapping for IDs and Image paths - Region removed
const staticSaints = [
  { id: 1, name: "Vyasar", image: "/1 Vyasar.jpeg" },
  { id: 2, name: "Adi Sankara", image: "/2 Adi Sankara.jpeg" },
  { id: 3, name: "Mahaperiyava", image: "/3 Mahaperiyava.jpeg" },
  { id: 4, name: "Sringeri Periyava", image: "/4 Sringeri Periyava.jpeg" },
  { id: 5, name: "Ramanujar", image: "/5 Ramanujar.jpeg" },
  { id: 6, name: "Madhvacharya", image: "/6 Madhvacharya.jpeg" },
  { id: 7, name: "Raghavendrar", image: "/7 Raghavendrar.jpeg" },
  { id: 8, name: "Buddha", image: "/8 Buddha.jpeg" },
  {
    id: 9,
    name: "Bhagwan Ramana Maharishi",
    image: "/9 Bhagwan Ramana Maharishi.jpeg",
  },
  { id: 10, name: "Seshadri Swamigal", image: "/10 Seshadri Swamigal.jpeg" },
  {
    id: 11,
    name: "Sadasiva Bhahmendra",
    image: "/11 Sadasiva Bhahmendra.jpeg",
  },
  { id: 12, name: "Jnaneshwar", image: "/12 Jnaneshwar.jpeg" },
  {
    id: 13,
    name: "Shri Chaitanya Mahaprabhu",
    image: "/13 Shri Chaitanya Mahaprabhu.jpeg",
  },
  { id: 14, name: "Meerabai", image: "/14 Meerabai.jpeg" },
  { id: 15, name: "Purandaradasar", image: "/15 Purandaradasar.jpeg" },
  { id: 16, name: "Sant Thukaram", image: "/16 Sant Thukaram.jpeg" },
  {
    id: 17,
    name: "Ramakrishna Paramahamsar",
    image: "/17 Ramakrishna Paramahamsar.jpeg",
  },
  { id: 18, name: "Swami Vivekananda", image: "/18 Swami Vivekananda.jpeg" },
  { id: 19, name: "Sri Guru Babaji", image: "/19 Sri Guru Babaji.jpeg" },
  { id: 20, name: "Guru Nanak", image: "/20 Guru Nanak.jpeg" },
  { id: 21, name: "Narayana Guru", image: "/21 Narayana Guru.jpeg" },
  { id: 22, name: "Arunagirinathar", image: "/22 Arunagirinathar.jpeg" },
  { id: 23, name: "Shridi Sai Baba", image: "/23 Shridi Sai Baba.jpeg" },
  { id: 24, name: "Sant Kabirdas", image: "/24 Sant Kabirdas.jpeg" },
  { id: 25, name: "Avvaiyar", image: "/25 Avvaiyar.jpeg" },
  { id: 26, name: "Thiruvalluvar", image: "/26 Thiruvalluvar.jpeg" },
  { id: 27, name: "Vallalar", image: "/27 Vallalar.jpeg" },
  { id: 28, name: "Pamban Swamigal", image: "/28 Pamban Swamigal.jpeg" },
  { id: 29, name: "Nalvar", image: "/29 Nalvar.jpeg" },
  { id: 30, name: "Surdas", image: "/30 Surdas.jpeg" },
  { id: 31, name: "Sant Namdev", image: "/31 Sant Namdev.jpeg" },
  { id: 32, name: "Samarth Ramdas", image: "/32 Samarth Ramdas.jpeg" },
  { id: 33, name: "Agasthiyar", image: "/33 Agasthiyar.jpeg" },
  {
    id: 34,
    name: "Avudai Akkal with Guru Sreedhara Ayyaval",
    image: "/34 Avudai Akkal with Guru Sreedhara Ayyaval.jpeg",
  },
  {
    id: 35,
    name: "Vallabacharya Mahaprabhu",
    image: "/35 Vallabacharya Mahaprabhu.jpeg",
  },
  { id: 36, name: "Andal", image: "/36 Andal.jpeg" },
  { id: 37, name: "Badrachala Ramadas", image: "/37 Badrachala Ramadas.jpeg" },
  { id: 38, name: "Thulasidas", image: "/38 Thulasidas.jpeg" },
  {
    id: 39,
    name: "Yogini Lalleshwari of Kashmir",
    image: "/39 Yogini Lalleshwari of Kashmir.jpeg",
  },
  { id: 40, name: "Akka Mahadevi", image: "/40 Akka Mahadevi.jpeg" },
  { id: 41, name: "Pattinathar", image: "/41 Pattinathar.jpeg" },
  { id: 42, name: "Sarada Devi", image: "/42 Sarada Devi.jpeg" },
  { id: 43, name: "Saint Thyagaraja", image: "/43 Saint Thyagaraja.jpeg" },
  { id: 44, name: "Sekkizhar", image: "/44 Sekkizhar.jpeg" },
  {
    id: 45,
    name: "Bhagavan Nama Bhodendral Sridhara Ayyaval Marudanallur Sadguru Swamigal",
    image:
      "/45 Bhagavan Nama Bhodendral Sridhara Ayyaval Marudanallur Sadguru Swamigal.jpeg",
  },
  { id: 46, name: "Vedanta Desikar", image: "/46 Vedanta Desikar.jpeg" },
  { id: 47, name: "Manavala Mamunigal", image: "/47 Manavala Mamunigal.jpeg" },
  { id: 48, name: "Eknath", image: "/48 Eknath.jpeg" },
  { id: 49, name: "Aurobindo", image: "/49 Aurobindo.jpeg" },
  { id: 50, name: "Thirumoolar", image: "/50 Thirumoolar.jpeg" },
  { id: 51, name: "Nimbarkar", image: "/51 Nimbarkar.jpeg" },
  { id: 52, name: "Srimanta Sankardev", image: "/52 Srimanta Sankardev.jpeg" },
  { id: 53, name: "Mahavira", image: "/53 Mahavira.jpeg" },
  { id: 54, name: "Chinmayananda", image: "/54 Chinmayananda.jpeg" },
  { id: 55, name: "Patanjali", image: "/55 Patanjali.jpeg" },
  { id: 56, name: "Basavanna", image: "/56 Basavanna.jpeg" },
];

const slokas = [
  {
    sanskrit:
      "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात्परं ब्रह्म तस्मै श्रीगुरवे नमः।।",
    translation:
      "Salutations to that Guru who is himself Brahma, Vishnu, Maheshwara and the ultimate Brahmam!",
  },
  {
    sanskrit:
      "गुशब्दस्त्वन्धकारः स्यात् रुशब्दस्तन्निरोधकः। अन्धकार निरोधित्वात् गुरुरित्यभिधीयते।।",
    translation:
      "The letter 'gu' stands for darkness/ignorance; and 'ru' stands for dispeller. He is called a Guru, since he dispels the ignorance of the students.",
  },
  {
    sanskrit:
      "अज्ञानतिमिरान्धस्य ज्ञानाञ्जन शलाकया। चक्षुरुन्मीलितं येन तस्मै श्रीगुरवे नमः।।",
    translation:
      "Salutations to that Guru who has opened the eyes blinded by ignorance by applying the divine Kajal (collyrium) of knowledge.",
  },
  {
    sanskrit:
      "न गुरोरधिकं तत्त्वं न गुरोरघिकं तपः। तत्तंवज्ञानात् परं नास्ति तस्मै श्रीगुरवे नमः।।",
    translation:
      "Salutations to the guru beyond whom there is no truth; nor is there any meditation.",
  },
];

export default function SaraswatiHall() {
  const [saints, setSaints] = useState<any[]>([]);
  const [selectedSaint, setSelectedSaint] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBios = async () => {
      try {
        // Fetch bio based on saintName from Sanity
        const sanityData = await client.fetch(
          `*[_type == "saint"]{saintName, bio}`,
        );

        // Merge bios into static data
        const mergedData = staticSaints.map((item) => {
          const matched = sanityData.find(
            (s: any) => s.saintName === item.name,
          );
          return {
            ...item,
            bio: matched ? matched.bio : "Grace details coming soon...",
          };
        });

        setSaints(mergedData);
      } catch (error) {
        console.error("Error fetching Sanity bios:", error);
        setSaints(
          staticSaints.map((s) => ({
            ...s,
            bio: "Grace details coming soon...",
          })),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBios();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffcf7] text-slate-900 overflow-x-hidden font-sans">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative py-28 bg-maroon overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-accent font-bold uppercase tracking-[0.5em] text-[10px] mb-6">
            NIT Trichy Sannidhi
          </h2>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight">
            Saraswati{" "}
            <span className="italic text-accent font-light">Mandapam</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto italic">
            &quot;A sanctuary of Spiritual Art, Divine Learning, and the eternal
            breeze of Guru&apos;s Grace.&quot;
          </p>
        </div>
      </section>

      {/* --- 2. ABOUT THE MANDAPAM --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-50 border border-orange-100 text-maroon text-[10px] font-bold uppercase tracking-widest">
            The Multi-Purpose Hall
          </div>

          <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
            A Cradle for{" "}
            <span className="text-primary italic">Heritage & Art</span>
          </h3>

          <p className="text-gray-600 leading-relaxed font-light text-lg italic">
            Amidst the serene environs of the Shri Vidya Ganapathi Temple, there
            is a multi purpose Mandapam, with the blessings of Saraswati Ma.
            This is a center for Spiritual art with the wall painting of Ma
            Saraswati done by students. This Mandapam hosts:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm font-medium text-gray-700">
            {[
              "Classes for origami and painting for children",
              "Navaratri, Margazhi and other festivals with Divine performances",
              "Sloka chanting and bhajans (Mon-Fri & special occasions)",
              "Sanskrit classes planned to be conducted",
              "Proposed Bhagavad Gita classes",
              "Reading room for religious books for children",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="w-2 h-2 mt-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform shrink-0" />
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white group bg-white">
          <div className="absolute inset-0 bg-maroon/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <Image
            src="/m1.jpeg"
            alt="Saraswati Mandapam"
            width={800}
            height={600}
            className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white group bg-white">
          <div className="absolute inset-0 bg-maroon/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <Image
            src="/m2.jpeg"
            alt="Saraswati Mandapam"
            width={800}
            height={600}
            className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
          />
        </div>

        <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white group bg-white">
          <div className="absolute inset-0 bg-maroon/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <Image
            src="/m3.jpeg"
            alt="Saraswati Mandapam"
            width={800}
            height={600}
            className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </section>

      {/* --- 3. GURU TATTVA SLOKAS --- */}
      <section className="py-24 bg-creme/40 border-y border-accent/10 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl py-5 text-red-900 opacity-70 select-none cursor-default">
            ॐ
          </div>
          <div className="space-y-16">
            {slokas.map((s, i) => (
              <div key={i} className="group">
                <p className="text-2xl md:text-4xl font-serif text-maroon mb-6 leading-relaxed tracking-wide">
                  {s.sanskrit}
                </p>
                <p className="text-gray-500 italic font-light max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                  {s.translation}
                </p>
                {i !== slokas.length - 1 && (
                  <div className="w-12 h-px bg-accent/20 mx-auto mt-16" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. THE GALLERY OF 56 SAINTS --- */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h3 className="text-5xl font-serif font-bold text-gray-950 mb-6 italic">
            Gallery of <span className="text-orange-600">Grace</span>
          </h3>
          <p className="text-gray-500 font-light max-w-2xl mx-auto italic leading-relaxed text-lg">
            This Mandapam houses pictures of 56 Saints, Sages, and revered Gurus
            from across Bharat Mata—embodying the full Grace of Guru Tattva.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 italic animate-pulse text-orange-800">
            Invoking the Gallery of Grace...
          </div>
        ) : (
          /* Grid: 2 columns on mobile, 4 on desktop */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {saints.map((saint) => (
              <div
                key={saint.id}
                onClick={() => setSelectedSaint(saint)}
                className="group relative cursor-pointer"
              >
                {/* Saint Card Container */}
                <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden border border-orange-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-orange-400 active:scale-95">
                  {/* Image */}
                  <Image
                    src={saint.image}
                    alt={saint.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Permanent "Tap to know more" Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5a1f1f]/90 via-[#5a1f1f]/20 to-transparent opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6 text-center">
                    <span className="text-[9px] md:text-[10px] text-orange-200 font-bold uppercase tracking-[0.2em] mb-1 drop-shadow-md">
                      Tap to know more
                    </span>
                  </div>
                </div>

                {/* Name Label */}
                <div className="mt-4 text-center px-2">
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#5a1f1f] transition-colors leading-tight">
                    {saint.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- 6. SAINT DETAIL MODAL --- */}
      {selectedSaint && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/60 animate-in fade-in duration-300">
          {/* Clicking the background also closes the modal */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedSaint(null)}
          />

          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSaint(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-950 hover:bg-[#5a1f1f] hover:text-white transition-all z-50 border border-orange-100"
            >
              <span className="text-xl">✕</span>
            </button>

            {/* Image Side */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-gray-100">
              <Image
                src={selectedSaint.image}
                alt={selectedSaint.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-950 mb-6 leading-tight">
                {selectedSaint.name}
              </h2>
              <div className="h-1 w-12 bg-orange-500 mb-8" />

              <div className="max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-600 italic text-base md:text-lg leading-relaxed whitespace-pre-line">
                  &quot;{selectedSaint.bio}&quot;
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-orange-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-orange-600 font-serif text-xl">
                  ॐ
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  Embodies Guru Tattva
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 5. RAMANA QUOTE SECTION --- */}
      <section className="py-32 bg-maroon relative overflow-hidden">
        <div className="absolute left-[-5%] bottom-[-10%] opacity-5 select-none">
          <span className="text-[50rem] leading-none font-serif text-white">
            &quot;
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h4 className="text-accent uppercase tracking-[0.4em] font-bold text-[10px] mb-10">
            Bhagavan Ramana Maharshi
          </h4>
          <blockquote className="text-3xl md:text-6xl font-serif text-white italic leading-[1.1] mb-12">
            &quot;A Guru is not the physical form. Hence his contact remains
            even after the physical form of the Guru vanishes.&quot;
          </blockquote>
          <div className="w-20 h-px bg-accent/30 mx-auto mb-10" />
          <p className="text-accent/80 font-light text-xl italic tracking-wide">
            &quot;Guru&apos;s silence is the loudest Instruction.&quot;
          </p>
        </div>
      </section>

      {/* --- 6. SAINT DETAIL MODAL --- */}
      {selectedSaint && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-maroon/40 animate-in fade-in duration-500">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedSaint(null)}
          />

          <div className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSaint(null)}
              className="absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 cursor-pointer rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center hover:bg-maroon hover:text-white transition-all z-50 shadow-sm border border-orange-100"
            >
              <span className="text-lg">✕</span>
            </button>

            {/* Image Container - Fixed height on mobile, auto-height on desktop */}
            <div className="relative w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-auto bg-gray-50 border-b md:border-b-0 md:border-r border-orange-50">
              <Image
                src={selectedSaint.image}
                alt={selectedSaint.name}
                fill
                className="object-contain md:object-center"
              />
            </div>

            {/* Content Container - Scrollable if text is too long */}
            <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30 overflow-y-auto">
              <div className="max-h-full">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-950 mb-4 md:mb-6 tracking-tight leading-tight">
                  {selectedSaint.name}
                </h2>

                <div className="h-1 w-16 bg-accent mb-6 md:mb-10" />

                <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light italic whitespace-pre-line">
                  &quot;{selectedSaint.bio}&quot;
                </p>

               
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 7. FINAL SATSANG SECTION --- */}
      <section className="py-32 text-center px-6">
        <h3 className="text-4xl font-serif italic text-maroon mb-8">
          Dwelling in Quietude
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 font-light leading-relaxed text-lg italic">
          Come, sit quietly and soak in the gentle breeze of Guru&apos;s Grace.
          This is a Satsang where one can leave all the problems out and get
          rejuvenated and imbued with Peace and Tranquility.
        </p>
        <div className="text-6xl text-red-900 opacity-70 select-none cursor-default">
          ॐ
        </div>
      </section>
    </main>
  );
}
