import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
// import { AuthService } from "./auth/auth.service";
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule,AuthModule, ProductsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService]
})
export class AppModule {}
