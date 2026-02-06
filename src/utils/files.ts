import fs from 'fs';
import path from 'path';
import {ImagesStorageDir} from '@/const';
import {Logger} from '@/services';

export const deleteFile = async (filePath: string): Promise<void> => {
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        Logger.error(error, 'Error deleting image file');
        throw error;
    }
};

export const getImagePath = (imageUrl: string): string => {
    return path.join(ImagesStorageDir, path.basename(imageUrl));
};
