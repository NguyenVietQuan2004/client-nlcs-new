import { cookies } from "next/headers";

export const getAccessTokenFromCookies = () => {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value || "";
};
