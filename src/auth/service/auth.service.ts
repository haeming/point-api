import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {MemoryDb} from "../../common/data/memory.db";
import {SignupRequestDto} from "../dtos/signup.request.dto";
import {SignupResponseDto} from "../dtos/signup.response.dto";
import {LoginRequestDto} from "../dtos/login.request.dto";
import {LoginResponseDto} from "../dtos/login.response.dto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly db: MemoryDb) {}

    async signup(input: SignupRequestDto): Promise<SignupResponseDto> {
        const exits = this.db.findUserById(input.userId);
        if(exits){
            throw new BadRequestException("이미 존재하는 계정입니다.");
        }

        this.db.saveUser({userId: input.userId, password: input.password});
        return {userId: input.userId, message: "회원가입에 성공했습니다."};
    }

    async login(input: LoginRequestDto): Promise<LoginResponseDto> {
        const user = this.db.findUserById(input.userId);
        if(!user || user.password != input.password){
            throw new BadRequestException("아이디 혹은 비밀번호가 올바르지 않습니다.");
        }

        const payload = {sub: input.userId};
        return {
            token: this.jwtService.sign(payload),
            expiresIn: 3600,
            userId: input.userId
        }
    }
}