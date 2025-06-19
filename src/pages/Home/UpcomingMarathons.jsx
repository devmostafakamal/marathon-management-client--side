import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const UpcomingMarathons = () => {
  const [randomMarathons, setRandomMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMarathons = async () => {
      try {
        const response = await axios.get(
          "https://marathon-management-server-eta.vercel.app/all-marathons"
        );

        const futureMarathons = response.data.filter(
          (marathon) => new Date(marathon.startDate) > new Date()
        );

        const shuffled = [
          ...(futureMarathons.length ? futureMarathons : response.data),
        ]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        setRandomMarathons(shuffled);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMarathons();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (randomMarathons.length === 0) return <div>No marathons available.</div>;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Upcoming Marathons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {randomMarathons.map((marathon) => (
          <div key={marathon._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{marathon.title}</h3>
              <p>📍 {marathon.location}</p>
              <p>
                🗓️{" "}
                {new Date(marathon.startRegistration).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}{" "}
                -{" "}
                {new Date(marathon.endRegistration).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
              <div className="card-actions justify-end mt-2">
                <Link to={`/marathons/${marathon._id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMarathons;
