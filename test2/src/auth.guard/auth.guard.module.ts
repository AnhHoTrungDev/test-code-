import { Module, Global } from "@nestjs/common";
import { AuthGuardService } from "./auth.guard.service";
import { AuthorsModule } from "src/authors/authors.module";

@Global()
@Module({
  imports: [AuthorsModule],
  providers: [AuthGuardService],
  exports: [AuthGuardService]
})
export class AuthGuardModule {}
