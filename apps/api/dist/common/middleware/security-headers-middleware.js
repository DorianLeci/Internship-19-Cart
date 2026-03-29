"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHeadersMiddleware = void 0;
const common_1 = require("@nestjs/common");
let SecurityHeadersMiddleware = class SecurityHeadersMiddleware {
    use(req, res, next) {
        const contentType = req.headers['content-type'];
        const userAgent = req.headers['user-agent'];
        const allowedContentTypes = ['application/json'];
        if (contentType && !allowedContentTypes.some((type) => contentType.startsWith(type)))
            throw new common_1.BadRequestException('Content-Type must be application/json');
        if (!userAgent || userAgent.length < 5)
            throw new common_1.BadRequestException('Missing or invalid User-Agent header');
        const allowedUserAgents = [/Mozilla/i, /Postman/i];
        if (!allowedUserAgents.some((regex) => regex.test(userAgent)))
            throw new common_1.BadRequestException(`Blocked User-Agent: ${userAgent}`);
        next();
    }
};
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware;
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware = __decorate([
    (0, common_1.Injectable)()
], SecurityHeadersMiddleware);
//# sourceMappingURL=security-headers-middleware.js.map