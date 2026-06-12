import React from "react";
import LeadForm from "./LeadForm";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div
      style={{
        background: "#faf6ed",
        paddingTop: "120px",
        paddingBottom: "60px",
        minHeight: "100vh",
      }}
    >
      {/* ---------------- TOP SECTION ---------------- */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "700",
          color: "#6f6048",
          marginBottom: "10px",
        }}
      >
        Talk to Our Experts
      </h2>

      <p
        style={{
          textAlign: "center",
          fontSize: "17px",
          color: "#5a4c38",
          marginBottom: "25px",
        }}
      >
        Get free consultation and details about your dental treatment.
      </p>

      {/* PHONE + EMAIL */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <p
          style={{
            fontSize: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "5px",
          }}
        >
          <Phone size={20} /> +91 80779 61782
        </p>

        <p
          style={{
            fontSize: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Mail size={20} /> crowndentalhosp@gmail.com
        </p>
      </div>

      {/* ---------------- FORM CARD ---------------- */}
      <div
       style={{
    width: "95%",
    maxWidth: "1050px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "55px 50px",
    borderRadius: "26px",
    boxShadow: "0 15px 45px rgba(0,0,0,0.20)",
    transform: "translateY(10px)",
  }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "26px",
            fontWeight: "700",
            color: "#6f6048",
            marginBottom: "15px",
          }}
        >
        Connect With Our Smile Experts
        </h2>

        <p style={{ textAlign: "center", marginBottom: "30px", color: "#6a6a6a" }}>
          Our team will reach out within a few minutes.
        </p>

        {/* Lead Form Component */}
        <LeadForm />
      </div>

      {/* ---------------- ADDRESS SECTION ---------------- */}
      <div
        style={{
          width: "90%",
          maxWidth: "850px",
          margin: "40px auto 0",
          background: "#fff",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#6f6048",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Our Clinic Address
        </h3>

        <p
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            fontSize: "17px",
            lineHeight: "26px",
            color: "#5b4a38",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <MapPin size={20} style={{ marginTop: "3px" }} />
          Crown Dental, Near Jagriti Chauraha, G-1/5, Kalindipuram,
          Prayagraj, Uttar Pradesh – 211016
        </p>
      </div>

      {/* ---------------- GOOGLE MAP ---------------- */}
      <div
        style={{
          marginTop: "35px",
          width: "90%",
          maxWidth: "1100px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        <iframe
          title="Crown Dental Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26198.369710779032!2d81.7500061!3d25.4311023!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39853526bea4b871%3A0x130ac70fc2f1b1a5!2sCROWN%20DENTAL%20%7C%20Luxury.Smile.Signature!5e1!3m2!1sen!2sin!4v1776881938318!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Get Directions Button */}
      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}>
        <a
          href="https://maps.google.com/?q=Crown+Dental+G-1/5+Near+Jagriti+Chauraha+Kalindipuram+Prayagraj+UP+211016"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            background: "#c9a96e",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "16px",
            textDecoration: "none",
            transition: "background 0.3s ease",
          }}
          onMouseOver={e => e.currentTarget.style.background = "#b8956a"}
          onMouseOut={e => e.currentTarget.style.background = "#c9a96e"}
        >
          📍 Get Directions
        </a>
      </div>

    </div>
  );
}
