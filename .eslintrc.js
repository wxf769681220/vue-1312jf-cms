module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'yoda': 0,
    'camelcase': ['error', { 'allow': ['export_json_to_excel'] }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
