import fs from 'fs';
import path from 'path';
import {ImagesDir, ImagesStorageDir} from '@/const';
import type {IIdParams} from '@/schemas';
import {asyncHandler} from '@/utils';

const getPostImage = asyncHandler<IIdParams['params']>(async (req, res) => {
    const {id} = req.params;
    const files = await fs.promises.readdir(ImagesStorageDir);
    const matchedFile = files.find(f => path.parse(f).name === id);
    if (!matchedFile) return res.status(404).json({message: 'Image not found'});
    const imageUrl = `${req.protocol}://${req.get('host')}/${ImagesDir}/${matchedFile}`;
    return res.status(200).json({message: 'Post image retrieved successfully', imageUrl});
});

export default getPostImage;
