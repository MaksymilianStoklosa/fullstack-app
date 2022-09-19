import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

export function checkValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(409).json({
      success: false,
      message: "Request failed",
      data: null,
      errors: errors.mapped(),
    });
  }

  next();
}
