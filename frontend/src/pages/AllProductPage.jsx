import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import RenderStars from "../components/RenderStars";
import GetTag from "../components/Tags";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useWatchlist } from "../context/ContextWatchlist";
import { useAuth } from "../context/AuthContext";

function AllProductsPage() {
  const { addToCart } = useCart();
  const { addToLike, likeList,APIlikeList} = useLike();
  const { addToWatchlist, watchlist } = useWatchlist();
  const [shouldRender, setShouldRender] = useState(false);
  const[allProduct, setAllProduct]=useState([])
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {isLoggedIn, setIsLoggedIn} = useAuth()


  useEffect(()=>{
    async function fetchData(){
      window.scrollTo(0,0)
      try{
const response = await fetch(`${API_BASE_URL}/api/product/all`,{
        method:"GET"
      })
      const data = await response.json();
      
      if(response.ok){
        setAllProduct(data.products)
      }else{
        console.log("Data not fetched")
      }
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[])


  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

 // Function to check if a product is already liked
  const isLiked = (productId) => {
     if (!isLoggedIn) {
      return likeList.some((item) => item._id === productId);
     }else if(isLoggedIn){
      return APIlikeList.some((item) => item._id === productId);
    }
  };
    const isInWatchlist = (productId) =>
    watchlist.some((item) => item._id === productId);

  return (
    <section className="mx-width-1170px mg-inline pd-in-30p pd-in-15-mb mg-top-3rem">
      <div className="heading-description">
        <span className="orange orange-span"></span>
        <div className="orange orange-text">All Items</div>
      </div>
      <h1 className="mg-top-1">All items</h1>
      <div className="flex flex-wrap space-between mg-vertical-2">
        {shouldRender &&
          allProduct.map((product) => (
            <div className="custom-card" key={product._id}>
              <div className="relative">
                <img src={product.image} alt={product.name} />

                <button
                  className=" custom-add-to-cart"
                  onClick={() => addToCart(product)}
                >
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

              <div className="product-info">
                <span className="product-name">
                  <Link to={`/product/${product._id}`}>
                      {product.name}
                  </Link>
                </span>
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
          ))}
      </div>
    </section>
  );
}

export default AllProductsPage;
