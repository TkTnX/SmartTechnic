import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "src/auth/decorators/authorized.decorator";
import { Authorization } from "src/auth/decorators/auth.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  async getProfile(@Authorized("id") id: string) {
    return await this.userService.findById(id);
  }
}
