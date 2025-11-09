import {Injectable} from "@nestjs/common";
import {MemoryDb} from "../../common/data/memory.db";
import {BalanceRequestDto} from "../dtos/balance.request.dto";
import {BalanceResponseDto} from "../dtos/balance.response.dto";
import {PointTransactionResponseDto} from "../dtos/point-transaction.response.dto";
import {PointTransactionRequestDto} from "../dtos/point-transaction.request.dto";

@Injectable()
export class PointService {
    constructor(private readonly db: MemoryDb) {}

    async getBalance(request: BalanceRequestDto): Promise<BalanceResponseDto> {
        const balance = this.db.getBalance(request.userId);
        return {
            balance: balance
        }
    }

    async earnPoint(request: PointTransactionRequestDto): Promise<PointTransactionResponseDto> {
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