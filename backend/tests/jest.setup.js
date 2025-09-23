import { connectTestDB, clearDB, disconnectTestDB } from "./helpers/db";
import { createTestUser, createTestProducts } from "./helpers/cartHelper.js";

global.__TEST_CONTEXT__ = {};
beforeAll(async () => {
  await connectTestDB();
  const { token, user } = await createTestUser();
  global.__TEST_CONTEXT__.token = token;
  global.__TEST_CONTEXT__.user = user;
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await disconnectTestDB(); // await this fully
});
