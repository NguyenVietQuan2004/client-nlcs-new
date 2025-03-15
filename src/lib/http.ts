// import { authApi } from "@/apiRequest/authAPI";
// import jwt from "jsonwebtoken";
// interface CustomRequest extends RequestInit {
//   body?: any;
// }
// // intercepter fetch
// const ConfigHttp = async <ResType>(method: string, URL: string, option?: CustomRequest) => {
//   const body = JSON.stringify(option?.body);
//   let headers = option?.headers;
//   const cache = option?.cache;
//   let accessToken;
//   if (
//     typeof window !== "undefined" &&
//     URL !== `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login` &&
//     URL !== `/api/auth/login`
//   ) {
//     accessToken = await fetch(`/api/auth/get-access-token`);
//     let resJson = await accessToken.json();
//     accessToken = resJson.accessToken;

//     try {
//       jwt.verify(accessToken, process.env.JWT_SECRET_KEY!);
//     } catch (error: any) {
//       if (error.name === "JsonWebTokenError") {
//         const refreshToken = await fetch(`/api/auth/get-refresh-token`);
//         resJson = await refreshToken.json();

//         if (!resJson.refreshToken) {
//           await fetch(`/api/auth/logout`, { method: "POST" });
//           // window.location.reload();
//         }

//         const responseToken = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh-token`, {
//           headers: {
//             Authorization: `Bearer ${resJson.refreshToken}`,
//           },
//           method: "POST",
//         });
//         resJson = await responseToken.json();
//         console.log("refresh token thanh cong", resJson);
//         if (resJson.success) {
//           accessToken = resJson.data.accessToken;
//           await authApi.sendCookieToServer(resJson);
//         } else {
//           await fetch(`/api/auth/logout`, { method: "POST" });
//           // window.location.reload();
//         }
//       }
//     }
//   }

//   let response = await fetch(URL, {
//     method,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       // ...headers,
//       "Content-Type": "application/json",
//     },
//     body,
//     cache,
//   });
//   let result: ResType = await response.json();

//   if (!response.ok) {
//     throw result;
//   }
//   return result;
// };

// export const httpRequest = {
//   get<ResType>(URL: string, option?: CustomRequest) {
//     return ConfigHttp<ResType>("GET", URL, option);
//   },
//   put<ResType>(URL: string, option: CustomRequest) {
//     return ConfigHttp<ResType>("PUT", URL, option);
//   },
//   post<ResType>(URL: string, option: CustomRequest) {
//     return ConfigHttp<ResType>("POST", URL, option);
//   },
//   delete<ResType>(URL: string, option: CustomRequest) {
//     return ConfigHttp<ResType>("DELETE", URL, option);
//   },
// };
// export default httpRequest;
import { jwtDecode } from "jwt-decode";

const isClient = () => typeof window !== "undefined";

const getAccessToken = (headers?: HeadersInit) => {
  if (!headers) return null;

  let authHeader = null;

  if (headers instanceof Headers) {
    authHeader = headers.get("Authorization") || headers.get("authorization");
  } else if (Array.isArray(headers)) {
    authHeader = headers.find(([key]) => key.toLowerCase() === "authorization")?.[1] ?? null;
  } else if (typeof headers === "object") {
    authHeader = headers["Authorization"] || headers["authorization"];
  }

  return authHeader ? authHeader.split(" ")[1] || null : null;
};

import { authApi } from "@/apiRequest/authAPI";
import jwt from "jsonwebtoken";
import { getAccessTokenFromCookies } from "./temp";
interface CustomRequest extends RequestInit {
  body?: any;
}
// intercepter fetch
const ConfigHttp = async <ResType>(method: string, PassURL: string, option?: CustomRequest) => {
  const body = JSON.stringify(option?.body);
  let headers = option?.headers;
  const cache = option?.cache;
  let accessToken: any = getAccessToken(headers);
  if (PassURL !== `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login` && PassURL !== `/api/auth/login`) {
    const accessTokenRes = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/api/auth/get-access-token`, {
      headers,
    });
    let resJson = accessTokenRes.ok ? await accessTokenRes.json() : null;
    accessToken = resJson?.accessToken ?? null;
    try {
      const decode = jwtDecode(accessToken);
      if ((decode.exp || 0) * 1000 < Date.now()) {
        console.log("Token het han");
        throw new Error("TokenExpiredError");
      }
      // console.log("Token con han decode", decode);
    } catch (error: any) {
      if (error.name) {
        const refreshToken = await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/api/auth/get-refresh-token`, {
          headers,
        });

        resJson = await refreshToken.json();

        if (!resJson.refreshToken) {
          // await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/api/auth/logout`, { method: "POST" });
          // window.location.reload();
        }
        console.log("eo hieu sao chay vo day", PassURL);
        const responseToken = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/refresh-token`, {
          headers: {
            Authorization: `Bearer ${resJson.refreshToken}`,
          },
          method: "POST",
        });
        resJson = await responseToken.json();
        if (resJson.success) {
          accessToken = resJson.data.accessToken;

          await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(resJson),
          });
        } else {
          // await fetch(`${process.env.NEXT_PUBLIC_API_ADMIN}/api/auth/logout`, { method: "POST" });
          // window.location.reload();
          // return;
        }
      }
    }
  }
  //  else if (PassURL !== `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login` && PassURL !== `/api/auth/login`) {
  //   // const baseURL = process.env.NEXT_PUBLIC_API_ADMIN || "http://localhost:3000";

  //   // const proxyURL = new URL("/api/proxy", baseURL);
  //   // proxyURL.searchParams.append("target", PassURL);
  //   // PassURL = proxyURL.toString();
  //   // accessToken = getAccessToken(headers);
  //   // console.log("da chay vaoday URL: ", PassURL);
  //   const accessTokenFromCookie = getAccessTokenFromCookies();

  //   console.log(accessTokenFromCookie);
  // }
  let response = await fetch(PassURL, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // ...headers,
      "Content-Type": "application/json",
    },
    body,
    cache,
  });
  let result: ResType = await response.json();

  if (!response.ok) {
    throw result;
  }
  return result;
};

export const httpRequest = {
  get<ResType>(URL: string, option?: CustomRequest) {
    return ConfigHttp<ResType>("GET", URL, option);
  },
  put<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("PUT", URL, option);
  },
  post<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("POST", URL, option);
  },
  delete<ResType>(URL: string, option: CustomRequest) {
    return ConfigHttp<ResType>("DELETE", URL, option);
  },
};
export default httpRequest;
