import {Injectable} from '@nestjs/common';
import {TransactionType} from "../enum/transaction-type.enum";

export interface User {
    userId: string;
    password: string;
}

export interface PointTransaction {
    id: number;
    userId: string;
    type: TransactionType;
    amount: number;
    timestamp: Date;
}

@Injectable()
export class MemoryDb{
    private users: User[] = [];
    private balances = new Map<string, number>();
    private history: PointTransaction[] = [];
    private nextTransactionId = 1;

    // 유저 정보 저장
    saveUser(user:User) {
        this.users.push(user);
        this.balances.set(user.userId, 0);
    }

    // 유저 조회
    public findUserById(userId: string): User | undefined {
        return this.users.find((u) => u.userId === userId);
    }

    // 현재 잔액 조회
    public getBalance(userId: string): number{
        return this.balances.get(userId) ?? 0;
    }

    // 잔액 업데이트
    public updateBalance(userId: string, amount: number, type: TransactionType): number {
        let newBalance = this.getBalance(userId);

        const commit = () => {
            this.balances.set(userId, newBalance);
            this.addHistory(userId, type, amount);
            return newBalance;
        };

        // 포인트 적립
        if (type === TransactionType.EARN) {
            newBalance += amount;
            return commit();
        }

        // 포인트 사용
        if (type === TransactionType.USE) {
            newBalance -= amount;
            if (newBalance < 0) throw new Error("잔액이 부족합니다.");
            return commit();
        }

        throw new Error("잘못된 거래 유형입니다.");
    }

    // 거래 내역 조회
    public getHistory(userId: string): PointTransaction[] {
        return this.history
            .filter(t => t.userId === userId)
            .reverse();
    }

    // 거래 내역 추가
    private addHistory(userId: string, type: TransactionType, amount: number): void {
        const newTransaction: PointTransaction = {
            id: this.nextTransactionId++,
            userId,
            type,
            amount,
            timestamp: new Date(),
        };
        this.history.push(newTransaction);
    }
}