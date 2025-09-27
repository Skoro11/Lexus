// ContextCart.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { CartProvider, useCart } from "./ContextCart.jsx";

beforeEach(() => {
  localStorage.clear();
});

// ===== SAMPLE PRODUCTS =====
const sampleProduct = {
  _id: "prod-1",
  slug: "breed-dry-dog-foode",
  price: 100,
  name: "Breed Dry Dog Food",
  image:
    "https://res.cloudinary.com/dvsuhy8uh/image/upload/v1741347629/dogFood_ksds31.png",
  stars: 5,
  tag: "-40%",
  numOfReviews: 35,
  discountedPrice: 140,
  description: "High-quality dry dog food...",
  category: "Pet Supplies",
  campaign: "Flash Sales",
};

const likedProduct = {
  _id: "prod-2",
  slug: "liked-product",
  price: 50,
  name: "Liked Product",
  image: "https://example.com/image.png",
  stars: 4,
  tag: "",
  numOfReviews: 10,
  discountedPrice: 60,
  description: "A liked product",
  category: "Category",
  campaign: "Campaign",
};

// ===== TEST COMPONENT =====
const TestComponent = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount,
    calculateTotal,
    moveAllToCart,
  } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(sampleProduct)}>Add</button>
      <button onClick={() => removeFromCart(sampleProduct._id)}>Remove</button>
      <button onClick={() => updateQuantity(sampleProduct._id, "add")}>
        AddQty
      </button>
      <button onClick={() => updateQuantity(sampleProduct._id, "subtract")}>
        SubQty
      </button>
      <button onClick={() => clearCart()}>Clear</button>
      <button onClick={() => moveAllToCart([likedProduct], vi.fn())}>
        MoveAll
      </button>

      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="count">{getCartItemsCount()}</span>
      <span data-testid="total">{calculateTotal()}</span>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

// ===== TESTS =====
describe("CartContext core functions", () => {
  test("loads cart from localStorage on mount", () => {
    // Pre-populate localStorage
    const storedCart = [{ ...sampleProduct, quantity: 3 }];
    localStorage.setItem("guest_cart", JSON.stringify(storedCart));

    // Render component
    renderWithProvider();

    // Check that the cart has been loaded
    expect(screen.getByTestId("cart-length").textContent).toBe("1"); // only 1 type of item
    expect(screen.getByTestId("count").textContent).toBe("3"); // quantity from localStorage
    expect(screen.getByTestId("total").textContent).toBe("300.00"); // 100 * 3
  });

  test("adds item to cart and stores in localStorage", () => {
    renderWithProvider();
    act(() => screen.getByText("Add").click());

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("total").textContent).toBe("100.00");

    const stored = JSON.parse(localStorage.getItem("guest_cart"));
    expect(stored[0]).toMatchObject({ ...sampleProduct, quantity: 1 });
  });

  test("increments quantity when adding same item again", () => {
    renderWithProvider();
    act(() => screen.getByText("Add").click());
    act(() => screen.getByText("Add").click());

    expect(screen.getByTestId("count").textContent).toBe("2");
    expect(screen.getByTestId("total").textContent).toBe("200.00");
  });

  test("removes item from cart", () => {
    renderWithProvider();
    act(() => screen.getByText("Add").click());
    act(() => screen.getByText("Remove").click());

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(localStorage.getItem("guest_cart")).toBeNull();
  });

  test("updates quantity correctly with add and subtract", () => {
    renderWithProvider();
    act(() => screen.getByText("Add").click());
    act(() => screen.getByText("AddQty").click());

    expect(screen.getByTestId("count").textContent).toBe("2");

    act(() => screen.getByText("SubQty").click());
    expect(screen.getByTestId("count").textContent).toBe("1");

    // subtract when qty = 1 does not go below 1
    act(() => screen.getByText("SubQty").click());
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  test("clears cart", () => {
    renderWithProvider();
    act(() => screen.getByText("Add").click());
    act(() => screen.getByText("Clear").click());

    expect(screen.getByTestId("cart-length").textContent).toBe("0");
    expect(localStorage.getItem("guest_cart")).toBeNull();
  });

  test("moveAllToCart increments existing items or adds new and calls removeFromLike", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // move likedProduct into cart
    act(() => screen.getByText("MoveAll").click());

    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(screen.getByTestId("count").textContent).toBe("1");

    const stored = JSON.parse(localStorage.getItem("guest_cart"));
    expect(stored[0]).toMatchObject({ ...likedProduct, quantity: 1 });
  });
});
