import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { singleton } from "tsyringe";
import { UserRouter } from "./routes/UserRouter";
import { basicAuthMiddleware } from "./utils";

const PORT = 3001;
const HEALTH_CHECK_ENDPOINT = "/health-check";

@singleton()
export class API {
  constructor(private userRouter: UserRouter) {}

  public async serve() {
    console.log("Server is starting...");

    const app = await this.getApp();

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  }

  public async getApp() {
    const app = express();

    app.use(bodyParser.json({ limit: "30mb" }));
    app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
    app.use(cors());
    app.use(basicAuthMiddleware());

    app.get(HEALTH_CHECK_ENDPOINT, this.handleHealthCheck.bind(this));
    app.use("/user", this.userRouter.getRouter());
    app.use(this.express404Error.bind(this));

    return app;
  }

  private handleHealthCheck(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      responseTime: new Date(),
    });
  }

  private express404Error(req: Request, res: Response, next: NextFunction): void {
    res.status(404).send({
      success: false,
      message: "Not found",
      data: null,
      errors: {},
    });
    next();
  }
}
