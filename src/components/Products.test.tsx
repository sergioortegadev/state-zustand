import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import Card from "./Card";

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    description: "This is product 1 - 1",
    images: ["/src/assets/1.png"],
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    description: "This is product 2 - 2",
    images: ["/src/assets/1.png"],
  },
];

test("  ♣ - should increase cartItemsNumber when 'Add to cart' is clicked", () => {
  // Mockear los productos que usa el componente
  render(<Card prod={mockProducts} />);

  const addToCartButtons = screen.getAllByText(/Add to cart/i);
  fireEvent.click(addToCartButtons[0]);

  const cartItemsNumber = screen.getByTestId("cart-items-number");
  expect(cartItemsNumber.textContent).toBe("1");
});
