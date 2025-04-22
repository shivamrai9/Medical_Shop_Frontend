import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slide content
const slides = [
  {
    image: "https://zeelabpharmacy.com/public/img/Upload_note.png",
    title: "Fast Delivery on Medicines",
    subtitle: "Get your prescriptions at your doorstep",
  },
  {
    image:
      "https://www.cuyunamed.org/wp-content/uploads/2024/03/pharmacy-hero-1680x480.jpg",
    title: "Up to 30% Off on Health Products",
    subtitle: "Daily essentials at unbeatable prices",
  },
  {
    image: "https://zeelabpharmacy.com/public/img/Substitutes.png",
    title: "24/7 Online Pharmacy",
    subtitle: "Your health, our priority",
  },
];

// Custom arrows with consistent style
const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 z-10 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded-full shadow-md hover:scale-110 transition ${
      direction === "left" ? "left-4" : "right-4"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {direction === "left" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

// HeroSlider component
const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
  };

  return (
    <section className="relative w-full h-60 lg:h-72 bg-gray-100 dark:bg-gray-800">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full h-60 lg:h-72">
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-4 lg:px-20 text-white">
              <h2 className="text-lg lg:text-2xl font-bold">{slide.title}</h2>
              <p className="text-sm lg:text-base">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSlider;
