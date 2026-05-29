"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaArrowLeft,
  FaUsers,
  FaTrophy,
  FaLock,
  FaWhatsapp,
  FaCheckCircle,
  FaUpload,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function JoinCommunityPage() {

  const navigate = useNavigate();

  /* ================================================= */
  /* STATE */
  /* ================================================= */

  const [formData, setFormData] = useState({
    referralCode: "",
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    city: "",
    profession: "",
    contributionType: [],
    paymentProof: null,
    acceptDisclaimer: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ================================================= */
  /* INPUT CHANGE */
  /* ================================================= */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    const updatedValue =
      type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ================================================= */
  /* CHECKBOX CHANGE */
  /* ================================================= */

  const handleCheckboxChange = (e) => {

    const { value, checked } = e.target;

    let updatedValues = [
      ...(formData.contributionType || []),
    ];

    if (checked) {

      updatedValues.push(value);

    } else {

      updatedValues = updatedValues.filter(
        (item) => item !== value
      );
    }

    setFormData((prev) => ({
      ...prev,
      contributionType: updatedValues,
    }));

    setErrors((prev) => ({
      ...prev,
      contributionType: "",
    }));
  };

  /* ================================================= */
  /* FILE CHANGE */
  /* ================================================= */

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {

      setErrors((prev) => ({
        ...prev,
        paymentProof:
          "Only JPG, PNG or PDF files allowed",
      }));

      return;
    }

    if (file.size > 10 * 1024 * 1024) {

      setErrors((prev) => ({
        ...prev,
        paymentProof:
          "File size must be below 10MB",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      paymentProof: file,
    }));

    setErrors((prev) => ({
      ...prev,
      paymentProof: "",
    }));
  };

  /* ================================================= */
  /* VALIDATION */
  /* ================================================= */

  const validateForm = () => {

    let newErrors = {};

    if (!formData.fullName.trim()) {

      newErrors.fullName =
        "Full name is required";

    } else if (
      formData.fullName.length < 3
    ) {

      newErrors.fullName =
        "Minimum 3 characters required";
    }

    if (!formData.age) {

      newErrors.age = "Age is required";

    } else if (
      formData.age < 16 ||
      formData.age > 100
    ) {

      newErrors.age =
        "Please enter valid age";
    }

    if (!formData.gender) {

      newErrors.gender =
        "Please select gender";
    }

    if (!formData.phone.trim()) {

      newErrors.phone =
        "Phone number required";

    } else if (
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {

      newErrors.phone =
        "Enter valid 10-digit number";
    }

    if (!formData.city.trim()) {

      newErrors.city =
        "City / State required";
    }

    if (!formData.profession) {

      newErrors.profession =
        "Select profession";
    }

    if (
      !formData.contributionType ||
      formData.contributionType.length === 0
    ) {

      newErrors.contributionType =
        "Select at least one option";
    }

    if (!formData.paymentProof) {

      newErrors.paymentProof =
        "Upload payment proof";
    }

    if (!formData.acceptDisclaimer) {

      newErrors.acceptDisclaimer =
        "Please accept disclaimer";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* ================================================= */
  /* SUBMIT */
  /* ================================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setLoading(true);

    try {

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      console.log("FORM DATA:", formData);

      localStorage.setItem(
        "gfc-community-user",
        JSON.stringify({
          ...formData,
          paymentProof:
            formData.paymentProof?.name,
        })
      );

      setSubmitted(true);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.15),transparent_35%)]
        pointer-events-none
        "
      />

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <section className="relative z-10">

        <div
          className="
          max-w-[1500px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-10
          md:py-16
          "
        >

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="
            flex
            items-center
            gap-3
            text-gray-400
            hover:text-red-500
            transition-all
            uppercase
            tracking-[2px]
            text-xs
            font-bold
            mb-8
            "
          >

            <FaArrowLeft />
            Back

          </button>

          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div className="space-y-8">

              {/* HERO */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
              >

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

               <h1
  className="
  mt-4

  font-['Anton']
  uppercase

  leading-[0.9]
  sm:leading-[0.99]

  tracking-[1px]
  sm:tracking-[2px]

  text-[clamp(2.8rem,9vw,7rem)]

  flex
  flex-col

  gap-1
  sm:gap-2

  break-words
  overflow-hidden
  "
>

  <span
    className="
    text-white
    drop-shadow-[0_0_18px_rgba(255,255,255,0.08)]
    "
  >
    JOIN THE
  </span>

  <span
    className="
    text-red-600

    drop-shadow-[0_0_28px_rgba(255,0,0,0.35)]

    bg-gradient-to-r
    from-red-700
    via-red-500
    to-red-300

    bg-clip-text
    text-transparent
    "
  >
    GFC COMMUNITY
  </span>

</h1>

                <p
                  className="
                  mt-6
                  text-gray-400
                  leading-[1.9]
                  text-sm
                  max-w-[620px]
                  "
                >
                  Become part of India’s next-generation combat sports movement.
                  Help grow the ecosystem through networking, storytelling,
                  event participation, and community engagement.
                </p>

              </motion.div>

              {/* FEATURES */}
              <div className="grid sm:grid-cols-2 gap-4">

                {[
                  [FaWhatsapp, "Official Community Access"],
                  [FaUsers, "Premium Networking"],
                  [FaLock, "Insider Updates"],
                  [FaTrophy, "Founding Recognition"],
                ].map(([Icon, title], index) => (

                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="
                    border
                    border-white/10
                    bg-[#050505]
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    gap-4
                    hover:border-red-500/30
                    transition-all
                    "
                  >

                    <div
                      className="
                      w-12
                      h-12
                      rounded-full
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      bg-black
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
                      "
                    >
                      {title}
                    </p>

                  </motion.div>

                ))}

              </div>

              {/* MESSAGE */}
              <div
                className="
                border
                border-red-500/10
                rounded-3xl
                bg-[#050505]
                p-6
                md:p-8
                "
              >

                <p
                  className="
                  uppercase
                  tracking-[3px]
                  text-red-500
                  text-[10px]
                  font-bold
                  "
                >
                  Message From GFC Team
                </p>

              <h2
  className="
  mt-3
  font-['Anton']
  uppercase
  leading-[0.88]
  tracking-[1px]

  text-[clamp(2.2rem,8vw,5rem)]

  flex
  flex-col

  gap-1
  sm:gap-2

  break-words
  overflow-hidden
  "
>

  <span
    className="
    text-white
    drop-shadow-[0_0_18px_rgba(255,255,255,0.08)]
    "
  >
    FIGHTS.
  </span>

  <span
    className="
    text-red-500
    drop-shadow-[0_0_25px_rgba(255,0,0,0.35)]
    "
  >
    STORIES.
  </span>

  <span
    className="
    bg-gradient-to-r
    from-white
    via-red-200
    to-red-500
    bg-clip-text
    text-transparent
    drop-shadow-[0_0_30px_rgba(255,0,0,0.15)]
    "
  >
    LEGACY.
  </span>

</h2>

                <div
                  className="
                  mt-6
                  text-gray-300
                  text-sm
                  leading-[2]
                  space-y-4
                  "
                >

                  <p>
                    GFC is building a long-term combat sports ecosystem driven by fighters, creators, entrepreneurs, supporters and passionate individuals.
                  </p>

                  <div className="space-y-3">

                    {[
                      "Fighters",
                      "Creators",
                      "Entrepreneurs",
                      "Storytellers",
                      "Supporters",
                    ].map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >

                        <FaCheckCircle className="text-red-500 text-xs" />

                        <span>{item}</span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <div
                className="
                border
                border-red-900/30
                bg-[#050505]
                rounded-[30px]
                overflow-hidden
                shadow-[0_0_60px_rgba(255,0,0,0.12)]
                "
              >

                {/* HEADER */}
                <div
                  className="
                  px-6
                  md:px-8
                  py-7
                  border-b
                  border-white/10
                  "
                >

                  <p
                    className="
                    uppercase
                    tracking-[3px]
                    text-red-500
                    text-[10px]
                    font-bold
                    "
                  >
                    Official GFC Application
                  </p>

                  <h2
                    className="
                    mt-4
                    font-['Anton']
                    uppercase
                    text-[clamp(2rem,5vw,4rem)]
                    leading-none
                    "
                  >
                    APPLY NOW
                  </h2>

                </div>

                {/* BODY */}
                <div className="px-6 md:px-8 py-7">

                  {!submitted ? (

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >

                      <InputField
                        icon={FaUser}
                        label="Referral Code"
                        name="referralCode"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Referral mobile number"
                      />

                      <InputField
                        icon={FaUser}
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        error={errors.fullName}
                      />

                      <div className="grid md:grid-cols-2 gap-5">

                        <InputField
                          icon={FaUser}
                          label="Age"
                          name="age"
                          type="number"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Your age"
                          error={errors.age}
                        />

                        <SelectField
                          label="Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          error={errors.gender}
                          options={[
                            "Male",
                            "Female",
                            "Other",
                          ]}
                        />

                      </div>

                      <InputField
                        icon={FaPhone}
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="WhatsApp number"
                        error={errors.phone}
                      />

                      <InputField
                        icon={FaMapMarkerAlt}
                        label="City / State"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your location"
                        error={errors.city}
                      />

                      <SelectField
                        label="Profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        error={errors.profession}
                        options={[
                          "Student",
                          "Creator",
                          "Entrepreneur",
                          "Fight Enthusiast",
                          "Professional",
                        ]}
                      />

                      {/* CONTRIBUTION */}
                      <div>

                        <label
                          className="
                          block
                          uppercase
                          tracking-[2px]
                          text-[11px]
                          text-red-500
                          font-bold
                          mb-4
                          "
                        >
                          Contribution Type
                        </label>

                        <div className="grid sm:grid-cols-2 gap-4">

                          {[
                            "Community Building",
                            "Social Media Promotion",
                            "Event Volunteering",
                            "Content Creation",
                            "Networking & Partnerships",
                            "General Support",
                          ].map((item, index) => (

                            <label
                              key={index}
                              className="
                              border
                              border-white/10
                              bg-black/40
                              rounded-xl
                              p-4
                              flex
                              items-start
                              gap-3
                              cursor-pointer
                              hover:border-red-500/40
                              transition-all
                              "
                            >

                              <input
                                type="checkbox"
                                value={item}
                                onChange={handleCheckboxChange}
                                className="
                                mt-1
                                accent-red-600
                                "
                              />

                              <span
                                className="
                                text-sm
                                text-gray-300
                                "
                              >
                                {item}
                              </span>

                            </label>

                          ))}

                        </div>

                        {errors.contributionType && (

                          <p className="text-red-500 text-xs mt-3">
                            {errors.contributionType}
                          </p>

                        )}

                      </div>

{/* ================================================= */}
{/* PAYMENT SECTION */}
{/* ================================================= */}

<div
  className="
  mt-4
  w-full
  min-w-0
  border
  border-white/10
  rounded-[24px]
  bg-[#070707]
  overflow-hidden
  "
>

  {/* ================================================= */}
  {/* TOP */}
  {/* ================================================= */}

  <div
    className="
    border-b
    border-white/10
    px-4
    sm:px-5
    md:px-6
    py-5
    "
  >

    <p
      className="
      uppercase
      tracking-[3px]
      text-red-500
      text-[10px]
      font-bold
      "
    >
      Community Contribution
    </p>

    <h3
      className="
      mt-2
      font-['Anton']
      uppercase
      text-[1.8rem]
      sm:text-[2.2rem]
      leading-none
      break-words
      "
    >
      COMPLETE PAYMENT
    </h3>

    <p
      className="
      mt-3
      text-gray-400
      text-sm
      leading-[1.8]
      max-w-[520px]
      "
    >
      Complete the ₹100 annual community contribution
      and upload payment proof for verification.
    </p>

  </div>

  {/* ================================================= */}
  {/* BODY */}
  {/* ================================================= */}

  <div
    className="
    p-4
    sm:p-5
    md:p-6
    "
  >

    <div
      className="
      grid
      grid-cols-1
      xl:grid-cols-[220px_minmax(0,1fr)]
      gap-5
      items-start
      "
    >

      {/* ================================================= */}
      {/* LEFT SIDE */}
      {/* ================================================= */}

      <div
        className="
        w-full
        min-w-0
        flex
        flex-col
        items-center
        "
      >

        {/* QR BLOCK */}
        <div
          className="
          bg-white
          rounded-2xl
          overflow-hidden
          p-3
          w-[160px]
          sm:w-[180px]
          md:w-[200px]
          shadow-lg
          shrink-0
          "
        >

          <img
            src="/images/gfc-payment-qr.png"
            alt="QR"
            className="
            w-full
            h-auto
            object-contain
            rounded-xl
            block
            "
          />

        </div>

        {/* UPI */}
        <div
          className="
          mt-4
          w-full
          max-w-[280px]
          border
          border-red-500/10
          bg-red-500/5
          rounded-2xl
          px-4
          py-4
          text-center
          "
        >

          <p
            className="
            uppercase
            tracking-[2px]
            text-red-500
            text-[10px]
            font-bold
            "
          >
            Official UPI ID
          </p>

          <p
            className="
            mt-2
            text-white
            text-sm
            font-semibold
            break-all
            leading-[1.7]
            "
          >
            gpay-12190818864@okbizaxis
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* RIGHT SIDE */}
      {/* ================================================= */}

      <div
        className="
        w-full
        min-w-0
        flex
        flex-col
        gap-4
        "
      >

        {/* ================================================= */}
        {/* STEPS */}
        {/* ================================================= */}

        <div className="grid gap-3">

          {[
            "Scan the QR code using any UPI application",
            "Complete the ₹100 annual contribution",
            "Take screenshot after successful payment",
            "Upload proof below for verification",
          ].map((item, index) => (

            <div
              key={index}
              className="
              w-full
              min-w-0
              flex
              items-start
              gap-3
              border
              border-white/5
              bg-white/[0.02]
              rounded-xl
              px-4
              py-4
              "
            >

              <div
                className="
                w-7
                h-7
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
                flex
                items-center
                justify-center
                shrink-0
                "
              >

                <FaCheckCircle className="text-red-500 text-xs" />

              </div>

              <p
                className="
                text-sm
                text-gray-300
                leading-[1.8]
                break-words
                "
              >
                {item}
              </p>

            </div>

          ))}

        </div>

        {/* ================================================= */}
        {/* FILE UPLOAD */}
        {/* ================================================= */}

        <label
          className="
          relative
          w-full
          min-w-0
          border-2
          border-dashed
          border-red-500/30
          rounded-2xl
          min-h-[180px]
          sm:min-h-[200px]
          flex
          flex-col
          items-center
          justify-center
          gap-4
          cursor-pointer
          hover:border-red-500
          transition-all
          duration-300
          bg-black/20
          px-4
          sm:px-6
          text-center
          overflow-hidden
          "
        >

          {/* ICON */}
          <div
            className="
            w-16
            h-16
            sm:w-20
            sm:h-20
            rounded-full
            border
            border-red-500/20
            bg-red-500/10
            flex
            items-center
            justify-center
            shrink-0
            "
          >

            <FaUpload className="text-red-500 text-2xl sm:text-3xl" />

          </div>

          {/* TEXT */}
          <div className="min-w-0">

            <p
              className="
              text-white
              font-semibold
              text-sm
              sm:text-base
              break-words
              "
            >
              Upload Payment Proof
            </p>

            <p
              className="
              mt-1
              text-gray-500
              text-xs
              sm:text-sm
              leading-[1.7]
              break-words
              "
            >
              JPG, PNG or PDF • Max 10MB
            </p>

          </div>

          {/* INPUT */}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />

        </label>

        {/* ================================================= */}
        {/* SUCCESS */}
        {/* ================================================= */}

        {formData.paymentProof && (

          <div
            className="
            border
            border-green-500/20
            bg-green-500/10
            rounded-xl
            px-4
            py-4
            break-all
            "
          >

            <p
              className="
              text-green-400
              text-sm
              leading-[1.7]
              "
            >
              Uploaded Successfully:
              {" "}
              {formData.paymentProof.name}
            </p>

          </div>

        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {errors.paymentProof && (

          <div
            className="
            border
            border-red-500/20
            bg-red-500/10
            rounded-xl
            px-4
            py-3
            "
          >

            <p
              className="
              text-red-400
              text-sm
              leading-[1.7]
              "
            >
              {errors.paymentProof}
            </p>

          </div>

        )}

      </div>

    </div>

  </div>

</div>

                      {/* DISCLAIMER */}
                      <div
                        className="
                        border
                        border-yellow-500/20
                        bg-yellow-500/5
                        rounded-3xl
                        p-6
                        "
                      >

                        <p
                          className="
                          uppercase
                          tracking-[3px]
                          text-yellow-200
                          text-[10px]
                          font-bold
                          "
                        >
                          Disclaimer & Acceptance
                        </p>

                        <div
                          className="
                          mt-5
                          text-yellow-100/80
                          text-sm
                          leading-[2]
                          space-y-4
                          "
                        >

                          <p>
                            This is a voluntary community engagement initiative.
                          </p>

                          <p>
                            Rewards and recognitions are performance-based and subject to approval.
                          </p>

                          <p>
                            Fake registrations or unethical activity may result in disqualification.
                          </p>

                        </div>

                        <label
                          className="
                          mt-6
                          flex
                          items-start
                          gap-4
                          "
                        >

                          <input
                            type="checkbox"
                            name="acceptDisclaimer"
                            checked={formData.acceptDisclaimer}
                            onChange={handleChange}
                            className="
                            mt-1
                            accent-red-600
                            "
                          />

                          <p
                            className="
                            text-yellow-100/90
                            text-sm
                            leading-[1.9]
                            "
                          >
                            I understand and accept all GFC guidelines and disclaimer policies.
                          </p>

                        </label>

                        {errors.acceptDisclaimer && (

                          <p className="text-red-500 text-xs mt-3">
                            {errors.acceptDisclaimer}
                          </p>

                        )}

                      </div>

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="
                        w-full
                        bg-gradient-to-r
                        from-red-700
                        to-red-500
                        hover:from-red-600
                        hover:to-red-400
                        transition-all
                        duration-300
                        uppercase
                        font-bold
                        tracking-[1px]
                        rounded-xl
                        py-5
                        border
                        border-red-400/20
                        shadow-[0_0_30px_rgba(255,0,0,0.25)]
                        "
                      >

                        {loading
                          ? "SUBMITTING..."
                          : "SUBMIT APPLICATION →"}

                      </button>

                    </form>

                 ) : (

  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    className="
    text-center

    py-8
    sm:py-10
    md:py-14

    px-4
    sm:px-6
    "
  >

    {/* ICON */}
    <div
      className="
      relative

      w-24
      h-24

      sm:w-28
      sm:h-28

      mx-auto

      rounded-full

      border
      border-red-500/20

      bg-red-500/10

      flex
      items-center
      justify-center

      shadow-[0_0_50px_rgba(255,0,0,0.18)]
      "
    >

      <div
        className="
        absolute
        inset-0
        rounded-full
        bg-[radial-gradient(circle,rgba(255,0,0,0.25),transparent_70%)]
        "
      />

      <FaCheckCircle
        className="
        relative
        z-10

        text-red-500

        text-5xl
        sm:text-6xl
        "
      />

    </div>

    {/* TITLE */}
    <h2
      className="
      mt-7

      font-['Anton']
      uppercase

      leading-[0.9]

      text-[clamp(2.2rem,7vw,5rem)]

      flex
      flex-col

      gap-1
      "
    >

      <span className="text-white">
        APPLICATION
      </span>

      <span
        className="
        bg-gradient-to-r
        from-red-700
        via-red-500
        to-red-800

        bg-clip-text
        text-transparent

        drop-shadow-[0_0_25px_rgba(255,0,0,0.3)]
        "
      >
        SUBMITTED
      </span>

    </h2>

    {/* USER NAME */}
    <p
      className="
      mt-6

      text-lg
      sm:text-xl

      text-white
      font-semibold

      break-words
      "
    >
      Thank You,
      {" "}
      <span className="text-red-500">
        {formData.fullName}
      </span>
    </p>

    {/* MESSAGE */}
    <p
      className="
      mt-4

      max-w-[600px]
      mx-auto

      text-gray-400

      text-sm
      sm:text-base

      leading-[1.9]
      "
    >
      Your GFC Community application has been successfully submitted
      and is currently under review by Team GFC.

      <br />
      <br />

      Our team will verify your application details and payment proof.
      Once approved, you may receive further updates and onboarding access.
    </p>

    {/* STATUS */}
    <div
      className="
      mt-8

      inline-flex
      items-center
      gap-3

      border
      border-yellow-500/20

      bg-yellow-500/10

      rounded-full

      px-5
      py-3
      "
    >

      <div
        className="
        w-3
        h-3
        rounded-full
        bg-yellow-400

        animate-pulse
        "
      />

      <span
        className="
        text-yellow-200

        uppercase
        tracking-[2px]

        text-xs
        sm:text-sm

        font-semibold
        "
      >
        UNDER REVIEW
      </span>

    </div>

    {/* FOOTER */}
    <p
      className="
      mt-8

      text-gray-500

      text-xs
      sm:text-sm

      uppercase
      tracking-[2px]
      "
    >
      FIGHTS • STORIES • LEGACY
    </p>

  </motion.div>

)}

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ================================================= */
/* INPUT */
/* ================================================= */

function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) {

  return (

    <div className="space-y-3">

      <label
        className="
        block
        uppercase
        tracking-[2px]
        text-[11px]
        text-red-500
        font-bold
        "
      >
        {label}
      </label>

      <div className="relative">

        <Icon
          className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-red-500
          "
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
          w-full
          bg-black
          border
          rounded-xl
          pl-14
          pr-5
          py-4
          text-sm
          outline-none
          transition-all
          ${
            error
              ? "border-red-500"
              : "border-white/10"
          }
          focus:border-red-500
          `}
        />

      </div>

      {error && (

        <p className="text-red-500 text-xs">
          {error}
        </p>

      )}

    </div>

  );
}

/* ================================================= */
/* SELECT */
/* ================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) {

  return (

    <div className="space-y-3">

      <label
        className="
        block
        uppercase
        tracking-[2px]
        text-[11px]
        text-red-500
        font-bold
        "
      >
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
        w-full
        bg-black
        border
        rounded-xl
        px-5
        py-4
        text-sm
        outline-none
        transition-all
        ${
          error
            ? "border-red-500"
            : "border-white/10"
        }
        focus:border-red-500
        `}
      >

        <option value="">
          Select {label}
        </option>

        {options.map((item, index) => (

          <option key={index}>
            {item}
          </option>

        ))}

      </select>

      {error && (

        <p className="text-red-500 text-xs">
          {error}
        </p>

      )}

    </div>

  );
}