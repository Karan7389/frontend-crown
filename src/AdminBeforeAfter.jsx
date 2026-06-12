import React, { useState } from "react";

const CATEGORIES = ["whitening", "orthodontic", "implant"];

const s = {
  page: { padding: "28px", background: "#faf6ed", minHeight: "100vh" },
  heading: { fontSize: 28, fontWeight: 700, color: "#3d3d3d", marginBottom: 6 },
  sub: { fontSize: 15, color: "#777", marginBottom: 28 },
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.07)", overflow: "hidden" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f0ebe2", flexWrap: "wrap", gap: 12 },
  addBtn: { background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, padding: 24 },
  caseCard: { background: "#faf7f2", borderRadius: 14, border: "1px solid #ede7dc", overflow: "hidden", transition: "box-shadow 0.3s" },
  imgRow: { display: "grid", gridTemplateColumns: "1fr 1fr", height: 140 },
  imgWrap: { position: "relative", overflow: "hidden" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  badge: { position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" },
  divider: { width: 4, background: "#fff", flexShrink: 0 },
  footer: { padding: "14px 16px" },
  catTag: { display: "inline-block", background: "rgba(201,169,110,0.12)", color: "#c9a96e", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, textTransform: "capitalize", border: "1px solid rgba(201,169,110,0.2)", marginBottom: 6 },
  label: { fontSize: 14, fontWeight: 700, color: "#3d3d3d", display: "block", marginBottom: 4 },
  desc: { fontSize: 12.5, color: "#777", lineHeight: 1.4 },
  actions: { display: "flex", gap: 8, alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0ebe2" },
  toggleOn: { padding: "4px 12px", borderRadius: 20, border: "none", background: "rgba(56,161,105,0.1)", color: "#38a169", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  toggleOff: { padding: "4px 12px", borderRadius: 20, border: "none", background: "rgba(160,160,160,0.1)", color: "#999", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  editBtn: { padding: "6px 14px", borderRadius: 8, border: "1.5px solid #4285f4", background: "rgba(66,133,244,0.06)", color: "#4285f4", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  delBtn: { padding: "6px 14px", borderRadius: 8, border: "1.5px solid #e53e3e", background: "rgba(229,62,62,0.06)", color: "#e53e3e", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20, backdropFilter: "blur(3px)" },
  modal: { background: "#fff", borderRadius: 18, width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" },
  mHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #f0ebe2" },
  mTitle: { fontSize: 18, fontWeight: 700, color: "#3d3d3d" },
  mClose: { width: 32, height: 32, border: "none", borderRadius: 8, background: "#f5f0ea", cursor: "pointer", fontSize: 16 },
  mBody: { padding: 24, overflowY: "auto" },
  fLabel: { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6 },
  fInput: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e8e0d5", fontSize: 14, fontFamily: "inherit", color: "#333", background: "#faf7f2", outline: "none", boxSizing: "border-box" },
  fSelect: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e8e0d5", fontSize: 14, fontFamily: "inherit", color: "#333", background: "#faf7f2", outline: "none", appearance: "none" },
  formActions: { display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 },
  cancelBtn: { padding: "10px 20px", borderRadius: 10, border: "1.5px solid #ddd", background: "transparent", color: "#666", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  saveBtn: { padding: "10px 22px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  toast: { position: "fixed", top: 20, right: 20, zIndex: 99999, padding: "13px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, fontFamily: "inherit" },
  emptyImg: { width: "100%", height: "100%", background: "#e8e2d8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#aaa" },
};

const defaultCases = [
  { _id: "1", category: "whitening", label: "Teeth Whitening", before: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09e?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1601285493702-a81c3f36f79a?w=400&h=300&fit=crop&q=80", desc: "3 shades brighter in one session", visible: true },
  { _id: "2", category: "orthodontic", label: "Smile Correction", before: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop&q=80", desc: "Full smile makeover in 6 months", visible: true },
  { _id: "3", category: "implant", label: "Implant Restoration", before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80", desc: "Natural-looking permanent implants", visible: true },
];

export default function AdminBeforeAfter() {
  const [list, setList] = useState(defaultCases);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ category: "whitening", label: "", before: "", after: "", desc: "", visible: true });
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => {
    setEditing(null);
    setForm({ category: "whitening", label: "", before: "", after: "", desc: "", visible: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ category: item.category, label: item.label, before: item.before, after: item.after, desc: item.desc, visible: item.visible });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.label.trim() || !form.before.trim() || !form.after.trim()) {
      showToast("error", "Label, Before URL and After URL are required.");
      return;
    }
    if (editing) {
      setList(prev => prev.map(i => i._id === editing ? { ...i, ...form } : i));
      showToast("success", "Case updated!");
    } else {
      setList(prev => [...prev, { ...form, _id: Date.now().toString() }]);
      showToast("success", "Case added!");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setList(prev => prev.filter(i => i._id !== deleteId));
    setDeleteId(null);
    showToast("success", "Case deleted.");
  };

  const toggleVisible = (id) => setList(prev => prev.map(i => i._id === id ? { ...i, visible: !i.visible } : i));

  return (
    <div style={s.page}>
      {toast && <div style={{ ...s.toast, background: toast.type === "success" ? "#38a169" : "#e53e3e", color: "#fff", boxShadow: "0 8px 28px rgba(0,0,0,0.15)" }}>{toast.type === "success" ? "✓" : "✕"} {toast.msg}</div>}

      <h1 style={s.heading}>Before & After Gallery</h1>
      <p style={s.sub}>{list.filter(i => i.visible).length} of {list.length} cases shown on website</p>

      <div style={s.card}>
        <div style={s.toolbar}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>All Cases</span>
          <button style={s.addBtn} onClick={openAdd}>+ Add Case</button>
        </div>

        <div style={s.grid}>
          {list.map(item => (
            <div key={item._id} style={{ ...s.caseCard, opacity: item.visible ? 1 : 0.55 }}>
              <div style={s.imgRow}>
                <div style={s.imgWrap}>
                  {item.before
                    ? <img src={item.before} alt="Before" style={s.img} onError={e => { e.target.style.display = "none"; }} />
                    : <div style={s.emptyImg}>No image</div>}
                  <span style={{ ...s.badge, background: "rgba(0,0,0,0.65)", color: "#fff" }}>Before</span>
                </div>
                <div style={{ ...s.imgWrap, borderLeft: "3px solid #fff" }}>
                  {item.after
                    ? <img src={item.after} alt="After" style={s.img} onError={e => { e.target.style.display = "none"; }} />
                    : <div style={s.emptyImg}>No image</div>}
                  <span style={{ ...s.badge, background: "rgba(201,169,110,0.9)", color: "#fff" }}>After</span>
                </div>
              </div>
              <div style={s.footer}>
                <span style={s.catTag}>{item.category}</span>
                <span style={s.label}>{item.label}</span>
                <p style={s.desc}>{item.desc}</p>
                <div style={s.actions}>
                  <button style={item.visible ? s.toggleOn : s.toggleOff} onClick={() => toggleVisible(item._id)}>
                    {item.visible ? "Visible" : "Hidden"}
                  </button>
                  <button style={s.editBtn} onClick={() => openEdit(item)}>Edit</button>
                  <button style={s.delBtn} onClick={() => setDeleteId(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div style={s.overlay} onClick={() => setModalOpen(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.mHead}>
              <span style={s.mTitle}>{editing ? "Edit Case" : "Add Before & After Case"}</span>
              <button style={s.mClose} onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div style={s.mBody}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={s.fLabel}>Category *</label>
                  <select style={s.fSelect} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.fLabel}>Label *</label>
                  <input style={s.fInput} value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. Teeth Whitening" />
                </div>
                <div>
                  <label style={s.fLabel}>Before Image URL *</label>
                  <input style={s.fInput} value={form.before} onChange={e => setForm(f => ({ ...f, before: e.target.value }))} placeholder="https://..." />
                  {form.before && <img src={form.before} alt="" style={{ marginTop: 8, width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} onError={e => e.target.style.display = "none"} />}
                </div>
                <div>
                  <label style={s.fLabel}>After Image URL *</label>
                  <input style={s.fInput} value={form.after} onChange={e => setForm(f => ({ ...f, after: e.target.value }))} placeholder="https://..." />
                  {form.after && <img src={form.after} alt="" style={{ marginTop: 8, width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} onError={e => e.target.style.display = "none"} />}
                </div>
                <div>
                  <label style={s.fLabel}>Description</label>
                  <input style={s.fInput} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="e.g. 3 shades brighter in one session" />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#444", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} />
                  Show on website
                </label>
                <div style={s.formActions}>
                  <button style={s.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
                  <button style={s.saveBtn} onClick={save}>{editing ? "Update" : "Add"} Case</button>
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
              <p style={{ color: "#555", marginBottom: 24 }}>Delete this before/after case? This cannot be undone.</p>
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
