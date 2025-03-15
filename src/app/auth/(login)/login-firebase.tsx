"use client";

import { AuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "@/firebase/config";
import { authApi } from "@/apiRequest/authAPI";
import { LoginResType } from "@/Type/AuthTypes";
import { handlError } from "@/components/handle-error";
import { GoogleIcon } from "../../../../public/icons/icons";

const googleProvider = new GoogleAuthProvider();

function LoginWithFirebase() {
  const handleLoginWithFirebase = async (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // @ts-ignore
        const { accessToken, uid, displayName } = user;
        try {
          const result: LoginResType = await authApi.login({
            email: user.email || "",
            phone_number: user.phoneNumber || "",
            fullname: user.displayName || "",
            avatar: user.photoURL || "",
            method: "google",
            google_account_id: user.uid,
          });
          await authApi.sendCookieToServer(result);
          localStorage.setItem("user", JSON.stringify({ name: user.displayName, avatar: user.photoURL }));
          window.location.assign("/");
        } catch (error) {
          handlError({
            consoleError: "Error login with firebase to server",
            error,
          });
        }
      })
      .catch((error) => {
        handlError({
          consoleError: "Error login with firebase",
          error,
        });
      });
  };

  return (
    <button
      onClick={() => handleLoginWithFirebase(googleProvider)}
      className="w-9 h-9 cursor-pointer mx-auto block my-4 p-2 rounded-full border bg-white"
    >
      <GoogleIcon />
    </button>
  );
}

export default LoginWithFirebase;
