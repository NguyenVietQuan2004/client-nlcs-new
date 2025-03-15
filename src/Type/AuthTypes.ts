//////////////////////////////-----AUTH TYPE-----//////////////////////////////

import z from "zod";

// LOGIN BODY TYPE
const LoginBody = z.object({
  email: z.string(),
  password: z.string(),
  method: z.string(),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// LOGIN RES TYPE
const LoginRes = z.object({
  data: z.object({
    email: z.string().email(),
    phone_number: z.string().min(7).max(15),
    fullname: z.string().min(1),
    avatar: z.string().url(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type LoginResType = z.TypeOf<typeof LoginRes>;

// LOGIN FIREBASE BODY TYPE
const LoginFirebaseBody = z.object({
  email: z.string().email().optional(),
  phone_number: z.string().min(7).max(15).optional(),
  fullname: z.string().min(1),
  avatar: z.string().url(),
  method: z.string().min(1),
  google_account_id: z.string().min(1),
});
export type LoginFirebaseBodyType = z.TypeOf<typeof LoginFirebaseBody>;

// LOGIN RES TYPE
const LoginFirebaseRes = z.object({
  data: z.object({
    email: z.string().email(),
    phone_number: z.string().min(7).max(15),
    fullname: z.string().min(1),
    avatar: z.string().url(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type LoginFirebaseResType = z.TypeOf<typeof LoginFirebaseRes>;

// REGISTER  BODY TYPE
const RegisterBodyType = z.object({
  email: z.string().email(), // Bắt buộc
  phone_number: z.string().min(7).max(15).optional(),
  fullname: z.string().min(1),
  avatar: z.string().url().optional(),
  method: z.string().min(1),
  password: z.string().min(6),
});
export type RegisterBodyType = z.TypeOf<typeof RegisterBodyType>;

// REGISTER  RES TYPE
export const RegisterRes = z.object({
  data: z.object({
    email: z.string().email(),
    phone_number: z.string().min(7).max(15),
    fullname: z.string().min(1),
    avatar: z.string().url(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;

// SEND COOKIE TO SERVER BODY TYPE
export const SendCookieToServerBody = z.object({
  data: z.object({
    email: z.string().email(),
    phone_number: z.string().min(7).max(15),
    fullname: z.string().min(1),
    avatar: z.string().url(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type SendCookieToServerBodyType = z.TypeOf<typeof SendCookieToServerBody>;

// SEND COOKIE TO SERVER RES TYPE
export const SendCookieToServerRes = z.object({
  data: z.object({
    email: z.string().email(),
    phone_number: z.string().min(7).max(15),
    fullname: z.string().min(1),
    avatar: z.string().url(),
  }),
  error: z.any(),
  message: z.string(),
  success: z.boolean(),
  statusCode: z.number(),
});
export type SendCookieToServerResType = z.TypeOf<typeof SendCookieToServerRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
