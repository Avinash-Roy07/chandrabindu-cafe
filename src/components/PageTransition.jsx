import React from "react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div
      key={pathname}
      style={{ animation: "pageEnter 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both" }}
    >
      {children}
      <style>{`
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
