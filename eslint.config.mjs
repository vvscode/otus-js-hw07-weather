import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        module: "writable",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    ...jest.configs["flat/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  eslintConfigPrettier,
];
