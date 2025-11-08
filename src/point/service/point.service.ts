import {Injectable} from "@nestjs/common";
import {MemoryDb} from "../../common/data/memory.db";
import {BalanceInputDto} from "./dtos/balance.input.dto";
import {BalanceOutputDto} from "./dtos/balance.output.dto";

@Injectable()
export class PointService {
    constructor(private readonly db: MemoryDb) {}

    async getBalance(input: BalanceInputDto): Promise<BalanceOutputDto> {
        const balance = this.db.getBalance(input.userId);
        return {
            balance: balance
        }
    }
}