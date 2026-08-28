import React, { useEffect, useState } from "react";
import splashLogo from "../assets/splash-logo.png";

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("enter"); // enter → stay → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 3800);
    const t2 = setTimeout(() => {
      sessionStorage.setItem("splashShown", "1");
      onDone();
    }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #7B4F2E 0%, #4A2810 50%, #2C1608 100%)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "exit" ? "scale(1.05)" : "scale(1)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,197,24,0.15) 0%, transparent 70%)",
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 4 + (i % 3) * 2,
          height: 4 + (i % 3) * 2,
          borderRadius: "50%",
          background: `rgba(245,197,24,${0.2 + (i % 4) * 0.1})`,
          left: `${10 + i * 11}%`,
          top: `${15 + (i % 5) * 15}%`,
          animation: `float${i % 3} ${3 + i * 0.4}s ease-in-out infinite`,
        }} />
      ))}

      {/* Logo */}
      <div style={{
        animation: "logoEntrance 0.9s cubic-bezier(0.34,1.56,0.64,1) forwards",
        filter: "drop-shadow(0 20px 60px rgba(245,197,24,0.4))",
      }}>
        <img
          src={splashLogo}
          alt="Chandrabindu Cafe"
          style={{ width: 200, height: 200, objectFit: "contain" }}
        />
      </div>

      {/* Brand name */}
      <div style={{
        animation: "fadeUp 0.8s ease 0.5s both",
        textAlign: "center",
        marginTop: 24,
      }}>
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#F5C518",
          letterSpacing: 3,
          textTransform: "uppercase",
          margin: 0,
        }}>
          Chandrabindu
        </h1>
        <p style={{
          color: "rgba(245,197,24,0.6)",
          fontSize: 13,
          letterSpacing: 6,
          textTransform: "uppercase",
          margin: "6px 0 0",
        }}>
          Café &amp; Bistro
        </p>
      </div>

      {/* Loader dots */}
      <div style={{
        display: "flex", gap: 8, marginTop: 48,
        animation: "fadeUp 0.8s ease 1s both",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#F5C518",
            animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes logoEntrance {
          from { opacity: 0; transform: scale(0.5) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
        @keyframes float0 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-18px); }
        }
        @keyframes float1 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-12px); }
        }
        @keyframes float2 {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-24px); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
