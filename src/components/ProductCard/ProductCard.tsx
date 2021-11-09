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
      <h3 className="product-card__title">{name}</h3>
      <p className="product-card__price">Price: {price}</p>
      <p className="product-card__nutrients">Nutrients:</p>
      <ul className="product-card__nutrients-list">
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
