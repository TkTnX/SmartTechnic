import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService],
})
export class AuthModule {}
