import { useEffect } from "react";
import { FaQuoteLeft, FaRocket, FaBullseye, FaUsers } from "react-icons/fa";

export default function OriginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: "2024", title: "THE VISION", desc: "GFC was born from a vision to create India's premier combat sports platform." },
    { year: "2025", title: "THE BUILD", desc: "Assembling elite fighters, world-class production, and building the community." },
    { year: "2026", title: "THE ORIGIN", desc: "GFC Global 1: Origin - The first event that started it all." },
  ];

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero */}
{/* ================= HERO SECTION ================= */}
<section className="relative flex items-center bg-black overflow-hidden" style={{ minHeight: "100vh", height: "100vh", maxHeight: "900px" }}>
  <div className="absolute inset-0">
    <img 
      src="/images/c1.png" 
      alt="Origin Hero" 
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
  </div>
  
  <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl">
      <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">OUR STORY</p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.1]">
        The <span className="text-red-600">Origin</span> of GFC
      </h1>
      <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
        From vision to reality - how India's premier combat sports platform was born.
      </p>
    </div>
  </div>
</section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">HOW IT BEGAN</p>
              <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">A Movement, Not Just Events.</h2>
              <p className="text-gray-300 leading-relaxed mb-4">GFC was founded with a simple belief: India deserves world-class combat sports. Not just one event, but a sustainable platform that builds stars, tells stories, and creates a community.</p>
              <p className="text-gray-400 leading-relaxed">What started as an idea has grown into a movement. Today, GFC represents the future of fighting culture in India - where fighters become legends and fans become family.</p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-900/30 rounded-2xl p-8">
                <FaQuoteLeft className="text-red-600 text-4xl mb-4" />
                <p className="text-xl italic">"We're not building events. We're building a legacy."</p>
                <p className="text-red-500 mt-4 font-semibold">— GFC Founders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4">THE JOURNEY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">Key Milestones</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="border border-white/10 hover:border-red-600 transition-all rounded-xl p-6 text-center">
                <p className="text-red-600 text-5xl font-black mb-2">{milestone.year}</p>
                <h3 className="text-xl font-bold uppercase mb-2">{milestone.title}</h3>
                <p className="text-gray-400 text-sm">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase mb-4">Be Part of the <span className="text-red-600">Origin Story.</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">Join the founding GFC Community and help shape the future of combat sports in India.</p>
          <button onClick={handleGetTickets} className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-lg font-bold uppercase tracking-wide">JOIN THE MOVEMENT</button>
        </div>
      </section>
    </div>
  );
}