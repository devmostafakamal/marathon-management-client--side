import axios from "axios";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router";

function MarathonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarathon = async () => {
      try {
        const response = await axios.get(
          `https://marathon-management-server-eta.vercel.app/marathons/${id}`
        );
        setMarathon(response.data);
      } catch (err) {
        setError("Failed to fetch marathon details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarathon();
  }, [id]);
  const getRemainingTimeInSeconds = () => {
    const marathonStart = new Date(marathon.marathonDate).getTime();
    const now = new Date().getTime();
    const difference = Math.floor((marathonStart - now) / 1000);
    return difference > 0 ? difference : 0;
  };

  const isRegistrationOpen = () => {
    if (!marathon) return false;
    const now = new Date();
    const start = new Date(marathon.startRegistration);
    const end = new Date(marathon.endRegistration);
    return now >= start && now <= end;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <>
      <Helmet>{/* <title>{Marathon }</title> */}</Helmet>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
        <img
          src={marathon.image}
          alt={marathon.title}
          className="rounded-lg mb-4 w-full max-h-[400px] object-cover"
        />
        <h2 className="text-3xl font-bold mb-2">{marathon.title}</h2>
        <p className="text-gray-700 mb-2">{marathon.description}</p>
        <p>
          <strong>Location:</strong> {marathon.location}
        </p>
        <p>
          <strong>Distance:</strong> {marathon.distance}
        </p>

        <p>
          🗓️{" "}
          {new Date(marathon.startRegistration).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          -{" "}
          {new Date(marathon.endRegistration).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="mt-2">
          <strong>Marathon Date:</strong>{" "}
          {new Date(marathon.marathonDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="mt-2 font-semibold">
          Total Registered: {marathon.totalRegistrationCount}
        </p>

        {isRegistrationOpen() ? (
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate(`/register/${marathon._id}`)}
          >
            Register Now
          </button>
        ) : (
          <p className="mt-4 text-red-500 font-semibold">
            Registration is closed.
          </p>
        )}
      </div>
      <div className="my-6 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Countdown to Marathon Start
        </h3>
        <div className="flex items-center justify-center">
          <CountdownCircleTimer
            isPlaying
            duration={getRemainingTimeInSeconds()} // total seconds
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
            size={180}
            strokeWidth={12}
          >
            {({ remainingTime }) => {
              const days = Math.floor(remainingTime / (60 * 60 * 24));
              const hours = Math.floor((remainingTime % (60 * 60 * 24)) / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);

              return (
                <div>
                  <div className="text-lg font-bold">
                    {days}d {hours}h {minutes}m
                  </div>
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>
      </div>
    </>
  );
}

export default MarathonDetails;
