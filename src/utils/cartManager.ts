import { Product } from "../components/Products";
const itemsNumber = (cartItems: Product[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.quantity ?? 0;
  });
  return total;
};

const handleAddToCart = (id: number) => {
  const newItem = prods?.find((item) => item.id === id);
  if (!newItem) return;
  const itemAlreadyInCart = cartItems.find((item) => item.id === newItem.id);
  if (!itemAlreadyInCart) {
    setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
  } else {
    const newCartItems = cartItems.map((item) =>
      item.id === newItem.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
    );
    setCartItems(newCartItems);
  }
};

const remove = (id: number) => {
  const itemsWithoutRemoved = cartItems.filter((item) => item.id !== id);
  setCartItems(itemsWithoutRemoved);
};

const addQuantity = (id: number) => {
  const item = cartItems.find((item) => item.id === id);
  if (!item) return;

  item.quantity = (item.quantity ?? 0) + 1;
  setCartItemsNumber(itemsNumber(cartItems));
};

const subQuantity = (id: number) => {
  const item = cartItems.find((item) => item.id === id);
  if (!item) return;

  if (item.quantity === 1 || item.quantity === 0) remove(id);
  else item.quantity = (item.quantity ?? 0) - 1;
  setCartItemsNumber(itemsNumber(cartItems));
};
const handleEscape = () => {
  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowCart(false);
    }
  };
  document.addEventListener("keydown", handleEscapePress);
  return () => document.removeEventListener("keydown", handleEscapePress);
};

export { itemsNumber, handleAddToCart, remove, addQuantity, subQuantity, handleEscape };
