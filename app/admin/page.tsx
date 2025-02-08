"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import UsersTable from "../(components)/UsersTable";
import AddBook from "../(components)/AddBook";
import AdminDashboard from "../(components)/AdminDashboard";

const sections = ["Dashboard", "Users", "Add Book"];

const Admin = () => {
  const { data: session } = useSession();
  const [sectionMenu, setSectionMenu] = useState<boolean>(false);
  const [section, setSection] = useState<string>("Dashboard");
  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-2 md:p-6 space-y-4">
      <div className="flex relative">
        <button
          onClick={() => setSectionMenu((prev) => !prev)}
          className="px-5 py-3 rounded-xl bg-white shadow-lg gap-2 hover:bg-slate-50 flex items-center"
        >
          {section}
          <IoMdArrowDropdown className="size-6" />
        </button>
        <div
          className={`absolute left-1 top-12 z-10 mt-2 w-36 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 ${
            sectionMenu
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="py-1" role="none">
            {sections.map((item, i) => {
              if (section !== item)
                return (
                  <button
                    key={i}
                    className="block px-4 py-2 text-sm text-text"
                    onClick={() => {
                      setSection(item);
                      setSectionMenu(false);
                    }}
                  >
                    {item}
                  </button>
                );
            })}
          </div>
        </div>
      </div>
      {section === "Dashboard" && <AdminDashboard />}
      {section === "Users" && <UsersTable />}
      {section === "Add Book" && <AddBook />}
    </div>
  );
};

export default Admin;
