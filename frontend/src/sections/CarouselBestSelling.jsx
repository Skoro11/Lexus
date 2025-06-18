import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RenderStars from "../components/RenderStars";
import GetTag from "../components/Tags";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useWatchlist } from "../context/ContextWatchlist";
import {Link} from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext";
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function CarouselBestSelling() {
  const sliderRef = useRef(null);
  const componentRef = useRef(null);
  const { addToCart } = useCart();
  const { addToLike, likeList,APIlikeList} = useLike();
  const { addToWatchlist, watchlist,APIwatchList } = useWatchlist();
  const [bestSellingProduct, setBestSellingProduct]=useState([])
  const {isLoggedIn, setIsLoggedIn} = useAuth()


  useEffect(()=>{
    async function fetchData(){

      const response= await fetch(`${API_BASE_URL}/api/product/best_selling`,{
      method:"GET"
      })

      const data = await response.json()

      if(response.status===200){
        console.log()
       setBestSellingProduct(data.bestSellingProducts)

      }else{
        console.log("Data was not fetched")
      }
    }

    fetchData()
  },[])



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    swipe: true,
    touchMove: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 425, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  const handlePrev = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();
  

   // Function to check if a product is already liked
  const isLiked = (productId) => {
     if (isLoggedIn) {
      return APIlikeList.some((item) => item._id === productId);
      
     }else{
      return likeList.some((item) => item._id === productId);
    }
  };
    const isInWatchlist = (productId) => {
     if (isLoggedIn) {
      return APIwatchList.some((item) => item._id === productId);
      
     }else{
      return watchlist.some((item) => item._id === productId);
    }
  };






  return (
    <div ref={componentRef} className="mg-top-50-sides-30-bottom-0">
      <div className="width-1170 mg-inline">
        <div className="heading-description">
          <span className="orange orange-span"></span>
          <div className="orange orange-text">This Month</div>
        </div>

        <div className="heading-section">
          <div className="heading-clock">
            <h1>Best Selling</h1>
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

      <div className="slider-container carousel-wrapper-product-line">
        <Slider ref={sliderRef} {...settings}>
          {bestSellingProduct.length > 0 ? (
            bestSellingProduct.map((product) => (
              <div key={product._id}>
                <div className="relative">
                  <img src={product.image} alt={product.name} />
                  <button className="addTo-cart" onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
                  <div className="product-tag">{GetTag(product.tag)}</div>
                  <img
                    src={isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"}
                    className="like-icon"
                    onClick={() => addToLike(product)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={isInWatchlist(product._id) ? "eye-fill.png" : "eye-empty.png"}
                    className="watchlist-icon"
                    onClick={() => addToWatchlist(product)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="product-info mg-inline">
                  <span className="product-name">
                  <Link to={`/product/${product._id}`}>
                      {product.name}
                  </Link>                  </span>
                  <p className="product-description">
                    <span className="full-price">{product.price}$</span>
                    <span className="discounted-price">{product.discountedPrice}</span>
                  </p>
                  <div className="stars">
                    <RenderStars stars={product.stars} />
                    <span className="reviews-number">{`(${product.numOfReviews})`}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Slider>
      </div>

      <a href="/all">
        <button className="view-all">View all</button>
      </a>
    </div>
  );
}

export default CarouselBestSelling;
