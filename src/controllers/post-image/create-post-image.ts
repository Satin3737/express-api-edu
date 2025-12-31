import type {RequestHandler} from 'express';
import {ImagesDir} from '@/const';
import {Logger} from '@/services';

const createPostImage: RequestHandler = async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) return res.status(422).json({message: 'No image file uploaded'});
        const url = `${req.protocol}://${req.get('host')}/${ImagesDir}/${imageFile.filename}`;
        return res.status(201).json({message: 'Post image created successfully', url});
    } catch (error) {
        Logger.error(error, 'Error creating post image');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default createPostImage;
