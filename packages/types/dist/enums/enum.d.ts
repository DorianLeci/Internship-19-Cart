export declare const ProductType: {
    readonly CLOTHING: "CLOTHING";
    readonly SHOES: "SHOES";
};
export type ProductType = (typeof ProductType)[keyof typeof ProductType];
export declare const ShirtSize: {
    XS: string;
    S: string;
    M: string;
    L: string;
    XL: string;
    XXL: string;
    XXXL: string;
};
export type ShirtSize = (typeof ShirtSize)[keyof typeof ShirtSize];
