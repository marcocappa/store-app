import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('call onClick', async () => {
  // Arrange
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click me</Button>);
  const button = screen.getByTestId('test-button');

  // Act
  fireEvent.click(button);

  // Assert
  expect(onClick).toHaveBeenCalledTimes(1);
});
