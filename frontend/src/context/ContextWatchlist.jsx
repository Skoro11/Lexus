import { createContext, useState, useContext, useEffect } from "react";
import {useAuth} from  "./AuthContext"
import axios from "axios";
// Create Context for Watchlist
const WatchlistContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// WatchlistProvider Component to wrap the root of the app (or part of the component tree)
export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [APIwatchList, setAPIwatchList] = useState([])


    useEffect(() => {
  async function getWatchItems() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/watchlist/get`, {
        withCredentials: true,
      });

      const items = response?.data?.watchlist;
      if (items && Array.isArray(items)) {
        setAPIwatchList(items);
        console.log("Fetched Watchlist Items:", items);
      } else {
        console.warn("Watched items are undefined or not an array:", items);
        setAPIwatchList([]); // fallback to empty array
      }
    } catch (error) {
      console.error("Error with fetching Watched items:", error);
      setAPIwatchList([]); // fallback to empty array on error
    }
  }

  if (isLoggedIn) {
    getWatchItems();
  }
}, [isLoggedIn]);

useEffect(() => {
    console.log("Updated APIWatchlist", APIwatchList)
}, [APIwatchList]);



  // Load watchlist from localStorage when the component mounts
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (storedWatchlist) {
      setWatchlist(storedWatchlist);
    }
  }, []);

  // Update localStorage whenever the watchlist changes
  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else {
      localStorage.removeItem("watchlist"); // Remove from localStorage if watchlist is empty
    }
  }, [watchlist]);


  // Add product to the watchlist or remove it if already present
  async function addToWatchlist(product){
    const existingProduct = watchlist.find((item) => item._id === product._id);
    const APIexistingProduct = APIwatchList.find((item)=> item._id === product._id)


    if(isLoggedIn && APIexistingProduct){
        async function removeFromWatchList(){
          const response = await axios.post(`${API_BASE_URL}/api/watchlist/remove`,
            {_id:product._id},
            {withCredentials: true,}
          )
          const data = response.data.user.watchlist
          console.log(data)
          setAPIwatchList(data)
        }
        removeFromWatchList()
    }else if(isLoggedIn){
      async function addToWatchList(){
          const response = await axios.post(`${API_BASE_URL}/api/watchlist/add`,
            {_id:product._id},
            {withCredentials:true}
          )
          const data = response.data.user.watchlist
          console.log(data)
          setAPIwatchList(data)
      }
      addToWatchList()
    }
    else if (existingProduct && !isLoggedIn) {
      // If the product is already in the watchlist, remove it
      setWatchlist(watchlist.filter((item) => item._id !== product._id));
    } else if(!isLoggedIn){
      // Add the product to the watchlist
      setWatchlist([...watchlist, product]);
    }
  };

  // Clear the entire watchlist
  const clearWatchlist = () => {
    if(isLoggedIn){
      setAPIwatchList([])
      async function removeAllFromCartAPI(){
        const response = await axios.post(`${API_BASE_URL}/api/watchlist/remove/all`,
          {},
          {withCredentials:true}
        )
        const data = response.data.user.watchlist
        console.log(data)
        setAPIwatchList(data)
      }
      removeAllFromCartAPI()
    }else{
      setWatchlist([]); 
    }// Reset the watchlist to an empty array
  };

  // Get total items count in the watchlist
  const getWatchlistItemsCount = () => {
    if(isLoggedIn){
      return APIwatchList.length
    }else{
        return watchlist.length;
    } // Return the count of items in the watchlist
  };

  return (
    <WatchlistContext.Provider
      value={{
        APIwatchList,
        watchlist,
        addToWatchlist,
        clearWatchlist,
        getWatchlistItemsCount,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to access the Watchlist context
export const useWatchlist = () => {
  return useContext(WatchlistContext);
};
