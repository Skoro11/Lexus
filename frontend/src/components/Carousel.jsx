import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock"; // Import Clock component
import RenderStars from "./RenderStars";
import GetTag from "./Tags";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useWatchlist } from "../context/ContextWatchlist"; // Import the watchlist context
import { useAuth } from "../context/AuthContext";
import ViewAll from "./viewAll";

function Carousel({ main, title, products, component }) {
  const sliderRef = useRef(null);
  const { days, hours, minutes, seconds } = Clock();
  const { addToCart } = useCart();
  const { addToLike, likeList, APIlikeList } = useLike(); // Get `likeList` from the context to check if item is already liked
  const { addToWatchlist, watchlist, APIwatchList } = useWatchlist(); // Get `watchlist` from the context to check if item is already in the watchlist
  const [flashProduct, setFlashProduct] = useState([]);

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4, // Use dynamic scroll sensitivity
    arrows: false, // Disable default arrows
    swipe: true, // Enable swipe functionality
    touchMove: true, // Enable touch movement
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4, // Dynamic scroll on tablet
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, // Dynamic scroll on mobile
        },
      },
      {
        breakpoint: 425,
        settings: {
          speed: 500,
          dots: true,
          infinite: true,
          slidesToShow: 3,
          // Dynamic scroll on mobile
        },
      },
    ],
  };

  // Move to the previous slide
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Move to the next slide
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function to check if a product is already liked
  const isLiked = (productId) => {
    if (isLoggedIn) {
      return APIlikeList.some((item) => item._id === productId);
    } else {
      return likeList.some((item) => item._id === productId);
    }
  };

  // Function to check if a product is in the watchlist
  const isInWatchlist = (productId) => {
    if (isLoggedIn) {
      return APIwatchList.some((item) => item._id === productId);
    } else {
      return watchlist.some((item) => item._id === productId);
    }
  };

  return (
    <div className="mx-3 md:mt-12 md:mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className="hidden md:flex items-center">
          <span className="h-8 w-4 lg:h-10 lg:w-5 bg-[#db4444] rounded-md mr-2.5"></span>
          <div className=" text-[#db4444]">{main}</div>
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex md:w-3/5 justify-between lg:w-1/2 items-center py-2.5 ">
            <h1 className="text-base md:text-lg lg:text-3xl font-bold pl-1">
              {title}
            </h1>
            {component}
          </div>

          <div className="hidden lg:flex ">
            <div className="next-arrow" onClick={handlePrev}>
              <img src="arrow-black.png" alt="Next" />
            </div>
            <div className="prev-arrow" onClick={handleNext}>
              <img src="arrow-black.png" alt="Previous" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="md:hidden w-full flex flex-wrap">
          {products.map((product) => (
            <section key={product._id} className="w-1/2 ">
              <div className="m-2 relative">
                <div className="absolute top-2 left-2 bg-[var(--orange-primary)] text-white rounded-full px-1">
                  {product.tag}
                </div>
                <Link to={`/product/${product._id}`}>
                  <img
                    className="w-full rounded-xl "
                    alt="Product"
                    src={product.image}
                  />
                </Link>

                <div className="text-xs pt-2 truncate overflow-hidden whitespace-nowrap">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </div>
                <div className="text-xs">{product.price}$</div>
              </div>
            </section>
          ))}
        </div>
      </div>
      {/* Slider Container */}
      <div className="hidden md:block mx-auto max-w-[1188px]">
        <Slider ref={sliderRef} {...settings} className="hidden mb:block">
          {/* Dynamically map through the products */}
          {products.map((product) => (
            <div key={product._id}>
              <div className="group relative">
                <Link to={`/product/${product._id}`}>
                  <img
                    className="w-11/12 mx-auto"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                <button
                  className="hidden lg:block hover-animation absolute w-[93%] cursor-pointer bottom-0 rounded left-[3.5%] py-4 bg-black text-white "
                  onClick={() => {
                    addToCart(product); // Add the product to the cart
                  }}
                >
                  Add To Cart
                </button>

                <div className="absolute top-1/12 left-1/12">
                  {GetTag(product.tag)}
                </div>
                {/* Image based Like button */}
                <button
                  type="button"
                  className="absolute top-3 right-5 w-fit lg:top-6 p-1.5 rounded-2xl lg:right-9 bg-white hover:opacity-50 cursor-pointer"
                  onClick={() => addToLike(product)}
                  aria-label={
                    isLiked(product._id)
                      ? "Remove from liked products"
                      : "Add to liked products"
                  }
                >
                  <img
                    src={
                      isLiked(product._id)
                        ? "heart-fill.png"
                        : "heart-empty.png"
                    }
                    alt={
                      isLiked(product._id)
                        ? "Liked product"
                        : "Not liked product"
                    }
                    className="pointer-events-none"
                  />
                </button>

                <button
                  type="button"
                  className="absolute top-10 right-3.5 w-fit lg:top-15 p-2 rounded-2xl lg:right-7 cursor-pointer hover:opacity-50 bg-transparent border-none"
                  onClick={() => addToWatchlist(product)}
                  aria-label={
                    isInWatchlist(product._id)
                      ? "Remove from watchlist"
                      : "Add to watchlist"
                  }
                >
                  <img
                    src={
                      isInWatchlist(product._id)
                        ? "eye-fill.png"
                        : "eye-empty.png"
                    }
                    alt={
                      isInWatchlist(product._id)
                        ? "In watchlist"
                        : "Not in watchlist"
                    }
                    className="pointer-events-none"
                  />
                </button>
              </div>

              <div className="w-[93%] mx-auto">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis my-2 block">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </span>
                <p className="mb-2">
                  <span className="text-[#db4444]">{product.price}$</span>
                  <span className="pl-2 opacity-50 line-through">
                    {product.discountedPrice}
                  </span>
                </p>
                <div className="flex items-center">
                  <RenderStars stars={product.stars} />
                  <span className="opacity-50">{`(${product.numOfReviews})`}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <ViewAll />
    </div>
  );
}

export default Carousel;
