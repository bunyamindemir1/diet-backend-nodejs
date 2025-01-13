import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO'da olmayan alanları otomatik kaldırır
      forbidNonWhitelisted: true, // DTO dışında bir alan varsa hata döner
      transform: true, // Gelen veriyi otomatik olarak dönüşüm yapar (örneğin string -> number)
    }),
  );

  // Swagger yapılandırması
  const config = new DocumentBuilder()
    .setTitle('Diet Planner API') // Başlık
    .setDescription('API Documentation for Diet Planner') // Açıklama
    .setVersion('1.0') // Sürüm
    .addTag('diet') // Örnek bir tag (isteğe bağlı)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS (Çapraz Kaynak İstekleri) aktif etme
  app.enableCors({
    origin: '*', // Geliştirme sırasında tüm kaynaklara izin verir, prod'da sıkılaştırılabilir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Uygulama dinleyici portu
  const port = process.env.PORT || 3000; // PORT çevre değişkeninden okunur, yoksa 3000 kullanılır
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();