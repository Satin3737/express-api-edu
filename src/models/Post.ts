import {Document, Schema, model} from 'mongoose';
import {type IModelTimestamps, Models} from '@/interfaces';

export interface IPost extends Document<Schema.Types.ObjectId>, IModelTimestamps {
    title: string;
    description: string;
    image: string;
    author: string;
}

const postSchema = new Schema<IPost>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        author: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Post = model<IPost>(Models.post, postSchema);

export default Post;
