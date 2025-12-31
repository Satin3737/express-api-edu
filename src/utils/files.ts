import fs from 'fs';
import {Logger} from '@/services';

export const fileExists = async (filePath: string) => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        Logger.error(error, 'File does not exist');
        return false;
    }
};

export const deleteFile = async (filePath: string): Promise<void> => {
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        Logger.error(error, 'Error deleting image file');
        throw error;
    }
};
