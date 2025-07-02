import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RenderStars from "../components/RenderStars";
import GetTag from "../components/Tags";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useWatchlist } from "../context/ContextWatchlist";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
function AllProductsPage() {
  const { addToCart } = useCart();
  const { addToLike, likeList, APIlikeList } = useLike();
  const { addToWatchlist, watchlist, APIwatchList } = useWatchlist();
  const [shouldRender, setShouldRender] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function fetchData() {
      window.scrollTo(0, 0);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/product/all`);
        if (response.status === 200) {
          setAllProduct(response.data.products);
        } else {
          console.log("Data not fetched");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
    } else if (isLoggedIn) {
      return APIlikeList.some((item) => item._id === productId);
    }
  };
  const isInWatchlist = (productId) => {
    if (isLoggedIn) {
      return APIwatchList.some((item) => item._id === productId);
    } else {
      return watchlist.some((item) => item._id === productId);
    }
  };

  return (
    <section className="mx-3 md:mt-12 md:mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className=" md:flex items-center  md:my-3">
          <span className="h-8 w-4 lg:h-10 lg:w-5 bg-[#db4444] rounded-md mr-2.5"></span>
          <div className="text-base md:text-lg lg:text-3xl font-bold ml-2 mb-2 md:mb-0">
            All Items
          </div>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-10">
          {shouldRender &&
            allProduct.map((product) => (
              <div key={product._id}>
                <div className="group relative">
                  <Link to={`/product/${product._id}`}>
                    <img
                      className=" mx-auto"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>

                  <button
                    className="hidden lg:block hover-animation absolute w-full  cursor-pointer bottom-0 rounded  py-4 bg-black text-white "
                    onClick={() => {
                      addToCart(product);
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
                    className="hidden md:block absolute top-3 right-5 md:right-2 w-fit lg:top-1/12 p-1.5 rounded-2xl lg:right-6 bg-white hover:opacity-50 cursor-pointer"
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
                    className="hidden md:block absolute top-10 right-3.5 md:right-0 w-fit lg:top-15 p-2 rounded-2xl lg:right-4 cursor-pointer hover:opacity-50 bg-transparent border-none"
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

                <div className="">
                  <span className="text-xs md:text-base pt-2 block w-full my-2 truncate overflow-hidden whitespace-nowrap">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </span>
                  <p className="mb-2 text-xs md:text-base md:flex">
                    <span className="text-black md:text-[#db4444]">
                      {product.price}$
                    </span>
                    <span className=" md:pl-2 hidden md:block opacity-50 line-through">
                      {product.discountedPrice}
                    </span>
                  </p>
                  <div className="hidden md:flex items-center">
                    <RenderStars stars={product.stars} />
                    <span className="opacity-50">{`(${product.numOfReviews})`}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default AllProductsPage;
