"use client";
import React, { useEffect, useRef, useState } from "react";
import { user } from "../interface";
import { getCount, getUsers, updateUser } from "../api/api";
import { CustomModal } from "./CustomModal";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import Pagination from "./Pagination";

const roles = ["All", "admin", "member"];

const UsersTable = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<user>();
  const [loading, setLoading] = useState<boolean>(true);
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const searchInputRef = useRef<string>("");
  const [searchTrigger, setSearchTrigger] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const limit = 15;

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const users = await getUsers(
        searchInputRef.current,
        selectedRole,
        limit,
        page
      );
      if (users.status === 200) {
        if ("data" in users) {
          setUsers(users.data);
          setLoading(false);
        }
      }
    };
    const fetchCount = async () => {
      const count = await getCount(
        "users",
        "",
        searchInputRef.current,
        selectedRole
      );
      if (count.status === 200) {
        if ("data" in count) {
          setMaxPage(Math.ceil(Number(count.data[0].count) / limit));
        }
      }
    };
    fetchCount();
    fetchUsers();
  }, [searchTrigger, selectedRole, page]);

  const handleSearch = () => {
    setSearchTrigger((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="w-full h-4 animate-pulse bg-gray-300 rounded-lg"></div>
        <div className="w-full h-4 animate-pulse bg-gray-300 rounded-lg"></div>
        <div className="w-full h-4 animate-pulse bg-gray-300 rounded-lg"></div>
        <div className="w-full h-4 animate-pulse bg-gray-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            placeholder="Search by name..."
            className="input shadow-lg border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            name="search"
            defaultValue={searchInputRef.current}
            onChange={(e) => (searchInputRef.current = e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoComplete="off"
          />
          <CiSearch
            className="size-6 absolute top-3 right-3"
            onClick={handleSearch}
          />
        </div>
        <div className="flex items-center gap-1 relative">
          <button
            className="px-5 py-3 rounded-xl bg-white shadow-lg flex items-center gap-2 hover:bg-slate-50"
            onClick={() => setFilterMenu((prev) => !prev)}
          >
            {selectedRole}
            <IoMdArrowDropdown className="size-5" />
          </button>
          <div
            className={`absolute right-1 top-12 z-10 mt-2 w-36 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 ${
              filterMenu
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="py-1" role="none">
              {roles.map((role, i) => {
                if (role !== selectedRole)
                  return (
                    <button
                      key={i}
                      className="block px-4 py-2 text-sm text-text"
                      onClick={() => {
                        setSelectedRole(role);
                        setFilterMenu(false);
                      }}
                    >
                      {role}
                    </button>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        {users.length > 0 ? (
          <>
            <table className="w-full">
              <thead className="bg-text text-background text-md tracking-wide text-left">
                <tr>
                  <th className="p-2">id</th>
                  <th className="p-2">name</th>
                  <th className="p-2 hidden md:table-cell">email</th>
                  <th className="p-2 hidden md:table-cell">since</th>
                  <th className="p-2">role</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">
                      {user.name}
                      <br />
                      <span className="md:hidden text-sm">{user.email}</span>
                    </td>
                    <td className="p-2 hidden md:table-cell">{user.email}</td>
                    <td className="p-2 hidden md:table-cell">
                      {new Date(user.membership_date).toLocaleDateString()}
                    </td>
                    <td className="p-2 w-[10%]">
                      {user.role === "admin" ? (
                        <p className="bg-red-500 w-fit text-sm text-center px-1.5 py-1 border border-red-500 bg-opacity-50 text-red-800 rounded-md">
                          Admin
                        </p>
                      ) : (
                        <p className="bg-blue-500 w-fit text-sm text-center px-1.5 py-1 border border-blue-500 bg-opacity-50 text-blue-800 rounded-md">
                          Member
                        </p>
                      )}
                    </td>
                    <td className="p-2 w-[5%]">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => {
                            setEditModal(true);
                            setSelectedUser(user);
                          }}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={page} setPage={setPage} maxPage={maxPage} />
          </>
        ) : (
          <div className="text-center">No One</div>
        )}
      </div>
      <CustomModal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="bg-background rounded-lg p-4 relative overflow-hidden">
          <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
          <div className="">
            {/* <div className="w-1/2">
              <h1>{selectedUser?.name}</h1>
              <h1>{selectedUser?.email}</h1>
            </div> */}
            <div className="absolute top-4 right-4">
              {selectedUser?.role === "admin" ? (
                <p
                  onClick={() =>
                    setSelectedUser((prev) =>
                      prev ? { ...prev, role: "member" } : undefined
                    )
                  }
                  className="cursor-pointer bg-red-500 text-sm text-center p-1 border border-red-500 bg-opacity-50 text-red-800 rounded-md"
                >
                  Admin
                </p>
              ) : (
                <p
                  onClick={() =>
                    setSelectedUser((prev) =>
                      prev ? { ...prev, role: "admin" } : undefined
                    )
                  }
                  className="cursor-pointer bg-blue-500 text-sm text-center p-1 border border-blue-500 bg-opacity-50 text-blue-800 rounded-md"
                >
                  Member
                </p>
              )}
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() =>
                  updateUser(
                    selectedUser?.id as number,
                    selectedUser?.role as string
                  )
                }
                className="bg-green-500 bg-opacity-50 border border-green-500 text-text p-1 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default UsersTable;
