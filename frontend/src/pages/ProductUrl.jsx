import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/ContextCart";
import { useLike } from "../context/ContextLike";
import { useAuth } from "../context/AuthContext";
import Carousel from "../components/Carousel";
import axios from "axios";
function ProductUrl() {
  const { id } = useParams(); // Get slug and id from the URL
  const [product, setProduct] = useState([]); // State to hold the product data
  const { addToCart } = useCart();
  const { addToLike, likeList, APIlikeList } = useLike();
  const [allProducts, setAllProducts] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Function to check if a product is already liked
  const isLiked = (productId) => {
    if (!isLoggedIn) {
      return likeList.some((item) => item._id === productId);
    } else if (isLoggedIn) {
      return APIlikeList.some((item) => item._id === productId);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const responseAll = await axios.get(`${API_BASE_URL}/api/product/all`);
        const response = await axios.get(`${API_BASE_URL}/api/product/${id}`);

        const data = response.data;
        const dataAll = responseAll.data;
        console.log(dataAll);

        if (response) {
          setProduct(data.product);
          setAllProducts(dataAll.products);
        } else {
          console.log({
            message: "This data was a response",
            data: data.IdItem[0],
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <section className="my-12  ">
      <div className="mx-8">
        <div className="max-w-[1170px] mx-auto md:flex justify-between ">
          <div className="hidden md:flex flex-col w-1/10 justify-between">
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
            <img src={product.image} alt={product.name} />
          </div>
          <div className="max-h-100 md:ml-5 md:w-1/3">
            <img
              className="max-h-100 h-full w-full "
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="md:w-3/7">
            <div className="flex justify-between items-center">
              <h2 className="mt-5 md:mt-0 text-2xl">{product.name}</h2>
              <img
                className="mt-5 md:mt-0"
                src={
                  isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"
                }
                onClick={() => addToLike(product)}
                style={{ cursor: "pointer" }}
                alt="like"
              />
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < product.stars ? "full-star.png" : "empty-star.png"
                  }
                  alt="star"
                />
              ))}
              ({product.numOfReviews}) |{" "}
              <span className="pl-1 text-green-600">In Stock</span>
            </div>
            <div className="text-2xl">{product.price}$</div>
            <div className="mb-2">{product.description}</div>

            <div>
              <button
                className="bg-black text-white rounded py-2 px-4 mb-2 pointer hover:opacity-50 hover-change"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
            <div>
              <div className="hidden lg:block border rounded ">
                <div className="md:flex py-2 pl-4 underline-one items-center">
                  <img src="delivery.png" alt="delivery" />
                  <div>
                    <span>Free Delivery</span>
                    <br />
                    <span className="text-xs">
                      Enter your postal code for Delivery Availability
                    </span>
                  </div>
                </div>

                <div className=" md:flex py-2 pl-4  items-center">
                  <img src="return.png" alt="return" />
                  <div>
                    <span>Return Delivery</span>
                    <br />
                    <span className="text-xs">
                      Free 30 Days Delivery Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Carousel
        title="Recommended for You"
        main="Trending now"
        component={""}
        products={allProducts}
      />
    </section>
  );
}

export default ProductUrl;
