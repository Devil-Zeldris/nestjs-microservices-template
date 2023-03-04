import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsEntity } from './entity/accounts.entity';
import { UsersController } from './users.controller';
import { UsersServices } from './users.services';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsEntity])],
  controllers: [UsersController],
  providers: [UsersServices],
})
export class UsersModule {}
