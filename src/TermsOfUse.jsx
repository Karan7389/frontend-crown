import React, { useEffect } from "react";

export default function Terms() {
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
          Terms of Use
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
          Please read these Terms carefully before using the Crown Dental website or services.
        </p>
      </div>

      {/* 1. Acceptance */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          1️⃣ Acceptance of Terms
        </h2>
        <p style={text}>
          By accessing or using the Crown Dental website, online appointment system, or digital
          communication channels, you agree to comply with and be bound by these Terms of Use.
          If you do not agree, please discontinue use immediately.
        </p>
      </div>

      {/* 2. Use of Website */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          2️⃣ Use of Our Website
        </h2>
        <p style={text}>
          Our website is intended to provide general information about dental treatments,
          services, and clinic operations. It must not be used for:
        </p>
        <ul style={{ paddingLeft: 20, ...text }}>
          <li>❌ Misleading or fraudulent activity</li>
          <li>❌ Attempting to disrupt website functionality</li>
          <li>❌ Copying or redistributing content without permission</li>
          <li>❌ Providing false details in contact forms or appointments</li>
        </ul>
      </div>

      {/* 3. Medical Disclaimer */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          3️⃣ Medical Disclaimer
        </h2>
        <p style={text}>
          Content on this website is for educational and informational purposes only.
          It is not a substitute for professional diagnosis or treatment.
        </p>
        <p style={text}>
          Always consult a licensed dentist for personalized medical advice.
        </p>
      </div>

      {/* 4. Appointments */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          4️⃣ Appointments & Scheduling
        </h2>
        <p style={text}>
          When booking an appointment online, you agree to provide accurate information.
          Crown Dental reserves the right to:
        </p>
        <ul style={{ paddingLeft: 20, ...text }}>
          <li>✔ Modify or reschedule appointments when necessary</li>
          <li>✔ Contact you using the details you provided</li>
          <li>✔ Refuse bookings in cases of misuse or false data</li>
        </ul>
      </div>

      {/* 5. Intellectual Property */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          5️⃣ Intellectual Property Rights
        </h2>
        <p style={text}>
          All content, text, graphics, logos, and images on this website belong to Crown Dental.
          Unauthorized copying, modification, resale, or republication is strictly prohibited.
        </p>
      </div>

      {/* 6. User Responsibilities */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          6️⃣ User Responsibilities
        </h2>
        <p style={text}>By using our website, you agree to:</p>
        <ul style={{ paddingLeft: 20, ...text }}>
          <li>✔ Provide valid and updated information</li>
          <li>✔ Not upload harmful files, scripts, malware</li>
          <li>✔ Respect all copyright and clinic policies</li>
        </ul>
      </div>

      {/* 7. Third-Party Links */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          7️⃣ Third-Party Links
        </h2>
        <p style={text}>
          Our website may contain links to external sites for convenience.  
          Crown Dental is not responsible for the content or privacy policies of these websites.
        </p>
      </div>

      {/* 8. Limitation of Liability */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          8️⃣ Limitation of Liability
        </h2>
        <p style={text}>
          Crown Dental is not liable for:
        </p>
        <ul style={{ paddingLeft: 20, ...text }}>
          <li>⚠ Website downtimes or technical issues</li>
          <li>⚠ Delays in appointment confirmations</li>
          <li>⚠ Inaccuracies from third-party integrations (e.g., maps, analytics)</li>
        </ul>
      </div>

      {/* 9. Changes to Terms */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          9️⃣ Updates to These Terms
        </h2>
        <p style={text}>
          Crown Dental may revise these Terms from time to time.
          Updated versions will be posted on this page with a revised effective date.
        </p>
      </div>

      {/* 10. Contact */}
      <div className="reveal" style={sectionStyle}>
        <h2 style={{ fontSize: "1.9rem", color: "#6f6048", marginBottom: "15px" }}>
          🔟 Contact Us
        </h2>
        <p style={text}>For questions about these Terms, contact:</p>

        <p style={{ ...text, marginTop: 10 }}>
          <strong>Crown Dental Clinic</strong><br />
          Jankipuram Extension, Lucknow<br />
          <a href="mailto:care@crowndental.in" style={{ color: "#6f6048" }}>
            care@crowndental.in
          </a>
          <br />
          +91 8077961782
        </p>
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
        `}
      </style>
    </div>
  );
}
