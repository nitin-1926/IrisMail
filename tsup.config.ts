import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/server/index.ts", "src/react/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  // Bundle these so consumers (e.g. Next.js site with file:..) don't need to resolve them
  noExternal: ["clsx", "tailwind-merge"],
});
