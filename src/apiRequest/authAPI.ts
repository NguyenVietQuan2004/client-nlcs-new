import {
  LoginResType,
  LoginBodyType,
  RegisterResType,
  RegisterBodyType,
  LoginFirebaseResType,
  LoginFirebaseBodyType,
  SendCookieToServerResType,
  SendCookieToServerBodyType,
} from "@/Type/AuthTypes";
import httpRequest from "@/lib/http";

export const authApi = {
  login(body: LoginBodyType | LoginFirebaseBodyType) {
    return httpRequest.post<LoginResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      body,
    });
  },
  refreshToken() {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh-token`, {});
  },
  register(body: RegisterBodyType) {
    return httpRequest.post<RegisterResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      body,
    });
  },

  sendCookieToServer(body: SendCookieToServerBodyType) {
    return httpRequest.post<SendCookieToServerResType>(`/api/auth/login`, {
      body,
    });
  },

  signOut(accessToken: string) {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  // getAccessToken() {
  //   return httpRequest.get<any>(`/api/auth/get-access-token`);
  // },
  // getRefreshToken() {
  //   return httpRequest.get<any>(`/api/auth/get-refresh-token`);
  // },
  signOutNextServer() {
    return httpRequest.post<any>(`/api/auth/logout`, {});
  },
};
