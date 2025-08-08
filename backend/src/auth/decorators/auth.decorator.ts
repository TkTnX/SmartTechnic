import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Authorization(...roles: Role[]) {
    if (roles.length > 0) return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
    
    return applyDecorators(UseGuards(AuthGuard))
}