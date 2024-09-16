import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Card from "./Card";
import Cart from "./Cart";
import fetchData from "../utils/fetchData";
import { itemsNumber, handleAddToCart, remove, addQuantity, subQuantity, handleEscape } from "../utils/cartManager";

export interface Product {
  quantity?: number;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductList {
  products: Product[];
}

const Products = () => {
  const [prods, setProds] = useState<Product[] | null>(null);
  const [cartItems, setCartItems] = useState<Product[] | []>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItemsNumber, setCartItemsNumber] = useState<number>(0);

  useEffect(() => {
    (async () => setProds(await fetchData()))();
  }, []);

  useEffect(() => {
    setCartItemsNumber(itemsNumber(cartItems));
  }, [cartItems]);

  useEffect(() => {
    handleEscape();
  }, [showCart]);

  return (
    <main>
      <h1 className="title main">Mini e-commerce</h1>
      <div className="title-sec-logo">
        <img className="logo-state-manager" src="./src/assets/zt-logo.png" alt="State manager logo" />
        <h2 className="title secondary">Zustand Version</h2>
      </div>
      <div className="cart-icon" onClick={() => setShowCart((prev) => !prev)}>
        <IoCartOutline />
        {cartItems.length === 0 ? "" : <p className="cart-quantity">{cartItemsNumber}</p>}
      </div>
      <Cart
        cartItems={cartItems}
        showCart={showCart}
        addQuantity={addQuantity}
        subQuantity={subQuantity}
        remove={remove}
      />
      <div className="cards">
        {prods?.map((prod) => (
          <Card key={prod.id} prod={prod} addToCart={handleAddToCart} />
        ))}
      </div>
    </main>
  );
};

export default Products;
