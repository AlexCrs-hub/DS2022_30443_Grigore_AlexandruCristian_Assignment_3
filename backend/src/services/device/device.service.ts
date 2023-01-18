import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "src/entities/device/device";
import { DeviceDTO } from "src/entities/device/dto/devicedto";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from "../user/user.service";

export class DevicesService {
    constructor(
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
        private userService: UsersService
    ) {}

    async findAll(): Promise<Device[]> {
        return await this.devicesRepository.find({relations: {user: true}});
    }

    async remove(id: uuidv4): Promise<void> {
        await this.devicesRepository.delete(id);
    }

    async create(device: DeviceDTO): Promise<Device> {
        const createdDevice = this.devicesRepository.create(device);
        return await this.devicesRepository.save(createdDevice);
    }

    async update(id: uuidv4, device: Partial<DeviceDTO>): Promise<Device> {
        const deviceToUpdate = await this.devicesRepository.findOneBy({id:id});
        let user = null;
        if(device.userId){
            user = await this.userService.findById(device.userId);
        }
        console.log(user);
        deviceToUpdate.user = user;
        const updatedDevice : Device = {id:id, description: device.description, address: device.address, maxHrEnergyConsumption: device.maxHrEnergyConsumption,userId: user.id, user: user};
        return await this.devicesRepository.save(updatedDevice);
    }
    
    async findById(id: uuidv4): Promise<Device[]> {
        return await this.devicesRepository.find({where: {user: {id: id}}});
    }
}