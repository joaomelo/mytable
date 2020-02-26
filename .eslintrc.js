module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    semi: ['error', 'always'],
  },
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  plugins: ['vue']
};
