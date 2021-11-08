import { transformProducts, reduceNutrients } from './';

// mock ids generated from uuid
const mockIds = ['random-id-1', 'random-id-2'];

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
    'random-id-1': {
      id: 'random-id-1',
      name: 'Vitamin A',
      price: 6,
      nutrients: {
        'vitamin-a': { id: 'vitamin-a', amount: 800 },
      },
    },
    'random-id-2': {
      id: 'random-id-2',
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
