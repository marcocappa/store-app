// API interfaces:
export interface INutrientsAPI {
  id: string;
  amount: number;
  unit?: string;
}

export interface IProductAPI {
  name: string;
  price: number;
  nutrients: INutrientsAPI[];
}

export interface ITolerableUpperLimitsAPI {
  id: string;
  amount: number;
  unit: string;
}

export interface IConfigAPI {
  tolerableUpperLimits: ITolerableUpperLimitsAPI[];
  currency: string;
}

// Data interfaces:
export interface INutrient {
  id: string;
  amount: number;
  unit?: string;
}

export interface INutrients {
  [key: string]: INutrient;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  nutrients: INutrients;
}

export interface IProducts {
  [key: string]: IProduct;
}

export interface ITolerableUpperLimits {
  [key: string]: ITolerableUpperLimitsAPI;
}

export interface IConfig {
  tolerableUpperLimits: ITolerableUpperLimits;
  currency: string;
}

export interface ICartProduct {
  id: string;
  count: number;
}

export interface ICartProducts {
  [key: string]: ICartProduct;
}

export interface ICart {
  products: ICartProducts;
  total: number;
}

export interface ITotal {
  cartProducts: ICartProducts;
  products: IProducts;
}

export interface ILimitsProps {
  products: IProducts;
  config: IConfig;
  cartProducts: ICartProducts;
}

export interface ILimit {
  [key: string]: {
    amount: number;
  };
}

export interface IButtonDisabledProp {
  nutrients: INutrients;
  cartLimits: ILimit;
}
