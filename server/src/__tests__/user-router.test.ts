import {} from "jest";
import { mock } from "jest-mock-extended";
import supertest from "supertest";
import { UserRouter } from "../routes/UserRouter";
import { API } from "../API";
import { Express, Router } from "express";
import { UserService } from "../services/UserService";

let app: Express;

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "",
  dateOfBirth: new Date("2000-12-12").toISOString(),
};

describe("User router", () => {
  beforeEach(async () => {
    const api = new API(new UserRouter(mock<UserService>()));
    app = await api.getApp();
  });

  it("should return status 409 for POST /user", async () => {
    const { body } = await supertest(app).post("/user").auth("my-api-user", "Test-pass1").send(user).expect(409);

    expect(body).toEqual(
      expect.objectContaining({
        success: false,
        message: "Request failed",
        data: null,
        errors: {
          email: {
            location: "body",
            msg: "Invalid email",
            param: "email",
            value: "",
          },
        },
      })
    );
  });
});
