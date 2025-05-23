import { useLocation } from "react-router-dom"; // Import useLocation to access query parameters
import { useState, useEffect } from "react";
import { products } from "./Products"; // Assuming products list is available

function Search() {
  const location = useLocation(); // Get the current URL location
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Parse query params from URL
    const query = queryParams.get("query"); // Get the search term from URL
    if (query) {
      setSearchTerm(query);
      filterItems(query);
    }
  }, [location]);

  const filterItems = (query) => {
    const results = products.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);
  };

  return (
    <div className="search-page">
      <h2>Search Results</h2>
      <p>Showing results for "{searchTerm}"</p>
      <div className="search-results">
        {filteredItems.length > 0 ? (
          <ul>
            {filteredItems.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
