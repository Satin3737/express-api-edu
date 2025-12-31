import multer from 'multer';
import {nanoid} from 'nanoid';
import {z} from 'zod';
import {MaxUploadSize} from '@/const';
import {postImageSchema} from '@/schemas';

const fileUpload = (path: string) => {
    return multer({
        storage: multer.diskStorage({
            destination: (_, __, cb) => cb(null, path),
            filename: (_, file, cb) => cb(null, `${nanoid()}.${file.originalname.split('.').pop()}`)
        }),
        limits: {
            fileSize: MaxUploadSize
        },
        fileFilter: (_, file, cb) => {
            const {success, error} = postImageSchema.safeParse(file);
            success ? cb(null, true) : cb(new Error(z.treeifyError(error).errors.toString()));
        }
    });
};

export default fileUpload;
