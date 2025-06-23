// tests/CRUD.test.js
import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import { DbConnection } from "../config/db.js";
import { seedProducts, seedUsers } from "../config/seedItems.js";

beforeAll(async () => {
  await DbConnection(process.env.MONGO_DB_CONNECTION_STRING);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

describe("CRUD", () => {
  it("Get all products /api/product/all", async () => {
    const res = await request(app).get("/api/product/all");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(Array.isArray(res.body.products)).toBe(true);
  });
  it("Add new item", async () => {});
});
