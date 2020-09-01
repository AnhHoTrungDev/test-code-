import { Module, HttpModule } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    HttpModule,
    MulterModule.register({
      dest: "./tmp"
    })
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
