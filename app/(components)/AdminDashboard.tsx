import React, { useEffect, useState } from "react";
import { getCount, getRequests } from "../api/api";
import { borrow } from "../interface";
import Pagination from "./Pagination";

const AdminDashboard = () => {
  const [requests, setRequests] = useState<borrow[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    const fetchReqCount = async () => {
      const res = await getCount("requests");
      if (res.status === 200) {
        if ("data" in res) {
          setMaxPage(Math.ceil(Number(res.data[0].count) / limit));
        }
      }
    };
    fetchReqCount();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await getRequests(limit, page);
      if (res?.status === 200) {
        setRequests(res.data);
      }
    };
    fetchRequests();
  }, [page]);

  return (
    <div>
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="bg-text text-background text-md tracking-wide text-left">
            <tr>
              <th className="p-2">id</th>
              <th className="p-2">Name</th>
              <th className="p-2 hidden md:table-cell">Email</th>
              <th className="p-2 hidden md:table-cell">Book</th>
              <th className="p-2">Copies</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="p-2">{request.id}</td>
                <td className="p-2">{request.user_details?.name}</td>
                <td className="p-2 hidden md:table-cell">
                  {request.user_details?.email}
                </td>
                <td className="p-2 hidden md:table-cell">
                  {request.book_details?.title}
                </td>
                <td className="p-2">{request.book_details?.copies}</td>
                <td className="p-2">
                  <button className="bg-green-300 rounded-md w-fit px-2 py-1">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} setPage={setPage} maxPage={maxPage} />
      </div>
    </div>
  );
};

export default AdminDashboard;
