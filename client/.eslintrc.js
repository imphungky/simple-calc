module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort", "prettier"],
  rules: {
    "react/prop-types": "off",
    "react/no-children-prop": "off",
    "no-undef": "off", // https://github.com/eslint/typescript-eslint-parser/issues/437
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-implicit-coercion": "error",
    "prettier/prettier": ["error"],
  },
};
