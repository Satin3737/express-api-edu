import type {RequestHandler} from 'express';
import {saveBase64Image} from '@/utils';
import {Logger} from '@/services';
import type {ICreatePost} from '@/schemas';
import {Post} from '@/models';

const createPost: RequestHandler<unknown, unknown, ICreatePost['body']> = async (req, res) => {
    try {
        const {image: base64, ...restData} = req.body;
        const post = new Post(restData);
        post.image = await saveBase64Image(base64, post._id.toString());
        await post.save();

        return res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        Logger.error(error, 'Error creating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default createPost;
