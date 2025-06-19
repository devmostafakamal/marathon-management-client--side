import React from "react";

function TrainingResources() {
  const trainingResources = [
    {
      id: 1,
      title: "5 Essential Tips for Your First Marathon",
      excerpt:
        "Learn how to pace yourself, hydrate properly, and avoid hitting the wall.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400",
      link: "/blog/first-marathon-tips",
      category: "Beginner's Guide",
    },
    {
      id: 2,
      title: "Nutrition Plan for Marathon Runners",
      excerpt:
        "Carb-loading strategies and race-day meal timing for optimal performance.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
      link: "/blog/marathon-nutrition",
      category: "Nutrition",
    },
    {
      id: 3,
      title: "Injury Prevention Exercises",
      excerpt:
        "Strengthen key muscles to avoid common running injuries like IT band syndrome.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      link: "/blog/injury-prevention",
      category: "Fitness",
    },
  ];
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Training Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainingResources.map((resource) => (
          <div key={resource.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={resource.image}
                alt={resource.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{resource.title}</h3>
              <p>{resource.excerpt}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingResources;
