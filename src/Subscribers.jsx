import React, { useEffect, useState } from "react";
import API from "./api";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscribers = async () => {
    try {
      const res = await API.get("/subscribers");
      setSubscribers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch subscribers. Are you logged in?");
      console.error("Failed to fetch subscribers", err);
    } finally {
      setLoading(false);
    }
  };

  // Download CSV via authenticated request
  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const url = `${baseUrl}/api/subscribers/export/csv`;

      // Use fetch so we can pass auth header and trigger a download
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `subscribers-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      alert("CSV download failed: " + err.message);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#3d3d3d" }}>
          Newsletter Subscribers
        </h2>

        <button
          onClick={downloadCSV}
          style={{
            padding: "10px 18px",
            background: "#3d3d3d",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          ⬇ Download CSV
        </button>
      </div>

      {error && (
        <div style={{ background: "#ffe8e8", color: "crimson", padding: 14, borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: "#777" }}>Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p style={{ color: "#777" }}>No subscribers found.</p>
      ) : (
        <>
          <p style={{ color: "#777", marginBottom: 16, fontSize: 14 }}>
            {subscribers.length} active subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
            }}
          >
            <thead>
              <tr style={{ background: "#f4f1eb" }}>
                <th style={th}>#</th>
                <th style={th}>Email</th>
                <th style={th}>Date Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <tr
                  key={sub._id || index}
                  style={{ background: index % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  <td style={{ ...td, color: "#aaa", width: 40 }}>{index + 1}</td>
                  <td style={td}>{sub.email}</td>
                  <td style={td}>
                    {new Date(sub.date || sub.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const th = {
  padding: "13px 16px",
  textAlign: "left",
  borderBottom: "1px solid #ddd2c4",
  fontSize: 13,
  fontWeight: 700,
  color: "#666",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const td = {
  padding: "13px 16px",
  borderBottom: "1px solid #eee",
  fontSize: 14,
  color: "#333",
};
