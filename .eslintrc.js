module.exports = {
  env: { browser: true, es2021: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
