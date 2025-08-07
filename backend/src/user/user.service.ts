import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    public constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: string) {
        const user = await this.prismaService.user.findUnique({ where: { id } });

        if (!user) throw new NotFoundException("Пользователь не найден!")
        
        return user
    }
    public async findByEmail(email: string) {
        const user = await this.prismaService.user.findFirst({
          where: { email },
        });

        return user
     }
    public async create(body: UserDto) {
        const user = await this.prismaService.user.create({ data: body });

        return user
    }
}
