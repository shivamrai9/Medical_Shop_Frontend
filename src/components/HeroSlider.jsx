import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "https://zeelabpharmacy.com/public/img/Upload_note.png",
    title: "Fast Delivery on Medicines",
    subtitle: "Get your prescriptions at your doorstep",
  },
  {
    image:
      "https://assets.aboutamazon.com/dims4/default/c2b8cfb/2147483647/strip/true/crop/2000x1000+0+63/resize/1200x600!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fa3%2Fc2%2F5c0b93db41d789be1bec015003bd%2Fpharmacy-hero-2000x1125.jpg",
    title: "Up to 30% Off on Health Products",
    subtitle: "Daily essentials at unbeatable prices",
  },
  {
    image: "https://zeelabpharmacy.com/public/img/Substitutes.png",
    title: "24/7 Online Pharmacy",
    subtitle: "Your health, our priority",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="w-full h-60 lg:h-72 bg-gray-100 dark:bg-gray-800">
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
