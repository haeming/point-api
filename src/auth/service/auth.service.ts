import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {LoginInputDto} from "./dtos/login.input.dto";
import {LoginOutputDto} from "./dtos/login.output.dto";
import {SignupInputDto} from "./dtos/signup.input.dto";
import {SignupOutputDto} from "./dtos/signup.output.dto";
import {MemoryDb} from "../../common/data/memory.db";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private db: MemoryDb) {}

    async signup(input: SignupInputDto): Promise<SignupOutputDto> {
        const exits = this.db.findUserById(input.userId);
        if(exits){
            throw new BadRequestException("이미 존재하는 계정입니다.");
        }

        this.db.saveUser({userId: input.userId, password: input.password});
        return {userId: input.userId, success: true};
    }

    async login(input: LoginInputDto): Promise<LoginOutputDto> {
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