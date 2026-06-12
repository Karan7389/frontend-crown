import React, { useEffect, useState } from "react";
import API from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function TreatmentsList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API
      .get("/treatments")
      .then((res) => setList(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this treatment?")) return;
    await API.delete(`/treatments/${id}`);
    setList((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div style={{ padding: 32 }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0 }}>Treatments</h1>

        <button
          onClick={() => navigate("/dashboard/treatments/add")}
          style={{
            padding: "10px 16px",
            background: "#0a7b70",
            color: "white",
            borderRadius: 8,
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Treatment
        </button>
      </div>

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f0eb", textAlign: "left" }}>
            <th style={{ padding: 14 }}>Thumbnail</th>
            <th style={{ padding: 14 }}>Title</th>
            <th style={{ padding: 14 }}>Slug</th>
            <th style={{ padding: 14 }}>Regular Price</th>
            <th style={{ padding: 14 }}>Member Price</th>
            <th style={{ padding: 14, textAlign: "right" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((t) => (
            <tr key={t._id} style={{ borderBottom: "1px solid #eee" }}>
              {/* THUMBNAIL */}
              <td style={{ padding: 14 }}>
                {t.heroImage ? (
                  <img
                    src={t.heroImage}
                    alt=""
                    style={{
                      height: 60,
                      width: 90,
                      objectFit: "cover",
                      borderRadius: 8,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: 60,
                      width: 90,
                      borderRadius: 8,
                      background: "#ddd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                      fontSize: 12,
                    }}
                  >
                    No Image
                  </div>
                )}
              </td>

              {/* TITLE */}
              <td style={{ padding: 14, fontWeight: 600 }}>{t.title}</td>

              {/* SLUG */}
              <td style={{ padding: 14, color: "#666" }}>{t.slug}</td>

              {/* PRICES */}
              <td style={{ padding: 14 }}>{t.regularPrice || "—"}</td>
              <td style={{ padding: 14, color: "#0a7b70", fontWeight: 600 }}>
                {t.memberPrice || "—"}
              </td>

              {/* ACTION BUTTONS */}
              <td style={{ padding: 14, textAlign: "right" }}>
                <Link
                  to={`/dashboard/treatments/edit/${t._id}`}
                  style={{
                    marginRight: 10,
                    padding: "6px 12px",
                    background: "#0a7b70",
                    color: "white",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => remove(t._id)}
                  style={{
                    padding: "6px 12px",
                    background: "crimson",
                    color: "white",
                    borderRadius: 6,
                    fontSize: 14,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
