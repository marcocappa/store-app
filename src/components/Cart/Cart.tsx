import React from 'react';
import { IProducts, ICartProducts } from '../../types';
import Button from '../Button/Button';

interface Props {
  heading: string;
  cartProducts: ICartProducts | null;
  products: IProducts;
  removeFromCart: (id: string) => void;
  increaseItemQty: (id: string) => void;
  decreaseItemQty: (id: string) => void;
}

function Cart({
  heading,
  cartProducts,
  products,
  removeFromCart,
  increaseItemQty,
  decreaseItemQty,
}: Props): JSX.Element {
  return (
    <div className="cart-list" data-testid="test-cart">
      <h2>{heading}</h2>
      {cartProducts === null && 'No products added to your cart!'}
      {cartProducts &&
        Object.keys(cartProducts).length > 0 &&
        Object.keys(cartProducts).map((key) => {
          const { id, name } = products[key];
          const { count } = cartProducts[key];
          return (
            <div key={id}>
              <p>{name}</p>
              <p>Qty: {count}</p>
              <Button onClick={() => decreaseItemQty(id)}>-</Button>
              <Button onClick={() => increaseItemQty(id)}>+</Button>
              <Button onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          );
        })}
    </div>
  );
}

export default Cart;
