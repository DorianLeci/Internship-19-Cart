"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_filter_1 = require("@filters/http-exception.filter");
const response_interceptor_1 = require("@interceptors/response.interceptor");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const trim_pipe_1 = require("@pipes/trim.pipe");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
function mapValidationErrors(errors) {
    const result = {};
    errors.forEach((error) => {
        if (error.children && error.children.length > 0) {
            console.log(error.children);
            result[error.property] = mapValidationErrors(error.children);
        }
        else {
            result[error.property] = Object.values(error.constraints || {});
        }
    });
    return result;
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: configService.get('ALLOWED_ORIGINS')?.split(',') || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
        allowedHeader: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204,
        preflightContinue: false,
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new trim_pipe_1.TrimPipe(), new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors) => {
            return new common_1.BadRequestException({ message: mapValidationErrors(errors) });
        },
    }));
    app.useGlobalInterceptors(app.get(response_interceptor_1.ResponseInterceptor));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cart API')
        .setDescription('Cart application API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(configService.get('PORT') ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map