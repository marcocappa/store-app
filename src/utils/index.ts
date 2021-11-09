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
  IUpperLimitsProps,
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

export function getTotalVitamins({
  products,
  config,
  cartProducts,
}: ILimitsProps): ILimit | null {
  if (!cartProducts) return null;
  const totalInCart = Object.keys(config.tolerableUpperLimits).reduce(
    (acc, key) => {
      const total = Object.values(cartProducts).reduce((amount, cart) => {
        if (Object.keys(products[cart.id].nutrients).includes(key)) {
          const { count } = cart;
          const nutrientAmount = products[cart.id].nutrients[key].amount;
          return amount + count * nutrientAmount;
        }
        return amount;
      }, 0);
      if (total === 0) {
        return acc;
      }
      return {
        ...acc,
        [key]: {
          amount: total,
        },
      };
    },
    {}
  );
  return getUpperLimits({ totalVitamins: totalInCart, config });
}

export function getUpperLimits({
  totalVitamins,
  config,
}: IUpperLimitsProps): ILimit | null {
  if (!totalVitamins || Object.keys(totalVitamins).length === 0) return null;
  return Object.keys(totalVitamins).reduce((acc, key) => {
    if (config.tolerableUpperLimits[key].amount >= totalVitamins[key].amount) {
      return acc;
    }

    return {
      ...acc,
      [key]: { amount: totalVitamins[key].amount },
    };
  }, {});
}
