import { cookies } from "next/headers";
export async function POST() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return Response.json(
    { accessToken },
    {
      status: 200,

      headers: {
        "Set-Cookie": [
          `accessToken=; Path=/; HttpOnly ;Secure; Partitioned;SameSite=None`,
          `refreshToken=; Path=/; HttpOnly ;Secure; Partitioned;SameSite=None`,
        ].join(", "),
        "Content-Type": "application/json",
      },
    }
  );
}
