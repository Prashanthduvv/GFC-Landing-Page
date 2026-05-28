"use client";
import { useEffect, useState } from "react";
import {
  FaTicketAlt,
  FaShieldAlt,
  FaLock,
  FaUsers,
  FaChartLine,
  FaStar,
  FaCheckCircle,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaGlobe,
  FaTrophy,
  FaPlayCircle,
  FaComments,
  FaWhatsapp,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  FaBookOpen,
  FaQuoteLeft,
  FaTimes,
  FaUserFriends,
} from "react-icons/fa";

const testimonials = [
  {
    image: "/images/1.png",
    quote: "I wanted to be part of this before the world noticed it.",
    author: "Early GFC Community Member",
  },

  {
    image: "/images/2.png",
    quote: "This feels bigger than just events. It feels like a movement.",
    author: "Founding Supporter",
  },

  {
    image: "/images/1.png",
    quote: "The energy and vision behind GFC feels completely different.",
    author: "Fight Enthusiast",
  },
];

export default function Page() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <main className="bg-black text-white overflow-hidden font-sans">
      {/* HERO */}
      {/* HERO */}
      <section className="border-b border-red-900/30 overflow-hidden">
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto items-stretch">
          {/* LEFT */}
          <div className="p-6 lg:p-10 flex flex-col justify-center bg-black relative z-10">
            {/* LOGO */}
            {/* <img
        src="/images/gfc-logo.png"
        alt="GFC Logo"
        className="w-[120px] sm:w-[150px] lg:w-[180px]"
      /> */}

            <p className="text-[10px] tracking-[4px] uppercase text-gray-400 mt-2">
              GlobaX Fighting Championship
            </p>

            {/* HEADING */}
            <h1 className="uppercase  leading-[1] mt-8 text-[clamp(2.5rem,6vw,5.5rem)]">
              India Doesn't
              <br />
              Follow Anymore.
              <br />
              <span className="text-red-600">
                India Becomes
                <br />
                The Stage.
              </span>
            </h1>

            {/* TEXT */}
            <p className="text-gray-300 mt-6 leading-relaxed max-w-xl text-sm lg:text-base">
              Become part of the founding GFC Community — an early movement
              built around combat sports, premium experiences, real stories, and
              the future of fighting culture in India.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/join-community")}
              className="
          mt-8
          relative
          overflow-hidden
          bg-gradient-to-r
          from-red-700
          to-red-500
          hover:from-red-600
          hover:to-red-400
          transition-all
          duration-300
          uppercase
          font-extrabold
          tracking-wide
          px-6
          md:px-8
          py-4
          text-[12px]
          md:text-[14px]
          border
          border-red-400/20
          shadow-[0_0_30px_rgba(255,0,0,0.45)]
          w-full
          sm:w-auto
          group
          hover:scale-[1.02]
          active:scale-[0.98]
        "
            >
              <span
                className="
            absolute
            inset-0
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-1000
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
              />

              <span className="relative z-10">
                APPLY TO JOIN THE GFC COMMUNITY →
              </span>
            </button>

            <p className="mt-4 uppercase tracking-[3px] text-red-400 text-xs">
              Limited Founding Memberships Open
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden min-h-[320px] sm:min-h-[450px] lg:min-h-[750px]">
            {/* IMAGE */}
            <img
              src="/images/c1.png"
              alt="GFC Fighter"
              className="
          absolute inset-0
          w-full h-full
          object-cover
          object-center
          lg:object-right
          scale-[1.02]
        "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/20 to-black/75" />

            {/* MOBILE OVERLAY */}
            <div className="absolute inset-0 bg-black/20 lg:bg-transparent" />
          </div>
        </div>
      </section>

      {/* MOVEMENT */}
      <section className="border-b border-red-900/20 bg-[#050505] overflow-hidden">
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto items-stretch">
          {/* LEFT */}
          <div className="p-6 lg:p-10 flex flex-col justify-center">
            <h2 className="uppercase  leading-none text-[clamp(2rem,5vw,4rem)]">
              More Than Fans.
              <br />
              <span className="text-red-600">We're Building A Movement.</span>
            </h2>

            <div className="mt-6 space-y-5 text-gray-300 leading-relaxed text-sm lg:text-base">
              <p>
                GFC (GlobaX Fighting Championship) is a next-generation combat
                sports platform focused on fighters, storytelling,
                entertainment, and community-driven growth.
              </p>

              <p>
                The GFC Community is the foundation behind this movement — a
                growing network of ambitious individuals, fight enthusiasts,
                creators, professionals, entrepreneurs, and supporters who want
                to be part of something meaningful from the beginning.
              </p>
            </div>

            <p className="mt-8 text-red-500 font-semibold leading-relaxed text-sm lg:text-base">
              This is not just a membership.
              <br />
              It is early access to a platform being built for the future of
              combat sports in India.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[650px]">
            {/* IMAGE */}
            <img
              src="/images/c2.png"
              alt="GFC Community"
              className="
          absolute inset-0
          w-full h-full
          object-cover
          object-center
          lg:object-center
          scale-[1.02]
        "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

            {/* EXTRA DEPTH */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-14 border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h2 className="uppercase text-center  text-[clamp(2rem,5vw,4rem)]">
            Why Join The
            <span className="text-red-600"> GFC Community?</span>
          </h2>

          <p className="text-center text-gray-400 mt-2 text-sm">
            As a Founding Community Member, You Receive:
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-6 gap-4 mt-10">
            {[
              [FaTicketAlt, "Exclusive Event Invitations"],
              [FaShieldAlt, "VIP Opportunities"],
              [FaLock, "Insider Access"],
              [FaUsers, "Community & Networking"],
              [FaChartLine, "Be Part Of The Growth"],
              [FaStar, "Recognition & Early Positioning"],
            ].map(([Icon, title], index) => (
              <div
                key={index}
                className="border border-white/10 bg-[#060606] p-6 rounded-sm hover:border-red-500/50 transition-all duration-300"
              >
                <Icon className="text-red-500 text-5xl mb-5" />

                <h3 className="uppercase font-bold text-lg leading-tight">
                  {title}
                </h3>

                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  Premium member-only access and exclusive experiences inside
                  the GFC ecosystem.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-black text-white overflow-hidden">
        {/* ================================================= */}
        {/* WHO IS THIS FOR */}
        {/* ================================================= */}

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.2fr_1fr] gap-[1px] bg-white/10">
            {/* LEFT */}
            <div className="bg-[#050505] p-5 md:p-7">
              <div className="space-y-5">
                {[
                  "Believe India deserves world-class combat sports platforms",
                  "Want to be early supporters of something meaningful",
                  "Enjoy sports, entertainment, networking, and live experiences",
                  "Want to connect with ambitious and like-minded individuals",
                  "Want insider access instead of being late to the movement",
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <FaCheckCircle
                      className="
                    text-red-600
                    text-sm
                    mt-[4px]
                    shrink-0
                    "
                    />

                    <p
                      className="
                    text-gray-300
                    text-[13px]
                    md:text-[14px]
                    leading-[1.7]
                    font-medium
                    "
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER */}
            <div className="relative min-h-[320px] md:min-h-[420px] overflow-hidden">
              <img
                src="/images/c3.png"
                alt=""
                className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              "
              />

              <div
                className="
              absolute
              inset-0
              bg-black/45
              "
              />

              <div
                className="
              relative
              z-10
              h-full
              flex
              flex-col
              items-center
              justify-start
              text-center
              pt-6
              px-4
              "
              >
                <h2
                  className="
                uppercase
                
                leading-none
                tracking-tight
                text-[clamp(2rem,5vw,4rem)]
                "
                >
                  WHO IS THIS FOR?
                </h2>

                <p
                  className="
                text-red-600
                uppercase
                font-bold
                tracking-wide
                mt-2
                text-[11px]
                md:text-[13px]
                "
                >
                  This Community Is Built For People Who:
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-[#050505] p-5 md:p-7">
              <h3
                className="
              text-red-600
              uppercase
              font-bold
              tracking-wide
              text-[14px]
              md:text-[16px]
              mb-5
              "
              >
                Whether you are:
              </h3>

              <div className="space-y-4">
                {[
                  "A Fight Enthusiast",
                  "Entrepreneur",
                  "Creator",
                  "Working Professional",
                  "Student",
                  "Investor",
                  "Marketer",
                  "Sports Lover",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                  flex
                  items-center
                  gap-3
                  "
                  >
                    <FaStar
                      className="
                    text-red-600
                    text-[11px]
                    shrink-0
                    "
                    />

                    <p
                      className="
                    text-white
                    text-[13px]
                    md:text-[14px]
                    font-medium
                    "
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="
              mt-8
              uppercase
              
              leading-[1.2]
              text-red-600
              text-[18px]
              md:text-[24px]
              max-w-[320px]
              "
              >
                There Is A Place For You Inside The GFC Community.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* WHAT MAKES GFC DIFFERENT */}
        {/* ================================================= */}

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-[1px] bg-white/10">
            {/* LEFT */}
            <div className="bg-[#050505] p-5 md:p-7">
              <h2
                className="
              uppercase
              
              leading-none
              tracking-tight
              text-[clamp(2rem,5vw,4rem)]
              "
              >
                <span className="text-white">What Makes</span>

                <span className="text-red-600"> GFC Different?</span>
              </h2>

              <p
                className="
              mt-3
              text-gray-300
              text-[13px]
              md:text-[14px]
              leading-[1.7]
              max-w-[700px]
              "
              >
                Most platforms focus only on events.
              </p>

              <p
                className="
              mt-3
              text-red-600
              text-[13px]
              md:text-[14px]
              font-bold
              "
              >
                GFC is being built around:
              </p>

              {/* ICON GRID */}
              <div
                className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-6
              gap-5
              md:gap-6
              mt-8
              "
              >
                {[
                  [FaUsers, "Fighters"],
                  [FaBookOpen, "Stories"],
                  [FaPlayCircle, "Content"],
                  [FaUserFriends, "Community"],
                  [FaGlobe, "Culture"],
                  [FaTrophy, "Long-Term\nBrand Building"],
                ].map(([Icon, title], index) => (
                  <div
                    key={index}
                    className="
                  flex
                  flex-col
                  items-center
                  justify-start
                  text-center
                  min-h-[150px]
                  "
                  >
                    <div
                      className="
                    w-[56px]
                    h-[56px]
                    sm:w-[62px]
                    sm:h-[62px]
                    border
                    border-white/20
                    rounded-full
                    flex
                    items-center
                    justify-center
                    "
                    >
                      <Icon
                        className="
                      text-white
                      text-[20px]
                      sm:text-[24px]
                      "
                      />
                    </div>

                    <p
                      className="
                    whitespace-pre-line
                    uppercase
                    font-bold
                    text-[10px]
                    sm:text-[11px]
                    leading-[1.5]
                    tracking-[1px]
                    mt-3
                    text-white
                    max-w-[110px]
                    "
                    >
                      {title}
                    </p>
                  </div>
                ))}
              </div>

              {/* TEXT */}
              <div className="mt-10 space-y-3">
                <p
                  className="
                text-gray-300
                text-[13px]
                md:text-[14px]
                leading-[1.7]
                "
                >
                  We are not chasing one successful night.
                </p>

                <p
                  className="
                text-gray-300
                text-[13px]
                md:text-[14px]
                leading-[1.7]
                "
                >
                  We are building a movement that grows city by city, fighter by
                  fighter, story by story.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-[#050505] p-5 md:p-7 relative overflow-hidden">
              <p
                className="
              uppercase
              
              tracking-wide
              text-[14px]
              "
              >
                <span className="text-white">Community</span>

                <span className="text-red-600"> Vision</span>
              </p>

              <h2
                className="
              uppercase
              
              leading-[0.95]
              mt-5
              text-[clamp(1.7rem,4vw,3.4rem)]
              relative
              z-10
              max-w-[320px]
              "
              >
                <span className="text-white">One Community.</span>

                <br />

                <span className="text-red-600">Many Cities.</span>

                <br />

                <span className="text-white">One Movement.</span>
              </h2>

              <div className="mt-5 space-y-4 max-w-[300px] md:max-w-[340px] relative z-10">
                <p
                  className="
                text-gray-300
                text-[13px]
                md:text-[14px]
                leading-[1.7]
                "
                >
                  The GFC Community is designed to expand across India through
                  local chapters, networking circles, live experiences, and
                  community-led engagement.
                </p>

                <p
                  className="
                text-gray-300
                text-[13px]
                md:text-[14px]
                leading-[1.7]
                "
                >
                  Early members will play a major role in helping shape this
                  journey.
                </p>
              </div>

              {/* INDIA MAP */}
              <img
                src="/images/c4.png"
                alt=""
                className="
              absolute
              right-[-20px]
              bottom-0
              w-[48%]
              md:w-[52%]
              lg:w-[55%]
              object-contain
              opacity-90
              pointer-events-none
              "
              />
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* FOUNDING MEMBER BENEFITS */}
        {/* ================================================= */}

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
            <div
              className="
            border
            border-red-900/40
            bg-[#040404]
            overflow-hidden
            "
            >
              <div
                className="
            grid
            lg:grid-cols-[320px_1fr]
            gap-[1px]
            bg-red-900/20
            "
              >
                {/* LEFT */}
                <div className="bg-black p-4 md:p-5">
                  <h2
                    className="
                  uppercase
                  
                  tracking-tight
                  leading-none
                  text-white
                  text-[22px]
                  md:text-[30px]
                  "
                  >
                    Founding Member Benefits
                  </h2>

                  <div
                    className="
                  mt-4
                  bg-gradient-to-r
                  from-red-800
                  to-red-600
                  border
                  border-red-500/30
                  h-[120px]
                  md:h-[135px]
                  flex
                  flex-col
                  justify-center
                  px-6
                  "
                  >
                    <p
                      className="
                    uppercase
                    tracking-[2px]
                    text-white/80
                    text-[11px]
                    md:text-xs
                    font-semibold
                    "
                    >
                      Contribution Amount
                    </p>

                    <h2
                      className="
                    text-white
                    
                    text-[52px]
                    md:text-[64px]
                    leading-none
                    mt-2
                    "
                    >
                      ₹5,000
                    </h2>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
              bg-black
              grid
              grid-cols-2
              md:grid-cols-3
              xl:grid-cols-7
              gap-[1px]
                          "
                >
                  {[
                    [FaWhatsapp, "Access to official\nGFC WhatsApp\ncommunity"],
                    [FaUsers, "Invitation to\nexclusive community\nevents"],
                    [
                      FaPlayCircle,
                      "VIP opportunities\nfor future\nexperiences",
                    ],
                    [FaLock, "Insider\nannouncements\n& updates"],
                    [FaUsers, "Networking\naccess"],
                    [FaStar, "Founding member\nrecognition"],
                    [FaTrophy, "Early participation\nin future\ninitiatives"],
                  ].map(([Icon, title], index) => (
                    <div
                      key={index}
                      className="
                    bg-black
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    px-4
                    py-7
                                                          min-h-[170px]
                    md:min-h-[190px]
                    "
                    >
                      <div
                        className="
                      w-[52px]
                      h-[52px]
                      sm:w-[58px]
                      sm:h-[58px]
                      border
                      border-white/20
                      rounded-full
                      flex
                      items-center
                      justify-center
                      "
                      >
                        <Icon
                          className="
                        text-white
                        text-[20px]
                        sm:text-[24px]
                        "
                        />
                      </div>

                      <p
                        className="
                      whitespace-pre-line
                      uppercase
                      font-bold
                      text-white
                      text-[10px]
                      sm:text-[11px]
                      leading-[1.6]
                      tracking-wide
                      mt-4
                      max-w-[120px]
                      "
                      >
                        {title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-black overflow-hidden border-t border-white/10">
        {/* ====================================== */}
        {/* TESTIMONIALS */}
        {/* ====================================== */}

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
          {/* TITLE */}
          <div className="text-center mb-5">
            <h2
              className="
                uppercase
                
                leading-none
                tracking-tight
                text-[clamp(1.4rem,4vw,3rem)]
              "
            >
              <span className="text-white">What Our</span>

              <span className="text-red-600"> Community Members Say</span>
            </h2>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              testimonials[current],
              testimonials[
                current === testimonials.length - 1 ? 0 : current + 1
              ],
            ].map((item, index) => (
              <div
                key={index}
                className="
                  relative
                  h-[190px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#050505]
                  "
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt=""
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    object-center
                    "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-black/95
                    via-black/70
                    to-black/20
                    "
                />

                {/* CONTENT */}
                <div
                  className="
                    relative
                    z-10
                    h-full
                    flex
                    flex-col
                    justify-center
                    px-7
                    "
                >
                  <FaQuoteLeft
                    className="
                      text-red-500
                      text-3xl
                      mb-3
                      "
                  />

                  <p
                    className="
                      italic
                      text-white
                      leading-relaxed
                      text-lg
                      max-w-[320px]
                      "
                  >
                    {item.quote}
                  </p>

                  <p
                    className="
                      mt-3
                      uppercase
                      tracking-[2px]
                      text-red-400
                      text-xs
                      "
                  >
                    — {item.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div
              className="
                relative
                h-[220px]
                overflow-hidden
                border
                border-white/10
                bg-[#050505]
                "
            >
              {/* IMAGE */}
              <img
                src={testimonials[current].image}
                alt=""
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  object-center
                  "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/95
                  via-black/70
                  to-black/20
                  "
              />

              {/* CONTENT */}
              <div
                className="
                  relative
                  z-10
                  h-full
                  flex
                  flex-col
                  justify-center
                  px-5
                  "
              >
                <FaQuoteLeft
                  className="
                    text-red-500
                    text-3xl
                    mb-3
                    "
                />

                <p
                  className="
                    italic
                    text-white
                    leading-relaxed
                    text-base
                    "
                >
                  {testimonials[current].quote}
                </p>

                <p
                  className="
                    mt-3
                    uppercase
                    tracking-[2px]
                    text-red-400
                    text-[11px]
                    "
                >
                  — {testimonials[current].author}
                </p>
              </div>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                    transition-all duration-300 rounded-full
                    ${
                      current === index
                        ? "bg-red-600 w-8 h-2"
                        : "bg-white/30 w-2 h-2"
                    }
                  `}
              />
            ))}
          </div>
        </div>

        {/* ====================================== */}
        {/* FOOTER */}
        {/* ====================================== */}

        <div
          className="
            border-t
            border-white/10
            bg-[#030303]
            relative
            overflow-hidden
            mt-8
            "
        >
          {/* RED GLOW */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent_60%)]
              "
          />

          <div
            className="
              relative
              z-10
              max-w-[1400px]
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-6
              md:py-8
              "
          >
            <div
              className="
                grid
                lg:grid-cols-[220px_1fr_220px]
                gap-8
                items-center
                "
            >
              {/* LEFT */}
              <div
                className="
                  flex
                  flex-col
                  items-center
                  lg:items-start
                  text-center
                  lg:text-left
                  "
              >
                <img
                  src="/gfc-logo.png"
                  alt=""
                  className="
                    w-[110px]
                    md:w-[150px]
                    object-contain
                    "
                />

                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-gray-400
                    mt-3
                    text-[10px]
                    md:text-xs
                    "
                >
                  Fights. Stories. Legacy.
                </p>
              </div>

              {/* CENTER */}
              <div className="text-center">
                {/* TITLE */}
                <div
                  className="
                    uppercase
                    leading-[0.82]
                    "
                >
                  <h2
                    className="
                      text-white
                      
                      text-[clamp(2rem,6vw,4.8rem)]
                      "
                  >
                    The Movement
                  </h2>

                  <h2
                    className="
                      text-red-600
                      
                      text-[clamp(2rem,6vw,4.8rem)]
                      mt-5
                      "
                  >
                    Has Begun.
                  </h2>
                </div>

                {/* SUBTEXT */}
                <p
                  className="
                    mt-2
                    text-gray-300
                    leading-tight
                    text-[11px]
                    md:text-sm
                    "
                >
                  You can watch it grow later.
                  <br />
                  Or become part of it now.
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate("/join-community")}
                  className="
                    mt-4
                    bg-gradient-to-r
                    from-red-700
                    to-red-500
                    hover:from-red-600
                    hover:to-red-400
                    transition-all
                    duration-300
                    uppercase
                    font-bold
                    tracking-wide
                    px-5
                    md:px-8
                    py-3
                    text-[11px]
                    md:text-sm
                    border
                    border-red-400/30
                    shadow-[0_0_25px_rgba(255,0,0,0.35)]
                    w-full
                    sm:w-auto
                    "
                >
                  APPLY TO JOIN THE GFC COMMUNITY →
                </button>

                <p
                  className="
                    mt-3
                    uppercase
                    tracking-[2px]
                    text-red-400
                    text-[9px]
                    md:text-[10px]
                    "
                >
                  Limited Founding Memberships Currently Open
                </p>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  flex-col
                  items-center
                  lg:items-end
                  "
              >
                <p
                  className="
                    uppercase
                    font-bold
                    tracking-[3px]
                    text-white
                    text-xs
                    md:text-sm
                    mb-3
                    "
                >
                  Follow GFC
                </p>

                {/* ICONS */}
                <div className="flex gap-3">
                  {[FaInstagram, FaYoutube, FaTimes, FaFacebookF].map(
                    (Icon, index) => (
                      <button
                        key={index}
                        className="
                        w-9
                        h-9
                        md:w-10
                        md:h-10
                        border
                        border-white
                        text-white
                        rounded-full
                        flex
                        items-center
                        justify-center
                        hover:border-red-500
                        hover:text-red-500
                        transition-all
                        duration-300
                        "
                      >
                        <Icon className="text-xs md:text-sm" />
                      </button>
                    ),
                  )}
                </div>

                {/* TAG */}
                <p
                  className="
                    text-red-500
                    font-bold
                    mt-3
                    text-xs
                    md:text-sm
                    "
                >
                  #GFCGlobaX
                </p>
              </div>
            </div>

            {/* BOTTOM TEXT */}
            <div
              className="
                border-t
                border-white/10
                mt-6
                pt-4
                text-center
                "
            >
              <p
                className="
                  text-gray-500
                  text-[8px]
                  md:text-[10px]
                  leading-relaxed
                  max-w-[900px]
                  mx-auto
                  "
              >
                GFC Community Membership is currently available through a
                limited founding intake process.
                <br />
                Applications are reviewed internally before onboarding
                confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
