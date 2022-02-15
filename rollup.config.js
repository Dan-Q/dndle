// rollup.config.js
import html from "rollup-plugin-html";

export default {
  input: "src/dndle.js",
  plugins: [
    html({
      include: "templates/*.html",
    }),
  ],
  output: {
    file: "public/dndle.js",
    compact: true,
    format: "iife",
  },
};
