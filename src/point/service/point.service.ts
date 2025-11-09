import {Injectable} from "@nestjs/common";
import {MemoryDb} from "../../common/data/memory.db";
import {BalanceRequestDto} from "../dtos/balance.request.dto";
import {BalanceResponseDto} from "../dtos/balance.response.dto";
import {EarnRequestDto} from "../dtos/earn.request.dto";
import {EarnResponseDto} from "../dtos/earn.response.dto";

@Injectable()
export class PointService {
    constructor(private readonly db: MemoryDb) {}

    async getBalance(request: BalanceRequestDto): Promise<BalanceResponseDto> {
        const balance = this.db.getBalance(request.userId);
        return {
            balance: balance
        }
    }

    async earnPoint(request: EarnRequestDto): Promise<EarnResponseDto> {
        const newBalance = this.db.updateBalance(request.userId, request.amount, 'EARN');
        const history = this.db.getHistory(request.userId)[0];

        return {
            userId: request.userId,
            newBalance,
            earnedAmount: request.amount,
            transactionId: history.id,
            timestamp: history.timestamp
        };
    }
}