import React, { useState } from "react";
import API from "./api";


export default function LeadForm({ source = "General Inquiry", onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const inputStyle = {
    width: "100%",
    padding: "18px 18px",
    marginBottom: "16px",
    borderRadius: "14px",
    border: "1px solid #d6c8b8",
    background: "#f8f4ed",
    fontSize: "17px",
    outline: "none",
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitLead = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/leads", { ...form, source });

      setSubmitted(true);
      setLoading(false);

      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "", message: "" });
        if (onSuccess) onSuccess();
      }, 1800);
      
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      
      {/* SUCCESS POPUP */}
      {submitted && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.95)",
            borderRadius: "22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeIn .3s ease",
            zIndex: 10,
          }}
        >
          {/* GREEN CHECK ICON */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#4CAF50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
              animation: "pop .3s ease",
            }}
          >
            <span
              style={{
                fontSize: "42px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              ✔
            </span>
          </div>

          <h3 style={{ color: "#6f6048", fontSize: "22px", marginTop: "5px" }}>
            Submitted Successfully!
          </h3>

         

          <style>
            {`
              @keyframes pop {
                0% { transform: scale(0.6); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
          </style>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={submitLead}
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "22px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          border: "1px solid #e5ddc8",
        }}
      >
        <h2
          style={{
            color: "#6f6048",
            textAlign: "center",
            marginBottom: 18,
            fontWeight: 800,
            fontSize: "26px",
          }}
        >
          Contact Us
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "15px",
            color: "#6b5c4a",
            marginBottom: 25,
          }}
        >
          Our team will reach out within a few minutes.
        </p>

        <input
          style={inputStyle}
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          style={{
            ...inputStyle,
            height: "130px",
            resize: "none",
          }}
          name="message"
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "17px",
            fontWeight: "700",
            borderRadius: "14px",
            border: "none",
            background: "#6f6048",
            color: "white",
            cursor: "pointer",
            transition: ".25s",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}




