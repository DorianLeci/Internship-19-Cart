"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const auth_decorator_1 = require("@decorators/auth.decorator");
const optional_token_guard_1 = require("@guards/optional-token.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const paginated_response_dto_1 = require("src/common/response/paginated-response.dto");
const create_product_dto_1 = require("./dto/create-product.dto");
const find_products_dto_1 = require("./dto/find-products.dto");
const response_dto_1 = require("./dto/response.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(dto, req) {
        const userId = req.user?.sub;
        return this.productsService.findProducts(dto, userId);
    }
    findOne(id, req) {
        const userId = req.user?.sub;
        return this.productsService.findOne(id, userId);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, auth_decorator_1.RolesAuth)(client_1.Role.ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Returns id if product is successfuly created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(optional_token_guard_1.OptionalTokenGuard),
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOkResponse)({
        type: (0, paginated_response_dto_1.SwaggerPaginatedApiResponse)(response_dto_1.ProductListDto, 'ProductListDto'),
        description: 'Returns a paginated list of products matching the search and filter criteria',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_products_dto_1.FindProductsDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(optional_token_guard_1.OptionalTokenGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({
        type: () => response_dto_1.ProductResponseDto,
        description: 'Returns detailed information for a single product',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map