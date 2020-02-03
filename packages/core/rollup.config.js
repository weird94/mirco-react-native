import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

const outputs = [
  {
    file: "dist/index.cjs.js",
    format: "cjs"
  },
  {
    file: "dist/index.esm.js",
    format: "esm"
  }
];

export default outputs.map(output => ({
  input: "src/index.js",
  output: output,
  plugins: [
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    }),
    terser()
  ]
}));
