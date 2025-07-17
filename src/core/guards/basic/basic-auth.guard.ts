import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { BasicStrategy } from './basic.strategy';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { parseBasicAuth } from '../../utils/basic-auth.utility';
import { DomainExceptionCode } from '../../exceptions/domain-exceptions.codes';
import { DomainException } from '../../exceptions/domain-exceptions';


@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(
      private readonly strategy: BasicStrategy,
      private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const authHeader: string | undefined = request.headers.authorization;

        let username: string;
        let password: string;

        try {
            [username, password] = parseBasicAuth(authHeader);

            this.strategy.validate(username, password);

            return true;
        } catch (error) {
            throw new DomainException({
                code: DomainExceptionCode.Unauthorized,
                message: 'unauthorised',
            });
        }
    }
}
ыыыыы