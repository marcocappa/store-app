import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import CartTotal from './components/CartTotal/CartTotal';
import { IProducts, IConfig, ICartProducts, ILimit } from './types';
import {
  transformProducts,
  transformConfig,
  getTotal,
  getTotalVitamins,
} from './utils/index';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [products, setProducts] = useState<IProducts | null>(null);
  const [config, setConfig] = useState<IConfig | null>(null);
  const [cartProducts, setCartProducts] = useState<ICartProducts | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [upperLimit, setUpperLimit] = useState<ILimit | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotal(getTotal({ products, cartProducts }));
  }, [cartProducts]);

  useEffect(() => {
    const newUpperLimit = getTotalVitamins({
      products,
      config,
      cartProducts,
    });
    setUpperLimit(newUpperLimit);
  }, [cartProducts]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json'
      );
      const data = await res.json();
      // const data = fakeData;

      // manipulate and set products:
      const parsedProducts = transformProducts(data.products);
      setProducts(parsedProducts);

      // manipulate and set config:
      const parsedConfig = transformConfig(data.config);
      setConfig(parsedConfig);
    } catch (err) {
      setError('Ops! Something went wrong with the API!');
    }
    setLoading(false);
  };

  const addToCart = (id: string) => {
    let newCartProducts;
    if (!cartProducts) {
      newCartProducts = {
        [id]: {
          id,
          count: 1,
        },
      };
    } else if (!Object.keys(cartProducts).includes(id)) {
      newCartProducts = {
        ...cartProducts,
        [id]: {
          id,
          count: 1,
        },
      };
    } else {
      newCartProducts = {
        ...cartProducts,
        [id]: {
          id,
          count: cartProducts[id].count + 1,
        },
      };
    }
    setCartProducts(newCartProducts);
  };

  const decreaseItemQty = (id: string) => {
    const newCount = cartProducts[id].count - 1;
    let newCartProducts;
    if (newCount === 0) {
      newCartProducts = {
        ...cartProducts,
      };
      delete newCartProducts[id];
    } else {
      newCartProducts = {
        ...cartProducts,
        [id]: {
          id,
          count: newCount,
        },
      };
    }
    setCartProducts(newCartProducts);
  };
  const increaseItemQty = (id: string) => {
    const newCount = cartProducts[id].count + 1;
    const newCartProducts = {
      ...cartProducts,
      [id]: {
        id,
        count: newCount,
      },
    };
    setCartProducts(newCartProducts);
  };
  const removeFromCart = (id: string) => {
    const newCartProducts = {
      ...cartProducts,
    };
    delete newCartProducts[id];
    setCartProducts(newCartProducts);
  };

  return (
    <div>
      <h1>Store - App</h1>

      <Cart
        heading="Your Cart"
        cartProducts={cartProducts}
        products={products}
        removeFromCart={removeFromCart}
        increaseItemQty={increaseItemQty}
        decreaseItemQty={decreaseItemQty}
      />

      {cartProducts && Object.keys(cartProducts).length > 0 && (
        <CartTotal
          currency={config.currency}
          total={total}
          upperLimit={upperLimit}
        />
      )}

      <ProductList
        heading="All Products"
        loading={loading}
        error={error}
        products={products}
        addToCart={addToCart}
      />
    </div>
  );
}

export default App;
