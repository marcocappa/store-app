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
    <div className="cart-list">
      <h2>{heading}</h2>
      {cartProducts === null && (
        <p data-testid="cart-error">No products added to your cart!</p>
      )}
      {cartProducts &&
        Object.keys(cartProducts).length > 0 &&
        Object.keys(cartProducts).map((key) => {
          const { id, name } = products[key];
          const { count } = cartProducts[key];
          return (
            <div key={id} data-testid={`cart-${id}`}>
              <p>{name}</p>
              <p>Qty: {count}</p>
              <Button
                onClick={() => decreaseItemQty(id)}
                data-testid={`cart-btn-decr-${id}`}
              >
                -
              </Button>
              <Button
                onClick={() => increaseItemQty(id)}
                data-testid={`cart-btn-incr-${id}`}
              >
                +
              </Button>
              <Button
                onClick={() => removeFromCart(id)}
                data-testid={`cart-btn-remove-${id}`}
              >
                Remove
              </Button>
            </div>
          );
        })}
    </div>
  );
}

export default Cart;
