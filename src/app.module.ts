import { Module } from '@nestjs/common';
import {MemoryDb} from "./common/data/memory.db";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, MemoryDb],
})
export class AppModule {}
