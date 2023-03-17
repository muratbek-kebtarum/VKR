import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {Logger} from "@nestjs/common";

require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('ГосСтрой')
      .addBearerAuth()
      .setDescription('Платформа ')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);
  await app.listen(process.env.PORT || 3001, () =>
      Logger.log(
          `Server has been started succesfully on http://localhost:${process.env.PORT}`,
          "Bootstrap"
      )
  );
}
bootstrap();
