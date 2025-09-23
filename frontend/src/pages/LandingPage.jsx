import Carousel from "../components/Carousel";
import Hero from "../sections/Hero";
import CategorySection from "../sections/CategorySection";
import Banner from "../sections/Banner";
import Services from "../sections/Services";
import NewArrival from "../sections/NewArrival";
import { useEffect, useState } from "react";
import Clock from "../components/Clock";
import axios from "axios";
import { SlickCategories } from "../components/Slick-categories";

export function LandingPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [flashProducts, setFlashProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);

  async function filterProducts(specialCategory, setProducts) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/product/search`, {
        specialCategory: specialCategory,
      });
      if (response.status === 200) {
        console.log("Items are fetched");
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("Error with filtering products", error.message);
    }
  }

  useEffect(() => {
    filterProducts("Flash Sales", setFlashProducts);
    filterProducts("Best Selling", setBestSelling);
    filterProducts("Explore", setExploreProducts);
  }, []);

  return (
    <section>
      <Hero />
      <SlickCategories />
      <Carousel
        title="Flash Sales"
        main="Today"
        component={<Clock />}
        products={flashProducts}
      />
      <CategorySection />
      <Carousel title="Best Selling" main="This Month" products={bestSelling} />
      <Banner />
      <Carousel
        title="Explore Our Products"
        main="Our Products"
        products={exploreProducts}
      />

      <NewArrival />
      <Services />
    </section>
  );
}

export default LandingPage;
