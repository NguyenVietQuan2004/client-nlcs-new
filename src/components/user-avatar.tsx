"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/apiRequest/authAPI";
import { handlError } from "@/components/handle-error";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

function UserAvatar() {
  const [userName, setUserName] = useState("n");
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUserName(() => {
          const userParse = JSON.parse(user);
          if (userParse.avatar) {
            return userParse.avatar;
          }
          const nameArray = userParse.name.split(" ");
          return nameArray[0][0];
        });
      }
    }
  }, []);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const user = localStorage.getItem("user");
  //     if (user) {
  //       setUserName(() => {
  //         const fullName = JSON.parse(user).userName;
  //         const nameArray = fullName.split(" ");
  //         return nameArray[0][0];
  //       });
  //     }
  //   }
  // }, []);
  const handleLogOut = async () => {
    try {
      const data = await authApi.signOutNextServer();
      await authApi.signOut(data.accessToken);
      localStorage.setItem("user", "");
      router.refresh();
    } catch (error) {
      handlError({ consoleError: "SIGNOUT_ERROR", error });
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        {userName.length == 1 ? (
          <div className=" w-8 h-8 cursor-default rounded-full bg-blue-400 flex justify-center text-white items-center">
            {userName}
          </div>
        ) : (
          <div className=" w-8 h-8 cursor-default   flex justify-center text-white items-center">
            <Image src={userName} alt="avatar" className="rounded-full" width={64} height={64} />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "text-black",
          })}
          onClick={handleLogOut}
        >
          Đăng xuất
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default UserAvatar;
