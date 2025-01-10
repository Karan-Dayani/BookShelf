"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-text">Hallo Everynian!</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <h1>{session?.user.role}</h1>
    </div>
  );
}
