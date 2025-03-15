"use client";

import { useState } from "react";

import LoginForm from "@/app/auth/(login)/login-form";
import RegisterForm from "./(register)/register-form";

function AuthClient() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="bg-[#e2e8ed] select-none flex justify-center items-center h-[100vh] ">
      <div className={` fixed inset-0  z-20 flex   shadow-xl   `}>
        <LoginForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <RegisterForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
        <div
          className={`
            
            hidden lg:flex
            absolute ${
              isSignUp ? "xl:left-[20%] 2xl:left-[25%] lg:left-[10%] lg:rounded-l-md" : " left-1/2 lg:rounded-r-md"
            }  min-h-[600px]  top-1/2 lg:w-[40%] xl:w-[30%] 2xl:w-[25%] -translate-y-1/2  transition-all  duration-1000  bg-red-400 flex items-center justify-center flex-col p-10 flex-1 z-40`}
        >
          <div className="text-[26px]  font-extrabold text-white ">
            <span className={`${isSignUp ? "hidden" : "block"} transition-all  duration-1000 `}>Welcome back!</span>
            <span className={`${isSignUp ? "block" : "hidden"} transition-all  duration-1000 `}>Hello, Friends</span>
          </div>
          <div className="text-center text-white my-2">
            {isSignUp
              ? "Enter you personal details and start journey with us"
              : "To keep connected with us please login with your personal info"}
          </div>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            type="button"
            className="py-2 font-bold text-white  px-12 border border-white rounded-full mt-5"
          >
            {!isSignUp ? " Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthClient;
