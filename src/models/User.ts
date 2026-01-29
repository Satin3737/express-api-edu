import {Document, Schema, model} from 'mongoose';
import {type IModelTimestamps, Models} from '@/interfaces';

export interface IUser extends Document<Schema.Types.ObjectId>, IModelTimestamps {
    email: string;
    password: string;
    name: string;
    surname: string;
    status: string;
    posts: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        status: {type: String, required: true, default: 'new'},
        posts: [{type: Schema.Types.ObjectId, ref: Models.post}]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const User = model<IUser>(Models.user, userSchema);

export default User;
