import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "testsecret",
            signOptions: {expiresIn: "1h"},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}