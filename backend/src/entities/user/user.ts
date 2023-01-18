import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from '../device/device';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: uuidv4;

  @Column({unique: true})
  name: string;

  @Column({unique: true})
  password: string;

  @Column({default : false})
  isAdmin: boolean;

  @OneToMany(() => Device, device => device.user)
  devices: Device[];
}
