import {  CreateDateColumn,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creatAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

  

}
