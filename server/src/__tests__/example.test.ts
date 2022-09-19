import {} from "jest";
import { mock } from "jest-mock-extended";
import { API } from "../API";
import { UserRouter } from "../routes/UserRouter";

describe("Example test", () => {
  it("should pass", async () => {
    const subject = new API(mock<UserRouter>());

    expect(subject).toBeInstanceOf(API);
  });
});
