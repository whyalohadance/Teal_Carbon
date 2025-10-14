import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true; // dacă nu s-a cerut rol, permite

    const req = context.switchToHttp().getRequest();
    const user = req.user; // din middleware

    if (!user || !user.role) return false;

    // dacă user.role e în requiredRoles → OK
    return requiredRoles.includes(user.role);
  }
}
