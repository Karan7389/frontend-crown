import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiLayers,
  FiImage,
  FiCalendar,
  FiStar,
  FiRefreshCw,
  FiClock,
} from "react-icons/fi";

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // ---------- UPDATED STYLES ----------
  const styles = {
    container: {
      background: "#faf6ed",
      color: "#3d3d3d",
      minHeight: "100vh",
      width: "100%",
    },

    /* FIXED SIDEBAR */
    sidebar: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      width: sidebarOpen ? 260 : 70,
      background: "#f4f1eb",
      padding: 20,
      borderRight: "1px solid #ddd2c4",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s",
      overflowY: "auto",
      zIndex: 100,
    },

    sidebarHeader: {
      display: "flex",
      justifyContent: sidebarOpen ? "space-between" : "center",
      alignItems: "center",
    },

    logo: {
      fontWeight: 700,
      fontSize: 20,
      display: sidebarOpen ? "block" : "none",
    },

    toggleBtn: {
      background: "transparent",
      border: "none",
      fontSize: 22,
      cursor: "pointer",
      color: "#3d3d3d",
      marginLeft: sidebarOpen ? 0 : -10,
    },

    nav: {
      marginTop: 30,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },

    navItem: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 10px",
      cursor: "pointer",
      borderRadius: 8,
      background: "transparent",
      fontSize: 16,
      fontWeight: 500,
      transition: "0.2s ease",
    },

    navItemHover: {
      background: "rgba(179,177,154,0.2)",
    },

    navLabel: {
      display: sidebarOpen ? "inline" : "none",
    },

    logout: {
      marginTop: "auto",
      padding: "12px 10px",
      borderRadius: 8,
      border: "none",
      background: "transparent",
      display: "flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      color: "#a30303",
      fontWeight: 600,
    },

    /* MAIN SECTION SHIFTED RIGHT */
    main: {
      marginLeft: sidebarOpen ? 260 : 70,
      transition: "all 0.3s ease",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },

    topbar: {
      background: "white",
      padding: 18,
      borderBottom: "1px solid #e3dfd7",
      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    },

    topbarTitle: {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
    },

    content: {
      padding: 24,
    },
  };

  return (
    <div style={styles.container}>
      
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.logo}>Crown Admin</h2>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.toggleBtn}
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav}>
          <button
            style={styles.navItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = styles.navItemHover.background)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => navigate("/dashboard")}
          >
            <FiHome />
            <span style={styles.navLabel}>Dashboard</span>
          </button>

          <button
            style={styles.navItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = styles.navItemHover.background)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => navigate("/dashboard/treatments")}
          >
            <FiLayers />
            <span style={styles.navLabel}>Treatments</span>
          </button>

          <button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/gallery")}
>
  <FiImage />
  <span style={styles.navLabel}>Gallery</span>
</button>

<button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/appointments")}
>
  <FiCalendar />
  <span style={styles.navLabel}>Appointments</span>
</button>

<button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/subscribers")}
>
  <FiUsers />
  <span style={styles.navLabel}>Subscribers</span>
</button>

{/* ── NEW SECTIONS ── */}
<div style={{ height: 1, background: "#ddd2c4", margin: "8px 0" }} />

<button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/testimonials")}
>
  <FiStar />
  <span style={styles.navLabel}>Testimonials</span>
</button>

<button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/before-after")}
>
  <FiRefreshCw />
  <span style={styles.navLabel}>Before & After</span>
</button>

<button
  style={styles.navItem}
  onMouseEnter={(e) =>
    (e.currentTarget.style.background = styles.navItemHover.background)
  }
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
  onClick={() => navigate("/dashboard/doctor-schedule")}
>
  <FiClock />
  <span style={styles.navLabel}>Doctor Schedule</span>
</button>


          <button
            style={styles.navItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = styles.navItemHover.background)
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => navigate("/change-password")}
          >
            <FiSettings />
            <span style={styles.navLabel}>Settings</span>
          </button>
        </nav>

        {/* LOGOUT */}
        <button
          style={styles.logout}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,0,0,0.15)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={handleLogout}
        >
          <FiLogOut />
          <span style={styles.navLabel}>Logout</span>
        </button>
      </aside>

      {/* MAIN PANEL */}
      <main style={styles.main}>
        <div style={styles.topbar}>
          <h3 style={styles.topbarTitle}>Welcome, {user?.email}</h3>
        </div>

        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

