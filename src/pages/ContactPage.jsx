import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaYoutube, 
  FaTwitter, FaFacebookF, FaTiktok, FaArrowRight, FaCheckCircle,
  FaClock, FaUser, FaComment, FaPaperPlane, FaWhatsapp, FaLinkedin,   FaHandshake, FaNewspaper, FaUsers
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [openFaq, setOpenFaq] = useState(null);
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
    description:
      "Questions about GFC, website issues, support requests, or general assistance.",
    response: "< 24 Hours",
    availability: "24/7 Support",
  },
  {
    id: "sponsorship",
    name: "Sponsorship",
    email: "sponsors@gfc.com",
    icon: FaHandshake,
    color: "from-yellow-500 to-orange-500",
    description:
      "Brand partnerships, sponsorship opportunities, advertising, and collaborations.",
    response: "1 - 2 Business Days",
    availability: "Mon - Fri",
  },
  {
    id: "media",
    name: "Media / Press",
    email: "media@gfc.com",
    icon: FaNewspaper,
    color: "from-blue-500 to-cyan-500",
    description:
      "Press releases, interviews, media access, publications, and PR requests.",
    response: "< 12 Hours",
    availability: "Priority Support",
  },
  {
    id: "community",
    name: "Community",
    email: "community@gfc.com",
    icon: FaUsers,
    color: "from-purple-500 to-pink-500",
    description:
      "Community events, creator programs, collaborations, and audience engagement.",
    response: "< 48 Hours",
    availability: "Active Daily",
  },
];

const [selectedDepartment, setSelectedDepartment] = useState(
  departments[0]
);


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
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
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
    
    console.log("Form Data:", formData);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
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
    {
      q: "How do I buy tickets?",
      a: "Tickets can be purchased directly through our official website.",
    },
    {
      q: "How long does support take?",
      a: "Most inquiries receive a response within 24 hours.",
    },
    {
      q: "Do you accept sponsors?",
      a: "Yes. Please contact our sponsorship department.",
    },
    {
      q: "Can I collaborate with GFC?",
      a: "Absolutely. Reach out through our community or media departments.",
    },
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
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="/images/c4.png" 
            alt="Contact Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">GET IN TOUCH</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.1]">
              Contact <span className="text-red-600">Us</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
              Have questions? We'd love to hear from you. Reach out to us anytime.
            </p>
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
                  className="bg-[#050505] border border-white/10 hover:border-red-600 rounded-xl p-5 text-center group transition-all duration-300 hover:-translate-y-1"
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

      {/* ================= CONTACT FORM + MAP ================= */}
      <section className="py-12 bg-[#050505] border-y border-red-900/20">
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
                <h2 className="text-2xl sm:text-3xl font-black uppercase">Get in <span className="text-red-600">Touch</span></h2>
                <p className="text-gray-400 text-sm mt-2">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
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
                
                {/* Email */}
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
                
                {/* Subject */}
                <div>
                  <div className="relative">
                    <FaComment className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className={`w-full pl-11 pr-4 py-3 bg-black border rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition ${
                        errors.subject ? "border-red-500" : "border-white/10"
                      }`}
                    />
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                
                {/* Message */}
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
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-lg font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>SENDING...</>
                  ) : (
                    <>SEND MESSAGE <FaPaperPlane size={12} /></>
                  )}
                </button>
                
                {isSubmitted && (
                  <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
                    <FaCheckCircle /> Message sent successfully!
                  </p>
                )}
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
              {/* Map */}
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
              
              {/* Office Hours */}
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
<div className="mb-10 sm:mb-12">
  {/* HEADER */}
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-7 sm:mb-8">
    <div>
      <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm font-semibold mb-3">
        SUPPORT ROUTING
      </p>

      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight">
        Choose The Right
        <span className="text-red-600 block">
          Department
        </span>
      </h3>
    </div>

    <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
      Select the department that best matches your inquiry so your message is
      routed directly to the correct GFC team for faster support and responses.
    </p>
  </div>

  {/* GRID */}
  <div className="grid grid-cols-4 sm:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5">
    {departments.map((dept, index) => {
      const Icon = dept.icon;

      const isActive =
        selectedDepartment.id === dept.id;

      return (
        <button
          key={index}
          type="button"
          onClick={() => setSelectedDepartment(dept)}
          className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 text-left transition-all duration-500 backdrop-blur-xl min-h-[260px] flex flex-col
          
          ${
            isActive
              ? "border-red-500 bg-red-500/10 shadow-[0_0_50px_rgba(255,0,0,0.15)] scale-[1.02]"
              : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:-translate-y-1"
          }`}
        >
          {/* ACTIVE GLOW */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition duration-500`}
          />

          {/* ACTIVE INDICATOR */}
          {isActive && (
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            </div>
          )}

          {/* CONTENT */}
          <div className="relative z-10 flex flex-col h-full">
            {/* ICON */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-5 shadow-lg`}
            >
              <Icon className="text-white text-xl sm:text-2xl" />
            </div>

            {/* TITLE */}
            <h4 className="text-lg sm:text-xl font-black uppercase leading-tight">
              {dept.name}
            </h4>

            {/* DESC */}
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              {dept.description}
            </p>

            {/* RESPONSE */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Response Time
                </span>

                <span className="font-semibold text-white">
                  {dept.response}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Availability
                </span>

                <span className="font-semibold text-white">
                  {dept.availability}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-auto pt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-xs text-gray-400">
                  Online
                </span>
              </div>

              <span
                className={`text-xs uppercase tracking-wide font-bold transition
                ${
                  isActive
                    ? "text-red-400"
                    : "text-gray-500 group-hover:text-white"
                }`}
              >
                {isActive ? "Selected" : "Select"}
              </span>
            </div>
          </div>
        </button>
      );
    })}
  </div>

  {/* SELECTED DEPARTMENT PANEL */}
  <div className="mt-6 sm:mt-7 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
      {/* LEFT */}
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedDepartment.color} flex items-center justify-center shrink-0`}
        >
          <selectedDepartment.icon className="text-white text-xl" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[3px] text-gray-500 mb-2">
            Currently Selected
          </p>

          <h4 className="text-xl sm:text-2xl font-black uppercase leading-tight">
            {selectedDepartment.name}
          </h4>

          <p className="text-gray-400 text-sm sm:text-base mt-2 leading-relaxed max-w-2xl">
            {selectedDepartment.description}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:justify-end">
        {/* EMAIL */}
        <div>
          <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
            Contact Email
          </p>

          <p className="text-sm sm:text-base font-medium break-all">
            {selectedDepartment.email}
          </p>
        </div>

        {/* RESPONSE */}
        <div>
          <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-2">
            Avg. Response
          </p>

          <p className="text-sm sm:text-base font-medium">
            {selectedDepartment.response}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
     <section className="py-14 sm:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-center mb-10 sm:mb-14">
            Frequently Asked{" "}
            <span className="text-red-600">
              Questions
            </span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex justify-between items-center gap-4 p-5 sm:p-6 bg-white/5 hover:bg-white/10 transition"
                >
                  <span className="font-semibold text-left text-sm sm:text-base">
                    {faq.q}
                  </span>

                  <span className="text-red-500 text-xl shrink-0">
                    {openFaq === index ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300
                  ${
                    openFaq === index
                      ? "max-h-40 p-5 sm:p-6"
                      : "max-h-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===================================================== */}
      {/* SOCIAL */}
      {/* ===================================================== */}

      <section className="pb-24 sm:pb-28 text-center">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase mb-5">
            Connect With{" "}
            <span className="text-red-600">
              Us
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed">
            Follow GFC on social media for updates, announcements, events, and
            exclusive behind-the-scenes content.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-red-600 hover:border-red-500 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} className="sm:w-5 sm:h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </section>
     

    </div>
  );
}