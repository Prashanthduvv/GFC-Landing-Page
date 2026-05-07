import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TicketModal from "../components/TicketModal";
import { useTicketModal } from "../hooks/useTicketModal";
import NewsletterSubscribe from "../components/NewsletterSubscribe";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaTimes,
} from "react-icons/fa";

export default function HomePage() {
  const { isOpen: isTicketModalOpen, closeModal: closeTicketModal } = useTicketModal();
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const socials = [
    { icon: FaInstagram, link: "https://instagram.com" },
    { icon: FaYoutube, link: "https://youtube.com" },
    { icon: FaFacebookF, link: "https://facebook.com" },
    { icon: FaTwitter, link: "https://x.com" },
    { icon: FaTiktok, link: "https://tiktok.com" },
  ];

  const eventDate = new Date("2026-06-30T18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }
    return {
      days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const updateTime = () => setTimeLeft(getTimeRemaining());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWatchTrailer = () => setIsTrailerModalOpen(true);

  return (
    <>
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} />
      
      {/* Trailer Modal */}
      {isTrailerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setIsTrailerModalOpen(false)}>
          <div className="relative bg-black rounded-xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsTrailerModalOpen(false)} className="absolute -top-12 right-0 text-gray-400 hover:text-white">
              <FaTimes size={24} />
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="GFC Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="bg-black text-white font-[Inter] overflow-x-hidden w-full">
        {/* ================= HERO SECTION - IMPROVED SPACING ================= */}
        <section 
          id="home" 
          className="relative flex items-center bg-black overflow-hidden"
          style={{
      
            paddingTop: "clamp(70px, 10vh, 120px)",
            paddingBottom: "clamp(40px, 8vh, 80px)",
            marginBottom: "0"
          }}
        >
          {/* BACKGROUND IMAGE - Responsive positioning */}
         <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none">
            <img
              src="/fighter.png"
              alt="fighter"
              className="absolute object-contain opacity-80"
             style={{
  right: "0",
  bottom: "0",

  width: "100%",
  maxWidth: "900px",

  height: "auto",
     maxHeight: "90%",
  objectFit: "contain",
}}
            />
          </div>

          {/* GRADIENT OVERLAY - Enhanced for better text visibility */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, black 0%, black 20%, rgba(0,0,0,0.7) 25%, transparent 100%)"
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10 w-full">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
              <div 
                className="w-full"
                style={{
                  maxWidth: "clamp(280px, 90%, 700px)",
                  marginLeft: "0",
                  marginRight: "auto"
                }}
              >
                {/* Badge */}
                <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                  <p 
                    className="text-red-500 uppercase tracking-[2px] sm:tracking-[3px] md:tracking-[4px]"
                    style={{
                      fontSize: "clamp(10px, 2vw, 14px)"
                    }}
                  >
                    GFC GLOBAL 1: ORIGIN
                  </p>
                </div>

                {/* Main Heading */}
                <h1 className="font-[Anton] italic uppercase tracking-[1px] leading-[1.1]">
                  <span 
                    className="block"
                    style={{
                      fontSize: "clamp(40px, 8vw, 140px)"
                    }}
                  >
                    FIGHTS.
                  </span>
                  <span 
                    className="block"
                    style={{
                      fontSize: "clamp(36px, 7vw, 130px)"
                    }}
                  >
                    STORIES.
                  </span>
                  <span 
                    className="block text-red-500"
                    style={{
                      fontSize: "clamp(32px, 6.5vw, 120px)"
                    }}
                  >
                    LEGENDS.
                  </span>
                </h1>

                {/* Subtitle */}
                <p 
                  className="mt-4 sm:mt-5 md:mt-6 text-gray-300"
                  style={{
                    fontSize: "clamp(14px, 2vw, 18px)"
                  }}
                >
                  India's Next Combat Sports Movement
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8 md:mt-10">
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} 
                    className="bg-red-600 hover:bg-red-700 transition font-semibold whitespace-nowrap"
                    style={{
                      padding: "clamp(10px, 1.5vh, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(11px, 1.5vw, 15px)",
                      borderRadius: "4px"
                    }}
                  >
                    GET TICKETS
                  </button>
                  <button 
                    onClick={handleWatchTrailer} 
                    className="border border-white hover:bg-white hover:text-black transition font-semibold whitespace-nowrap"
                    style={{
                      padding: "clamp(10px, 1.5vh, 16px) clamp(20px, 4vw, 32px)",
                      fontSize: "clamp(11px, 1.5vw, 15px)",
                      borderRadius: "4px"
                    }}
                  >
                    ▶ WATCH TRAILER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - No gap */}
        <section id="about" className="border-t border-neutral-900 bg-black relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 text-center">
              {features.map((item, i) => (
                <div
                  key={i}
                  className={`${i !== features.length - 1 ? 'sm:border-r-2 border-[#333] sm:pr-4 md:pr-5' : ''}`}
                >
                  <i className={`fa ${item.icon} text-red-500 text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3`} />
                  <h3 className="text-[10px] sm:text-xs md:text-sm font-bold uppercase mb-0.5 sm:mb-1 text-white">
                    {item.title}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fighters Section */}
        <section id="fighters" className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
            <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <p className="text-red-600 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mb-2 sm:mb-3">ABOUT GFC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight uppercase text-white">
                WE ARE BUILDING <br /> MORE THAN EVENTS.<br />
                <span className="text-red-600">WE ARE BUILDING A MOVEMENT.</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-4 sm:mt-5 leading-relaxed">
                GFC is a combat sports platform focused on fighters, content and culture.
              </p>
              <button onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} className="mt-5 sm:mt-6 border border-gray-600 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm uppercase hover:bg-white hover:text-black transition rounded-sm text-white">
                GET TICKETS →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {fighters.map((f, i) => (
                <div key={i} className="relative bg-[#0c0c0c] border border-gray-800 overflow-hidden group rounded-md">
                  <img src={f.img} alt={f.name} className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 p-3 sm:p-4 text-center w-full">
                    <h3 className="font-bold text-xs sm:text-sm tracking-wide uppercase text-white">{f.name}</h3>
                    <p className="text-red-600 text-[10px] sm:text-xs uppercase mt-0.5 sm:mt-1">{f.tag1}</p>
                    <p className="text-red-600 text-[10px] sm:text-xs uppercase">{f.tag2}</p>
                    <button className="mt-2 sm:mt-3 border border-gray-600 px-3 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-[10px] uppercase hover:bg-white hover:text-black transition rounded-sm text-white">
                      VIEW PROFILE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Section */}
        <section className="border-t border-gray-800 bg-[#0a0a0a] overflow-hidden py-10 sm:py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-center">
              <div className="flex justify-center md:justify-start order-1">
                <img src="/event.png" alt="event" className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px] object-cover border border-gray-800 rounded-sm" />
              </div>
              <div className="text-center md:text-left order-3 md:order-2">
                <p className="text-red-600 text-[10px] sm:text-xs md:text-sm uppercase tracking-widest">Upcoming Event</p>
                <h2 className="mt-2 sm:mt-3 uppercase font-bold leading-tight text-base sm:text-lg md:text-xl lg:text-2xl text-white">GFC Global 1: Origin</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-gray-400 text-[10px] sm:text-xs mt-2 sm:mt-3">
                  <span>📅 June 2026</span>
                  <span>📍 New Delhi</span>
                  <span>📺 Live on Digital</span>
                </div>
                <button onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} className="mt-3 sm:mt-4 bg-red-600 px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase hover:bg-red-700 transition rounded-sm w-full sm:w-auto text-white">
                  Book Your Seat
                </button>
              </div>
              <div className="text-center md:text-left order-2 md:order-3">
                <p className="text-red-600 text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3">The Countdown Begins</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[260px] sm:max-w-[280px] md:max-w-[320px] mx-auto md:mx-0">
                  <CountdownBox value={timeLeft.days} label="Days" />
                  <CountdownBox value={timeLeft.hours} label="Hrs" />
                  <CountdownBox value={timeLeft.minutes} label="Mins" />
                  <CountdownBox value={timeLeft.seconds} label="Secs" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-12 sm:py-16 md:py-20 bg-black border-t border-neutral-900 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Anton] uppercase mb-8 sm:mb-10 md:mb-12 text-center text-white">
              Our <span className="text-red-500">Sponsors</span>
            </motion.h2>
            <div className="relative overflow-hidden">
              <motion.div className="flex items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }}>
                {[...sponsorLogos, ...sponsorLogos].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center min-w-[70px] sm:min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
                    <img src={logo} alt="sponsor" className="h-7 sm:h-8 md:h-10 lg:h-12 w-auto max-w-[70px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] object-contain" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer with Newsletter */}
        <footer className="border-t border-[#1a1a1a] bg-black">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 sm:py-12 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              <div className="text-center md:text-left">
                <img src="/gfc-logo.png" alt="GFC Logo" className="h-9 sm:h-10 md:h-12 lg:h-14 object-contain mx-auto md:mx-0" />
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 leading-relaxed">Fights. Stories. Legends. Join the movement and be part of India's future in combat sports.</p>
                <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-5 flex-wrap justify-center md:justify-start">
                  {socials.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center border border-gray-700 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-300 rounded-sm">
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-4 sm:mb-5 text-white">Quick Links</h3>
                <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-6 text-xs sm:text-sm md:text-base text-gray-400">
                  {["About", "Media", "Events", "News", "Fighters", "Gallery", "GFC Origin", "Contact", "Sponsors", "FAQs"].map((link, i) => (
                    <span key={i} className="hover:text-white transition cursor-pointer">{link}</span>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Section */}
              <NewsletterSubscribe />
            </div>
            <div className="mt-8 sm:mt-10 md:mt-12 pt-5 border-t border-[#1a1a1a] text-center">
              <p className="text-gray-600 text-[10px] sm:text-xs tracking-wide">© 2025 GFC Global. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const features = [
  { icon: "fa-fire", title: "Elite Fights", desc: "High-intensity matchups" },
  { icon: "fa-camera", title: "Story First", desc: "We build fighters" },
  { icon: "fa-users", title: "Youth Culture", desc: "For new generation" },
  { icon: "fa-play-circle-o", title: "Content Engine", desc: "Reels & action" },
  { icon: "fa-globe", title: "Global", desc: "India to world stage" },
];

const fighters = [
  { name: "ARJUN MALIK", tag1: "THE TECHNICIAN.", tag2: "THE THINKER.", img: "/f1.png" },
  { name: "MEERA IYER", tag1: "THE WARRIOR.", tag2: "THE FINISHER.", img: "/f2.png" },
  { name: "ZAYN KHAN", tag1: "THE PUNISHER.", tag2: "THE STORM.", img: "/f3.png" },
];

const sponsorLogos = ["/p1.png", "/p2.png", "/p3.png", "/p4.png", "/p5.png", "/p6.png"];

function CountdownBox({ value, label }) {
  return (
    <div className="border border-gray-700 bg-black py-2 sm:py-3 rounded-sm min-w-[55px] sm:min-w-[65px] md:min-w-[75px]">
      <p className="text-sm sm:text-base md:text-lg font-bold text-white">{value}</p>
      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 uppercase mt-0.5 tracking-wider">{label}</p>
    </div>
  );
}