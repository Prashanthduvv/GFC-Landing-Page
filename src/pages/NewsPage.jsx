import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, FaUser, FaTag, FaSearch, FaFilter, FaTimes,
  FaArrowRight, FaHeart, FaEnvelope, FaBell, FaShare, FaLink,
  FaFacebook, FaTwitter, FaWhatsapp, FaEye, FaClock, FaBookmark,
  FaThumbsUp, FaComment, FaChartLine, FaNewspaper, FaFire
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ================= NEWS DATA =================
const newsItems = [
  { 
    id: 1, 
    title: "GFC Global 1: Origin Announced", 
    date: "March 15, 2026", 
    author: "GFC Media", 
    category: "Events", 
    image: "/images/c1.png", 
    excerpt: "India's biggest combat sports event is coming to New Delhi this June. Get ready for history in the making.",
    content: "Full article content here...",
    readTime: "3 min read",
    views: 15420,
    likes: 234,
    comments: 45
  },
  { 
    id: 2, 
    title: "Arjun Malik Signs Exclusive Deal", 
    date: "March 10, 2026", 
    author: "GFC Media", 
    category: "Fighters", 
    image: "/f1.png", 
    excerpt: "Undefeated welterweight prospect joins GFC roster in a landmark signing.",
    content: "Full article content here...",
    readTime: "2 min read",
    views: 8920,
    likes: 156,
    comments: 23
  },
  { 
    id: 3, 
    title: "Founding Community Applications Open", 
    date: "March 5, 2026", 
    author: "GFC Media", 
    category: "Community", 
    image: "/images/c3.png", 
    excerpt: "Be part of history - limited founding memberships now available for early supporters.",
    content: "Full article content here...",
    readTime: "4 min read",
    views: 12500,
    likes: 345,
    comments: 67
  },
  { 
    id: 4, 
    title: "GFC Announces Broadcast Partner", 
    date: "February 28, 2026", 
    author: "GFC Media", 
    category: "Partners", 
    image: "/images/c4.png", 
    excerpt: "Global reach for India's premier combat sports platform through new partnership.",
    content: "Full article content here...",
    readTime: "2 min read",
    views: 5600,
    likes: 89,
    comments: 12
  },
  { 
    id: 5, 
    title: "Meera Iyer: The Rise of a Champion", 
    date: "February 20, 2026", 
    author: "GFC Media", 
    category: "Fighters", 
    image: "/f2.png", 
    excerpt: "Exclusive interview with strawweight sensation Meera Iyer ahead of her debut.",
    content: "Full article content here...",
    readTime: "5 min read",
    views: 10300,
    likes: 278,
    comments: 34
  },
  { 
    id: 6, 
    title: "GFC Global 1 Fight Card Revealed", 
    date: "February 15, 2026", 
    author: "GFC Media", 
    category: "Events", 
    image: "/images/c1.png", 
    excerpt: "Stacked lineup announced for inaugural event featuring top talent from across India.",
    content: "Full article content here...",
    readTime: "3 min read",
    views: 18700,
    likes: 423,
    comments: 89
  },
];

const categories = ["All", "Events", "Fighters", "Community", "Partners"];

// ================= NEWS DETAIL MODAL =================
function NewsDetailModal({ article, onClose }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likes || 0);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    const bookmarks = JSON.parse(localStorage.getItem("bookmarked_articles") || "[]");
    if (!bookmarked) {
      bookmarks.push(article.id);
      localStorage.setItem("bookmarked_articles", JSON.stringify(bookmarks));
    } else {
      const newBookmarks = bookmarks.filter(id => id !== article.id);
      localStorage.setItem("bookmarked_articles", JSON.stringify(newBookmarks));
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
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
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900 to-black border border-red-600/30 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-10 transition-all duration-300 hover:rotate-90"
        >
          ✕
        </button>
        
        <div className="p-5 sm:p-6">
          <img src={article.image} alt={article.title} className="w-full h-48 sm:h-64 object-cover rounded-xl mb-5" />
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4">
            <span className="flex items-center gap-1"><FaCalendarAlt size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><FaUser size={10} /> {article.author}</span>
            <span className="flex items-center gap-1 text-red-500"><FaTag size={10} /> {article.category}</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold uppercase mb-3">{article.title}</h2>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-5 pb-4 border-b border-white/10">
            <span><FaEye className="inline mr-1" /> {article.views.toLocaleString()} views</span>
            <span><FaClock className="inline mr-1" /> {article.readTime}</span>
            <span><FaComment className="inline mr-1" /> {article.comments} comments</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              {article.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
            <button 
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold uppercase transition-all duration-300 ${
                liked ? 'bg-red-600 text-white' : 'border border-white/20 hover:border-red-600 hover:bg-red-600/10'
              }`}
            >
              <FaThumbsUp /> {liked ? 'LIKED' : 'LIKE'} ({likesCount})
            </button>
            <button 
              onClick={handleBookmark}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold uppercase transition-all duration-300 ${
                bookmarked ? 'bg-yellow-600 text-white' : 'border border-white/20 hover:border-yellow-600 hover:bg-yellow-600/10'
              }`}
            >
              <FaBookmark /> {bookmarked ? 'SAVED' : 'SAVE'}
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold uppercase border border-white/20 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300"
            >
              <FaShare /> SHARE
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ================= FEATURED NEWS CARD =================
function FeaturedNewsCard({ article, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(article)}
      className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-red-600 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">{article.category}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-3 text-xs text-gray-300 mb-2">
            <span className="flex items-center gap-1"><FaCalendarAlt size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><FaEye size={10} /> {article.views.toLocaleString()}</span>
          </div>
          <h3 className="text-xl font-bold uppercase leading-tight">{article.title}</h3>
          <p className="text-gray-300 text-sm mt-2 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-400 text-xs"><FaClock className="inline mr-1" /> {article.readTime}</span>
            <span className="text-red-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              READ MORE <FaArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ================= MAIN PAGE =================
export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [emailSubscribe, setEmailSubscribe] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = JSON.parse(localStorage.getItem("bookmarked_articles") || "[]");
    setBookmarkedIds(saved);
    if (isStatsInView) controls.start("visible");
  }, [isStatsInView, controls]);

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };
    const navigate = useNavigate();
   
    const handleJoinCommunity = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSubscribe) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmailSubscribe("");
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (!subscribers.includes(emailSubscribe)) {
        subscribers.push(emailSubscribe);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      }
    }
  };

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured article (first of filtered)
  const featuredArticle = filteredNews[0];
  const regularArticles = filteredNews.slice(1);

  // Stats
  const totalArticles = newsItems.length;
  const totalViews = newsItems.reduce((sum, item) => sum + item.views, 0);
  const categoriesCount = categories.length - 1;
  const avgReadTime = Math.round(newsItems.reduce((sum, item) => sum + parseInt(item.readTime), 0) / newsItems.length);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="pt-16 sm:pt-20 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/c3.png" 
            alt="News Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold"
            >
              LATEST UPDATES
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight"
            >
              GFC <span className="text-red-600">News</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed"
            >
              Stay updated with the latest announcements, fight news, and community updates.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section ref={statsRef} className="py-8 border-y border-red-900/20 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { label: "ARTICLES", value: totalArticles, icon: FaNewspaper },
              { label: "TOTAL VIEWS", value: totalViews.toLocaleString(), icon: FaEye },
              { label: "CATEGORIES", value: categoriesCount, icon: FaTag },
              { label: "AVG READ TIME", value: `${avgReadTime} min`, icon: FaClock },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-3 rounded-xl hover-glow cursor-pointer"
                >
                  <Icon className="text-red-500 text-2xl sm:text-3xl mx-auto mb-2" />
                  <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wide">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= FILTERS & SEARCH ================= */}
      <div className="bg-[#050505] border-b border-white/10 sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-xs uppercase hover:bg-white/10 transition-all duration-300"
              >
                <FaFilter size={10} /> {showFilters ? "HIDE" : "FILTER"}
              </button>
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300"
                />
                <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]" />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition">
                    <FaTimes size={10} />
                  </button>
                )}
              </div>
              <div className="hidden sm:flex gap-1 border-l border-white/10 pl-2">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-red-600" : "hover:bg-white/10"}`}
                >
                  ⊞
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-red-600" : "hover:bg-white/10"}`}
                >
                  ☰
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-[10px] sm:text-xs">Showing {filteredNews.length} of {newsItems.length} articles</p>
          </div>
          
          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/10 overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-1.5">
                  {categories.map((category) => {
                    const count = category === "All" ? newsItems.length : newsItems.filter(i => i.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-2.5 py-1 text-[10px] sm:text-xs uppercase font-semibold transition-all duration-300 rounded ${
                          selectedCategory === category 
                            ? "bg-red-600 text-white shadow-lg shadow-red-900/30" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {category} ({count})
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= FEATURED ARTICLE ================= */}
      {filteredNews.length > 0 && (
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-red-500 uppercase tracking-[4px] text-xs font-semibold mb-2">FEATURED STORY</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase">Editor's <span className="text-red-600">Pick</span></h2>
            </div>
            <FeaturedNewsCard article={featuredArticle} index={0} onClick={setSelectedArticle} />
          </div>
        </section>
      )}

      {/* ================= NEWS GRID ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <p className="text-red-500 uppercase tracking-[4px] text-xs font-semibold mb-2">LATEST NEWS</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase">Recent <span className="text-red-600">Articles</span></h2>
            </div>
            {searchTerm && (
              <p className="text-gray-400 text-xs">Search results for: <span className="text-red-500">"{searchTerm}"</span></p>
            )}
          </div>
          
          {regularArticles.length === 0 && filteredNews.length === 1 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No more articles found.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                className="mt-2 text-red-500 text-xs hover:text-red-400 transition"
              >
                Browse all articles
              </button>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No articles found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                className="mt-2 text-red-500 text-xs hover:text-red-400 transition"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`grid gap-5 sm:gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}
            >
              {regularArticles.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedArticle(item)}
                  className={`bg-[#050505] border border-white/10 hover:border-red-600 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20 group ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === "list" ? "sm:w-48 h-48 sm:h-auto" : "h-48"}`}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{item.category}</span>
                    </div>
                    {bookmarkedIds.includes(item.id) && (
                      <div className="absolute top-3 left-3">
                        <FaBookmark className="text-yellow-500 text-sm" />
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-4 sm:p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><FaCalendarAlt size={9} /> {item.date}</span>
                      <span className="flex items-center gap-1"><FaUser size={9} /> {item.author}</span>
                      <span className="flex items-center gap-1"><FaEye size={9} /> {item.views.toLocaleString()}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold uppercase mb-2 leading-tight line-clamp-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2">{item.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-[10px] flex items-center gap-1"><FaClock /> {item.readTime}</span>
                        <span className="text-gray-500 text-[10px] flex items-center gap-1"><FaThumbsUp /> {item.likes}</span>
                      </div>
                      <button className="text-red-500 hover:text-red-400 text-xs font-semibold uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                        READ MORE <FaArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-900/10 to-black border-y border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase mb-2">Never Miss an <span className="text-red-600">Update</span></h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Subscribe to our newsletter for exclusive news, fight announcements, and community updates.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300"
                />
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-2.5 rounded-lg text-sm font-bold uppercase flex items-center justify-center gap-2 group"
                >
                  <FaBell size={12} className="group-hover:animate-pulse" /> SUBSCRIBE
                </button>
              </form>
              <AnimatePresence>
                {subscribed && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 text-xs mt-2">
                    ✓ Successfully subscribed to newsletter!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRENDING TOPICS ================= */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
            <FaFire className="text-red-500" /> TRENDING TOPICS
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.filter(c => c !== "All").map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                onClick={() => { setSelectedCategory(category); setShowFilters(true); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition-all duration-300"
              >
                #{category}
              </motion.button>
            ))}
            <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition-all duration-300">#GFCGlobal1</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition-all duration-300">#Origin</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition-all duration-300">#GFCCommunity</motion.button>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase mb-3">
              Join the <span className="text-red-600">Movement</span>
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Be part of India's combat sports revolution. Get exclusive content, early access, and community benefits.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinCommunity}
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 sm:px-8 py-3 rounded-lg text-sm font-bold uppercase inline-flex items-center gap-2 shadow-lg shadow-red-900/30"
            >
              <FaHeart size={14} /> JOIN GFC COMMUNITY
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= NEWS DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedArticle && <NewsDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}