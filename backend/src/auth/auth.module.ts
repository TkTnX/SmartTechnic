import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { MailService } from "src/mail/mail.service";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService, MailService],
})
export class AuthModule {}
