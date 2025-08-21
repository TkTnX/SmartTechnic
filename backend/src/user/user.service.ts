import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "src/auth/dto/register.dto";
import { UserDto } from "./dto/user.dto";
import * as path from "path";
import * as fs from "fs";
@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const productInclude = {
      category: true,
      reviews: true,
    };

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        favoriteProducts: {
          include: {
            product: { include: productInclude },
          },
        },
        reviews: true,
        orders: {
          include: {
            products: true,
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
        cartProducts: {
          orderBy: {
            quantity: "desc",
          },
          include: {
            product: { include: productInclude },
          },
        },
        compareItems: {
          include: {
            product: { include: { ...productInclude, specifications: true } },
          },
        },
      },
    });

    if (!user) throw new NotFoundException("Пользователь не найден!");

    return user;
  }
  public async findByEmailOrPhone(emailOrPhone: string) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ email: emailOrPhone }, { phone: emailOrPhone }] },
    });

    return user;
  }
  public async create(body: RegisterDto) {
    const user = await this.prismaService.user.create({ data: body });

    return user;
  }

  public async updateProfile(userId: string, dto: UserDto) {
    const user = await this.findById(userId);
    let avatar: Express.Multer.File | string = dto.avatar;
    if (dto.avatar) {
      avatar = `${process.env.SERVER_URL}/uploads/${avatar.filename}`;
    }

    console.log(avatar);

    return await this.prismaService.user.update({
      where: { id: user.id },
      data: { ...dto, avatar: avatar as string },
    });
  }
}
