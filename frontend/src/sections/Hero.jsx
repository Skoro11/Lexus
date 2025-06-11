// Hero.js
import "../styles/Hero.css";
import arrowIcon from "../assets/icons/arrow-icon.png";

function Hero() {
  return (
    <section className="hero">
      {/* Left Section */}
      <div className="hero__left">
        <ul>
          <li>
            <a href="/all">Womens Fashion</a>
          </li>
          <li>
            <a href="/all">Mens Fashion</a>
          </li>
          <li>
            <a href="/all">Electronics</a>
          </li>
          <li>
            <a href="/all">Home & Kitchen</a>
          </li>
          <li>
            <a href="/all">Beauty & Personal Care</a>
          </li>
          <li>
            <a href="/all">Sports & Outdoors</a>
          </li>
          <li>
            <a href="/all">Toys & Games</a>
          </li>
          <li>
            <a href="/all">Health & Wellness</a>
          </li>
          <li>
            <a href="/all">Books & Stationery</a>
          </li>
          <li>
            <a href="/all">Jewelry & Accessories</a>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="hero__right">
        <div className="hero__image-container">
          <img src="Hero-bg.png" alt="Hero" className="hero__image" />
          <div className="hero__text">
            Up to 10% <br></br>off Voucher
          </div>
          <div className="hero__shop-now">
            <a className="color-white" href="/all">Shop Now </a>
            <img src="../assets/icons/arrow-icon.png" alt="Arrow" className="arrow__icon" />
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Hero;
