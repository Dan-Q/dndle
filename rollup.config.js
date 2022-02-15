// rollup.config.js
export default {
  input: "src/dndle.js",
  output: {
    file: "public/dndle.js",
    compact: true,
    format: "iife",
  },
};
