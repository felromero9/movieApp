module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },
  "rules": {
    "quotes": [0, "single"],
    "semi": [2, "always"],
    "no-undef": [0],
    "space-before-blocks": ["error"],
    "space-in-parens": ["error", "never", { "exceptions": [] }],
    "no-console": [0],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "key-spacing": [2, { "singleLine": { "beforeColon": false, "afterColon": true }, "multiLine": { "beforeColon": false, "afterColon": true } }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }],
    "no-unused-vars": ["error", { "ignoreRestSiblings": true, "argsIgnorePattern": "t|e|err|res" }],
    "space-infix-ops": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "curly": ["error", "multi-line"],
    "operator-linebreak": ["error", "before"],
    "block-spacing": "error",
    "comma-dangle": ["error", { "arrays": "always-multiline", "objects": "always-multiline", "imports": "always-multiline", "exports": "always-multiline", "functions": "never" }],
    "comma-style": ["error", "last"],
    "dot-location": ["error", "property"],
    "func-call-spacing": ["error", "never"],
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-unsafe-negation": "error",
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }],
    "padded-blocks": ["error", "never"],
    "spaced-comment": ["error", "always"],
    "no-multi-spaces": "error",
    "arrow-spacing": "error",
  },
};
