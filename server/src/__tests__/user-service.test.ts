import {} from "jest";
import { mock } from "jest-mock-extended";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  dateOfBirth: new Date("2000-12-12").toISOString(),
};

describe("User service", () => {
  it("should create user", async () => {
    const createMock = jest.fn();
    const findByEmailMock = jest.fn();
    const userService = new UserService(
      mock<UserRepository>({
        create: createMock,
        findByEmail: findByEmailMock,
      })
    );

    const { response, status } = await userService.create(user);
    expect(findByEmailMock).toHaveBeenCalledWith("john.doe@gmail.com");
    expect(createMock).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      dateOfBirth: "2000-12-12T00:00:00.000Z",
    });
    expect(status).toBe(201);
    expect(response).toEqual(
      expect.objectContaining({
        success: true,
        message: "Request successed",
        errors: {},
      })
    );
  });

  it("should not create user", async () => {
    const findByEmailMock = jest.fn().mockReturnValue(user);
    const userService = new UserService(
      mock<UserRepository>({
        findByEmail: findByEmailMock,
      })
    );

    const { response, status } = await userService.create(user);
    expect(findByEmailMock).toHaveBeenCalledWith("john.doe@gmail.com");
    expect(status).toBe(409);
    expect(response).toEqual(
      expect.objectContaining({
        success: false,
        message: "Request failed",
        data: null,
        errors: {
          email: {
            msg: "E-mail is already used",
          },
        },
      })
    );
  });
});
