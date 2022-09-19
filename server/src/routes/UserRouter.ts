import express, { Request, Response } from "express";
import { injectable } from "tsyringe";
import { check } from "express-validator";
import { asyncHandler, checkValidation } from "../utils";
import { UserService } from "../services/UserService";

@injectable()
export class UserRouter {
  constructor(private userService: UserService) {}

  public getRouter() {
    const router = express.Router();
    router.post("/", this.validateUser(), checkValidation.bind(this), asyncHandler(this.createUser.bind(this)));

    return router;
  }

  private async createUser(req: Request, res: Response) {
    const { response, status } = await this.userService.create(req.body);

    res.status(status).json(response);
  }

  private validateUser() {
    return [
      check("firstName").trim().isLength({ min: 1 }).withMessage("Invalid first name"),
      check("lastName").trim().isLength({ min: 1 }).withMessage("Invalid last name"),
      check("email").trim().isEmail().withMessage("Invalid email"),
      check("dateOfBirth").isString().withMessage("Invalid date of birth"),
    ];
  }
}
