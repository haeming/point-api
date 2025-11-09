import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PointService} from "../service/point.service";
import {BalanceResponseDto} from "./dtos/balance.response.dto";
import {EarnOutputDto} from "../service/dtos/earn.output.dto";
import {EarnInputDto} from "../service/dtos/earn.input.dto";

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
    ): Promise<EarnOutputDto> {
        const input: EarnInputDto = {
            userId,
            amount: Number(body.amount)
        };
        const result = await this.pointService.earnPoint(input);
        return result;
    }
}