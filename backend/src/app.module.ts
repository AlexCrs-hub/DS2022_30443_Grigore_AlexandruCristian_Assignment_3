import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { ChatController } from './controllers/chat.controller';
import { Device } from './entities/device/device';
import { EnergyConsumption } from './entities/EnergyConsumption/energyconsumption';
import { User } from './entities/user/user';
import { AuthnModule } from './modules/auth.module';
import { DeviceModule } from './modules/device.module';
import { EnergyConsumptionModule } from './modules/energyconsumption.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'host.docker.internal',
    port:3306,
    //host:'localhost',
    //port: 3306,
    username: 'root',
    password: 'RasenganSage12',
    database: 'project',
    entities: [User, Device, EnergyConsumption],
    synchronize: true,
  }),
  UserModule, DeviceModule, EnergyConsumptionModule, AuthnModule],
  controllers: [AppController, ChatController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
