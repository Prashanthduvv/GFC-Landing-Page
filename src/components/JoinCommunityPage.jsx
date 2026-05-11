"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import {
  FaArrowLeft,
  FaUsers,
  FaTrophy,
  FaLock,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function JoinCommunityPage() {

 const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
const onSubmit = async (data) => {

  setLoading(true);

  try {

    // SIMULATE API DELAY
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    console.log("FORM DATA:", data);

    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "gfc-community-user",
      JSON.stringify(data)
    );

    // SUCCESS
    setSubmitted(true);

    // RESET FORM
    reset();

    // REDIRECT AFTER 4 SEC
    setTimeout(() => {
      navigate("/");
    }, 4000);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
        relative
        border-b
        border-red-900/20
        overflow-hidden
        "
      >

        {/* BG GLOW */}
        <div
          className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.18),transparent_40%)]
          "
        />

        <div
          className="
          relative
          z-10
          max-w-[1550px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-14
          md:py-20
          "
        >

          {/* BACK BUTTON */}
          <button
         onClick={() => navigate(-1)}
            className="
            flex
            items-center
            gap-3
            text-gray-400
            hover:text-red-500
            transition-all
            mb-10
            uppercase
            tracking-[2px]
            text-xs
            font-bold
            "
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div>

              <p
                className="
                uppercase
                tracking-[3px]
                text-red-500
                text-xs
                font-bold
                "
              >
                Founding Intake Open
              </p>

              {/* TITLE */}
              <h1
                className="
                font-['Anton']
                uppercase
                leading-[0.88]
                tracking-[1px]
                text-[clamp(3rem,8vw,7rem)]
                mt-6
                "
              >
                JOIN THE
                <br />

                <span className="text-red-600">
                  GFC COMMUNITY
                </span>
              </h1>

              {/* TEXT */}
              <p
                className="
                mt-6
                text-gray-300
                leading-[1.9]
                text-[14px]
                md:text-[15px]
                max-w-[600px]
                "
              >

                Become part of India’s next-generation combat sports movement.
                Get insider access, exclusive networking opportunities,
                premium experiences, and early community recognition.
              </p>

              {/* BENEFITS */}
              <div className="grid sm:grid-cols-2 gap-5 mt-10">

                {[
                  [FaWhatsapp, "Official Community Access"],
                  [FaUsers, "Exclusive Events"],
                  [FaLock, "Insider Updates"],
                  [FaTrophy, "Founding Recognition"],
                ].map(([Icon, title], index) => (

                  <div
                    key={index}
                    className="
                    border
                    border-white/10
                    bg-[#050505]
                    p-5
                    flex
                    items-center
                    gap-4
                    hover:border-red-500/30
                    hover:bg-[#080808]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    "
                  >

                    <div
                      className="
                      w-12
                      h-12
                      border
                      border-white/10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      shrink-0
                      "
                    >

                      <Icon className="text-red-500 text-lg" />
                    </div>

                    <p
                      className="
                      uppercase
                      text-sm
                      font-bold
                      tracking-wide
                      leading-[1.5]
                      "
                    >
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT */}
            {/* ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
              border
              border-red-900/30
              bg-[#050505]
              p-6
              md:p-10
              shadow-[0_0_40px_rgba(255,0,0,0.15)]
              relative
              overflow-hidden
              "
            >

              {/* RED GLOW */}
              <div
                className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.12),transparent_40%)]
                "
              />

              <div className="relative z-10">

                {!submitted ? (
                  <>
                    {/* STEP */}
                    <div className="flex items-center gap-3 mb-8">

                      <div className="w-10 h-[3px] bg-red-500" />
                      <div className="w-10 h-[3px] bg-white/10" />
                      <div className="w-10 h-[3px] bg-white/10" />

                    </div>

                    {/* TITLE */}
                    <h2
                      className="
                      font-['Anton']
                      uppercase
                      text-[clamp(2rem,5vw,4rem)]
                      leading-[0.9]
                      "
                    >
                      APPLY NOW
                    </h2>

                    {/* SUBTEXT */}
                    <p
                      className="
                      mt-4
                      text-gray-400
                      text-sm
                      leading-[1.8]
                      "
                    >
                      Fill out your details to request access to the
                      founding GFC community.
                    </p>

                    {/* FORM */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mt-8 space-y-5"
                    >

                      {/* NAME */}
                      <div>

                        <label
                          className="
                          block
                          uppercase
                          text-[11px]
                          tracking-[2px]
                          text-red-500
                          font-bold
                          mb-2
                          "
                        >
                          Full Name
                        </label>

                        <input
                          {...register("name", {
                            required: "Name is required",
                          })}
                          type="text"
                          placeholder="Enter your full name"
                          className="
                          w-full
                          bg-black
                          border
                          border-white/10
                          focus:border-red-500
                          focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                          outline-none
                          transition-all
                          duration-300
                          px-5
                          py-4
                          text-sm
                          hover:border-white/20
                          "
                        />

                        {errors.name && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* EMAIL */}
                      <div>

                        <label
                          className="
                          block
                          uppercase
                          text-[11px]
                          tracking-[2px]
                          text-red-500
                          font-bold
                          mb-2
                          "
                        >
                          Email Address
                        </label>

                        <input
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          placeholder="Enter your email"
                          className="
                          w-full
                          bg-black
                          border
                          border-white/10
                          focus:border-red-500
                          focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                          outline-none
                          transition-all
                          duration-300
                          px-5
                          py-4
                          text-sm
                          hover:border-white/20
                          "
                        />

                        {errors.email && (
                          <p className="text-red-500 text-xs mt-2">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* PHONE */}
                      <div>

                        <label
                          className="
                          block
                          uppercase
                          text-[11px]
                          tracking-[2px]
                          text-red-500
                          font-bold
                          mb-2
                          "
                        >
                          Phone Number
                        </label>

                        <input
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                          type="tel"
                          placeholder="Enter your number"
                          className="
                          w-full
                          bg-black
                          border
                          border-white/10
                          focus:border-red-500
                          focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                          outline-none
                          transition-all
                          duration-300
                          px-5
                          py-4
                          text-sm
                          hover:border-white/20
                          "
                        />
                      </div>

                      {/* CITY + PROFESSION */}
                      <div className="grid md:grid-cols-2 gap-5">

                        <div>

                          <label
                            className="
                            block
                            uppercase
                            text-[11px]
                            tracking-[2px]
                            text-red-500
                            font-bold
                            mb-2
                            "
                          >
                            City
                          </label>

                          <input
                            {...register("city")}
                            type="text"
                            placeholder="Your city"
                            className="
                            w-full
                            bg-black
                            border
                            border-white/10
                            focus:border-red-500
                            focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                            outline-none
                            transition-all
                            duration-300
                            px-5
                            py-4
                            text-sm
                            hover:border-white/20
                            "
                          />
                        </div>

                        <div>

                          <label
                            className="
                            block
                            uppercase
                            text-[11px]
                            tracking-[2px]
                            text-red-500
                            font-bold
                            mb-2
                            "
                          >
                            Profession
                          </label>

                          <select
                            {...register("profession")}
                            className="
                            w-full
                            bg-black
                            border
                            border-white/10
                            focus:border-red-500
                            focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                            outline-none
                            transition-all
                            duration-300
                            px-5
                            py-4
                            text-sm
                            hover:border-white/20
                            "
                          >

                            <option>Fight Enthusiast</option>
                            <option>Entrepreneur</option>
                            <option>Creator</option>
                            <option>Student</option>
                            <option>Investor</option>
                            <option>Working Professional</option>
                          </select>
                        </div>
                      </div>

                      {/* MESSAGE */}
                      <div>

                        <label
                          className="
                          block
                          uppercase
                          text-[11px]
                          tracking-[2px]
                          text-red-500
                          font-bold
                          mb-2
                          "
                        >
                          Why Do You Want To Join?
                        </label>

                        <textarea
                          {...register("message")}
                          rows={5}
                          placeholder="Tell us about yourself..."
                          className="
                          w-full
                          bg-black
                          border
                          border-white/10
                          focus:border-red-500
                          focus:shadow-[0_0_20px_rgba(255,0,0,0.2)]
                          outline-none
                          transition-all
                          duration-300
                          px-5
                          py-4
                          text-sm
                          hover:border-white/20
                          resize-none
                          "
                        />
                      </div>

                      {/* TERMS */}
                      <div className="flex items-start gap-3">

                        <input
                          type="checkbox"
                          required
                          className="
                          mt-1
                          accent-red-600
                          w-4
                          h-4
                          "
                        />

                        <p
                          className="
                          text-gray-400
                          text-xs
                          leading-[1.7]
                          "
                        >
                          I agree to receive updates, community
                          notifications, and onboarding communication from GFC.
                        </p>
                      </div>

                      {/* SUBMIT */}
                      <button
                        disabled={loading}
                        type="submit"
                        className="
                        w-full
                        mt-3
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
                        py-4
                        text-[13px]
                        border
                        border-red-400/20
                        shadow-[0_0_25px_rgba(255,0,0,0.4)]
                        disabled:opacity-70
                        hover:scale-[1.01]
                        active:scale-[0.99]
                        "
                      >

                        {loading ? (
                          <div className="flex items-center justify-center gap-3">

                            <div
                              className="
                              w-5
                              h-5
                              border-2
                              border-white/30
                              border-t-white
                              rounded-full
                              animate-spin
                              "
                            />

                            SUBMITTING...
                          </div>
                        ) : (
                          "SUBMIT APPLICATION →"
                        )}
                      </button>
                    </form>
                  </>
                ) : (

                  /* SUCCESS */

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10"
                  >

                    <div
                      className="
                      w-24
                      h-24
                      rounded-full
                      bg-red-600/10
                      border
                      border-red-500/20
                      flex
                      items-center
                      justify-center
                      mx-auto
                      shadow-[0_0_40px_rgba(255,0,0,0.2)]
                      "
                    >

                      <FaCheckCircle className="text-red-500 text-5xl" />
                    </div>

                    <h2
                      className="
                      font-['Anton']
                      uppercase
                      text-[clamp(2rem,5vw,4rem)]
                      leading-[0.9]
                      mt-8
                      "
                    >

                      APPLICATION
                      <br />

                      <span className="text-red-600">
                        SUBMITTED
                      </span>
                    </h2>

                    <p
                      className="
                      mt-5
                      text-gray-300
                      leading-[1.8]
                      text-sm
                      max-w-[420px]
                      mx-auto
                      "
                    >

                      Your request has been received successfully.
                      Our team will review your application and contact
                      you shortly with the next onboarding steps.
                    </p>

                    <button
                     onClick={() => navigate("/")}
                      className="
                      mt-8
                      border
                      border-white/10
                      hover:border-red-500
                      hover:text-red-500
                      transition-all
                      uppercase
                      tracking-[2px]
                      text-xs
                      px-8
                      py-4
                      "
                    >
                      RETURN HOME
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer
        className="
        border-t
        border-white/10
        py-8
        bg-[#030303]
        "
      >

        <div
          className="
          max-w-[1550px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-5
          "
        >

          {/* LEFT */}
          <p
            className="
            text-gray-500
            text-xs
            uppercase
            tracking-[2px]
            text-center
            md:text-left
            "
          >
            GFC — Fights. Stories. Legacy.
          </p>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {[FaInstagram, FaYoutube].map((Icon, index) => (

              <button
                key={index}
                className="
                w-10
                h-10
                rounded-full
                border
                border-white/10
                flex
                items-center
                justify-center
                hover:border-red-500
                hover:text-red-500
                transition-all
                "
              >

                <Icon className="text-sm" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}