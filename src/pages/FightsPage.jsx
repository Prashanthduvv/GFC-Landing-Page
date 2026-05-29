import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaClock, FaSearch, 
  FaFilter, FaArrowRight, FaEye, FaBell, FaShare, FaLink,
  FaCheckCircle, FaChartLine, FaMedal, FaTrophy, FaTimes,
  FaPlayCircle, FaChartBar, FaWeightHanging, FaUserFriends,
  FaChartPie, FaPercentage, FaFistRaised, FaShieldAlt, FaWhatsapp,
  FaTwitter, FaFacebook, FaInstagram, FaHeart, FaBookmark, FaStar,
  FaCrown, FaGem, FaEnvelope, FaUser, FaPhone, FaCalendarCheck
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TicketModal from "../components/TicketModal";
import { useTicketModal } from "../hooks/useTicketModal";

// ================= DATA STRUCTURES =================

const fightCardsData = {
  upcoming: [
    {
      id: 1,
      event: "GFC GlobaX : Origin",
      date: "2026-06-20",
      time: "6:00 PM IST",
      location: "Indira Gandhi Arena, New Delhi",
      image: "/images/c1.png",
      ticketPrice: 299,
      availableSeats: 2500,
      fights: [
        { 
          id: 1,
          fighter1: { name: "Arjun Malik", record: "8-0-0", nickname: "The Technician", image: "/f1.png", age: 28, height: "5'10\"", reach: "72\"", knockouts: 4, submissions: 2, wins: 8, losses: 0, style: "Muay Thai" },
          fighter2: { name: "Vikram Rathore", record: "6-1-0", nickname: "The Beast", image: "/f2.png", age: 30, height: "6'1\"", reach: "74\"", knockouts: 5, submissions: 0, wins: 6, losses: 1, style: "Wrestling" },
          weightClass: "Welterweight", isMainEvent: true, prediction: "Malik by KO", round: 2, confidence: 78,
          odds: { fighter1: "-120", fighter2: "+100" },
          significance: "Title Fight",
        },
        { 
          id: 2,
          fighter1: { name: "Meera Iyer", record: "7-0-0", nickname: "The Warrior", image: "/f2.png", age: 26, height: "5'4\"", reach: "64\"", knockouts: 3, submissions: 4, wins: 7, losses: 0, style: "BJJ" },
          fighter2: { name: "Priya Singh", record: "5-1-0", nickname: "The Storm", image: "/f3.png", age: 27, height: "5'5\"", reach: "65\"", knockouts: 2, submissions: 1, wins: 5, losses: 1, style: "Boxing" },
          weightClass: "Strawweight", isMainEvent: false, prediction: "Iyer by Decision", round: 3, confidence: 65,
          odds: { fighter1: "-150", fighter2: "+120" },
          significance: "Co-Main Event",
        },
        { 
          id: 3,
          fighter1: { name: "Zayn Khan", record: "6-1-0", nickname: "The Punisher", image: "/f3.png", age: 29, height: "5'9\"", reach: "70\"", knockouts: 4, submissions: 2, wins: 6, losses: 1, style: "Kickboxing" },
          fighter2: { name: "Rohit Sharma", record: "5-2-0", nickname: "The Rocket", image: "/f1.png", age: 31, height: "5'8\"", reach: "68\"", knockouts: 3, submissions: 1, wins: 5, losses: 2, style: "Freestyle" },
          weightClass: "Lightweight", isMainEvent: false, prediction: "Khan by KO", round: 1, confidence: 82,
          odds: { fighter1: "-200", fighter2: "+160" },
          significance: "Featured Bout",
        },
      ]
    }
  ],
  past: [
    { id: 1, title: "GFC Prelims: Rising Stars", date: "March 15, 2026", venue: "Mumbai, India", winner: "Team Red", highlights: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "GFC Fight Night 1", date: "February 10, 2026", venue: "Bangalore, India", winner: "Team Black", highlights: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ]
};

const weightClasses = ["All", "Welterweight", "Strawweight", "Lightweight", "Middleweight", "Heavyweight"];

// ================= COUNTDOWN TIMER COMPONENT =================
function CountdownTimer({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        if (onComplete) onComplete();
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      }
      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
      {Object.entries(timeLeft).map(([key, value], idx) => (
        <motion.div 
          key={key}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="border border-gray-700 bg-black rounded-lg flex flex-col items-center justify-center min-w-[60px] sm:min-w-[75px] md:min-w-[85px] p-2 sm:p-3 md:p-4 hover:border-red-600 transition-all duration-300"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{value}</p>
          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wider">{key}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ================= FIGHTER COMPARISON MODAL =================
function FighterComparisonModal({ fight, onClose }) {
  const handleBuyTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
    onClose();
  };

  const handleShareFight = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/fights/${fight.id}`);
      alert("Fight link copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10">✕</button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center uppercase mb-6">Fighter Comparison</h2>
          
          <div className="grid grid-cols-3 gap-4 items-center text-center mb-8">
            <div>
              <img src={fight.fighter1.image} alt={fight.fighter1.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-red-500" />
              <h3 className="text-xl font-bold mt-2">{fight.fighter1.name}</h3>
              <p className="text-red-500 text-sm">{fight.fighter1.record}</p>
            </div>
            <div>
              <div className="text-4xl  text-red-600">VS</div>
              <p className="text-gray-400 text-sm mt-2">{fight.weightClass}</p>
            </div>
            <div>
              <img src={fight.fighter2.image} alt={fight.fighter2.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-red-500" />
              <h3 className="text-xl font-bold mt-2">{fight.fighter2.name}</h3>
              <p className="text-red-500 text-sm">{fight.fighter2.record}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Wins</span><span>Losses</span></div>
              <div className="flex h-2 rounded-full overflow-hidden">
                <div className="bg-green-500" style={{ width: `${(fight.fighter1.wins / (fight.fighter1.wins + fight.fighter1.losses)) * 100}%` }} />
                <div className="bg-red-500" style={{ width: `${(fight.fighter1.losses / (fight.fighter1.wins + fight.fighter1.losses)) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{fight.fighter1.wins} - {fight.fighter1.losses}</span>
                <span>{fight.fighter2.wins} - {fight.fighter2.losses}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-3"><p className="text-gray-400 text-xs">Age</p><p className="text-lg font-bold">{fight.fighter1.age} vs {fight.fighter2.age}</p></div>
              <div className="bg-white/5 rounded-lg p-3"><p className="text-gray-400 text-xs">Height</p><p className="text-lg font-bold">{fight.fighter1.height} vs {fight.fighter2.height}</p></div>
              <div className="bg-white/5 rounded-lg p-3"><p className="text-gray-400 text-xs">Reach</p><p className="text-lg font-bold">{fight.fighter1.reach} vs {fight.fighter2.reach}</p></div>
              <div className="bg-white/5 rounded-lg p-3"><p className="text-gray-400 text-xs">Style</p><p className="text-sm font-bold">{fight.fighter1.style} vs {fight.fighter2.style}</p></div>
            </div>

            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4 text-center">
              <p className="text-red-500 font-bold uppercase text-sm">Prediction</p>
              <p className="text-white text-lg font-bold">{fight.prediction}</p>
              <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full rounded-full" style={{ width: `${fight.confidence}%` }} />
              </div>
              <p className="text-gray-400 text-xs mt-1">Confidence: {fight.confidence}%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button onClick={handleBuyTickets} className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-bold uppercase tracking-wide">BUY TICKETS TO WATCH LIVE</button>
            <button onClick={handleShareFight} className="flex-1 border border-white/20 hover:border-red-600 transition py-3 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2"><FaShare /> SHARE FIGHT</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ================= FIGHT PREVIEW MODAL =================
function FightPreviewModal({ fight, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10">✕</button>
        <div className="aspect-video bg-black">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5vAqBcE3AMo?autoplay=1" title="Fight Preview" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold uppercase">{fight.fighter1.name} vs {fight.fighter2.name}</h3>
          <p className="text-gray-400 text-sm mt-1">Full fight preview and analysis</p>
<button
  onClick={() => {
    onClose(); // Close current modal first

    // Small delay ensures smooth transition
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("openTicketModal"));
    }, 200);
  }}
  className="mt-4 bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg text-sm font-bold uppercase"
>
  GET TICKETS
</button>        </div>
      </motion.div>
    </div>
  );
}

// ================= MAIN PAGE COMPONENT =================
export default function FightsPage() {
  // Ticket Modal Hook
  const { isOpen: isTicketModalOpen, closeModal: closeTicketModal } = useTicketModal();
  
  // State Declarations
  const [selectedFight, setSelectedFight] = useState(null);
  const [previewFight, setPreviewFight] = useState(null);
  const [viewMode, setViewMode] = useState("upcoming");
  const [selectedWeightClass, setSelectedWeightClass] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredFight, setHoveredFight] = useState(null);
  const [emailNotify, setEmailNotify] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [bookmarkedFights, setBookmarkedFights] = useState([]);
  
  // Remind Me Button States
  const [remindEmail, setRemindEmail] = useState("");
  const [remindSubmitted, setRemindSubmitted] = useState(false);
  const [remindError, setRemindError] = useState("");
  const [showRemindModal, setShowRemindModal] = useState(false);
  
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();
  const navigate = useNavigate();

  const currentEvent = fightCardsData.upcoming[0];
  const allFights = currentEvent?.fights || [];
  
  const filteredFights = allFights.filter(fight => {
    const matchesWeight = selectedWeightClass === "All" || fight.weightClass === selectedWeightClass;
    const matchesSearch = searchTerm === "" || 
      fight.fighter1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fight.fighter2.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWeight && matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem("bookmarked_fights") || "[]");
    setBookmarkedFights(saved);
  }, []);

  useEffect(() => {
    if (isStatsInView) controls.start("visible");
  }, [isStatsInView, controls]);

  // ================= CTA HANDLERS =================
  const handleGetTickets = useCallback(() => {
    console.log("Opening ticket modal...");
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  }, []);

  const handleJoinCommunity = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (emailNotify) {
      setNotifySubmitted(true);
      setTimeout(() => setNotifySubmitted(false), 3000);
      setEmailNotify("");
      const subscribers = JSON.parse(localStorage.getItem("fight_notifications") || "[]");
      if (!subscribers.includes(emailNotify)) {
        subscribers.push(emailNotify);
        localStorage.setItem("fight_notifications", JSON.stringify(subscribers));
      }
    }
  };

  // Remind Me Handler
  const handleRemindMe = () => {
    setShowRemindModal(true);
  };

  const handleRemindSubmit = async (e) => {
    e.preventDefault();
    
    if (!remindEmail) {
      setRemindError("Email is required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(remindEmail)) {
      setRemindError("Please enter a valid email address");
      return;
    }
    
    setRemindSubmitted(true);
    setRemindError("");
    
    // Save to localStorage
    const reminders = JSON.parse(localStorage.getItem("gfc_reminders") || "[]");
    if (!reminders.some(r => r.email === remindEmail)) {
      reminders.push({
        email: remindEmail,
        event: "GFC GlobaX : Origin",
        date: "2026-06-20",
        time: "6:00 PM IST",
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("gfc_reminders", JSON.stringify(reminders));
    }
    
    // Also add to notifications
    const subscribers = JSON.parse(localStorage.getItem("fight_notifications") || "[]");
    if (!subscribers.includes(remindEmail)) {
      subscribers.push(remindEmail);
      localStorage.setItem("fight_notifications", JSON.stringify(subscribers));
    }
    
    // Show success message and close modal after delay
    setTimeout(() => {
      setRemindSubmitted(false);
      setShowRemindModal(false);
      setRemindEmail("");
    }, 2000);
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

  const handleBookmarkFight = (fightId, e) => {
    e.stopPropagation();
    let newBookmarks;
    if (bookmarkedFights.includes(fightId)) {
      newBookmarks = bookmarkedFights.filter(id => id !== fightId);
    } else {
      newBookmarks = [...bookmarkedFights, fightId];
    }
    setBookmarkedFights(newBookmarks);
    localStorage.setItem("bookmarked_fights", JSON.stringify(newBookmarks));
  };

  const handleClearFilters = () => {
    setSelectedWeightClass("All");
    setSearchTerm("");
  };

  const handleViewFightCard = () => {
    document.getElementById("fight-card-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: "TOTAL FIGHTS", value: "24", icon: FaTrophy },
    { label: "ACTIVE FIGHTERS", value: "18", icon: FaUserFriends },
    { label: "EVENTS HELD", value: "3", icon: FaCalendarAlt },
    { label: "CITIES", value: "3", icon: FaMapMarkerAlt },
    { label: "KO RATE", value: "68%", icon: FaFistRaised },
    { label: "TICKETS SOLD", value: "15K+", icon: FaTicketAlt },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="pt-16 sm:pt-20 overflow-x-hidden">
      
      {/* ================= TICKET MODAL ================= */}
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} />
      
      {/* ================= REMIND ME MODAL ================= */}
      <AnimatePresence>
        {showRemindModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setShowRemindModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-gradient-to-br from-zinc-900 to-black border border-red-600/30 rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowRemindModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
              
              {!remindSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <FaBell className="text-red-500 text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-bold uppercase">Get Reminded</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      We'll notify you when tickets go on sale for GFC GlobaX : Origin
                    </p>
                  </div>
                  
                  <form onSubmit={handleRemindSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={remindEmail}
                      onChange={(e) => {
                        setRemindEmail(e.target.value);
                        setRemindError("");
                      }}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                      required
                    />
                    {remindError && <p className="text-red-500 text-xs">{remindError}</p>}
                    
                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-red-500" size={12} />
                        <span>Event: June 20, 2026 | 6:00 PM IST</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" size={12} />
                        <span>Venue: Indira Gandhi Arena, New Delhi</span>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-bold uppercase text-sm"
                    >
                      Send Me Reminder
                    </button>
                  </form>
                  
                  <p className="text-gray-500 text-xs text-center mt-4">
                    We'll email you when tickets are available. No spam, unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-6">
                  <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold uppercase">Reminder Set!</h3>
                  <p className="text-gray-300 mt-2">We'll notify you at <strong>{remindEmail}</strong></p>
                  <p className="text-gray-400 text-sm mt-3">when tickets go on sale for GFC GlobaX : Origin</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="relative w-full min-h-[500px] sm:min-h-[550px] lg:min-h-[650px]">
          
          <img src="/images/c1.png" alt="Fights Hero" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          
          <div className="relative z-10 flex items-center h-full min-h-[500px] sm:min-h-[550px] lg:min-h-[650px]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">
                  UPCOMING EVENT
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl  uppercase leading-tight">
                  GFC GlobaX : <span className="text-red-600">Origin</span>
                </motion.h1>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4 mt-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-2"><FaCalendarAlt className="text-red-500" /><span>June 20, 2026</span></div>
                  <div className="flex items-center gap-2"><FaClock className="text-red-500" /><span>6:00 PM IST</span></div>
                  <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /><span>New Delhi</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-3 mt-6">
                  <button onClick={handleGetTickets} className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"><FaTicketAlt /> BOOK YOUR SEATS</button>
                  <button onClick={handleViewFightCard} className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"><FaEye /> VIEW FIGHT CARD</button>
                  <button onClick={handleSharePage} className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-6 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2"><FaShare /> SHARE</button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTERS ================= */}
      <section ref={statsRef} className="py-12 border-y border-red-900/20 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" animate={controls} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 rounded-xl hover-glow cursor-pointer" onClick={stat.label === "TICKETS SOLD" ? handleGetTickets : undefined}>
                  <Icon className="text-red-500 text-2xl sm:text-3xl mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl  text-white">{stat.value}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= COUNTDOWN TIMER ================= */}
      <section className="py-12 bg-gradient-to-r from-black via-red-900/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 uppercase tracking-[4px] text-sm mb-4 font-semibold animate-pulse">THE COUNTDOWN BEGINS</p>
          <CountdownTimer targetDate={`${currentEvent?.date}T18:00:00`} />
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button onClick={handleGetTickets} className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg text-sm font-bold uppercase hover-glow">
              <FaTicketAlt className="inline mr-2" /> SECURE YOUR TICKETS NOW - ₹{currentEvent?.ticketPrice}
            </button>
            <button onClick={handleRemindMe} className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg text-sm font-bold uppercase flex items-center gap-2">
              <FaBell className="text-yellow-500" /> REMIND ME
            </button>
          </div>
          <p className="mt-4 text-gray-500 text-xs">
            <FaShieldAlt className="inline mr-1 text-green-500" /> 
            Limited seats remaining: {currentEvent?.availableSeats.toLocaleString()} tickets left
          </p>
        </div>
      </section>

      {/* ================= VIEW MODE TOGGLE ================= */}
      <section className="py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: "upcoming", label: "UPCOMING FIGHTS", icon: FaCalendarAlt },
              { id: "highlights", label: "FIGHT HIGHLIGHTS", icon: FaPlayCircle },
              { id: "past", label: "PAST EVENTS", icon: FaTrophy },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button key={mode.id} onClick={() => setViewMode(mode.id)} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold uppercase text-sm transition-all duration-300 ${viewMode === mode.id ? "bg-red-600 text-white shadow-lg shadow-red-900/30" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                  <Icon size={14} /> {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FILTERS & SEARCH ================= */}
      {viewMode === "upcoming" && (
        <section className="py-5 bg-[#050505] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2">
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm uppercase hover:bg-white/10 transition"><FaFilter /> {showFilters ? "HIDE" : "FILTER"}</button>
                <div className="relative">
                  <input type="text" placeholder="Search fighters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition w-64" />
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                </div>
              </div>
              {(selectedWeightClass !== "All" || searchTerm) && <button onClick={handleClearFilters} className="text-red-500 text-xs hover:text-red-400 transition">Clear filters</button>}
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap justify-center gap-2">
                    {weightClasses.map((weight) => (
                      <button key={weight} onClick={() => setSelectedWeightClass(weight)} className={`px-4 py-2 rounded-lg text-sm uppercase transition-all ${selectedWeightClass === weight ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>{weight}</button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ================= UPCOMING FIGHTS GRID ================= */}
      {viewMode === "upcoming" && (
        <section id="fight-card-section" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl  uppercase">Fight Card</h2>
              <p className="text-red-500 uppercase tracking-[4px] text-sm mt-2">COMPLETE EVENT LINEUP</p>
              <p className="text-gray-400 text-sm mt-2">Showing {filteredFights.length} of {allFights.length} fights</p>
            </div>

            {filteredFights.length === 0 ? (
              <div className="text-center py-20"><p className="text-gray-400 text-lg">No fights found matching your criteria.</p><button onClick={handleClearFilters} className="mt-4 text-red-500 hover:text-red-400">Clear filters</button></div>
            ) : (
              <div className="space-y-6">
                {filteredFights.map((fight, index) => (
                  <motion.div key={fight.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.01 }} onMouseEnter={() => setHoveredFight(fight.id)} onMouseLeave={() => setHoveredFight(null)} className="bg-gradient-to-r from-zinc-900 to-black border border-red-900/30 rounded-2xl overflow-hidden hover-glow relative">
                    {fight.isMainEvent && (<div className="bg-red-600 px-4 py-1 text-center"><p className="text-white text-xs font-bold uppercase tracking-wider">⭐ MAIN EVENT ⭐</p></div>)}
                    <button onClick={(e) => handleBookmarkFight(fight.id, e)} className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-red-600 transition"><FaBookmark className={`text-sm ${bookmarkedFights.includes(fight.id) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} /></button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 items-center">
                      <div className="text-center">
                        <img src={fight.fighter1.image} alt={fight.fighter1.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-2 border-red-500" />
                        <h3 className="text-base md:text-lg font-bold mt-2">{fight.fighter1.name}</h3>
                        <p className="text-gray-400 text-xs">"{fight.fighter1.nickname}"</p>
                        <p className="text-red-500 text-xs font-semibold mt-1">{fight.fighter1.record}</p>
                      </div>
                      <div className="text-center">
                        <motion.div className="text-2xl md:text-3xl  text-red-600" animate={hoveredFight === fight.id ? { scale: 1.1 } : { scale: 1 }}>VS</motion.div>
                        <p className="text-gray-400 text-xs mt-1">{fight.weightClass}</p>
                        <div className="flex justify-center gap-2 mt-2">
                          <button onClick={(e) => { e.stopPropagation(); setPreviewFight(fight); }} className="text-red-500 text-xs hover:text-red-400 transition flex items-center gap-1"><FaPlayCircle size={10} /> Preview</button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedFight(fight); }} className="text-gray-400 text-xs hover:text-white transition flex items-center gap-1"><FaChartBar size={10} /> Stats</button>
                        </div>
                      </div>
                      <div className="text-center">
                        <img src={fight.fighter2.image} alt={fight.fighter2.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-2 border-red-500" />
                        <h3 className="text-base md:text-lg font-bold mt-2">{fight.fighter2.name}</h3>
                        <p className="text-gray-400 text-xs">"{fight.fighter2.nickname}"</p>
                        <p className="text-red-500 text-xs font-semibold mt-1">{fight.fighter2.record}</p>
                      </div>
                      <div className="md:col-span-2 bg-black/50 rounded-xl p-3 text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Expert Prediction</p>
                        <p className="text-white text-sm font-bold">{fight.prediction}</p>
                        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-yellow-500 to-red-500 h-full rounded-full" style={{ width: `${fight.confidence}%` }} /></div>
                        <p className="text-gray-400 text-xs mt-1">{fight.confidence}% confidence</p>
                        {fight.odds && <p className="text-yellow-500 text-xs mt-1">Odds: {fight.odds.fighter1} / {fight.odds.fighter2}</p>}
                      </div>
                    </div>
                    
                    <div className="bg-black/30 px-5 py-3 flex justify-center gap-4">
                      <button onClick={() => setPreviewFight(fight)} className="text-red-500 text-xs md:text-sm font-semibold uppercase tracking-wide hover:text-red-400 transition flex items-center gap-1"><FaPlayCircle /> WATCH PREVIEW</button>
                      <button onClick={() => setSelectedFight(fight)} className="text-gray-400 text-xs md:text-sm font-semibold uppercase tracking-wide hover:text-white transition flex items-center gap-1"><FaChartLine /> VIEW STATS</button>
                      <button onClick={handleGetTickets} className="text-green-500 text-xs md:text-sm font-semibold uppercase tracking-wide hover:text-green-400 transition flex items-center gap-1"><FaTicketAlt /> GET TICKETS</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            <div className="mt-10 text-center">
              <button onClick={handleGetTickets} className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-lg font-bold uppercase tracking-wide"><FaTicketAlt className="inline mr-2" /> BUY TICKETS FOR ALL FIGHTS</button>
            </div>
          </div>
        </section>
      )}

      {/* ================= FIGHT HIGHLIGHTS ================= */}
      {viewMode === "highlights" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl  uppercase">Fight Highlights</h2><p className="text-red-500 uppercase tracking-[4px] text-sm mt-2">BEST MOMENTS FROM GFC</p></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div key={item} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: item * 0.1 }} className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => setPreviewFight(allFights[0])}>
                  <img src={`/images/c${item}.png`} alt="Highlight" className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-white font-bold">GFC GlobaX {item}: Knockout of the Night</p><p className="text-gray-400 text-sm">View Count: {Math.floor(Math.random() * 100)}K</p></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"><FaPlayCircle className="text-white text-3xl" /></div></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PAST EVENTS ================= */}
      {viewMode === "past" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl  uppercase">Past Events</h2><p className="text-red-500 uppercase tracking-[4px] text-sm mt-2">RELIVE THE MOMENTS</p></div>
            <div className="grid md:grid-cols-2 gap-6">
              {fightCardsData.past.map((event, index) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#050505] border border-white/10 rounded-xl p-6 hover:border-red-600 transition">
                  <h3 className="text-xl font-bold uppercase">{event.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{event.date} | {event.venue}</p>
                  <p className="text-red-500 text-sm mt-2 font-semibold">🏆 Winner: {event.winner}</p>
                  <button onClick={() => setPreviewFight(allFights[0])} className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-400 transition"><FaPlayCircle /> WATCH HIGHLIGHTS</button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= NOTIFY ME SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-black to-red-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl  uppercase">Don't Miss Out!</h3>
              <p className="text-gray-300 mt-2">Get notified when tickets go on sale and receive exclusive fight updates, fighter announcements, and pre-sale access.</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><FaCheckCircle className="text-green-500" /> Early access</span>
                <span className="flex items-center gap-1"><FaCheckCircle className="text-green-500" /> Exclusive offers</span>
                <span className="flex items-center gap-1"><FaCheckCircle className="text-green-500" /> Fight updates</span>
              </div>
            </div>
            <div>
              <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
                <button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2"
                >
                  <FaBell /> GET NOTIFIED
                </button>
              </form>
              <AnimatePresence>
                {notifySubmitted && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 text-sm mt-2 flex items-center gap-2">
                    <FaCheckCircle /> Successfully subscribed! We'll keep you updated.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/c1.png')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl  uppercase mb-4 leading-tight">BE THERE LIVE.<br /><span className="text-red-600">WITNESS HISTORY.</span></h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8">Secure your seats now for the most anticipated combat sports event in India. Experience world-class production, elite fighters, and an unforgettable atmosphere.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleGetTickets} className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-bold uppercase tracking-wide shadow-2xl shadow-red-900/50 flex items-center gap-2"><FaTicketAlt /> GET YOUR TICKETS NOW</button>
              <button onClick={handleJoinCommunity} className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-8 py-4 rounded-xl font-bold uppercase flex items-center gap-2"><FaHeart /> JOIN COMMUNITY</button>
              <button onClick={handleSharePage} className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-8 py-4 rounded-xl font-bold uppercase flex items-center gap-2"><FaShare /> SHARE EVENT</button>
            </div>
            <p className="mt-6 text-gray-500 text-xs">Limited seats remaining: {currentEvent?.availableSeats.toLocaleString()} tickets left</p>
            <div className="flex justify-center gap-4 mt-6">
              <FaShieldAlt className="text-gray-500 text-sm" />
              <span className="text-gray-500 text-xs">Secure Checkout</span>
              <FaCheckCircle className="text-gray-500 text-sm ml-2" />
              <span className="text-gray-500 text-xs">Instant Confirmation</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TOAST NOTIFICATION ================= */}
      <AnimatePresence>
        {showShareToast && (<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"><FaCheckCircle /> Link copied to clipboard!</motion.div>)}
      </AnimatePresence>

      {/* ================= MODALS ================= */}
      <AnimatePresence>
        {selectedFight && <FighterComparisonModal fight={selectedFight} onClose={() => setSelectedFight(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {previewFight && <FightPreviewModal fight={previewFight} onClose={() => setPreviewFight(null)} />}
      </AnimatePresence>

      <style jsx>{`
        .hover-glow { transition: all 0.3s ease; }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}