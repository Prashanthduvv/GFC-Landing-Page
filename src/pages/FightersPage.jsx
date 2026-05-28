import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
  FaTrophy,
  FaChartLine,
  FaWeightHanging,
  FaCalendarAlt,
  FaUserFriends,
  FaMedal,
  FaHeart,
  FaShieldAlt,
  FaFistRaised,
  FaChartBar,
  FaLink,
  FaEnvelope,
  FaBell,
  FaCheckCircle,
  FaTicketAlt,
  FaWhatsapp,
  FaShare,
  FaBookmark,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ================= FIGHTER DATA =================
const fightersData = [
  {
    id: 1,
    name: "ARJUN MALIK",
    nickname: "The Technician",
    record: "8-0-0",
    weightClass: "Welterweight",
    image: "/f1.png",
    tag1: "THE TECHNICIAN.",
    tag2: "THE THINKER.",
    age: 28,
    height: "5'10\"",
    reach: '72"',
    knockouts: 4,
    submissions: 2,
    wins: 8,
    losses: 0,
    style: "Muay Thai",
    country: "India",
    ranking: 1,
    social: { instagram: "https://instagram.com/arjunmalik", twitter: "https://twitter.com/arjunmalik" },
    bio: "Undefeated welterweight sensation known for technical precision and fight IQ.",
  },
  {
    id: 2,
    name: "MEERA IYER",
    nickname: "The Warrior",
    record: "7-0-0",
    weightClass: "Strawweight",
    image: "/f2.png",
    tag1: "THE WARRIOR.",
    tag2: "THE FINISHER.",
    age: 26,
    height: "5'4\"",
    reach: '64"',
    knockouts: 3,
    submissions: 4,
    wins: 7,
    losses: 0,
    style: "BJJ",
    country: "India",
    ranking: 1,
    social: { instagram: "https://instagram.com/meera.iyer", twitter: "https://twitter.com/meera.iyer" },
    bio: "BJJ black belt with devastating submission game and undefeated streak.",
  },
  {
    id: 3,
    name: "ZAYN KHAN",
    nickname: "The Punisher",
    record: "6-1-0",
    weightClass: "Lightweight",
    image: "/f3.png",
    tag1: "THE PUNISHER.",
    tag2: "THE STORM.",
    age: 29,
    height: "5'9\"",
    reach: '70"',
    knockouts: 4,
    submissions: 2,
    wins: 6,
    losses: 1,
    style: "Kickboxing",
    country: "India",
    ranking: 2,
    social: { instagram: "https://instagram.com/zaynkhan", twitter: "https://twitter.com/zaynkhan" },
    bio: "Explosive striker with knockout power in both hands.",
  },
  {
    id: 4,
    name: "RAJIV MENON",
    nickname: "The Silent Killer",
    record: "5-0-0",
    weightClass: "Middleweight",
    image: "/f1.png",
    tag1: "THE SILENT KILLER.",
    tag2: "THE PRECISE.",
    age: 31,
    height: "6'1\"",
    reach: '74"',
    knockouts: 3,
    submissions: 2,
    wins: 5,
    losses: 0,
    style: "Boxing",
    country: "India",
    ranking: 3,
    social: { instagram: "https://instagram.com/rajivmenon", twitter: "https://twitter.com/rajivmenon" },
    bio: "Precision boxer with slick footwork and counter-striking.",
  },
  {
    id: 5,
    name: "ANJALI REDDY",
    nickname: "The Cyclone",
    record: "6-1-0",
    weightClass: "Flyweight",
    image: "/f2.png",
    tag1: "THE CYCLONE.",
    tag2: "THE AGGRESSOR.",
    age: 25,
    height: "5'5\"",
    reach: '65"',
    knockouts: 2,
    submissions: 1,
    wins: 6,
    losses: 1,
    style: "Wrestling",
    country: "India",
    ranking: 2,
    social: { instagram: "https://instagram.com/anjalireddy", twitter: "https://twitter.com/anjalireddy" },
    bio: "Relentless pressure fighter with non-stop action.",
  },
  {
    id: 6,
    name: "KARAN SINGH",
    nickname: "The Bulldozer",
    record: "7-1-0",
    weightClass: "Heavyweight",
    image: "/f3.png",
    tag1: "THE BULLDOZER.",
    tag2: "THE POWER.",
    age: 32,
    height: "6'3\"",
    reach: '76"',
    knockouts: 6,
    submissions: 0,
    wins: 7,
    losses: 1,
    style: "Freestyle",
    country: "India",
    ranking: 1,
    social: { instagram: "https://instagram.com/karansingh", twitter: "https://twitter.com/karansingh" },
    bio: "Devastating heavyweight with one-punch KO power.",
  },
];

const weightClasses = [
  "All",
  "Welterweight",
  "Strawweight",
  "Lightweight",
  "Middleweight",
  "Flyweight",
  "Heavyweight",
];
const sortOptions = [
  "Ranking",
  "Name A-Z",
  "Record",
  "Most KOs",
  "Most Submissions",
];

// ================= FIGHTER DETAIL MODAL =================
function FighterDetailModal({ fighter, onClose }) {
  const navigate = useNavigate();

  const openSocial = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWatchFight = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
    onClose();
  };

  const handleViewFightHistory = () => {
    navigate("/fights");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Header with Image and Name */}
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <img
                src={fighter.image}
                alt={fighter.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover border-4 border-red-500"
              />
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={() => openSocial(fighter.social.instagram)}
                  className="text-gray-400 hover:text-pink-500 transition"
                >
                  <FaInstagram size={18} />
                </button>
                <button
                  onClick={() => openSocial(fighter.social.twitter)}
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  <FaTwitter size={18} />
                </button>
                <button
                  onClick={() => openSocial(`https://wa.me/?text=Check out ${fighter.name} - GFC Fighter`)}
                  className="text-gray-400 hover:text-green-500 transition"
                >
                  <FaWhatsapp size={18} />
                </button>
              </div>
            </div>
            <div className="md:col-span-2 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-red-600/20 border border-red-600 rounded-full text-xs font-semibold mb-2">
                #{fighter.ranking} Ranked {fighter.weightClass}
              </div>
              <h2 className="text-3xl md:text-4xl  uppercase">
                {fighter.name}
              </h2>
              <p className="text-red-500 text-lg">"{fighter.nickname}"</p>
              <p className="text-gray-400 text-sm mt-2">{fighter.bio}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs uppercase">Record</p>
              <p className="text-xl font-bold text-white">{fighter.record}</p>
              <p className="text-green-500 text-xs">
                {fighter.wins}W - {fighter.losses}L
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs uppercase">Finishes</p>
              <p className="text-xl font-bold text-white">
                {fighter.knockouts + fighter.submissions}
              </p>
              <p className="text-yellow-500 text-xs">
                {fighter.knockouts} KO / {fighter.submissions} SUB
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs uppercase">Height / Reach</p>
              <p className="text-lg font-bold text-white">
                {fighter.height} / {fighter.reach}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-gray-400 text-xs uppercase">Fighting Style</p>
              <p className="text-lg font-bold text-white">{fighter.style}</p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-6">
            <h3 className="text-lg font-bold uppercase mb-3">
              Performance Metrics
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Striking Accuracy</span>
                  <span>{Math.floor(65 + Math.random() * 25)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-red-600 h-full rounded-full"
                    style={{ width: `${65 + Math.random() * 25}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Takedown Accuracy</span>
                  <span>{Math.floor(40 + Math.random() * 40)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${40 + Math.random() * 40}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Significant Strikes Landed Per Minute</span>
                  <span>{(3 + Math.random() * 3).toFixed(1)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-600 h-full rounded-full"
                    style={{ width: `${50 + Math.random() * 40}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleWatchFight}
              className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <FaTicketAlt /> WATCH FIGHT LIVE
            </button>
            <button
              onClick={handleViewFightHistory}
              className="flex-1 border border-white/20 hover:border-red-600 transition py-3 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <FaChartLine /> VIEW FIGHT HISTORY
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="flex-1 border border-white/20 hover:border-red-600 transition py-3 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <FaShare /> SHARE PROFILE
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ================= MAIN PAGE COMPONENT =================
export default function FightersPage() {
  const [selectedWeight, setSelectedWeight] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Ranking");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [bookmarkedFighters, setBookmarkedFighters] = useState([]);
  const [emailNotify, setEmailNotify] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isStatsInView) {
      controls.start("visible");
      setAnimateStats(true);
    }
  }, [isStatsInView, controls]);

  // ================= CTA HANDLERS =================
  
  // 1. Get Tickets Handler
  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  // 2. Join Community Handler
  const handleJoinCommunity = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. Get Updates Handler
  const handleGetUpdates = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. View Fighter Profile Handler
  const handleViewProfile = (fighter) => {
    setSelectedFighter(fighter);
  };

  // 5. Watch Next Fight Handler
  const handleWatchNextFight = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  // 6. Share Page Handler
  const handleSharePage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  // 7. Bookmark Fighter Handler
  const handleBookmarkFighter = (fighterId, e) => {
    e.stopPropagation();
    if (bookmarkedFighters.includes(fighterId)) {
      setBookmarkedFighters(bookmarkedFighters.filter(id => id !== fighterId));
    } else {
      setBookmarkedFighters([...bookmarkedFighters, fighterId]);
    }
  };

  // 8. Clear Filters Handler
  const handleClearFilters = () => {
    setSelectedWeight("All");
    setSearchTerm("");
    setSortBy("Ranking");
  };

  // 9. Email Notification Handler
  const handleEmailNotify = (e) => {
    e.preventDefault();
    if (emailNotify) {
      setNotifySubmitted(true);
      setTimeout(() => setNotifySubmitted(false), 3000);
      setEmailNotify("");
      // Store email in localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem("fighter_subscribers") || "[]");
      if (!subscribers.includes(emailNotify)) {
        subscribers.push(emailNotify);
        localStorage.setItem("fighter_subscribers", JSON.stringify(subscribers));
      }
    }
  };

  // Filter and Sort Fighters
  let filteredFighters = fightersData.filter((fighter) => {
    const matchesWeight =
      selectedWeight === "All" || fighter.weightClass === selectedWeight;
    const matchesSearch =
      fighter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fighter.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWeight && matchesSearch;
  });

  // Apply Sorting
  filteredFighters = [...filteredFighters].sort((a, b) => {
    switch (sortBy) {
      case "Name A-Z":
        return a.name.localeCompare(b.name);
      case "Record":
        return (
          parseInt(b.record.split("-")[0]) - parseInt(a.record.split("-")[0])
        );
      case "Most KOs":
        return b.knockouts - a.knockouts;
      case "Most Submissions":
        return b.submissions - a.submissions;
      default: // Ranking
        return a.ranking - b.ranking;
    }
  });

  // Stats for counters
  const stats = [
    {
      label: "TOTAL FIGHTERS",
      value: fightersData.length,
      icon: FaUserFriends,
      suffix: "",
    },
    {
      label: "UNDEFEATED",
      value: fightersData.filter((f) => f.losses === 0).length,
      icon: FaTrophy,
      suffix: "",
    },
    {
      label: "TOTAL KO/TKO",
      value: fightersData.reduce((sum, f) => sum + f.knockouts, 0),
      icon: FaFistRaised,
      suffix: "",
    },
    {
      label: "TOTAL SUBMISSIONS",
      value: fightersData.reduce((sum, f) => sum + f.submissions, 0),
      icon: FaMedal,
      suffix: "",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="pt-16 sm:pt-24 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-[1400px] mx-auto relative w-full bg-black overflow-hidden">
        <div className="relative w-full h-[75vh] sm:h-[30vh] lg:min-h-[470px]">
          <img
            src="/images/c2.png"
            alt="Fighters Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex items-center h-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">
                  THE WARRIORS
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl  uppercase leading-tight">
                  Meet The <span className="text-red-600">Fighters</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
                  Get to know the elite athletes redefining combat sports in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTERS ================= */}
      <section
        ref={statsRef}
        className="py-10 border-y border-red-900/20 bg-gradient-to-b from-black to-[#050505]"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center cursor-pointer p-3 rounded-xl hover-glow"
                >
                  <Icon className="text-red-500 text-2xl sm:text-3xl mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl  text-white">
                    {animateStats ? stat.value : "0"}
                    {stat.suffix}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= FILTERS & SEARCH ================= */}
      <section className="py-6 border-b border-white/10 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-xs sm:text-sm uppercase tracking-wide hover:bg-white/10 transition"
              >
                <FaFilter /> {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search fighters by name or nickname..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {weightClasses.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm uppercase font-semibold transition-all rounded-lg ${
                        selectedWeight === weight
                          ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Showing {filteredFighters.length} of {fightersData.length} fighters
            </p>
            {(selectedWeight !== "All" || searchTerm || sortBy !== "Ranking") && (
              <button
                onClick={handleClearFilters}
                className="mt-2 text-red-500 text-xs hover:text-red-400 transition"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ================= FIGHTERS GRID ================= */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFighters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">
                No fighters found matching your criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-red-500 hover:text-red-400 transition"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredFighters.map((fighter, index) => (
                <motion.div
                  key={fighter.id}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="relative bg-gradient-to-b from-zinc-900 to-black border border-gray-800 hover:border-red-600 overflow-hidden group rounded-xl cursor-pointer transition-all duration-300 hover-glow"
                >
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => handleBookmarkFighter(fighter.id, e)}
                    className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-red-600 transition z-20"
                  >
                    <FaBookmark className={`text-sm ${bookmarkedFighters.includes(fighter.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                  </button>

                  {/* Rank Badge */}
                  <div className="absolute top-4 left-14 z-10">
                    <div className="bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      #{fighter.ranking}
                    </div>
                  </div>

                  {/* Record Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-black/80 text-yellow-500 text-xs font-bold px-2 py-1 rounded-full border border-yellow-500/30">
                      {fighter.record}
                    </div>
                  </div>

                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(`${window.location.origin}/fighters/${fighter.id}`);
                      setShowShareToast(true);
                      setTimeout(() => setShowShareToast(false), 2000);
                    }}
                    className="absolute bottom-20 right-4 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <FaShare className="text-gray-400 text-sm hover:text-white" />
                  </button>

                  {/* Fighter Image */}
                  <div className="relative h-[280px] sm:h-[300px] overflow-hidden">
                    <img
                      src={fighter.image}
                      alt={fighter.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Fighter Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <h3 className="text-lg sm:text-xl font-bold tracking-wide uppercase text-white">
                      {fighter.name}
                    </h3>
                    <p className="text-red-500 text-xs uppercase font-semibold mt-1">
                      {fighter.tag1}
                    </p>
                    <p className="text-red-500 text-xs uppercase">
                      {fighter.tag2}
                    </p>

                    {/* Stats Row */}
                    <div className="flex justify-center gap-4 mt-3 text-center">
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase">KOs</p>
                        <p className="text-white text-sm font-bold">
                          {fighter.knockouts}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase">Subs</p>
                        <p className="text-white text-sm font-bold">
                          {fighter.submissions}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase">Style</p>
                        <p className="text-white text-sm font-bold">
                          {fighter.style.slice(0, 3)}
                        </p>
                      </div>
                    </div>

                    {/* VIEW PROFILE BUTTON - Primary CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFighter(fighter);
                      }}
                      className="mt-3 w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 text-[10px] sm:text-xs uppercase font-semibold transition-all duration-300 rounded-lg text-white flex items-center justify-center gap-2"
                    >
                      <FaEye size={12} /> VIEW FULL PROFILE
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= FEATURED FIGHTER SPOTLIGHT ================= */}
      <section className="py-16 bg-gradient-to-r from-red-900/10 via-black to-black border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl  uppercase">
              Fighter <span className="text-red-600">Spotlight</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Get to know our champions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/f1.png"
                alt="Featured Fighter"
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-red-600/20 border border-red-600 rounded-full text-xs font-semibold mb-3">
                FEATURED ATHLETE
              </div>
              <h3 className="text-3xl  uppercase">ARJUN MALIK</h3>
              <p className="text-red-500 text-lg">"The Technician"</p>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Undefeated welterweight champion with an 8-0 record. Known for
                his technical striking and elite fight IQ. Training out of New
                Delhi, Malik is considered one of India's most promising MMA
                talents.
              </p>
              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                {/* VIEW PROFILE CTA */}
                <button
                  onClick={() => setSelectedFighter(fightersData[0])}
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                >
                  <FaEye /> VIEW PROFILE
                </button>
                {/* WATCH NEXT FIGHT CTA */}
                <button
                  onClick={handleWatchNextFight}
                  className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-6 py-2 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                >
                  <FaTicketAlt /> WATCH NEXT FIGHT
                </button>
                {/* SHARE CTA */}
                <button
                  onClick={handleSharePage}
                  className="border border-white/30 hover:border-red-600 hover:bg-red-600/10 transition px-6 py-2 rounded-lg text-sm font-bold uppercase flex items-center gap-2"
                >
                  <FaShare /> SHARE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GET FIGHTER UPDATES SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-black to-red-900/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl  uppercase">
                Never Miss a <span className="text-red-600">Fight</span>
              </h3>
              <p className="text-gray-300 mt-2">
                Get notified when tickets go on sale and receive exclusive fighter updates, 
                interview alerts, and behind-the-scenes content.
              </p>
            </div>
            <div>
              <form onSubmit={handleEmailNotify} className="flex flex-col sm:flex-row gap-3">
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
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg font-bold uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <FaBell /> GET UPDATES
                </button>
              </form>
              <AnimatePresence>
                {notifySubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-500 text-sm mt-2 flex items-center gap-2"
                  >
                    <FaCheckCircle /> Successfully subscribed to fighter updates!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-black" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl  uppercase mb-4">
              Want to See More Fighters?
              <br />
              <span className="text-red-600">Join the GFC Community.</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
              Get exclusive access to fighter interviews, behind-the-scenes
              content, early event notifications, and meet your favorite athletes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* JOIN MOVEMENT CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinCommunity}
                className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-500 px-8 py-4 rounded-xl font-bold uppercase tracking-wide shadow-2xl shadow-red-900/50 group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative z-10 flex items-center gap-2">
                  <FaHeart /> JOIN THE MOVEMENT
                </span>
              </motion.button>
              
              {/* GET UPDATES CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetUpdates}
                className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-8 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <FaEnvelope /> GET FIGHTER UPDATES
              </motion.button>
              
              {/* SHARE PAGE CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSharePage}
                className="border-2 border-white/30 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 px-8 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2"
              >
                <FaShare /> SHARE PAGE
              </motion.button>
            </div>
            <p className="mt-6 text-gray-500 text-xs">
              Join 5,000+ members already part of the movement
            </p>
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
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <FaCheckCircle /> Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FIGHTER DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedFighter && (
          <FighterDetailModal
            fighter={selectedFighter}
            onClose={() => setSelectedFighter(null)}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-pulse { animation: pulse 2s infinite; }
        .hover-glow { transition: all 0.3s ease; }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}