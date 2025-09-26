import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Used for the landing page to filter items based on campaign
export async function fetchCampaignProducts(campaign) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/product/search`, {
      campaign: campaign,
    });
    if (response.status === 200) {
      return response.data.products;
    }
    return [];
  } catch (error) {
    console.log("Error with Axios fetchProducts ", error.message);
    return [];
  }
}
