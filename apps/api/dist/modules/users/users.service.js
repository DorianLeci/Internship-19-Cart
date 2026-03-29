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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("@prisma/prisma.service");
const map_to_dto_helper_1 = __importDefault(require("./helpers/map-to-dto.helper"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        return this.prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: {
                    create: user.address,
                },
                card: {
                    create: user.card,
                },
            },
            include: {
                address: true,
                card: true,
            },
        });
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findOneByid(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                address: true,
                card: true,
            },
        });
    }
    async getProfile(userId) {
        const user = await this.findOneByid(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return (0, map_to_dto_helper_1.default)(user);
    }
    async updateProfile(userId, dto) {
        const user = await this.findOneByid(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const { address, card, ...otherFields } = dto;
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...otherFields,
                address: address ? { update: address } : undefined,
                card: card ? { update: card } : undefined,
            },
            include: {
                address: true,
                card: true,
            },
        });
        return (0, map_to_dto_helper_1.default)(updatedUser);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map