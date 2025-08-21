import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class CompareService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  public async addToCompare(userId: string, productId: string) {
    const user = await this.userService.findById(userId);
    const compareItem = await this.prismaService.compareItem.findFirst({
      where: {
        productId,
        userId,
      },
    });

    if (compareItem) {
      return await this.prismaService.compareItem.delete({
        where: {
          id: compareItem.id,
        },
      });
    } else if (!compareItem && user.compareItems.length >= 3) {
      return { message: "Нельзя добавить больше 3 товаров в сравнение" };
    } else {
      return await this.prismaService.compareItem.create({
        data: {
          productId,
          userId,
        },
      });
    }
  }
}
