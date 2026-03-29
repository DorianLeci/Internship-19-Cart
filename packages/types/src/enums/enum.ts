export const ProductType={
    CLOTHING: "CLOTHING",
    SHOES: "SHOES"
} as const;

export type ProductType=(typeof ProductType)[keyof typeof ProductType]

export const ShirtSize={
  XS : "XS",
  S : "S",
  M : "M",
  L : "L",
  XL : "XL",
  XXL : "XXL",
  XXXL : "XXXL"
}

export type ShirtSize=(typeof ShirtSize)[keyof typeof ShirtSize]