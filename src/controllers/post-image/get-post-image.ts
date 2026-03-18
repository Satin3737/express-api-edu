import {glob} from 'glob';
import {ImagesDir, ImagesStorageDir} from '@/const';
import type {IIdParams} from '@/schemas';
import {asyncHandler} from '@/utils';

const getPostImage = asyncHandler<IIdParams['params']>(async (req, res) => {
    const {id} = req.params;
    const matches = await glob(`${id}.*`, {cwd: ImagesStorageDir});
    if (!matches.length) return res.status(404).json({message: 'Image not found'});
    const imageUrl = `${req.protocol}://${req.get('host')}/${ImagesDir}/${matches[0]}`;
    return res.status(200).json({message: 'Post image retrieved successfully', imageUrl});
});

export default getPostImage;
