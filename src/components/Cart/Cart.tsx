import React from 'react';
import { IProducts, ICartProducts } from '../../types';
import Button from '../Button/Button';
import './style.scss';

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
            <div
              className="cart-list__product"
              key={id}
              data-testid={`cart-${id}`}
            >
              <div className="cart-list__info">
                <p className="cart-list__info-title">{name}</p>
                <p>Qty: {count}</p>
              </div>
              <div className="cart-list__actions">
                <Button
                  onClick={() => decreaseItemQty(id)}
                  data-testid={`cart-btn-decr-${id}`}
                  className="cart-list__actions-decrease"
                  title="decrease product quantity"
                >
                  -
                </Button>
                <Button
                  onClick={() => increaseItemQty(id)}
                  data-testid={`cart-btn-incr-${id}`}
                  className="cart-list__actions-increase"
                  title="increase product quantity"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeFromCart(id)}
                  data-testid={`cart-btn-remove-${id}`}
                  className="cart-list__actions-remove"
                  title="remove product from cart"
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Cart;
