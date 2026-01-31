import {Document, Schema, model} from 'mongoose';
import {type IModelTimestamps, Models} from '@/interfaces';

export interface IPost extends Document<Schema.Types.ObjectId>, IModelTimestamps {
    title: string;
    description: string;
    image: string;
    author: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, required: true, ref: Models.user}
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Post = model<IPost>(Models.post, postSchema);

export default Post;
