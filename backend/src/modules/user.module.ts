import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "src/controllers/user.controller";
import { User } from "src/entities/user/user";
import { UsersService } from "src/services/user/user.service";
import { AuthnModule } from "./auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService]
})

export class UserModule {}