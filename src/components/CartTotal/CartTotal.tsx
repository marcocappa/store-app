import React from 'react';
import { ILimit } from '../../types';
interface Props {
  currency: string;
  total: number;
  upperLimit: ILimit;
}

function CartTotal({ currency, total, upperLimit }: Props): JSX.Element {
  return (
    <div>
      {upperLimit && Object.keys(upperLimit).length > 0 && (
        <div>
          <h3>Limit exceeded for following vitamins</h3>
          {Object.keys(upperLimit).map((key) => (
            <li key={key}>
              {key}: {upperLimit[key].amount}
            </li>
          ))}
        </div>
      )}

      <div>
        Total Price: {currency}
        {total}
      </div>
    </div>
  );
}

export default CartTotal;
