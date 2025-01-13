import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Doğru PrismaService yolu
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Kullanıcı oluştur
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // Tüm kullanıcıları getir
  async findAll() {
    return this.prisma.user.findMany();
  }

  // ID'ye göre kullanıcı getir
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Kullanıcı güncelle
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Kullanıcı sil
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}