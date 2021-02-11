import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Post from "./Post";

@Entity("image")
export default class Image {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    path: string;

    // relacionamento muitos pra um
    // um post tem varias imagens
    @ManyToOne(() => Post, post => post.images)
    @JoinColumn({ name: "post_id" })
    post: Post;

}