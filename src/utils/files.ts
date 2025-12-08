import fs from 'fs';
import path from 'path';
import {BaseUrlWithPort, ImagesDir, ImagesStorageDir} from '@/const';
import {Logger} from '@/services';

export const saveBase64Image = async (base64: string, imageName: string): Promise<string> => {
    try {
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const name = `post_${imageName}.png`;

        const filePath = path.join(ImagesStorageDir, name);
        await fs.promises.writeFile(filePath, buffer);

        return `${BaseUrlWithPort}/${ImagesDir}/${name}`;
    } catch (error) {
        Logger.error(error, 'Error saving image file');
        throw error;
    }
};

export const deleteImage = async (postId: string): Promise<void> => {
    try {
        const imagePath = path.join(ImagesStorageDir, `post_${postId}.png`);
        const filePath = path.join(imagePath);

        await fs.promises.unlink(filePath);
    } catch (error) {
        Logger.error(error, 'Error deleting image file');
        throw error;
    }
};
