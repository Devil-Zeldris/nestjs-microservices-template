import { Module } from "@nestjs/common";
import { TcpClientsModule } from "@template/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
  imports: [TcpClientsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
