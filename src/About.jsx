import React, { useEffect } from "react";
import { Heart, Smile, Shield, Sparkles, Calendar } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useAppointment } from "./AppointmentContext";

export default function About() {
    const { openModal } = useAppointment();
  // 🚀 Scroll Reveal Animation
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
  }, []);

  const philosophy = [
    {
      icon: <Smile size={28} color="#6f6048" />,
      title: "Smile Design",
      text: "We don't just treat your tooth — we redesign your whole smile.",
    },
    {
      icon: <Heart size={28} color="#6f6048" />,
      title: "Comfort Comes First",
      text: "We create a calm and stress-free environment for every patient.",
    },
    {
      icon: <Sparkles size={28} color="#6f6048" />,
      title: "Hygiene & Wellness",
      text: "We make you chew your food and enjoy the meal like you did as a kid.",
    },
    {
      icon: <Shield size={28} color="#6f6048" />,
      title: "Honesty & Transparency",
      text: "No hidden prices, no confusion — only ethical and clear guidance.",
    },
  ];

  return (
    <div style={{ background: "#faf6ed", paddingTop: "110px" }}>

      {/* ---------- HERO ---------- */}
      <div
        className="reveal"
        style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "#f2ebe0",
          borderBottom: "1px solid #e0d8c8",
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "700",
            color: "#6f6048",
            marginBottom: "10px",
          }}
        >
          About Crown Dental
        </h1>

        <p
          style={{
            fontSize: "17px",
            maxWidth: "700px",
            margin: "0 auto",
            color: "#5d5446",
          }}
        >
          Creating confident smiles with compassion, trust, and modern dentistry.
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "50px auto", padding: "0 20px" }}>

        {/* ---------- OUR STORY ---------- */}
        <section className="reveal" style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#6f6048",
              marginBottom: "12px",
            }}
          >
            Our Story
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.7,
              color: "#5d5446",
            }}
          >
            Crown Dental began with a simple vision: to redefine dental care by
            making it comfortable, personalised, and truly patient-focused.
            What started as a small practice has now grown into a trusted space
            where thousands of patients have experienced gentle, ethical, and
            transparent dentistry.
          </p>

          <p
            style={{
              fontSize: "17px",
              marginTop: "12px",
              lineHeight: 1.7,
              color: "#5d5446",
            }}
          >
             Over the years, we’ve built a reputation not just for treatments, but
            for the warmth and empathy with which we care for every individual.
            From young children to senior citizens, every patient who walks
            through our doors is treated like family.
          </p>
        </section>

        {/* ---------- TIMELINE / JOURNEY ---------- */}
        <section className="reveal" style={{ marginBottom: "70px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#6f6048",
              marginBottom: "25px",
            }}
          >
            Our Journey
          </h2>

          <div style={{ borderLeft: "3px solid #d2c3b3", paddingLeft: "20px" }}>
            {[
              {
                year: "2021",
                text: "Crown Dental was founded with the vision to offer stress-free and ethical dental care.",
              },
              {
                year: "2022",
                text: "Introduced advanced cosmetic dentistry and modern digital equipment.",
              },
              {
                year: "2023",
                text: "Expanded to a full-service center with specialists in all dental fields.",
              },
              {
                year: "2024",
                text: "Introduced advanced implantology and smile design services with state-of-the-art technology.",
              },
              {
                year: "2025",
                text: "Achieved milestone of 10,000+ happy patients and launched laser dentistry services.",
              },
              {
                year: "2026",
                text: "Recognized as one of the most trusted family dental clinics in the region with 4.9-star rating.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "30px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-32px",
                    top: "4px",
                    background: "#6f6048",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <Calendar size={14} />
                </div>

                <h3 style={{ color: "#6f6048", fontWeight: "700" }}>{step.year}</h3>
                <p style={{ color: "#5d5446", fontSize: "16px", lineHeight: 1.6 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- PHILOSOPHY WITH ICONS ---------- */}
        <section className="reveal" style={{ marginBottom: "70px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#6f6048",
              marginBottom: "20px",
            }}
          >
            Our Philosophy
          </h2>

          <div>
            {philosophy.map((item, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "20px",
                  padding: "20px",
                  borderRadius: "14px",
                  background: "#f7f2e8",
                  border: "1px solid #e4d9c8",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                {item.icon}
                <div>
                  <h3 style={{ fontSize: "20px", color: "#6f6048", fontWeight: "700" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "16px", color: "#5d5446", lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CTA BOX ---------- */}
        <section
          className="reveal"
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid #ddd3c4",
            marginBottom: "70px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              color: "#6f6048",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Ready to Transform Your Smile?
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#5d5446",
              marginBottom: "25px",
            }}
          >
            From routine checkups to complete smile makeovers — we're here for you.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
           <button
  onClick={openModal}
  style={{
    padding: "14px 28px",
    background: "#6f6048",
    color: "white",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "#5b4f3d"; // darker shade
    e.target.style.transform = "translateY(-3px)";
    e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#6f6048";
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "none";
  }}
>
  Book Appointment
</button>

<a
  href="/contact"
  style={{
    padding: "14px 28px",
    background: "#e6ded2",
    color: "#6f6048",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.target.style.background = "#d8cec0";
    e.target.style.transform = "translateY(-3px)";
    e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.12)";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "#e6ded2";
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "none";
  }}
>
  Contact Us
</a>
          </div>
        </section>
      </div>

      {/* --- Animation Styles --- */}
      <style>
        {`
          .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.7s ease;
          }
          .reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
}

