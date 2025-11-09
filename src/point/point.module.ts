import {Module} from "@nestjs/common";
import {CommonModule} from "../common/common.module";
import {PointController} from "./controller/point.controller";
import {PointService} from "./service/point.service";

@Module({
    imports: [CommonModule],
    controllers: [PointController],
    providers: [PointService],
    exports: [PointService]
})
export class PointModule {}