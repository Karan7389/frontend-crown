import React, { useEffect } from "react";
import { useAppointment } from "./AppointmentContext";
import "./Hero.css";

const Hero = () => {
  const { openModal } = useAppointment();

  useEffect(() => {
    const counters = Array.from(document.querySelectorAll(".count"));
    if (!counters.length) return;

    // store RAF ids so we can cancel when starting a new animation
    const rafMap = new Map();

    function animateTo(element, from, to, duration = 800) {
      // cancel previous
      const prev = rafMap.get(element);
      if (prev) cancelAnimationFrame(prev);

      const startTime = performance.now();
      const isDecimal = String(to).includes(".");
      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1); // 0..1
        // easeOutQuad
        const progress = 1 - (1 - t) * (1 - t);
        const current = from + (to - from) * progress;

        if (isDecimal) {
          element.innerText = current.toFixed(1);
        } else {
          element.innerText = Math.floor(current);
        }

        if (t < 1) {
          const id = requestAnimationFrame(step);
          rafMap.set(element, id);
        } else {
          // final value
          element.innerText = isDecimal ? Number(to).toFixed(1) : String(Math.floor(to));
          rafMap.delete(element);
        }
      }

      const id = requestAnimationFrame(step);
      rafMap.set(element, id);
    }

    // Start counting immediately on page load
    let hasStarted = false;
    function startCountingOnce() {
      if (hasStarted) return;
      hasStarted = true;
      counters.forEach((counter) => {
        const targetAttr = counter.getAttribute("data-count") || "0";
        const target = +targetAttr;
        const duration = 1800;
        animateTo(counter, 0, target, duration);
      });
    }

    // Start immediately after a short delay to ensure DOM is ready
    const startTimer = setTimeout(() => {
      startCountingOnce();
    }, 300);

    // Also observe for scroll (in case user scrolls away and back)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) startCountingOnce();
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(".hero-trust-badges");
    if (element) observer.observe(element);

    // Hover effect: quick count up then count down on leave
    const badgeEls = Array.from(document.querySelectorAll(".hero-trust-badges .badge"));

    badgeEls.forEach((badge) => {
      const counter = badge.querySelector(".count");
      if (!counter) return;
      const targetAttr = counter.getAttribute("data-count") || "0";
      const target = parseFloat(targetAttr) || 0;

      function handleEnter() {
        // subtle overshoot to make it feel lively
        const current = parseFloat(counter.innerText) || 0;
        const overshoot = target * 1.03; // +3%
        animateTo(counter, current, overshoot, 400);
        // settle back to exact target
        setTimeout(() => animateTo(counter, parseFloat(counter.innerText) || overshoot, target, 400), 420);
      }

      function handleLeave() {
        // do not reset to 0; gently settle to target
        const current = parseFloat(counter.innerText) || 0;
        animateTo(counter, current, target, 600);
      }

      badge.addEventListener("mouseenter", handleEnter);
      badge.addEventListener("mouseleave", handleLeave);

      // cleanup registration reference (we'll remove on unmount)
      badge._cleanupHandlers = { handleEnter, handleLeave };
    });

    // cleanup on unmount
    return () => {
      clearTimeout(startTimer);
      observer.disconnect();
      badgeEls.forEach((badge) => {
        if (badge._cleanupHandlers) {
          badge.removeEventListener("mouseenter", badge._cleanupHandlers.handleEnter);
          badge.removeEventListener("mouseleave", badge._cleanupHandlers.handleLeave);
          delete badge._cleanupHandlers;
        }
      });
      // cancel any running rafs
      rafMap.forEach((id) => cancelAnimationFrame(id));
      rafMap.clear();
    };
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: 'url("/Images/herobg.webp")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mobile-only blurred background image */}
      <div
        className="hero-mobile-bg"
        style={{ backgroundImage: 'url("/Images/mobileview.jpeg")' }}
        aria-hidden="true"
      />

      <div className="container hero-inner">

        {/* Logo */}
        <div className="hero-logo reveal-on-scroll">
          <img
            src="/Images/logo.png"
            alt="Crown Dental Logo"
            className="hero-logo-img"
          />
        </div>

        {/* Title */}
        <h1 className="hero-title reveal-on-scroll">
          Pain-Free Dental Treatment You Can Trust in Prayagraj 

        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle reveal-on-scroll">
         Pain-free, advanced dental treatments by expert specialists — delivered with modern technology and complete patient comfort.
        </p>

        {/* Buttons */}
        <div className="hero-cta-group reveal-on-scroll">
          <button className="btn-primary" onClick={openModal}>
            Book Appointment
          </button>

          <a href="tel:+15555550199" className="btn-secondary">Call Now</a>
        </div>

        {/* Trust Badges */}
        <div className="hero-trust-badges reveal-on-scroll">
          <span className="badge">
            ⭐ <span className="count" data-count="4.9">0</span>/5 Rating
          </span>

          <span className="badge">
            ✓ <span className="count" data-count="10000">0</span>+ Happy Patients
          </span>

          <span className="badge">
            ✓ <span className="count" data-count="7">0</span>+ Years Excellence
          </span>
        </div>

      </div>
    </section>
  );
};

export default Hero;

