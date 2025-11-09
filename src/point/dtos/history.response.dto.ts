import {TransactionType} from "../../common/enum/transaction-type.enum";

export class HistoryResponseDto {
    id!: number;
    type!: TransactionType;
    amount!: number;
    timestamp!: Date;
}