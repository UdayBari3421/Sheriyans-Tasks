import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { setIsLoggedIn, setUser } from "../Feature/AuthSlice";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface UseFormHookProps {
  isLoginForm: boolean;
}

const UseFormHook = ({ isLoginForm }: UseFormHookProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const existingUser = localStorage.getItem("user");

    const localUser: FormData | null = existingUser ? JSON.parse(existingUser) : null;

    if (!isLoginForm && data.name) {
      if (localUser?.email === data.email) {
        toast.dismiss();
        return toast.error("User already exists!");
      }

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setIsLoggedIn(true));
      toast.success("Registration successful!");
      dispatch(setUser(data));
      reset();
      navigate("/");
      return;
    }

    if (!localUser) {
      toast.dismiss();
      return toast.error("User not registered");
    }

    if (localUser.email === data.email && localUser.password === data.password) {
      toast.success("User logged in successfully!");
      dispatch(setUser(data));
      dispatch(setIsLoggedIn(true));
      reset();
      navigate("/");
      return;
    }

    toast.dismiss();
    return toast.error("Invalid credentials!");
  };

  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -24,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[80%] w-full flex-col justify-center p-8 sm:p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-white">
          {isLoginForm ? "Welcome Back" : "Create your account"}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          {isLoginForm ? "Sign in to Skymart" : "Register for Skymart"}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {isLoginForm
            ? "Enter your credentials to continue to your personalized dashboard."
            : "Fill in the details below to get access to exclusive deals, offers, and a faster checkout."}
        </p>
      </div>

      {!isLoginForm && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.1,
          }}
          className="mb-5 flex flex-col gap-2">
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Name is required",
            })}
            className="h-12 rounded-3xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
          />

          {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
        </motion.div>
      )}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: 0.18,
        }}
        className="mb-5 flex flex-col gap-2">
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          className="h-12 rounded-3xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
        />

        {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: 0.24,
        }}
        className="mb-7 flex flex-col gap-2">
        <input
          id="password"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="h-12 rounded-3xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-400/70 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10"
        />

        {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
      </motion.div>

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        type="submit"
        className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-3xl bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition-all duration-300 hover:opacity-95">
        <span className="relative z-10">{isLoginForm ? "Sign In" : "Create Account"}</span>
      </motion.button>
    </motion.form>
  );
};

export default UseFormHook;
