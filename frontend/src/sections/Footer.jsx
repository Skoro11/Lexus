import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container flex">
        <ul>
          <li className="footer-heading footer-list-item">Lexus</li>
          <li className="footer-list-item">Subscribe</li>
          <li className="footer-list-item">Get 10% off your first order</li>
          <li className="footer-list-item input-container">
            <input className="email-input" placeholder="Enter your Email" />
            <img className="send-image" src="send.png" alt="send arrow" />
          </li>
        </ul>
        <ul>
          <li className="footer-heading footer-list-item">Support</li>
          <li className="footer-list-item">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </li>
          <li className="footer-list-item">lexus@gmail.com</li>
          <li className="footer-list-item">+88015-88888-9999</li>
        </ul>
        <ul className="vanish">
          <li className="footer-heading footer-list-item">Account</li>
          <li className="footer-list-item">My Account</li>
          <li className="footer-list-item">Login / Register</li>
          <li className="footer-list-item">Cart</li>
          <li className="footer-list-item">Wishlist</li>
          <li className="footer-list-item">Shop</li>
        </ul>
        <ul>
          <li className="footer-heading footer-list-item">Quick Link</li>
          <li className="footer-list-item">Privacy Policy</li>
          <li className="footer-list-item">Terms of use</li>
          <li className="footer-list-item">FAQ</li>
          <li className="footer-list-item">Contact</li>
        </ul>
        <ul className="vanish">
          <li className="footer-heading footer-list-item">Download app</li>
          <li className="footer-list-item">
            <div>
              <div className="bottom-margin">
                Save $3 with App New User Only
              </div>
              <div className="flex">
                <span>
                  <img src="qr-code.png" />
                </span>
                <span className="flex column">
                  <img src="play.png" />

                  <img src="app.png" />
                </span>
              </div>

              <ul className="flex center">
                <li>
                  <img src="fb.png" />
                </li>
                <li>
                  <img src="tweet.png" />
                </li>
                <li>
                  <img src="insta.png" />
                </li>
                <li>
                  <img src="linkedin.png" />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="copyright">Designed by Rimel, developed by Toni Skoro 2025</div>
    </div>
  );
}

export default Footer;
