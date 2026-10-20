import React, { createContext, useContext, useState, useEffect } from "react";
const dbName = "cartDatabase";
const storeName = "cartItems";
const orderStoreName = "orders";
const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(orderStoreName)) {
        db.createObjectStore(orderStoreName, { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
const addToDb = async (item) => {
  const db = await openDb();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.put(item);
  return new Promise((resolve) => (transaction.oncomplete = resolve));
};
const getAllFromDb = async () => {
  const db = await openDb();
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return new Promise((resolve) => {
    const items = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
  });
};
const clearDb = async () => {
  const db = await openDb();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  store.clear();
  return new Promise((resolve) => (transaction.oncomplete = resolve));
};
const KorzinaContext = createContext();
export default function KorzinaProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getAllFromDb();
      setCartItems(items);
    };
    loadCartItems();
  }, []);
  const clearCart = async () => {
    await clearDb();
    setCartItems([]);
  };
  const addToCart = async (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      await updateCartIt(item.id, 1);
    } else {
      const newItem = { ...item, quantity: 1 };
      await addToDb(newItem);
      setCartItems((prev) => [...prev, newItem]);
    }
  };
  const updateCartIt = async (id, quantity) => {
    const updatedCartItems = cartItems
      .map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + quantity } : it
      )
      .filter((it) => it.quantity > 0);
    await Promise.all(updatedCartItems.map((item) => addToDb(item)));
    setCartItems(updatedCartItems);
  };
  return (
    <KorzinaContext.Provider
      value={{ cartItems, addToCart, updateCartIt, clearCart }}
    >
      {children}
    </KorzinaContext.Provider>
  );
}
export const useKorzinaContext = () => {
  const context = useContext(KorzinaContext);
  if (!context) {
    console.error(
      "useKorzinaContext можно вызвать только внутри корзины провайдера"
    );
  }
  return context;
};    
const addOrderToDb = async (order) => {
  const db = await openDb();
  const transaction = db.transaction(orderStoreName, "readwrite");
  const store = transaction.objectStore(orderStoreName);
  store.add(order);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};
const getAllOrdersFromDb = async () => {
  const db = await openDb();
  const transaction = db.transaction(orderStoreName, "readonly");
  const store = transaction.objectStore(orderStoreName);
  return new Promise((resolve, reject) => {
    const items = [];
    store.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        items.push(cursor.value);
        cursor.continue();
      } else {
        resolve(items);
      }
    };
    store.openCursor().onerror = () => reject(store.error);
  });
};
const removeOrderFromDb = async (id) => {
  const db = await openDb();
  const transaction = db.transaction(orderStoreName, "readwrite");
  const store = transaction.objectStore(orderStoreName);
  store.delete(id);
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};
const clearOrdersDb = async () => {
  const db = await openDb();
  const transaction = db.transaction(orderStoreName, "readwrite");
  const store = transaction.objectStore(orderStoreName);
  store.clear();
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export { addOrderToDb, getAllOrdersFromDb, removeOrderFromDb, clearOrdersDb };