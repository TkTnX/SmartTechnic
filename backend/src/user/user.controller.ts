import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Authorized } from "src/auth/decorators/authorized.decorator";
import { Authorization } from "src/auth/decorators/auth.decorator";
import { UserDto } from "./dto/user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

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
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        },
      }),
    })
  )
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Authorized("id") userId: string,
    @UploadedFile() avatar: Express.Multer.File,
    @Body() dto: UserDto
  ) {
    dto = {
      ...dto,
      avatar,
    };


    return await this.userService.updateProfile(userId, dto);
  }
}
