const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: __dirname + "/..",
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: [path.resolve(__dirname, "./common-framework-configuration.js")],
  testMatch: ["<rootDir>/src/__tests__/*.test.ts"],
};
