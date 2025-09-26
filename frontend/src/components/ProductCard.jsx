// ProductCard.jsx
import { Link } from "react-router-dom";
import RenderStars from "./RenderStars";
import GetTag from "./Tags";

export default function ProductCard({
  product,
  addToCart,
  addToLike,
  isLiked,
  addToWatchlist,
  isInWatchlist,
}) {
  return (
    <div className="group relative w-11/12 mx-auto bg-gray-100 rounded-xl p-4 md:p-10">
      <Link to={`/product/${product._id}`}>
        <img
          className="w-full h-auto rounded-lg object-cover"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <button
        className="absolute bottom-0 left-0 w-full hidden lg:block py-4 bg-black text-white cursor-pointer rounded"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>

      <div className="absolute top-1/12 left-1/12">{GetTag(product.tag)}</div>

      <button
        className="absolute top-3 right-5 p-1.5 rounded-2xl bg-white hover:opacity-50 cursor-pointer"
        onClick={() => addToLike(product)}
        aria-label={isLiked(product._id) ? "Remove from liked" : "Add to liked"}
      >
        <img
          src={isLiked(product._id) ? "heart-fill.png" : "heart-empty.png"}
          alt=""
        />
      </button>

      <button
        className="absolute top-10 right-3.5 p-2 rounded-2xl bg-transparent hover:opacity-50 cursor-pointer"
        onClick={() => addToWatchlist(product)}
        aria-label={
          isInWatchlist(product._id)
            ? "Remove from watchlist"
            : "Add to watchlist"
        }
      >
        <img
          src={isInWatchlist(product._id) ? "eye-fill.png" : "eye-empty.png"}
          alt=""
        />
      </button>

      <div className="mt-2 w-[93%] mx-auto">
        <Link className="block truncate" to={`/product/${product._id}`}>
          {product.name}
        </Link>
        <p>
          <span className="text-[#db4444]">{product.price}$</span>{" "}
          <span className="line-through opacity-50">
            {product.discountedPrice}
          </span>
        </p>
        <div className="flex items-center">
          <RenderStars stars={product.stars} />
          <span className="opacity-50">({product.numOfReviews})</span>
        </div>
      </div>
    </div>
  );
}
