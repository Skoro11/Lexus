import {useCountdownToMidnight} from "../components/Clock"; // Import Clock component

function Banner() {
  const { days, hours, minutes, seconds } = useCountdownToMidnight();

  return (
    <div className="hidden md:block relative mx-auto max-w-[1170px]">
      <img src="bannerTwo.png" />
      <ul className="absolute flex flex-col justify-evenly top-0 text-white left-10 h-full ">
        <li className="text-green-400">Categories</li>
        <li className="text-3xl lg:text-5xl">
          Enhance Your <br />
          Music Experience
        </li>
        <li>
          <div className="hidden lg:flex">
            <span className="text-xs lg:text-base flex flex-col items-center bg-white text-black mr-5 py-2 rounded-4xl w-1/4">
              <span className="font-bold">{days}</span>
              <span>Days</span>
            </span>
            <span className="text-xs lg:text-base flex flex-col items-center bg-white text-black mr-5 py-2 rounded-4xl w-1/4">
              <span className="font-bold">{hours}</span>
              <span>Hours</span>
            </span>

            <span className="text-xs lg:text-base flex flex-col items-center bg-white text-black mr-5 py-2 rounded-4xl w-1/4">
              <span className="font-bold">{minutes}</span>
              <span>Minutes</span>
            </span>
            <span className="text-xs lg:text-base flex flex-col items-center bg-white text-black mr-5 py-2 rounded-4xl w-1/4">
              <span className="font-bold">{seconds}</span>
              <span>Seconds</span>
            </span>
          </div>
        </li>
        <li>
          
            <a href="/all"><button className=" bg-green-400 py-3 lg:py-6 px-18 rounded-lg hover:opacity-50 pointer">Buy Now</button></a>
        </li>
      </ul>
    </div>
  );
}

export default Banner;
