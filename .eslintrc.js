module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
      page: true,
  },

  // 这个rules是复制别人的
  rules: {
      'no-console': 'off',
      'react-hooks/exhaustive-deps': 'error', // react-hooks 依赖检查
      'no-empty': 'off', // catch{} 允许为空
      '@typescript-eslint/no-shadow': ['off'], // 当前作用域变量名不能与父级作用域变量同名
  }

};