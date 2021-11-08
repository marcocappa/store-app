import React from 'react';

interface Props {
  currency: string;
  total: number;
}

function CartTotal({ currency, total }: Props): JSX.Element {
  return (
    <div>
      <div></div>
      <div>
        Total Price: {currency}
        {total}
      </div>
    </div>
  );
}

export default CartTotal;
