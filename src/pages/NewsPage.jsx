import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, FaUser, FaTag, FaSearch, FaFilter, FaTimes,
  FaArrowRight, FaHeart, FaEnvelope, FaBell, FaShare, FaLink,
  FaFacebook, FaTwitter, FaWhatsapp, FaEye,FaClock 
} from "react-icons/fa";

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
    views: 15420
  },
  { 
    id: 2, 
    title: "Arjun Malik Signs Exclusive Deal", 
    date: "March 10, 2026", 
    author: "GFC Media", 
    category: "Fighters", 
    image: "/images/f1.png", 
    excerpt: "Undefeated welterweight prospect joins GFC roster in a landmark signing.",
    content: "Full article content here...",
    readTime: "2 min read",
    views: 8920
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
    views: 12500
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
    views: 5600
  },
  { 
    id: 5, 
    title: "Meera Iyer: The Rise of a Champion", 
    date: "February 20, 2026", 
    author: "GFC Media", 
    category: "Fighters", 
    image: "/images/f2.png", 
    excerpt: "Exclusive interview with strawweight sensation Meera Iyer ahead of her debut.",
    content: "Full article content here...",
    readTime: "5 min read",
    views: 10300
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
    views: 18700
  },
];

const categories = ["All", "Events", "Fighters", "Community", "Partners"];

// ================= NEWS DETAIL MODAL =================
function NewsDetailModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-zinc-900 border border-red-600/30 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl z-10">✕</button>
        
        <div className="p-5">
          <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-xl mb-4" />
          
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1"><FaCalendarAlt size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><FaUser size={10} /> {article.author}</span>
            <span className="flex items-center gap-1 text-red-500"><FaTag size={10} /> {article.category}</span>
          </div>
          
          <h2 className="text-xl font-bold uppercase mb-3">{article.title}</h2>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-3 border-b border-white/10">
            <span><FaEye className="inline mr-1" /> {article.views.toLocaleString()} views</span>
            <span><FaClock className="inline mr-1" /> {article.readTime}</span>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {article.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 rounded-lg text-sm font-bold uppercase">READ FULL ARTICLE</button>
            <button className="border border-white/20 hover:border-red-600 transition px-4 py-2 rounded-lg text-sm font-bold uppercase flex items-center gap-2">
              <FaShare size={12} /> SHARE
            </button>
          </div>
        </div>
      </motion.div>
    </div>
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSubscribe) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmailSubscribe("");
    }
  };

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories with counts
  const categoriesWithCount = [
    "All",
    ...categories.filter(c => c !== "All").map(cat => ({
      name: cat,
      count: newsItems.filter(item => item.category === cat).length
    }))
  ];

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
   {/* ================= HERO SECTION ================= */}
<section className="relative flex items-center bg-black overflow-hidden" style={{ minHeight: "100vh", height: "100vh", maxHeight: "900px" }}>
  <div className="absolute inset-0">
    <img 
      src="/images/c3.png" 
      alt="News Hero" 
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
  </div>
  
  <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl">
      <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">LATEST UPDATES</p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.1]">
        GFC <span className="text-red-600">News</span>
      </h1>
      <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
        Stay updated with the latest announcements, fight news, and community updates.
      </p>
    </div>
  </div>
</section>

      {/* ================= STATS BAR ================= */}
      <div className="bg-[#050505] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">{newsItems.length}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase">ARTICLES</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">{categories.length - 1}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase">CATEGORIES</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">15K+</p>
              <p className="text-gray-500 text-[10px] sm:text-xs uppercase">MONTHLY READERS</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTERS & SEARCH ================= */}
      <div className="bg-[#050505] border-b border-white/10 sticky top-16 sm:top-20 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-lg text-xs uppercase hover:bg-white/10 transition"
              >
                <FaFilter size={10} /> {showFilters ? "HIDE" : "FILTER"}
              </button>
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
                <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]" />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <FaTimes size={10} />
                  </button>
                )}
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
                        className={`px-2.5 py-1 text-[10px] sm:text-xs uppercase font-semibold transition-all rounded ${
                          selectedCategory === category 
                            ? "bg-red-600 text-white" 
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

      {/* ================= NEWS GRID ================= */}
      <section className="py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedArticle(item)}
                  className="bg-[#050505] border border-white/10 hover:border-red-600 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 flex-wrap">
                      <span className="flex items-center gap-1"><FaCalendarAlt size={9} /> {item.date}</span>
                      <span className="flex items-center gap-1"><FaUser size={9} /> {item.author}</span>
                      <span className="flex items-center gap-1 text-gray-500"><FaEye size={9} /> {item.views.toLocaleString()}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold uppercase mb-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 leading-relaxed">{item.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-[10px]">{item.readTime}</span>
                      <button className="text-red-500 hover:text-red-400 text-xs font-semibold uppercase flex items-center gap-1">
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase mb-2">Never Miss an <span className="text-red-600">Update</span></h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Subscribe to our newsletter for exclusive news, fight announcements, and community updates.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
                <button 
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-2.5 rounded-lg text-sm font-bold uppercase flex items-center justify-center gap-2"
                >
                  <FaBell size={12} /> SUBSCRIBE
                </button>
              </form>
              {subscribed && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 text-xs mt-2">
                  ✓ Successfully subscribed to newsletter!
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= POPULAR TAGS ================= */}
      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">POPULAR TOPICS</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.filter(c => c !== "All").map((category) => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setShowFilters(true); }}
                className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition"
              >
                #{category}
              </button>
            ))}
            <button className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition">#GFCGlobal1</button>
            <button className="px-3 py-1 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600 rounded-full text-[10px] sm:text-xs transition">#Origin</button>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-12 sm:py-16 text-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase mb-3">
            Join the <span className="text-red-600">Movement</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mb-5 leading-relaxed">
            Be part of India's combat sports revolution. Get exclusive content, early access, and community benefits.
          </p>
          <button 
            onClick={handleGetTickets}
            className="bg-red-600 hover:bg-red-700 transition px-6 sm:px-8 py-2.5 rounded-lg text-sm font-bold uppercase inline-flex items-center gap-2"
          >
            <FaHeart size={14} /> JOIN THE COMMUNITY
          </button>
        </div>
      </section>

      {/* ================= NEWS DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedArticle && <NewsDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </AnimatePresence>
    </div>
  );
}