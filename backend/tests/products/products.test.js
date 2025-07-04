import request from "supertest";
import app from "../../app";
import "../jest.setup.js";
import Product from "../../models/product.model.js";
import { productBody, productsData } from "../helpers/cartHelper";
import { createTestProducts } from "../helpers/cartHelper";

describe("GET /api/product/all", () => {
  it("Show all product items ", async () => {
    createTestProducts();
    const response = await request(app).get("/api/product/all").expect(200);

    expect(response.body).toHaveProperty("products");
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.length).toBeGreaterThan(1);

    response.body.products.forEach((product) => {
      expect(product).toHaveProperty("_id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("quantity");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("slug");
      expect(product).toHaveProperty("stars");
      expect(product).toHaveProperty("tag");
      expect(product).toHaveProperty("numOfReviews");
      expect(product).toHaveProperty("discountedPrice");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("specialCategory");
    });
  });
});

describe(" POST /api/cart/add", () => {
  it("should add a product successfully", async () => {
    const response = await request(app)
      .post("/api/product/add")
      .send(productBody)
      .expect(200);

    expect(response.body).toHaveProperty("response");

    const savedProduct = await Product.findOne({ slug: productBody.slug });

    expect(savedProduct).not.toBeNull();
    expect(savedProduct.name).toBe(productBody.name);
  });
  it("Throw an error if there are the same products ", async () => {
    // First insert
    await Product.create(productBody);

    // Try to insert again
    const response = await request(app)
      .post("/api/product/add")
      .send(productBody);

    expect(response.status).not.toBe(200);
  });
});

describe("POST /api/product/multiple", () => {
  it("Add multiple items", async () => {
    const response = await request(app)
      .post("/api/product/multiple")
      .send(productsData)
      .expect(200);
  });

  it("Throw an error if there are the same products", async () => {
    await Product.create(productsData);

    const response = await request(app)
      .post("/api/product/multiple")
      .send(productsData);

    expect(response.status).not.toBe(200);
  });
});

describe("DELETE /api/product/remove", () => {
  let chosenId;

  beforeEach(async () => {
    await Product.create(productsData);
    const items = await Product.find();
    chosenId = items[1]._id.toString();
  });

  it("removes a product successfully", async () => {
    const response = await request(app)
      .delete("/api/product/remove")
      .send({ _id: chosenId })
      .expect(200);

    const deleted = await Product.findById(chosenId);
    expect(deleted).toBeNull();
  });

  it("returns 404 when removing a non-existing product", async () => {
    await request(app)
      .delete("/api/product/remove")
      .send({ _id: chosenId }) // first remove
      .expect(200);

    const response2 = await request(app)
      .delete("/api/product/remove")
      .send({ _id: chosenId }) // second remove
      .expect(404);

    expect(response2.body.message).toMatch(/product not found/i);
  });
});

describe("PUT /api/product/edit", () => {
  it("should return product not found", async () => {
    const response = await Product.find({ _id: "68628375edf189cb6baa0da1" });
    expect(response).toBeNull;
  });
  it("should return 200 with updated product", async () => {
    await Product.create(productsData);
    const items = await Product.find();
    let chosenId = items[1]._id.toString();

    const response = await request(app)
      .put("/api/product/edit")
      .send({ _id: chosenId, name: "Blue whale" })
      .expect(200);
  });

  it("Should throw an error for the same property value", async () => {
    await Product.create(productsData);
    const items = await Product.find();
    let chosenId = items[1]._id.toString();
    let secondId = items[2]._id.toString();

    const response = await request(app)
      .put("/api/product/edit")
      .send({ _id: chosenId, slug: "item-slug" })
      .expect(200);

    const response2 = await request(app)
      .put("/api/product/edit")
      .send({ _id: secondId, slug: "item-slug" });

    expect(response2.status).not.toBe(200);
  });
});

describe("GET /api/product/:id", () => {
  const id = "78655d43af0d379d60a631ac";

  it("should return []", async () => {
    const response = await request(app).get(`/api/product/${id}`);

    expect(response.body).toHaveProperty("product");
    expect(Array.isArray(response.body.product)).toBe(true);
    expect(response.body.product.length).toBe(0);
  });

  it("Should return full product information", async () => {
    await Product.create(productsData);
    const items = await Product.find();
    const chosenItem = items[1];

    const chosenId = chosenItem._id.toString();

    const response = await request(app).get(`/api/product/${chosenId}`);
    console.log(response.body.product[0].name);
    // Check that the response has a 'product' property
    expect(response.body).toHaveProperty("product");

    // Check that the returned product has the expected _id
    expect(response.body.product[0]._id).toBe(chosenId);

    // Optional: Deep equality check (if shape and values matter)
    expect(response.body.product[0].name).toBe(chosenItem.name);
    expect(response.body.product[0].price).toBe(chosenItem.price);
    expect(response.body.product[0].slug).toBe(chosenItem.slug);

    // Optional: full deep match, ignoring methods and _v
    expect(response.body.product[0]).toMatchObject({
      _id: chosenItem._id.toString(),
      name: chosenItem.name,
      price: chosenItem.price,
      slug: chosenItem.slug,
      image: chosenItem.image,
      category: chosenItem.category,
      description: chosenItem.description,
      discountedPrice: chosenItem.discountedPrice,
      numOfReviews: chosenItem.numOfReviews,
      quantity: chosenItem.quantity,
      specialCategory: chosenItem.specialCategory,
      stars: chosenItem.stars,
      tag: chosenItem.tag,
    });
  });
});

describe("POST /api/product/search", () => {
  it("should return 200", async () => {
    await Product.create(productsData);

    const response = await request(app)
      .post("/api/product/search")
      .send({ specialCategory: "Flash Sales" })
      .expect(200);
  });

  it("Should return 404 not found", async () => {
    const response = await request(app)
      .post("/api/product/search")
      .send({ specialCategory: "Wrong category" });

    expect(response.body.status).not.toBe(200);
  });
});
