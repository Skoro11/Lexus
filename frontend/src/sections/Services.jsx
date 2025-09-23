function Services (){
    return(
    <section className="hidden md:block mx-8 py-15 lg:py-30">
        <div className="flex justify-between  text-center gap-4 mx-auto max-w-[1170px]">
          <div className="flex flex-col justify-center items-center">
            <img className="w-14" src="del.png" />
            <div className="text-base font-bold lg:text-xl">FREE AND FAST DELIVERY</div>
            <div>
              Free delivery for all orders over $140
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-14" src="service.png" />
            <div className="text-base font-bold lg:text-xl">24/7 CUSTOMER SERVICE</div>
            <div>
              Friendly 24/7 customer support
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-14 self-center" src="check.png" />
            <div className="text-base font-bold lg:text-xl">MONEY BACK GUARANTEE</div>
            <div>
              We return money within 30 days
            </div>
          </div>
        </div>
    </section>
    )
}
export default Services;