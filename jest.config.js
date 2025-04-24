/** @type {import('jest').Config} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/__tests__/**/*.test.ts"],
};
