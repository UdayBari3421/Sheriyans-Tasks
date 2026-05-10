import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import UseFormHook from "../Hooks/useFormHook";
import { useSelectorHook } from "../Hooks/useSelectorHook";
import { setLoginFormType } from "../Feature/AuthSlice";
import { useDispatch } from "react-redux";
import { GlobleConfiguration } from "../globalConfig";
import { useNavigate } from "react-router";

const Login = () => {
  const loginType = useSelectorHook("loginType", "auth");
  const isLoggedIn = useSelectorHook("isLoggedIn", "auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoginForm = loginType === GlobleConfiguration.LOGIN;

  const handleChange = () => {
    dispatch(setLoginFormType());
  };

  useEffect(() => {
    (async () => (await isLoggedIn) && navigate(""))();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-black grid grid-cols-2 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        <motion.div
          className="min-w-full relative overflow-hidden shadow-[0_35px_90px_rgba(0,0,0,0.38)]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_40%)]" />

          <motion.div
            className="relative z-10 flex h-full flex-col justify-center gap-6 p-10 text-white sm:p-12 w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}>
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200/90">
              Smart Shopping
            </span>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Your new login experience, designed for speed and style.
            </h1>
            <p className="max-w-lg text-sm leading-7 text-slate-200/80 sm:text-base">
              Sign in or register to explore premium deals, curated product drops, and a beautifully
              animated checkout journey.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          key={loginType}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full flex flex-col justify-between h-full bg-slate-950/70 backdrop-blur-3xl">
          <UseFormHook isLoginForm={isLoginForm} />
          <div className="flex flex-col justify-center items-center bg-slate-950/70 p-7 h-[20%] backdrop-blur-3xl">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.24em]">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <button
              type="button"
              onClick={handleChange}
              className="w-full">
              <span className="block text-slate-400">
                {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              </span>
              <span className="mt-1 block font-semibold text-cyan-300">
                {isLoginForm ? "Create one" : "Sign in"}
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
