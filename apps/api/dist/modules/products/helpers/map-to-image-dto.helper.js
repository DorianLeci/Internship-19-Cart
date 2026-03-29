"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapToImageDto = (img) => {
    return {
        id: img.id,
        url: img.url,
        color: img.color ?? undefined,
    };
};
exports.default = mapToImageDto;
//# sourceMappingURL=map-to-image-dto.helper.js.map