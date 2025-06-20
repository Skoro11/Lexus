
function Footer() {
  return (
    <div className="hidden md:block text-white bg-black px-8">
      <div className="mx-auto max-w-[1170px] flex justify-between gap-7">
        <ul>
          <li className="font-bold text-xl my-5">Lexus</li>
          <li className="my-5">Subscribe</li>
          <li className="my-5">Get 10% off your first order</li>
          <li className="my-5 flex border-1 rounded-sm py-3 focus-within:border-amber-300 focus-within:border-1">
            <input className="pl-2.5 mr-2 w-5/6 focus:outline-0 " placeholder="Enter your Email" />
            <img className="pr-2.5  pt-1 pb-1" src="send.png" alt="send arrow" />
          </li>
        </ul>
        <ul>
          <li className="font-bold text-xl my-5">Support</li>
          <li className="my-5">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </li>
          <li className="my-5">lexus@gmail.com</li>
          <li className="my-5">+88015-88888-9999</li>
        </ul>
        <ul className="hidden lg:block">
          <li className="font-bold text-xl my-5">Account</li>
          <li className="my-5">My Account</li>
          <li className="my-5">Login / Register</li>
          <li className="my-5">Cart</li>
          <li className="my-5">Wishlist</li>
          <li className="my-5">Shop</li>
        </ul>
        <ul>
          <li className="font-bold text-xl my-5">Quick Link</li>
          <li className="my-5">Privacy Policy</li>
          <li className="my-5">Terms of use</li>
          <li className="my-5">FAQ</li>
          <li className="my-5">Contact</li>
        </ul>
        <ul className="hidden lg:block">
          <li className="font-bold text-xl my-5">Download app</li>
          <li className="my-5">
            <div>
              <div className="mb-5">
                Save $3 with App New User Only
              </div>
              <div className="flex">
                <span>
                  <img src="qr-code.png" />
                </span>
                <span className="flex flex-col justify-around ml-1">
                  <img src="play.png" />

                  <img src="app.png" />
                </span>
              </div>

              <ul className="flex items-center">
                <li className="mt-5 mx-3 pointer">
                  <img src="fb.png" />
                </li>
                <li className="mt-5 mx-3 pointer">
                  <img src="tweet.png" />
                </li>
                <li className="mt-5 mx-3 pointer">
                  <img src="insta.png" />
                </li>
                <li className="mt-5 mx-3 pointer">
                  <img src="linkedin.png" />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="border-t-1 text-center py-2.5">Designed by Rimel, developed by Toni Skoro 2025</div>
    </div>
  );
}

export default Footer;
