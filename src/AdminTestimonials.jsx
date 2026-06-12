import React, { useEffect, useState } from "react";
import API from "./api";

const AVATAR_COLORS = [
  "#4285f4","#5f6368","#fbbc04","#e91e63","#795548",
  "#673ab7","#34a853","#ff6d00","#9c27b0","#00acc1","#d32f2f","#f57c00"
];

const s = {
  page: { padding: "28px", background: "#faf6ed", minHeight: "100vh" },
  heading: { fontSize: 28, fontWeight: 700, color: "#3d3d3d", marginBottom: 6 },
  sub: { fontSize: 15, color: "#777", marginBottom: 28 },
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.07)", overflow: "hidden" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f0ebe2", flexWrap: "wrap", gap: 12 },
  addBtn: { background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#faf7f2", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", padding: "13px 18px", textAlign: "left", borderBottom: "1px solid #f0ebe2", whiteSpace: "nowrap" },
  td: { padding: "14px 18px", borderBottom: "1px solid #f7f3ec", fontSize: 14, color: "#333", verticalAlign: "middle" },
  avatar: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 15, flexShrink: 0 },
  nameCell: { display: "flex", alignItems: "center", gap: 10 },
  truncate: { maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#666", fontSize: 13 },
  editBtn: { padding: "6px 14px", borderRadius: 8, border: "1.5px solid #4285f4", background: "rgba(66,133,244,0.06)", color: "#4285f4", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  delBtn: { padding: "6px 14px", borderRadius: 8, border: "1.5px solid #e53e3e", background: "rgba(229,62,62,0.06)", color: "#e53e3e", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  toggleOn: { padding: "4px 12px", borderRadius: 20, border: "none", background: "rgba(56,161,105,0.1)", color: "#38a169", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  toggleOff: { padding: "4px 12px", borderRadius: 20, border: "none", background: "rgba(160,160,160,0.1)", color: "#999", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20, backdropFilter: "blur(3px)" },
  modal: { background: "#fff", borderRadius: 18, width: "100%", maxWidth: 500, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" },
  mHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #f0ebe2" },
  mTitle: { fontSize: 18, fontWeight: 700, color: "#3d3d3d" },
  mClose: { width: 32, height: 32, border: "none", borderRadius: 8, background: "#f5f0ea", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" },
  mBody: { padding: 24, overflowY: "auto" },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 },
  input: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e8e0d5", fontSize: 14, fontFamily: "inherit", color: "#333", background: "#faf7f2", outline: "none", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e8e0d5", fontSize: 14, fontFamily: "inherit", color: "#333", background: "#faf7f2", outline: "none", resize: "vertical", minHeight: 100, boxSizing: "border-box" },
  formActions: { display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 },
  cancelBtn: { padding: "10px 20px", borderRadius: 10, border: "1.5px solid #ddd", background: "transparent", color: "#666", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  saveBtn: { padding: "10px 22px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  toast: { position: "fixed", top: 20, right: 20, zIndex: 99999, padding: "13px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, boxShadow: "0 8px 28px rgba(0,0,0,0.15)", fontFamily: "inherit" },
};

const defaultList = [
  { _id: "1", name: "Mohit Shrivastava", rating: 5, text: "Staff behaviour is very nice, doctor treatment also good and reasonable price. Thank you 😊", color: "#4285f4", visible: true },
  { _id: "2", name: "Laxmi Jaiswal", rating: 5, text: "The best dental clinic in prayagraj. Dr Anand Chaudhary highly skilled and profound dental surgeon.", color: "#5f6368", visible: true },
  { _id: "3", name: "Sadhna", rating: 5, text: "Good quality of dental services available here. Clinic is very hygienic. Staff are too much supportive.", color: "#e91e63", visible: true },
  { _id: "4", name: "Kumar Amit", rating: 5, text: "Your work has made a remarkable difference, and your passion is evident in everything you do.", color: "#795548", visible: true },
  { _id: "5", name: "Priya Sharma", rating: 5, text: "Best dental clinic in the city! The staff is incredibly professional and caring. My smile makeover turned out perfect.", color: "#ff6d00", visible: true },
  { _id: "6", name: "Rajesh Kumar", rating: 5, text: "Amazing experience! Dr. Anand's expertise in dental implants is outstanding. The entire procedure was painless.", color: "#34a853", visible: true },
];

export default function AdminTestimonials() {
  const [list, setList] = useState(defaultList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", rating: 5, text: "", color: "#4285f4", visible: true });
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", rating: 5, text: "", color: AVATAR_COLORS[0], visible: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ name: item.name, rating: item.rating, text: item.text, color: item.color, visible: item.visible });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.text.trim()) {
      showToast("error", "Name and review text are required.");
      return;
    }
    if (editing) {
      setList(prev => prev.map(i => i._id === editing ? { ...i, ...form } : i));
      showToast("success", "Testimonial updated!");
    } else {
      setList(prev => [...prev, { ...form, _id: Date.now().toString() }]);
      showToast("success", "Testimonial added!");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setList(prev => prev.filter(i => i._id !== deleteId));
    setDeleteId(null);
    showToast("success", "Testimonial deleted.");
  };

  const toggleVisible = (id) => {
    setList(prev => prev.map(i => i._id === id ? { ...i, visible: !i.visible } : i));
  };

  return (
    <div style={s.page}>
      {/* Toast */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "success" ? "#38a169" : "#e53e3e", color: "#fff" }}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      <h1 style={s.heading}>Testimonials</h1>
      <p style={s.sub}>{list.filter(i => i.visible).length} of {list.length} shown on website</p>

      <div style={s.card}>
        {/* Toolbar */}
        <div style={s.toolbar}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>All Reviews</span>
          <button style={s.addBtn} onClick={openAdd}>+ Add Testimonial</button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Patient</th>
                <th style={s.th}>Rating</th>
                <th style={{ ...s.th, maxWidth: 280 }}>Review</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr
                  key={item._id}
                  style={{ opacity: item.visible ? 1 : 0.5 }}
                  onMouseEnter={() => setHoveredRow(item._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{ ...s.td, background: hoveredRow === item._id ? "#fdfaf5" : "transparent" }}>
                    <div style={s.nameCell}>
                      <div style={{ ...s.avatar, background: item.color }}>{item.name[0]}</div>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ ...s.td, background: hoveredRow === item._id ? "#fdfaf5" : "transparent" }}>
                    {"⭐".repeat(item.rating)}
                  </td>
                  <td style={{ ...s.td, background: hoveredRow === item._id ? "#fdfaf5" : "transparent" }}>
                    <div style={s.truncate}>{item.text}</div>
                  </td>
                  <td style={{ ...s.td, background: hoveredRow === item._id ? "#fdfaf5" : "transparent" }}>
                    <button
                      style={item.visible ? s.toggleOn : s.toggleOff}
                      onClick={() => toggleVisible(item._id)}
                    >
                      {item.visible ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td style={{ ...s.td, background: hoveredRow === item._id ? "#fdfaf5" : "transparent" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={s.editBtn} onClick={() => openEdit(item)}>Edit</button>
                      <button style={s.delBtn} onClick={() => setDeleteId(item._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div style={s.overlay} onClick={() => setModalOpen(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.mHead}>
              <span style={s.mTitle}>{editing ? "Edit Testimonial" : "Add Testimonial"}</span>
              <button style={s.mClose} onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div style={s.mBody}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={s.label}>Patient Name *</label>
                  <input style={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Rajesh Kumar" />
                </div>

                <div>
                  <label style={s.label}>Rating</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[1,2,3,4,5].map(r => (
                      <button key={r} onClick={() => setForm(f => ({ ...f, rating: r }))}
                        style={{ fontSize: 28, background: "none", border: "none", cursor: "pointer", color: form.rating >= r ? "#fbbc04" : "#ddd", padding: 0 }}>★</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={s.label}>Review Text *</label>
                  <textarea style={s.textarea} value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="Patient review..." />
                </div>

                <div>
                  <label style={s.label}>Avatar Color</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {AVATAR_COLORS.map(c => (
                      <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                        style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: form.color === c ? "3px solid #333" : "3px solid transparent", cursor: "pointer", boxShadow: form.color === c ? "0 0 0 2px white, 0 0 0 4px #333" : "none" }} />
                    ))}
                  </div>
                </div>

                <label style={{ ...s.label, flexDirection: "row", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} />
                  Show on website
                </label>

                <div style={s.formActions}>
                  <button style={s.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
                  <button style={s.saveBtn} onClick={save}>{editing ? "Update" : "Add"} Testimonial</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div style={s.overlay} onClick={() => setDeleteId(null)}>
          <div style={{ ...s.modal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={s.mHead}>
              <span style={s.mTitle}>Confirm Delete</span>
              <button style={s.mClose} onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div style={s.mBody}>
              <p style={{ color: "#555", marginBottom: 24 }}>Are you sure you want to delete this testimonial? This cannot be undone.</p>
              <div style={s.formActions}>
                <button style={s.cancelBtn} onClick={() => setDeleteId(null)}>Cancel</button>
                <button style={{ ...s.saveBtn, background: "#e53e3e" }} onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
