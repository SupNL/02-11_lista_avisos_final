import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Image from "./Image";

export enum TypePost {
  SUGGESTION = "suggestion",
  CRITICISM = "criticism",
  COMPLIMENT = "compliment"
}

@Entity("post")
export default class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  message: string;

  @Column()
  approved : boolean;

  @Column({
    type : "enum",
    enum : TypePost,
    nullable : false
  })
  type : TypePost;

  @Column({ 
    type: "timestamp", 
    default: () => 'CURRENT_TIMESTAMP'
  })
  date : Date;
  
  // um post tem varias imagens
  // se um post for alterado ou removido, cascade sobre a imagem
  @OneToMany(() => Image, image => image.post, {
    cascade: ["insert", "remove", "update"]
  })
  images : Image[]

}