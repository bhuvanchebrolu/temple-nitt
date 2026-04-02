const modules = [
  {
    age: "5 - 8 Years",
    title: "Shlokas & Stories",
    color: "bg-orange-100",
    border: "border-orange-200",
    desc: "Introducing young minds to the beauty of Sanskrit through rhythmic chanting and moral stories from our Puranas.",
    topics: [
      "Simple Sanskrit Shlokas",
      "Stories from Ramayana",
      "Values through Games",
      "Bhajans",
    ],
  },
  {
    age: "9 - 13 Years",
    title: "Vedic Foundations",
    color: "bg-amber-100",
    border: "border-amber-200",
    desc: "Building a deeper understanding of Dharma and cultural identity during the formative years of childhood.",
    topics: [
      "Stotram Chanting",
      "Life Lessons from Mahabharata",
      "Intro to Sanskrit",
      "Cultural Ethics",
    ],
  },
  {
    age: "14+ Years",
    title: "Leadership & Dharma",
    color: "bg-yellow-100",
    border: "border-yellow-200",
    desc: "Empowering teenagers to apply Vedic wisdom to modern challenges and develop a strong character.",
    topics: [
      "Bhagavad Gita Study",
      "Logic & Debate",
      "Youth Leadership",
      "Vedic Science Intro",
    ],
  },
];

export default function BalaviharPage() {
  return (
    <main className="relative min-h-screen pt-20 pb-24 bg-[#fffefc] overflow-hidden">
      {/* Playful Background Blobs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-orange-200/20 rounded-full blur-[100px] z-[-1]" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-[100px] z-[-1]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-3">
            Shaping the Future
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-tighter">
            Balavihar <span className="italic text-primary/80">Classes</span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Nurturing the next generation with the timeless values of Sanatana
            Dharma through stories, shlokas, and interactive Vedic learning.
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {modules.map((module, idx) => (
            <div
              key={idx}
              className={`divine-glass relative rounded-[3rem] p-10 border-b-8 ${module.border} transition-all duration-500`}
            >
              <div
                className={`w-20 h-20 ${module.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}
              >
                <span className="text-primary font-bold text-sm text-center leading-none">
                  AGE <br />{" "}
                  <span className="text-xl font-serif">
                    {module.age.split(" ")[0]}
                  </span>
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-950 mb-4">
                {module.title}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed italic">
                {module.desc}
              </p>

              <div className="w-full h-px bg-gray-100 mb-6" />

              <ul className="space-y-4">
                {module.topics.map((topic, tIdx) => (
                  <li
                    key={tIdx}
                    className="flex items-center gap-3 text-gray-600 font-medium text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* General Information Section (Replaced the Enroll Section) */}
        <div className="max-w-4xl mx-auto">
          <div className="divine-glass p-12 md:p-16 rounded-[4rem] border-none shadow-xl">
            <h3 className="text-3xl font-serif text-center text-gray-900 mb-10">
              Program Insights
            </h3>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">
                  The Atmosphere
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Classes are conducted in a traditional yet interactive
                  environment where every child is encouraged to ask questions
                  and explore their heritage with curiosity and respect.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">
                  Our Mentors
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our teachers are dedicated volunteers who blend deep Vedic
                  knowledge with modern pedagogical techniques to make learning
                  enjoyable for young minds.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">
                  Schedule
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sessions are held every Sunday morning. We follow a structured
                  curriculum that spans over the academic year, with breaks
                  during major festivals.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">
                  Commitment
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The program is designed to be a long-term journey of growth,
                  helping children build a strong character and a clear moral
                  compass.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
