import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/entities/user/dto/userdto";
import { User } from "src/entities/user/user";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService{

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll() : Promise<User[]> {
        return await this.usersRepository.find();
    }

    async remove(id: uuidv4): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(user: UserDTO): Promise<User> {
        const createdUser = this.usersRepository.create(user);
        return await this.usersRepository.save(createdUser);
    }

    async update(id: uuidv4, user: Partial<UserDTO>): Promise<User> {
        const userToUpdate = await this.usersRepository.findOneBy({id: id});
        const updatedUser = {...userToUpdate,...user};
        return await this.usersRepository.save(updatedUser);
    }

    async findByName(name: string): Promise<User>{
        const user = await this.usersRepository.findOneBy({"name": name});
        console.log(user);
        return user;
    }

    async findIdByName(name: string): Promise<uuidv4>{
        const user = await this.usersRepository.findOneBy({name: name});
        return user.id;
    }

    async findById(id: uuidv4): Promise<User> {
        return await this.usersRepository.findOneBy({id: id});
    }

    async findAllRegular(): Promise<User[]>{
        const users =  await this.usersRepository.find();
        return users.filter(user => user.isAdmin === false);
    }

    async findAllAdmins(): Promise<User[]>{
        const users =  await this.usersRepository.find();
        return users.filter(user => user.isAdmin);
    }
}