import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FightsPage from "./pages/FightsPage";
import Cursor from "./components/Cursor";
// Remove this line - it's incorrect
// import NewsletterSubscribe from "../components/NewsletterSubscribe";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Cursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fights" element={<FightsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// EXACT SAME NAVBAR CODE WITH ROUTER LINK SUPPORT
function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", id: "home", path: "/" },
    { name: "About", id: "about", path: "/" },
    { name: "Fights", id: "fights", path: "/fights" },
    { name: "Fighters", id: "fighters", path: "/" },
    { name: "Origin", id: "origin", path: "/" },
    { name: "Sponsors", id: "sponsors", path: "/" },
    { name: "News", id: "news", path: "/" },
    { name: "Contact", id: "contact", path: "/" },
  ];

  const handleNavigation = (item) => {
    setMenuOpen(false);
    
    // If it's the Fights page, navigate to /fights
    if (item.id === "fights") {
      navigate("/fights");
      return;
    }

    // If we're on FightsPage and clicking any other nav item
    if (location.pathname === "/fights") {
      navigate("/");
      // Small delay to allow navigation before scrolling
      setTimeout(() => {
        let targetId = item.id;
        if (item.id === "news") targetId = "sponsors";
        if (item.id === "contact") targetId = "sponsors";
        
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
      return;
    }

    // If we're on HomePage, handle scroll
    let targetId = item.id;
    if (item.id === "fights") targetId = "about";
    if (item.id === "news") targetId = "sponsors";
    if (item.id === "contact") targetId = "sponsors";

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Function to open ticket modal from navbar
  const handleGetTicketsClick = () => {
    const event = new CustomEvent("openTicketModal");
    window.dispatchEvent(event);
  };

  return (
    <nav className="fixed w-full z-50 bg-black/90 border-b border-neutral-900 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo - Click to go home */}
        <div 
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
          className="flex items-center shrink-0 cursor-pointer"
        >
          <img
            src="/gfc-logo.png"
            alt="GFC Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
          />
        </div>

        <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-8 text-[11px] xl:text-xs uppercase tracking-wider font-semibold">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`transition cursor-pointer whitespace-nowrap ${
                location.pathname === "/fights" && item.id === "fights"
                  ? "text-red-500"
                  : location.pathname === "/" && item.id === "home"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <ul className="hidden md:flex lg:hidden gap-2 md:gap-3 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`transition cursor-pointer whitespace-nowrap ${
                location.pathname === "/fights" && item.id === "fights"
                  ? "text-red-500"
                  : location.pathname === "/" && item.id === "home"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl focus:outline-none p-2"
        >
          ☰
        </button>

        <button
          onClick={handleGetTicketsClick}
          className="hidden text-white sm:block bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-xs font-semibold rounded-sm hover:bg-red-700 transition whitespace-nowrap"
        >
          GET TICKETS
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-neutral-800 flex flex-col items-center py-4 gap-3 text-sm uppercase max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`cursor-pointer py-1 ${
                location.pathname === "/fights" && item.id === "fights"
                  ? "text-red-500"
                  : location.pathname === "/" && item.id === "home"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              {item.name}
            </div>
          ))}
          <button
            onClick={handleGetTicketsClick}
            className="bg-red-600 px-6 py-2 text-xs text-white font-semibold mt-2 w-40 rounded-sm"
          >
            GET TICKETS
          </button>
        </div>
      )}
    </nav>
  );
}

export default App;