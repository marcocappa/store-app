import {
  IProductAPI,
  INutrientsAPI,
  ITolerableUpperLimitsAPI,
  IConfigAPI,
  IProducts,
  INutrients,
  ITolerableUpperLimits,
  IConfig,
  ITotal,
  ILimitsProps,
  ILimit,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

export function reduceNutrients(nutrients: INutrientsAPI[]): INutrients {
  return nutrients.reduce((nutrientsAcc, currentNutrient) => {
    return {
      ...nutrientsAcc,
      [currentNutrient.id]: currentNutrient,
    };
  }, {});
}

export function transformProducts(products: IProductAPI[]): IProducts {
  return products.reduce((productAcc, currentProduct) => {
    const id = uuidv4();
    const nutrients = reduceNutrients(currentProduct.nutrients);
    return {
      ...productAcc,
      [id]: {
        ...currentProduct,
        id,
        nutrients,
      },
    };
  }, {});
}

export function transformTolerableUpperLimits(
  tolerableUpperLimits: ITolerableUpperLimitsAPI[]
): ITolerableUpperLimits {
  return tolerableUpperLimits.reduce((acc, current) => {
    return {
      ...acc,
      [current.id]: current,
    };
  }, {});
}

export function transformConfig(config: IConfigAPI): IConfig {
  return {
    ...config,
    tolerableUpperLimits: transformTolerableUpperLimits(
      config.tolerableUpperLimits
    ),
  };
}

export function getTotal({ cartProducts, products }: ITotal): number {
  if (!cartProducts) return 0;
  return Object.keys(cartProducts).reduce((total, currentKey) => {
    const { count } = cartProducts[currentKey];
    const { price } = products[currentKey];
    return total + count * price;
  }, 0);
}

export function getLimits({
  products,
  config,
  cartProducts,
}: ILimitsProps): ILimit | null {
  if (!cartProducts) return null;

  const addedProduct = Object.keys(cartProducts).reduce(
    (acc: ILimit, currentKey) => {
      const qty = cartProducts[currentKey].count;
      const nutrients = products[currentKey].nutrients;
      const limits: ILimit = Object.keys(nutrients).reduce(
        (nutrientsAcc, currentNutrientKey) => {
          return {
            ...nutrientsAcc,
            [currentNutrientKey]: {
              amount: nutrients[currentNutrientKey].amount * qty,
            },
          };
        },
        {}
      );

      if (Object.keys(acc).length === 0) {
        return limits;
      }

      console.log('acc keys', Object.keys(acc));
      console.log('nutrients keys', Object.keys(nutrients));
      console.log('currentKey', currentKey);

      if (Object.keys(acc).includes(currentKey)) {
        console.log('in here');
        const amount = acc[currentKey].amount + limits[currentKey].amount;
        return {
          ...acc,
          [currentKey]: {
            amount,
          },
        };
      }

      return { ...acc, ...limits };
    },
    {}
  );

  return addedProduct;
}
