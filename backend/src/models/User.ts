import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum NivelUsuario {
    COMUM = "comum",
    ADMIN = "admin"
}

@Entity("user")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    nome : string;

    @Column({
        unique : true
    })
    login : string;

    @Column({
        select : false
    })
    senha : string;

    @Column({
        type : "enum",
        enum : NivelUsuario,
        default : NivelUsuario.COMUM
    })
    nivel : NivelUsuario;
}