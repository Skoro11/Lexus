import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminTrack() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
const [editingProduct, setEditingProduct] = useState(null);

 
  useEffect(() => {
    // Make the Axios request inside the useEffect hook
    axios.get(`${import.meta.env.VITE_API_URL}`)
      .then(response => {
        // Update state with the received data
        setProducts(response.data);
        console.log('Data received:', response.data);
      })
      .catch(error => {
        // Handle errors
        setError(error.message);
        console.log('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this runs only once (on mount)



const handleDelete = async (id) => {
  try {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter(product => product._id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};



  return (
    <div className="mg-inline mx-width-1170px">
      <h1>Admin Track</h1>
      {error && <p>Error: {error}</p>} {/* Display error if any */}
    <h2>Add Data</h2>
      
      <div>
  

      </div>

<div style={{ maxHeight: '700px', overflowY: 'auto'}}>


    <table className="width-100">
        <thead style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
        <tr>
            <th>Product id</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
        </tr>
        </thead>

        <tbody>
  {products.length > 0 ? (
    products.map(product => (
      <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td><img className="width-60px" src={product.image} alt={product.name} /></td>
        <td className="flex space-evenly">
          <button onClick={() => setEditingProduct(product)}>Edit</button>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan={6}>No products available</td></tr>
  )}
</tbody>
{editingProduct && (
  <div
    style={{
      position: "fixed",
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid #ccc",
      zIndex: 1000,
      maxHeight: "80vh",
      overflowY: "auto",
    }}
  >
    <h1>Edit</h1>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`/api/products/${editingProduct._id}`, editingProduct);
          setProducts(products.map(p => p._id === editingProduct._id ? response.data : p));
          setEditingProduct(null); // close popup
        } catch (error) {
          console.error("Update failed:", error);
        }
      }}
    >
      <label>Name: </label>
      <input
        type="text"
        value={editingProduct.name || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
      /><br />

      <label>Price: </label>
      <input
        type="number"
        value={editingProduct.price || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
      /><br />

      <label>Quantity: </label>
      <input
        type="number"
        value={editingProduct.quantity || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
      /><br />

      <label>Image URL: </label>
      <input
        type="text"
        value={editingProduct.image || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
        size={Math.max((editingProduct.image?.length || 10), 10)}
      /><br />
      {editingProduct.image && (
        <img
          src={editingProduct.image}
          alt="Product preview"
          style={{ width: "100px", height: "auto", marginTop: "10px", border: "1px solid #ccc" }}
        />
      )}
<br />
      <label>Description: </label><br />
      <textarea
        value={editingProduct.description || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
        rows={10}
        cols={80}
      /><br />

      <label>Special Category: </label>
      <select
        value={editingProduct.specialCategory || ""}
        onChange={(e) => setEditingProduct({ ...editingProduct, specialCategory: e.target.value })}
      >
        <option value="Flash Sales">Flash Sales</option>
        <option value="Best Selling">Best Selling</option>
        <option value="Explore">Explore</option>
      </select><br /><br />

      <button type="submit">Update</button>
      <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
    </form>
  </div>
)}




    </table>
</div>



      










    </div>
  );
}

export default AdminTrack;
