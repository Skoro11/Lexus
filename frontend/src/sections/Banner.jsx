import "../styles/Banner.css";
import Clock from "../components/Clock"; // Import Clock component

function Banner() {
  const { days, hours, minutes, seconds } = Clock();

  return (
    <div className="banner-container">
      <img src="bannerTwo.png" />
      <ul className="banner-info">
        <li className="banner-categories">Categories</li>
        <li className="banner-header">
          Enhance Your <br />
          Music Experience
        </li>
        <li>
          <div className="clock-banner">
            <span className="flexed-info-banner">
              <span className="number-banner">{days}</span>
              <span>Days</span>
            </span>
            <span className="flexed-info-banner">
              <span className="number-banner">{hours}</span>
              <span>Hours</span>
            </span>

            <span className="flexed-info-banner">
              <span className="number-banner">{minutes}</span>
              <span>Minutes</span>
            </span>
            <span className="flexed-info-banner">
              <span className="number-banner">{seconds}</span>
              <span>Seconds</span>
            </span>
          </div>
        </li>
        <li>
          
            <a className="color-white" href="/all"><button className="banner-btn">Buy Now</button></a>
        </li>
      </ul>
    </div>
  );
}

export default Banner;
