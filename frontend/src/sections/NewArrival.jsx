function NewArrival() {
  return (
    <section className=" md:mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className="hidden md:flex items-center">
          <span className="h-8 w-4 lg:h-10 lg:w-5 bg-[#db4444] rounded-md mr-2.5"></span>
          <div className=" text-[#db4444]">Featured</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex md:w-3/5 justify-between lg:w-1/2 items-center py-2.5 ">
            <h1 className="text-base md:text-lg lg:text-3xl font-bold ml-4 md:ml-0">
              New arrival
            </h1>
          </div>
        </div>

        <div className="grid  gap-2 grid-cols-3 md:grid-cols-4 md:gap-6 mb-10">
          <div className="col-start-1 md:col-span-2 md:row-span-2 text-white rounded-lg relative">
            <img src="ps5.png" alt="Product" />
            <ul className="absolute bottom-8 left-5 flex flex-col justify-between md:h-28">
              <li className="font-bold hidden md:block md:text-2xl">
                PlayStation 5
              </li>
              <li className="font-bold md:hidden">
                <a href="/all">Console</a>
              </li>
              <li className="hidden md:block text-s">
                Black and White version of the PS5 coming out on sale.
              </li>
              <li>
                <a href="/all">
                  <button className="hidden md:block border-b-1 ">
                    Shop Now
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 md:col-start-3 md:col-end-5 md:row-span-1 text-white rounded-lg relative">
            <img src="women.png" alt="Product" />{" "}
            <ul className="absolute bottom-5 left-5 flex flex-col justify-between h-28">
              <li className="font-bold text-2xl">
                <a href="/all">Women’s Collections</a>
              </li>
              <li className="hidden md:block text-s">
                Featured woman collections that give you another vibe.
              </li>
              <li>
                <a href="/all">
                  <button className=" border-b-1">Shop Now</button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 col-start-2 row-1 md:col-start-3 md:row-start-2 text-white rounded-lg relative">
            <img src="speakers.png" />
            <ul className="absolute bottom-8 md:bottom-5 left-3 md:left-5 flex flex-col justify-between md:h-28">
              <li className="font-bold md:text-2xl">
                <a href="/all">Speakers</a>
              </li>
              <li className="hidden md:block text-s">
                Amazon wireless speakers
              </li>
              <li>
                <a href="/all">
                  <button className="hidden md:block border-b-1">
                    Shop Now
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 col-start-3 row-1 md:col-start-4 md:row-start-2 text-white rounded-lg relative">
            <img src="gucci.png" />
            <ul className=" absolute bottom-8 md:bottom-5 left-5 md:flex flex-col justify-between md:h-28">
              <li className="font-bold md:text-2xl">
                <a href="/all">Perfume</a>
              </li>
              <li className="hidden md:block text-s">GUCCI INTENSE OUD EDP</li>
              <li>
                <a href="/all">
                  <button className="hidden md:block border-b-1">
                    Shop Now
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewArrival;
