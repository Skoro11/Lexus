import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Hero() {
  const settings = {
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <section className=" p-0 lg:py-0 lg:px-7.5 mx-auto flex max-w-[1230px]">
      {/* Left Section */}
      <div className="hidden lg:block text-left w-1/5 border-r border-[#02020226] pt-8">
        <ul>
          <li className="lg:mb-1 xl:mb-3">
            <a href="/all" className="pointer hover:opacity-70">
              Womens Fashion
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Mens Fashion
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Electronics
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Home & Kitchen
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Beauty & Personal Care
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Sports & Outdoors
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Toys & Games
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Health & Wellness
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Books & Stationery
            </a>
          </li>
          <li className="lg:mb-1 xl:mb-3 ">
            <a href="/all" className="pointer hover:opacity-70">
              Jewelry & Accessories
            </a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="lg:pt-9 lg:pl-10 relative w-full">
        <div className="md:hidden overflow-hidden">
          <Slider {...settings}>
            <div>
              <img src="sofa.jpg" alt="Image 1" className="w-full" />
            </div>
            <div>
              <img src="laptop.jpg" alt="Image 2" className="w-full " />
            </div>
            <div>
              <img src="item.jpg" alt="Image 3" className="w-full " />
            </div>
          </Slider>
        </div>
        <div className="hidden md:block relative">
          <img
            src="Hero-bg.png"
            alt="Hero"
            className="rounded-xl md:rounded-none md:w-full md:object-cover"
          />
          <div className="hidden md:block absolute text-white top-[44%] text-4xl left-[7%]">
            Up to 10% <br></br>off Voucher
          </div>
          <div className="hidden md:flex items-center border-b-white absolute  bottom-[11%] left-[7%] py-2 pointer">
            <a className="text-white" href="/all">
              Shop Now{" "}
            </a>
            <img src="arrow-icon.png" alt="Arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
