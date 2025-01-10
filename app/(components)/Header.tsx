"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenu } from "react-icons/hi";

const Header = () => {
  const path = usePathname();
  const { data: session, status } = useSession();
  const [menu, setMenu] = useState<boolean>(false);
  const menuToggle = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <div className={`h-20 flex md:hidden px-5 items-center justify-between`}>
        <Link href={"/"}>
          <h1 className={`text-2xl text-text`}>BookShelf</h1>
        </Link>
        <div onClick={menuToggle}>
          <HiMenu className="size-7" />
        </div>
        <div
          className={`absolute right-5 top-14 z-10 mt-2 w-36 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 ${
            menu
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="py-1" role="none">
            <Link
              href={"/books"}
              className="block px-4 py-2 text-sm text-text"
              onClick={menuToggle}
            >
              Books
            </Link>
            <hr />
            {status === "authenticated" ? (
              <>
                <Link
                  href={"#"}
                  className="block px-4 py-2 text-sm text-text"
                  onClick={menuToggle}
                >
                  Profile
                </Link>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-extraa"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-extraa"
                  onClick={() => signIn()}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`h-20 hidden md:flex px-5 items-center justify-between`}>
        <div>
          <h1 className={`text-3xl text-text`}>BookShelf</h1>
        </div>

        <div className="flex items-center h-full pl-36">
          <ul className="flex gap-x-5">
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
              <Link href={"/books"}>
                Books
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                {path === "/books" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                )}
              </Link>
            </li>
            {session?.user.role === "admin" && (
              <li className="relative cursor-pointer group text-xl text-text">
                <Link href={"#"}>
                  Admin
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                  {path === "/admin" && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                  )}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          {status === "authenticated" ? (
            <>
              <div
                onClick={menuToggle}
                className="py-2 px-5 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-300"
              >
                <Image
                  src={session.user.image!}
                  alt={session.user.name!}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-sm">{session.user.name}</h1>
                  <h1 className="text-xs">{session.user.email}</h1>
                </div>
                <div>
                  <IoMdArrowDropdown className="size-6" />
                </div>
              </div>
              <div
                className={`absolute right-10 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 ${
                  menu
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="py-1" role="none">
                  <Link
                    href={"#"}
                    className="block px-4 py-2 text-sm text-text"
                    onClick={menuToggle}
                  >
                    Profile
                  </Link>

                  <button
                    className="block w-full px-4 py-2 text-left text-sm text-extraa"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : status === "loading" ? (
            <div className="w-7 h-7 border-4 border-t-text border-background rounded-full animate-spin"></div>
          ) : (
            <button
              className="bg-text text-background py-2 px-5 rounded-lg w-28 flex justify-center"
              onClick={() => signIn()}
            >
              <h1 className="text-lg">Sign in</h1>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
