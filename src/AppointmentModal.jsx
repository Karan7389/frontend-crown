import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import API from "./api";
import successAnim from "./success.json";

export default function AppointmentModal({ isOpen, onClose }) {
  const [treatments, setTreatments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    treatment: "",
  });

  // Fetch treatments for the dropdown
  useEffect(() => {
    if (!isOpen) return;
    API.get("/treatments")
      .then((res) => setTreatments(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTreatments([]));
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", email: "", phone: "", date: "", time: "", treatment: "" });
      setError("");
      setSuccess(false);
    }
  }, [isOpen]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/appointments", form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      setError(err.response?.data?.error || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Min date = today (prevent past date selection)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* SUCCESS ANIMATION */}
        {success && (
          <div style={styles.successContainer}>
            <div style={{ fontSize: "52px", color: "#4CAF50", marginBottom: "-4px", fontWeight: "900" }}>
              ✓
            </div>
            <Player
              autoplay
              loop={false}
              src={successAnim}
              style={{ height: "150px", width: "150px" }}
            />
            <h3 style={{ color: "#6f6048", marginTop: "-8px" }}>Booked Successfully!</h3>
          </div>
        )}

        {/* FORM */}
        {!success && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={styles.heading}>Book Appointment</h2>
              <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999" }}>✕</button>
            </div>

            {error && (
              <div style={{ background: "#ffe8e8", color: "crimson", padding: "10px 14px", borderRadius: 10, marginBottom: 14, fontSize: 14, fontWeight: 600 }}>
                ⚠ {error}
              </div>
            )}

            <form onSubmit={submit}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={styles.input} required />
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} style={styles.input} required />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={styles.input} required />

              <select name="treatment" value={form.treatment} onChange={handleChange} style={styles.input} required>
                <option value="">Select Treatment</option>
                {treatments.map((t) => (
                  <option key={t._id} value={t.title}>{t.title}</option>
                ))}
              </select>

              <input type="date" name="date" value={form.date} onChange={handleChange} style={styles.input} required min={today} />
              <input type="time" name="time" value={form.time} onChange={handleChange} style={styles.input} required />

              <button type="submit" style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                {loading ? "Submitting..." : "Confirm Appointment"}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes popup {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "95%",
    maxWidth: "450px",
    background: "#ffffff",
    padding: "28px",
    borderRadius: "20px",
    animation: "popup 0.3s ease",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    border: "1px solid #e5ddc8",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  heading: {
    color: "#6f6048",
    fontWeight: 800,
    fontSize: "22px",
    margin: 0,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #d3c8b3",
    background: "#f5f1e6",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#6f6048",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "6px",
  },
  successContainer: {
    textAlign: "center",
    padding: "10px 0",
  },
};
