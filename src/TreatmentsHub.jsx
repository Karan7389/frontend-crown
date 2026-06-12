import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import API from "./api";

import { FiChevronDown, FiCheck } from "react-icons/fi";

/* ---------------- CATEGORY OPTIONS ---------------- */
const categoryOptions = [
  "All",
  "Preventive",
  "Restorative",
  "Endodontics",
  "Implants",
  "Prosthetics",
  "Cosmetic",
  "Orthodontics",
  "Pediatric",
  "Periodontics",
  "Oral Surgery",
];

/* ---------------- CONCERNS OPTIONS ---------------- */
const concernOptions = [
  "Pain",
  "Cavities",
  "Gums",
  "Teeth Alignment",
  "Missing Teeth",
  "Smile Makeover",
  "Kids Care",
];

/* ---------------- DROPDOWN COMPONENT ---------------- */
function Dropdown({ label, selected, setSelected, options, multiple = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "12px 16px",
          borderRadius: 12,
          background: "white",
          border: "1.5px solid var(--sage-green)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          minWidth: 220,
          fontWeight: 600,
        }}
      >
        {multiple
          ? selected.length > 0
            ? `${selected.length} selected`
            : label
          : selected || label}
        <FiChevronDown />
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            width: "100%",
            background: "white",
            borderRadius: 12,
            padding: 10,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
          }}
        >
          {options.map((opt) => {
            const isActive = multiple
              ? selected.includes(opt)
              : selected === opt;

            return (
              <div
                key={opt}
                onClick={() => {
                  if (multiple) {
                    if (selected.includes(opt)) {
                      setSelected(selected.filter((v) => v !== opt));
                    } else {
                      setSelected([...selected, opt]);
                    }
                  } else {
                    setSelected(opt);
                    setOpen(false);
                  }
                }}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: isActive ? "var(--sage-green)" : "transparent",
                  color: isActive ? "white" : "var(--text-primary)",
                  display: "flex",
                  gap: 10,
                }}
              >
                {multiple && (
                  <FiCheck style={{ opacity: isActive ? 1 : 0.2 }} />
                )}
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------ MAIN PAGE ------------------------ */
export default function TreatmentsHub() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [concerns, setConcerns] = useState([]);

  /* ---------------- FETCH ALL TREATMENTS ---------------- */
  useEffect(() => {
    API.get("/treatments")
      .then((res) => setTreatments(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.error || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const clearFilters = () => {
    setCategory("All");
    setConcerns([]);
  };

  /* ---------------- FILTERING LOGIC ---------------- */
  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      if (!t) return false;

      // Filter by category
      if (category !== "All" && t.category !== category) return false;

      // Filter by concerns (searching inside seoCopy)
      if (concerns.length > 0) {
        const text = `${t.seoCopy}`.toLowerCase();
        if (!concerns.some((c) => text.includes(c.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });
  }, [treatments, category, concerns]);

  if (loading) return <div style={{ padding: 40 }}>Loading treatments...</div>;

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h2 style={{ color: "crimson" }}>Unable to load treatments</h2>
        <p style={{ color: "#555" }}>{error}</p>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div style={{ background: "var(--soft-white)", minHeight: "100vh" }}>
      <div style={{ height: "96px" }} />

      {/* ---------------- HERO ---------------- */}
      <section
        style={{
          padding: "80px 8% 100px",
          textAlign: "center",
          backgroundImage: 'url("/Images/treatment.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />
        <div style={{ position: "relative", zIndex: 3 }}>
          <h1 style={{ fontSize: 46, fontWeight: 700 }}>
            Explore Specialist Dental Treatments
          </h1>
          <p style={{ maxWidth: 820, margin: "20px auto 0", fontSize: 18 }}>
            Find the right treatment for your dental needs — from preventive to surgical.
          </p>
        </div>
      </section>

      {/* ---------------- FILTER BAR ---------------- */}
      <section style={{ padding: "30px 8%" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Dropdown
            label="Category"
            selected={category}
            setSelected={setCategory}
            options={categoryOptions}
          />

          <Dropdown
            label="Concerns"
            selected={concerns}
            setSelected={setConcerns}
            options={concernOptions}
            multiple
          />

          <button
            onClick={clearFilters}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              background: "white",
              border: "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* ---------------- TREATMENTS GRID ---------------- */}
      <section style={{ padding: "30px 8%" }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 24 }}>
          Treatments Library
        </h2>

        <div
          style={{
            display: "grid",
            gap: 26,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {filtered.map((t) => (
            <Link
              to={`/treatments/${t.slug}`}
              key={t.slug}
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.35)",
                overflow: "hidden",
                transition: "0.3s",
              }}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={t.heroImage}
                  alt={t.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 24, fontWeight: 600 }}>{t.title}</h3>

                <p style={{ fontSize: 16, color: "#555", marginTop: 6 }}>
                  {(t.seoCopy || "").slice(0, 200)}...
                </p>

                <p
                  style={{
                    marginTop: 10,
                    fontWeight: 700,
                    color: "var(--sage-green)",
                  }}
                >
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


