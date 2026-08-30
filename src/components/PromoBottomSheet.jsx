import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import promoBanner from "../assets/promo-banner.png";

const PromoBottomSheet = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        background: "#fff",
        borderRadius: "20px 20px 0 0",
        padding: "16px 16px 32px",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.25)",
        animation: "slideUp 0.4s ease",
      }}>
        {/* Handle */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ display: "inline-block", width: 40, height: 4, borderRadius: 2, background: "#ddd" }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 32, height: 32, borderRadius: "50%",
            background: "#f0f0f0", border: "none",
            fontSize: 20, cursor: "pointer", fontWeight: "bold",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Banner image */}
        <img
          src={promoBanner}
          alt="Special Offer"
          style={{ width: "100%", borderRadius: 14, display: "block" }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            onClick={() => { setOpen(false); navigate("/products"); }}
            style={{
              flex: 1, padding: "13px 0",
              background: "#6A4029", color: "#F5C518",
              fontWeight: 700, fontSize: 15,
              border: "none", borderRadius: 12, cursor: "pointer",
            }}
          >Order Now ☕</button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: "13px 20px",
              background: "#f5f0eb", color: "#6A4029",
              fontWeight: 600, fontSize: 14,
              border: "none", borderRadius: 12, cursor: "pointer",
            }}
          >Later</button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PromoBottomSheet;
