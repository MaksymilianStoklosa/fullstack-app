import { IUser, User } from "../models/UserSchema";

export class UserRepository {
  constructor() {}

  async create(body: IUser) {
    const user = new User(body);
    await user.save();

    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email });

    return user;
  }
}
