import React, { useState, useEffect } from "react";
import { useAppointment } from "./AppointmentContext";

export default function FAQ() {
  const { openModal } = useAppointment();
  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  // Scroll reveal animation
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => observer.observe(s));
  }, []);

  // ---------------- FAQs FOR CROWN DENTAL ----------------
  const faqs = [
    {
      q: "How often should I visit the dentist?",
      a: "A routine checkup every 6 months is recommended for cleaning and early detection of dental issues.",
    },
    {
      q: "Is teeth whitening safe?",
      a: "Yes! Professional whitening is safe and does not harm enamel when performed under a dentist’s supervision.",
    },
    {
      q: "Do braces or aligners hurt?",
      a: "You may feel slight pressure for the first 2–3 days, which is completely normal and temporary.",
    },
    {
      q: "What is the cost of dental treatments?",
      a: "Costs vary based on the treatment type. You can contact us or book an appointment for exact pricing.",
    },
    {
      q: "Do you offer painless dentistry?",
      a: "Yes! Crown Dental uses modern equipment, digital anesthesia, and minimally invasive techniques to ensure painless treatment.",
    },
    {
      q: "Can I get a same-day appointment?",
      a: "In most cases, yes. Emergency appointments are also available.",
    },
    {
      q: "Which payment modes do you accept?",
      a: "We accept UPI, Cards, EMI (selected treatments), and online payments.",
    },
    {
      q: "Do dental X-rays have side effects?",
      a: "Digital X-rays use extremely low radiation and are completely safe for adults & children.",
    },
  ];

  const sectionStyle = {
    background: "#fff",
    padding: "40px",
    width: "92%",
    maxWidth: "1100px",
    margin: "0 auto 35px",
    borderRadius: "16px",
    border: "1px solid #e7decf",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const text = {
    color: "#5d5446",
    fontSize: "1.05rem",
    lineHeight: 1.6,
  };

  return (
    <div style={{ background: "#faf6ed", paddingTop: "120px", paddingBottom: "50px" }}>
      {/* HEADER */}
      <div
        className="reveal"
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #6f6048 0%, #8d7a5c 100%)",
          padding: "60px 40px",
          borderRadius: "20px",
          marginBottom: "45px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "15px" }}>
          Frequently Asked Questions
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.95,
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Answers to the most common dental questions patients ask at Crown Dental.
        </p>
      </div>

      {/* FAQ SECTION */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "20px" }}>
          🦷 Common Questions
        </h2>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                marginBottom: "18px",
                padding: "18px",
                background: "#faf6ed",
                borderRadius: "12px",
                border: "1px solid #e5ddc8",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => toggleFAQ(index)}
            >
              {/* QUESTION */}
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#6f6048",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {faq.q}
                <span
                  className={`faq-toggle ${open === index ? "open" : ""}`}
                  aria-hidden
                  style={{ color: "#6f6048" }}
                />
              </div>

              {/* ANSWER */}
              {open === index && (
                <p style={{ ...text, marginTop: "12px" }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="reveal"
        style={{
          width: "92%",
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "40px",
          borderRadius: "16px",
          background: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          textAlign: "center",
          border: "1px solid #e7decf",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#6f6048" }}>
          Still Have Questions?
        </h2>
        <p style={{ ...text, marginTop: "8px", marginBottom: "25px" }}>
          Our dental experts are happy to guide you with personalized advice.
        </p>

        <button
          onClick={openModal}
          style={{
            padding: "14px 28px",
            background: "#6f6048",
            color: "white",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#5b4f3d")}
          onMouseLeave={(e) => (e.target.style.background = "#6f6048")}
        >
          Book an Appointment
        </button>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all .6s ease;
          }
          .reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Animated +/- toggle icon */
          .faq-toggle {
            position: relative;
            width: 18px;
            height: 18px;
            margin-left: 14px;
            flex-shrink: 0;
          }
          .faq-toggle::before,
          .faq-toggle::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            height: 2px;
            background: currentColor;
            border-radius: 2px;
            transform-origin: center;
            transition: transform .25s ease;
          }
          .faq-toggle::before { transform: translate(-50%, -50%) rotate(0deg); }
          .faq-toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
          .faq-toggle.open::after { transform: translate(-50%, -50%) rotate(0deg); }
        `}
      </style>
    </div>
  );
}

