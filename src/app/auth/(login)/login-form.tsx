"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { LoginResType } from "@/Type/AuthTypes";
import { handlError } from "@/components/handle-error";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import LoginWithFirebase from "./login-firebase";
import { useEffect } from "react";

interface ResgisterFormProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Pass must be at least 6 characters.",
  }),
  method: z.string().default("account"),
});
function LoginForm({ isSignUp, setIsSignUp }: ResgisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      method: "account",
    },
  });
  useEffect(() => {
    if (isSignUp) {
      form.reset();
    }
  }, [isSignUp, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    data.method = "account";
    try {
      const result: LoginResType = await authApi.login(data);
      await authApi.sendCookieToServer(result);
      localStorage.setItem("user", JSON.stringify({ name: result.data.fullname }));
      window.location.assign("/");
    } catch (error: any) {
      handlError({
        consoleError: "LOGIN_ERROR",
        error,
      });
      if (error.statusCode === 401) {
        form.setError("password", { type: "manual", message: error.message || "Something went wrong, try later." });
      }
    }
  };

  return (
    <div
      className={`lg:rounded-l-md absolute ${
        isSignUp ? "  lg:right-[10%] xl:right-[20%] 2xl:right-[25%] opacity-0 z-30 " : "lg:right-1/2 opacity-100 z-40 "
      } lg:top-1/2 inset-0 lg:inset-auto xl:w-[30%] 2xl:w-[25%]  p-2 sm:p-[100px]  md:p-[200px]   lg:p-10 lg:py-0  lg:w-[40%] flex flex-col justify-center  lg:-translate-y-1/2  transition-all duration-1000  bg-white  pb-0  min-h-[600px]  flex-1  `}
    >
      <h2 className="text-[26px] text-center font-extrabold mt-10 sm:text-3xl">Sign in</h2>
      <LoginWithFirebase />
      <div className="text-center text-sm font-medium sm:text-base">Or use your account</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 lg:mt-10 flex gap-y-2 flex-col items-center">
          <FormField control={form.control} name="method" render={({ field }) => <input type="hidden" {...field} />} />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="h-[52px]  shadow-sm pl-4  border-b-2 border-zinc-100 w-full  !ring-0  !ring-offset-0 !outline-none"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    className="h-[52px]  shadow-sm pl-4  border-b-2 border-zinc-100 w-full  !ring-0  !ring-offset-0 !outline-none"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className="mt-2 text-sm sm:text-base text-blue-400 cursor-pointer underline ml-2 lg:ml-0 self-start"></div>
          <button
            type="submit"
            className=" hover:bg-opacity-65 py-3 font-bold bg-red-400 text-white px-12 border rounded-full mt-4"
          >
            Sign in
          </button>
          <div className={`block lg:hidden mt-4 text-sm sm:text-base ml-2 lg:ml-0 self-start`}>
            You don't have an account?{" "}
            <span
              className="text-sm sm:text-base text-blue-400 cursor-pointer underline"
              onClick={() => {
                setIsSignUp(true);
                form.reset();
              }}
            >
              Create account
            </span>
          </div>
        </form>
      </Form>
      <div className={`h-16 w-16 mx-auto mt-4 flex justify-center items-center lg:mt-2`}>
        <Image
          alt=""
          width={200}
          height={200}
          className="w-8"
          src={"https://res.cloudinary.com/dvyi5jxrm/image/upload/v1725116961/t2vvfvzknla0aw6oiagn.png"}
        />
      </div>
    </div>
  );
}

export default LoginForm;
