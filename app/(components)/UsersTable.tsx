"use client";
import React, { useEffect, useState } from "react";
import { user } from "../interface";
import { getUsers, updateUser } from "../api/api";
import { CustomModal } from "./CustomModal";

const UsersTable = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<user>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const users = await getUsers();
      if (users.status === 200) {
        if ("data" in users) {
          setUsers(users.data);
          setLoading(false);
        }
      }
    };
    fetchUsers();
  }, []);

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
    <div>
      <div className="overflow-auto">
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
