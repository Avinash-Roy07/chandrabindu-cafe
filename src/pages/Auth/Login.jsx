import React, { useState } from "react";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/chandrabindu-logo.png";
import { uinfoAct } from "../../redux/slices/userInfo.slice";
import { firebaseGoogleLogin, firebaseLogin } from "../../utils/firebase";
import useDocumentTitle from "../../utils/documentTitle";

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

const Login = () => {
  const navigate = useNavigate();
  useDocumentTitle("Login");
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function loginHandler(e) {
    e.preventDefault();
    toast.dismiss();

    const valid = { email: "", password: "" };
    if (!form.email) valid.email = "Please enter your email address";
    if (!form.password) valid.password = "Please enter your password";
    setError(valid);
    if (valid.email || valid.password) return;

    setIsLoading(true);
    const toastId = toast.loading("Signing you in...");
    try {
      const { token, user } = await firebaseLogin(form.email, form.password);
      dispatch(uinfoAct.assignToken(token));
      dispatch(uinfoAct.assignData({ role: 1, email: user.email, displayName: user.displayName }));
      toast.success(`Welcome back${user.displayName ? ", " + user.displayName : ""}! ☕`, { id: toastId });
      navigate("/products");
    } catch (err) {
      setIsLoading(false);
      const msg =
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
          ? "Incorrect email or password"
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : err.code === "auth/invalid-email"
          ? "Invalid email address"
          : "Login failed. Please try again.";
      toast.error(msg, { id: toastId });
    }
  }

  async function googleHandler() {
    const toastId = toast.loading("Signing in with Google...");
    try {
      const { token, user } = await firebaseGoogleLogin();
      dispatch(uinfoAct.assignToken(token));
      dispatch(uinfoAct.assignData({ role: 1, email: user.email, displayName: user.displayName }));
      toast.success(`Welcome${user.displayName ? ", " + user.displayName : ""}! ☕`, { id: toastId });
      navigate("/products");
    } catch (err) {
      const msg = err.code === "auth/popup-closed-by-user" ? "Popup closed." : "Google sign-in failed.";
      toast.error(msg, { id: toastId });
    }
  }

  return (
    <div className="w-full">
      <div className="hidden lg:flex items-center gap-3 mb-8">
        <img src={logo} alt="logo" className="h-16 w-auto" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Welcome back 👋</h1>
      <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue</p>

      <form onSubmit={loginHandler} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <input
            type="email" name="email" id="email" autoComplete="email"
            placeholder="you@example.com" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all duration-200 focus:border-[#6A4029] focus:ring-2 focus:ring-[#6A4029]/20 ${error.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
          />
          {error.email && <p className="text-red-500 text-xs mt-1.5">⚠ {error.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <Link to="/auth/forgotpass" className="text-xs text-[#6A4029] hover:underline font-medium">Forgot password?</Link>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} name="password" id="password"
              autoComplete="current-password" placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className={`w-full px-4 py-3 pr-12 rounded-xl border-2 text-sm outline-none transition-all duration-200 focus:border-[#6A4029] focus:ring-2 focus:ring-[#6A4029]/20 ${error.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <EyeIcon open={showPass} />
            </button>
          </div>
          {error.password && <p className="text-red-500 text-xs mt-1.5">⚠ {error.password}</p>}
        </div>

        <button type="submit" disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold text-sm text-[#6A4029] bg-[#F5C518] hover:bg-[#e6b800] active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-60 flex items-center justify-center gap-2">
          {isLoading && <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button type="button" onClick={googleHandler}
          className="w-full py-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 font-semibold text-sm text-gray-700 flex items-center justify-center gap-2 shadow-sm">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="text-[#6A4029] font-bold hover:underline">Create one free</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
