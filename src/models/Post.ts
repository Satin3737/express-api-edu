import {Document, Schema, model} from 'mongoose';
import {Models} from '@/interfaces';

export interface IPost extends Document<Schema.Types.ObjectId> {
    title: string;
    description: string;
    imageUrl: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        imageUrl: {type: String, required: true},
        author: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Post = model<IPost>(Models.post, postSchema);

export default Post;
