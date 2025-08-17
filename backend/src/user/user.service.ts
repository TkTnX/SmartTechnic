import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "src/auth/dto/register.dto";
import { UserDto } from "./dto/user.dto";

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
        orders: true,
        cartProducts: {
          orderBy: {
            quantity: "desc",
          },
          include: {
            product: { include: productInclude },
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
    let newAvatar: File | string = dto.avatar;

    if (typeof newAvatar === "object") {
      // todo: upload file
      newAvatar = ""      
    }


    return await this.prismaService.user.update({
      where: { id: user.id },
      data: {...dto, avatar: newAvatar},
    });
  }
}
