module.exports = {
  parserOptions: {
    parser: "babel-eslint",
    // specifying a module sourcetype prevent eslint from marking import statements as errors
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
};