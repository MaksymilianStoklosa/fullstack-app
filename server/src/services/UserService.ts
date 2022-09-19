import { injectable } from "tsyringe";
import { IUser } from "../models/UserSchema";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async create(body: IUser) {
    const isAlreadyExist = Boolean(await this.userRepository.findByEmail(body.email));

    if (isAlreadyExist) {
      return {
        response: {
          success: false,
          message: "Request failed",
          data: null,
          errors: {
            email: {
              msg: "E-mail is already used",
            },
          },
        },
        status: 409,
      };
    }

    const user = await this.userRepository.create(body);

    return {
      response: {
        success: true,
        message: "Request successed",
        data: user,
        errors: {},
      },
      status: 201,
    };
  }
}
