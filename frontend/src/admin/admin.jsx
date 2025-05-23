import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminTrack() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

 
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



  



  return (
    <div className="mg-inline mx-width-1170px">
      <h1>Admin Track</h1>
    <h2>Add Data</h2>
      {error && <p>Error: {error}</p>} {/* Display error if any */}

    <table>
        <thead>
        <tr>
            <th>Product id</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
        </tr>
        </thead>

        <tbody>
            {products.length > 0 ? (
          products.map(product => (
            <tr key={product.id}>
                    <td>
                        {product._id}
                    </td>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.price}
                    </td>
                    <td>
                        {product.quantity}
                    </td>
                    <td>
                        <img className="width-60px" src={product.image} />
                    </td>


            </tr> // Assuming 'id' and 'name' properties
          ))
        ) : (
          <li>No products available</li>
        )}
        </tbody>


    </table>



      










    </div>
  );
}

export default AdminTrack;
