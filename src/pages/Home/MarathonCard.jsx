import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function MarathonCard() {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        const response = await axios.get(
          "https://marathon-management-server-eta.vercel.app/marathons"
        ); // Changed to GET
        setMarathons(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, []);

  if (loading) return <div>Loading marathons...</div>;
  if (error) return <div>Error: {error}</div>;

  // console.log(marathons);

  return (
    <>
      <h2 className="text-3xl font-bold text-center mt-8">Marathon Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-12 mt-12">
        {marathons.map((marathon) => (
          <div key={marathon._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-[220px] object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{marathon.title}</h2>
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

              <div className="card-actions justify-end">
                <Link to={`/marathons/${marathon._id}`}>
                  <button className="btn btn-primary">See Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MarathonCard;
