import React, { useEffect, useState } from "react";
import API from "./api";

export default function Leads() {
  const [list, setList] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    API.get("/leads").then((res) => setList(Array.isArray(res.data) ? res.data : []));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await API.delete(`/leads/${id}`);
    setList(list.filter((l) => l._id !== id));
  };

  const updateStatus = async (id, status) => {
    const res = await API.put(`/leads/${id}`, { status });
    setList(list.map((l) => (l._id === id ? res.data : l)));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={titleStyle}>Leads</h1>

      <div style={wrapperStyle}>
        {/* TABLE HEADER */}
        <div style={headerRowStyle}>
          <span>Date</span>
          <span>Name</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Message</span>
          <span>Source</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {/* ROWS */}
        {list.map((l) => (
          <div key={l._id} style={rowStyle}>
            {/* Date */}
            <div style={colStyle}>
              {l.createdAt
                ? new Date(l.createdAt).toLocaleDateString()
                : "—"}
            </div>

            {/* Name */}
            <div style={colStyle}>{l.name}</div>

            

            <div style={colStyle}>{l.phone}</div>
            <div style={colStyle}>{l.email}</div>

            <div style={truncateCol} title={l.message}>
              {l.message}
            </div>

            <div style={truncateCol} title={l.source}>
              {l.source}
            </div>

            <div style={colStyle}>
              <select
                value={l.status}
                onChange={(e) => updateStatus(l._id, e.target.value)}
                style={statusSelect}
              >
                <option value="New">🟡 New</option>
                <option value="Contacted">🔵 Contacted</option>
                <option value="Closed">🟢 Closed</option>
              </select>
            </div>

            {/* Actions */}
            <div style={actionBtnCol}>
              <button
                style={viewBtnStyle}
                onClick={() => setSelectedLead(l)}
              >
                View
              </button>

              <button
                style={deleteBtnStyle}
                onClick={() => remove(l._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW POPUP */}
      {selectedLead && (
        <div style={modalOverlay} onClick={() => setSelectedLead(null)}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: "15px" }}>Lead Details</h2>

            <p><strong>Name:</strong> {selectedLead.name}</p>
            <p><strong>Date:</strong> {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : "—"}</p>
            <p><strong>Phone:</strong> {selectedLead.phone}</p>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Message:</strong> {selectedLead.message}</p>
            <p><strong>Source:</strong> {selectedLead.source}</p>
            <p><strong>Status:</strong> {selectedLead.status}</p>

            <button style={closeBtn} onClick={() => setSelectedLead(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- PREMIUM STYLES ---------------- */

const titleStyle = {
  fontSize: "32px",
  fontWeight: 700,
  color: "#2E2E2E",
  marginBottom: "25px",
};

const wrapperStyle = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "5px 0 20px 0",
  boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
};

/* UPDATED GRID — MORE SPACING */
const gridLayout = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1.1fr 1.2fr 1.6fr 1.3fr 1fr 1.1fr",
  alignItems: "center",
  padding: "16px 30px",
  columnGap: "22px",
};

const headerRowStyle = {
  ...gridLayout,
  fontWeight: 700,
  fontSize: "14px",
  color: "#555",
  paddingTop: "20px",
  paddingBottom: "16px",
  borderBottom: "1px solid #eee",
};

const rowStyle = {
  ...gridLayout,
  background: "#fff",
  borderRadius: "14px",
  margin: "14px 16px",
  paddingTop: "20px",
  paddingBottom: "20px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
};

const colStyle = {
  fontSize: "15px",
  color: "#333",
};

const truncateCol = {
  fontSize: "15px",
  color: "#444",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
};

const statusSelect = {
  padding: "8px 12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const actionBtnCol = {
  display: "flex",
  gap: "10px",
};

/* Buttons */
const viewBtnStyle = {
  padding: "8px 14px",
  background: "#4C7BF3",
  borderRadius: "10px",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteBtnStyle = {
  padding: "8px 14px",
  background: "#ff5555",
  borderRadius: "10px",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};

/* Modal */
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalBox = {
  width: "420px",
  padding: "25px",
  background: "#fff",
  borderRadius: "14px",
};

const closeBtn = {
  marginTop: "18px",
  padding: "10px 16px",
  background: "#444",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
};



