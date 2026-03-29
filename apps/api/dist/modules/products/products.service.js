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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const types_1 = require("@cart-app/types");
const sort_order_enum_1 = require("@enums/sort-order.enum");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@prisma/prisma.service");
const paginate_util_1 = require("@utils/paginate.util");
const map_to_image_dto_helper_1 = __importDefault(require("./helpers/map-to-image-dto.helper"));
const map_to_variant_dto_helper_1 = __importDefault(require("./helpers/map-to-variant-dto.helper"));
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { variants, images, ...otherFields } = dto;
        for (const v of variants) {
            if (dto.type === types_1.ProductType.CLOTHING && v.shoeSize !== undefined)
                throw new common_1.BadRequestException('Clothing products cannot have shoe size in variants');
            if (dto.type === types_1.ProductType.SHOES && v.shirtSize !== undefined)
                throw new common_1.BadRequestException('Shoe products cannot have shirt size in variants');
        }
        return this.prisma.product.create({
            data: {
                ...otherFields,
                variants: {
                    create: variants.map((v) => ({
                        shirtSize: v.shirtSize ?? undefined,
                        shoeSize: v.shoeSize ?? undefined,
                        stock: v.stock,
                    })),
                },
                images: {
                    create: images.map((img) => ({
                        url: img.url,
                        color: img.color ?? undefined,
                    })),
                },
            },
            include: {
                variants: true,
                images: true,
            },
        });
    }
    async findProducts(query, userId) {
        const where = {};
        if (query.search)
            where.name = { contains: query.search, mode: 'insensitive' };
        const orderBy = { name: query.sortOrder || sort_order_enum_1.SortOrder.ASC };
        if (query.inStock === true)
            where.variants = { some: { stock: { gt: 0 } } };
        else if (query.inStock === false)
            where.variants = { none: { stock: { gt: 0 } } };
        if (query.categoryId)
            where.categoryId = query.categoryId;
        const paginated = await (0, paginate_util_1.paginate)({
            model: this.prisma.product,
            where,
            orderBy,
            page: query.pageNumber,
            limit: query.limit,
            include: { images: true, variants: true, favorites: userId ? { where: { userId } } : false },
        });
        let favoriteIds = new Set();
        if (userId) {
            const favorites = await this.prisma.favorite.findMany({
                where: {
                    userId,
                    productId: { in: paginated.results.map((p) => p.id) },
                },
                select: { productId: true },
            });
            favoriteIds = new Set(favorites.map((f) => f.productId));
        }
        const resultsWithFavorite = paginated.results.map((p) => ({
            id: p.id,
            name: p.name,
            price: Number(p.price),
            images: p.images.map((img) => (0, map_to_image_dto_helper_1.default)(img)),
            isFavorite: favoriteIds.has(p.id),
            variants: p.variants.map((v) => (0, map_to_variant_dto_helper_1.default)(v)),
        }));
        return {
            ...paginated,
            results: resultsWithFavorite,
        };
    }
    async findOne(productId, userId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: { images: true, variants: true },
        });
        if (!product)
            throw new common_1.NotFoundException(`Product with ${productId} not found`);
        let isFavorite = false;
        if (userId) {
            const favorite = await this.prisma.favorite.findUnique({
                where: {
                    userId_productId: {
                        userId,
                        productId,
                    },
                },
            });
            isFavorite = !!favorite;
        }
        const variants = product.variants.map((v) => (0, map_to_variant_dto_helper_1.default)(v));
        return {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            description: product.description,
            brand: product.brand,
            type: product.type,
            images: product.images.map((img) => (0, map_to_image_dto_helper_1.default)(img)),
            isFavorite,
            variants,
        };
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map