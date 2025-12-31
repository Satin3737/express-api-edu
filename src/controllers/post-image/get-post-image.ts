import type {RequestHandler} from 'express';
import fs from 'fs';
import path from 'path';
import {ImagesDir, ImagesStorageDir} from '@/const';
import {Logger} from '@/services';
import type {IIdParams} from '@/schemas';

const getPostImage: RequestHandler<IIdParams['params']> = async (req, res) => {
    try {
        const {id} = req.params;
        const files = await fs.promises.readdir(ImagesStorageDir);
        const matchedFile = files.find(f => path.parse(f).name === id);
        if (!matchedFile) return res.status(404).json({message: 'Image not found'});
        const imageUrl = `${req.protocol}://${req.get('host')}/${ImagesDir}/${matchedFile}`;
        return res.status(200).json({message: 'Post image retrieved successfully', imageUrl});
    } catch (error) {
        Logger.error(error, 'Error getting posts');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default getPostImage;
