import Navbar from "./sections/Navbar";
import HeroSection from "./sections/Hero";
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
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import Services from "./sections/Services";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MobileOptions from "./pages/Options";
import AllProductsPage from "./pages/AllProductPage";
import Test from "./test";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <LikeProvider>
            <WatchlistProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/like"
                  element={
                    <>
                      <LikePage />
                      <WatchlistPage />
                    </>
                  }
                />
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/product/:id" element={<ProductUrl />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/about"
                  element={
                    <>
                      <AboutPage />
                      <Services />
                    </>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <>
                      <AboutPage />
                      <Services />
                    </>
                  }
                />
                <Route
                  path="/all"
                  element={
                    <>
                      <HeroSection />
                      <AllProductsPage />
                    </>
                  }
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/options" element={<MobileOptions />} />
                <Route path="/test" element={<Test />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileLinks /> <Footer />
            </WatchlistProvider>
          </LikeProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
