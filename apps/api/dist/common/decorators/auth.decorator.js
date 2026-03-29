"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesAuth = RolesAuth;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("./roles.decorator");
function RolesAuth(...roles) {
    return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }), (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }));
}
//# sourceMappingURL=auth.decorator.js.map