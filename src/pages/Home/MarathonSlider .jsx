import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MarathonSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Run for a Cause",
      description:
        "Join our charity marathon and help make a difference in your community.",
      buttonText: "Explore Events",
      image: "/assets/istockphoto-slider2.jpg", // Replace with your real image path
    },
    {
      id: 2,
      title: "Challenge Yourself",
      description:
        "Push your limits in this year’s most exciting city marathon.",
      buttonText: "Register Now",
      image: "/assets/istockphoto-girl.jpg",
    },
    {
      id: 3,
      title: "Celebrate Fitness",
      description:
        "Experience the joy of running and meet passionate athletes.",
      buttonText: "View Details",
      image: "/assets/istockphoto-slider3.jpg",
    },
  ];

  return (
    <>
      <h2 className="text-4xl font-bold mt-10 text-center">Marathon Slider</h2>
      <div className="relative mt-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-[400px] w-full md:h-[500px] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Content */}
                <div className="relative z-10 text-white text-center px-4">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MarathonSlider;
