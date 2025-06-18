import Carousel from "../components/Carousel";
import Hero from "../sections/Hero"
import CategorySection from "../sections/CategorySection";
import Banner from "../sections/Banner";
import Services from "../sections/Services";
import NewArrival from "../sections/NewArrival";
import { useEffect,useState } from "react";
import Clock from "../components/Clock";
import axios from "axios";

export function LandingPage(){
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [flashProducts,setFlashProducts] = useState([])
    const [bestSelling,setBestSelling] = useState([])
    const [exploreProducts, setExploreProducts] = useState([])

 useEffect(()=>{
    async function fetchData(){
      try{
          const responseFlash = await axios.get(`${API_BASE_URL}/api/product/flash_sales`)
          const responseSelling = await axios.get(`${API_BASE_URL}/api/product/best_selling`)
          const responseExplore = await axios.get(`${API_BASE_URL}/api/product/explore`)

          if(responseFlash.status ===200)setFlashProducts(responseFlash.data.flashSaleProducts)
          if(responseSelling.status===200)setBestSelling(responseSelling.data.bestSellingProducts)
          if(responseExplore.status ===200)setExploreProducts(responseExplore.data.exploreProducts)
            else{
            console.log("Unsuccessful fetch")
          }
        }catch(error){
          console.log(error)
        }

         
    }
     fetchData()
  },[])




    return(

        <> 
        <Hero />
        <Carousel title="Flash Sales" main ="Today" component={<Clock />} products={flashProducts}/>
        <CategorySection />
        <Carousel title="Best Selling" main ="This Month"  products={bestSelling}/>
        <Banner />
        <Carousel title="Explore Our Products" main ="Our Products"  products={exploreProducts}/>

        <NewArrival />
        <Services />
  
        </>
    )
}

export default LandingPage;