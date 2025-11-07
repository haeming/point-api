import {Module} from "@nestjs/common";
import {MemoryDb} from "./data/memory.db";

@Module({
    providers: [MemoryDb],
    exports: [MemoryDb]
})
export class CommonModule {}