import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {LoginInputDto} from "./dtos/login.input.dto";
import {LoginOutputDto} from "./dtos/login.output.dto";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(input: LoginInputDto): Promise<LoginOutputDto> {
        const payload = {sub: input.userId};
        return {
            token: this.jwtService.sign(payload),
            expiresIn: 3600,
            userId: input.userId
        }
    }
}