import { useEffect, useState } from "react";
import axios from "axios"
function Admin() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [allItems, setAllItems] = useState([]);
  const [isSure, setIsSure] = useState(false)
  const [formData, setFormData] = useState({
    _id:3453536754757561,
    name: "Camera",
    slug: "camera-test-slug",
    tag: "40%",
    price: 250,
    discounted: 450,
    stars: 5,
    reviews: 594,
    category: "Electronics",
    special: "Explore",
    image: "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347588/Camera_lkva3j.png",
    description:
      "Capture stunning photos and videos with this versatile DSLR camera from Canon, offering excellent image quality and performance.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


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



async function deleteItem(itemId){
  console.log("Delete button",itemId)
  
  const response= await axios.delete(`${API_BASE_URL}/admin/delete`,{
    data:{_id:itemId}
  })
  console.log("Response deleteItem",response)
  fetchData()
}





  const itemData = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    async function addItem(){
          const response =await axios.post(`${API_BASE_URL}/admin/post`,
          {
             _id: formData._id,
            slug: formData.slug,
            image: formData.image,
            stars: formData.stars,
            name: formData.name,
            price: formData.price,
            tag: formData.tag,
            numOfReviews: formData.reviews,
            discountedPrice:formData.discounted,
            description: formData.description,
            category: formData.category,
            specialCategory: formData.special,
          })
          console.log("Response",response)
          
    }
      addItem()
      fetchData();
      setFormData({
             _id: "",
             slug: "",
             image: "",
             stars: 0,
             name: "",
             price: 0,
             tag: "",
             reviews: 0,
             discounted: 0,
             description: "",
             category: "",
             special: "",
            });

  };

  useEffect(() => {
    
    fetchData();
  }, []);

  return (
    <div className="width-1170 mg-inline">
      <h1>Admin panel</h1>
      <h1>Add new Item</h1>
      <div style={{ marginBottom: `50px` }}>
        <div style={{ width: "50%" }}>
          <form onSubmit={itemData}>
                <input name="id" value={formData._id} placeholder="Id" readOnly style={{marginBottom: `20px`,width:"100%"}} />
            <div style={{ display: `flex`, marginBottom: `20px`, gap: "1%" }}>
              
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} required />
              <input name="tag" placeholder="Tag" value={formData.tag} onChange={handleChange} required />
            </div>

            <div style={{ display: `flex`, marginBottom: `20px`, gap: "1%" }}>
              <input
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                min="1"
                required
              />
              <input
                name="discounted"
                placeholder="Discounted price"
                value={formData.discounted}
                onChange={handleChange}
                type="number"
                min="1"
                required
              />
              <input
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

            <div style={{ display: `flex`, marginBottom: `20px`, gap: "1%" }}>
              <input
                name="reviews"
                placeholder="Number of reviews"
                value={formData.reviews}
                onChange={handleChange}
                type="number"
                min="0"
                required
              />

              <span style={{ width: "192px" }}>
                <label>Category</label>
                <br />
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option>Electronics</option>
                  <option>Pet supplies</option>
                </select>
              </span>

              <span style={{ width: "192px" }}>
                <label>Special category</label>
                <br />
                <select name="special" value={formData.special} onChange={handleChange} required>
                  <option>Best selling</option>
                  <option>Flash Sales</option>
                  <option>Explore</option>
                </select>
              </span>
            </div>

            <div>
              <input
                name="image"
                style={{ width: `100%` }}
                placeholder="Image url"
                value={formData.image}
                onChange={handleChange}
                required
              />
              <h1>Image preview</h1>
              <img src={formData.image} alt="Preview" style={{ width: "200px" }} />
            </div>

            <textarea
              name="description"
              style={{ width: `100%`, height: "70px" }}
              value={formData.description}
              onChange={handleChange}
              placeholder="Item description"
              required
            />

            <button type="submit">Add item</button>
          </form>
        </div>
      </div>

      <div>Search items</div>

      <div>
        <table style={{ width: `100%` }}>
          <thead>
            <tr>
              <th>Image/Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Special category</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: `center` }}>
            {allItems.map((item) => (
              <tr key={item._id}>
                <td style={{ paddingBottom: `3%`, gap: `10px` }} className="flex align-center">
                  <img style={{ width: `15%` }} src={item.image} alt={item.name} /> {item.name}
                </td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.specialCategory}</td>
                <td>{item.tag}</td>
                <td>
                  <button>Edit</button> <button onClick={()=>deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
