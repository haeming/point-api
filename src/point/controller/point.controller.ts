import {Controller, Get, Param} from "@nestjs/common";
import {PointService} from "../service/point.service";
import {BalanceResponseDto} from "./dtos/balance.response.dto";

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
}