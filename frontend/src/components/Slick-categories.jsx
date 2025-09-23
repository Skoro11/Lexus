const categories = [
  "Electronics",
  "Furniture",
  "Sport",
  "Accessories",
  "Toys",
  "Other",
];

export function SlickCategories() {
  return (
    <section className=" md:hidden mx-4">
      <div className="md:hidden py-2 font-bold">Categories</div>
      <div className="overflow-x-auto whitespace-nowrap pr-4 pb-2 scrollbar-hidden ">
        {categories.map((category) => (
          <button
            key={category}
            className=" border border-gray-400 text-black rounded-full px-2 py-1 mr-2 focus:bg-[var(--orange-primary)] focus:text-white text-sm "
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
