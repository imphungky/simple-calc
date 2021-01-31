module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "no-undef": "off", // https://github.com/eslint/typescript-eslint-parser/issues/437
    "no-unused-vars": "warn",
    "prettier/prettier": ["error"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-implicit-coercion": "error",
  },
};
