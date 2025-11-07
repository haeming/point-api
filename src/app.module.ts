import { Module } from '@nestjs/common';
import {MemoryDb} from "./common/data/memory.db";

@Module({
    imports: [],
    controllers: [],
    providers: [MemoryDb],
})
export class AppModule {}
