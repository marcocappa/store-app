import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';

test('Cart renders product and invoke functions', async () => {
  // Arrange
  const removeFromCart = jest.fn();
  const increaseItemQty = jest.fn();
  const decreaseItemQty = jest.fn();
  const props = {
    heading: 'Heading',
    cartProducts: {
      'id-0': { id: 'id-0', count: 2 },
      'id-1': { id: 'id-0', count: 1 },
    },
    products: {
      'id-0': {
        id: 'id-0',
        name: 'Name 0',
        price: 5,
        nutrients: {
          'vitamin-a': {
            id: 'vitamin-a',
            amount: 500,
          },
        },
      },
      'id-1': {
        id: 'id-1',
        name: 'Name 1',
        price: 10,
        nutrients: {
          'vitamin-c': {
            id: 'vitamin-c',
            amount: 800,
          },
        },
      },
    },
    removeFromCart,
    increaseItemQty,
    decreaseItemQty,
  };

  // Act
  render(<Cart {...props} />);
  const error = screen.queryByTestId('cart-error');
  const product0 = screen.getByTestId('cart-id-0');
  const product1 = screen.getByTestId('cart-id-1');

  // Assert
  expect(error).toBe(null);
  expect(product0).toBeInTheDocument();
  expect(product1).toBeInTheDocument();

  // Act
  const increment = screen.getByTestId('cart-btn-incr-id-0');
  fireEvent.click(increment);

  // Assert
  expect(increaseItemQty).toHaveBeenCalled();
  expect(increaseItemQty).toHaveBeenCalledWith('id-0');

  // Act
  const decrement = screen.getByTestId('cart-btn-decr-id-0');
  fireEvent.click(decrement);

  // Assert
  expect(decreaseItemQty).toHaveBeenCalled();
  expect(decreaseItemQty).toHaveBeenCalledWith('id-0');

  // Act
  const remove = screen.getByTestId('cart-btn-remove-id-0');
  fireEvent.click(remove);

  // Assert
  expect(removeFromCart).toHaveBeenCalled();
  expect(removeFromCart).toHaveBeenCalledWith('id-0');
});

test('Cart renders error', async () => {
  // Arrange
  const props = {
    heading: 'Heading',
    cartProducts: null,
    products: {
      'id-0': {
        id: 'id-0',
        name: 'Name 0',
        price: 5,
        nutrients: {
          'vitamin-a': {
            id: 'vitamin-a',
            amount: 500,
          },
        },
      },
      'id-1': {
        id: 'id-1',
        name: 'Name 1',
        price: 10,
        nutrients: {
          'vitamin-c': {
            id: 'vitamin-c',
            amount: 800,
          },
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeFromCart: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    increaseItemQty: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    decreaseItemQty: () => {},
  };

  // Act
  render(<Cart {...props} />);
  const error = screen.getByTestId('cart-error');
  const product0 = screen.queryByTestId('cart-id-0');
  const product1 = screen.queryByTestId('cart-id-1');

  // Assert
  expect(error).toBeInTheDocument();
  expect(product0).toBe(null);
  expect(product1).toBe(null);
});
