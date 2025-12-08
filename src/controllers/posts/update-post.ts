import type {RequestHandler} from 'express';
import {saveBase64Image} from '@/utils';
import {Logger} from '@/services';
import type {IUpdatePost} from '@/schemas';
import {Post} from '@/models';

const updatePost: RequestHandler<IUpdatePost['params'], unknown, IUpdatePost['body']> = async (req, res) => {
    try {
        const {id} = req.params;
        const {image: base64, ...restData} = req.body;
        const image = base64 ? await saveBase64Image(base64, id) : undefined;
        const post = await Post.findByIdAndUpdate(id, {...restData, image}, {new: true}).lean();

        return res.status(201).json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        Logger.error(error, 'Error creating post');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default updatePost;
