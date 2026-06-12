import React, { useState, useEffect } from "react";
import { useAppointment } from "./AppointmentContext";

export default function PrivacyPolicy() {
  const { openModal } = useAppointment();

  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  // -------------------- DENTAL CONTENT --------------------
  const infoWeCollect = [
    {
      icon: "📞",
      category: "Contact Information",
      details: "Name, email, phone number, preferred appointment slot.",
    },
    {
      icon: "🦷",
      category: "Dental & Medical Information",
      details:
        "Dental complaints, x-rays, treatment history, allergies, medical notes.",
    },
    {
      icon: "📅",
      category: "Appointment Data",
      details:
        "Treatment type, scheduled date/time, consultation preferences.",
    },
    {
      icon: "💻",
      category: "Website Analytics",
      details: "Device details, pages visited, IP address, cookies.",
    },
    {
      icon: "💬",
      category: "Communication Data",
      details: "Messages received through forms, WhatsApp or email.",
    },
  ];

  const howWeUse = [
    "Book and manage appointments",
    "Provide accurate dental diagnosis & treatment",
    "Send reminders & follow-up information",
    "Improve website experience and marketing",
    "Internal record maintenance",
  ];

  const sharing = [
    {
      icon: "🧑‍⚕️",
      party: "Dental Team",
      purpose: "Dentists & specialists involved in your treatment",
    },
    {
      icon: "🔧",
      party: "Service Providers",
      purpose: "SMS, email, hosting, analytics — all under confidentiality",
    },
    {
      icon: "⚖️",
      party: "Legal Authorities",
      purpose: "Only when required by law",
    },
  ];

  const security = [
    { icon: "🔒", measure: "Encrypted patient data & secure servers" },
    { icon: "👤", measure: "Restricted staff access" },
    { icon: "💾", measure: "Regular backups & encrypted storage" },
  ];

  const rights = [
    "Request copies of your dental records",
    "Update your personal information",
    "Ask for deletion of unnecessary data",
    "Withdraw from promotional messaging",
  ];

  // ------------------ SECTION COMPONENT ------------------
  const Section = ({ id, title, children }) => (
    <div
      id={id}
      className="reveal"
      style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        width: "92%",
        maxWidth: "1100px",
        margin: "0 auto 35px",
        border: "1px solid #e7decf",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "20px" }}>
        {title}
      </h2>
      {children}
    </div>
  );

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
          marginBottom: "50px",
          background: "linear-gradient(135deg, #6f6048 0%, #8d7a5c 100%)",
          color: "white",
          padding: "60px 40px",
          borderRadius: "20px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "15px" }}>
          Privacy Policy
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.95,
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          Crown Dental Hospital is committed to protecting your privacy and ensuring
          safe handling of your personal & medical information.
        </p>
      </div>

      {/* QUICK NAVIGATION */}
      <div
        className="reveal"
        style={{
          width: "92%",
          maxWidth: "1100px",
          margin: "0 auto 45px",
          background: "#f5f1e6",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #e0d8c8",
        }}
      >
        <h3 style={{ color: "#6f6048", textAlign: "center", fontWeight: 700 }}>
          📋 Quick Navigation
        </h3>

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "15px",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {[
            "Information We Collect",
            "How We Use Your Information",
            "Information Sharing",
            "Data Retention",
            "Data Security",
            "Cookies",
            "Your Rights",
            "Third-Party Links",
            "Policy Updates",
            "Contact Us",
          ].map((item, i) => (
            <a
              key={i}
              href={`#section-${i + 1}`}
              style={{
                padding: "12px",
                background: "white",
                borderRadius: "10px",
                border: "1px solid #d9d0bf",
                textDecoration: "none",
                color: "#6f6048",
                textAlign: "center",
                fontWeight: 600,
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#6f6048";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#6f6048";
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* 1. INFO WE COLLECT */}
      <Section id="section-1" title="1️⃣ Information We Collect">
        <div style={{ display: "grid", gap: "20px" }}>
          {infoWeCollect.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "15px",
                padding: "18px",
                borderRadius: "12px",
                background: "#faf6ed",
                border: "1px solid #e5ddc8",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{item.icon}</div>
              <div>
                <h4 style={{ color: "#6f6048", fontWeight: 700 }}>{item.category}</h4>
                <p style={text}>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. HOW WE USE */}
      <Section id="section-2" title="2️⃣ How We Use Your Information">
        <ul style={{ paddingLeft: "20px" }}>
          {howWeUse.map((u, i) => (
            <li key={i} style={{ ...text, marginBottom: "10px" }}>

              ✔ {u}
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. SHARING */}
      <Section id="section-3" title="3️⃣ Information Sharing & Disclosure">
        <div style={{ display: "grid", gap: "20px" }}>
          {sharing.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "15px",
                padding: "18px",
                background: "#f5f1e6",
                borderRadius: "12px",
                border: "1px solid #dacfbf",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{s.icon}</div>
              <div>
                <h4 style={{ color: "#6f6048", fontWeight: 700 }}>{s.party}</h4>
                <p style={text}>{s.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. RETENTION */}
      <Section id="section-4" title="4️⃣ Data Retention">
        <ul style={{ paddingLeft: "20px" }}>
          <li style={text}>🦷 For ongoing dental care</li>
          <li style={text}>⚖️ Legal compliance</li>
          <li style={text}>📁 Internal clinic records</li>
        </ul>
      </Section>

      {/* 5. SECURITY */}
      <Section id="section-5" title="5️⃣ Data Security">
        <div style={{ display: "grid", gap: "20px" }}>
          {security.map((sec, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "15px",
                background: "#faf6ed",
                padding: "18px",
                borderRadius: "12px",
                border: "1px solid #e5ddc8",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{sec.icon}</div>
              <p style={text}>{sec.measure}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. COOKIES */}
      <Section id="section-6" title="6️⃣ Cookies & Tracking">
        <p style={text}>
          Our website uses cookies to improve performance and user experience. You may disable
          cookies in your browser settings.
        </p>
      </Section>

      {/* 7. RIGHTS */}
      <Section id="section-7" title="7️⃣ Your Rights">
        <ul style={{ paddingLeft: "20px" }}>
          {rights.map((r, i) => (
            <li key={i} style={{ ...text, marginBottom: "10px" }}>
              👉 {r}
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. LINKS */}
      <Section id="section-8" title="8️⃣ Third-Party Links">
        <p style={text}>
          External sites linked from our website are not governed by this privacy policy.
        </p>
      </Section>

      {/* 9. UPDATES */}
      <Section id="section-9" title="9️⃣ Updates to This Policy">
        <p style={text}>
          We may update this policy periodically. The revised version will be posted here.
        </p>
      </Section>

      {/* 10. CONTACT */}
      <Section id="section-10" title="🔟 Contact Us">
        <p style={text}>
          📍 <strong>Crown Dental Hospital, Prayagraj</strong> <br />
          📞 +91 8077961782 <br />
        </p>

        <button
          onClick={openModal}
          style={{
            marginTop: "20px",
            padding: "14px 28px",
            background: "#6f6048",
            color: "white",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Book Appointment
        </button>
      </Section>

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
        `}
      </style>
    </div>
  );
}


