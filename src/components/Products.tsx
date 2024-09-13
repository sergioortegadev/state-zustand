import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Card from "./Card";
import Cart from "./Cart";

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
  const [showCart, setShowCart] = useState(false);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProds(data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (id: number) => {
    const newItem = prods?.find((item) => item.id === id);
    if (!newItem) return;
    const itemAlreadyInCart = cartItems.find((item) => item.id === newItem.id);
    if (!itemAlreadyInCart) {
      setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
    } else {
      const newCartItems = cartItems.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(newCartItems);
    }
  };

  const addQuantity = (id: number) => {
    console.log("agregar : " + id);
  };

  const subQuantity = (id: number) => {
    console.log("restar : " + id);
  };

  const remove = (id: number) => {
    console.log("remover : " + id);
  };

  return (
    <main>
      <h1 className="text-5xl text-bold text-center my-8">Zustand - State Management</h1>
      <div className="cart-icon" onClick={() => setShowCart((prev) => !prev)}>
        <IoCartOutline />
        {cartItems.length === 0 ? "" : <p className="cart-quantity">{cartItems.length}</p>}
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
