import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";
import NewsletterSubscribe from "./NewsletterSubscribe";

const quickLinks = [
  { name: "About", path: "/about" },
  { name: "Fights", path: "/fights" },
  { name: "Fighters", path: "/fighters" },
  { name: "Origin", path: "/origin" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "News", path: "/news" },
  { name: "Contact", path: "/contact" },
];

const socialIcons = [
  { Icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
  { Icon: FaYoutube, link: "https://youtube.com", label: "YouTube" },
  { Icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
  { Icon: FaFacebookF, link: "https://facebook.com", label: "Facebook" },
  { Icon: FaTiktok, link: "https://tiktok.com", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="text-center lg:text-left">
            <img src="/gfc-logo.png" alt="GFC" className="h-12 lg:h-14 w-auto mx-auto lg:mx-0 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Fights. Stories. Legends.
              <br />
              Join the movement and be part of India's future in combat sports.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-red-500 transition text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="text-center lg:text-left">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Community</h3>
            <ul className="space-y-2">
              <li><button className="text-gray-400 hover:text-red-500 transition text-sm">Member Benefits</button></li>
              <li><button className="text-gray-400 hover:text-red-500 transition text-sm">Events</button></li>
              <li><button className="text-gray-400 hover:text-red-500 transition text-sm">FAQs</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent("openTicketModal"))} className="text-gray-400 hover:text-red-500 transition text-sm">Join Community</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSubscribe />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8 pt-8 border-t border-white/10">
          {socialIcons.map(({ Icon, link, label }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-300"
              aria-label={label}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-600 text-xs">© 2025 GFC Global. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}