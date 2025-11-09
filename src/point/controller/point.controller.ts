import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PointService} from "../service/point.service";
import {PointTransactionResponseDto} from "../dtos/point-transaction.response.dto";
import {BalanceResponseDto} from "../dtos/balance.response.dto";
import {PointTransactionRequestDto} from "../dtos/point-transaction.request.dto";
import {HistoryListResponseDto} from "../dtos/history-list.response.dto";

@Controller("api/point")
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get("balance/:userId")
    async getBalance(@Param("userId") userId: string): Promise<BalanceResponseDto> {
        return this.pointService.getBalance({userId});
    }

    @Post("earn/:userId")
    async earnPoint(
        @Param("userId") userId: string,
        @Body() body: PointTransactionRequestDto
    ): Promise<PointTransactionResponseDto> {

        return this.pointService.earnPoint({
            userId,
            amount: Number(body.amount)
        });
    }

    @Post("use/:userId")
    async usePoint(
        @Param("userId") userId: string,
        @Body() body: PointTransactionRequestDto
    ): Promise<PointTransactionResponseDto> {

        return this.pointService.usePoint({
            userId,
            amount: Number(body.amount)
        });
    }

    @Get("history/:userId")
    async getHistory(@Param("userId") userId: string): Promise<HistoryListResponseDto> {
        return this.pointService.getHistory({userId});
    }
}