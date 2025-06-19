import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext);
  const accessToken = user?.accessToken;
  const [marathons, setMarathons] = useState([]);
  const [editingMarathon, setEditingMarathon] = useState(null);
  // console.log(user.accessToken);

  // Fetch user's marathons
  useEffect(() => {
    if (user?.email && accessToken) {
      axios
        .get(
          `https://marathon-management-server-eta.vercel.app/my-marathons?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => setMarathons(res.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [user, accessToken]);

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://marathon-management-server-eta.vercel.app/marathons/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then(() => {
            setMarathons(marathons.filter((m) => m._id !== id));
            Swal.fire("Deleted!", "Marathon has been deleted.", "success");
          });
      }
    });
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      location: form.location.value,
      distance: form.distance.value,
    };

    axios
      .patch(
        `https://marathon-management-server-eta.vercel.app/marathons/${editingMarathon._id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setMarathons((prev) =>
          prev.map((m) =>
            m._id === editingMarathon._id ? { ...m, ...updated } : m
          )
        );
        setEditingMarathon(null);
        Swal.fire("Updated!", "Marathon has been updated.", "success");
      });
  };

  return (
    <>
      <Helmet>
        <title>My Marathon List | Dashboard</title>
      </Helmet>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">My Marathons</h2>
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.location}</td>
                  <td>{m.distance}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => setEditingMarathon(m)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {editingMarathon && (
          <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 btn btn-xs"
                onClick={() => setEditingMarathon(null)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">Update Marathon</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  name="title"
                  defaultValue={editingMarathon.title}
                  className="input input-bordered w-full"
                />
                <input
                  name="location"
                  defaultValue={editingMarathon.location}
                  className="input input-bordered w-full"
                />
                <input
                  name="distance"
                  defaultValue={editingMarathon.distance}
                  className="input input-bordered w-full"
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

export default MyMarathonList;
