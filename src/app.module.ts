import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DenunciaModule } from './denuncias/infra/denuncia.module';

@Module({
  imports: [DenunciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
