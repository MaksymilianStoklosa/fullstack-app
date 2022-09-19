import basicAuth, { AsyncAuthorizerCallback, safeCompare } from "express-basic-auth";

const USERNAME = "my-api-user";
const PASSWORD = "Test-pass1";

export const basicAuthMiddleware = () => {
  return basicAuth({
    authorizer: userAuthorizer,
    authorizeAsync: true,
    unauthorizedResponse: {
      success: false,
      message: "Unauthorized",
      data: null,
      errors: {},
    },
  });
};

const userAuthorizer = (username: string, password: string, callback: AsyncAuthorizerCallback) => {
  const isUserMatching = safeCompare(username, USERNAME);
  const isPasswordMatching = safeCompare(password, PASSWORD);

  if (isUserMatching && isPasswordMatching) {
    return callback(null, true);
  } else {
    return callback(null, false);
  }
};
