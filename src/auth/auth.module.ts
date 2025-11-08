import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {CommonModule} from "../common/common.module";

@Module({
    imports: [
        JwtModule.register({
            secret: "rhkwpdyddlqslekrltdpdksdhffkrkfRkqhkrmsidwjrtmqslek",
            signOptions: {expiresIn: "1h"},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, CommonModule],
    exports: [AuthService]
})
export class AuthModule {}