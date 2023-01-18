import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthService } from "src/services/auth/auth.service";
import { AuthController } from "src/controllers/auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/services/auth/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/services/auth/constants";
import { JwtStrategy } from "src/services/auth/jwt.strategy";
@Module({
    imports: [
     UserModule,
     PassportModule,
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3000s' },
      }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})

export class AuthnModule {}