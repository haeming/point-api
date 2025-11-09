import {Injectable} from "@nestjs/common";
import {MemoryDb} from "../../common/data/memory.db";
import {BalanceInputDto} from "./dtos/balance.input.dto";
import {BalanceOutputDto} from "./dtos/balance.output.dto";
import {EarnInputDto} from "./dtos/earn.input.dto";
import {EarnOutputDto} from "./dtos/earn.output.dto";

@Injectable()
export class PointService {
    constructor(private readonly db: MemoryDb) {}

    async getBalance(input: BalanceInputDto): Promise<BalanceOutputDto> {
        const balance = this.db.getBalance(input.userId);
        return {
            balance: balance
        }
    }

    async earnPoint(input: EarnInputDto): Promise<EarnOutputDto> {
        const newBalance = this.db.updateBalance(input.userId, input.amount, 'EARN');
        const history = this.db.getHistory(input.userId)[0];

        return {
            userId: input.userId,
            newBalance,
            earnedAmount: input.amount,
            transactionId: history.id,
            timestamp: history.timestamp
        };
    }
}