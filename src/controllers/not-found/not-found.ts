import type {RequestHandler} from 'express';
import {Logger} from '@/services';

const notFound: RequestHandler = async (_, res) => {
    try {
        return res.status(404).json({
            message: 'Resource not found'
        });
    } catch (error) {
        Logger.error(error, 'Error getting posts');
        return res.status(500).json({message: 'Internal Server Error', error});
    }
};

export default notFound;
