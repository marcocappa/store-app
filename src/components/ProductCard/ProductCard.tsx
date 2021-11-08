import React from 'react';
import Button from '../Button/Button';
import './style.scss';
import { IProduct } from '../../types';

interface Props extends IProduct {
  addToCart: (id: string) => void;
}

function ProductCard({
  id,
  name,
  price,
  nutrients,
  addToCart,
}: Props): JSX.Element {
  return (
    <div className="product-card" data-testid="test-card">
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Nutrients:</p>
      <ul>
        {Object.keys(nutrients).map((key) => (
          <li key={nutrients[key].id}>
            {nutrients[key].id}: {nutrients[key].amount} {nutrients[key].unit}
          </li>
        ))}
      </ul>
      <Button onClick={() => addToCart(id)}>Add to Cart</Button>
    </div>
  );
}

export default ProductCard;
