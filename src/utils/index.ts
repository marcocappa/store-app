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
  IButtonDisabledProp,
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
    return Number((total + count * price).toFixed(2));
  }, 0);
}

export function getCartLimits({
  products,
  config,
  cartProducts,
}: ILimitsProps): ILimit | null {
  if (
    !cartProducts ||
    !config ||
    !Object.keys(config).includes('tolerableUpperLimits') ||
    !products
  )
    return null;
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

      return {
        ...acc,
        [key]: {
          amount: config.tolerableUpperLimits[key].amount - total,
        },
      };
    },
    {}
  );
  return totalInCart;
}

export const isProductDisabled = ({
  nutrients,
  cartLimits,
}: IButtonDisabledProp): boolean => {
  if (
    !nutrients ||
    !cartLimits ||
    Object.keys(cartLimits).length === 0 ||
    Object.keys(nutrients).length === 0
  )
    return false;

  const cartLimitsArray = Object.keys(cartLimits).map((currentKey) => {
    if (!Object.keys(nutrients).includes(currentKey)) return false;
    if (cartLimits[currentKey].amount - nutrients[currentKey].amount >= 0) {
      return false;
    }
    return true;
  });
  return cartLimitsArray.some((i) => i === true);
};
