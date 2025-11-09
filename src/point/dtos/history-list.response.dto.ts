import {HistoryResponseDto} from "./history.response.dto";

export class HistoryListResponseDto {
    userId!: string;
    transactions!: HistoryResponseDto[];
}