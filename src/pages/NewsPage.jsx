import { useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import CountUp from "react-countup";
import {
  FaArrowRight,
  FaBell,
  FaBookmark,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaEye,
  FaFacebook,
  FaFilter,
  FaFire,
  FaHeart,
  FaLink,
  FaNewspaper,
  FaSearch,
  FaShare,
  FaTag,
  FaThumbsUp,
  FaTimes,
  FaTwitter,
  FaUser,
  FaWhatsapp,
  FaBolt,
  FaPlay,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ======================================================
// DATA
// ======================================================

const newsItems = [
  {
    id: 1,
    title: "GFC GlobaX : Origin Officially Announced",
    date: "March 15, 2026",
    author: "GFC Media",
    category: "Events",
    image: "/images/c1.png",
    excerpt:
      "India's biggest combat sports spectacle arrives this June with elite athletes and world-class production.",
    readTime: "3 min",
    views: 15420,
    likes: 234,
    comments: 45,
    featured: true,
  },

  {
    id: 2,
    title: "Arjun Malik Signs Historic GFC Deal",
    date: "March 10, 2026",
    author: "GFC Media",
    category: "Fighters",
    image: "/f1.png",
    excerpt: "Undefeated welterweight sensation officially joins GFC.",
    readTime: "2 min",
    views: 8920,
    likes: 156,
    comments: 23,
  },

  {
    id: 3,
    title: "Founding Community Applications Open",
    date: "March 5, 2026",
    author: "GFC Media",
    category: "Community",
    image: "/images/c3.png",
    excerpt: "Become part of the founding movement with exclusive benefits.",
    readTime: "4 min",
    views: 12500,
    likes: 345,
    comments: 67,
  },

  {
    id: 4,
    title: "GFC Announces Broadcast Partnership",
    date: "February 28, 2026",
    author: "GFC Media",
    category: "Partners",
    image: "/images/c4.png",
    excerpt:
      "Major international expansion begins through premium media partnership.",
    readTime: "3 min",
    views: 9800,
    likes: 212,
    comments: 19,
  },
];

const statsData = [ { id: 1, icon: FaNewspaper, label: "Articles Published", value: 120, suffix: "+", color: "text-red-500", glow: "from-red-500/20 to-red-900/10", description: "Premium combat sports stories and official announcements.", }, { id: 2, icon: FaEye, label: "Monthly Views", value: 10, suffix: "M+", color: "text-blue-400", glow: "from-blue-500/20 to-blue-900/10", description: "Massive globaX reach across digital platforms and live audiences.", }, { id: 3, icon: FaChartLine, label: "Platform Growth", value: 240, suffix: "%", color: "text-green-400", glow: "from-green-500/20 to-green-900/10", description: "Rapid expansion of the GFC combat sports ecosystem worldwide.", }, { id: 4, icon: FaHeart, label: "Community Fans", value: 500, suffix: "K+", color: "text-pink-400", glow: "from-pink-500/20 to-pink-900/10", description: "Passionate fans supporting the future of combat sports.", }, ];

const categories = ["All", "Events", "Fighters", "Community", "Partners"];

const realtimeStats = [
  {
    id: 1,
    label: "Live Fans",
    value: 582340,
    suffix: "+",
    icon: FaHeart,
    color: "from-red-500 to-orange-500",
  },

  {
    id: 2,
    label: "Fight Streams",
    value: 128,
    suffix: "M",
    icon: FaEye,
    color: "from-blue-500 to-cyan-500",
  },

  {
    id: 3,
    label: "Global Athletes",
    value: 420,
    suffix: "+",
    icon: FaChartLine,
    color: "from-green-500 to-emerald-500",
  },

  {
    id: 4,
    label: "Community Members",
    value: 950,
    suffix: "K+",
    icon: FaBell,
    color: "from-pink-500 to-purple-500",
  },
];



// ======================================================
// MODAL
// ======================================================

function NewsModal({ article, onClose }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const shareArticle = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/90 backdrop-blur-xl
        p-4
      "
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        transition={{
          duration: 0.4,
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          max-w-5xl
          w-full
          max-h-[92vh]
          overflow-y-auto
          rounded-[32px]
          border border-red-500/20
          bg-[#050505]
          backdrop-blur-2xl
        "
      >
        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute top-5 right-5 z-20
            w-12 h-12 rounded-full
            bg-white/10 hover:bg-red-600
            flex items-center justify-center
            transition-all duration-300
          "
        >
          <FaTimes />
        </button>

        {/* HERO */}

        <div className="relative h-[260px] sm:h-[400px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8">
            <span className="bg-red-600 px-4 py-2 rounded-full text-xs uppercase font-bold">
              {article.category}
            </span>

            <h2 className="mt-5 text-3xl sm:text-5xl  uppercase leading-tight max-w-4xl">
              {article.title}
            </h2>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-6 sm:p-10">
          {/* META */}

          <div className="flex flex-wrap gap-5 border-b border-white/10 pb-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-red-500" />
              {article.date}
            </span>

            <span className="flex items-center gap-2">
              <FaEye className="text-blue-400" />
              {article.views.toLocaleString()}
            </span>

            <span className="flex items-center gap-2">
              <FaClock className="text-yellow-400" />
              {article.readTime}
            </span>

            <span className="flex items-center gap-2">
              <FaComment className="text-green-400" />
              {article.comments}
            </span>
          </div>

          {/* ARTICLE */}

          <div className="mt-8 space-y-6 text-gray-300 leading-relaxed">
            <p>
              {article.excerpt} GFC continues to redefine combat sports
              experiences through elite athletes, premium production, and
              unforgettable fan engagement.
            </p>

            <p>
              Fans worldwide are preparing for the next evolution of combat
              sports entertainment. Every event is designed with cinematic
              storytelling, immersive experiences, and world-class presentation.
            </p>

            <p>
              This announcement marks another major milestone in GFC’s journey
              toward becoming Asia’s premier fight promotion.
            </p>
          </div>

          {/* ACTIONS */}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`
                min-h-[52px]
                rounded-2xl
                font-bold uppercase
                flex items-center justify-center gap-3
                transition-all duration-300
                ${
                  liked
                    ? "bg-red-600 text-white"
                    : "bg-white/5 border border-white/10 hover:border-red-500"
                }
              `}
            >
              <FaThumbsUp />
              {liked ? "LIKED" : "LIKE"}
            </button>

            <button
              onClick={() => setSaved(!saved)}
              className={`
                min-h-[52px]
                rounded-2xl
                font-bold uppercase
                flex items-center justify-center gap-3
                transition-all duration-300
                ${
                  saved
                    ? "bg-yellow-500 text-black"
                    : "bg-white/5 border border-white/10 hover:border-yellow-500"
                }
              `}
            >
              <FaBookmark />
              {saved ? "SAVED" : "SAVE"}
            </button>

            <button
              onClick={shareArticle}
              className="
                min-h-[52px]
                rounded-2xl
                bg-white/5 border border-white/10
                hover:border-red-500
                font-bold uppercase
                flex items-center justify-center gap-3
                transition-all duration-300
              "
            >
              <FaShare />
              SHARE
            </button>

            <button
              className="
                min-h-[52px]
                rounded-2xl
                bg-white/5 border border-white/10
                hover:border-blue-500
                font-bold uppercase
                flex items-center justify-center gap-3
                transition-all duration-300
              "
            >
              <FaLink />
              COPY LINK
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function NewsPage() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedArticle, setSelectedArticle] = useState(null);

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  const [subscribed, setSubscribed] = useState(false);

  const { scrollY } = useScroll();

  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // ======================================================
  // FILTERED DATA
  // ======================================================

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const categoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;

      const searchMatch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  const featuredArticle = filteredNews[0];

  const regularArticles = filteredNews.slice(1);

  // ======================================================
  // SUBSCRIBE
  // ======================================================

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);

    setEmail("");
  };

  // ======================================================
  // LOADER
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />

          <p className="mt-6 text-red-500 uppercase tracking-[4px] text-sm font-bold">
            Loading GFC News...
          </p>
        </motion.div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="relative overflow-hidden bg-black text-white">
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* GRID */}

        <div
          className="
            absolute inset-0 opacity-20
            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
            bg-[size:50px_50px]
          "
        />

        {/* ORBS */}

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/10 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.img
          style={{ scale: heroScale }}
          src="/images/c3.png"
          alt="Hero"
          className="
            absolute inset-0
            w-full h-full
            object-cover opacity-30
          "
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

        <div className="relative z-10 max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-32">
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            {/* TOP LABEL */}

            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
              <FaBolt className="text-red-500" />

              <p className="uppercase tracking-[5px] text-red-500 text-xs font-bold">
                Live Updates
              </p>
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-8
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
                
                uppercase
                leading-[0.92]
                tracking-tight
                max-w-5xl
              "
            >
              GFC{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                News.
              </span>
            </h1>

            {/* DESC */}

            <p className="mt-8 max-w-2xl text-gray-300 text-base sm:text-lg leading-relaxed">
              Discover elite stories, fight announcements, athlete signings, and
              premium combat sports experiences from GFC.
            </p>

            {/* ACTIONS */}

            <div className="mt-10 flex flex-wrap gap-5">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="
                  min-h-[56px]
                  px-8
                  rounded-2xl
                  bg-red-600 hover:bg-red-700
                  font-bold uppercase
                  flex items-center gap-3
                  transition-all duration-300
                  hover:shadow-[0_0_35px_rgba(239,68,68,0.4)]
                "
              >
                Explore Stories
                <FaArrowRight />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() => navigate("/join-community")}
                className="
                  min-h-[56px]
                  px-8
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  hover:border-red-500
                  font-bold uppercase
                  transition-all duration-300
                "
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>


{/* ====================================================== */}
{/* REALTIME STATS */}
{/* ====================================================== */}

<section className="relative overflow-hidden">
  {/* BACKGROUND GLOW */}

  <div className="absolute inset-0">
    <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full" />

    <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full" />
  </div>

  <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    {/* HEADER */}

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <p className="uppercase tracking-[5px] text-red-500 text-sm font-bold">
        Live Platform Metrics
      </p>

      <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl globaxuppercase">
        Real-Time <span className="text-red-500">Growth.</span>
      </h2>

      <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
        Experience the explosive rise of GFC through live audience engagement,
        global athlete expansion, and premium combat sports reach.
      </p>
    </motion.div>

    {/* GRID */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {realtimeStats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="
              group relative overflow-hidden
              rounded-[32px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-8
              transition-all duration-500
              hover:border-red-500/40
            "
          >
            {/* LIVE DOT */}

            <div className="absolute top-5 right-5 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />

                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>

              <span className="text-xs uppercase tracking-[2px] text-red-500 font-bold">
                LIVE
              </span>
            </div>

            {/* ICON */}

            <div
              className={`
                w-20 h-20 rounded-3xl
                bg-gradient-to-br ${stat.color}
                flex items-center justify-center
                shadow-[0_0_40px_rgba(239,68,68,0.25)]
              `}
            >
              <Icon className="text-3xl text-white" />
            </div>

            {/* VALUE */}

            <div className="mt-8">
              <h3 className="text-5xl globaxuppercase leading-none">
                <CountUp
                  end={stat.value}
                  duration={3}
                  separator=","
                />

                <span className="text-red-500 ml-1">
                  {stat.suffix}
                </span>
              </h3>

              <p className="mt-4 text-gray-400 uppercase tracking-[2px] text-sm font-semibold">
                {stat.label}
              </p>
            </div>

            {/* HOVER GLOW */}

            <div
              className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition-opacity duration-500
                bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5
              "
            />
          </motion.div>
        );
      })}
    </div>
  </div>
</section>



      {/* ====================================================== */}
      {/* FILTERS */}
      {/* ====================================================== */}

      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* SEARCH */}

            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-[280px] sm:w-[340px]
                    min-h-[52px]
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    focus:border-red-500
                    pl-12 pr-5
                    outline-none
                    transition-all duration-300
                  "
                />

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* CATEGORIES */}

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    min-h-[48px]
                    px-5 rounded-full
                    text-xs uppercase font-bold
                    transition-all duration-300
                    ${
                      selectedCategory === category
                        ? "bg-red-600 text-white"
                        : "bg-white/5 border border-white/10 hover:border-red-500"
                    }
                  `}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* FEATURED */}
      {/* ====================================================== */}

      {featuredArticle && (
        <section className="py-24">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            {/* HEADER */}

            <div className="mb-14">
              <p className="uppercase tracking-[5px] text-red-500 text-sm font-bold">
                Featured Story
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl  uppercase">
                Editor's <span className="text-red-500">Pick</span>
              </h2>
            </div>

            {/* FEATURE CARD */}

            <motion.div
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              whileHover={{
                y: -10,
              }}
              onClick={() => setSelectedArticle(featuredArticle)}
              className="
                group relative overflow-hidden
                rounded-[40px]
                border border-white/10
                hover:border-red-500/40
                cursor-pointer
              "
            >
              <div className="relative h-[350px] sm:h-[520px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 sm:p-12 max-w-4xl">
                  <span className="bg-red-600 px-4 py-2 rounded-full text-xs uppercase font-bold">
                    {featuredArticle.category}
                  </span>

                  <h3 className="mt-6 text-3xl sm:text-5xl  uppercase leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="mt-5 text-gray-300 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <FaEye className="text-blue-400" />
                      {featuredArticle.views.toLocaleString()}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaClock className="text-yellow-400" />
                      {featuredArticle.readTime}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaHeart className="text-pink-400" />
                      {featuredArticle.likes}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ====================================================== */}
      {/* GRID */}
      {/* ====================================================== */}

      <section className="pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* HEADER */}

          <div className="mb-14">
            <p className="uppercase tracking-[5px] text-red-500 text-sm font-bold">
              Latest Stories
            </p>

            <h2 className="mt-4 text-4xl sm:text-5xl  uppercase">
              Recent <span className="text-red-500">Articles</span>
            </h2>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.8,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                onClick={() => setSelectedArticle(article)}
                className="
                  group relative overflow-hidden
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  border border-white/10
                  hover:border-red-500/40
                  rounded-[32px]
                  transition-all duration-500
                  cursor-pointer
                "
              >
                {/* IMAGE */}

                <div className="relative h-[220px] sm:h-[260px] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 px-3 py-1 rounded-full text-xs uppercase font-bold">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-6">
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-red-500" />
                      {article.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaEye className="text-blue-400" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl  uppercase leading-tight">
                    {article.title}
                  </h3>

                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-2">
                        <FaClock className="text-yellow-400" />
                        {article.readTime}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaHeart className="text-pink-400" />
                        {article.likes}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-red-500 font-bold uppercase text-sm">
                      Read
                      <FaArrowRight />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* NEWSLETTER */}
      {/* ====================================================== */}

      <section className="py-28 bg-gradient-to-r from-red-950/10 via-black to-black border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                x: -80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <p className="uppercase tracking-[5px] text-red-500 text-sm font-bold">
                Newsletter
              </p>

              <h2 className="mt-5 text-4xl sm:text-5xl  uppercase leading-tight">
                Never Miss An <span className="text-red-500">Update.</span>
              </h2>

              <p className="mt-6 text-gray-400 max-w-xl leading-relaxed">
                Subscribe for exclusive stories, event announcements, athlete
                signings, and premium GFC updates.
              </p>
            </motion.div>

            {/* FORM */}

            <motion.form
              onSubmit={handleSubscribe}
              initial={{
                opacity: 0,
                x: 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                bg-white/[0.04]
                backdrop-blur-2xl
                border border-white/10
                rounded-[32px]
                p-8
              "
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="
                    flex-1
                    min-h-[56px]
                    rounded-2xl
                    bg-black/30
                    border border-white/10
                    focus:border-red-500
                    px-5
                    outline-none
                  "
                />

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  type="submit"
                  className="
                    min-h-[56px]
                    px-8
                    rounded-2xl
                    bg-red-600 hover:bg-red-700
                    font-bold uppercase
                    flex items-center justify-center gap-3
                    transition-all duration-300
                  "
                >
                  <FaBell />
                  Subscribe
                </motion.button>
              </div>

              <AnimatePresence>
                {subscribed && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="mt-4 text-green-400 text-sm flex items-center gap-2"
                  >
                    <FaCheckCircle />
                    Successfully subscribed!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FINAL CTA */}
      {/* ====================================================== */}

      <section className="py-32 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{
              opacity: 0,
              y: 80,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              
              uppercase
              leading-[0.95]
            "
          >
            Join The <span className="text-red-500">Movement.</span>
          </motion.h2>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Become part of India's fastest growing combat sports community and
            experience premium fight entertainment.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => navigate("/join-community")}
            className="
              mt-12
              min-h-[56px]
              px-10
              rounded-2xl
              bg-red-600 hover:bg-red-700
              font-bold uppercase
              inline-flex items-center gap-4
              transition-all duration-300
              hover:shadow-[0_0_45px_rgba(239,68,68,0.45)]
            "
          >
            <FaHeart />
            Join GFC Community
          </motion.button>
        </div>
      </section>

      {/* ====================================================== */}
      {/* MODAL */}
      {/* ====================================================== */}

      <AnimatePresence>
        {selectedArticle && (
          <NewsModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>

      {/* ====================================================== */}
      {/* STYLES */}
      {/* ====================================================== */}

      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #050505;
        }

        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
