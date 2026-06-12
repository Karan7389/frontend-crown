import React, { useEffect, useState } from "react";
import API from "./api";

export default function Appointments() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/appointments")
      .then((res) => setList(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete appointment?")) return;

    await API.delete(`/appointments/${id}`);
    setList(list.filter((a) => a._id !== id));
  };

  const update = async (id, status) => {
    const res = await API.put(`/appointments/${id}`, { status });
    setList(list.map((a) => (a._id === id ? res.data : a)));
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Appointments</h2>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Treatment</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}></th>
            </tr>
          </thead>

          <tbody>
            {list.map((a) => (
              <tr key={a._id} style={styles.tr}>
                <td style={styles.td}>{a.name}</td>
                <td style={styles.td}>{a.phone}</td>
                <td style={styles.td}>{a.treatment}</td>
                <td style={styles.td}>{a.date}</td>
                <td style={styles.td}>{a.time}</td>

                <td style={styles.td}>
                  <select
                    value={a.status}
                    onChange={(e) => update(a._id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="Pending">🟡Pending</option>
                    <option value="Confirmed">🔵Confirmed</option>
                    <option value="Cancelled">🔴Cancelled</option>
                  </select>
                </td>

                <td style={styles.td}>
                  <button
                    onClick={() => remove(a._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <p style={styles.emptyText}>No appointments found</p>
        )}
      </div>
    </div>
  );
}

// ------------------- UI STYLES -------------------
const styles = {
  wrapper: {
    padding: "20px",
  },

  title: {
    fontSize: "26px",
    fontWeight: 600,
    marginBottom: "15px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    border: "1px solid #eee",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#444",
  },

  tr: {
    background: "#fafafa",
    borderRadius: "12px",
  },

  td: {
    padding: "14px",
    fontSize: "14px",
    color: "#333",
    background: "white",
    borderBottom: "1px solid #eee",
  },

  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  deleteBtn: {
    padding: "6px 12px",
    background: "#ffeded",
    color: "#d9534f",
    border: "1px solid #d9534f",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.2s",
  },

  emptyText: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
  },
};

