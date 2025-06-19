import React, { useEffect, useState, use } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const MarathonRegister = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const accessToken = user?.accessToken;
  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://marathon-management-server-eta.vercel.app/marathons/${id}`)
      .then((res) => {
        setMarathon(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load marathon", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newRegistration = {
      marathonId: id,
      marathonTitle: marathon.title,
      marathonDate: marathon.marathonDate,
      userEmail: user?.email,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contactNumber: form.contactNumber.value,
      additionalInfo: form.additionalInfo.value,
    };

    try {
      // 1. Save the registration
      await axios.post(
        "https://marathon-management-server-eta.vercel.app/registrations",
        newRegistration,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 2. Increment the marathon's total registration count
      await axios.patch(
        `https://marathon-management-server-eta.vercel.app/marathons/${id}/increment`
      );

      Swal.fire("Success!", "You have successfully registered!", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to register. Try again.", "error");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!marathon) return <p className="text-red-500">Marathon not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Register for {marathon.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Readonly fields */}
        <input
          type="email"
          className="input input-bordered w-full"
          value={user?.email ?? ""}
          readOnly
        />
        <input
          type="text"
          className="input input-bordered w-full"
          value={marathon?.title ?? ""}
          readOnly
        />
        <input
          type="text"
          className="input input-bordered w-full"
          value={
            marathon?.marathonDate
              ? new Date(marathon.marathonDate).toLocaleDateString()
              : ""
          }
          readOnly
        />

        {/* Editable fields */}
        <input
          type="text"
          name="firstName"
          className="input input-bordered w-full"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          className="input input-bordered w-full"
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="contactNumber"
          className="input input-bordered w-full"
          placeholder="Contact Number"
          required
        />
        <textarea
          name="additionalInfo"
          className="textarea textarea-bordered w-full"
          placeholder="Additional Info"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default MarathonRegister;
