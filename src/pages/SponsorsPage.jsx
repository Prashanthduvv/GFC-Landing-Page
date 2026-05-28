import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaCheckCircle, FaMedal, FaStar, FaArrowRight, FaHeart, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ================= SPONSOR DATA =================
const sponsors = [
  { name: "TECHNOCRAT", logo: "/images/p1.png", tier: "Platinum", description: "Leading technology partner for GFC", website: "https://example.com" },
  { name: "NUTRIFUEL", logo: "/images/p2.png", tier: "Platinum", description: "Official nutrition partner", website: "https://example.com" },
  { name: "ELITE APPAREL", logo: "/images/p3.png", tier: "Gold", description: "Premium fight gear and merchandise", website: "https://example.com" },
  { name: "INNOVATECH", logo: "/images/p4.png", tier: "Gold", description: "Broadcast and streaming partner", website: "https://example.com" },
  { name: "THIRST ZERO", logo: "/images/p5.png", tier: "Silver", description: "Official beverage partner", website: "https://example.com" },
  { name: "IRON FITNESS", logo: "/images/p6.png", tier: "Silver", description: "Fitness equipment provider", website: "https://example.com" },
  { name: "MEDIA ONE", logo: "/images/p1.png", tier: "Silver", description: "Media and PR partner", website: "https://example.com" },
];

const tiers = [
  { name: "Platinum", icon: FaStar, color: "text-gray-300", bgColor: "bg-gray-800/20" },
  { name: "Gold", icon: FaMedal, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { name: "Silver", icon: FaHandshake, color: "text-gray-400", bgColor: "bg-gray-500/10" },
];

// ================= BENEFITS DATA =================
const benefits = [
  { title: "BRAND VISIBILITY", desc: "Logo placement on all event materials, broadcast, and digital platforms" },
  { title: "VIP ACCESS", desc: "Premium seating, backstage access, and hospitality at all GFC events" },
  { title: "DIGITAL REACH", desc: "Social media promotion, newsletter features, and website presence" },
  { title: "NETWORKING", desc: "Connect with industry leaders, athletes, and decision makers" },
  { title: "ACTIVATION", desc: "On-ground activation opportunities at live events" },
  { title: "CONTENT", desc: "Custom content creation and brand integration" },
];




// ================= MAIN PAGE =================
export default function SponsorsPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetTickets = () => {
    window.dispatchEvent(new CustomEvent("openTicketModal"));
  };

  const handleContactUs = () => {
    window.location.href = "/contact";
  };

   const navigate = useNavigate();
   
    const handleJoinCommunity = () => {
    navigate("/join-community");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="pt-16 sm:pt-20 overflow-x-hidden">
{/* ================= HERO SECTION ================= */}
<section className="max-w-[1400px] mx-auto relative w-full bg-black overflow-hidden">

  <div className="relative w-full h-[75vh] sm:h-[30vh] lg:min-h-[470px]">

    {/* Background Image */}
    <img
      src="https://static.vecteezy.com/system/resources/previews/024/108/426/non_2x/one-single-line-drawing-of-young-energetic-man-boxer-improve-his-attack-punch-illustration-sport-combative-training-concept-modern-continuous-line-draw-design-for-boxing-championship-banner-png.png"
      alt="Sponsors Hero"
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
            OUR PARTNERS
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Trusted By <span className="text-red-600">Leaders.</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed">
            World-class brands partnering with GFC to build the future of combat sports in India.
          </p>

        </div>

      </div>
    </div>

  </div>
</section>

     

      {/* ================= BENEFITS SECTION (Toggle) ================= */}
      {showBenefits && (
        <section className="py-12 bg-[#050505] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black uppercase">Partnership <span className="text-red-600">Benefits</span></h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">What we offer our valued partners</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border border-white/10 hover:border-red-600 rounded-xl p-5 text-center transition-all"
                >
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaStar className="text-red-500 text-lg" />
                  </div>
                  <h3 className="text-base font-bold uppercase mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= SPONSORS GRID ================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {tiers.map((tier, tierIndex) => {
            const tierSponsors = sponsors.filter(s => s.tier === tier.name);
            if (tierSponsors.length === 0) return null;
            const Icon = tier.icon;
            
            return (
              <motion.div 
                key={tier.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: tierIndex * 0.2 }}
                viewport={{ once: true }}
                className="mb-12 sm:mb-16"
              >
                <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
                  <Icon className={`${tier.color} text-xl sm:text-2xl`} />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase">{tier.name} Partners</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {tierSponsors.map((sponsor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      onClick={() => window.open(sponsor.website, '_blank')}
                      className={`${tier.bgColor} border border-white/10 hover:border-red-600 rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300`}
                    >
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        className="h-12 sm:h-16 object-contain mx-auto mb-3 sm:mb-4 opacity-80 hover:opacity-100 transition" 
                      />
                      <h3 className="text-base sm:text-lg font-bold uppercase">{sponsor.name}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">{sponsor.description}</p>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition">
                        <span className="text-red-500 text-xs">Visit Website →</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= SPONSORSHIP TIERS ================= */}
      <section className="py-12 sm:py-16 bg-[#050505] border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">Sponsorship <span className="text-red-600">Tiers</span></h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Choose the right partnership level for your brand</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              const tierSponsors = sponsors.filter(s => s.tier === tier.name);
              const benefits_count = tier.name === "Platinum" ? 6 : tier.name === "Gold" ? 4 : 3;
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setSelectedTier(tier.name)}
                  onMouseLeave={() => setSelectedTier(null)}
                  className={`bg-black border rounded-xl p-6 text-center transition-all duration-300 ${
                    selectedTier === tier.name ? 'border-red-600 shadow-xl shadow-red-900/20' : 'border-white/10 hover:border-red-600/50'
                  }`}
                >
                  <Icon className={`${tier.color} text-3xl sm:text-4xl mx-auto mb-3`} />
                  <h3 className="text-xl sm:text-2xl font-black uppercase">{tier.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">{tierSponsors.length} Current Partners</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-gray-300 text-sm font-semibold">Key Benefits:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-gray-400 text-xs">✓ Logo placement</li>
                      <li className="text-gray-400 text-xs">✓ VIP access</li>
                      <li className="text-gray-400 text-xs">✓ Digital promotion</li>
                      {benefits_count >= 4 && <li className="text-gray-400 text-xs">✓ On-ground activation</li>}
                      {benefits_count >= 6 && <li className="text-gray-400 text-xs">✓ Title sponsorship</li>}
                    </ul>
                  </div>
                  <button 
                    onClick={handleContactUs}
                    className="mt-5 w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition py-2 rounded-lg text-xs sm:text-sm font-bold uppercase"
                  >
                    INQUIRE NOW
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY PARTNER SECTION ================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-red-500 uppercase tracking-[4px] text-xs sm:text-sm mb-3 font-semibold">WHY PARTNER WITH GFC</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight">
                Reach <span className="text-red-600">Millions</span> of Passionate Fans
              </h2>
              <div className="mt-5 space-y-3">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  GFC is India's fastest-growing combat sports platform, connecting brands with 
                  an engaged, passionate audience across the country and globally.
                </p>
                <div className="flex items-start gap-3 mt-4">
                  <FaCheckCircle className="text-red-500 mt-0.5 text-sm" />
                  <p className="text-gray-400 text-xs sm:text-sm">Premium brand association with elite athletes</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 mt-0.5 text-sm" />
                  <p className="text-gray-400 text-xs sm:text-sm">Multi-platform exposure across digital and live events</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-red-500 mt-0.5 text-sm" />
                  <p className="text-gray-400 text-xs sm:text-sm">Access to exclusive VIP experiences and networking</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-900/30 rounded-xl p-6 text-center">
              <h3 className="text-lg sm:text-xl font-black uppercase mb-3">Ready to Partner?</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">Let's discuss how GFC can elevate your brand</p>
              <button 
                onClick={handleContactUs}
                className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg text-sm font-bold uppercase inline-flex items-center gap-2"
              >
                CONTACT US <FaArrowRight size={12} />
              </button>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-3">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-12 sm:py-16 text-center bg-gradient-to-r from-red-900/10 to-black border-y border-red-900/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase mb-3">
            Support The <span className="text-red-600">Movement.</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto mb-5 leading-relaxed">
            Join the GFC Community and get exclusive access to events, content, and experiences.
          </p>
          <button 
              onClick={handleJoinCommunity}
            className="bg-red-600 hover:bg-red-700 transition px-6 sm:px-8 py-2.5 rounded-lg text-sm font-bold uppercase inline-flex items-center gap-2"
          >
            <FaHeart size={14} /> JOIN THE MOVEMENT
          </button>
          <p className="text-gray-500 text-[10px] sm:text-xs mt-4">Be part of India's combat sports revolution</p>
        </div>
      </section>
    </div>
  );
}