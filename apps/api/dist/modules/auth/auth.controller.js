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
exports.AuthController = void 0;
const api_response_decorator_1 = require("@decorators/api-response.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const auth_service_1 = require("./auth.service");
const access_token_dto_1 = require("./dto/access-token.dto");
const login_request_dto_1 = require("./dto/login-request.dto");
const register_request_dto_1 = require("./dto/register-request.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        return this.authService.login(req.user);
    }
    async register(registerBody) {
        return this.authService.register(registerBody);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard, (0, passport_1.AuthGuard)('local')),
    (0, throttler_1.Throttle)({
        default: {
            limit: 5,
            ttl: (0, throttler_1.seconds)(60),
            blockDuration: (0, throttler_1.seconds)(900),
        },
    }),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: login_request_dto_1.LoginRequestDto }),
    (0, api_response_decorator_1.ApiOkMessage)({ message: 'User successfully authenticated', type: access_token_dto_1.AccessTokenDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Email or password does not exist' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, api_response_decorator_1.ApiCreatedMessage)({ message: 'User successfully registered', type: access_token_dto_1.AccessTokenDto }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Validation failed (e.g., invalid email or weak password)',
    }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Email already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_request_dto_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map