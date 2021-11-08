import {
  IProductAPI,
  INutrientsAPI,
  ITolerableUpperLimitsAPI,
  IConfigAPI,
  IProducts,
  INutrients,
  ITolerableUpperLimits,
  IConfig,
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
