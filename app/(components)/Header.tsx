"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  const { status } = useSession();
  return (
    <div className={`h-20 hidden md:flex px-10 items-center`}>
      <div>
        <h1 className={`text-3xl text-text`}>BookShelf</h1>
      </div>
      <div className="flex-1">
        <div className="flex justify-center h-full">
          <ul className="flex gap-x-10">
            <li className="relative cursor-pointer group text-xl text-text">
              <Link href={"/"}>
                Home
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                {path === "/" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                )}
              </Link>
            </li>
            <li className="relative cursor-pointer group text-xl text-text">
              <Link href={"#"}>
                Profile
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                {path === "/profile" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {status === "authenticated" ? (
          <button
            className="bg-extraa py-2 px-5 rounded-lg w-28 flex justify-center"
            onClick={() => signOut()}
          >
            <h1 className="text-lg">Log out</h1>
          </button>
        ) : status === "loading" ? (
          <div className="bg-extraa py-2 px-5 rounded-lg w-28 flex justify-center">
            <div className="w-7 h-7 border-4 border-t-extraa border-background rounded-full animate-spin"></div>
          </div>
        ) : (
          <button
            className="bg-extraa py-2 px-5 rounded-lg w-28 flex justify-center"
            onClick={() => signIn()}
          >
            <h1 className="text-lg">Log in</h1>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
