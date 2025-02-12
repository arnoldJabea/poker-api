import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {AfterInsert } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({nullable: true})
    age: number;

    @Column()
    email: string;

    @AfterInsert()
    after_insert(){
        console.log(`Player ${ this.id } created`)
    }
}
