import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './style.scss';

import { IProducts } from '../../types';

interface Props {
  loading: boolean;
  error: null | string;
  heading: string;
  products: IProducts;
  addToCart: (id: string) => void;
}

function ProductList({
  loading,
  error,
  heading,
  products,
  addToCart,
}: Props): JSX.Element {
  return (
    <div className="product-list" data-testid="test-list">
      <h2>{heading}</h2>

      {loading && <p>Loading products...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && products && Object.keys(products).length > 0 && (
        <div className="product-list">
          {Object.keys(products).map((key) => {
            const { name, price, id, nutrients } = products[key];
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                price={price}
                nutrients={nutrients}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
