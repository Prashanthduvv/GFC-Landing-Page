import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaTicketAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

export default function TicketModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ticketType: "standard",
    quantity: 1,
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketCountdown, setTicketCountdown] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const ticketPrices = {
    standard: 49,
    vip: 149,
    ringside: 299,
  };

  const calculateTotal = () => {
    return ticketPrices[formData.ticketType] * formData.quantity;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces";
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = "Minimum 1 ticket required";
    } else if (formData.quantity > 10) {
      newErrors.quantity = "Maximum 10 tickets per booking";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const bookingDetails = {
      ...formData,
      totalAmount: calculateTotal(),
      bookingId: `GFC${Date.now()}`,
      eventDate: "June 30, 2026",
      eventTime: "6:00 PM",
      venue: "Indira Gandhi Arena, New Delhi",
    };
    
    localStorage.setItem("gfc_booking", JSON.stringify(bookingDetails));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    let countdown = 5;
    setTicketCountdown(countdown);
    const interval = setInterval(() => {
      countdown--;
      setTicketCountdown(countdown);
      if (countdown <= 0) {
        clearInterval(interval);
        setIsSubmitted(false);
        onClose();
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          ticketType: "standard",
          quantity: 1,
        });
        setErrors({});
        setPaymentMethod("card");
      }
    }, 1000);
  };

  const handleClose = () => {
    if (!isSubmitted) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition z-10"
            >
              <FaTimes size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center gap-3 mb-2">
                    <FaTicketAlt className="text-red-500 text-2xl" />
                    <h2 className="text-red-500 text-2xl font-bold uppercase">Get Your Tickets</h2>
                  </div>
                  <p className="text-gray-400 text-sm">
                    GFC Global 1: Origin - June 30, 2026 | New Delhi
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-gray-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition text-white`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-gray-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition text-white`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-gray-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2.5 text-sm flex items-center text-white">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className={`flex-1 bg-black border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition text-white`}
                        maxLength="10"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-1 text-gray-300">
                        Ticket Type
                      </label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-gray-700 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-red-500 transition text-white"
                      >
                        <option value="standard">Standard - ₹49</option>
                        <option value="vip">VIP - ₹149</option>
                        <option value="ringside">Ringside - ₹299</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase mb-1 text-gray-300">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className={`w-full bg-black border ${errors.quantity ? 'border-red-500' : 'border-gray-700'} rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-red-500 transition text-white`}
                      />
                      {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-500 font-semibold uppercase">Total Amount:</span>
                      <span className="text-2xl font-bold text-red-500">₹{calculateTotal()}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">* Including all taxes and convenience fees</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase mb-2 text-gray-300">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "card", icon: FaCreditCard, label: "Card" },
                        { id: "paypal", icon: FaPaypal, label: "PayPal" },
                        { id: "apple", icon: FaApplePay, label: "Apple Pay" },
                        { id: "google", icon: FaGooglePay, label: "Google Pay" },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex flex-col items-center gap-1 p-2 rounded-md border transition ${
                            paymentMethod === method.id
                              ? "border-red-500 bg-red-500/10 text-red-500"
                              : "border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          <method.icon size={20} />
                          <span className="text-[10px]">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Book Now - ₹${calculateTotal()}`
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Your tickets have been booked successfully. A confirmation email has been sent to <span className="text-red-400">{formData.email}</span>
                </p>
                <div className="bg-gray-800/50 rounded-md p-4 mb-4 text-left">
                  <p className="text-xs text-gray-400 mb-1">Booking ID:</p>
                  <p className="text-sm font-mono font-semibold mb-3 text-white">GFC{Date.now()}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
                    <FaCalendarAlt size={12} />
                    <span>June 30, 2026 | 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <FaMapMarkerAlt size={12} />
                    <span>Indira Gandhi Arena, New Delhi</span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">Closing in {ticketCountdown} seconds...</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}