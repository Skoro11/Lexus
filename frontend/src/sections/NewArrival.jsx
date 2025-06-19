function NewArrival() {
  return (
    <section className="mx-8">
      <div className="max-w-[1170px] mx-auto">
        <div className="hidden md:flex items-center">
          <span className="h-8 w-4 lg:h-10 lg:w-5 bg-[#db4444] rounded-md mr-2.5"></span>
          <div className=" text-[#db4444]">Featured</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex md:w-3/5 justify-between lg:w-1/2 items-center py-2.5 ">
            <h1 className="text-base md:text-lg lg:text-3xl font-bold">New arrival</h1>
          </div>
        </div>
        
        

        <div className="md:grid gap-6">
          <div className="md:col-span-2 row-span-2 text-white rounded-lg relative">
            <img src="ps5.png" />
            <ul className="absolute bottom-5 left-5 flex flex-col justify-between h-28">
              <li className="font-bold text-2xl">PlayStation 5</li>
              <li className="hidden md:block text-s">
                Black and White version of the PS5 coming out on sale.
              </li>
              <li>
              <a href="/all"><button className="border-b-1">Shop Now</button></a>

              </li>
            </ul>
          </div>
          <div className="md:col-start-3 col-end-5 row-span-1 text-white rounded-lg relative">
            <img src="women.png" />{" "}
            <ul className="absolute bottom-5 left-5 flex flex-col justify-between h-28">
              <li className="font-bold text-2xl">Women’s Collections</li>
              <li className="hidden md:block text-s">
                Featured woman collections that give you another vibe.
              </li>
              <li>
              <a href="/all"><button className="border-b-1">Shop Now</button></a>
              </li>
            </ul>
          </div>
          <div className="md:col-start-3 row-start-2 text-white rounded-lg relative">
            <img src="speakers.png" />
            <ul className="absolute bottom-5 left-5 flex flex-col justify-between h-28">
              <li className="font-bold text-2xl">Speakers</li>
              <li className="hidden md:block text-s">Amazon wireless speakers</li>
              <li>
              <a href="/all"><button className="border-b-1">Shop Now</button></a>
              </li>
            </ul>
          </div>
          <div className="md:col-start-4 row-start-2 text-white rounded-lg relative">
            <img src="gucci.png" />
            <ul className="absolute bottom-5 left-5 flex flex-col justify-between h-28">
              <li className="font-bold text-2xl">Perfume</li>
              <li className="hidden md:block text-s">GUCCI INTENSE OUD EDP</li>
              <li>
              <a href="/all"><button className="border-b-1">Shop Now</button></a>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default NewArrival;
