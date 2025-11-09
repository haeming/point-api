import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PointService} from "../service/point.service";
import {PointTransactionResponseDto} from "../dtos/point-transaction.response.dto";
import {BalanceResponseDto} from "../dtos/balance.response.dto";
import {PointTransactionRequestDto} from "../dtos/point-transaction.request.dto";

@Controller("api/point")
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get("balance/:userId")
    async getBalance(@Param("userId") userId: string): Promise<BalanceResponseDto> {
        return await this.pointService.getBalance({userId});
    }

    @Post("earn/:userId")
    async earnPoint(
        @Param("userId") userId: string,
        @Body() body: {amount: number | string}
    ): Promise<PointTransactionResponseDto> {
        const input: PointTransactionRequestDto = {
            userId,
            amount: Number(body.amount)
        };

        return await this.pointService.earnPoint(input);
    }
}