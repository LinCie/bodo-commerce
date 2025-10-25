// @ts-check

import { defineConfig } from "eslint/config"

import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import perfectionist from "eslint-plugin-perfectionist"
import vitest from "@vitest/eslint-plugin"

export default defineConfig(
  {
    ignores: ["**/*.js", "**/*.mjs"],
  },
  { files: ["src/**/*.ts"] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: {
      // @ts-ignore
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/unbound-method": "off",
    },
  },
)
