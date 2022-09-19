import {} from "jest";
import { mock } from "jest-mock-extended";
import supertest from "supertest";
import { UserRouter } from "../routes/UserRouter";
import { API } from "../API";
import { Express, Router } from "express";

let app: Express;

describe("Api", () => {
  beforeEach(async () => {
    const api = new API(
      mock<UserRouter>({
        getRouter: () => Router(),
      })
    );
    app = await api.getApp();
  });

  it("should return express instance", async () => {
    expect(app).toBeDefined();
    expect(app.listen).toBeDefined();
  });

  it("should return status 200 for GET /health-check", async () => {
    const { body } = await supertest(app)
      .get("/health-check")
      .auth("my-api-user", "Test-pass1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.success).toBe(true);
  });

  it("should return status 404 for GET /", async () => {
    const { body } = await supertest(app)
      .get("/")
      .auth("my-api-user", "Test-pass1")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(body).toBeDefined();
    expect(body.success).toBe(false);
  });

  it("should return status 401 for unauthorized request", async () => {
    const { body } = await supertest(app).get("/").expect("Content-Type", /json/).expect(401);

    expect(body).toBeDefined();
    expect(body.success).toBe(false);
  });
});
