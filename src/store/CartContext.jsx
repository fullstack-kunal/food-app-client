import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: () => {},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    //.... update the state to add a meal item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItem[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    //.... update the state to add a meal item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    if (existingCartItem.quantity === 1) {
      const updatedItems = [...state.items];
      updatedItems.splice(existingCartItem, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
    }
  }

  return state;
}

export default function CartContextProvider({ children }) {
  useReducer(CartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const CartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };
  return (
    <CartContext.Provider value={CartContext}>{children}</CartContext.Provider>
  );
}
