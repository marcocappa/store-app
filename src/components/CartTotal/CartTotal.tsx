import React from 'react';
import { IConfig, ICartProducts, IProducts } from '../../types';

interface Props {
  config: IConfig;
  cartProducts: ICartProducts;
  products: IProducts;
}

interface ITotal {
  cartProducts: ICartProducts;
  products: IProducts;
}

function getTotal({ cartProducts, products }: ITotal): number {
  return Object.keys(cartProducts).reduce((total, currentKey) => {
    const { count } = cartProducts[currentKey];
    const { price } = products[currentKey];
    return total + count * price;
  }, 0);
}

function CartTotal({ config, cartProducts, products }: Props): JSX.Element {
  const totalPrice = getTotal({ cartProducts, products });
  return (
    <div>
      Total Price: {config.currency}
      {totalPrice}
    </div>
  );
}

export default CartTotal;
