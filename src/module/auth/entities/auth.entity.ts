import { BaseEntity, Column, Entity,  } from "typeorm";
import { UserRole } from "user.role";

@Entity({name: "auth"})
export class Auth extends BaseEntity {


    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: 0})
    otp: string;

    @Column({type: "bigint"})
    otpTime: number;

    @Column({default: UserRole.USER})
    role: UserRole;

   
}
