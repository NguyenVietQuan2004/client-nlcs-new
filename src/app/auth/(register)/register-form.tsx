"use client";

import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { authApi } from "@/apiRequest/authAPI";
import { toast } from "@/components/ui/use-toast";
import { handlError } from "@/components/handle-error";
import LoginWithFirebase from "@/app/auth/(login)/login-firebase";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { firstKey } from "@/lib/utils";

interface ResgisterFormProps {
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}
const formSchema = z.object({
  fullname: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Pass must be at least 6 characters.",
  }),
  phone_number: z.string(),
  method: z.string(),
});
function RegisterForm({ isSignUp, setIsSignUp }: ResgisterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone_number: "",
      method: "account",
    },
  });
  useEffect(() => {
    if (!isSignUp) {
      form.reset();
    }
  }, [isSignUp, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    data.method = "account";
    try {
      await authApi.register(data);
      form.reset();
      setIsSignUp(false);
      toast({
        title: "Register success.",
        variant: "success",
      });
    } catch (error) {
      handlError({
        consoleError: "REGISTER_ERROR",
        error,
        isToast: true,
      });
    }
  };
  return (
    <div
      className={`lg:rounded-r-md absolute ${
        isSignUp ? "lg:right-[10%]  xl:right-[20%] 2xl:right-[25%] opacity-100 z-40" : "lg:right-1/2 opacity-0 z-30"
      } lg:top-1/2 inset-0 lg:inset-auto lg:w-[40%] xl:w-[30%] 2xl:w-[25%] sm:p-[100px] md:p-[200px] lg:p-10 lg:py-0 flex flex-col justify-center lg:block  p-2  w-full  lg:-translate-y-1/2   transition-all duration-1000  bg-white   min-h-[600px]  flex-1  `}
    >
      <h2 className="text-[26px]  text-center font-extrabold mt-10 sm:text-3xl">Sign up</h2>
      <LoginWithFirebase />
      <div className="text-center text-sm font-medium sm:text-base">Or use your email for registration</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 lg:mt-10 flex gap-y-2 flex-col items-center">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="h-[52px]  !ring-0  !ring-offset-0 !outline-none pl-4 border-t-2 border-b-2 border-zinc-100 w-full"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
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
                    className="h-[52px]  !ring-0  !ring-offset-0 !outline-none pl-4 border-t-2 border-b-2 border-zinc-100 w-full"
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
                    className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className={`py-3 hover:bg-opacity-65 font-bold bg-red-400 text-white px-12 border rounded-full mt-5 `}
          >
            Sign up
          </button>
        </form>
        <div className={`block lg:hidden sm:text-base mt-6 text-sm ml-2 lg:ml-0 self-start`}>
          You have an account?{" "}
          <span
            className="text-sm text-blue-400 cursor-pointer underline"
            onClick={() => {
              setIsSignUp(false);
              form.reset();
            }}
          >
            Sign in
          </span>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
