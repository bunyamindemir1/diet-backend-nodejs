import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // PrismaModule'ü global hale getirir
@Module({
  providers: [PrismaService], // PrismaService'yi sağlayıcı olarak tanımlar
  exports: [PrismaService],   // PrismaService'i diğer modüllerle paylaşır
})
export class PrismaModule {}