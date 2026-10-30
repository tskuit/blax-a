import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Raw colours or arbitrary Tailwind values (`bg-[#365fc0]`, `p-[13px]`) bypass the design system.
const NOT_A_TOKEN = "/#[0-9a-fA-F]{3,8}\\b|-\\[/";
const tokenMessage =
  "Use design-system token classes only (SPEC.md §6.5). If a token is missing, flag it as a design-system gap.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/headers",
              importNames: ["cookies", "draftMode"],
              message: "This app never uses cookies (SPEC.md §7.1).",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: `JSXAttribute[name.name='className'] Literal[value=${NOT_A_TOKEN}]`,
          message: tokenMessage,
        },
        {
          selector: `JSXAttribute[name.name='className'] TemplateElement[value.raw=${NOT_A_TOKEN}]`,
          message: tokenMessage,
        },
        {
          selector: "JSXAttribute[name.name='style']",
          message: tokenMessage,
        },
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message: "Never render raw HTML (SPEC.md §11).",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
