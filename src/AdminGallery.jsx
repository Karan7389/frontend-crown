import React, { useEffect, useState } from "react";
import API from "./api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  

  useEffect(() => {
    API.get("/gallery").then((res) => setImages(Array.isArray(res.data) ? res.data : []));
  }, []);

  const upload = async () => {
    if (!file) return alert("Select an image!");

    setLoading(true);
    const form = new FormData();
    form.append("file", file);

    const uploadRes = await API.post("/uploads/image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    await API.post("/gallery", {
      imageUrl: uploadRes.data.url,
      caption,
    });

    setImages((prev) => [
      { imageUrl: uploadRes.data.url, caption },
      ...prev,
    ]);

    setFile(null);
    setCaption("");
    setLoading(false);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await API.delete(`/gallery/${id}`);
    setImages(images.filter((i) => i._id !== id));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "var(--soft-white)",
        minHeight: "100vh",
        borderRadius: 12,
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--text-primary)" }}>
        Gallery Manager
      </h2>

      {/* Upload Section */}
      <div
        style={{
          marginTop: 24,
          padding: 20,
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "white",
            }}
          />

          <input
            type="text"
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={upload}
            disabled={loading}
            style={{
              background: "var(--sage-green)",
              color: "white",
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              minWidth: 150,
            }}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        style={{
          marginTop: 30,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {images.map((img) => {
          const src = img.imageUrl || img.image; // support legacy records
          return (
          <div
            key={img._id}
            style={{
              position: "relative",
              background: "#fff",
              padding: 10,
              borderRadius: 14,
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            {/* Caption */}
            {img.caption && (
              <p
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  color: "var(--text-secondary)",
                }}
              >
                {img.caption}
              </p>
            )}

            {/* Delete button */}
            <button
              onClick={() => remove(img._id)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#d9534f",
                padding: "6px 10px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                color: "white",
                fontSize: 12,
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              }}
            >
              Delete
            </button>
          </div>
        );
        })}
      </div>
    </div>
  );
}

