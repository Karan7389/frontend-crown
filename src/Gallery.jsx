import React, { useEffect, useState, useMemo } from "react";
import API from "./api";

export default function PublicGallery() {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // ---------------- AUTO CATEGORY DETECTION ----------------
  const autoCategory = (caption = "") => {
    caption = caption?.toLowerCase() || "";

    if (
      caption.includes("implant") ||
      caption.includes("crown") ||
      caption.includes("root canal")
    )
      return "Treatments";

    if (
      caption.includes("clinic") ||
      caption.includes("chair") ||
      caption.includes("setup")
    )
      return "Facilities";

    if (caption.includes("event") || caption.includes("celebration"))
      return "Events";

    return "General";
  };

  // ---------------- FETCH IMAGES ----------------
  useEffect(() => {
    API.get("/gallery")
      .then((res) => {
        const updated = (res.data || []).map((img) => ({
          ...img,
          category: img.category || autoCategory(img.caption),
        }));
        setImages(updated);
      })
      .catch((err) => console.error("Fetch public gallery error:", err));
  }, []);

  // ---------------- HOVER COUNT-UP CARD ----------------
  const StatCard = ({ icon, label, value }) => {
    const [count, setCount] = useState(value);

    const startCount = () => {
      let start = 0;
      const end = value;
      let duration = 900;
      let step = Math.max(duration / end, 20);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, step);
    };

    return (
      <div
        onMouseEnter={startCount}
        style={{
          background: "#fdfbf7",
          padding: "22px 10px",
          borderRadius: "14px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          textAlign: "center",
          transition: "0.3s",
        }}
      >
        <div style={{ fontSize: "32px", marginBottom: "6px" }}>{icon}</div>

        <h3
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#6b5c4a",
            marginBottom: "4px",
          }}
        >
          {count}
        </h3>

        <p
          style={{
            fontSize: "15px",
            color: "#7b6e63",
            marginTop: 0,
          }}
        >
          {label}
        </p>
      </div>
    );
  };

  // ---------------- CATEGORY LIST ----------------
  const categories = useMemo(() => {
    const setCats = new Set(["All"]);
    images.forEach((i) => setCats.add(i.category));
    return [...setCats];
  }, [images]);

  // ---------------- FILTER ----------------
  const filtered = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  return (
    <div
      style={{
        paddingTop: "60px",
        background: "#faf6ed",
        minHeight: "100vh",
      }}
    >
      {/* ---------------- HERO ---------------- */}
      <section style={{ textAlign: "center", marginBottom: "5px" }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 700, color: "#6b5c4a" }}>
          Smile Gallery
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#5c4a3d",
            marginTop: "10px",
            maxWidth: "600px",
            marginInline: "auto",
          }}
        >
          Explore clinic moments, patient transformations, and real experiences.
        </p>
      </section>

      {/* ---------------- CATEGORY FILTER ---------------- */}
      <div
        style={{
          background: "white",
          padding: "22px",
          marginBottom: "40px",
          borderRadius: "14px",
          width: "80%",
          maxWidth: "900px",
          marginInline: "auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px 22px",
              borderRadius: "25px",
              border: "1px solid #6b5c4a",
              background: activeCategory === cat ? "#6b5c4a" : "white",
              color: activeCategory === cat ? "white" : "#6b5c4a",
              cursor: "pointer",
              fontWeight: 600,
              transition: "0.25s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---------------- GALLERY GRID ---------------- */}
      <div
        style={{
          columnCount: 3,
          columnGap: "22px",
          padding: "0 8%",
        }}
      >
        {filtered.map((img, index) => {
          const src = img.imageUrl;

          return (
            <div
              key={img._id || index}
              onClick={() => setSelectedImage(src)}
              style={{
                breakInside: "avoid",
                marginBottom: "22px",
                cursor: "pointer",
                borderRadius: "14px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                animation: `fadeInUp 0.7s ease forwards`,
                opacity: 0,
                transform: "translateY(20px)",
                animationDelay: `${index * 70}ms`,
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />

              {img.caption && (
                <div style={{ padding: "14px 18px" }}>
                  <h3
                    style={{
                      color: "#6b5c4a",
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                    }}
                  >
                    {img.caption}
                  </h3>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------------- PREMIUM STATS ---------------- */}
      <div
        style={{
          width: "100%",
          marginTop: "70px",
          marginBottom: "40px",
          padding: "40px 5%",
          background: "#e9e4d8",
          borderRadius: "14px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#6b5c4a",
            fontSize: "26px",
            fontWeight: 700,
            marginBottom: "30px",
          }}
        >
          Gallery Insights
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "22px",
          }}
        >
          <StatCard icon="🖼️" label="Total Images" value={images.length} />

          <StatCard
            icon="🦷"
            label="Treatment Photos"
            value={images.filter((i) => i.category === "Treatments").length}
          />

          <StatCard
            icon="🏥"
            label="Facility Photos"
            value={images.filter((i) => i.category === "Facilities").length}
          />

          <StatCard
            icon="🎉"
            label="Event Photos"
            value={images.filter((i) => i.category === "Events").length}
          />
        </div>
      </div>

      {/* ---------------- LIGHTBOX ---------------- */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <img
            src={selectedImage}
            style={{
              maxWidth: "90%",
              maxHeight: "85%",
              borderRadius: "14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              animation: "zoomIn 0.35s ease",
            }}
          />
        </div>
      )}

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @media (max-width: 900px) {
            div[style*="column-count"] { column-count: 2 !important; }
          }

          @media (max-width: 600px) {
            div[style*="column-count"] { column-count: 1 !important; }
          }
        `}
      </style>
    </div>
  );
}

