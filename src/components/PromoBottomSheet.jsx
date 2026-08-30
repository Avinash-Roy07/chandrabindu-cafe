import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PromoBottomSheet = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => setVisible(false);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.6)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "fixed",
        left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        background: "#fff",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.3)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        padding: "12px 16px 32px",
      }}>
        {/* Handle */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{ display: "inline-block", width: 40, height: 4, borderRadius: 2, background: "#ccc" }} />
        </div>

        {/* Close */}
        <button onClick={dismiss} style={{
          position: "absolute", top: 14, right: 14,
          width: 30, height: 30, borderRadius: "50%",
          background: "#eee", border: "none", cursor: "pointer",
          fontSize: 18, fontWeight: "bold", color: "#333",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>×</button>

        {/* Image — using img tag with onError fallback */}
        <img
          src="/promo-banner.png"
          alt="Special Offer"
          onError={(e) => { e.target.style.display = "none"; }}
          style={{
            width: "100%",
            borderRadius: 14,
            display: "block",
            maxHeight: 400,
            objectFit: "cover",
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            onClick={() => { dismiss(); setTimeout(() => navigate("/products"), 450); }}
            style={{
              flex: 1, padding: "13px 0",
              background: "#6A4029", color: "#F5C518",
              fontWeight: 700, fontSize: 15,
              border: "none", borderRadius: 12, cursor: "pointer",
            }}
          >Order Now ☕</button>
          <button onClick={dismiss} style={{
            padding: "13px 18px",
            background: "#f5f0eb", color: "#6A4029",
            fontWeight: 600, fontSize: 14,
            border: "none", borderRadius: 12, cursor: "pointer",
          }}>Later</button>
        </div>
      </div>
    </>
  );
};

export default PromoBottomSheet;
