// src/context/cartContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const API_BASE = "http://localhost:3000"; // Change in production

// Helper: safely extract product ID
const extractId = (item) => {
  if (!item) return null;
  if (typeof item === "string") return item;
  if (item._id) return String(item._id);
  if (item.$oid) return item.$oid;
  return String(item);
};

export const CartProvider = ({ children }) => {
  const { token, isAuthenticated, isLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]); // Each item has unique cartId
  const [loading, setLoading] = useState(true);

  // Load cart: guest → localStorage, authenticated → backend
  useEffect(() => {
    if (isLoading) return; // wait for auth

    const loadCart = async () => {
      setLoading(true);
      try {
        if (!isAuthenticated || !token) {
          // Guest mode: load from localStorage
          const saved = localStorage.getItem("cart");
          if (saved) setCartItems(JSON.parse(saved));
        } else {
          // Authenticated: fetch from backend
          const res = await axios.get(`${API_BASE}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const backendData = res.data.data || [];

          // Handle full product objects or just IDs
          const isFullProducts =
            backendData.length > 0 &&
            typeof backendData[0] === "object" &&
            backendData[0].productName;

          let items = [];

          if (isFullProducts) {
            // Each item gets a unique cartId
            items = backendData.map((p, index) => ({
              ...p,
              cartId: `cart-${extractId(p)}-${index}-${Date.now()}`,
              quantity: 1, // Each backend entry is quantity 1
            }));
          } else {
            // Backend returned IDs → fetch each product
            const productIds = backendData.map(extractId).filter(Boolean);

            const products = await Promise.all(
              productIds.map(async (id, index) => {
                try {
                  const pRes = await axios.get(`${API_BASE}/product/${id}`);
                  const p = pRes.data.data?.product?.[0];
                  return p ? { 
                    ...p, 
                    cartId: `cart-${id}-${index}-${Date.now()}`,
                    quantity: 1 
                  } : null;
                } catch {
                  return null;
                }
              })
            );

            items = products.filter(Boolean);
          }

          // Merge guest cart (if any)
          const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");

          if (guestCart.length > 0) {
            // Add guest items with new cartIds
            const guestWithCartIds = guestCart.map((item, index) => ({
              ...item,
              cartId: item.cartId || `cart-${extractId(item)}-guest-${index}-${Date.now()}`,
            }));
            items = [...items, ...guestWithCartIds];

            // Sync merged cart to backend
            await syncCartToBackend(guestWithCartIds, token);
          }

          setCartItems(items);
          localStorage.removeItem("cart"); // clear guest cart
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, token, isLoading]);

  // Save guest cart locally
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, isLoading]);

  // ---------- Helpers ----------

  // Sync cart items to backend
  const syncCartToBackend = async (items, authToken) => {
    if (!authToken) return;

    try {
      // Add each item to backend
      for (const item of items) {
        await axios.post(
          `${API_BASE}/cart/${extractId(item)}`,
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      }
    } catch (err) {
      console.error("Failed to sync cart to backend:", err);
    }
  };

  // ---------- Actions ----------

  // Add to cart - always adds as new item (allows duplicates)
  const addToCart = async (product, qty = 1) => {
    const productId = extractId(product);
    if (!productId) throw new Error("Invalid product");

    // Create unique cartId for this item
    const cartId = `cart-${productId}-${Date.now()}-${Math.random()}`;
    
    const newItem = { 
      ...product, 
      _id: productId, 
      cartId,
      quantity: qty 
    };

    setCartItems((prev) => [...prev, newItem]);

    // Sync to backend if logged in (add qty times since backend doesn't support quantity)
    if (isAuthenticated && token) {
      try {
        for (let i = 0; i < qty; i++) {
          await axios.post(
            `${API_BASE}/cart/${productId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (err) {
        console.error("Failed to add item to backend cart:", err);
      }
    }
  };

  // Remove from cart by cartId (unique identifier)
  const removeFromCart = async (cartId) => {
    const itemToRemove = cartItems.find((i) => i.cartId === cartId);
    if (!itemToRemove) return;

    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

    if (isAuthenticated && token) {
      try {
        const productId = extractId(itemToRemove);
        // Backend removes one instance of this product
        await axios.delete(`${API_BASE}/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Failed to remove from backend cart:", err);
      }
    }
  };

  // Update quantity of specific cart item by cartId
  const updateQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;

    const item = cartItems.find((i) => i.cartId === cartId);
    if (!item) return;

    const oldQty = item.quantity;
    const productId = extractId(item);

    setCartItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, quantity: newQty } : i
      )
    );

    if (isAuthenticated && token) {
      try {
        const diff = newQty - oldQty;
        
        if (diff > 0) {
          // Increase: add diff times
          for (let i = 0; i < diff; i++) {
            await axios.post(
              `${API_BASE}/cart/${productId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
          }
        } else if (diff < 0) {
          // Decrease: remove diff times
          for (let i = 0; i < Math.abs(diff); i++) {
            await axios.delete(`${API_BASE}/cart/${productId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          }
        }
      } catch (err) {
        console.error("Failed to update backend cart quantity:", err);
      }
    }
  };

  // Totals
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + (i.productPrice || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};