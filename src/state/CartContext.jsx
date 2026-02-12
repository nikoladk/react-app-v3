import React, { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, count: state.count + 1 };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function CartProvider({ children, initialCount = 0 }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });

  const api = useMemo(() => {
    function addItem() {
      dispatch({ type: 'ADD_ITEM' });
    }

    function reset() {
      dispatch({ type: 'RESET' });
    }

    return {
      count: state.count,
      addItem,
      reset,
    };
  }, [state.count]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
