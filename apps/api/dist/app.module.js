"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("@auth/auth.module");
const configuration_1 = __importDefault(require("@config/configuration"));
const user_throttler_guard_1 = require("@guards/user-throttler.guard");
const response_interceptor_1 = require("@interceptors/response.interceptor");
const logger_middleware_1 = require("@middleware/logger.middleware");
const security_headers_middleware_1 = require("@middleware/security-headers-middleware");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const throttler_1 = require("@nestjs/throttler");
const users_module_1 = require("@users/users.module");
const node_path_1 = require("node:path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./modules/products/products.module");
const users_controller_1 = require("./modules/users/users.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, security_headers_middleware_1.SecurityHeadersMiddleware)
            .forRoutes({ path: '*path', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                envFilePath: ['apps/api/.env', '.env'],
            }),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: (0, throttler_1.seconds)(60),
                        limit: 30,
                    },
                ],
            }),
            products_module_1.ProductsModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, node_path_1.join)(__dirname, '..', '..', 'web', 'dist'),
            }),
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            response_interceptor_1.ResponseInterceptor,
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: user_throttler_guard_1.UserThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map