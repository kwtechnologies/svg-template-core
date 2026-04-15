const { defineConfig } = require("tsdown");

module.exports = defineConfig({
  entry: "src/index.ts",
  format: ["cjs"],
  dts: true,
  copy: [{ from: "src/scenes/*.json", to: "dist/scenes" }],
  outExtensions: ({ format }) => {
    if (format === "cjs") {
      return {
        js: ".js",
        dts: ".d.ts",
      };
    }
  },
});
