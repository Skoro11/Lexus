import { createContext, useState, useContext, useEffect } from "react";
import {useAuth} from  "./AuthContext"
import axios from "axios";


// Create Context for Like List
const LikeContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// LikeProvider Component to wrap the root of the app (or part of the component tree)
export const LikeProvider = ({ children }) => {
  const [likeList, setLikeList] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [APIlikeList, setAPIlikeList] = useState([])
useEffect(() => {
  async function getLikeItems() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/likelist/get`, {
        withCredentials: true,
      });

      const items = response?.data?.likelist;
      if (items && Array.isArray(items)) {
        setAPIlikeList(items);
        console.log("Fetched Liked Items:", items);
      } else {
        console.warn("Liked items are undefined or not an array:", items);
        setAPIlikeList([]); // fallback to empty array
      }
    } catch (error) {
      console.error("Error with fetching LikeItems:", error);
      setAPIlikeList([]); // fallback to empty array on error
    }
  }

  if (isLoggedIn) {
    getLikeItems();
  }
}, [isLoggedIn]);


  useEffect(() => {
    console.log("Updated APILikeList", APIlikeList)
}, [APIlikeList]);

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
  async function addToLike(product){
    const existingProduct = likeList.find((item) => item._id === product._id);
    const APIexistingProduct = APIlikeList.find((item)=> item._id === product._id)
    console.log(existingProduct,APIexistingProduct)
    if(isLoggedIn && APIexistingProduct){
        async function removeFromLikeList(){
          const response = await axios.post(`${API_BASE_URL}/api/likelist/remove`,
            {_id:product._id},
            {withCredentials: true,}
          )
          const data = response.data.user.likelist
          console.log(data)
          setAPIlikeList(data)
        }
        removeFromLikeList()
    }else if(isLoggedIn){
      async function addToLikeList(){
          const response = await axios.post(`${API_BASE_URL}/api/likelist/add`,
            {_id:product._id},
            {withCredentials:true}
          )
          const data = response.data.user.likelist
          console.log(data)
          setAPIlikeList(data)
      }
      addToLikeList()
    }
    else if (existingProduct && !isLoggedIn) {
      // If the product is already liked, remove it from the like list
      setLikeList(likeList.filter((item) => item._id !== product._id));
    } else if(!isLoggedIn) {
      // Add the product to the like list
      setLikeList([...likeList, product]);
    }
  };

  // Get total items count in the like list
  const getLikeItemsCount = () => {
    if(isLoggedIn){
      return APIlikeList.length
    }else{
        return likeList.length;
    }
     // Just count the items in the like list, no need to sum quantities
  };

  // Function to remove all items from the likeList
  const clearAllLikes = () => {
    if(isLoggedIn){
      setAPIlikeList([])
      async function removeAllFromCartAPI(){
        const response = await axios.post(`${API_BASE_URL}/api/likelist/remove/all`,
          {},
          {withCredentials:true}
        )
        const data = response.data.user.likelist
        console.log(data)
        setAPIlikeList(data)
      }
      removeAllFromCartAPI()
    }else{
      setLikeList([]); 
    }
    // Clear the likeList state
  };

  return (
    <LikeContext.Provider
      value={{
        APIlikeList,
        likeList,
        addToLike,
        getLikeItemsCount,
        clearAllLikes, // Expose clearAllLikes function
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
