import { useEffect, useState } from "react";
import CartRow from "./CartRow";
import { Product } from "./Products";

const Cart = ({
  cartItems,
  addQuantity,
  subQuantity,
  remove,
  showCart,
}: {
  cartItems: Product[];
  addQuantity: (id: number) => void;
  subQuantity: (id: number) => void;
  remove: (id: number) => void;
  showCart: boolean;
}) => {
  const [closeCart, setCloseCart] = useState(true);
  const handleCloseCart = () => {
    setCloseCart(!closeCart);
  };
  useEffect(() => {
    handleCloseCart();
  }, [showCart]);

  return (
    <div className={`external-cart ${closeCart ? "" : "hidden"}`} onClick={handleCloseCart}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        {cartItems.map((item) => (
          <CartRow key={item.id} item={item} addQuantity={addQuantity} subQuantity={subQuantity} remove={remove} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
