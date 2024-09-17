import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { type Product } from "../types";

interface State {
  prods: Product[];
  setProds: (prods: Product[]) => void;
  cartItems: Product[] | [];
  total: number;
  cartItemsNumber: number;
  showCart: boolean;
  fetchProds: () => Promise<void>;
  setCartItems: (cartItems: Product[]) => void;
  setTotal: (total: number) => void;
  setCartItemsNumber: (items: number) => void;
  setShowCart: (showCart: boolean) => void;
}

export const useCartItems = create<State>()(
  devtools(
    persist(
      (set) => {
        return {
          prods: [],
          cartItems: [],
          total: 0,
          cartItemsNumber: 0,
          showCart: false,
          fetchProds: async () => {
            const res = await fetch("http://192.168.100.140:5000/products");
            const json = await res.json();
            set({ prods: json });
          },
          setProds(prods) {
            set({ prods });
          },

          setCartItems(cartItems) {
            set({ cartItems });
          },

          setTotal(total) {
            set({ total });
          },

          setCartItemsNumber(items) {
            set({ cartItemsNumber: items });
          },

          setShowCart(change) {
            set({ showCart: change });
          },
        };
      },
      { name: "storeCartItems", storage: createJSONStorage(() => localStorage) }
    )
  )
);
