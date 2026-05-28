// src/components/NewsletterSubscribe.jsx
import { useState } from "react";
import { FaEnvelope, FaCheckCircle, FaBell } from "react-icons/fa";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      console.log("Newsletter subscriber added:", email);
    }
    
    setSubscribed(true);
    setEmail("");
    setLoading(false);
    
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="text-center md:text-left">
      <h3 className="text-xs sm:text-sm md:text-base uppercase tracking-wider mb-4 sm:mb-5 text-white">
        Stay Updated
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
        Get the latest updates, fight announcements and exclusive content.
      </p>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row border border-gray-700 focus-within:border-red-500 transition-all duration-300 overflow-hidden rounded-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-black px-3 sm:px-4 py-2 sm:py-2.5 w-full text-xs sm:text-sm outline-none placeholder-gray-500 text-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold w-full sm:w-auto whitespace-nowrap text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaBell size={12} /> SUBSCRIBE
            </>
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-xs mt-2 animate-pulse">{error}</p>}
      {subscribed && (
        <p className="text-green-500 text-xs mt-2 flex items-center gap-1">
          <FaCheckCircle size={12} /> Successfully subscribed!
        </p>
      )}
    </div>
  );
}