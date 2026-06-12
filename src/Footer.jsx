import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";

const Footer = () => {

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 400) {
        // Already subscribed
        setMessage({ type: "warning", text: data.message });
      } 
      else if (res.ok) {
        setMessage({ type: "success", text: "🎉 Thank you! You are now subscribed." });
        setEmail("");
      } 
      else {
        setMessage({ type: "error", text: "Subscription failed. Please try again." });
      }

    } catch (err) {
      setMessage({ type: "error", text: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footerWrapper full-width-section">
      <div className="inner-wrap">

        <div className="columns">

          {/* Contact */}
          <div className="column">
            <h3 className="title">Contact Us</h3>
            <p>📍 Near Jagriti Chauraha, G-1/5, Kalindipuram, Prayagraj – 211016</p>
            <p>📞 +91 80779 61782</p>
            <p>
              📧 <a href="mailto:crowndentalhosp@gmail.com" className="link">crowndentalhosp@gmail.com</a>
            </p>
            <p>🕒 Open Hours: 10:00 AM – 08:00 PM (Daily)</p>
          </div>

          {/* Patient Resources */}
          <div className="column">
            <h3 className="title">Patient Resources</h3>
            <ul className="linksList">
              <li><Link to="/faqs" className="link">FAQs</Link></li>
              <li><Link to="/gallery" className="link">Gallery</Link></li>
            </ul>
          </div>

          {/* Clinic */}
          <div className="column">
            <h3 className="title">Clinic</h3>
            <ul className="linksList">
              <li><Link to="/treatments" className="link">Treatments</Link></li>
              <li><Link to="/about" className="link">About</Link></li>
              <li><Link to="/doctors" className="link">Doctors</Link></li>
              <li><Link to="/contact" className="link">Contact</Link></li>
            </ul>
          </div>

          {/* Legal + Subscribe */}
          <div className="column">
            <h3 className="title">Legal & Policies</h3>
            <ul className="linksList">
              <li><Link to="/policies/privacy" className="link">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="link">Terms of Use</Link></li>
              <li><Link to="/policies/refund-warranty" className="link">Refund & Warranty Policy</Link></li>
            </ul>

            {/* Newsletter Subscribe */}
            <div className="newsletterBox">
              <input
                type="email"
                placeholder="Enter your email"
                className="subscribeInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button 
                type="button" 
                className="subscribeBtn"
                disabled={loading}
                onClick={handleSubscribe}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {/* Message Box */}
            {message && (
              <p 
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: message.type === "success" ? "green" :
                         message.type === "warning" ? "orange" :
                         "red"
                }}
              >
                {message.text}
              </p>
            )}

            {/* Social Icons */}
            <div className="socials">
              <a href="https://www.facebook.com/CrownDental" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="https://www.instagram.com/crown_.dental/" className="social"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://youtube.com" className="social"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>

        </div>

        <div className="bottom">
          <p>© 2025 Crown Dental. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;





