import {Module} from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CommonModule} from "./common/common.module";
import {AuthModule} from "./auth/auth.module";
import {UserController} from "./users/user.controller";
import {PointModule} from "./point/point.module";

@Module({
    imports: [CommonModule, AuthModule, PointModule],
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule {}
