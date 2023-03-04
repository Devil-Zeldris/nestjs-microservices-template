import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsEntity } from './entity/accounts.entity';
import { Repository } from 'typeorm';
import {
  LoginDto,
  MicroservicesErrors,
  RegistrationDto,
} from '@template/common';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(AccountsEntity)
    private readonly accountsRepository: Repository<AccountsEntity>,
  ) {}

  public async registration(dto: RegistrationDto) {
    await this.emailIsExist(dto.email);
    await this.usernameIsExist(dto.username);

    const entity = this.accountsRepository.create({
      username: dto.username,
      email: dto.email,
      hash: dto.password,
    });
    const user = await this.accountsRepository.save(entity);
    return user.id;
  }

  public async login(dto: LoginDto) {
    const user = await this.accountsRepository.findOne({
      where: [{ username: dto.username }, { email: dto.username }],
    });
    if (!user) throw new NotFoundException(MicroservicesErrors.USER_NOT_FOUND);
  }

  public async getUser(id: number) {
    const user = await this.accountsRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email'],
    });
    if (!user) throw new NotFoundException(MicroservicesErrors.USER_NOT_FOUND);
    return user;
  }

  private async usernameIsExist(username: string) {
    const user = await this.accountsRepository.findOne({ where: { username } });
    if (user)
      throw new BadRequestException(MicroservicesErrors.USERNAME_IS_EXIST);
    return true;
  }

  private async emailIsExist(email: string) {
    const user = await this.accountsRepository.findOne({ where: { email } });
    if (user) throw new BadRequestException(MicroservicesErrors.EMAIL_IS_EXIST);
    return true;
  }
}
