export default {
  products: [
    {
      name: 'Vitamin A',
      price: 6,
      nutrients: [
        {
          id: 'vitamin-a',
          amount: 800,
        },
      ],
    },
    {
      name: 'Vitamin C',
      price: 4.5,
      nutrients: [
        {
          id: 'vitamin-c',
          amount: 500,
        },
      ],
    },
    {
      name: 'Vitamin D',
      price: 2.3,
      nutrients: [
        {
          id: 'vitamin-d',
          amount: 25,
        },
      ],
    },
    {
      name: 'Vitamins A, C & E',
      price: 10.0,
      nutrients: [
        {
          id: 'vitamin-a',
          amount: 800,
        },
        {
          id: 'vitamin-c',
          amount: 500,
        },
        {
          id: 'vitamin-e',
          amount: 500,
        },
      ],
    },
    {
      name: 'Vitamin C and Zinc',
      price: 5.6,
      nutrients: [
        {
          id: 'vitamin-c',
          amount: 500,
        },
        {
          id: 'zinc',
          amount: 15,
        },
      ],
    },
  ],
  config: {
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
      {
        id: 'vitamin-d',
        amount: 75,
        unit: 'mcg',
      },
      {
        id: 'vitamin-e',
        amount: 540,
        unit: 'mg',
      },
      {
        id: 'zinc',
        amount: 25,
        unit: 'mg',
      },
    ],
    currency: 'GBP',
  },
};
