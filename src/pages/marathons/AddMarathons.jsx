import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet-async";

function AddMarathons() {
  const { user } = use(AuthContext);
  const [startReg, setStartReg] = useState(null);
  const [endReg, setEndReg] = useState(null);
  const [marathonDate, setMarathonDate] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newMarathon = {
      title: data.title,
      location: data.location,
      distance: data.distance,
      description: data.description,
      image: data.image,
      startRegistration: startReg.toISOString(),
      endRegistration: endReg.toISOString(),
      marathonDate: marathonDate.toISOString(),
      createdAt: new Date().toISOString(),
      totalRegistrationCount: 0,
      createdBy: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    };

    // Send data to your Node.js/Express server
    axios
      .post(
        "https://marathon-management-server-eta.vercel.app/marathons",
        newMarathon
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Marathon created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error creating marathon",
          text: err.message,
        });
      });
  };
  return (
    <>
      <Helmet>
        <title>Add Marathon | Dashboard</title>
      </Helmet>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Create Marathon</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Marathon Title"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            required
          />

          <select
            name="distance"
            defaultValue=""
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Running Distance</option>
            <option value="25k">25k</option>
            <option value="10k">10k</option>
            <option value="3k">3k</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>

          <input
            type="url"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />

          <div>
            <label className="block mb-1 font-semibold">
              Start Registration Date
            </label>
            <DatePicker
              selected={startReg}
              onChange={(date) => setStartReg(date)}
              className="input input-bordered w-full"
              required
              placeholderText="Select Start Registration Date"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              End Registration Date
            </label>
            <DatePicker
              selected={endReg}
              onChange={(date) => setEndReg(date)}
              className="input input-bordered w-full"
              required
              placeholderText="Select End Registration Date"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Marathon Start Date
            </label>
            <DatePicker
              selected={marathonDate}
              onChange={(date) => setMarathonDate(date)}
              className="input input-bordered w-full"
              required
              placeholderText="Select Marathon Start Date"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddMarathons;
