import { useRef,useEffect,useState} from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom"
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

function Carousel({main,title,products,component}) {
  const sliderRef = useRef(null);
  const { days, hours, minutes, seconds } = Clock();
  const { addToCart } = useCart();
  const { addToLike, likeList,APIlikeList} = useLike(); // Get `likeList` from the context to check if item is already liked
  const { addToWatchlist, watchlist,APIwatchList } = useWatchlist(); // Get `watchlist` from the context to check if item is already in the watchlist
  const [ flashProduct, setFlashProduct] = useState([])
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const {isLoggedIn, setIsLoggedIn} = useAuth()
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
          slidesToShow: 2,
          slidesToScroll: 2, // Dynamic scroll on mobile
        },
      },
    ],
  };

  useEffect(()=>{
    async function fetchData(){
      try{
          const response = await fetch(`${API_BASE_URL}/api/product/flash_sales`,{
            method:"GET"
          })
          
          const data = await response.json()

          if(response.ok){
            setFlashProduct(data.flashSaleProducts)
          }
          else{
            console.log("Unsuccessful fetch")
          }
        }catch(error){
          console.log(error)
        }

         
    }
     fetchData()
  },[])



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
     }else{
      return likeList.some((item) => item._id === productId);
    }
  };

  // Function to check if a product is in the watchlist
  const isInWatchlist = (productId) => {
     if (isLoggedIn) {
      return APIwatchList.some((item) => item._id === productId);
     }else{
      return watchlist.some((item) => item._id === productId);
    }
  };

  return (
    <div className="mt-12 mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className="hidden md:flex items-center">
          <span className="h-8 w-4 lg:h-10 lg:w-5 bg-[#db4444] rounded-md mr-2.5"></span>
          <div className=" text-[#db4444]">{main}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex md:w-3/5 justify-between lg:w-1/2 items-center py-2.5 ">
            <h1 className="text-base md:text-lg lg:text-3xl font-bold">{title}</h1>
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

      {/* Slider Container */}
      <div className="hidden md:block mx-auto max-w-[1188px]">
        <Slider ref={sliderRef} {...settings}>
          {/* Dynamically map through the products */}
          {products.map((product) => (
            <div key={product._id}>
              <div className="group relative">
                <Link to={`/product/${product._id}`}>
                    <img className="w-11/12 mx-auto" src={product.image} alt={product.name} />

                  </Link>

                <button
                  className="hidden lg:block hover-animation absolute w-[93%] pointer bottom-0 rounded left-[3.5%] py-4 bg-black text-white "
                  onClick={() => {
                    addToCart(product); // Add the product to the cart
                  }}
                >
                  Add To Cart
                </button>

                <div className="absolute top-1/12 left-1/12">{GetTag(product.tag)}</div>
                {/* Image based Like button */}
                <img
                  src={
                    isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"
                  } // Replace with your icon paths
                  className="absolute top-3 right-5 w-fit lg:top-6 pointer p-1.5 rounded-2xl lg:right-9 bg-white "
                  onClick={() => {
                    addToLike(product); // This will add or remove from the like list
                  }}
                />

                {/* Watchlist button */}
                <img
                  src={
                    isInWatchlist(product._id)
                      ? "eye-fill.png" // Icon for "Remove from Watchlist"
                      : "eye-empty.png" // Icon for "Add to Watchlist"
                  }
                  className="pointer absolute top-10 right-3.5 w-fit lg:top-15 p-2 rounded-2xl lg:right-7 "
                  onClick={() => {
                    addToWatchlist(product); // This will add or remove from the watchlist
                  }}
                  
                />
              </div>

              <div className="w-[93%] mx-auto">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis my-2 block">
                  <Link to={`/product/${product._id}`}>
                      {product.name}
                  </Link>
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
