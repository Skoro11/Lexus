import { fetchCampaignProducts } from "../api/userApi";
import { useState, useEffect } from "react";

export function useCampaignProducts() {
  const [flashProducts, setFlashProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function setCampaignProducts(campaign, setProducts) {
    const products = await fetchCampaignProducts(campaign);
    setProducts(products);
  }

  useEffect(() => {
    async function loadCampaigns() {
      try {
        setIsLoading(true);
        await setCampaignProducts("Flash Sales", setFlashProducts);
        await setCampaignProducts("Best Selling", setBestSelling);
        await setCampaignProducts("Explore", setExploreProducts);
      } catch (error) {
        console.log("Error loading campaigns", error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  return { flashProducts, bestSelling, exploreProducts, isLoading, error };
}
