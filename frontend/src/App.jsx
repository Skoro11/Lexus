import Navbar from "./sections/Navbar";
import "./App.css";
import "./styles/Components.css"
import "./styles/CustomStyles.css"
import HeroSection from "./sections/Hero";
import Carousel from "./sections/Carousel";
import { CartProvider } from "./context/ContextCart";
import MobileLinks from "./sections/MobileLinks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { LikeProvider } from "./context/ContextLike";
import LikePage from "./pages/LikePage";
import { WatchlistProvider } from "./context/ContextWatchlist";
import WatchlistPage from "./pages/WatchlistPage";
import Footer from "./sections/Footer";
import ProductUrl from "./pages/ProductUrl";
import CarouselBestSelling from "./sections/CarouselBestSelling";
import CategorySection from "./sections/CategorySection";
import CarouselExplore from "./sections/CarouselExplore";
import Banner from "./sections/Banner";
import NewArrival from "./sections/NewArrival";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/Contact"
import AboutPage from "./pages/About";
import Services from "./sections/Services";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MobileOptions from "./pages/Options"
import AllProductsPage from "./pages/AllProductPage"
import Search from "./components/Search";
import MayLikeSection from "./sections/MayLike"
import AdminTrack from "./admin/admin";
function App() {
  return (
    <Router>
      <CartProvider>
        <LikeProvider>
          <WatchlistProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {/* <AdminPanel /> */}
                    <HeroSection />
                    <Carousel />

                    <CategorySection />
                    <CarouselBestSelling />
                    <Banner />

                    <CarouselExplore />

                    <NewArrival />
                    <Services />
                  </>
                }
              />
              <Route
                path="/like"
                element={
                  <>
                    <LikePage />
                    <WatchlistPage />
                  </>
                }
              />
              <Route
                path="/admin"
                element={
                 
                    <AdminTrack />
                  
                }
              />
              <Route path="/product/:slug/:id" element={
                <>
                
                <ProductUrl />
                <MayLikeSection />
                </>
                
                
                
                } />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={
                <><AboutPage />
                <Services />
                </>
                
            } />
            <Route path="/about" element={
                <>
                <AboutPage />
                <Services />
                </>
                
            } />
              <Route
                path="/all"
                element={
                 <>
                 <HeroSection />
                 <AllProductsPage />
                 </>
                  
                 
                }
              />
              <Route path="/search" element={Search} />
              <Route
                path="/signup"
                element={
                 
                    <SignupPage />
                 
                }
              />
              <Route
                path="/login"
                element={
                 
                    <LoginPage />
                 
                }
              />
              <Route
                path="/cart"
                element={
                 
                    <CartPage />
                 
                }
              />
              <Route
                path="/options"
                element={
                 
                    <MobileOptions />
                 
                }
              />
              

              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileLinks /> <Footer />
          </WatchlistProvider>
        </LikeProvider>
      </CartProvider>
    </Router>
  );
}
export default App;
