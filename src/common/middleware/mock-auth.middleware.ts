import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request { user?: any }
  }
}

@Injectable()
export class MockAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Citim headere din Postman: x-user-id si x-user-role
    const id = req.header('x-user-id');
    const role = req.header('x-user-role');

    if (id && role) {
      req.user = { id: parseInt(id, 10), role }; // exemplu: { id: 2, role: 'ADMIN' }
    }
    next();
  }
}
