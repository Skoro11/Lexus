// src/pages/Admin.jsx
import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Admin = () => {
  const [tab, setTab] = useState("dashboard");

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setTab("dashboard")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => setTab("products")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Products
          </button>
          <button
            onClick={() => setTab("orders")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Orders
          </button>
          <button
            onClick={() => setTab("users")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 cursor-pointer"
          >
            Users
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8">{renderTab()}</main>
    </div>
  );
};

function Dashboard() {
  const [jsonData, setJsonData] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const parsedData = JSON.parse(jsonData);
      const response = await axios.post(
        `${API_BASE_URL}/api/product/multiple`,
        parsedData
      );
      if (response.status === 200) alert("Items added");
      if (response.status !== 200) alert("Problems with adding multiple items");
    } catch (error) {
      console.log("Erorr inserting multiple items", error.message);
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">
        Multiple Product insertion
      </h1>
      <form onSubmit={handleSubmit} className="flex">
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          className="w-2/4 min-h-200 border bg-white rounded p-3 font-mono whitespace-pre-wrap"
          placeholder={`JSON type data:
Example: 
[ 
  {
  "slug": "breed-dry-dog-food",
  "image": "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
  "stars": 5,
  "name": "Breed Dry Dog Food",
  "price": 100,
  "tag": "-40%",
  "numOfReviews": 35,
  "discountedPrice": 140,
  "description": "High-quality dry dog food specially formulated for specific breeds. Packed with essential nutrients to keep your pet healthy and strong.",
  "category": "Pet Supplies",
  "specialCategory": "Flash Sales"
  },
  {
    "slug": "canon-eos-dslr-camera",
    "image": "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347588/Camera_lkva3j.png",
    "stars": 5,
    "name": "CANON EOS DSLR Camera",
    "price": 360,
    "numOfReviews": 95,
    "tag": "New",
    "discountedPrice": 380,
    "description":
      "Capture stunning photos and videos with this versatile DSLR camera from Canon, offering excellent image quality and performance.",
    "category": "Electronics",
    "specialCategory": "Best Selling"
  }

]`}
        ></textarea>
        <button className="border">Submit</button>
      </form>
    </div>
  );
}

function Products() {
  const [isVisibleAddProduct, setIsVisibleAddProduct] = useState(false);
  const [isVisibleEditProduct, setIsVisibleEditProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: null,
    quantity: null,
    image: "",
    slug: "",
    stars: null,
    tag: "",
    numOfReviews: null,
    discountedPrice: null,
    description: "",
    category: "",
    specialCategory: "",
  });

  const [productDetails, setProductDetails] = useState({
    category: "",
    description: "",
    discountedPrice: null,
    image: "",
    name: "",
    numOfReviews: null,
    price: null,
    quantity: null,
    slug: "",
    specialCategory: "",
    stars: null,
    tag: "",
    _id: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleChangeDetails(e) {
    const { name, value } = e.target;

    setProductDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/add`,
        formData
      );

      console.log(response.data);
      if (response.status === 200) fetchProducts();
      if (response.status === 400) {
        console.log(`Error: ${response.error}`);
      }
    } catch (error) {
      alert("Error adding product");
      console.log("Error with adding new product", error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/product/edit`,
        productDetails
      );

      if (response.status === 200) {
        fetchProducts();
        setIsVisibleEditProduct(false);
        alert("Item updated successfully");
      }
    } catch (error) {
      console.log("Error updating product", error.message);
    }

    console.log(productDetails);
  }
  async function fetchProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/product/all`);
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.log("FetchProducts error", error);
    }
  }
  function isVisibleFunctionAddProduct() {
    if (isVisibleAddProduct) setIsVisibleAddProduct(false);

    if (!isVisibleAddProduct) setIsVisibleAddProduct(true);
  }
  function isVisibleFunctionEditProduct() {
    if (isVisibleEditProduct == true) setIsVisibleEditProduct(false);

    if (isVisibleEditProduct === false) setIsVisibleEditProduct(true);
  }
  function closeEditTab(e) {
    e.preventDefault();
    setIsVisibleEditProduct(false);
  }
  async function DeleteProduct(_id) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/product/remove`,
        {
          data: {
            _id: _id,
          },
        }
      );
      if (response.status == 200) {
        fetchProducts();
        alert("Item deleted successfully");
      }
      if (response.status !== 200) alert("Problem with deleting product");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="relative">
      <h1 className="font-semibold mb-4 flex justify-between">
        <span className="text-3xl">Products</span>
        <button onClick={() => isVisibleFunctionAddProduct()}>
          Add Product
        </button>
      </h1>
      {isVisibleEditProduct && (
        <form
          onSubmit={handleUpdate}
          className="w-1/2 mx-auto  rounded-lg shadow-md space-y-4 fixed top-110 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 text-black"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Edit Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="slug"
              value={productDetails.slug}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              placeholder="Slug"
              required
            />

            <input
              name="image"
              value={productDetails.image}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              placeholder="Image URL"
              required
            />

            <input
              name="stars"
              value={productDetails.stars}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              placeholder="Stars (0–5)"
              type="number"
              min="0"
              max="5"
              required
            />

            <input
              name="name"
              value={productDetails.name}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              placeholder="Product Name"
              required
            />

            <input
              name="price"
              value={productDetails.price}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              placeholder="Price"
              type="number"
              min="0"
              required
            />

            <select
              name="tag"
              value={productDetails.tag}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select Tag</option>
              <option value="New">New</option>
              <option value="50%">50%</option>
              <option value="40%">40%</option>
              <option value="30%">30%</option>
              <option value="20%">20%</option>
              <option value="10%">10%</option>
            </select>

            <input
              name="numOfReviews"
              value={productDetails.numOfReviews}
              onChange={handleChangeDetails}
              placeholder="Number of Reviews"
              type="number"
              min="0"
              className="border rounded px-3 py-2"
              required
            />

            <input
              name="discountedPrice"
              value={productDetails.discountedPrice}
              onChange={handleChangeDetails}
              placeholder="Discounted Price"
              className="border rounded px-3 py-2"
              type="number"
              min="0"
              required
            />
          </div>

          <textarea
            name="description"
            value={productDetails.description}
            onChange={handleChangeDetails}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            rows="4"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="category"
              value={productDetails.category}
              onChange={handleChangeDetails}
              className="border rounded px-3 py-2"
              required
            >
              <option value="Flash Sales">Flash Sales</option>
              <option value="Explore">Explore</option>
              <option value="Best Selling">Best Selling</option>
            </select>

            <select
              name="specialCategory"
              className="border rounded px-3 py-2"
              value={productDetails.specialCategory}
              onChange={handleChangeDetails}
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Pets">Pets</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <button
              type="submit"
              className="px-4  bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Apply changes
            </button>
            <button
              className="text-white bg-black py-2 px-4 rounded hover:opacity-50 transition"
              onClick={closeEditTab}
            >
              Close
            </button>
          </div>
        </form>
      )}
      {isVisibleAddProduct && (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add New Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Slug"
              required
            />

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Image URL"
              required
            />

            <input
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Stars (0–5)"
              type="number"
              min="0"
              max="5"
              required
            />

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Product Name"
              required
            />

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              placeholder="Price"
              type="number"
              min="0"
              required
            />

            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select Tag</option>
              <option value="New">New</option>
              <option value="50%">50%</option>
              <option value="40%">40%</option>
              <option value="30%">30%</option>
              <option value="20%">20%</option>
              <option value="10%">10%</option>
            </select>

            <input
              name="numOfReviews"
              value={formData.numOfReviews}
              onChange={handleChange}
              placeholder="Number of Reviews"
              type="number"
              min="0"
              className="border rounded px-3 py-2"
              required
            />

            <input
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              placeholder="Discounted Price"
              className="border rounded px-3 py-2"
              type="number"
              min="0"
              required
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            rows="4"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Flash Sales">Flash Sales</option>
              <option value="Explore">Explore</option>
              <option value="Best Selling">Best Selling</option>
            </select>

            <select
              name="specialCategory"
              className="border rounded px-3 py-2"
              value={formData.specialCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Special Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Pets">Pets</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </form>
      )}
      {products && products.length > 0 ? (
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Image</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Tag</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Special Category</th>
              <th className="text-left py-3 px-4">Price</th>

              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({
                _id,
                name,
                price,
                quantity,
                image,
                slug,
                stars,
                tag,
                numOfReviews,
                discountedPrice,
                description,
                category,
                specialCategory,
              }) => (
                <tr key={_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-xs text-gray-500">{_id}</td>
                  <td className="py-3 px-4">
                    <img
                      src={image}
                      alt={name}
                      className="h-16 w-16 object-contain rounded"
                    />
                  </td>

                  <td className="py-3 px-4 font-semibold">{name}</td>
                  <td className="py-3 px-4">{tag}</td>
                  <td className="py-3 px-4">{category}</td>
                  <td className="py-3 px-4">{specialCategory}</td>
                  <td className="py-3 px-4">${price}</td>

                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => {
                        isVisibleFunctionEditProduct();
                        setProductDetails({
                          _id,
                          name,
                          price,
                          quantity,
                          image,
                          slug,
                          stars,
                          tag,
                          numOfReviews,
                          discountedPrice,
                          description,
                          category,
                          specialCategory,
                        });
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => DeleteProduct(_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

const Orders = () => (
  <div>
    <h1 className="text-3xl font-semibold mb-4">Orders</h1>
    <p>Review and manage customer orders here.</p>
  </div>
);

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
  });

  async function Submit(e) {
    e.preventDefault();
    try {
      if (!name || !email || !password) return "Missing information";
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });
      setName("");
      setEmail("");
      setPassword("");
      getUsers();
      console.log(response);
    } catch (error) {
      console.log("Error adding user", error);
      alert("Error adding user");
    }
  }
  async function getUsers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  }
  async function DeleteUser(_id) {
    try {
      console.log(_id);
      const response = await axios.delete(`${API_BASE_URL}/api/auth/delete`, {
        data: { _id: _id },
      });
      if (response.status === 200) {
        getUsers();
        return alert("User deleted", _id);
      }
      if (response.status === 404) return alert("User was not found");
      return alert("Problem with user deletion");
    } catch (error) {
      console.log("Error deleting a user", error);
    }
  }

  async function EditUser(e) {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/api/auth/update`, {
        name: userData.name,
        email: userData.email,
        _id: userData._id,
      });
      const output = response.data;
      console.log(output);
      getUsers();
      setIsVisible(false);
    } catch (error) {
      console.log("Error editing user", error.message);
    }
  }
  async function FillUserDetails(_id, name, email, password) {
    setIsVisible(true);
    setUserData({
      name: name,
      _id: _id,
      email: email,
      password: password,
    });
  }

  async function closeEditTab(e) {
    e.preventDefault();
    setIsVisible(false);
    setUserData({
      name: "",
      _id: "",
      email: "",
      password: "",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="relative">
      <h1 className=" mb-4 flex justify-between ">
        <span className="text-3xl font-semibold">Users</span>{" "}
        <form onSubmit={Submit} className="flex  gap-2  ">
          <input
            className=" border bg-white rounded pl-2 border-gray-400 "
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <input
            type="email"
            className=" border bg-white rounded pl-2 border-gray-400 "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <input
            className=" border bg-white rounded pl-2 border-gray-400 "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button className="text-2xl border text-white bg-green-600 rounded py-2 px-4 hover:opacity-50 cursor-pointer">
            Add new
          </button>
        </form>
      </h1>
      {isVisible && (
        <div>
          <div className="fixed inset-0 bg-gray-100 opacity-50 z-40"></div>
          <form
            onSubmit={EditUser}
            className=" fixed w-1/2 p-5 rounded bg-white z-100 border top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col ml-2">
              Name{" "}
              <input
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
                className="border mb-2 rounded border-gray-400"
              ></input>
            </div>
            <div className="flex flex-col ml-2">
              Email{" "}
              <input
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="border mb-2 rounded border-gray-400"
              ></input>
            </div>
            <div className="flex flex-col ml-2">
              Password{" "}
              <input
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
                className="border mb-2 rounded border-gray-400"
              ></input>
              <div className="flex justify-end">
                <button className="mr-5 border py-2 px-4 rounded mb-2 bg-green-600 text-white hover:opacity-50 hover-change">
                  Save changes
                </button>
                <button
                  onClick={closeEditTab}
                  className="mr-5 border py-2 px-4 rounded mb-2  bg-black text-white hover:opacity-50 hover-change"
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {users && users.length > 0 ? (
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Password</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ name, email, _id, password }) => (
              <tr key={_id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-xs text-gray-500">{_id}</td>
                <td className="py-3 px-4 font-semibold">{name}</td>
                <td className="py-3 px-4">{email}</td>
                <td className="py-3 px-4">{password}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={(e) => FillUserDetails(_id, name, email, password)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => DeleteUser(_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h2 className="text-lg font-medium text-gray-600">{label}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Admin;
