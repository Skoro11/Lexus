import { useEffect, useState } from "react";
import axios from "axios"

function Admin() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [allItems, setAllItems] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false)

  const [formData, setFormData] = useState({
     _id:null,
    name:"",
    slug: "",
    tag: "",
    price:null,
    discountedPrice:null,
    stars: null,
    numOfReviews: null,
    category: "",
    specialCategory: "",
    image: "",
    description:"",
  });

  const [form, setForm] = useState({
    _id:null,
    name:"",
    slug: "",
    tag: "",
    price:null,
    discountedPrice:null,
    stars: null,
    numOfReviews: null,
    category: "",
    specialCategory: "",
    image: "",
    description:"",
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


  function handleItemClick(item){
    setFormIsVisible(true)
    setForm(item)
    console.log(item)
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



async function deleteItem(itemId){
  console.log("Delete button",itemId)
  
  const response= await axios.delete(`${API_BASE_URL}/admin/delete`,{
    data:{_id:itemId}
  })
  console.log("Response deleteItem",response)
  fetchData()
}

async function applyChanges(item){

    const response = await axios.put(`${API_BASE_URL}/admin/update`,
      {
        _id:item._id,
        name:item.name,
        slug: item.slug,
        tag: item.tag,
        price:item.price,
        discountedPrice:item.discountedPrice,
        stars: item.stars,
        numOfReviews: item.numOfReviews,
        category: item.category,
        specialCategory: item.specialCategory,
        image: item.image,
        description:item.description,
      },
      {
        withCredentials:true
      }
    )
    const data = response.data
    console.log("Response from editing an item",data)
    setFormIsVisible(false)
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
            numOfReviews: formData.numOfReviews,
            discountedPrice:formData.discountedPrice,
            description: formData.description,
            category: formData.category,
            specialCategory: formData.specialCategory,
          })
          console.log("Response",response)
          
    }
      addItem()
      
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
    <div className="width-1170 mg-inline">
      <h1>Admin panel</h1>
      <h1>Add new Item</h1>
      {formIsVisible &&(
        <div style={{ width: "50%",backgroundColor:"white",padding:"3%", border:"1px solid black",  position: 'fixed', top:"50%", left:"50%", transform: 'translate(-50%, -50%)',}}>
          <input name="id" value={form._id} placeholder="Id" readOnly style={{marginBottom: `20px`,width:"100%"}} />
          <div style={{ display: `flex`, marginBottom: `20px`, gap: "1%" }}>
              
              <input name="name" placeholder="Name" value={form.name} onChange={handleChangeEdit} required />
              <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChangeEdit} required />
              <input name="tag" placeholder="Tag" value={form.tag} onChange={handleChangeEdit} required />
            </div>
             <div style={{ display: `flex`, marginBottom: `20px`, gap: "1%" }}>
              <input
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChangeEdit}
                type="number"
                min="1"
                required
              />
              <input
                name="discounted"
                placeholder="Discounted price"
                value={form.discountedPrice}
                onChange={handleChangeEdit}
                type="number"
                min="1"
                required
              />
              <input
                name="stars"
                placeholder="Stars"
                value={form.stars}
                onChange={handleChangeEdit}
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
                value={form.numOfReviews}
                onChange={handleChangeEdit}
                type="number"
                min="0"
                required
              />

              <span style={{ width: "192px" }}>
                <label>Category</label>
                <br />
                <select name="category" value={form.category} onChange={handleChangeEdit} required>
                  <option>Electronics</option>
                  <option>Pet supplies</option>
                </select>
              </span>

              <span style={{ width: "192px" }}>
                <label>Special category</label>
                <br />
                <select name="special" value={form.specialCategory} onChange={handleChangeEdit} required>
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
                value={form.image}
                onChange={handleChangeEdit}
                required
              />
              <h1>Image preview</h1>
              <img src={form.image} alt="Preview" style={{ width: "200px" }} />
            </div>

            <textarea
              name="description"
              style={{ width: `100%`, height: "70px" }}
              value={form.description}
              onChange={handleChangeEdit}
              placeholder="Item description"
              required
            />

        <div><button onClick={()=> applyChanges(form)}>Apply changes</button> <button onClick={()=>setFormIsVisible(false)}>Close</button></div>
        </div>
      )}
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
                value={formData.discountedPrice}
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
                value={formData.numOfReviews}
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
                <select name="special" value={formData.specialCategory} onChange={handleChange} required>
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
                  <button onClick={()=>handleItemClick(item)}>Edit</button> <button onClick={()=>deleteItem(item._id)}>Delete</button>
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
