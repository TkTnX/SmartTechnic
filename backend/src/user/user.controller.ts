import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "src/auth/decorators/authorized.decorator";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get("profile")
  @HttpCode(HttpStatus.OK)
  async getProfile(@Authorized("id") id: string) {
    return await this.userService.findById(id);
  }

  @Authorization()
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Authorized("id") userId: string, @Body() dto: UserDto) {
    return await this.userService.updateProfile(userId, dto)
  }
}
