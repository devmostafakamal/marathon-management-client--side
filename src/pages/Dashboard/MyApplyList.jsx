import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const accessToken = user?.accessToken;
  const [registrations, setRegistrations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (user?.email) {
      const params = new URLSearchParams({
        email: user.email,
        ...(searchTitle.trim() && { title: searchTitle.trim() }),
      });

      axios
        .get(
          `https://marathon-management-server-eta.vercel.app/registrations?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => setRegistrations(res.data))
        .catch((err) => console.error("Error fetching registrations:", err));
    }
  }, [user, searchTitle]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://marathon-management-server-eta.vercel.app/registrations/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(() => {
            setRegistrations((prev) => prev.filter((r) => r._id !== id));
            Swal.fire("Deleted!", "Your registration was removed.", "success");
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      additionalInfo: form.additionalInfo.value,
    };

    axios
      .patch(
        `https://marathon-management-server-eta.vercel.app/registrations/${editing._id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setRegistrations((prev) =>
          prev.map((r) => (r._id === editing._id ? { ...r, ...updated } : r))
        );
        setEditing(null);
        Swal.fire("Updated!", "Registration updated successfully.", "success");
      });
  };
  // console.log(registrations);
  return (
    <>
      <Helmet>
        <title>My Applications | Dashboard</title>
      </Helmet>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mb-4"
        placeholder="Search by marathon title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">My Applied Marathons</h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r._id}>
                  <td>{r.marathonTitle}</td>
                  <td>
                    {new Date(r.marathonDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{r.contactNumber}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => setEditing(r)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Update */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 btn btn-sm"
                onClick={() => setEditing(null)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">Update Registration</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  className="input input-bordered w-full"
                  value={editing.marathonTitle}
                  readOnly
                />
                <input
                  className="input input-bordered w-full"
                  value={new Date(editing.startDate).toLocaleDateString(
                    "en-GB"
                  )}
                  readOnly
                />
                <input
                  name="firstName"
                  defaultValue={editing.firstName}
                  className="input input-bordered w-full"
                />
                <input
                  name="lastName"
                  defaultValue={editing.lastName}
                  className="input input-bordered w-full"
                />
                <input
                  name="contactNumber"
                  defaultValue={editing.contactNumber}
                  className="input input-bordered w-full"
                />
                <textarea
                  name="additionalInfo"
                  defaultValue={editing.additionalInfo}
                  className="textarea textarea-bordered w-full"
                />
                <button className="btn btn-primary w-full">Update</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyApplyList;
