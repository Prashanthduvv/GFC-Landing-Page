import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBullhorn,
  FaCheckCircle,
  FaCrown,
  FaFire,
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaMedal,
  FaPlayCircle,
  FaRocket,
  FaStar,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

// ======================================================
// SPONSORS DATA
// ======================================================

const sponsors = [
  {
    name: "Monster Energy",
    logo: "https://www.monsterenergy.com/img/home/monster-logo.png",
    tier: "Platinum",
    description:
      "Official energy drink partner powering elite combat sports athletes.",
    website: "https://www.monsterenergy.com",
  },

  {
    name: "Venum",
    logo: "https://www.venum.com/cdn/shop/files/LOGO-VENUM-FULL_190x@2x.png?v=1702316749",
    tier: "Platinum",
    description:
      "GlobaX MMA apparel and fight gear partner for premium athletes.",
    website: "https://venum.com",
  },

  {
    name: "Under Armour",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
    tier: "Gold",
    description:
      "Performance training and sportswear partner for elite fighters.",
    website: "https://www.underarmour.com",
  },

  {
    name: "Red Bull",
    logo:
      "https://upload.wikimedia.org/wikipedia/en/f/f5/RedBullEnergyDrink.svg",
    tier: "Gold",
    description:
      "Official endurance and high-performance energy partner.",
    website: "https://www.redbull.com",
  },

  {
    name: "RDX Sports",
    logo:
      "https://rdxsports.com/cdn/shop/files/RDX_Logo_black.png?v=1699883408",
    tier: "Silver",
    description:
      "Professional boxing and MMA training equipment manufacturer.",
    website: "https://rdxsports.com",
  },

  {
    name: "MyProtein",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Myprotein_logo.svg",
    tier: "Silver",
    description:
      "Official nutrition and supplementation performance partner.",
    website: "https://www.myprotein.com",
  },

  {
    name: "ESPN",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg",
    tier: "Media",
    description:
      "Official international broadcasting and streaming partner.",
    website: "https://www.espn.com",
  },
];

// ======================================================
// TIERS
// ======================================================

const tiers = [
  {
    name: "Platinum",
    icon: FaStar,
    color: "text-red-500",
    glow: "shadow-red-500/20",
  },

  {
    name: "Gold",
    icon: FaMedal,
    color: "text-yellow-500",
    glow: "shadow-yellow-500/20",
  },

  {
    name: "Silver",
    icon: FaHandshake,
    color: "text-gray-300",
    glow: "shadow-gray-500/20",
  },
];

// ======================================================
// BENEFITS
// ======================================================

const benefits = [
  {
    title: "BRAND VISIBILITY",
    desc: "Massive exposure across live events, digital media, and broadcasts.",
    icon: FaBullhorn,
    gradient: "from-red-500 to-orange-500",
  },

  {
    title: "VIP ACCESS",
    desc: "Premium hospitality, backstage experiences, and elite networking.",
    icon: FaCrown,
    gradient: "from-yellow-500 to-orange-400",
  },

  {
    title: "DIGITAL REACH",
    desc: "Reach millions through social media and online campaigns.",
    icon: FaGlobe,
    gradient: "from-blue-500 to-cyan-500",
  },

  {
    title: "LIVE ACTIVATION",
    desc: "Create unforgettable fan engagement experiences at events.",
    icon: FaRocket,
    gradient: "from-pink-500 to-red-500",
  },

  {
    title: "PREMIUM CONTENT",
    desc: "Collaborate with athletes through exclusive branded content.",
    icon: FaVideo,
    gradient: "from-purple-500 to-pink-500",
  },

  {
    title: "GLOBAX NETWORK",
    desc: "Connect with executives, athletes, creators, and influencers.",
    icon: FaUsers,
    gradient: "from-green-500 to-emerald-500",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function SponsorsPage() {
  const navigate = useNavigate();

  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactUs = () => {
    navigate("/contact");
  };

  const handleJoinCommunity = () => {
    navigate("/join-community");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative overflow-hidden bg-black text-white"
    >
      {/* ====================================================== */}
      {/* BACKGROUND EFFECTS */}
      {/* ====================================================== */}

      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* GRID */}

        <div
          className="
            absolute inset-0 opacity-20
            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
            bg-[size:50px_50px]
          "
        />

        {/* ORBS */}

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/20 blur-[140px] rounded-full animate-pulse" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 blur-[140px] rounded-full animate-pulse delay-1000" />

        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-red-600/10 blur-[120px] rounded-full animate-pulse delay-500" />
      </div>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-black via-[#050505] to-red-950/20">
        {/* IMAGE */}

        <img
          src="https://static.vecteezy.com/system/resources/previews/024/108/426/non_2x/one-single-line-drawing-of-young-energetic-man-boxer-improve-his-attack-punch-illustration-sport-combative-training-concept-modern-continuous-line-draw-design-for-boxing-championship-banner-png.png"
          alt="Hero"
          className="absolute right-0 top-0 h-full object-contain opacity-10"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl px-6 lg:px-10 py-32">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
              <FaFire className="text-red-500" />

              <p className="uppercase tracking-[4px] text-red-400 text-xs font-semibold">
                Official GFC Sponsors
              </p>
            </div>

            <h1 className="mt-8 text-6xl sm:text-7xl lg:text-8xl  uppercase leading-[0.9] tracking-[-3px] max-w-5xl">
              Trusted By{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
                Champions.
              </span>
            </h1>

            <p className="mt-8 text-gray-300/90 text-lg leading-relaxed max-w-2xl">
              GFC partners with world-class brands to create unforgettable
              combat sports experiences, elite athlete collaborations, and
              premium entertainment moments across India.
            </p>

            {/* BUTTONS */}

            <div className="mt-12 flex flex-wrap gap-5">
              <button
                onClick={handleContactUs}
                className="
                  group relative overflow-hidden
                  bg-red-600
                  hover:bg-red-700
                  px-10 py-5
                  rounded-2xl
                  font-bold uppercase tracking-wide
                  transition-all duration-500
                  hover:scale-105
                  hover:shadow-[0_0_40px_rgba(239,68,68,0.45)]
                "
              >
                <span className="relative z-10 flex items-center gap-3">
                  Become Partner
                  <FaArrowRight />
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition duration-500" />
              </button>

              <button
                onClick={handleJoinCommunity}
                className="
                  group border border-white/15
                  hover:border-red-500
                  bg-white/[0.03]
                  backdrop-blur-xl
                  px-10 py-5 rounded-2xl
                  font-bold uppercase tracking-wide
                  transition-all duration-500
                  hover:bg-white/[0.06]
                "
              >
                <span className="flex items-center gap-3">
                  <FaPlayCircle />
                  Join Community
                </span>
              </button>
            </div>

          
          </motion.div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* DIVIDER */}
      {/* ====================================================== */}
      

      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      {/* ====================================================== */}
      {/* BENEFITS */}
      {/* ====================================================== */}

      <section className="py-28 bg-gradient-to-b from-black to-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* HEADER */}

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="uppercase tracking-[5px] text-red-500 text-sm font-semibold">
              GFC Partnerships
            </p>

            <h2 className="mt-4 text-5xl lg:text-6xl  uppercase leading-none">
              Partnership{" "}
              <span className="text-red-500">Benefits</span>
            </h2>

            <div className="w-24 h-1 bg-red-500 mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                  }}
                  className="
                    group relative overflow-hidden
                    bg-white/[0.04]
                    backdrop-blur-2xl
                    border border-white/10
                    hover:border-red-500/50
                    rounded-[32px]
                    p-10
                    transition-all duration-500
                    hover:shadow-[0_0_50px_rgba(239,68,68,0.25)]
                  "
                >
                  {/* TOP BORDER */}

                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* GLOW */}

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10" />

                  {/* CONTENT */}

                  <div className="relative z-10">
                    <div
                      className={`
                        w-20 h-20 rounded-3xl
                        bg-gradient-to-br ${benefit.gradient}
                        flex items-center justify-center
                        shadow-xl shadow-black/40
                        mb-8
                      `}
                    >
                      <Icon className="text-white text-3xl" />
                    </div>

                    <h3 className="text-2xl  uppercase">
                      {benefit.title}
                    </h3>

                    <p className="mt-5 text-gray-400 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SPONSORS */}
      {/* ====================================================== */}

      <section className="py-28 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {tiers.map((tier, tierIndex) => {
            const Icon = tier.icon;

            const tierSponsors = sponsors.filter(
              (sponsor) => sponsor.tier === tier.name
            );

            return (
              <div key={tier.name} className="mb-32">
                {/* HEADER */}

                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <div className="flex items-center justify-center gap-4">
                    <Icon className={`${tier.color} text-4xl`} />

                    <h2 className="text-5xl  uppercase tracking-tight">
                      {tier.name} Sponsors
                    </h2>
                  </div>

                  <div className="w-20 h-1 bg-red-500 mx-auto mt-6 rounded-full" />
                </motion.div>

                {/* CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {tierSponsors.map((sponsor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 80 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.8,
                      }}
                      viewport={{ once: true }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      whileHover={{
                        y: -15,
                        scale: 1.03,
                      }}
                      onMouseEnter={() => setSelectedTier(tier.name)}
                      onMouseLeave={() => setSelectedTier(null)}
                      onClick={() =>
                        window.open(sponsor.website, "_blank")
                      }
                      className={`
                        group relative overflow-hidden
                        bg-white/[0.04]
                        backdrop-blur-2xl
                        border rounded-[32px]
                        p-10 cursor-pointer
                        transition-all duration-500
                        ${
                          selectedTier === tier.name
                            ? "border-red-500/60"
                            : "border-white/10"
                        }
                        hover:shadow-[0_0_50px_rgba(239,68,68,0.25)]
                      `}
                    >
                      {/* TOP BORDER */}

                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                      {/* GLOW */}

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10" />

                      {/* CONTENT */}

                      <div className="relative z-10 text-center">
                        <motion.img
                          whileHover={{
                            scale: 1.08,
                            rotate: 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                          }}
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="h-20 object-contain mx-auto mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                        />

                        <h3 className="text-3xl  uppercase tracking-tight">
                          {sponsor.name}
                        </h3>

                        <p className="mt-5 text-gray-400 leading-relaxed">
                          {sponsor.description}
                        </p>

                        <div className="mt-8 inline-flex items-center gap-3 text-red-500 uppercase font-bold tracking-wide">
                          Visit Website
                          <FaArrowRight />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================== */}
      {/* WHY PARTNER */}
      {/* ====================================================== */}

      <section className="py-32 bg-gradient-to-r from-red-950/10 via-black to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT */}

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <p className="uppercase tracking-[5px] text-red-500 text-sm font-semibold">
                Why Brands Choose GFC
              </p>

              <h2 className="mt-6 text-5xl lg:text-6xl  uppercase leading-[0.95]">
                Reach Millions Of{" "}
                <span className="text-red-500">Fans.</span>
              </h2>

              <p className="mt-8 text-gray-300 leading-relaxed text-lg">
                GFC creates premium entertainment experiences connecting globax
                brands with passionate combat sports audiences across India.
              </p>

              {/* FEATURES */}

              <div className="mt-12 space-y-6">
                {[
                  "Elite athlete brand positioning",
                  "Massive live + digital event exposure",
                  "Premium VIP networking experiences",
                  "High-engagement fan activations",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap-5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                      <FaCheckCircle className="text-red-500" />
                    </div>

                    <div>
                      <p className="text-white font-semibold">{item}</p>

                      <p className="text-gray-400 text-sm mt-1">
                        Premium strategic partnership opportunities.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="
                relative overflow-hidden
                bg-white/[0.04]
                backdrop-blur-2xl
                border border-red-500/20
                rounded-[40px]
                p-14
              "
            >
              {/* GLOW */}

              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-red-700/10" />

              {/* CONTENT */}

              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-8">
                  <FaHandshake className="text-red-500 text-4xl" />
                </div>

                <h3 className="text-4xl  uppercase">
                  Ready To Partner?
                </h3>

                <p className="mt-6 text-gray-400 leading-relaxed">
                  Let’s build unforgettable combat sports experiences together.
                </p>

                <button
                  onClick={handleContactUs}
                  className="
                    group relative overflow-hidden
                    mt-10
                    bg-red-600
                    hover:bg-red-700
                    px-10 py-5
                    rounded-2xl
                    font-bold uppercase tracking-wide
                    transition-all duration-500
                    hover:scale-105
                    hover:shadow-[0_0_40px_rgba(239,68,68,0.45)]
                  "
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Contact Us
                    <FaArrowRight />
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition duration-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <section className="py-32 text-center bg-gradient-to-br from-red-950/30 via-black to-red-900/20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-7xl  uppercase leading-[0.95]"
          >
            Support The{" "}
            <span className="text-red-500">Movement.</span>
          </motion.h2>

          <p className="mt-8 text-gray-400 text-xl leading-relaxed">
            Join the GFC community and experience the future of combat sports
            entertainment.
          </p>

          <button
            onClick={handleJoinCommunity}
            className="
              group relative overflow-hidden
              mt-12
              bg-red-600
              hover:bg-red-700
              px-12 py-5
              rounded-2xl
              font-bold uppercase tracking-wide
              transition-all duration-500
              hover:scale-105
              hover:shadow-[0_0_45px_rgba(239,68,68,0.5)]
            "
          >
            <span className="relative z-10 flex items-center gap-4">
              <FaHeart />
              Join The Movement
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition duration-500" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}