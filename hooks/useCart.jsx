import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";

const localStorageCart = {
  KEY: "cart",

  create: function () {
    localStorage.setItem(this.KEY, JSON.stringify([]));

    return [];
  },

  get: function () {
    const cart = localStorage.getItem(this.KEY);

    return cart === null ? this.create() : JSON.parse(cart);
  },
  set: function (object = []) {
    localStorage.setItem(this.KEY, JSON.stringify(object));
  },
};

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const incrementQuantity = useCallback(function (itemID) {
    setCart(function (prevCartState) {
      return prevCartState.map(function (item) {
        if (item.id === itemID) {
          const currentQuantity = parseInt(item.quantity);

          return {
            ...item,
            quantity: currentQuantity + 1,
          };
        }

        return item;
      });
    });
  }, []);

  const add = useCallback(
    function (newItem) {
      if (
        cart.some(function (item) {
          return item.id === newItem.id;
        })
      ) {
        incrementQuantity(newItem.id);
      } else {
        setCart(function (prevCartState) {
          return [{ ...newItem, quantity: 1 }, ...prevCartState];
        });
      }
    },
    [cart, incrementQuantity]
  );

  const remove = useCallback(function (itemID) {
    setCart(function (prevCartState) {
      return prevCartState.filter(function (item) {
        return item.id !== itemID;
      });
    });
  }, []);

  const decrementQuantity = useCallback(
    function (itemID) {
      setCart(function (prevCartState) {
        return prevCartState.map(function (item) {
          if (item.id === itemID) {
            const currentQuantity = parseInt(item.quantity);

            if (currentQuantity - 1 < 1) {
              remove(itemID);
            } else {
              return {
                ...item,
                quantity: currentQuantity - 1,
              };
            }
          }

          return item;
        });
      });
    },
    [remove]
  );

  const clear = useCallback(function () {
    localStorageCart.set([]);
    setCart([]);
  }, []);

  const getQuantity = useCallback(
    function (itemID) {
      return (
        cart.find(function (item) {
          return item.id === itemID;
        })?.quantity || 0
      );
    },
    [cart]
  );

  const totalAmount = useMemo(
    function () {
      return cart.reduce(function (previousAmount, currentItem) {
        return (
          previousAmount +
          parseFloat(currentItem.price) * parseInt(currentItem.quantity)
        );
      }, 0);
    },
    [cart]
  );

  // Fetch cart on first render
  useEffect(function () {
    setCart(localStorageCart.get());
  }, []);

  // Sync localStorageCart with cart in state on any change
  useEffect(
    function () {
      localStorageCart.set(cart);
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        count: cart.length,
        totalAmount,

        add,
        remove,
        incrementQuantity,
        decrementQuantity,
        getQuantity,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
