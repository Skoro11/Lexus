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

const Dashboard = () => (
  <div>
    <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard label="Total Sales" value="$5,200" />
      <StatCard label="Orders" value="238" />
      <StatCard label="Users" value="87" />
    </div>
  </div>
);

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/product/all`);
        console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.log("FetchProducts error", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="font-semibold mb-4 flex justify-between ">
        <span className="text-3xl">Products</span>{" "}
        <button className="text-2xl border text-white bg-green-600 rounded py-2 px-4 hover:opacity-50 cursor-pointer">
          Add new
        </button>
      </h1>
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
              ({ _id, name, price, image, tag, category, specialCategory }) => (
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
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
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
