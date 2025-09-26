// Components
import Carousel from "../components/Carousel";
import Clock from "../components/Clock";
import { SlickCategories } from "../components/Slick-categories";

// Sections
import Hero from "../sections/Hero";
import CategorySection from "../sections/CategorySection";
import Banner from "../sections/Banner";
import NewArrival from "../sections/NewArrival";
import Services from "../sections/Services";

import { useCampaignProducts } from "../hooks/useCampaignProducts";

export function LandingPage() {
  const { days, hours, minutes, seconds } = Clock();
  const { flashProducts, bestSelling, exploreProducts, isLoading, error } =
    useCampaignProducts();

  return (
    <section>
      <Hero />
      <SlickCategories />
      <Carousel
        title="Flash Sales"
        main="Today"
        component={<Clock />}
        products={flashProducts}
        isLoading={isLoading}
        error={error}
      />
      <CategorySection />
      <Carousel
        title="Best Selling"
        main="This Month"
        products={bestSelling}
        isLoading={isLoading}
        error={error}
      />
      <Banner />
      <Carousel
        title="Explore Our Products"
        main="Our Products"
        products={exploreProducts}
        isLoading={isLoading}
        error={error}
      />

      <NewArrival />
      <Services />
    </section>
  );
}

export default LandingPage;
