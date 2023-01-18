import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { EnergyConsumption } from "src/entities/EnergyConsumption/energyconsumption";
import { JwtAuthGuard } from "src/services/auth/jwt-auth.guard";
import { EnergyConsumptionService } from "src/services/energy/energy.consumption.service";
import { v4 as uuidv4 } from 'uuid';

@Controller("energy")
export class EnergyConsumptionController {
    constructor(
        private energyService: EnergyConsumptionService
    ) {}

    //@UseGuards(JwtAuthGuard)
    @Get(":id")
    async findAllById(@Param('id') id: uuidv4): Promise<EnergyConsumption[]> {
        return await this.energyService.findAllById(id);
    }
}