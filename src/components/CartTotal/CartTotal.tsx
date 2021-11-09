import React from 'react';
import { ILimit } from '../../types';
import './style.scss';
interface Props {
  currency: string;
  total: number;
  upperLimit: ILimit;
}

function CartTotal({ currency, total, upperLimit }: Props): JSX.Element {
  return (
    <div className="cart-total">
      {upperLimit && Object.keys(upperLimit).length > 0 && (
        <div className="cart-total__limits">
          <h3 className="cart-total__limits-title">
            Limit exceeded for following vitamins:
          </h3>
          {Object.keys(upperLimit).map((key) => (
            <li key={key}>
              {key}: {upperLimit[key].amount}
            </li>
          ))}
        </div>
      )}

      <p className="cart-total__price">
        Total Price: {total} ({currency})
      </p>
    </div>
  );
}

export default CartTotal;
