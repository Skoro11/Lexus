import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/product.model.js"
import cors from "cors"

dotenv.config()

const app = express();
const port= process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    
    console.log('Connected to the database!')

     app.listen(port,()=>{
        console.log("App is running on port " + port)
})
  })
    .catch(()=>{
    console.log("Problem with connecting to the MongoDb")
  })


app.delete("/api/products", async (req, res) => {
  try {
    // Delete all products from the database
    const result = await Product.deleteMany({}); // This will delete all products

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No products found to delete" });
    }

    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/* app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); */

app.get("/api/products/:id",async (req,res)=>{
  try{
    const{id}= req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);

  }catch(error){
    res.status(500).json({message: error.message})

  }
})

app.post("/api/products",async (req,res)=>{
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product)
      
  }catch(error){
    res.status(500).json({message:error.message})
  }
})
app.post("/api/products", async (req, res) => {
  try {
    // Expecting an array of products in the request body
    const products = req.body;

    // Use Product.create to create multiple products at once
    const createdProducts = await Product.create(products);

    // Return the created products as the response
    res.status(200).json(createdProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/products/:id",async (req,res)=>{
  try{
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,req.body);
    
    if(!product){
      return res.status(404).json({message: "Product not found"})
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)

  }catch(error){
    res.status(500).json({message: error.message})
  }
})

app.delete("/api/products/:id", async (req,res)=>{
  try{
    const {id} =req.params;
    const product = await Product.findByIdAndDelete(id)

    if(!product){
      return res.status(404).json({message : "Product not found"})
    }
    res.status(200).json({message:"Product deleted successfully"})


  }catch(error){
    res.status(500).json({message: error.message})
  }
})
app.get("/",(req,res)=>{
  res.send("This is the backend");
})

