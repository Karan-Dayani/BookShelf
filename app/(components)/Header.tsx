"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
  console.log(path);
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
                Books
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                {path === "/books" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                )}
              </Link>
            </li>
            <li className="relative cursor-pointer group text-xl text-text">
              <Link href={"#"}>
                Support
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
                {path === "/support" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-text"></div>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button className="bg-extraa py-2 px-5 rounded-lg">
          <h1 className="text-lg">Log in</h1>
        </button>
      </div>
    </div>
  );
};

export default Header;
