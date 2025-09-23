import { hashPassword, checkPassword } from "../../utils/hashPassword";
import {
  accessTokenCreation,
  refreshTokenCreation,
} from "../../utils/JwtSession";
import jwt from "jsonwebtoken";

describe("Password hashing utilities", () => {
  const password = "secretPassword";
  const wrongPassword = "wrongPassword";

  test("Returns a hashed output from plain text", async () => {
    const hashed = await hashPassword(password);

    expect(typeof hashed).toBe("string");
    expect(hashed).not.toBe(password);
    expect(hashed.length).toBeGreaterThan(20);
  });

  test("checkPassword correctly verifies password", async () => {
    const hashed = await hashPassword(password);
    const result = await checkPassword(password, hashed);

    expect(result).toBe(true);
  });
  test("checkPassword fails for the wrong password", async () => {
    const hashed = await hashPassword(password);
    const result = await checkPassword(wrongPassword, hashed);

    expect(result).toBe(false);
  });

  test("hashPassword produces different values for the same inputs", async () => {
    const hash1 = await hashPassword(password);
    const hash2 = await hashPassword(password);

    expect(hash1).not.toBe(hash2);
  });
  test("hashPassword throws on invalid input", async () => {
    await expect(hashPassword(null)).rejects.toThrow();
    await expect(hashPassword(undefined)).rejects.toThrow();
  });
});

describe("JWT token utilities", () => {
  const JWT_TOKEN_SECRET = process.env.JWT_SECRET;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const wrongKey =
    "d4f3a29e7b8c1d5f4e6a7b3c9f8d1e2a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e";

  const payload = { id: "68625f1e347d0afb80510acc", email: "test@gmail.com" };

  test("Access token creation and validation", async () => {
    const token = accessTokenCreation(payload);
    expect(typeof token).toBe("string");

    const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);

    expect(() => {
      jwt.verify(token, wrongKey);
    }).toThrow();
  });

  test("Refresh token creation and validation", async () => {
    const refreshToken = refreshTokenCreation(payload);
    expect(typeof refreshToken).toBe("string");

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN);

    expect(decoded.id).toBe(payload.id);
    expect(decoded.email).toBe(payload.email);

    expect(() => {
      jwt.verify(refreshToken, wrongKey);
    }).toThrow();
  });
});
