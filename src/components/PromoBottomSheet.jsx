import React, { useEffect, useState } from "react";
import promoBanner from "../assets/promo-banner.png";

const PromoBottomSheet = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Only show on mobile, slide up after 1.5s, only once per session
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const alreadySeen = sessionStorage.getItem("promoBannerSeen");
    if (isMobile && !alreadySeen) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("promoBannerSeen", "1");
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleDismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.45)",
          animation: dismissed ? "fadeOut 0.35s ease forwards" : "fadeIn 0.3s ease forwards",
        }}
      />

      {/* Bottom sheet */}
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 9999,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: dismissed ? "slideDown 0.35s ease forwards" : "slideUp 0.45s cubic-bezier(0.34,1.1,0.64,1) forwards",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#ddd" }} />
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute", top: 12, right: 14,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(0,0,0,0.08)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: "#555", fontWeight: "bold",
          }}
        >
          ×
        </button>

        {/* Banner image */}
        <div style={{ padding: "8px 16px 20px" }}>
          <img
            src={promoBanner}
            alt="Special Offer"
            style={{ width: "100%", borderRadius: 16, objectFit: "cover" }}
          />

          {/* CTA */}
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              onClick={handleDismiss}
              style={{
                flex: 1, padding: "13px 0",
                background: "linear-gradient(135deg,#6A4029,#8B5E3C)",
                color: "#F5C518", fontWeight: 700, fontSize: 15,
                border: "none", borderRadius: 14, cursor: "pointer",
                letterSpacing: 0.5,
              }}
            >
              Order Now ☕
            </button>
            <button
              onClick={handleDismiss}
              style={{
                padding: "13px 18px",
                background: "#f5f0eb",
                color: "#6A4029", fontWeight: 600, fontSize: 14,
                border: "none", borderRadius: 14, cursor: "pointer",
              }}
            >
              Later
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(0); }
          to   { transform: translateY(110%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default PromoBottomSheet;
