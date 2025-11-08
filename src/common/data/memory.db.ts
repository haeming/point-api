import { Injectable } from '@nestjs/common';

export interface User {
    userId: string;
    password: string;
}

export interface PointTransaction {
    id: number;
    userId: string;
    type: 'EARN' | 'USE';
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
    public updateBalance(userId: string, amount: number, type: 'EARN' | 'USE'): number {
        const currentBalance = this.getBalance(userId);
        let newBalance = currentBalance;

        if (type === 'EARN') {
            newBalance += amount;
        } else if (type === 'USE') {
            newBalance -= amount;
        } else {
            throw new Error('Invalid transaction type');
        }

        this.balances.set(userId, newBalance);
        this.addHistory(userId, type, amount);
        return newBalance;
    }

    // 거래 내역 조회
    public getHistory(userId: string): PointTransaction[] {
        return this.history
            .filter(t => t.userId === userId)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    // 거래 내역 추가
    private addHistory(userId: string, type: 'EARN' | 'USE', amount: number): void {
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