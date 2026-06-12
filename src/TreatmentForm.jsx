import React, { useEffect, useState } from "react";
import API from "./api";
import slugify from "slugify";
import { useNavigate, useParams } from "react-router-dom";

function blankFaq() {
  return { q: "", a: "" };
}

const categoryOptions = [
  "Preventive",
  "Restorative",
  "Endodontics",
  "Implants",
  "Prosthetics",
  "Cosmetic",
  "Orthodontics",
  "Pediatric",
  "Periodontics",
  "Oral Surgery",
];

export default function TreatmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    seoCopy: "",
    benefits: [""],
    regularPrice: "",
    memberPrice: "",
    heroImage: "",
    gallery: [],
    faqs: [blankFaq()],
  });

  // Load existing treatment when editing
  useEffect(() => {
    if (!id) return;
    API.get(`/treatments/id/${id}`)
      .then((res) => {
        const data = res.data;
        setForm((prev) => ({
          ...prev,
          ...data,
          // Ensure arrays are always arrays even if null in DB
          benefits: data.benefits?.length ? data.benefits : [""],
          gallery: data.gallery || [],
          faqs: data.faqs?.length ? data.faqs : [blankFaq()],
        }));
      })
      .catch((err) => {
        setErrorMsg("Failed to load treatment: " + (err.response?.data?.error || err.message));
      });
  }, [id]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ── Benefits ──────────────────────────────────────────────────────────────
  const updateBenefit = (index, value) => {
    const b = [...form.benefits];
    b[index] = value;
    update("benefits", b);
  };
  const addBenefit = () => update("benefits", [...form.benefits, ""]);
  const removeBenefit = (index) =>
    update("benefits", form.benefits.filter((_, i) => i !== index));

  // ── FAQs ──────────────────────────────────────────────────────────────────
  const updateFaqAt = (i, value) =>
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, idx) => (i === idx ? value : f)),
    }));
  const removeFaqAt = (i) =>
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== i),
    }));

  // ── Image upload ──────────────────────────────────────────────────────────
  const uploadHeroImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file); // backend expects single "file"

    setLoading(true);
    try {
      const res = await API.post("/uploads/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.url) update("heroImage", res.data.url);
    } catch {
      setErrorMsg("Hero image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadGalleryImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const fd = new FormData();
    // Backend /uploads/images expects field name "files" (plural)
    files.forEach((file) => fd.append("files", file));

    setLoading(true);
    try {
      const res = await API.post("/uploads/images", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const urls = res.data.urls || [];
      update("gallery", [...form.gallery, ...urls]);
    } catch {
      setErrorMsg("Gallery upload failed");
    } finally {
      setLoading(false);
    }
  };

  const removeGalleryImage = (index) =>
    update("gallery", form.gallery.filter((_, i) => i !== index));

  // ── Save ──────────────────────────────────────────────────────────────────
  const submit = async () => {
    setErrorMsg("");

    if (!form.title.trim()) { setErrorMsg("Title is required"); return; }
    if (!form.category.trim()) { setErrorMsg("Category is required"); return; }

    // Strip empty benefits and FAQ entries
    const payload = {
      ...form,
      benefits: form.benefits.filter((b) => b.trim()),
      faqs: form.faqs.filter((f) => f.q.trim() && f.a.trim()),
      slug:
        form.slug.trim() ||
        slugify(form.title, { lower: true, strict: true }),
    };

    setLoading(true);
    try {
      if (id) {
        await API.put(`/treatments/${id}`, payload);
        alert("Treatment updated successfully!");
      } else {
        await API.post("/treatments", payload);
        alert("Treatment created successfully!");
      }
      navigate("/dashboard/treatments");
    } catch (err) {
      setErrorMsg(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        {id ? "Edit Treatment" : "Add Treatment"}
      </h1>

      {errorMsg && (
        <div
          style={{
            background: "#ffe8e8",
            padding: 14,
            borderRadius: 8,
            color: "crimson",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          ⚠ {errorMsg}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 20,
          background: "#faf7f2",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* TITLE */}
        <Field
          label="Treatment Title"
          required
          value={form.title}
          placeholder="Dental Implants"
          onChange={(v) => update("title", v)}
        />

        {/* SLUG (auto-generated, editable) */}
        <Field
          label="Slug (auto-generated from title if left blank)"
          value={form.slug}
          placeholder="dental-implants"
          onChange={(v) => update("slug", v)}
        />

        {/* CATEGORY */}
        <div>
          <label style={{ fontWeight: 600 }}>
            Category <span style={{ color: "crimson" }}>*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", marginTop: 4 }}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* BENEFITS */}
        <div>
          <label style={{ fontWeight: 600 }}>Key Benefits</label>
          {form.benefits.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, marginTop: 4 }}>
              <input
                value={b}
                onChange={(e) => updateBenefit(i, e.target.value)}
                placeholder="e.g. Natural-looking replacement"
                style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
              />
              <button
                onClick={() => removeBenefit(i)}
                style={{ background: "crimson", color: "white", borderRadius: 6, padding: "0 12px", border: "none", cursor: "pointer" }}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addBenefit}
            style={{ padding: "8px 14px", background: "#0a7b70", color: "white", borderRadius: 8, border: "none", cursor: "pointer", marginTop: 4 }}
          >
            + Add Benefit
          </button>
        </div>

        {/* META TITLE */}
        <Field
          label="Meta Title"
          value={form.metaTitle}
          onChange={(v) => update("metaTitle", v)}
        />

        {/* META DESCRIPTION */}
        <TextArea
          label="Meta Description"
          value={form.metaDescription}
          onChange={(v) => update("metaDescription", v)}
        />

        {/* SEO COPY */}
        <TextArea
          label="SEO Copy / Treatment Description"
          rows={6}
          value={form.seoCopy}
          onChange={(v) => update("seoCopy", v)}
        />

        {/* PRICING */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field
            label="Regular Price"
            value={form.regularPrice}
            placeholder="e.g. ₹15,000"
            onChange={(v) => update("regularPrice", v)}
          />
          <Field
            label="Membership Price"
            value={form.memberPrice}
            placeholder="e.g. ₹12,000"
            onChange={(v) => update("memberPrice", v)}
          />
        </div>

        {/* HERO IMAGE */}
        <div>
          <label style={{ fontWeight: 600 }}>Hero Image</label>
          <input type="file" accept="image/*" onChange={uploadHeroImage} style={{ display: "block", marginTop: 6 }} />
          {form.heroImage && (
            <div style={{ marginTop: 10, position: "relative", display: "inline-block" }}>
              <img src={form.heroImage} alt="" style={{ height: 80, borderRadius: 8, objectFit: "cover" }} />
              <button
                onClick={() => update("heroImage", "")}
                style={{ position: "absolute", top: -6, right: -6, background: "crimson", color: "white", borderRadius: "50%", width: 22, height: 22, border: "none", cursor: "pointer", fontSize: 14 }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* GALLERY IMAGES */}
        <div>
          <label style={{ fontWeight: 600 }}>Gallery Images (Before / After)</label>
          <input type="file" accept="image/*" multiple onChange={uploadGalleryImages} style={{ display: "block", marginTop: 6 }} />
          <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            {form.gallery.map((g, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img src={g} alt="" style={{ height: 60, borderRadius: 6, objectFit: "cover" }} />
                <button
                  onClick={() => removeGalleryImage(i)}
                  style={{ position: "absolute", top: -6, right: -6, background: "crimson", color: "white", borderRadius: "50%", width: 22, height: 22, border: "none", cursor: "pointer", fontSize: 14 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <label style={{ fontWeight: 600 }}>FAQs</label>
          {form.faqs.map((f, i) => (
            <div key={i} style={{ padding: 14, background: "white", borderRadius: 10, marginTop: 10, border: "1px solid #eee" }}>
              <Field
                label={`Q${i + 1}`}
                value={f.q}
                placeholder="Question"
                onChange={(v) => updateFaqAt(i, { ...f, q: v })}
              />
              <TextArea
                label="Answer"
                value={f.a}
                placeholder="Answer"
                onChange={(v) => updateFaqAt(i, { ...f, a: v })}
              />
              <button
                onClick={() => removeFaqAt(i)}
                style={{ background: "crimson", color: "white", padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", marginTop: 6 }}
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <button
            onClick={() => update("faqs", [...form.faqs, blankFaq()])}
            style={{ padding: "10px 14px", background: "#0a7b70", color: "white", borderRadius: 8, marginTop: 10, border: "none", cursor: "pointer" }}
          >
            + Add FAQ
          </button>
        </div>

        {/* SUBMIT */}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button
            onClick={submit}
            disabled={loading}
            style={{ padding: "12px 24px", background: loading ? "#aaa" : "#0a7b70", color: "white", borderRadius: 10, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Saving..." : id ? "Update Treatment" : "Create Treatment"}
          </button>
          <button
            onClick={() => navigate("/dashboard/treatments")}
            style={{ padding: "12px 20px", background: "#ddd", borderRadius: 10, border: "none", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function Field({ label, value, placeholder, onChange, required }) {
  return (
    <div>
      {label && (
        <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
          {label} {required && <span style={{ color: "crimson" }}>*</span>}
        </label>
      )}
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", boxSizing: "border-box" }}
      />
    </div>
  );
}

function TextArea({ label, value, placeholder, onChange, rows = 3 }) {
  return (
    <div>
      {label && (
        <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", boxSizing: "border-box", resize: "vertical" }}
      />
    </div>
  );
}
