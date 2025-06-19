import React from "react";

function FeaturedRunners() {
  const featuredRunners = [
    {
      id: 1,
      name: "Alex Morgan",
      marathon: "Tokyo International Marathon 2023",
      quote:
        "The energy was unforgettable! Perfectly organized route with stunning views of the city.",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200",
    },
    {
      id: 2,
      name: "Priya Patel",
      marathon: "Boston Marathon 2024",
      quote:
        "As a first-timer, I felt supported at every step. The crowd's cheers kept me going!",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    },
    {
      id: 3,
      name: "Carlos Mendez",
      marathon: "Berlin Marathon 2023",
      quote:
        "PB achieved! The flat course and perfect weather made all the difference.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    {
      id: 4,
      name: "Priya Patel",
      marathon: "Boston Marathon 2024",
      quote:
        "As a first-timer, I felt supported at every step. The crowd's cheers kept me going!",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    },
  ];

  return (
    <section className="my-16 bg-base-200 py-12 px-4 rounded-lg">
      {" "}
      {/* Changed to semantic <section> */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Hear From Our Runners
      </h2>
      {/* Enhanced carousel with controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
        {featuredRunners.map((runner) => (
          <div
            key={runner.id}
            className="carousel-item bg-base-100 p-6 rounded-xl shadow-md w-80 flex flex-col"
            id={`runner-${runner.id}`} // For carousel navigation
          >
            <div className="avatar mb-4 self-center">
              {" "}
              {/* Centered avatar */}
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {" "}
                {/* Larger avatar */}
                <img
                  src={runner.image}
                  alt={runner.name}
                  className="object-cover"
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <blockquote className="italic flex-grow">
              "{runner.quote}"
            </blockquote>{" "}
            {/* Flexible quote box */}
            <div className="mt-4 text-center">
              <p className="font-semibold">{runner.name}</p>
              <p className="text-sm text-gray-500">{runner.marathon}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Carousel navigation dots (optional) */}
      <div className="flex justify-center gap-2 mt-6">
        {featuredRunners.map((runner) => (
          <a
            key={runner.id}
            href={`#runner-${runner.id}`}
            className="btn btn-xs"
          >
            •
          </a>
        ))}
      </div>
    </section>
  );
}

export default FeaturedRunners;
