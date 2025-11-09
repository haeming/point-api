import { BadRequestException } from '@nestjs/common';

export class BalanceException extends BadRequestException {
    constructor() {
        super('잔액이 부족합니다.');
    }
}