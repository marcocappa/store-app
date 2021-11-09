import {
  transformProducts,
  reduceNutrients,
  transformConfig,
  getTotal,
  getCartLimits,
  isProductDisabled,
} from './';

// mock ids generated from uuid
const mockIds = ['id-1', 'id-2'];

jest.mock('uuid', () => {
  let count = 0;
  return {
    v4: () => {
      const id = mockIds[count];
      count++;
      return id || 'default-id';
    },
  };
});

test('transformData function', () => {
  // Arrange
  const mockProductsAPI = [
    {
      name: 'Vitamin A',
      price: 6,
      nutrients: [{ id: 'vitamin-a', amount: 800 }],
    },
    {
      name: 'Vitamin C',
      price: 8,
      nutrients: [
        { id: 'vitamin-a', amount: 1000 },
        { id: 'vitamin-c', amount: 50 },
      ],
    },
  ];

  // Act
  const result = transformProducts(mockProductsAPI);

  // Assert
  expect(result).toStrictEqual({
    'id-1': {
      id: 'id-1',
      name: 'Vitamin A',
      price: 6,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 800 },
      },
    },
    'id-2': {
      id: 'id-2',
      name: 'Vitamin C',
      price: 8,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 1000 },
        'vitamin-c': { id: 'vitamin-c', amount: 50 },
      },
    },
  });
});

test('reduceNutrients function', () => {
  // Arrange
  const mockNutrients = [
    { id: 'vitamin-a', amount: 800 },
    { id: 'vitamin-c', amount: 50 },
  ];

  // Act
  const result = reduceNutrients(mockNutrients);

  // Assert
  expect(result).toStrictEqual({
    'vitamin-a': { id: 'vitamin-a', amount: 800 },
    'vitamin-c': { id: 'vitamin-c', amount: 50 },
  });
});

test('transformConfig', () => {
  // Arrange
  const config = {
    tolerableUpperLimits: [
      {
        id: 'vitamin-a',
        amount: 1500,
        unit: 'mcg',
      },
      {
        id: 'vitamin-c',
        amount: 1000,
        unit: 'mg',
      },
    ],
    currency: 'GBP',
  };

  // Act
  const newConfig = transformConfig(config);

  // Assert
  expect(newConfig).toStrictEqual({
    tolerableUpperLimits: {
      'vitamin-a': { id: 'vitamin-a', amount: 1500, unit: 'mcg' },
      'vitamin-c': { id: 'vitamin-c', amount: 1000, unit: 'mg' },
    },
    currency: 'GBP',
  });
});

test('getTotal', () => {
  // Arrange
  const cartProducts = {
    'id-1': { count: 2, id: 'id-1' },
    'id-2': { count: 1, id: 'id-2' },
  };

  const products = {
    'id-1': {
      id: 'id-1',
      name: 'Vitamin A',
      price: 5,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 800 },
      },
    },
    'id-2': {
      id: 'id-2',
      name: 'Vitamin C',
      price: 10,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 1000 },
        'vitamin-c': { id: 'vitamin-c', amount: 50 },
      },
    },
    'id-3': {
      id: 'id-3',
      name: 'Vitamin A, C, D',
      price: 8,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 800 },
        'vitamin-c': { id: 'vitamin-c', amount: 50 },
        'vitamin-d': { id: 'vitamin-c', amount: 50 },
      },
    },
  };

  // Act
  const totalInCart = getTotal({ cartProducts, products });

  // Assert
  expect(totalInCart).toBe(20);

  // Act
  const total = getTotal({ cartProducts: {}, products });

  // Assert
  expect(total).toBe(0);
});

test('getCartLimits', () => {
  // Arrange
  const products = {
    'id-1': {
      id: 'id-1',
      name: 'Vitamin A',
      price: 6,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 1000 },
      },
    },
    'id-2': {
      id: 'id-2',
      name: 'Vitamin C',
      price: 8,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 500 },
        'vitamin-c': { id: 'vitamin-c', amount: 50 },
      },
    },
  };
  const config = {
    tolerableUpperLimits: {
      'vitamin-a': {
        id: 'vitamin-a',
        amount: 1500,
        unit: 'mcg',
      },
      'vitamin-c': {
        id: 'vitamin-c',
        amount: 1000,
        unit: 'mg',
      },
      'vitamin-d': {
        id: 'vitamin-d',
        amount: 75,
        unit: 'mcg',
      },
      'vitamin-e': {
        id: 'vitamin-e',
        amount: 540,
        unit: 'mg',
      },
    },
    currency: 'GBP',
  };
  let cartProducts = null;

  // Act
  let result = getCartLimits({ products, cartProducts, config });

  // Assert
  expect(result).toStrictEqual(null);

  // Arrange
  cartProducts = {
    'id-1': {
      id: 'id-1',
      count: 1,
    },
    'id-2': {
      id: 'id-2',
      count: 1,
    },
  };

  // Act
  result = getCartLimits({ products, cartProducts, config });

  // Assert
  expect(result).toStrictEqual({
    'vitamin-a': { amount: 0 },
    'vitamin-c': { amount: 950 },
    'vitamin-d': { amount: 75 },
    'vitamin-e': { amount: 540 },
  });
});

test('isProductDisabled', () => {
  // Arrange
  const nutrients = {
    'vitamin-a': {
      amount: 1000,
      id: 'vitamin-a',
    },
  };
  let cartLimits = {
    'vitamin-a': { amount: 1000 },
  };

  // Act
  let isDisabled = isProductDisabled({ nutrients, cartLimits });

  // Assert
  expect(isDisabled).toBe(false);

  // Arrange
  cartLimits = {
    'vitamin-a': { amount: 999 },
  };

  // Act
  isDisabled = isProductDisabled({ nutrients, cartLimits });

  // Assert
  expect(isDisabled).toBe(true);
});
