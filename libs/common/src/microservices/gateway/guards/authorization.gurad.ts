import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  AuthTcpClientService,
  COOKIE_NAME,
  CoreTcpClientService,
  MicroservicesErrors,
  RequestInterface,
} from '@template/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthTcpClientService))
    private readonly authTcpClientService: AuthTcpClientService,
    @Inject(forwardRef(() => CoreTcpClientService))
    private readonly coreTcpClientService: CoreTcpClientService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as RequestInterface;
    const authorizationHeader = req.signedCookies[COOKIE_NAME];
    if (!authorizationHeader)
      throw new ForbiddenException(MicroservicesErrors.UNAUTHORIZED);

    req.userId = await this.authTcpClientService.getUserId(authorizationHeader);

    await this.coreTcpClientService.getUser(req.userId);
    return true;
  }
}
