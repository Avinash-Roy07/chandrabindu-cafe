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
    <>
      {/* Backdrop — separate from sheet */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9000,
          background: "rgba(0,0,0,0.6)",
        }}
      />

      {/* Sheet — above backdrop */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9001,
        background: "#ffffff",
        borderRadius: "20px 20px 0 0",
        padding: "14px 16px 36px 16px",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.2)",
        animation: "promoSlideUp 0.45s ease forwards",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        {/* Handle */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{
            display: "inline-block",
            width: 44, height: 5,
            borderRadius: 3,
            background: "#ddd",
          }} />
        </div>

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 14, right: 14,
            width: 34, height: 34,
            borderRadius: "50%",
            background: "#f0f0f0",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            fontWeight: "bold",
            color: "#444",
            lineHeight: "34px",
            textAlign: "center",
            padding: 0,
          }}
        >×</button>

        {/* Promo image */}
        <img
          src={promoBanner}
          alt="Special Offer"
          style={{
            width: "100%",
            display: "block",
            borderRadius: 16,
            marginBottom: 14,
          }}
        />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => { setOpen(false); navigate("/products"); }}
            style={{
              flex: 1,
              padding: "14px 0",
              background: "#6A4029",
              color: "#F5C518",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >Order Now ☕</button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: "14px 22px",
              background: "#f5f0eb",
              color: "#6A4029",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
            }}
          >Later</button>
        </div>
      </div>

      <style>{`
        @keyframes promoSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default PromoBottomSheet;
