import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { name: "HOME", path: "/", id: "home" },
  { name: "FIGHTS", path: "/fights", id: "fights" },
  { name: "FIGHTERS", path: "/fighters", id: "fighters" },
  { name: "ABOUT", path: "/about", id: "about" },
  { name: "ORIGIN", path: "/origin", id: "origin" },
  { name: "SPONSORS", path: "/sponsors", id: "sponsors" },
  { name: "NEWS", path: "/news", id: "news" },
  { name: "CONTACT", path: "/contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetTickets = () => {
    const event = new CustomEvent("openTicketModal");
    window.dispatchEvent(event);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-red-900/30" : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/gfc-logo.png" alt="GFC" className="h-10 sm:h-12 lg:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`text-[11px] xl:text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:text-red-500 ${
                    isActive(item.path) ? "text-red-500" : "text-white"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={handleGetTickets}
            className="hidden sm:block bg-red-600 hover:bg-red-700 transition-all px-4 sm:px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-sm shadow-lg shadow-red-900/30"
          >
            GET TICKETS
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white text-2xl focus:outline-none p-2"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-black border-t border-red-900/30 py-4">
            <div className="flex flex-col items-center gap-3">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-sm uppercase tracking-wider font-semibold py-2 transition-colors ${
                    isActive(item.path) ? "text-red-500" : "text-white hover:text-red-500"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={handleGetTickets}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-sm mt-2"
              >
                GET TICKETS
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}