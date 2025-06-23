import { DbConnection } from "../config/db";
import mongoose from "mongoose";
import app from "../app.js";

describe("Should connect to MongoDB successfully", () => {
  it("Db connection right credentials", async () => {
    await DbConnection(process.env.MONGO_DB_CONNECTION_STRING);
    expect(mongoose.connection.readyState).toBe(1);
  });
  it("Db connection false credentials", async () => {
    await DbConnection("wrong-credentials");
    expect(mongoose.connection.readyState).toBe(0);
  });
});
