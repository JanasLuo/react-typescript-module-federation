/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-05-06 19:33:02
 * @LastEditors: janasluo
 * @LastEditTime: 2021-09-14 21:18:19
 */
module.exports = {
  // 让prettier使用eslint的代码格式进行校验
  eslintIntegration: true,
  // 让prettier使用stylelint的代码格式进行校验
  stylelintIntegration: true,
  // 让prettier使用tslint的代码格式进行校验
  tslintIntegration: true,
  // 一行最多 100 字符
  // "printWidth": 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 使用单引号
  singleQuote: true,
  // 行尾需要有分号
  semi: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // Require a 'prettierconfig' to format prettier
  requireConfig: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  ignorePath: '.prettierignore',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'ignore',
  // 结尾是 \n \r \n\r auto
  endOfLine: 'auto'
}
