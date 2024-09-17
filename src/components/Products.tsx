import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import Card from "./Card";
import Cart from "./Cart";
import {
  itemsNumber,
  handleAddToCart,
  remove,
  addQuantity,
  subQuantity,
  handleEscape,
  updateTotal,
} from "../utils/cartManager";
import { useCartItems } from "../store/cartItems";

const Products = () => {
  const prods = useCartItems((state) => state.prods);
  const fetchProds = useCartItems((state) => state.fetchProds);
  const cartItems = useCartItems((state) => state.cartItems);
  const cartItemsNumber = useCartItems((state) => state.cartItemsNumber);
  const setCartItemsNumber = useCartItems((state) => state.setCartItemsNumber);
  const showCart = useCartItems((state) => state.showCart);
  const setShowCart = useCartItems((state) => state.setShowCart);
  const total = useCartItems((state) => state.total);

  useEffect(() => {
    setCartItemsNumber(itemsNumber(cartItems));
    updateTotal();
  }, [cartItems]);

  useEffect(() => {
    handleEscape();
  }, [showCart]);

  useEffect(() => {
    fetchProds();
  }, []);

  return (
    <main>
      <h1 className="title main">Mini e-commerce</h1>
      <div className="title-sec-logo">
        <img className="logo-state-manager" src="./src/assets/zt-logo.png" alt="State manager logo" />
        <h2 className="title secondary">
          <a href="https://github.com/sergioortegadev/state-zustand" target="_blank" rel="noreferrer noopener">
            Zustand
          </a>{" "}
          Version
        </h2>
      </div>
      <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
        <IoCartOutline />
        {cartItems.length === 0 ? "" : <p className="cart-quantity">{cartItemsNumber}</p>}
      </div>
      <Cart showCart={showCart} addQuantity={addQuantity} subQuantity={subQuantity} remove={remove} total={total} />
      <div className="cards">
        {prods?.map((prod) => (
          <Card key={prod.id} prod={prod} addToCart={() => handleAddToCart(prod.id, prod)} />
        ))}
      </div>
    </main>
  );
};

export default Products;
