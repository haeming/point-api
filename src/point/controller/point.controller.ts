import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PointService} from "../service/point.service";
import {EarnResponseDto} from "../dtos/earn.response.dto";
import {EarnRequestDto} from "../dtos/earn.request.dto";
import {BalanceResponseDto} from "../dtos/balance.response.dto";

@Controller("api/point")
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Get("balance/:userId")
    async getBalance(@Param("userId") userId: string): Promise<BalanceResponseDto> {
        const result = await this.pointService.getBalance({userId});
        return {
            balance: result.balance
        }
    }

    @Post("earn/:userId")
    async earnPoint(
        @Param("userId") userId: string,
        @Body() body: {amount: number | string}
    ): Promise<EarnResponseDto> {
        const input: EarnRequestDto = {
            userId,
            amount: Number(body.amount)
        };
        const result = await this.pointService.earnPoint(input);
        return result;
    }
}