const staticProcedures = {
  // 1. Dental Implants
  "dental-implants": {
    duration: "2–3 Hours",
    visits: "2 Visits",
    procedureSteps: [
      {
        title: "Consultation + CBCT Scan",
        desc: "3D bone mapping for accurate implant planning and implant system selection.",
      },
      {
        title: "Implant Placement",
        desc: "Painless, minimally invasive placement under local anesthesia.",
      },
      {
        title: "Healing & Integration",
        desc: "Osseointegration takes 8–12 weeks for a strong foundation.",
      },
      {
        title: "Final Crown Placement",
        desc: "Zirconia or E-max crown is fitted for natural aesthetics & bite.",
      },
    ],
  },

  // 2. Root Canal Treatment (Endodontics)
  "root-canal-treatment": {
    duration: "45–60 Minutes",
    visits: "1–2 Visits",
    procedureSteps: [
      {
        title: "Clinical Diagnosis + X-ray",
        desc: "Assessment of infected pulp and canal anatomy.",
      },
      {
        title: "Cleaning & Shaping",
        desc: "Removal of infection and shaping canals using rotary endodontics.",
      },
      {
        title: "Obturation",
        desc: "Sealing of canals with biocompatible materials.",
      },
      {
        title: "Crown Placement",
        desc: "Protective crown recommended to avoid fracture.",
      },
    ],
  },

  // 3. Orthodontics (Braces & Aligners)
  orthodontics: {
    duration: "12–18 Months",
    visits: "Monthly Visits",
    procedureSteps: [
      {
        title: "Records & Treatment Plan",
        desc: "Digital scans, X-rays, photos & bite analysis.",
      },
      {
        title: "Braces/Aligners Placement",
        desc: "Metal/ceramic braces or clear aligners placed based on case.",
      },
      {
        title: "Monthly Adjustments",
        desc: "Wire tightening or new aligner sets every 4–6 weeks.",
      },
      {
        title: "Retention Phase",
        desc: "Retainers provided to maintain alignment long-term.",
      },
    ],
  },

  // 4. Cosmetic Dentistry (Smile Makeover)
  "cosmetic-dentistry": {
    duration: "1–2 Weeks",
    visits: "2–3 Visits",
    procedureSteps: [
      {
        title: "Smile Evaluation",
        desc: "Digital smile design, shade selection, tooth proportion planning.",
      },
      {
        title: "Preparation",
        desc: "Minimal shaping for veneers or bonding if needed.",
      },
      {
        title: "Fabrication",
        desc: "High-quality veneers or cosmetic restorations crafted in lab.",
      },
      {
        title: "Final Smile Placement",
        desc: "Bonding and polishing for a natural, aesthetic finish.",
      },
    ],
  },

  // 5. Oral Surgery (Wisdom Tooth Removal)
  "oral-surgery": {
    duration: "45–90 Minutes",
    visits: "1 Visit + Follow-up",
    procedureSteps: [
      {
        title: "X-ray / OPG Evaluation",
        desc: "Assessment of tooth position and nerve location.",
      },
      {
        title: "Anesthesia",
        desc: "Local anesthesia for pain-free surgical extraction.",
      },
      {
        title: "Surgical Removal",
        desc: "Tooth sectioning, flap elevation, sterile extraction.",
      },
      {
        title: "Suturing & Aftercare",
        desc: "Closure and 7-day follow-up for suture removal.",
      },
    ],
  },

  // 6. Periodontics (Gum Treatment)
  periodontics: {
    duration: "45–60 Minutes",
    visits: "1–2 Visits",
    procedureSteps: [
      {
        title: "Periodontal Evaluation",
        desc: "Pocket depth measurement & gum infection assessment.",
      },
      {
        title: "Scaling & Root Planing",
        desc: "Deep cleaning to remove plaque, tartar & bacteria.",
      },
      {
        title: "Laser Therapy (If Required)",
        desc: "Promotes gum healing & reduces bacterial load.",
      },
      {
        title: "Reevaluation",
        desc: "Assessment of gum healing in 2–4 weeks.",
      },
    ],
  },

  // 7. Preventive Dentistry
  "preventive-dentistry": {
    duration: "20–30 Minutes",
    visits: "Single Visit",
    procedureSteps: [
      {
        title: "Oral Check-up",
        desc: "Evaluation of teeth, gums, bite & oral hygiene.",
      },
      {
        title: "Scaling & Polishing",
        desc: "Removal of plaque, tartar & stains for gum health.",
      },
      {
        title: "Fluoride Application",
        desc: "Strengthens enamel & prevents cavities.",
      },
      {
        title: "Sealant Placement (Optional)",
        desc: "Protects deep grooves in molars from decay.",
      },
    ],
  },

  // 8. Crown & Bridge
  "crown-bridge": {
    duration: "3–5 Days",
    visits: "2 Visits",
    procedureSteps: [
      {
        title: "Tooth Preparation",
        desc: "Shaping of tooth for crown/bridge placement.",
      },
      {
        title: "Impressions / Digital Scan",
        desc: "Highly accurate impressions or 3D scan for fabrication.",
      },
      {
        title: "Temporary Crown",
        desc: "Placed while permanent crown is made.",
      },
      {
        title: "Final Crown Cementation",
        desc: "Zirconia/ceramic crown bonded for strength & aesthetics.",
      },
    ],
  },

  // 9. Prosthetics — Dentures
  "prosthetics-dentures": {
    duration: "3–7 Days",
    visits: "2–3 Visits",
    procedureSteps: [
      {
        title: "Initial Impression",
        desc: "Primary molds taken to assess jaw and gum contours.",
      },
      {
        title: "Bite Registration",
        desc: "Measuring bite, height & jaw relation.",
      },
      {
        title: "Trial Denture",
        desc: "Wax try-in to check fit, comfort & aesthetics.",
      },
      {
        title: "Final Denture Delivery",
        desc: "Polished, natural-looking dentures delivered.",
      },
    ],
  },

  // 10. Pediatric Dentistry
  "pediatric-dentistry": {
    duration: "20–40 Minutes",
    visits: "1 Visit",
    procedureSteps: [
      {
        title: "Child-friendly Examination",
        desc: "Gentle assessment of teeth, gums, & habits.",
      },
      {
        title: "Cleaning + Fluoride",
        desc: "Cavity protection & enamel strengthening.",
      },
      {
        title: "Sealants (If Needed)",
        desc: "Prevents cavities in deep grooves of molars.",
      },
      {
        title: "Counseling",
        desc: "Brushing, diet advice & habit correction.",
      },
    ],
  },

  // 11. Bone Grafting / Sinus Lift
  "advanced-surgery-bone-graft": {
    duration: "60–90 Minutes",
    visits: "1 Visit + Review",
    procedureSteps: [
      {
        title: "CBCT Scan Evaluation",
        desc: "Bone height & width analyzed to plan augmentation.",
      },
      {
        title: "Bone Graft Placement",
        desc: "Synthetic or natural graft placed to rebuild bone.",
      },
      {
        title: "Membrane Placement",
        desc: "Protects graft & supports regeneration.",
      },
      {
        title: "Healing Phase",
        desc: "3–6 months for strong implant-ready bone.",
      },
    ],
  },

  // FALLBACK – used when slug not found
  _default: {
    duration: "Varies by Treatment",
    visits: "1–2 Visits",
    procedureSteps: [
      {
        title: "Consultation",
        desc: "Initial evaluation and digital imaging if needed.",
      },
      {
        title: "Treatment Phase",
        desc: "Procedure tailored to the patient's needs.",
      },
      {
        title: "Review Visit",
        desc: "Follow-up to ensure proper healing.",
      },
    ],
  },
};

export default staticProcedures;
