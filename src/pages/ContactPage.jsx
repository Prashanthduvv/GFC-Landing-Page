import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaYoutube, 
  FaTwitter, FaFacebookF, FaTiktok, FaArrowRight, FaCheckCircle,
  FaClock, FaUser, FaComment, FaPaperPlane, FaWhatsapp, FaLinkedin,
  FaHandshake, FaNewspaper, FaUsers, FaStar, FaHeadset, FaQrcode
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "general",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const departments = [
    {
      id: "general",
      name: "General Inquiry",
      email: "hello@gfc.com",
      icon: FaEnvelope,
      color: "from-red-600 to-red-500",
      description: "Questions about GFC, website issues, support requests, or general assistance.",
      response: "< 24 Hours",
      availability: "24/7 Support",
    },
    {
      id: "sponsorship",
      name: "Sponsorship",
      email: "sponsors@gfc.com",
      icon: FaHandshake,
      color: "from-yellow-500 to-orange-500",
      description: "Brand partnerships, sponsorship opportunities, advertising, and collaborations.",
      response: "1 - 2 Business Days",
      availability: "Mon - Fri",
    },
    {
      id: "media",
      name: "Media / Press",
      email: "media@gfc.com",
      icon: FaNewspaper,
      color: "from-blue-500 to-cyan-500",
      description: "Press releases, interviews, media access, publications, and PR requests.",
      response: "< 12 Hours",
      availability: "Priority Support",
    },
    {
      id: "community",
      name: "Community",
      email: "community@gfc.com",
      icon: FaUsers,
      color: "from-purple-500 to-pink-500",
      description: "Community events, creator programs, collaborations, and audience engagement.",
      response: "< 48 Hours",
      availability: "Active Daily",
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form Data:", { ...formData, department: departments.find(d => d.id === formData.department)?.name });
    setIsSubmitted(true);
    setFormData({ name: "", email: "", department: "general", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
    setIsSubmitting(false);
  };

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  const contactInfo = [
    { icon: FaEnvelope, title: "Email", info: "hello@gfc.com", link: "mailto:hello@gfc.com", detail: "We'll respond within 24 hours" },
    { icon: FaPhone, title: "Phone", info: "+91 98765 43210", link: "tel:+919876543210", detail: "Mon-Fri, 10AM - 7PM" },
    { icon: FaWhatsapp, title: "WhatsApp", info: "+91 98765 43210", link: "https://wa.me/919876543210", detail: "Quick support" },
    { icon: FaMapMarkerAlt, title: "Office", info: "New Delhi, India", link: "#", detail: "GFC Headquarters" },
  ];

  const socialLinks = [
    { icon: FaInstagram, link: "https://instagram.com", label: "Instagram", color: "hover:text-pink-500" },
    { icon: FaYoutube, link: "https://youtube.com", label: "YouTube", color: "hover:text-red-600" },
    { icon: FaTwitter, link: "https://twitter.com", label: "Twitter", color: "hover:text-blue-400" },
    { icon: FaFacebookF, link: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
    { icon: FaTiktok, link: "https://tiktok.com", label: "TikTok", color: "hover:text-gray-300" },
    { icon: FaLinkedin, link: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-500" },
  ];

  const faqs = [
    { q: "How do I buy tickets for GFC events?", a: "Tickets can be purchased directly through our website by clicking the 'GET TICKETS' button on any page." },
    { q: "How can I become a GFC Community member?", a: "Click the 'APPLY NOW' button on the Community page and fill out the application form." },
    { q: "How can I become a sponsor?", a: "Please contact our sponsorship department via email at sponsors@gfc.com or select 'Sponsorship' from the department selector above." },
    { q: "When is the next GFC event?", a: "GFC GlobaX: Origin is scheduled for June 30, 2026 in New Delhi, India." },
    { q: "How long does it take to get a response?", a: "Most inquiries receive a response within 24 hours. Sponsorship requests may take 1-2 business days." },
    { q: "Can I collaborate with GFC as a creator?", a: "Absolutely! Please reach out to our Community department for collaboration opportunities." },
  ];

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
<section className="max-w-[1400px] mx-auto relative w-full bg-black overflow-hidden">

  <div className="relative w-full h-[75vh] sm:h-[30vh] lg:min-h-[460px]">

    {/* Background Image */}
    <img
      src="/images/c4.png"
      alt="Contact Hero"
      className="
        absolute inset-0
        w-full h-full
        object-contain
        object-center
      "
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />

    {/* Content */}
    <div className="relative z-10 flex items-center h-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl">

          <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">
            GET IN TOUCH
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl  uppercase leading-tight">
            Contact <span className="text-red-600">Us</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </p>

        </div>

      </div>
    </div>

  </div>
</section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  variants={fadeInUp}
                  href={item.link}
                  target={item.title === "Email" || item.title === "WhatsApp" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-[#050505] border border-white/10 hover:border-red-600 rounded-xl p-5 text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20"
                >
                  <Icon className="text-red-500 text-3xl mx-auto mb-3 group-hover:scale-110 transition" />
                  <h3 className="text-base font-bold uppercase mb-1">{item.title}</h3>
                  <p className="text-white text-sm font-semibold">{item.info}</p>
                  <p className="text-gray-500 text-[10px] mt-2">{item.detail}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= DEPARTMENT SELECTION SECTION ================= */}
      <section className="py-12 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-red-500 uppercase tracking-[4px] text-xs font-semibold mb-2">SUPPORT ROUTING</p>
            <h2 className="text-2xl sm:text-3xl  uppercase">Choose The Right <span className="text-red-600">Department</span></h2>
            <p className="text-gray-400 text-sm mt-2 max-w-2xl">Select the department that best matches your inquiry for faster support and responses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              const isActive = formData.department === dept.id;
              
              return (
                <motion.button
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  onClick={() => setFormData(prev => ({ ...prev, department: dept.id }))}
                  className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all duration-300 ${
                    isActive 
                      ? "border-red-600 bg-red-600/10 shadow-lg shadow-red-900/20" 
                      : "border-white/10 bg-black hover:border-white/30 hover:-translate-y-1"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition duration-500`} />
                  {isActive && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-3`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <h4 className="text-base font-bold uppercase">{dept.name}</h4>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2">{dept.description}</p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-gray-500 text-[10px]">Response: <span className="text-white">{dept.response}</span></p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Department Info */}
          <div className="mt-6 bg-black/50 border border-white/10 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${departments.find(d => d.id === formData.department)?.color} flex items-center justify-center`}>
                  {(() => {
                    const Icon = departments.find(d => d.id === formData.department)?.icon;
                    return Icon ? <Icon className="text-white text-sm" /> : null;
                  })()}
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Selected Department</p>
                  <p className="text-white font-semibold">{departments.find(d => d.id === formData.department)?.name}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider">Contact Email</p>
                <p className="text-red-400 text-sm font-mono">{departments.find(d => d.id === formData.department)?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM + MAP ================= */}
      <section className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            
            {/* LEFT - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <p className="text-red-500 uppercase tracking-[4px] text-xs font-semibold mb-2">SEND MESSAGE</p>
                <h2 className="text-2xl sm:text-3xl  uppercase">Get in <span className="text-red-600">Touch</span></h2>
                <p className="text-gray-400 text-sm mt-2">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full pl-11 pr-4 py-3 bg-black border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition ${
                        errors.name ? "border-red-500" : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full pl-11 pr-4 py-3 bg-black border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition ${
                        errors.email ? "border-red-500" : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 bg-black border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition resize-none ${
                      errors.message ? "border-red-500" : "border-white/10"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> SENDING...</>
                  ) : (
                    <>SEND MESSAGE <FaPaperPlane size={12} /></>
                  )}
                </button>
                
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
                      <FaCheckCircle /> Message sent successfully! We'll get back to you soon.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
            
            {/* RIGHT - Map & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-red-600 px-5 py-3">
                  <h3 className="font-bold uppercase text-sm">Our Location</h3>
                </div>
                <div className="h-64 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319272!2d77.068897!3d28.527554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205c2b3f1b6c0!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GFC Location"
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-red-600 px-5 py-3">
                  <h3 className="font-bold uppercase text-sm flex items-center gap-2"><FaClock /> Office Hours</h3>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white font-semibold">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section  id="faq" className="py-12 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-red-500 uppercase tracking-[4px] text-xs font-semibold mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl  uppercase">Frequently Asked <span className="text-red-600">Questions</span></h2>
            <p className="text-gray-400 text-sm mt-2">Find quick answers to common questions</p>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center gap-4 p-4 sm:p-5 bg-black hover:bg-white/5 transition text-left"
                >
                  <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                  <span className="text-red-500 text-xl font-bold shrink-0">{openFaq === index ? "−" : "+"}</span>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 px-4 sm:px-5 py-4 bg-white/5"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOCIAL CONNECT SECTION ================= */}
      <section className="py-12 text-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl  uppercase mb-3">Connect With <span className="text-red-600">Us</span></h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Follow GFC on social media for the latest updates, behind-the-scenes content, and exclusive announcements.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`w-10 h-10 sm:w-11 sm:h-11 border border-white/20 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:border-red-500 ${social.color}`}
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

     
    </div>
  );
}