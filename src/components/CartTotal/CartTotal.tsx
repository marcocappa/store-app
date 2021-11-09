import React from 'react';
import './style.scss';
interface Props {
  currency: string;
  total: number;
}

function CartTotal({ currency, total }: Props): JSX.Element {
  return (
    <div className="cart-total">
      <p className="cart-total__price">
        Total Price: {total} ({currency})
      </p>
    </div>
  );
}

export default CartTotal;
