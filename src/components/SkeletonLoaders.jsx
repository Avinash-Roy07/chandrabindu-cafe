import React from "react";

/* ─── Base shimmer block ─────────────────────────────────────────── */
const S = ({ w = "100%", h = 16, r = 10, className = "", style = {} }) => (
  <div
    className={`relative overflow-hidden ${className}`}
    style={{ width: w, height: h, borderRadius: r, background: "#ede8e3", flexShrink: 0, ...style }}
  >
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.65) 50%,transparent 100%)",
      animation: "skShimmer 1.5s ease-in-out infinite",
    }} />
  </div>
);

const css = `@keyframes skShimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;

/* ─── Products page skeleton ─────────────────────────────────────── */
export const ProductsSkeleton = () => (
  <div className="w-full animate-pulse">
    <style>{css}</style>
    {/* Tab bar */}
    <div className="flex gap-4 mb-8 overflow-x-auto pb-1">
      {[110, 70, 95, 65, 75].map((w, i) => <S key={i} w={w} h={22} r={8} />)}
    </div>
    {/* Promo sidebar + grid layout */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Promo sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-4">
        <S w="60%" h={20} r={8} />
        {[0,1,2,3].map(i => (
          <div key={i} className="flex gap-3 items-center p-3 rounded-2xl" style={{background:"#f5f0eb"}}>
            <S w={48} h={48} r={24} />
            <div className="flex-1 flex flex-col gap-2">
              <S h={14} r={6} />
              <S w="70%" h={12} r={6} />
            </div>
          </div>
        ))}
      </div>
      {/* Product grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-14 mt-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <S w={110} h={110} r={55} style={{marginBottom:12}} />
            <div className="w-full flex flex-col items-center gap-2 px-2">
              <S w="85%" h={15} r={6} />
              <S w="55%" h={13} r={6} />
              <S w="65%" h={13} r={6} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Mainpage skeleton ───────────────────────────────────────────── */
export const MainpageSkeleton = () => (
  <div className="w-full">
    <style>{css}</style>
    {/* Hero */}
    <S w="100%" h={380} r={0} />
    {/* Stats card */}
    <div className="global-px" style={{marginTop:-32, position:"relative", zIndex:10}}>
      <div className="bg-white rounded-2xl shadow-xl grid grid-cols-3 divide-x divide-gray-100 p-5">
        {[0,1,2].map(i => (
          <div key={i} className="flex flex-col items-center gap-2 px-3">
            <S w={40} h={40} r={20} />
            <S w={50} h={18} r={6} />
            <S w={40} h={13} r={6} />
          </div>
        ))}
      </div>
    </div>
    {/* Content section */}
    <div className="global-px py-14 flex flex-col lg:flex-row gap-10">
      <S w="100%" h={260} r={16} className="flex-1" />
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <S w="75%" h={28} r={8} />
        <S w="90%" h={16} r={6} />
        {[0,1,2,3].map(i => <S key={i} w="80%" h={14} r={6} />)}
      </div>
    </div>
    {/* Favorites row */}
    <div className="global-px pb-14">
      <S w={220} h={28} r={8} className="mx-auto mb-10" />
      <div className="flex flex-wrap justify-center gap-8">
        {[0,1,2].map(i => (
          <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 w-56">
            <S w={120} h={120} r={60} />
            <S w="80%" h={18} r={6} />
            {[0,1,2,3].map(j => <S key={j} w="90%" h={13} r={5} />)}
            <S w="60%" h={22} r={6} />
            <S w="80%" h={40} r={20} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Profile page skeleton ──────────────────────────────────────── */
export const ProfileSkeleton = () => (
  <div className="global-px py-10">
    <style>{css}</style>
    <S w={160} h={24} r={8} className="mb-6" />
    <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow">
      {/* Left panel */}
      <div className="flex flex-col items-center p-10 gap-4 lg:w-64">
        <S w={160} h={160} r={80} />
        <S w={120} h={20} r={6} />
        <S w={100} h={16} r={6} />
        <S w="75%" h={44} r={16} />
        <S w="75%" h={44} r={16} />
        <S w="75%" h={44} r={16} />
      </div>
      {/* Right form */}
      <div className="flex-1 p-8 flex flex-col gap-6">
        <S w={100} h={20} r={6} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[0,1,2,3,4,5].map(i => (
            <div key={i} className="flex flex-col gap-2">
              <S w={120} h={13} r={5} />
              <S w="100%" h={36} r={8} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Product detail skeleton ────────────────────────────────────── */
export const ProductDetailSkeleton = () => (
  <div className="global-px py-10">
    <style>{css}</style>
    {/* Breadcrumb */}
    <div className="flex gap-2 mb-8">
      <S w={120} h={14} r={5} />
      <S w={80} h={14} r={5} />
    </div>
    <div className="flex flex-col md:flex-row gap-12">
      {/* Left */}
      <div className="flex-1 flex flex-col items-center gap-6">
        <S w={240} h={240} r={120} />
        <div className="w-full rounded-2xl p-6 flex flex-col gap-5" style={{boxShadow:"0 2px 16px rgba(0,0,0,0.08)"}}>
          <S w={160} h={22} r={6} />
          <div className="flex gap-3">
            {[0,1,2].map(i => <S key={i} w={80} h={36} r={8} />)}
          </div>
          <div className="flex flex-col gap-4">
            {[0,1].map(i => (
              <div key={i} className="flex gap-4 items-center">
                <S w={60} h={16} r={5} />
                <div className="flex gap-2">
                  <S w={70} h={36} r={8} />
                  <S w={70} h={36} r={8} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex-1 flex flex-col gap-5">
        <S w="70%" h={44} r={8} />
        <S w="100%" h={16} r={5} />
        <S w="90%" h={16} r={5} />
        <S w="80%" h={16} r={5} />
        <S w="60%" h={16} r={5} />
        <div className="flex justify-between items-center mt-4">
          <S w={120} h={44} r={8} />
          <S w={100} h={28} r={6} />
        </div>
        <S w="100%" h={52} r={12} />
        <S w="100%" h={52} r={12} />
      </div>
    </div>
  </div>
);

/* ─── History page skeleton ──────────────────────────────────────── */
export const HistorySkeleton = () => (
  <div className="w-full py-6">
    <style>{css}</style>
    <div className="flex flex-col items-center gap-3 mb-8">
      <S w={280} h={32} r={8} />
      <S w={180} h={16} r={6} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="flex gap-4 items-center bg-white rounded-2xl p-4" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.07)"}}>
          <S w={90} h={90} r={45} />
          <div className="flex-1 flex flex-col gap-2">
            <S w="70%" h={18} r={6} />
            <S w="50%" h={14} r={5} />
            <S w="40%" h={14} r={5} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Cart page skeleton ─────────────────────────────────────────── */
export const CartSkeleton = () => (
  <div className="global-px py-10">
    <style>{css}</style>
    <S w={260} h={32} r={8} className="mb-8" />
    <div className="flex flex-col md:flex-row gap-10">
      {/* Order summary */}
      <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col gap-5">
        <S w={180} h={26} r={8} className="mx-auto" />
        {[0,1,2].map(i => (
          <div key={i} className="flex gap-4 items-center">
            <S w={70} h={70} r={12} />
            <div className="flex-1 flex flex-col gap-2">
              <S w="60%" h={16} r={5} />
              <S w="40%" h={13} r={5} />
            </div>
            <S w={80} h={16} r={5} />
          </div>
        ))}
        <div className="border-t pt-4 flex flex-col gap-3">
          {[0,1,2].map(i => (
            <div key={i} className="flex justify-between">
              <S w={80} h={14} r={5} />
              <S w={80} h={14} r={5} />
            </div>
          ))}
          <div className="flex justify-between mt-2">
            <S w={60} h={20} r={5} />
            <S w={100} h={20} r={5} />
          </div>
        </div>
      </div>
      {/* Address + payment */}
      <div className="flex-1 flex flex-col gap-5">
        <S w={160} h={26} r={8} />
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
          {[0,1,2].map(i => <S key={i} w="100%" h={36} r={8} />)}
        </div>
        <S w={180} h={26} r={8} />
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
          {[0,1,2].map(i => (
            <div key={i} className="flex gap-3 items-center">
              <S w={40} h={40} r={8} />
              <S w={80} h={16} r={5} />
            </div>
          ))}
        </div>
        <S w="100%" h={52} r={12} />
      </div>
    </div>
  </div>
);

/* ─── Generic fallback skeleton ──────────────────────────────────── */
export const PageSkeleton = () => (
  <div className="global-px py-10 flex flex-col gap-5">
    <style>{css}</style>
    <S w="40%" h={32} r={8} />
    <S w="60%" h={18} r={6} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <S w="100%" h={180} r={16} />
          <S w="70%" h={16} r={6} />
          <S w="45%" h={14} r={6} />
        </div>
      ))}
    </div>
  </div>
);

export default S;
