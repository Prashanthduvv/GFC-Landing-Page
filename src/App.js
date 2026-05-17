import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FightsPage from "./pages/FightsPage";
import AboutPage from "./pages/AboutPage";
import FightersPage from "./pages/FightersPage";
import OriginPage from "./pages/OriginPage";
import SponsorsPage from "./pages/SponsorsPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import Cursor from "./components/Cursor";
import CommunityPage from "./pages/CommunityPage";
import JoinCommunityPage from "./components/JoinCommunityPage";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Cursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fights" element={<FightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fighters" element={<FightersPage />} />
          <Route path="/origin" element={<OriginPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/join-community" element={<JoinCommunityPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "About", id: "about", path: "/about" },
    { name: "Fights", id: "fights", path: "/fights" },
    { name: "Fighters", id: "fighters", path: "/fighters" },
    { name: "COMMUNITY", id: "community", path: "/community" },  // ← Goes to CommunityPage (Info Page)
    { name: "Origin", id: "origin", path: "/origin" },
    { name: "Sponsors", id: "sponsors", path: "/sponsors" },
    { name: "News", id: "news", path: "/news" },
    { name: "Contact", id: "contact", path: "/contact" },
  ];

  const handleNavigation = (item) => {
    setMenuOpen(false);
    navigate(item.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-black/90 border-b border-neutral-900 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 xl:px-12 2xl:px-16 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <img
            src="/gfc-logo.png"
            alt="GFC Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-2 xl:gap-6 2xl:gap-8 text-[11px] xl:text-xs uppercase tracking-wider font-semibold">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`transition cursor-pointer whitespace-nowrap ${
                isActive(item.path) ? "text-red-500" : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Tablet Navigation */}
        <ul className="hidden md:flex lg:hidden gap-1 text-[8px] uppercase tracking-wide font-semibold overflow-x-auto whitespace-nowrap max-w-[60%]">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`transition cursor-pointer whitespace-nowrap ${
                isActive(item.path) ? "text-red-500" : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none p-2"
        >
          ☰
        </button>

        {/* CTA BUTTON - Goes to JoinCommunityPage (Application Form) */}
        <button
          onClick={() => {
            navigate("/join-community");
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hidden sm:flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-300 uppercase font-extrabold tracking-wide px-4 lg:px-5 py-2.5 text-[10px] lg:text-[11px] border border-red-400/20 shadow-[0_0_25px_rgba(255,0,0,0.35)] whitespace-nowrap group text-white hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">JOIN GFC COMMUNITY →</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-neutral-800 flex flex-col items-center py-4 gap-3 text-sm uppercase overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`cursor-pointer py-1 ${
                isActive(item.path) ? "text-red-500" : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </div>
          ))}
          
          {/* Mobile CTA Button */}
          <button
            onClick={() => {
              navigate("/join-community");
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-3 relative text-white overflow-hidden bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all duration-300 uppercase font-extrabold tracking-wide px-6 py-3 text-[11px] border border-red-400/20 shadow-[0_0_25px_rgba(255,0,0,0.35)] w-[260px] group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">JOIN GFC COMMUNITY →</span>
          </button>
        </div>
      )}
    </nav>
  );
}

export default App;