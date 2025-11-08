import {Controller, Get, UseGuards, Request} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import { Request as ExpressRequest } from 'express';

@Controller("user")
export class UserController {
    @UseGuards(JwtAuthGuard)
    @Get("info")
    getInfo(@Request() request: ExpressRequest) {
        return {message: "인증된 사용자입니다.", user: request.user};
    }
}