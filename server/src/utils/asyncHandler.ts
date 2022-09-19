import { Handler, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response) => Promise<void>;

export function asyncHandler(asyncHandler: AsyncHandler): Handler {
  return (req, res, next) => {
    asyncHandler(req, res).catch(next);
  };
}
