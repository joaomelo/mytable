module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    semi: ['error', 'always'],
    'no-debugger': 'off'
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  plugins: ['vue']
};
