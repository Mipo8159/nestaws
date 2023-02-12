import { IJwtPayload } from '@app/modules/token/interfaces/jwt_payload.interface';
import { IRequest } from '@app/shared/interfaces/request.interface';
import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { UserService } from '../user.service';

export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: IRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(' ').pop();

    try {
      const { id } = this.jwtService.decode(token) as IJwtPayload;
      const user = await this.userService.findUserById(id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
