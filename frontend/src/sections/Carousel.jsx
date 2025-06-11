import { useRef,useEffect,useState} from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css"; // Custom CSS for styling
import Clock from "../components/Clock"; // Import Clock component
import RenderStars from "../components/RenderStars";
import GetTag from "../components/Tags";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useWatchlist } from "../context/ContextWatchlist"; // Import the watchlist context
import { useAuth } from "../context/AuthContext";
function Carousel() {
  const sliderRef = useRef(null);
  const { days, hours, minutes, seconds } = Clock();
  const { addToCart } = useCart();
  const { addToLike, likeList,APIlikeList} = useLike(); // Get `likeList` from the context to check if item is already liked
  const { addToWatchlist, watchlist } = useWatchlist(); // Get `watchlist` from the context to check if item is already in the watchlist
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
    return watchlist.some((item) => item._id === productId);
  };

  return (
    <div className="mg-top-50-sides-30-bottom-0">
      <div className="width-1170 mg-inline">
        <div className="heading-description">
          <span className="orange orange-span"></span>
          <div className="orange orange-text">Todays</div>
        </div>

        <div className="heading-section ">
          <div className="heading-clock">
            <h1>Flash Sales</h1>
            <table>
              <thead>
                <tr>
                  <th className="heading-clock">Days</th>
                  <th></th>
                  <th className="heading-clock">Hours</th>
                  <th></th>
                  <th className="heading-clock">Minutes</th>
                  <th></th>
                  <th className="heading-clock">Seconds</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="time-output">{days}</td>
                  <td className="two-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </td>
                  <td className="time-output">{hours}</td>
                  <td className="two-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </td>
                  <td className="time-output">{minutes}</td>
                  <td className="two-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </td>
                  <td className="time-output">{seconds}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="custom-arrows">
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
      <div className="slider-container carousel-wrapper-product-line">
        <Slider ref={sliderRef} {...settings}>
          {/* Dynamically map through the products */}
          {flashProduct.map((product) => (
            <div key={product._id}>
              <div className="relative">
                <img src={product.image} alt={product.name} />

                <button
                  className="addTo-cart"
                  onClick={() => {
                    addToCart(product); // Add the product to the cart
                  }}
                >
                  Add To Cart
                </button>

                <div className="product-tag">{GetTag(product.tag)}</div>
                {/* Image based Like button */}
                <img
                  src={
                    isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"
                  } // Replace with your icon paths
                  className="like-icon"
                  onClick={() => {
                    addToLike(product); // This will add or remove from the like list
                  }}
                  style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
                />

                {/* Watchlist button */}
                <img
                  src={
                    isInWatchlist(product._id)
                      ? "eye-fill.png" // Icon for "Remove from Watchlist"
                      : "eye-empty.png" // Icon for "Add to Watchlist"
                  }
                  className="watchlist-icon"
                  onClick={() => {
                    addToWatchlist(product); // This will add or remove from the watchlist
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <div className="product-info mg-inline">
                <span className="product-name">
                  <Link to={`/product/${product._id}`}>
                      {product.name}
                  </Link>
                </span>
                <p className="product-description">
                  <span className="full-price">{product.price}$</span>
                  <span className="discounted-price">
                    {product.discountedPrice}
                  </span>
                </p>
                <div className="stars">
                  <RenderStars stars={product.stars} />
                  <span className="reviews-number">{`(${product.numOfReviews})`}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <a href="/all"><button className="view-all">View all</button></a>

      <div  className="item-list">
        {flashProduct.map((product) => (
          <div key={product.id}>
            <div className="relative">
              <img src={product.image} alt={product.name} />
              {/* Add onClick handler for "Add to Cart" button */}
              <button
                className="addTo-cart"
                onClick={() => {
                  addToCart(product); // Add the product to the cart
                }}
              >
                Add To Cart
              </button>

              <div className="product-tag">{GetTag(product.tag)}</div>
              {/* Image based Like button */}
              <img
                src={isLiked(product.id) ? "heart-fill.png" : "heart-empty.png"} // Replace with your icon paths
                className="like-icon"
                onClick={() => {
                  addToLike(product); // This will add or remove from the like list
                }}
                style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
              />

              {/* Watchlist button */}
              <img
                src={
                  isInWatchlist(product.id)
                    ? "eye-fill.png" // Icon for "Remove from Watchlist"
                    : "eye-empty.png" // Icon for "Add to Watchlist"
                }
                className="watchlist-icon"
                onClick={() => {
                  addToWatchlist(product); // This will add or remove from the watchlist
                }}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="product-info">
              <span className="product-name">
                <a href={`/product/${product.slug}/${product.id}`}>
                  {product.name}
                </a>
              </span>
              <p className="product-description">
                <span className="full-price">{product.price}$</span>
                <span className="discounted-price">
                  {product.discountedPrice}
                </span>
              </p>
              <div className="stars">
                <RenderStars stars={product.stars} />
                <span className="reviews-number">{`(${product.numOfReviews})`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
