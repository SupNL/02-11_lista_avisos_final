import Post from "../models/Post";
import imageView from "./image-view";

export default {
    render(post : Post) {
        return {
            id : post.id,
            message : post.message,
            images : imageView.renderMany(post.images),
            date : post.date,
            type : post.type
        };
    },
    renderMany(posts : Post[]) {
        return posts.map((post) => this.render(post));
    }
}