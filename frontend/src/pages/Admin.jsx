import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [allItems, setAllItems] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    slug: "",
    tag: "",
    price: null,
    discountedPrice: null,
    stars: null,
    numOfReviews: null,
    category: "",
    specialCategory: "",
    image: "",
    description: "",
  });

  const [form, setForm] = useState({
    _id: null,
    name: "",
    slug: "",
    tag: "",
    price: null,
    discountedPrice: null,
    stars: null,
    numOfReviews: null,
    category: "",
    specialCategory: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleItemClick(item) {
    setFormIsVisible(true);
    setForm(item);
    console.log(item);
  }

  async function fetchData() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/product/all`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.ok) {
        setAllItems(data.products);
      } else {
        console.log("Data not fetched");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function deleteItem(itemId) {
    console.log("Delete button", itemId);

    const response = await axios.delete(`${API_BASE_URL}/admin/delete`, {
      data: { _id: itemId },
    });
    console.log("Response deleteItem", response);
    fetchData();
  }

  async function applyChanges(item) {
    const response = await axios.put(
      `${API_BASE_URL}/admin/update`,
      {
        _id: item._id,
        name: item.name,
        slug: item.slug,
        tag: item.tag,
        price: item.price,
        discountedPrice: item.discountedPrice,
        stars: item.stars,
        numOfReviews: item.numOfReviews,
        category: item.category,
        specialCategory: item.specialCategory,
        image: item.image,
        description: item.description,
      },
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log("Response from editing an item", data);
    setFormIsVisible(false);
    fetchData();
  }

  const itemData = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    async function addItem() {
      const response = await axios.post(`${API_BASE_URL}/admin/post`, {
        _id: formData._id,
        slug: formData.slug,
        image: formData.image,
        stars: formData.stars,
        name: formData.name,
        price: formData.price,
        tag: formData.tag,
        numOfReviews: formData.numOfReviews,
        discountedPrice: formData.discountedPrice,
        description: formData.description,
        category: formData.category,
        specialCategory: formData.specialCategory,
      });
      console.log("Response", response);
    }
    addItem();

    setFormData({
      _id: "",
      slug: "",
      image: "",
      stars: 0,
      name: "",
      price: 0,
      tag: "",
      numOfReviews: 0,
      discountedPrice: 0,
      description: "",
      category: "",
      specialCategory: "",
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="mt-12 mx-8">
      <div className="max-w-[1170px] mx-auto">
        <h1 className="text-3xl">Admin panel</h1>
        <h1 className="text-2xl"> Add new Item</h1>
        {formIsVisible && (
          <>
            <div className="fixed inset-0 bg-black opacity-10 z-40"></div>
            <div className="mx-10 top-40 md:top-35 lg:top-27 left-0 z-50 md:mx-5 right-0  p-10 lg:w-11/12 lg:max-w-[1130px] lg:my-10 lg:p-15 lg:mx-auto bg-white border rounded absolute md:absolute">
              <span className="font-bold">ID</span>
              <input
                className="border rounded pl-2 border-gray-400 w-full mb-2"
                name="id"
                value={form._id}
                placeholder="Id"
                readOnly
              />

              <div className="md:flex gap-2 ">
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Name</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChangeEdit}
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Slug</div>
                  <input
                    className="border rounded pl-2 border-gray-400  w-full"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChangeEdit}
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Tag</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="tag"
                    placeholder="Tag"
                    value={form.tag}
                    onChange={handleChangeEdit}
                    required
                  />
                </div>
              </div>
              <div className="md:flex gap-2">
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Price</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChangeEdit}
                    type="number"
                    min="1"
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Price before discount</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="discountedPrice"
                    placeholder="Discounted price"
                    value={form.discountedPrice}
                    onChange={handleChangeEdit}
                    type="number"
                    min="1"
                    required
                  />
                </div>

                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Stars</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="stars"
                    placeholder="Stars"
                    value={form.stars}
                    onChange={handleChangeEdit}
                    type="number"
                    min="0"
                    max="5"
                    required
                  />{" "}
                </div>
              </div>

              <div className="md:flex gap-2">
                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Number of reviews</div>
                  <input
                    className="border rounded pl-2 border-gray-400 w-full"
                    name="numOfReviews"
                    placeholder="Number of reviews"
                    value={form.numOfReviews}
                    onChange={handleChangeEdit}
                    type="number"
                    min="0"
                    required
                  />{" "}
                </div>

                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Category</div>
                  <select
                    name="category"
                    className="border-0 outline-0 border-gray-400 w-full"
                    value={form.category}
                    onChange={handleChangeEdit}
                    required
                  >
                    <option>Electronics</option>
                    <option>Pet supplies</option>
                  </select>{" "}
                </div>

                <div className="w-full md:w-1/3 mb-2">
                  <div className="font-bold">Special category</div>
                  <select
                    name="specialCategory"
                    className="border-0 outline-0 border-gray-400 w-full"
                    value={form.specialCategory}
                    onChange={handleChangeEdit}
                    required
                  >
                    <option>Best selling</option>
                    <option>Flash Sales</option>
                    <option>Explore</option>
                  </select>{" "}
                </div>
              </div>
              <input
                name="image"
                className="w-full border rounded pl-2 border-gray-400"
                placeholder="Image url"
                value={form.image}
                onChange={handleChangeEdit}
                required
              />
              <div className="flex gap-">
                <h1 className="font-bold my-2 md:w-1/3">Image preview</h1>
                <h1 className="hidden md:block font-bold my-2">Description</h1>
              </div>
              <div className="md:flex gap-5">
                <img
                  src={form.image}
                  alt="Preview"
                  className=" mb-2 md:mb-0 md:w-1/3"
                />
                <h1 className="font-bold mb-2 md:hidden">Description</h1>
                <textarea
                  name="description"
                  className="min-h-30 w-full md:w-9/12 border rounded border-gray-400 pl-2 float-right"
                  value={form.description}
                  onChange={handleChangeEdit}
                  placeholder="Item description"
                  required
                />
              </div>

              <div className="float-right mt-8">
                <button
                  className="text-white bg-[#db4444] py-2 px-4 rounded hover:opacity-50 hover-change cursor-pointer mr-3"
                  onClick={() => applyChanges(form)}
                >
                  Apply changes
                </button>
                <button
                  className="text-white bg-black py-2 px-4 rounded hover:opacity-50 hover-change cursor-pointer"
                  onClick={() => setFormIsVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
        <div className="mb-15 ">
          <div className="border rounded p-5 w-full lg:w-1/2">
            <form onSubmit={itemData}>
              <input
                name="id"
                className="border w-full rounded pl-2 border-gray-400 mb-2"
                value={formData._id}
                placeholder="Id"
                readOnly
              />
              <div className="md:flex gap-2 mb-2">
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400 mb-2 md:mb-0"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400  mb-2 md:mb-0"
                  name="slug"
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400 "
                  name="tag"
                  placeholder="Tag"
                  value={formData.tag}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:flex gap-2 mb-2">
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400  mb-2 md:mb-0"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  required
                />
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400  mb-2 md:mb-0"
                  name="discountedPrice"
                  placeholder="Discounted price"
                  value={formData.discountedPrice}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  required
                />
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400"
                  name="stars"
                  placeholder="Stars"
                  value={formData.stars}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  max="5"
                  required
                />
              </div>

              <div className="md:flex gap-2 mb-2">
                <input
                  className="w-full md:w-1/3 border pl-2 rounded border-gray-400  mb-2 md:mb-0"
                  name="reviews"
                  placeholder="Number of reviews"
                  value={formData.numOfReviews}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  required
                />

                <span className="w-full md:w-1/3 border pl-2 rounded border-gray-400 flex md:block  mb-2 md:mb-0">
                  <label className="hidden">Category</label>

                  <select
                    className="w-full focus-within:outline-0"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option>Electronics</option>
                    <option>Pet supplies</option>
                  </select>
                </span>

                <span className="w-full md:w-1/3 border pl-2 rounded border-gray-400 flex md:block">
                  <label className="hidden">Special category</label>

                  <select
                    className="w-full focus-within:outline-0"
                    name="specialCategory"
                    value={formData.specialCategory}
                    onChange={handleChange}
                    required
                  >
                    <option>Best selling</option>
                    <option>Flash Sales</option>
                    <option>Explore</option>
                  </select>
                </span>
              </div>

              <div className="mb-2">
                <input
                  name="image"
                  className="w-full border pl-2 rounded border-gray-400 mb-2"
                  placeholder="Image url"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
                <h1 className="mb-2 font-bold">Image preview</h1>
                <img src={formData.image} alt="Preview" />
              </div>
              <h1 className="mb-2 font-bold">Description</h1>
              <textarea
                name="description"
                className="w-full border pl-2 rounded border-gray-400 min-h-30"
                value={formData.description}
                onChange={handleChange}
                placeholder="Item description"
                required
              />
              <div className="flex flex-row-reverse">
                <button
                  type="submit"
                  className="border py-2 px-4 rounded text-white bg-[#DB4444] hover:opacity-50 hover-change cursor-pointer"
                >
                  Add item
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-2/6">Image/Name</th>
                <th className="hidden md:table-cell">Price</th>
                <th className="hidden lg:table-cell">Category</th>
                <th className="hidden md:table-cell">Special category</th>
                <th className="hidden lg:table-cell">Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {allItems.map((item) => (
                <tr key={item._id}>
                  <td className="flex gap-2 items-center pb-4 text-xs md:text-base">
                    <img
                      className="hidden  md:block w-1/6"
                      src={item.image}
                      alt={item.name}
                    />{" "}
                    {item.name}
                  </td>
                  <td className="hidden md:table-cell">{item.price}</td>
                  <td className="hidden lg:table-cell">{item.category}</td>
                  <td className="hidden md:table-cell">
                    {item.specialCategory}
                  </td>
                  <td className="hidden lg:table-cell">{item.tag}</td>
                  <td className="w-3/12 lg:w-1/6 text-right">
                    <button
                      className="border py-1 px-2 md:py-2 md:px-4 rounded bg-blue-700 text-white cursor-pointer hover:opacity-50 hover-change"
                      onClick={() => handleItemClick(item)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="border py-1 px-2 md:py-2 md:px-4 rounded bg-red-700 text-white cursor-pointer hover:opacity-50 hover-change"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Admin;
