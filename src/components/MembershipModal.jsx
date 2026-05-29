// src/components/MembershipModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaCrown, FaGem, FaMedal, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MembershipModal({ isOpen, onClose }) {
  const [selectedTier, setSelectedTier] = useState(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const tiers = [
    { 
      name: "BASIC", 
      price: "0", 
      icon: FaMedal, 
      color: "from-gray-500 to-gray-400",
      features: ["Newsletter Access", "Public Event Updates", "Basic Community Access"],
      yearlyPrice: "Free Forever"
    },
    { 
      name: "PREMIUM", 
      price: "1,999", 
      icon: FaGem, 
      color: "from-blue-500 to-cyan-500",
      features: ["Everything in Basic", "Exclusive Content", "VIP Event Access", "20% Discount", "Priority Support"],
      yearlyPrice: "₹1,999/year"
    },
  ];

  // Handle Founding Member - Navigate to full page
  const handleFoundingMember = () => {
    onClose();
    navigate("/join-community");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
              <FaTimes size={20} />
            </button>

            <div className="p-6 border-b border-gray-800 text-center">
              <div className="inline-flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-red-400 text-xs font-semibold">Yearly Community Membership</span>
              </div>
              <h2 className="text-2xl font-bold uppercase text-white">Join GFC Community</h2>
              <p className="text-gray-400 text-sm mt-1">Get exclusive benefits, discounts, and insider access</p>
            </div>

            {step === 1 ? (
              <div className="p-6">
                <div className="space-y-4">
                  {tiers.map((tier) => {
                    const Icon = tier.icon;
                    return (
                      <div
                        key={tier.name}
                        onClick={() => setSelectedTier(tier.name)}
                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                          selectedTier === tier.name
                            ? "border-red-500 bg-red-500/10"
                            : "border-gray-700 hover:border-red-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                            <Icon className="text-white text-xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold">{tier.name}</h3>
                            <p className="text-gray-400 text-sm">{tier.yearlyPrice}</p>
                          </div>
                          <div className="text-right">
                            {selectedTier === tier.name && <FaCheckCircle className="text-green-500" />}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tier.features.map((feature, i) => (
                            <span key={i} className="text-xs text-gray-400 flex items-center gap-1">
                              <FaCheckCircle className="text-green-500 text-[8px]" /> {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Founding Member Special Card */}
                  <div
                    onClick={handleFoundingMember}
                    className="cursor-pointer rounded-xl p-4 border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/20 to-black hover:border-yellow-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                        <FaCrown className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-yellow-500">FOUNDING MEMBER</h3>
                        <p className="text-gray-400 text-sm">₹5,000 (Lifetime)</p>
                      </div>
                      <div className="text-right">
                        <FaArrowRight className="text-yellow-500" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Limited slots • Lifetime recognition • Exclusive privileges</p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedTier}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold uppercase disabled:opacity-50 transition"
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <MembershipPaymentForm selectedTier={selectedTier} onSuccess={onClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Payment Form Component
function MembershipPaymentForm({ selectedTier, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem("gfc_membership_tier", selectedTier);
    localStorage.setItem("gfc_membership_date", new Date().toISOString());
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => onSuccess(), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h3 className="text-xl font-bold">Welcome to GFC Community! 🎉</h3>
        <p className="text-gray-300 mt-2">Your {selectedTier} membership is active</p>
        <p className="text-gray-400 text-sm mt-4">Check your email for confirmation</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
        <p className="text-sm text-red-500 font-semibold">Selected: {selectedTier} Membership</p>
        <p className="text-gray-400 text-xs mt-1">You'll receive WhatsApp community invite and email confirmation</p>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold uppercase transition"
      >
        {isSubmitting ? "Processing..." : `Pay ₹${selectedTier === "PREMIUM" ? "1,999" : "0"}`}
      </button>
    </form>
  );
}