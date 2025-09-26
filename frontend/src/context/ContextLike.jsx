import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create Context for Like List
const LikeContext = createContext();

// LikeProvider Component to wrap the root of the app (or part of the component tree)
export const LikeProvider = ({ children }) => {
  const [likeList, setLikeList] = useState([]);

  // Load like list from localStorage when the component mounts
  useEffect(() => {
    const storedLikeList = JSON.parse(localStorage.getItem("likeList"));
    if (storedLikeList) {
      setLikeList(storedLikeList);
    }
  }, []);

  // Update localStorage whenever the likeList changes
  useEffect(() => {
    if (likeList.length > 0) {
      localStorage.setItem("likeList", JSON.stringify(likeList));
    } else {
      localStorage.removeItem("likeList"); // Remove from localStorage if like list is empty
    }
  }, [likeList]);

  // Add product to the like list or remove it if already present
  async function addToLike(product) {
    const existingProduct = likeList.find((item) => item._id === product._id);

    if (existingProduct) {
      // If the product is already liked, remove it from the like list
      setLikeList(likeList.filter((item) => item._id !== product._id));
    } else {
      // Add the product to the like list
      setLikeList([...likeList, product]);
    }
  }

  // Function to remove all items from the likeList
  const clearAllLikes = () => {
    setLikeList([]);
  };

  // Get total items count in the like list
  const getLikeItemsCount = () => {
    return likeList.length;
  };
  return (
    <LikeContext.Provider
      value={{
        likeList,
        addToLike,
        getLikeItemsCount,
        clearAllLikes,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
// Custom hook to access the Like context
export const useLike = () => {
  return useContext(LikeContext);
};

LikeProvider.propTypes = {
  children: PropTypes.array,
};
