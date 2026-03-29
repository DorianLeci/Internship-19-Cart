"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mapToVariantDto = (variant) => {
    return {
        id: variant.id,
        shirtSize: variant.shirtSize ?? undefined,
        shoeSize: variant.shoeSize ?? undefined,
        stock: variant.stock,
    };
};
const us = client_1.ProductType;
exports.default = mapToVariantDto;
//# sourceMappingURL=map-to-variant-dto.helper.js.map