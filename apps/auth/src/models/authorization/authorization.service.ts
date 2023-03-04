import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CoreTcpClientService,
  EncryptionService,
  LoginDto,
  MicroservicesErrors,
  RegistrationDto,
} from '@template/common';
import { AuthorizationRedisService } from './authorization.redis.service';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly authorizationCacheService: AuthorizationRedisService,

    @Inject(forwardRef(() => CoreTcpClientService))
    private readonly coreTcpClientService: CoreTcpClientService,
  ) {}

  public async createUserToken(id: number): Promise<string> {
    try {
      const token = this.encryptionService.encodingUserPayload({ id });
      await this.authorizationCacheService.addUserToken(id, token, 0);
      return token;
    } catch (e) {
      throw new InternalServerErrorException(
        MicroservicesErrors.SERVICE_UNAVAILABLE,
      );
    }
  }

  public async getUserToken(id: number): Promise<string> {
    const token = await this.authorizationCacheService.getUserToken(id);
    if (!token)
      throw new NotFoundException(MicroservicesErrors.USER_TOKEN_NOT_FOUND);
    return token;
  }

  public async getUserId(token: string): Promise<number> {
    const userData = this.encryptionService.decodingUserToken(token);
    const availableToken = await this.getUserToken(userData.id);
    if (availableToken != token)
      throw new BadRequestException(MicroservicesErrors.USER_TOKEN_INVALID);
    return userData.id;
  }

  public async deleteUserToken(userId: number): Promise<void> {
    return await this.authorizationCacheService.deleteUserToken(userId);
  }

  public async login(dto: LoginDto): Promise<string> {
    const user = await this.coreTcpClientService.login(dto);
    const compare = await this.encryptionService.compareUserPassword(
      user.hash,
      dto.password,
    );
    if (!compare)
      throw new BadRequestException(MicroservicesErrors.AUTH_DATA_INVALID);

    return await this.createUserToken(user.id);
  }

  public async registration(dto: RegistrationDto): Promise<string> {
    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException(
        MicroservicesErrors.USER_PASSWORD_MIS_MATCH,
      );

    const hash = await this.encryptionService.encodingUserPassword(
      dto.password,
    );

    const id = await this.coreTcpClientService.registartion({
      ...dto,
      password: hash,
    });
    return await this.createUserToken(id);
  }
}
