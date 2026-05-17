import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  FaTrophy, FaUsers, FaGlobe, FaStar, FaRocket, FaHeart, 
  FaPlayCircle, FaHandshake, FaArrowRight, FaCheckCircle, 
  FaBuilding, FaMedal, FaInstagram, FaLinkedin, FaTimes,
  FaInfoCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const [animatedStats, setAnimatedStats] = useState({
    founded: 0,
    members: 0,
    fighters: 0,
    cities: 0
  });
  
  const [showVideo, setShowVideo] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  
  // Refs for scrolling
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const missionRef = useRef(null);
  
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  // Target values
  const targetStats = {
    founded: 2026,
    members: 5000,
    fighters: 8,
    cities: 3
  };

  // Animate stats counter
  useEffect(() => {
    if (isStatsInView) {
      controls.start("visible");
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setAnimatedStats({
          founded: Math.min(targetStats.founded, Math.floor(targetStats.founded * (currentStep / steps))),
          members: Math.min(targetStats.members, Math.floor(targetStats.members * (currentStep / steps))),
          fighters: Math.min(targetStats.fighters, Math.floor(targetStats.fighters * (currentStep / steps))),
          cities: Math.min(targetStats.cities, Math.floor(targetStats.cities * (currentStep / steps))),
        });
        if (currentStep >= steps) clearInterval(interval);
      }, stepTime);
      return () => clearInterval(interval);
    }
  }, [isStatsInView, controls]);

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  // Improved LEARN MORE CTA Handler
  const handleLearnMore = () => {
    // 1. Smooth scroll to Core Values section
    const valuesSection = document.getElementById("core-values");
    if (valuesSection) {
      valuesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    
    // 2. Update URL hash without reload
    window.history.pushState(null, "", "#core-values");
    
    // 3. Analytics tracking (ready for Google Analytics or similar)
    console.log("[Analytics] Learn More clicked - Scrolling to Core Values");
    
    // 4. Optional: Add visual feedback (you can implement a toast notification)
    // showToast("Exploring GFC Core Values");
  };

  // Alternative: Scroll to specific section by ID
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  // Stats data with icons
  const stats = [
    { key: "founded", number: animatedStats.founded, label: "FOUNDED", icon: FaStar, suffix: "" },
    { key: "members", number: animatedStats.members, label: "COMMUNITY MEMBERS", icon: FaUsers, suffix: "+" },
    { key: "fighters", number: animatedStats.fighters, label: "ROSTER FIGHTERS", icon: FaTrophy, suffix: "" },
    { key: "cities", number: animatedStats.cities, label: "CITIES", icon: FaGlobe, suffix: "" },
  ];

  // Core values with enhanced content
  const values = [
    { 
      title: "AUTHENTICITY", 
      desc: "Real stories, real fighters, real passion. Every battle tells a truth.", 
      icon: FaHeart,
    },
    { 
      title: "EXCELLENCE", 
      desc: "World-class production, elite competition, and uncompromising quality.", 
      icon: FaStar,
    },
    { 
      title: "COMMUNITY", 
      desc: "Building a movement together. Every member is part of our family.", 
      icon: FaUsers,
    },
    { 
      title: "INNOVATION", 
      desc: "Redefining combat sports in India with cutting-edge experiences.", 
      icon: FaRocket,
    },
  ];

  const teamMembers = [
    { name: "VIKRAM RAJ", role: "CEO & Founder", bio: "Former athlete turned visionary", image: "/f1.png" },
    { name: "ANJALI SHARMA", role: "Head of Operations", bio: "10+ years in sports management", image: "/f2.png" },
    { name: "RAHUL MEHTA", role: "Fight Director", bio: "Expert matchmaker", image: "/f3.png" },
    { name: "PRIYA SINGH", role: "Community Lead", bio: "Building the movement", image: "/f1.png" },
  ];

  // Milestones timeline
  const milestones = [
    { year: "2024", title: "THE VISION", desc: "GFC was founded with a dream to revolutionize combat sports in India.", icon: FaBuilding },
    { year: "2025", title: "THE BUILD", desc: "Assembled elite fighters, secured venues, and built our founding community.", icon: FaUsers },
    { year: "2026", title: "THE ORIGIN", desc: "GFC Global 1: Origin - The first event that started it all.", icon: FaStar },
    { year: "2027", title: "THE EXPANSION", desc: "Expanding to multiple cities across India with GFC Global 2 & 3.", icon: FaGlobe },
  ];

  // Press mentions
  const pressMentions = [
    { name: "ESPN", title: "India's Rising Combat Sports Powerhouse" },
    { name: "Times of India", title: "The Future of MMA in India" },
    { name: "Sportstar", title: "GFC: Building a Movement" },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const navigate = useNavigate();

  return (
    <div className="pt-20 sm:pt-24 overflow-x-hidden" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      
  {/* ================= HERO SECTION ================= */}
<section className="max-w-[1400px] mx-auto relative w-full bg-black overflow-hidden">

  <div className="relative w-full h-[75vh] sm:h-[30vh] lg:min-h-[470px]">

    {/* Background Image */}
    <img
      src="https://media.dave.sport/boxingsocial/2026/03/Screenshot-2026-03-21-at-11.31.09-PM.png"
      alt="About Hero"
      className="
        absolute inset-0
        w-full h-full
        object-contain
        object-center
      "
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

    {/* Content */}
    <div className="relative z-10 flex items-center h-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl">

          <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">
            ABOUT GFC
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            We Are Building <span className="text-red-600">A Movement.</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
            India's premier combat sports platform focused on fighters,
            storytelling, and community-driven growth.
          </p>

        </div>

      </div>
    </div>

  </div>
</section>

      {/* ================= STATS SECTION ================= */}
      <section ref={statsRef} className="py-12 sm:py-16 border-y border-red-900/20 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-pointer"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Icon className="text-red-500 text-3xl sm:text-4xl mx-auto mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                    {stat.number.toLocaleString()}{stat.suffix}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section id="mission" ref={missionRef} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">OUR MISSION</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-[1.1]" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
                To Give Fighters <br />
                <span className="text-red-600">The Stage They Deserve.</span>
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  GFC is more than an event platform. We're building an ecosystem where 
                  fighters become stars, stories become legends, and fans become part of 
                  something bigger than themselves.
                </p>
                <div className="flex items-start gap-3 pt-4">
                  <FaCheckCircle className="text-red-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">100% Dedicated to fighter development and athlete welfare</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">World-class production values and fan experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">Building a sustainable future for combat sports in India</p>
                </div>
              </div>
              
              {/* IMPROVED LEARN MORE CTA BUTTON */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLearnMore}
                className="mt-8 group relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-500 px-8 py-4 rounded-xl font-bold text-base uppercase tracking-wide shadow-2xl shadow-red-900/50 flex items-center gap-3"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.3)'}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  <FaInfoCircle className="text-white" />
                  LEARN MORE ABOUT GFC
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
              style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500" />
              <img 
                src="/images/c2.png" 
                alt="Mission" 
                className="relative rounded-2xl border border-red-900/30 w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-2xl" />
              <button 
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-900/50">
                  <FaPlayCircle className="text-white text-3xl sm:text-4xl ml-1" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES SECTION (with ID for scrolling) ================= */}
      <section id="core-values" className="py-16 sm:py-20 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">CORE VALUES</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>What We Stand For</h2>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">The principles that drive everything we do at GFC</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  onHoverStart={() => setSelectedValue(index)}
                  onHoverEnd={() => setSelectedValue(null)}
                  className={`bg-black border rounded-xl p-6 text-center transition-all duration-500 cursor-pointer ${
                    selectedValue === index 
                      ? 'border-red-600 shadow-2xl shadow-red-900/30 scale-[1.02]' 
                      : 'border-white/10 hover:border-red-600/50'
                  }`}
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-red-500 text-3xl" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">THE LEADERSHIP</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>The Minds Behind <span className="text-red-600">The Movement</span></h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold uppercase">{member.name}</h3>
                  <p className="text-red-500 text-xs font-semibold mt-1">{member.role}</p>
                  <p className="text-gray-400 text-xs mt-2">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                      <FaInstagram size={12} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors">
                      <FaLinkedin size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MILESTONES TIMELINE ================= */}
      <section className="py-16 sm:py-20 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">THE JOURNEY</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>Our <span className="text-red-600">Milestones</span></h2>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-red-600/30 hidden lg:block" />
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col lg:flex-row items-center gap-6 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 lg:text-right">
                      <div className={`bg-black border border-white/10 rounded-xl p-6 hover:border-red-600 transition-all duration-300 ${
                        index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                      }`}
                      style={{ transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="text-red-500 text-2xl" />
                          <span className="text-red-600 font-black text-2xl">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase mb-2">{milestone.title}</h3>
                        <p className="text-gray-400 text-sm">{milestone.desc}</p>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <div className="w-8 h-8 bg-red-600 rounded-full border-4 border-black shadow-xl" style={{ animation: 'pulse 2s infinite' }} />
                    </div>
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRESS MENTIONS ================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold">AS SEEN IN</p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>Press & Media <span className="text-red-600">Recognition</span></h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {pressMentions.map((press, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-[#050505] border border-white/10 rounded-xl p-6 text-center hover:border-red-600 transition-all duration-300"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMedal className="text-red-500 text-2xl" />
                </div>
                <h3 className="font-bold uppercase">{press.name}</h3>
                <p className="text-gray-400 text-xs mt-2">{press.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-black" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/c1.png')" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase mb-4 leading-[1.1]" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
              Be Part Of <br />
              <span className="text-red-600 relative inline-block">
                History.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 rounded-full" style={{ animation: 'pulse 2s infinite' }} />
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Join the founding GFC Community today and help shape the future of combat sports in India. 
              Limited founding memberships available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/join-community")}
                className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-500 px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide shadow-2xl shadow-red-900/50 group"
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.3)'}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  JOIN GFC COMMUNITY <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
            <p className="mt-6 text-red-500 text-xs uppercase tracking-[3px] font-semibold" style={{ animation: 'pulse 2s infinite' }}>
              LIMITED FOUNDING MEMBERSHIPS OPEN
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" 
          onClick={() => setShowVideo(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition"
              style={{ transition: 'all 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              <FaTimes size={24} />
            </button>
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-red-900/30">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/5vAqBcE3AMo?autoplay=1"
                title="GFC Promo Video"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}