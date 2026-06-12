import React, { useState } from "react";

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const s = {
  page: { padding: "28px", background: "#faf6ed", minHeight: "100vh" },
  heading: { fontSize: 28, fontWeight: 700, color: "#3d3d3d", marginBottom: 6 },
  sub: { fontSize: 15, color: "#777", marginBottom: 28 },
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.07)", overflow: "hidden" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #f0ebe2", flexWrap: "wrap", gap: 12 },
  addBtn: { background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, padding: 24 },
  docCard: { background: "#faf7f2", borderRadius: 16, border: "1px solid #ede7dc", padding: 20, display: "flex", flexDirection: "column", gap: 14 },
  docTop: { display: "flex", gap: 14, alignItems: "center" },
  docImg: { width: 62, height: 62, borderRadius: 12, overflow: "hidden", border: "2px solid rgba(201,169,110,0.2)", background: "#e5dccb", flexShrink: 0 },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { display: "inline-block", background: "rgba(201,169,110,0.12)", color: "#c9a96e", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em", border: "1px solid rgba(201,169,110,0.2)", marginBottom: 4 },
  name: { fontSize: 16, fontWeight: 700, color: "#3d3d3d", margin: "3px 0 2px" },
  spec: { fontSize: 12, color: "#888", lineHeight: 1.4 },
  daysRow: { display: "flex", gap: 5, flexWrap: "wrap" },
  dayChip: { fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 7, background: "rgba(0,0,0,0.04)", color: "#bbb", border: "1px solid rgba(0,0,0,0.06)" },
  dayChipOn: { fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 7, background: "rgba(201,169,110,0.15)", color: "#c9a96e", border: "1px solid rgba(201,169,110,0.3)" },
  timing: { fontSize: 13, fontWeight: 600, color: "#444" },
  actions: { display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #ede7dc" },
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
  formActions: { display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 },
  cancelBtn: { padding: "10px 20px", borderRadius: 10, border: "1.5px solid #ddd", background: "transparent", color: "#666", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  saveBtn: { padding: "10px 22px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#c9a96e,#b8956a)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
  toast: { position: "fixed", top: 20, right: 20, zIndex: 99999, padding: "13px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, fontFamily: "inherit", boxShadow: "0 8px 28px rgba(0,0,0,0.15)" },
};

const defaultDoctors = [
  { _id: "1", name: "Dr. Anand Chaudhary", spec: "Implant & Smile Design Specialist", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], timing: "10:00 AM – 2:00 PM", img: "/Images/Maledocter.webp", tag: "Founder", visible: true },
  { _id: "2", name: "Dr. Swati Chaudhary", spec: "Aesthetic Physician & Dental Surgeon", days: ["Mon","Tue","Thu","Fri","Sat"], timing: "3:00 PM – 8:00 PM", img: "/Images/Femaledocter.webp", tag: "Cosmetology", visible: true },
  { _id: "3", name: "Dr. Rahul Seth", spec: "Oral & Maxillofacial Surgeon", days: ["Tue","Wed","Fri","Sat"], timing: "11:00 AM – 5:00 PM", img: "/Images/Dr-Rahul-Seth.jpg", tag: "Surgery", visible: true },
  { _id: "4", name: "Dr. Prashashta Mishra", spec: "Orthodontist & Smile Specialist", days: ["Mon","Wed","Thu","Sat"], timing: "10:00 AM – 4:00 PM", img: "/Images/Dr-Prashashta-Mishra.jpg", tag: "Orthodontics", visible: true },
];

export default function AdminDoctorSchedule() {
  const [list, setList] = useState(defaultDoctors);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", spec: "", days: [], timing: "", img: "", tag: "", visible: true });
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000); };

  const toggleDay = (day) => setForm(f => ({
    ...f, days: f.days.includes(day) ? f.days.filter(d => d !== day) : [...f.days, day]
  }));

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", spec: "", days: [], timing: "", img: "", tag: "", visible: true });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({ name: item.name, spec: item.spec, days: [...item.days], timing: item.timing, img: item.img, tag: item.tag, visible: item.visible });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.spec.trim() || form.days.length === 0 || !form.timing.trim()) {
      showToast("error", "Name, specialization, days and timing are required.");
      return;
    }
    if (editing) {
      setList(prev => prev.map(i => i._id === editing ? { ...i, ...form } : i));
      showToast("success", "Doctor schedule updated!");
    } else {
      setList(prev => [...prev, { ...form, _id: Date.now().toString() }]);
      showToast("success", "Doctor added!");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    setList(prev => prev.filter(i => i._id !== deleteId));
    setDeleteId(null);
    showToast("success", "Doctor removed.");
  };

  const toggleVisible = (id) => setList(prev => prev.map(i => i._id === id ? { ...i, visible: !i.visible } : i));

  return (
    <div style={s.page}>
      {toast && <div style={{ ...s.toast, background: toast.type === "success" ? "#38a169" : "#e53e3e", color: "#fff" }}>{toast.type === "success" ? "✓" : "✕"} {toast.msg}</div>}

      <h1 style={s.heading}>Doctor Schedule</h1>
      <p style={s.sub}>{list.filter(i => i.visible).length} of {list.length} doctors shown on website</p>

      <div style={s.card}>
        <div style={s.toolbar}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>All Doctors</span>
          <button style={s.addBtn} onClick={openAdd}>+ Add Doctor</button>
        </div>

        <div style={s.grid}>
          {list.map(item => (
            <div key={item._id} style={{ ...s.docCard, opacity: item.visible ? 1 : 0.55 }}>
              <div style={s.docTop}>
                <div style={s.docImg}>
                  <img src={item.img} alt={item.name} style={s.img} onError={e => { e.target.src = "https://placehold.co/62x62?text=Dr"; }} />
                </div>
                <div>
                  <span style={s.tag}>{item.tag}</span>
                  <p style={s.name}>{item.name}</p>
                  <p style={s.spec}>{item.spec}</p>
                </div>
              </div>

              <div style={s.daysRow}>
                {ALL_DAYS.map(day => (
                  <span key={day} style={item.days.includes(day) ? s.dayChipOn : s.dayChip}>{day}</span>
                ))}
              </div>

              <p style={s.timing}>🕐 {item.timing}</p>

              <div style={s.actions}>
                <button style={item.visible ? s.toggleOn : s.toggleOff} onClick={() => toggleVisible(item._id)}>
                  {item.visible ? "Visible" : "Hidden"}
                </button>
                <button style={s.editBtn} onClick={() => openEdit(item)}>Edit</button>
                <button style={s.delBtn} onClick={() => setDeleteId(item._id)}>Delete</button>
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
              <span style={s.mTitle}>{editing ? "Edit Doctor" : "Add Doctor"}</span>
              <button style={s.mClose} onClick={() => setModalOpen(false)}>✕</button>
            </div>
            <div style={s.mBody}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={s.fLabel}>Doctor Name *</label>
                  <input style={s.fInput} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Dr. Rahul Seth" />
                </div>
                <div>
                  <label style={s.fLabel}>Specialization *</label>
                  <input style={s.fInput} value={form.spec} onChange={e => setForm(f => ({ ...f, spec: e.target.value }))} placeholder="e.g. Oral & Maxillofacial Surgeon" />
                </div>
                <div>
                  <label style={s.fLabel}>Department Tag</label>
                  <input style={s.fInput} value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} placeholder="e.g. Surgery" />
                </div>
                <div>
                  <label style={s.fLabel}>Photo Path / URL</label>
                  <input style={s.fInput} value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="/Images/doctor.jpg" />
                </div>
                <div>
                  <label style={s.fLabel}>Available Days * (click to toggle)</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {ALL_DAYS.map(day => (
                      <button key={day} type="button"
                        style={{ padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${form.days.includes(day) ? "rgba(201,169,110,0.4)" : "#e8e0d5"}`, background: form.days.includes(day) ? "rgba(201,169,110,0.15)" : "#faf7f2", color: form.days.includes(day) ? "#c9a96e" : "#888", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                        onClick={() => toggleDay(day)}
                      >{day}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={s.fLabel}>Consultation Timing *</label>
                  <input style={s.fInput} value={form.timing} onChange={e => setForm(f => ({ ...f, timing: e.target.value }))} placeholder="e.g. 10:00 AM – 4:00 PM" />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#444", cursor: "pointer" }}>
                  <input type="checkbox" checked={form.visible} onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))} />
                  Show on website
                </label>
                <div style={s.formActions}>
                  <button style={s.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
                  <button style={s.saveBtn} onClick={save}>{editing ? "Update" : "Add"} Doctor</button>
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
              <p style={{ color: "#555", marginBottom: 24 }}>Remove this doctor from the schedule section?</p>
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
