import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/*", "node_modules/*", "build/*", "dist/*"],
  },
];

export default eslintConfig;
