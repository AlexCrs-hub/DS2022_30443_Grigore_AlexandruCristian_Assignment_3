import { InjectRepository } from "@nestjs/typeorm";
import { Device } from "src/entities/device/device";
import { EnergyConsumption } from "src/entities/EnergyConsumption/energyconsumption";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


export class EnergyConsumptionService {
    constructor(
        @InjectRepository(EnergyConsumption)
        private enertgyConsumptionRepository: Repository<EnergyConsumption>,
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>
    ) {}

    async findAllById(id: uuidv4): Promise<EnergyConsumption[]> {
        // const device = this.deviceRepository.findBy({id: id});
        return await this.enertgyConsumptionRepository.find({where:{device: {id: id}}});
    }
}   