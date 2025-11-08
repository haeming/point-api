import {Body, Controller, Get, Post} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {LoginRequestDto} from "./dtos/login.request.dto";
import {LoginResponseDto} from "./dtos/login.response.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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