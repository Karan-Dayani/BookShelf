"use client";
import { useSession } from "next-auth/react";
import React from "react";

const YourBooks = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>YourBooks</div>;
};

export default YourBooks;
