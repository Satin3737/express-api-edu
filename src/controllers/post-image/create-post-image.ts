import {ImagesDir} from '@/const';
import {asyncHandler} from '@/utils';

const createPostImage = asyncHandler(async (req, res) => {
    const imageFile = req.file;
    if (!imageFile) return res.status(422).json({message: 'No image file uploaded'});
    const url = `${req.protocol}://${req.get('host')}/${ImagesDir}/${imageFile.filename}`;
    return res.status(201).json({message: 'Post image created successfully', url});
});

export default createPostImage;
