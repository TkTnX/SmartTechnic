import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { Authorization } from "./decorators/auth.decorator";
import { NewPasswordDto } from "./dto/new-password.dto";
import { Authorized } from "./decorators/authorized.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.authService.register(req, dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Authorization()
  @Patch("new-password")
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Authorized("id") userId: string,
    @Body() dto: NewPasswordDto
  ) {
    return await this.authService.updatePassword(userId, dto);
  }

  @Post("verify-email")
  async verifyEmail(
    @Body("email") email: string,
    @Body("token") token?: string
  ) {
    return await this.authService.verifyEmail(email, token);
  }
  @Post("forgot-password")
  async forgotPassword(
    @Body("email") email: string,
    @Body("token") token?: string,
    @Body("password") password?:string 
  ) {
    return await this.authService.forgotPassword(email, token, password);
  }
}
