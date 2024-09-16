import { Product } from "./Products";
const CartRow = ({
  item,
  addQuantity,
  subQuantity,
  remove,
}: {
  item: Product;
  addQuantity: (id: number) => void;
  subQuantity: (id: number) => void;
  remove: (id: number) => void;
}) => {
  return (
    <div className="cart-row">
      <p className="cart-row-title">{item.title}</p>
      <p className="cart-row-price">$ {item.price}</p>
      <div className="cart-row-quantity">
        <button onClick={() => addQuantity(item.id)}>➕</button>
        <p>{item.quantity}</p>
        <button onClick={() => subQuantity(item.id)}>➖</button>
      </div>

      <p className="cart-row-total">$ {(item.price * (item.quantity ?? 1)).toFixed(2)}</p>
      <button onClick={() => remove(item.id)}>❌</button>
    </div>
  );
};

export default CartRow;
