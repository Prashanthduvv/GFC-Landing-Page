import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    
    if (!value.trim()) {
      return "Email is required";
    }
    
    if (!emailRegex.test(value)) {
      return "Enter a valid email address (e.g., name@domain.com)";
    }
    
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const error = validateEmail(value);
    setEmailError(error);
    
    if (isSubscribed) {
      setIsSubscribed(false);
    }
  };

  const handleSubscribe = async () => {
    const error = validateEmail(email);
    
    if (error) {
      setEmailError(error);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - Replace with your actual API endpoint
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
      }
      
      console.log("Subscribed:", email);
      setIsSubscribed(true);
      setEmailError("");
      setEmail("");
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
    <div className="text-center md:text-left">
      <h3 className="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-4 sm:mb-5 text-white">
        Stay Updated
      </h3>

      <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
        Get the latest updates, fight announcements and exclusive content.
      </p>

      <div className="w-full">
        <div
          className={`flex flex-col sm:flex-row border rounded-sm overflow-hidden transition
          ${
            emailError
              ? "border-red-500"
              : "border-gray-700 focus-within:border-red-500"
          }`}
        >
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email"
            disabled={isLoading}
            className="bg-black px-3 sm:px-4 py-2 sm:py-2.5 w-full text-xs sm:text-sm outline-none placeholder-gray-500 text-white disabled:opacity-50"
          />

          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="bg-red-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-red-700 transition w-full sm:w-auto whitespace-nowrap text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              "SUBSCRIBE"
            )}
          </button>
        </div>

        {emailError && (
          <p className="text-red-500 text-[11px] sm:text-xs mt-2 animate-pulse">
            {emailError}
          </p>
        )}

        {isSubscribed && (
          <p className="text-green-500 text-[11px] sm:text-xs mt-2 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Successfully subscribed!
          </p>
        )}
      </div>
    </div>
  );
}