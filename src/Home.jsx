import React, { useEffect, useState, useRef } from "react";
import LeadForm from "./LeadForm";
import Hero from "./Hero";
import "./Home.css";
import { Link } from "react-router-dom";
import API from "./api";

const Home = () => {
  const [leadOpen, setLeadOpen] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDoctor, setExpandedDoctor] = useState({ anand: false, swati: false });

  // Before/After Gallery state
  const [activeCategory, setActiveCategory] = useState("all");
  const beforeAfterItems = [
    { id: 1, category: "whitening", label: "Teeth Whitening", before: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09e?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1601285493702-a81c3f36f79a?w=400&h=300&fit=crop&q=80", desc: "3 shades brighter in one session" },
    { id: 2, category: "orthodontic", label: "Smile Correction", before: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&q=80", desc: "Full smile makeover in 6 months" },
    { id: 3, category: "implant", label: "Implant Restoration", before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80", desc: "Natural-looking permanent implants" },
    { id: 4, category: "whitening", label: "Deep Whitening", before: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1609840112990-4265448268d1?w=400&h=300&fit=crop&q=80", desc: "Hollywood smile transformation" },
    { id: 5, category: "orthodontic", label: "Orthodontic Result", before: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop&q=80", desc: "Invisible braces treatment" },
    { id: 6, category: "implant", label: "Full Mouth Rehab", before: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&q=80", after: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&q=80", desc: "Complete oral restoration" },
  ];

  const filtered = activeCategory === "all" ? beforeAfterItems : beforeAfterItems.filter(i => i.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const response = await API.get("/treatments");
        setTreatments(response.data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching treatments:", error);
        setTreatments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <main>
      <Hero />

      {/* =========================================================
          MEET SENIOR DOCTORS
      ========================================================== */}
      <section className="core-doctors-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2>Meet Our Senior Doctors</h2>
            <p style={{ maxWidth: "760px", margin: "0 auto" }}>
              Our clinical leadership brings decades of experience and compassionate care.
            </p>
          </div>
          <div className="core-doctors-grid">
            <article className="core-doctor-card reveal-on-scroll">
              <div className="core-doctor-photo">
                <img src="/Images/Maledocter.webp" alt="Dr Anand" loading="lazy" />
              </div>
              <div className="core-doctor-body">
                <h3>Dr. Anand Chaudhary</h3>
                <p className="doctor-qualification">
                  Founder, Crown Dental | Dental Surgeon | Implant & Smile Design Specialist
                </p>
                <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                  Renowned for precision-driven dentistry and aesthetic excellence, Dr. Anand Chaudhary leads Crown Dental with a vision of delivering advanced, patient-centric care.
                  {!expandedDoctor.anand && (
                    <>
                      {" "}
                      <button
                        className="doc-btn-read-more-inline"
                        onClick={() => setExpandedDoctor(prev => ({ ...prev, anand: !prev.anand }))}
                      >
                        Read More →
                      </button>
                    </>
                  )}
                </p>
                {expandedDoctor.anand && (
                  <>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      Holding a BDS and MBA in Hospital Administration, he combines clinical expertise with strategic leadership to create a modern, technology-driven dental practice.
                    </p>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      With specialized expertise in implantology, smile design, and laser dentistry, he focuses on minimally invasive, result-oriented treatments tailored to each patient.
                    </p>
                    <p style={{ fontWeight: "600", marginBottom: "16px", color: "#6f6048" }}>
                      Signature Expertise: Advanced Implants | Smile Makeovers | Laser Dentistry | Full Mouth Rehabilitation
                    </p>
                    <button
                      className="doc-btn-read-more-inline"
                      onClick={() => setExpandedDoctor(prev => ({ ...prev, anand: !prev.anand }))}
                    >
                      Read Less ↑
                    </button>
                  </>
                )}
                <div className="doc-btn-container">
                  <button className="doc-btn" onClick={() => setLeadOpen(true)}>Book a Consultation</button>
                </div>
              </div>
            </article>

            <article className="core-doctor-card reveal-on-scroll">
              <div className="core-doctor-photo">
                <img src="/Images/Femaledocter.webp" alt="Dr Swati" loading="lazy" />
              </div>
              <div className="core-doctor-body">
                <h3>Dr. Swati Chaudhary</h3>
                <p className="doctor-qualification">
                  Executive Director, AngelLife Cosmetology & Wellness | Aesthetic Physician & Dental Surgeon
                </p>
                <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                  Known for her refined aesthetic sense and clinical precision, Dr. Swati Chaudhary brings a sophisticated approach to modern cosmetology and wellness.
                  {!expandedDoctor.swati && (
                    <>
                      {" "}
                      <button
                        className="doc-btn-read-more-inline"
                        onClick={() => setExpandedDoctor(prev => ({ ...prev, swati: !prev.swati }))}
                      >
                        Read More →
                      </button>
                    </>
                  )}
                </p>
                {expandedDoctor.swati && (
                  <>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      Holding a BDS, MBA in Hospital Administration, and MSc in Cosmetology, she seamlessly blends medical expertise with strategic leadership.
                    </p>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      With advanced proficiency in skin rejuvenation, anti-aging therapies, laser treatments, and facial aesthetics, she delivers personalized, result-oriented solutions.
                    </p>
                    <p style={{ fontWeight: "600", marginBottom: "16px", color: "#6f6048" }}>
                      Signature Expertise: Skin Rejuvenation | Anti-Aging Treatments | Laser Aesthetics | Facial Contouring
                    </p>
                    <button
                      className="doc-btn-read-more-inline"
                      onClick={() => setExpandedDoctor(prev => ({ ...prev, swati: !prev.swati }))}
                    >
                      Read Less ↑
                    </button>
                  </>
                )}
                <div className="doc-btn-container">
                  <button className="doc-btn" onClick={() => setLeadOpen(true)}>Book a Consultation</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================== */}
      <section className="why-choose-section" id="why-us">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Why Choose Crown Dental</h2>
            <p style={{ maxWidth: "680px", margin: "0 auto" }}>
              Your health and comfort are our top priorities — backed by advanced technology and compassionate care.
            </p>
          </div>
          <div className="highlights-grid">
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="0">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=380&fit=crop&q=80" alt="Advanced Sterilization" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Advanced Sterilization</h3>
                <p>International safety protocols and strict infection control standards.</p>
              </div>
            </article>
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="80">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=380&fit=crop&q=80" alt="Expert Medical Team" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Expert Medical Team</h3>
                <p>Experienced specialists delivering reliable, precision-based treatments.</p>
              </div>
            </article>
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="160">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1609840112990-4265448268d1?w=600&h=380&fit=crop&q=80" alt="Modern Diagnostic Technology" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Modern Diagnostic Technology</h3>
                <p>Advanced imaging and precision-based diagnosis for accurate results.</p>
              </div>
            </article>
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="240">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=380&fit=crop&q=80" alt="Comfortable Treatment Experience" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Comfortable Treatment Experience</h3>
                <p>Designed to ensure patient comfort and confidence at every step.</p>
              </div>
            </article>
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="320">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=380&fit=crop&q=80" alt="Transparent Consultation" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Transparent Consultation</h3>
                <p>Clear treatment plans and honest, upfront pricing — no surprises.</p>
              </div>
            </article>
            <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="400">
              <div className="why-img-wrapper">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=380&fit=crop&q=80" alt="Comprehensive Care Under One Roof" loading="lazy" />
              </div>
              <div className="why-card-body">
                <h3>Comprehensive Care Under One Roof</h3>
                <p>Multiple healthcare specialists available in a single, convenient location.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          BEFORE & AFTER GALLERY  (NEW)
      ========================================================== */}
      <section className="before-after-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2>Real Patient Transformations</h2>
            <p style={{ maxWidth: "680px", margin: "0 auto" }}>
              See the life-changing results our patients experience — real cases, real smiles.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="ba-filter-tabs">
            {["all", "whitening", "orthodontic", "implant"].map(cat => (
              <button
                key={cat}
                className={`ba-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "All Cases" : cat === "whitening" ? "Whitening" : cat === "orthodontic" ? "Orthodontics" : "Implants"}
              </button>
            ))}
          </div>

          <div className="ba-grid">
            {filtered.map((item, idx) => (
              <article key={item.id} className="ba-card reveal-on-scroll" data-reveal-delay={idx * 80}>
                <div className="ba-images">
                  <div className="ba-side">
                    <img src={item.before} alt={`Before ${item.label}`} loading="lazy" />
                    <span className="ba-label ba-label--before">Before</span>
                  </div>
                  <div className="ba-divider">
                    <span className="ba-divider-icon">↔</span>
                  </div>
                  <div className="ba-side">
                    <img src={item.after} alt={`After ${item.label}`} loading="lazy" />
                    <span className="ba-label ba-label--after">After</span>
                  </div>
                </div>
                <div className="ba-card-footer">
                  <span className="ba-category-tag">{item.label}</span>
                  <p className="ba-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES SECTION
      ========================================================== */}
      <section className="services-section" id="services">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Our Services</h2>
            <p style={{ maxWidth: "680px", margin: "0 auto" }}>
              Comprehensive dental care tailored to your unique needs, delivered by experienced professionals using state-of-the-art technology.
            </p>
          </div>
          <div className="services-grid">
            {(() => {
              if (loading) {
                return Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="service-card" style={{ opacity: 0.5 }}>
                    <div style={{ width: "100%", height: "180px", background: "#e0e0e0", marginBottom: "12px" }}></div>
                    <div><h3>Loading...</h3><p>Please wait...</p></div>
                  </div>
                ));
              }
              if (treatments.length > 0) {
                return treatments.map((treatment) => {
                  const description = treatment.metaDescription || (treatment.seoCopy ? treatment.seoCopy.substring(0, 100) : '') || 'Explore our professional dental treatment options.';
                  return (
                    <Link key={treatment._id} to={`/treatments/${treatment.slug}`} className="service-card">
                      <img
                        src={treatment.heroImage || `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=300&fit=crop&q=80`}
                        alt={treatment.title}
                        className="service-image"
                        loading="lazy"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=300&fit=crop&q=80"; }}
                      />
                      <div>
                        <h3>{treatment.title}</h3>
                        <p>{description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
                      </div>
                    </Link>
                  );
                });
              }
              return (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p style={{ fontSize: "18px", color: "#6f6048" }}>No treatments available at the moment.</p>
                </div>
              );
            })()}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link to="/treatments" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEET OUR EXPERT DENTAL TEAM
      ========================================================== */}
      <section className="doctors-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Meet Our Medical Experts</h2>
            <p style={{ maxWidth: "760px", margin: "0 auto" }}>
              Our experienced specialists are dedicated to providing you with exceptional care and lasting results.
            </p>
          </div>
          <div className="doctors-grid">
            <article className="doctor-card reveal-on-scroll" data-reveal-delay="0">
              <div className="doctor-image-placeholder">
                <img src="/Images/Dr-Astitva-Agarwal.jpg" alt="Dr. Astitva Agarwal" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
              </div>
              <h3>Dr. Astitva Agarwal</h3>
              <p className="doctor-qualification">BDS, MDS (Orthodontics)</p>
              <p className="doctor-specialization">Oral Cancer Specialist & Maxillofacial Surgeon</p>
              <span className="doctor-experience">Full Mouth Rehab Specialist</span>
            </article>
            <article className="doctor-card reveal-on-scroll" data-reveal-delay="100">
              <div className="doctor-image-placeholder">
                <img src="/Images/Dr-Rahul-Seth.jpg" alt="Dr. Rahul Seth" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
              </div>
              <h3>Dr. Rahul Seth</h3>
              <p className="doctor-qualification">BDS, MDS (Gold Medallist)</p>
              <p className="doctor-specialization">Oral & Maxillofacial Surgeon | Certified Implantologist</p>
              <span className="doctor-experience">Advanced Trauma Specialist</span>
            </article>
            <article className="doctor-card reveal-on-scroll" data-reveal-delay="200">
              <div className="doctor-image-placeholder">
                <img src="/Images/Dr-Satyam-Singh.jpg" alt="Dr. (Col) Satyam Singh" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
              </div>
              <h3>Dr. (Col) Satyam Singh</h3>
              <p className="doctor-qualification">Senior Dental Consultant</p>
              <p className="doctor-specialization">Military Dental Specialist</p>
              <span className="doctor-experience">Veteran & Expert Clinician</span>
            </article>
            <article className="doctor-card reveal-on-scroll" data-reveal-delay="300">
              <div className="doctor-image-placeholder">
                <img src="/Images/Dr-Prashashta-Mishra.jpg" alt="Dr. Prashashta Mishra" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
              </div>
              <h3>Dr. Prashashta Mishra</h3>
              <p className="doctor-qualification">BDS, MDS (Orthodontics)</p>
              <p className="doctor-specialization">Orthodontist & Smile Specialist</p>
              <span className="doctor-experience">Certified Orthodontic Expert</span>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/doctors" className="btn-secondary">View All Doctors</a>
          </div>
        </div>
      </section>

      {/* =========================================================
          DOCTOR AVAILABILITY SECTION  (NEW)
      ========================================================== */}
      <section className="availability-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Doctor Availability</h2>
            <p style={{ maxWidth: "680px", margin: "0 auto" }}>
              Book your appointment at a time that works for you — consult with the right specialist.
            </p>
          </div>
          <div className="availability-grid">
            {[
              { name: "Dr. Anand Chaudhary", spec: "Implant & Smile Design Specialist", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], timing: "10:00 AM – 2:00 PM", img: "/Images/Maledocter.webp", tag: "Founder" },
              { name: "Dr. Swati Chaudhary", spec: "Aesthetic Physician & Dental Surgeon", days: ["Mon", "Tue", "Thu", "Fri", "Sat"], timing: "3:00 PM – 8:00 PM", img: "/Images/Femaledocter.webp", tag: "Cosmetology" },
              { name: "Dr. Rahul Seth", spec: "Oral & Maxillofacial Surgeon", days: ["Tue", "Wed", "Fri", "Sat"], timing: "11:00 AM – 5:00 PM", img: "/Images/Dr-Rahul-Seth.jpg", tag: "Surgery" },
              { name: "Dr. Prashashta Mishra", spec: "Orthodontist & Smile Specialist", days: ["Mon", "Wed", "Thu", "Sat"], timing: "10:00 AM – 4:00 PM", img: "/Images/Dr-Prashashta-Mishra.jpg", tag: "Orthodontics" },
            ].map((doc, idx) => (
              <article key={idx} className="availability-card reveal-on-scroll" data-reveal-delay={idx * 80}>
                <div className="avail-doc-header">
                  <div className="avail-doc-img">
                    <img src={doc.img} alt={doc.name} loading="lazy" />
                  </div>
                  <div>
                    <span className="avail-tag">{doc.tag}</span>
                    <h3 className="avail-name">{doc.name}</h3>
                    <p className="avail-spec">{doc.spec}</p>
                  </div>
                </div>
                <div className="avail-schedule">
                  <div className="avail-days">
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day => (
                      <span key={day} className={`avail-day ${doc.days.includes(day) ? "active" : ""}`}>{day}</span>
                    ))}
                  </div>
                  <div className="avail-timing">
                    <span className="avail-timing-icon">🕐</span>
                    {doc.timing}
                  </div>
                </div>
                <button className="avail-book-btn" onClick={() => setLeadOpen(true)}>
                  Book Consultation
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS — Scroll Carousel (enhanced)
      ========================================================== */}
      <section className="testimonials-section">
        <div className="section-header" style={{ textAlign: "center", marginBottom: "48px", padding: "0 20px" }}>
          <h2>What Our Patients Say</h2>
          <p style={{ maxWidth: "700px", margin: "0 auto" }}>
            Real experiences from people who trust us with their smiles.
          </p>
        </div>
        <div className="testimonials-scroll-container">
          <div className="testimonials-scroll-track">
            {[
              { name: "Mohit Shrivastava", color: "#4285f4", text: "Staff behaviour is very nice, doctor treatment also good and reasonable price. Thank you 😊😊😊" },
              { name: "Laxmi Jaiswal", color: "#5f6368", text: "The best dental clinic in prayagraj Dr Anand Chaudhary highly skilled and profound dental surgeon" },
              { name: "Indal Yadav", color: "#fbbc04", text: "I made treatment of my RCT in 2020 but till now there has been no problem. So I would recommend anybody facing dental problems, contact Dr. Nandan Gupta. He is not only a good doctor but also a very good human being." },
              { name: "Sadhna", color: "#e91e63", text: "Good quality of dental services available here and behaviour of Dr. Anand Chaudhary is also nice. Clinic is very hygienic. Staff are too much supportive." },
              { name: "Kumar Amit", color: "#795548", text: "Your work has made a remarkable difference, and your passion is evident in everything you do." },
              { name: "Pratap Singh", color: "#673ab7", text: "Excellent team work with minimum reaction time." },
              { name: "Rajesh Kumar", color: "#34a853", text: "Amazing experience! Dr. Anand's expertise in dental implants is outstanding. The entire procedure was painless and the results exceeded my expectations." },
              { name: "Priya Sharma", color: "#ff6d00", text: "Best dental clinic in the city! The staff is incredibly professional and caring. My smile makeover turned out perfect. Highly recommended!" },
              { name: "Amit Verma", color: "#9c27b0", text: "Crown Dental has state-of-the-art equipment and maintains excellent hygiene standards. Dr. Swati's cosmetic dentistry work is exceptional." },
              { name: "Neha Patel", color: "#00acc1", text: "My family has been coming here for years. The doctors are highly skilled and always take time to explain procedures. Truly a five-star experience!" },
              { name: "Vikram Singh", color: "#d32f2f", text: "Professional service from start to finish. The laser dentistry treatment was quick and completely painless. Very impressed with the technology they use." },
              { name: "Anjali Gupta", color: "#f57c00", text: "I was nervous about my root canal but the team made me feel so comfortable. The procedure was painless and the follow-up care was excellent." },
            ].concat([
              { name: "Mohit Shrivastava", color: "#4285f4", text: "Staff behaviour is very nice, doctor treatment also good and reasonable price. Thank you 😊😊😊" },
              { name: "Laxmi Jaiswal", color: "#5f6368", text: "The best dental clinic in prayagraj Dr Anand Chaudhary highly skilled and profound dental surgeon" },
              { name: "Sadhna", color: "#e91e63", text: "Good quality of dental services available here and behaviour of Dr. Anand Chaudhary is also nice. Clinic is very hygienic. Staff are too much supportive." },
              { name: "Rajesh Kumar", color: "#34a853", text: "Amazing experience! Dr. Anand's expertise in dental implants is outstanding. The entire procedure was painless and the results exceeded my expectations." },
            ]).map((t, i) => (
              <article key={i} className="testimonial-card">
                <div className="author">
                  <div className="author-avatar" style={{ background: t.color }}>{t.name[0]}</div>
                  <div>
                    <p className="author-name">{t.name}</p>
                    <div className="author-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="testimonial-text">{t.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MODERN FACILITY
      ========================================================== */}
      <section className="facility-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Our Modern Facility</h2>
            <p style={{ maxWidth: "700px", margin: "0 auto" }}>
              Take a virtual tour of our state-of-the-art clinic designed for your comfort and safety.
            </p>
          </div>
          <div className="facility-grid facility-grid--images">
            {[
              { img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop&q=80", label: "Reception Area", delay: 0 },
              { img: "https://images.unsplash.com/photo-1667752264069-e88e8f5b57dd?w=600&h=400&fit=crop&q=80", label: "Waiting Lounge", delay: 70 },
              { img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&q=80", label: "Treatment Room", delay: 140 },
              { img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&q=80", label: "Digital X-Ray Room", delay: 210 },
              { img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop&q=80", label: "Sterilization Area", delay: 280 },
              { img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop&q=80", label: "Consultation Room", delay: 350 },
            ].map((f, i) => (
              <a key={i} href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay={f.delay}>
                <div className="facility-img-wrapper">
                  <img src={f.img} alt={f.label} loading="lazy" />
                </div>
                <p className="facility-title">{f.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TECHNOLOGY
      ========================================================== */}
      <section className="technology-section">
        <div className="tech-header">
          <h2>Advanced Technology We Use</h2>
          <p>State-of-the-art equipment ensuring precision, safety, and comfort in every procedure.</p>
        </div>
        <div className="technology-grid">
          {[
            { img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80", title: "Digital X-Rays", desc: "90% less radiation exposure with instant high-resolution imaging for accurate diagnosis.", delay: 0 },
            { img: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=300&fit=crop&q=80", title: "Laser Dentistry", desc: "Minimally invasive procedures with faster healing and reduced discomfort.", delay: 100 },
            { img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80", title: "Intraoral Scanner", desc: "3D digital impressions eliminating messy traditional molds for precise results.", delay: 200 },
            { img: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop&q=80", title: "Autoclave Sterilization", desc: "Hospital-grade sterilization ensuring complete elimination of pathogens.", delay: 300 },
          ].map((t, i) => (
            <article key={i} className="tech-card reveal-on-scroll" data-reveal-delay={t.delay}>
              <div className="tech-image-wrapper">
                <img src={t.img} alt={t.title} className="tech-image" loading="lazy" />
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          APPOINTMENT CTA BANNER  (NEW)
      ========================================================== */}
      <section className="cta-banner-section">
        <div className="cta-banner-inner">
          <div className="cta-banner-content">
            <div className="cta-banner-icon">🦷</div>
            <h2 className="cta-banner-title">Ready for a Healthier Smile?</h2>
            <p className="cta-banner-subtitle">
              Book your consultation with our experienced specialists today.<br />
              Pain-free care, transparent pricing, and lasting results — guaranteed.
            </p>
            <div className="cta-banner-actions">
              <button className="cta-banner-btn cta-banner-btn--primary" onClick={() => setLeadOpen(true)}>
                📅 Book Appointment
              </button>
              <a href="tel:+918077961782" className="cta-banner-btn cta-banner-btn--secondary">
                📞 Call Now
              </a>
            </div>
            <p className="cta-banner-note">✓ Free Consultation &nbsp;|&nbsp; ✓ No Hidden Charges &nbsp;|&nbsp; ✓ Immediate Appointment</p>
          </div>
          <div className="cta-banner-decoration" aria-hidden="true">
            <div className="cta-deco-circle cta-deco-circle--1"></div>
            <div className="cta-deco-circle cta-deco-circle--2"></div>
            <div className="cta-deco-circle cta-deco-circle--3"></div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FLOATING QUICK ACTIONS  (NEW)
      ========================================================== */}
      <div className="floating-actions">
        <a href="tel:+918077961782" className="float-btn float-btn--call" title="Call Now" aria-label="Call Now">
          <span className="float-btn-icon">📞</span>
          <span className="float-btn-label">Call</span>
        </a>
        <a href="https://wa.me/918077961782?text=Hello%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment." target="_blank" rel="noopener noreferrer" className="float-btn float-btn--whatsapp" title="WhatsApp" aria-label="WhatsApp">
          <span className="float-btn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.124 1.528 5.854L0 24l6.336-1.497A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.019-1.375l-.36-.214-3.732.882.938-3.634-.234-.373A9.77 9.77 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          </span>
          <span className="float-btn-label">WhatsApp</span>
        </a>
        <button className="float-btn float-btn--book" title="Book Appointment" aria-label="Book Appointment" onClick={() => setLeadOpen(true)}>
          <span className="float-btn-icon">📅</span>
          <span className="float-btn-label">Book</span>
        </button>
      </div>

      {/* =========================================================
          LEAD FORM MODAL
      ========================================================== */}
      {leadOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}
        >
          <div style={{ background: "white", padding: 30, borderRadius: 14, width: "90%", maxWidth: 420, position: "relative" }}>
            <button onClick={() => setLeadOpen(false)} style={{ position: "absolute", top: 10, right: 10, fontSize: 20, background: "none", border: "none", cursor: "pointer" }}>×</button>
            <h2 style={{ marginBottom: 16 }}>Book a Consultation</h2>
            <LeadForm source="Home Page - Consultation" onSuccess={() => setLeadOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
