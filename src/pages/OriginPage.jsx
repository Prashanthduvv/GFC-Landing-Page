import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  FaQuoteLeft, FaRocket, FaUsers, FaPlayCircle, FaTimes, FaArrowRight, 
  FaHeart, FaCalendarAlt, FaMapMarkerAlt, FaTrophy, FaEye, FaCheckCircle, 
  FaShare, FaStar, FaGlobe, FaBuilding, FaLightbulb, FaChartLine,
  FaVideo, FaClock, FaAward, FaHandshake,FaTicketAlt 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ================= DATA =================
const milestones = [
  { 
    year: "2024", 
    title: "THE VISION", 
    desc: "GFC was born from a vision to create India's premier combat sports platform. A small team of passionate individuals came together with a bold dream to revolutionize the sport.",
    icon: FaLightbulb,
    color: "from-yellow-500 to-orange-500",
    achievements: ["Founding team assembled", "Initial funding secured", "Vision document created", "First partnerships established"]
  },
  { 
    year: "2025", 
    title: "THE BUILD", 
    desc: "Assembling elite fighters, world-class production, and building the community. The foundation of GFC was laid with careful planning and execution.",
    icon: FaBuilding,
    color: "from-blue-500 to-cyan-500",
    achievements: ["First fighters signed", "Venue partnerships established", "5000+ community members", "Production team assembled"]
  },
  { 
    year: "2026", 
    title: "THE ORIGIN", 
    desc: "GFC Global 1: Origin - The first event that started it all. History was made in New Delhi with a sold-out arena.",
    icon: FaTrophy,
    color: "from-red-600 to-red-500",
    achievements: ["Inaugural event sold out", "Global broadcast deal", "Launched founding community", "8 fighters debuted"]
  },
  { 
    year: "2027", 
    title: "THE EXPANSION", 
    desc: "Expanding to multiple cities across India with GFC Global 2, 3, and beyond. The movement grows stronger every day.",
    icon: FaGlobe,
    color: "from-green-500 to-emerald-500",
    achievements: ["Multiple city launches", "International partnerships", "Growing fighter roster", "Global recognition"]
  },
];

const values = [
  { title: "AUTHENTICITY", desc: "Real stories, real fighters, real passion. Every battle tells a truth.", icon: FaStar, delay: 0 },
  { title: "EXCELLENCE", desc: "World-class production and elite competition. No compromises on quality.", icon: FaAward, delay: 0.1 },
  { title: "COMMUNITY", desc: "Building a movement together. Every member is part of our family.", icon: FaUsers, delay: 0.2 },
  { title: "INNOVATION", desc: "Redefining combat sports in India with cutting-edge experiences.", icon: FaRocket, delay: 0.3 },
];

const stats = [
  { label: "FOUNDED", value: 2024, icon: FaCalendarAlt, suffix: "", delay: 0 },
  { label: "COMMUNITY", value: 5000, icon: FaUsers, suffix: "+", delay: 0.1 },
  { label: "FIGHTERS", value: 8, icon: FaTrophy, suffix: "", delay: 0.2 },
  { label: "CITIES", value: 3, icon: FaMapMarkerAlt, suffix: "", delay: 0.3 },
];

// ================= VIDEO MODAL =================
function VideoModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-gray-400 hover:text-white text-2xl transition-all duration-300 hover:scale-110"
        >
          ✕
        </button>
        <div className="aspect-video bg-black rounded-xl overflow-hidden border border-red-900/30 shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/5vAqBcE3AMo?autoplay=1"
            title="GFC Origin Story"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ================= COUNTING NUMBER COMPONENT =================
function CountingNumber({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const startValue = 0;
      const endValue = target;
      
      const animateCount = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentCount = Math.floor(startValue + (endValue - startValue) * progress);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ================= MAIN PAGE =================
export default function OriginPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ================= CTA HANDLERS =================
  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  const handleJoinCommunity = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSharePage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  const handleWatchStory = () => {
    setShowVideo(true);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const scaleOnHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="pt-16 sm:pt-20 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full bg-black overflow-hidden"
      >
        <div className="relative h-[75vh] sm:h-[85vh] lg:h-screen max-h-[800px]">
          {/* Background Image with Parallax Effect */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8 }}
            src="/images/c1.png"
            alt="Origin Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center h-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold"
                >
                  OUR STORY
                </motion.p>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[1.1]"
                >
                  The <span className="text-red-600">Origin</span>
                  <br />
                  of GFC
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-300 text-sm sm:text-base lg:text-lg mt-6 leading-relaxed max-w-lg"
                >
                  From vision to reality - how India's premier combat sports platform was born.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWatchStory}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-3 rounded-lg text-sm font-bold uppercase shadow-lg shadow-red-900/30"
                  >
                    <FaPlayCircle size={14} /> WATCH THE STORY
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleJoinCommunity}
                    className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                  >
                    <FaHeart /> JOIN THE MOVEMENT
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSharePage}
                    className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                  >
                    <FaShare /> SHARE
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Scroll</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-2 bg-red-500 rounded-full mt-2"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= ANIMATED STATS SECTION ================= */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 border-y border-red-900/20 bg-gradient-to-b from-black to-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 rounded-xl hover-glow transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: stat.delay + 0.2, type: "spring" }}
                  >
                    <Icon className="text-red-500 text-3xl sm:text-4xl mx-auto mb-3" />
                  </motion.div>
                  <p className="text-3xl sm:text-4xl font-black text-white">
                    <CountingNumber target={stat.value} />{stat.suffix}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ================= STORY SECTION ================= */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">HOW IT BEGAN</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight">
                A Movement, <span className="text-red-600">Not Just Events.</span>
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  GFC was founded with a simple belief: India deserves world-class combat sports. 
                  Not just one event, but a sustainable platform that builds stars, tells stories, 
                  and creates a community.
                </p>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                  What started as an idea has grown into a movement. Today, GFC represents the 
                  future of fighting culture in India - where fighters become legends and fans 
                  become family.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-6 border-l-4 border-red-600 bg-red-600/5 rounded-r-xl"
              >
                <FaQuoteLeft className="text-red-500 text-2xl mb-3" />
                <p className="text-gray-300 text-lg italic font-light">
                  "We're not building events. We're building a legacy."
                </p>
                <p className="text-red-500 text-sm mt-3 font-semibold">— GFC Founders</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={handleWatchStory}>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500" />
                <img 
                  src="/images/c2.png" 
                  alt="GFC Story" 
                  className="relative rounded-2xl border border-red-900/30 w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/50"
                  >
                    <FaPlayCircle className="text-white text-4xl ml-1" />
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-600/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-red-600/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES SECTION ================= */}
      <section className="py-20 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">OUR VALUES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">What Drives <span className="text-red-600">Us</span></h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The core principles that guide everything we do</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setHoveredValue(index)}
                  onHoverEnd={() => setHoveredValue(null)}
                  className="bg-black border border-white/10 hover:border-red-600 rounded-xl p-6 text-center transition-all duration-300 hover-glow group"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600/20 transition"
                  >
                    <Icon className="text-red-500 text-3xl" />
                  </motion.div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= INTERACTIVE TIMELINE SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">THE JOURNEY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase">Key <span className="text-red-600">Milestones</span></h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The journey of GFC from vision to reality</p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-600 via-red-500 to-transparent hidden sm:block" />
            
            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                      index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 w-full sm:w-auto ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className={`bg-black border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                          selectedMilestone === index 
                            ? 'border-red-600 shadow-2xl shadow-red-900/20' 
                            : 'border-white/10 hover:border-red-600/50'
                        }`}
                        onClick={() => setSelectedMilestone(selectedMilestone === index ? null : index)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${milestone.color} flex items-center justify-center`}>
                            <Icon className="text-white text-lg" />
                          </div>
                          <span className="text-red-600 font-black text-2xl">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase mb-2">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{milestone.desc}</p>
                        
                        {/* Expandable Achievements */}
                        <AnimatePresence>
                          {selectedMilestone === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-4 pt-4 border-t border-white/10"
                            >
                              <p className="text-xs text-red-500 mb-2 font-semibold">KEY ACHIEVEMENTS:</p>
                              <ul className="space-y-2">
                                {milestone.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 text-gray-400 text-xs"
                                  >
                                    <FaCheckCircle size={10} className="text-green-500" />
                                    {achievement}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative z-10 hidden sm:block">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                        className="w-8 h-8 bg-red-600 rounded-full border-4 border-black shadow-xl flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    </div>
                    
                    {/* Mobile Dot */}
                    <div className="absolute left-0 top-6 sm:hidden">
                      <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-black" />
                    </div>
                    
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= VISION SECTION ================= */}
      <section className="py-20 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">LOOKING AHEAD</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight">
                One Community.<br />
                <span className="text-red-600">Many Cities.</span><br />
                One Movement.
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-gray-300 text-base leading-relaxed">
                  The GFC Community is designed to expand across India through local chapters, 
                  networking circles, live experiences, and community-led engagement.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  Early members will play a major role in helping shape this journey. 
                  Your voice matters in building the future of combat sports in India.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinCommunity}
                  className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <FaHeart /> JOIN THE MOVEMENT
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetTickets}
                  className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                >
                  <FaTicketAlt /> GET TICKETS
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-900/30 rounded-2xl p-8 text-center overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
                <div className="text-8xl mb-4 relative z-10">🇮🇳</div>
                <h3 className="text-2xl font-bold uppercase mb-4">Future Ready</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  GFC is committed to taking Indian combat sports to the global stage. 
                  With plans for international events, fighter exchanges, and global partnerships.
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= QUOTE SECTION ================= */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            >
              <FaQuoteLeft className="text-red-500 text-6xl mx-auto mb-6 opacity-50" />
            </motion.div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light italic max-w-3xl mx-auto leading-relaxed">
              "This is not just a membership. It is early access to a platform being built for the 
              future of combat sports in India."
            </p>
            <p className="text-red-500 text-base sm:text-lg mt-6 font-semibold">— GFC Founding Team</p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-12 h-0.5 bg-red-600" />
              <div className="w-6 h-0.5 bg-red-600/50" />
              <div className="w-3 h-0.5 bg-red-600/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/c1.png')" }} />
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * window.innerWidth, y: -100 }}
              animate={{ y: window.innerHeight + 100 }}
              transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black uppercase mb-4 leading-[1.1]"
            >
              Be Part of <br />
              <span className="text-red-600 relative inline-block">
                History.
                <motion.span 
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -bottom-2 left-0 h-1 bg-red-600 rounded-full"
                />
              </span>
            </motion.h2>
            
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join the founding GFC Community today and help shape the future of combat sports in India. 
              Limited founding memberships available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220,38,38,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinCommunity}
                className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-500 px-8 py-4 rounded-xl font-bold text-base sm:text-lg uppercase tracking-wide shadow-2xl shadow-red-900/50 group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  <FaHeart /> JOIN THE MOVEMENT
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSharePage}
                className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-8 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <FaShare /> SHARE THIS PAGE
              </motion.button>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-red-500 text-xs uppercase tracking-[3px] font-semibold"
            >
              LIMITED FOUNDING MEMBERSHIPS OPEN
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= TOAST NOTIFICATION ================= */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm font-semibold"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheckCircle />
            </motion.div>
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= VIDEO MODAL ================= */}
      <AnimatePresence>
        {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
      </AnimatePresence>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-pulse { animation: pulse 2s infinite; }
        .hover-glow { transition: all 0.3s ease; }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}