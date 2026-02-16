import type {NextFunction, Request, RequestHandler, Response} from 'express';

type AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery> = (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

export function asyncHandler<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
    fn: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
    return async (req, res, next) => {
        try {
            await fn(req as Request<P, ResBody, ReqBody, ReqQuery>, res, next);
        } catch (error) {
            next(error);
        }
    };
}
