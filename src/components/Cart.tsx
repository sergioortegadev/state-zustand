import { useEffect, useState } from "react";
import CartRow from "./CartRow";
import { useCartItems } from "../store/cartItems";

const Cart = ({
  addQuantity,
  subQuantity,
  remove,
  showCart,
  total,
}: {
  addQuantity: (id: number) => void;
  subQuantity: (id: number) => void;
  remove: (id: number) => void;
  showCart: boolean;
  total: number;
}) => {
  const cartItems = useCartItems.getState().cartItems;
  const [closeCart, setCloseCart] = useState<boolean>(true);

  const handleCloseCart = () => {
    setCloseCart(!closeCart);
  };
  useEffect(() => {
    handleCloseCart();
  }, [showCart]);

  return (
    <div
      className={`external-cart ${closeCart ? "slide-in slide-in-active" : "slide-out slide-out-active"}`}
      onClick={handleCloseCart}
    >
      {cartItems.length === 0 ? (
        <div className="cart">No items in cart</div>
      ) : (
        <div className="cart" onClick={(e) => e.stopPropagation()}>
          <button className="cart-btn-close" onClick={handleCloseCart}>
            ✖
          </button>
          {cartItems.map((item) => (
            <CartRow key={item.id} item={item} addQuantity={addQuantity} subQuantity={subQuantity} remove={remove} />
          ))}
          <button className="cart-btn-checkout">
            <div>Total ${total.toFixed(2)}</div>
            <div>Checkout</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
