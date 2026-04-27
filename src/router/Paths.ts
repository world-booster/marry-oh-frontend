// src/router/paths.ts

export const PATHS = {
  HOME: "/",

  NOT_FOUND: "/not-found",

  PRODUCT_DETAIL: (id: number | string) => `/product/${id}`,
};  