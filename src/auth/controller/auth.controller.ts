import {Body, Controller, Get, Post} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {LoginRequestDto} from "./dtos/login.request.dto";
import {LoginResponseDto} from "./dtos/login.response.dto";
import {SignupRequestDto} from "./dtos/signup.request.dto";
import {SignupResponseDto} from "./dtos/signup.response.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    async signup(@Body() dto: SignupRequestDto): Promise<SignupResponseDto> {
        const result = await this.authService.signup({
            userId: dto.userId,
            password: dto.password
        });
        return {
            userId: result.userId,
            message: "회원가입이 완료되었습니다."
        }
    }

    @Post("login")
    async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
        const result = await this.authService.login({
            userId: dto.userId,
            password: dto.password
        });
        return {
            token: result.token,
            expiresIn: result.expiresIn,
            userId: dto.userId
        }
    }
}