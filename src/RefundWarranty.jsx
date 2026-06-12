import React, { useEffect } from "react";
import { ShieldCheck, RefreshCcw, Info, AlertTriangle } from "lucide-react";

export default function RefundWarranty() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal-policy");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => obs.observe(el));
  }, []);

  return (
    <div style={{ background: "#faf6ed", paddingTop: "110px", paddingBottom: "60px" }}>
      {/* ================= HEADER SECTION ================= */}
      <div
        className="reveal-policy"
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #6f6048 0%, #8d7a5c 100%)",
          padding: "60px 25px",
          borderBottom: "1px solid #e0d8c8",
        }}
      >
        <h1 style={{ fontSize: "38px", color: "white", fontWeight: "700", marginBottom: "10px" }}>
          Refund & Warranty Policy
        </h1>

        <p
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            fontSize: "17px",
            color: "white",
            lineHeight: 1.6,
          }}
        >
          At Crown Dental, we aim to provide ethical, transparent, and compassionate care.  
          This Refund & Warranty Policy ensures clarity and confidence in every treatment you receive.
        </p>
      </div>

      <div style={{ maxWidth: "1050px", margin: "50px auto", padding: "0 20px" }}>
        {/* ================= SECTION 1 — Refund Policy ================= */}
        <section
          id="refund"
          className="reveal-policy"
          style={{
            marginBottom: "45px",
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            border: "1px solid #e4d9c8",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "26px", color: "#6f6048", fontWeight: 700, marginBottom: 20 }}>
            <RefreshCcw size={24} style={{ marginRight: 8 }} />
            Refund Policy
          </h2>

          <ul style={{ paddingLeft: 20, marginTop: 15, lineHeight: 1.7 }}>
            <li>
              Consultation fees are non-refundable once the consultation has taken place.
            </li>
            <li>
              Advance payments made for treatments are refundable only if the procedure has not begun.
            </li>
            <li>
              If treatment planning or lab work has already started (e.g., crowns, aligners), refunds may not apply.
            </li>
            <li>
              Refunds, if applicable, will be processed within 7–10 working days.
            </li>
          </ul>
        </section>

        {/* ================= SECTION 2 — Treatment Warranty ================= */}
        <section
          id="warranty"
          className="reveal-policy"
          style={{
            marginBottom: "45px",
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            border: "1px solid #e4d9c8",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "26px", color: "#6f6048", fontWeight: 700, marginBottom: 20 }}>
            <ShieldCheck size={24} style={{ marginRight: 8 }} />
            Warranty on Dental Treatments
          </h2>

          <p style={{ color: "#5d5446", marginBottom: 15 }}>
            Crown Dental provides service warranty on the following treatments:
          </p>

          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            <li>
              **Dental Crowns / Bridges** — 1-year service warranty on fracture or debonding.
            </li>
            <li>
              **Fillings** — 6-month warranty on material issues.
            </li>
            <li>
              **Dentures** — 1-year service warranty on adjustments.
            </li>
            <li>
              **Root Canal Treatments** — Warranty applicable only if advised crown is placed within recommended timeline.
            </li>
          </ul>

          <p style={{ color: "#5d5446", marginTop: 15, fontStyle: "italic" }}>
            *Warranty does not cover trauma, accidents, neglect, or failure to follow post-treatment instructions.*
          </p>
        </section>

        {/* ================= SECTION 3 — No-Warranty Cases ================= */}
        <section
          id="nowarranty"
          className="reveal-policy"
          style={{
            marginBottom: "45px",
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            border: "1px solid #e4d9c8",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "26px", color: "#6f6048", fontWeight: 700, marginBottom: 20 }}>
            <AlertTriangle size={24} style={{ marginRight: 8 }} />
            Situations Where Warranty Does Not Apply
          </h2>

          <ul style={{ paddingLeft: 20, lineHeight: 1.7 }}>
            <li>Poor oral hygiene, gum diseases, or failure to follow instructions.</li>
            <li>Accidental injury, trauma, grinding habits (unless night guard used).</li>
            <li>Missed follow-up appointments or delayed crown placement after RCT.</li>
            <li>Pre-existing medical conditions affecting healing.</li>
          </ul>
        </section>

        {/* ================= SECTION 4 — Contact ================= */}
        <section
          id="contact"
          className="reveal-policy"
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            border: "1px solid #ddd3c4",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#6f6048", fontWeight: 700 }}>
            Need Help or Clarification?
          </h2>

          <p style={{ fontSize: "17px", color: "#5d5446", marginTop: 12 }}>
            Our team is here to guide you. Reach out anytime.
          </p>

          <p style={{ marginTop: 20, fontSize: "18px", fontWeight: 600 }}>
            📧 care@crowndental.in  
            <br />
            📞 +91 9910478281
          </p>
        </section>
      </div>

      {/* =================== Animation Styles ==================== */}
      <style>
        {`
          .reveal-policy {
            opacity: 0;
            transform: translateY(35px);
            transition: all 0.75s ease;
          }
          .reveal-policy.visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
}
