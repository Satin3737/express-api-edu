import type {RequestHandler} from 'express';

const notFound: RequestHandler = (_, res) => {
    return res.status(404).json({message: 'Resource not found'});
};

export default notFound;
