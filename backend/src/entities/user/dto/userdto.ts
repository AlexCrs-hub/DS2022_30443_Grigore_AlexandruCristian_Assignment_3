import { DeviceDTO } from "src/entities/device/dto/devicedto";
import { IsString, Matches } from 'class-validator';

export class UserDTO {

    @IsString()
    name: string;

    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "password is does not match the requirements"})
    password: string;

    isAdmin: boolean;

    devices: DeviceDTO[];
}