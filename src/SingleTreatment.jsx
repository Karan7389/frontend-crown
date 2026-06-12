import React, { useEffect, useState } from "react";
import { Stethoscope, Sparkles, RefreshCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import API from "./api";
import staticProcedures from "./staticProcedures"; 
import { useAppointment } from "./AppointmentContext";
import LeadForm from "./LeadForm";

export default function SingleTreatment() {
  const { slug } = useParams();
  const { openModal } = useAppointment();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openLead, setOpenLead] = useState(false);

  // Load static procedure data based on slug
  const staticData = staticProcedures[slug] || staticProcedures._default;

  useEffect(() => {
    setLoading(true);
    setError("");
    API
      .get(`/treatments/${slug}`)
      .then((res) => setTreatment(res.data))
      .catch((err) => {
        console.error("Fetch treatment error:", err);
        const status = err?.response?.status;
        if (status === 404) {
          setError("No treatment found for this slug.");
        } else {
          setError(err?.response?.data?.error || err.message || "Failed to load treatment");
        }
        setTreatment(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Dynamic Meta Tags
  useEffect(() => {
    if (!treatment) return;

    document.title = treatment.metaTitle || treatment.title;

    if (treatment.metaDescription) {
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement("meta");
        desc.name = "description";
        document.head.appendChild(desc);
      }
      desc.content = treatment.metaDescription;
    }
  }, [treatment]);

  if (loading) return <div style={{ padding: 40 }}>Loading treatment...</div>;
  if (error) {
    // fallback: show static info if available
    return (
      <div style={{ padding: 60 }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>{staticData?.title || slug}</h1>
        <div style={{
          background: "#ffecec",
          border: "1px solid #f5c2c7",
          color: "#a94442",
          padding: 16,
          borderRadius: 10,
          maxWidth: 600,
          marginBottom: 30,
        }}>
          {error}
        </div>
        {staticData?.seoFallback && (
          <p style={{ maxWidth: 800, lineHeight: 1.6 }}>{staticData.seoFallback}</p>
        )}
        <p style={{ marginTop: 20 }}>
          <a href="/treatments" className="btn-secondary">Back to Treatments</a>
        </p>
      </div>
    );
  }

  // Small helper: fade-in delay for lists
  const fadeDelay = (i) => ({ animationDelay: `${i * 80}ms` });

  return (
    <div className="container t-treatment-container">
      {/* Inline CSS for premium look + animations */}
      <style>{`
        :root{
          --primary:#8b5e3c;
          --muted:#f7f2ea;
          --card:#ffffff;
          --accent:#cbb090;
          --shadow: 0 12px 40px rgba(11,8,5,0.08);
          --radius:20px;
          --text:#222;
          --subtext:#6b6b6b;
        }

        .t-hero { padding: 0; }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--text);
          margin: 8px 0 20px 0; /* top + bottom space */
          line-height: 1.1;
          transform: translateY(0);
          animation: liftIn .6s ease both;
        }

        @keyframes liftIn {
          from { transform: translateY(6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .hero-image {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow);
          border: 1px solid rgba(0,0,0,0.03);
          transform-origin: center;
          animation: imageFloat 8s ease-in-out infinite;
        }

        .hero-image img { width:100%; height:auto; max-height:420px; display:block; object-fit:cover }

        @keyframes imageFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.005); }
          100% { transform: translateY(0px) scale(1); }
        }

        .hero-cta-group .btn-primary {
          background: linear-gradient(180deg, var(--primary), #5a554c);
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(139,94,60,0.18);
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .hero-cta-group .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(132, 111, 94, 0.22); }

        .hero-cta-group .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid rgba(0,0,0,0.06);
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 600;
        }

        .section-card {
          margin: 22px 8px;
          padding: 22px;
          border-radius: var(--radius);
          background: var(--card);
          box-shadow: var(--shadow);
          border: 1px solid rgba(0,0,0,0.03);
          animation: cardAppear .5s ease both;
        }

        @keyframes cardAppear {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .section-title {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: var(--text);
        }

        .muted {
          color: var(--subtext);
        }

        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 6px }

        .benefit-pill {
          background: linear-gradient(180deg, rgba(235,230,220,0.6), rgba(255,255,255,0.6));
          border-radius: 12px;
          padding: 12px 14px;
          display:flex;
          gap:10px;
          align-items:center;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.03);
          font-weight:600;
        }

        .benefit-icon {
          width:34px;
          height:34px;
          border-radius:8px;
          display:inline-grid;
          place-items:center;
          background: linear-gradient(180deg,#ffeaa7,#ffd86b);
          color:#5a3f1f;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

       /* =======================
   PROCEDURE ICON STEPS
======================= */

.procedure-list {
  list-style: none;
  padding: 0;
  margin-top: 18px;
}

.procedure-step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 22px;

  opacity: 0;
  transform: translateY(10px);
  animation: stepReveal 0.55s ease forwards;
}

@keyframes stepReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Icon bubble */
.step-icon {
  min-width: 38px;
  height: 38px;
  border-radius: 50%;

  display: grid;
  place-items: center;

  background: linear-gradient(180deg, #fff1cc, #f5c86a);
  color: #5a3f1f;

  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

/* Text */
.step-content strong {
  color: var(--primary);
  font-size: 16px;
  display: block;
}

.step-content p {
  margin: 6px 0 0;
  color: var(--subtext);
  line-height: 1.6;
  font-size: 15px;
}


        .pricing-row { display:flex; gap:12px; align-items:center; flex-wrap:wrap }

        .price-bubble { background: linear-gradient(180deg,#fff,#fbf7ef); padding:10px 14px; border-radius: 10px; font-weight:700; box-shadow: 0 6px 16px rgba(0,0,0,0.05); border:1px solid rgba(0,0,0,0.03) }

        .gallery-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:12px }

        .gallery-item { border-radius:12px; overflow:hidden; height:150px; object-fit:cover; box-shadow: 0 8px 22px rgba(0,0,0,0.06); transition: transform .28s ease }
        .gallery-item:hover { transform: translateY(-6px) scale(1.02); }

        details summary { list-style:none; cursor:pointer; font-weight:700; padding:10px 0; display:flex; align-items:center; justify-content:space-between }
        details[open] summary { color: var(--primary); }

        /* Animated +/- icon for FAQ */
        .faq-toggle {
          position: relative;
          width: 18px;
          height: 18px;
          margin-left: 12px;
          flex-shrink: 0;
        }
        .faq-toggle::before,
        .faq-toggle::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transform-origin: center;
          transition: transform .25s ease;
        }
        .faq-toggle::before { transform: translate(-50%, -50%) rotate(0deg); }
        .faq-toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
        details[open] .faq-toggle::after { transform: translate(-50%, -50%) rotate(0deg); }

        /* subtle reveal for items */
        .reveal-item {
          opacity: 0;
          transform: translateY(6px);
          animation: revealUp .45s ease forwards;
        }
        @keyframes revealUp {
          to { opacity:1; transform: translateY(0); }
        }

        /* Responsive tweaks */
        .t-treatment-container { padding-top: 64px; padding-bottom: 64px }
        .hero-cta-group { margin-top: 12px; display:flex; gap:10px; flex-wrap:wrap }
        .hero-cta-group .btn-primary, .hero-cta-group .btn-secondary { display:inline-flex; align-items:center; height:44px }
        .cta-row { margin-top:24px; display:flex; gap:10px; flex-wrap:wrap; align-items:center }
        .cta-row .btn-primary, .cta-row .btn-secondary { display:inline-flex; align-items:center; height:44px }
        @media (max-width: 880px) {
          /* Make hero image full-view on mobile */
          .hero-image-card { margin: 0; padding: 0; border-radius: 0; background: transparent }
          .hero-image { border-radius: 0; box-shadow: none; border: none }
          .hero-image img { height: 56vh; max-height: none; object-fit: cover }
          .hero-title { font-size: 30px; margin: 6px 0 10px 0; line-height: 1.2 }
          .section-card { margin: 16px 4%; padding:14px; }
            /* Prevent title overlapping with fixed/sticky navbar */
            .t-hero { padding-top: 64px; }
          .t-treatment-container { padding-top: 24px; padding-bottom: 28px }
          .hero-cta-group { margin-top:10px; display:flex; gap:8px; flex-wrap:wrap }
          .hero-cta-group .btn-primary, .hero-cta-group .btn-secondary { width:100%; justify-content:center; height:44px }
          .cta-row { padding-left: 0; justify-content: center; gap:8px; margin-top:18px }
          .cta-row .btn-primary, .cta-row .btn-secondary { width:100%; justify-content:center; height:44px }
        }
        @media (max-width: 480px){
          .hero-image img { height: 62vh }
          .hero-title{ font-size: 26px; margin: 6px 0 12px 0 }
          .gallery-item{ height: 110px }
            .t-hero { padding-top: 72px; }
        }
        `}</style>

      {/* ---------------------- HERO ---------------------- */}
      <section className="t-hero">
        <h1 className="hero-title">{treatment.title}</h1>

        {treatment.heroImage && (
          <section className="section-card hero-image-card" style={{ marginTop: 18, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
            <div className="hero-image">
              <img
                src={treatment.heroImage}
                alt="hero"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 420,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </section>
        )}

        <div className="hero-cta-group">
          <button className="btn-primary" onClick={openModal}>Book Appointment</button>
          <a href="tel:+919910478281" className="btn-secondary">Call Clinic</a>
          <a href="https://wa.me/919910478281" className="btn-secondary">WhatsApp</a>
        </div>
      </section>

      {/* ---------------------- ABOUT / SEO COPY ---------------------- */}
      <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
        <div>
          <h2 className="section-title">About This Treatment</h2>
          <p className="muted" style={{ marginTop: 8, lineHeight: 1.75 }}>{treatment.seoCopy}</p>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      {treatment.benefits?.length > 0 && (
        <section style={{ padding: 0, marginTop: 28 }}>
          <div className="section-card" style={{ background: "linear-gradient(180deg,var(--muted), #fff)" }}>
            <h2 className="section-title">Key Benefits</h2>

            <div className="benefits-grid" style={{ marginTop: 12 }}>
              {treatment.benefits.map((b, i) => (
                <div
                  key={i}
                  className="benefit-pill reveal-item"
                  style={fadeDelay(i)}
                >
                  <div className="benefit-icon" aria-hidden>⭐</div>
                  <div style={{ color: "var(--text)" }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------- PROCEDURE SECTION ---------------------- */}
      {staticData.procedureSteps?.length > 0 && (
        <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
          <h2 className="section-title">Procedure — What to Expect</h2>

          <ul className="procedure-list">
  {staticData.procedureSteps.map((step, i) => {
   const icons = [
  <Stethoscope size={18} />,
  <Sparkles size={18} />,
  <RefreshCcw size={18} />
];

    return (
      <li
        key={i}
        className="procedure-step reveal-step"
        style={{ animationDelay: (i * 140) + 'ms' }}
      >
        <div className="step-icon">
          {icons[i] || <RefreshCcw size={18} />}
        </div>

        <div className="step-content">
          <strong>{step.title}</strong>
          <p>{step.desc}</p>
        </div>
      </li>
    );
  })}
</ul>

        </section>
      )}

      {/* ---------------------- DURATION & VISITS ---------------------- */}
      <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
        <h2 className="section-title">Duration & Visits</h2>
        <p style={{ marginTop: 10 }}>
          <strong>Duration:</strong> <span className="muted" style={{ marginLeft: 8 }}>{staticData.duration}</span>
          <br />
          <strong>Visits:</strong> <span className="muted" style={{ marginLeft: 8 }}>{staticData.visits}</span>
        </p>
      </section>

      {/* ---------------------- PRICING ---------------------- */}
      {(treatment.regularPrice || treatment.memberPrice) && (
        <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
          <h2 className="section-title">Pricing</h2>

          <div className="pricing-row" style={{ marginTop: 12 }}>
            {treatment.regularPrice && (
              <div className="price-bubble">
                Regular: <span style={{ color: "var(--text)", marginLeft: 8 }}>{treatment.regularPrice}</span>
              </div>
            )}

            {treatment.memberPrice && (
              <div className="price-bubble" style={{ background: "linear-gradient(180deg,#f8fff7,#eef9f1)", color: "#0a7b70" }}>
                Membership: <span style={{ marginLeft: 8, fontWeight: 800 }}>{treatment.memberPrice}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------------- BEFORE & AFTER GALLERY ---------------------- */}
      {treatment.gallery?.length > 0 && (
        <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
          <h2 className="section-title">Before & After Gallery</h2>

          <div className="gallery-grid" style={{ marginTop: 12 }}>
            {treatment.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={'case-' + i}
                className="gallery-item"
                style={{ width: "100%" }}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------------------- FAQS ---------------------- */}
      {treatment.faqs?.length > 0 && (
        <section className="section-card" style={{ marginTop: 28, background: "linear-gradient(180deg,var(--muted), #fff)" }}>
          <h2 className="section-title">FAQs</h2>

          <div style={{ marginTop: 14 }}>
            {treatment.faqs.map((f, i) => (
              <details key={i} style={{ marginBottom: 12, cursor: "pointer" }} className="reveal-item" >
                <summary style={{ fontSize: 17, fontWeight: 700 }}>
                  {f.q}
                  <span className="faq-toggle" aria-hidden />
                </summary>
                <p style={{ marginTop: 8, color: "var(--subtext)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------- CTA ---------------------- */}
      <div className="cta-row">
        <button className="btn-primary" onClick={() => setOpenLead(true)}>Book a Consultation</button>
        <a href="tel:+919910478281" className="btn-secondary">Call Clinic</a>
        <a href="https://wa.me/919910478281" className="btn-secondary">WhatsApp</a>
      </div>

      {/* ------------------ LEAD FORM POPUP ------------------ */}
      {openLead && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg,#fff,#fbf8f3)",
              padding: 28,
              borderRadius: 16,
              width: "100%",
              maxWidth: 520,
              position: "relative",
              boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
              border: "1px solid rgba(0,0,0,0.05)"
            }}
          >
            <button
              onClick={() => setOpenLead(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 20,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              ×
            </button>

            <h2 style={{ marginBottom: 8, fontSize: 22, fontWeight: 800, color: "var(--text)" }}>Book a Consultation</h2>
            <p style={{ marginTop: 0, color: "var(--subtext)", marginBottom: 14 }}>Quick form — we'll contact you to confirm appointment details.</p>

            <LeadForm
              source={'Treatment Page - ' + slug}
              onSuccess={() => setOpenLead(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}








