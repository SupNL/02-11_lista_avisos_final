export enum PostType {
    SUGGESTION="suggestion",
    CRITICISM="criticism",
    COMPLIMENT="compliment"
}

export interface PostInterface {
    id : number;
    message : string;
    images ?: [{
        id : number,
        url : string
    }];
    type : PostType;
    date : string;
}