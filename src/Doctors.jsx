import React, { useEffect } from "react";
import { useAppointment } from "./AppointmentContext";
import { Star, Award, Heart } from "lucide-react";

export default function Doctors() {
  const { openModal } = useAppointment();

  // DOCTOR DATA
  const doctors = [
    {
      name: "Dr. Anand Chaudhary",
      title: "Founder, Crown Dental | Dental Surgeon | Implant & Smile Design Specialist",
      img: "/Images/Maledocter.webp",
      isEmoji: false,
      badges: ["Advanced Implants", "Smile Makeovers", "Laser Dentistry", "Full Mouth Rehabilitation"],
      exp: 12,
      treatments: 4500,
      happy: 4000,
    },
    {
      name: "Dr. Swati Chaudhary",
      title: "Executive Director, AngelLife Cosmetology & Wellness | Aesthetic Physician & Dental Surgeon",
      img: "/Images/Femaledocter.webp",
      isEmoji: false,
      badges: ["Skin Rejuvenation", "Anti-Aging Treatments", "Laser Aesthetics", "Facial Contouring"],
      exp: 10,
      treatments: 3800,
      happy: 3500,
    },
    {
      name: "Dr. Astitva Agarwal",
      title: "BDS, MDS | Orthodontist | Oral Cancer Specialist & Maxillofacial Surgeon",
      img: "/Images/Dr-Astitva-Agarwal.jpg",
      isEmoji: false,
      badges: ["Oral Cancer Specialist", "Maxillofacial Surgeon", "Full Mouth Rehab", "Orthodontics"],
      exp: 8,
      treatments: 2800,
      happy: 2600,
    },
    {
      name: "Dr. Rahul Seth",
      title: "BDS, MDS (Gold Medallist) | Oral & Maxillofacial Surgeon | Certified Implantologist",
      img: "/Images/Dr-Rahul-Seth.jpg",
      isEmoji: false,
      badges: ["Oral & Maxillofacial Surgeon", "Certified Implantologist", "Advanced Trauma", "Gold Medallist"],
      exp: 9,
      treatments: 3200,
      happy: 3000,
    },
    {
      name: "Dr. (Col) Satyam Singh",
      title: "Senior Dental Consultant | Military Dental Specialist",
      img: "/Images/Dr-Satyam-Singh.jpg",
      isEmoji: false,
      badges: ["Military Dental Specialist", "Senior Consultant", "Veteran Clinician", "Complex Cases"],
      exp: 20,
      treatments: 6000,
      happy: 5500,
    },
    {
      name: "Dr. Prashashta Mishra",
      title: "BDS, MDS (Orthodontics) | Orthodontist & Smile Specialist",
      img: "/Images/Dr-Prashashta-Mishra.jpg",
      isEmoji: false,
      badges: ["Orthodontics", "Smile Specialist", "Braces & Aligners", "Certified Expert"],
      exp: 7,
      treatments: 2400,
      happy: 2200,
    },
    {
      name: "Dr. Shashwat Kumar",
      title: "Dental Surgeon",
      img: "/Images/DrShashwatKumar.webp.jpg",
      isEmoji: false,
      badges: ["General Dentistry", "Root Canal Specialist"],
      exp: 4,
      treatments: 1500,
      happy: 1400,
    },
  ];

  // Fade-in animation
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade");
    fadeEls.forEach((el, i) =>
      setTimeout(() => el.classList.add("visible"), i * 150)
    );
  }, []);

  return (
    <div style={{ background: "#faf6ed", paddingTop: 110, minHeight: "100vh" }}>
      {/* ---------- PAGE TITLE ---------- */}
      <h1
        style={{
          textAlign: "center",
          fontSize: 38,
          fontWeight: 700,
          color: "#6f6048",
          marginBottom: 10,
        }}
      >
        Meet Our Expert Doctors
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: 17,
          maxWidth: 750,
          margin: "0 auto 40px",
          color: "#5d5446",
        }}
      >
        A team of experienced specialists dedicated to providing gentle,
        advanced, and ethical dental care.
      </p>

      {/* ---------- DOCTOR GRID ---------- */}
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 30,
          padding: "0 20px 70px",
        }}
      >
        {doctors.map((doc, i) => (
          <div
            key={i}
            className="fade"
            style={{
              background: "#ffffff",
              borderRadius: 20,
              padding: 20,
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
            }}
          >
            {/* IMAGE */}
            <img
              src={doc.img}
              alt={doc.name}
              style={{
                width: "100%",
                height: 340,
                objectFit: "cover",
                objectPosition: "top center",
                borderRadius: 16,
                marginBottom: 15,
              }}
            />

            {/* NAME */}
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#6f6048" }}>
              {doc.name}
            </h3>

            <p
              style={{
                fontSize: 15,
                marginTop: 6,
                color: "#5d5446",
                lineHeight: 1.4,
                marginBottom: 15,
              }}
            >
              {doc.title}
            </p>

            {/* ---------- SPECIALIST BADGES ---------- */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              {doc.badges.map((b, bi) => (
                <span
                  key={bi}
                  style={{
                    padding: "6px 12px",
                    background: "#f2ebe0",
                    borderRadius: 20,
                    fontSize: 12,
                    color: "#6f6048",
                    border: "1px solid #e0d4c0",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* ---------- ANIMATED COUNTERS ---------- */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 10px 18px",
                marginBottom: 15,
                borderTop: "1px solid #eee",
              }}
            >
              <Counter icon={<Award size={20} color="#6f6048" />} label="Years" value={doc.exp} />
              <Counter icon={<Star size={20} color="#6f6048" />} label="Treatments" value={doc.treatments} />
              <Counter icon={<Heart size={20} color="#6f6048" />} label="Happy" value={doc.happy} />
            </div>

            {/* ---------- BUTTON ---------- */}
            <button
              onClick={openModal}
              style={{
                padding: "12px 24px",
                background: "#6f6048",
                color: "white",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "15px",
                transition: "0.25s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#5b4f3d")}
              onMouseLeave={(e) => (e.target.style.background = "#6f6048")}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* ---------- ANIMATION CSS ---------- */}
      <style>
        {`
          .fade {
            opacity: 0;
            transform: translateY(20px);
            transition: all .8s ease;
          }
          .fade.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
}

/* ---------------- COUNTER COMPONENT ---------------- */
function Counter({ icon, label, value }) {
  const displayValue =
    value > 1000 ? `${(value / 1000).toFixed(1)}k+` : `${value}+`;

  return (
    <div style={{ textAlign: "center" }}>
      {icon}
      <div style={{ fontWeight: 700, fontSize: 16, color: "#6f6048" }}>
        {displayValue}
      </div>
      <div style={{ fontSize: 12, color: "#5d5446" }}>{label}</div>
    </div>
  );
}
