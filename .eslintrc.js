module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    jasmine: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-useless-constructor': 0
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
      }
    },
    {
      files: ['*.component.html'],
      parserOptions: {
        project: './tsconfig.app.json',
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    }
  ]
}
