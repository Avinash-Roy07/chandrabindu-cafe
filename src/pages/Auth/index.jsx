import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/chandrabindu-logo.png';

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel — coffee background, hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-main flex-col justify-between p-12">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <Link to="/">
            <img src={logo} alt="logo" className="h-16 w-auto" />
          </Link>
        </div>
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Start Your Day<br />with Great Coffee
          </h2>
          <p className="text-white/80 text-lg">
            High quality beans, healthy meals,<br />made with love just for you.
          </p>
        </div>
        <div className="relative z-10 text-white/60 text-sm">
          © 2024 Chandrabindu Cafe. All rights reserved.
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 py-8 sm:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 py-4 lg:hidden">
          © 2024 Chandrabindu Cafe
        </div>
      </div>
    </div>
  );
};

export default Auth;
