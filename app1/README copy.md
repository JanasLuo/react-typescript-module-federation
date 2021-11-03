<!--
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2020-09-11 09:53:07
 * @LastEditors: janasluo
 * @LastEditTime: 2021-10-08 10:49:23
-->

# 项目启动
**依赖安装**
```
  yarn
```
**运行调试**
```
  yarn start
```
**打包部署**
```
  yarn build
```
# 技术栈
	mvvm框架：react
	状态管理：mobx
	类型约束：typescript
	css预处理：stylus
	打包构建：webpack
	基础UI组件：antd
# 目录结构

- build 打包文件
- config 配置文件
  - proxy.conf.js  开发环境代理配置
- public 入口html
- src
	- assets 静态图片资源
	- beans 全局常量定义
	- components 公共组件
	- hooks 全局自定义hook
	- pages
		- login 登录页
		- main 主页面
  	* App 根组件
	- pwa
	- routers 路由
	- services 业务接口api
	- store 状态管理
	- styles 公共样式
	  * _base 基础样式
	  * _mixins 全局样式函数
	  * _reset 默认标签样式重置
	  * _variables css变量
	  * antd 对antd样式修改
	- utils
  	* index 工具函数
  	* eventBus 全局事件总线
  	* selection.json 字体图标名字描述
	* index 项目入口文件
- version 版本信息模板文件
* .commitlintrc.js  git代码提交校验配置
* .editorconfig.js  编辑器的代码格式配置
* .prettierrc 编辑器代码格式化配置
* .eslintrc JavaScript校验配置
* .stylintrc stylus效验配置
* types.d.ts ts类型声明
* tsconfig.json ts配置
* version.js git信息提取，用于打包版本信息构建
* webpack.config.js webpack 配置

# 开发规范
## 文件存放及命名规范
+ assets下最外层放全局功能组件图片，一个子目录对于一个路由页面
+ pages中一个目录对应一个路由，路由页面模块内部的公共业务组件统一放在该目录下的components文件夹下（嵌套路由页面同理）
+ services下子目录与服务端模块或者路由页面对应
+ 组件驼峰命名，首字符大写命名
+ 文件夹命名（除组件外）都小字符+下划线
+ 变量与函数使用驼峰命名
+ 事件句柄函数使用on开头，与普通函数区分
+ 常量使用大写+下划线命名
+ 元素的className使用小写+下划线命名 ``.login_wrapper``(方便jsx中css-modules引用 ``<divclassName={styl.login_wrapper}>``)

## 编码规范
#### 组件编写
+ 项目中可以同时使用Class组件或者Hook函数组件，尽量使用Hook组件（方便利用自定义hook进行封装逻辑，与页面解耦）
+ Class组件中成员书写顺序：普通属性声明、页面渲染用响应式属性声明、构造函数、生命周期钩子函数、自定义函数、事件句柄函数、页面模板
+ Hook组件中成员书写顺序：props、useState、useRef、useEffect、自定义属性和函数、事件句柄函数、页面模板
#### 样式编写
+ 全局样式放在src/styles
+ 组件样式文件与组件文件放同一目录
+ 为防止类名冲突引起样式污染，默认开启了css-modules；自定义组件都使用css-modules方式引入样式
  ```js
	 //  Login.tsx
		import styl from './login.styl'
		...
			<div onClick={this.login} className={styl.login}>
       			<div className={styl.title}>登录页</div>
			</div>
		...
	```
	```js
	 /* login.styl */
		.login
			width 100%
			height 100%
			.title
    			font-size: 16px
	```
+ 修改第三方antd组件样式加上:global前缀
  ```css
		:global
			.ant-btn
				color #fff
	```
+ 全局公共组件也可以不用css-modules(便于业务组件中进行样式微调)
    ```js
	  /* index.tsx */
		import './index.styl'
		...
			 <div className="form_item">
			</div>
		...
	```
	```js
	 /* index.styl */
		.form_item
			margin-bottom 16px
	```
+ 所有使用到的颜色、字号在_variables.styl中定义变量(使用css原生变量，便于后期通过js动态修改主题配置)
	```css
	  /* 定义 */
		:root
			--bg-100 #021627
	```
	```js
	  /* 获取css变量值 */
    const ele: any = document.getElementById('canvas-root')
    window.getComputedStyle(ele).getPropertyValue('--bg-100')
	  /* 动态修改css变量值 */
	  document.documentElement.style.setProperty("--bg-100","#042C4D");
	```
+ 组件中使用的颜色、字号统一使用全局_variables.styl中定义的变量值
	```css
		 background var(--bg-100)
	```
+ 基础组件直接使用antd,在src/styles/antd.styl中根据UI设计主题修改antd样式风格
#### 关于注释
+ 组件文件头部添加文件注释，包括组件介绍、作者等信息;``koroFileHeader插件:ctrl+cmd+i``
+ 功能复杂的函数添加函数注释;``koroFileHeader插件:ctrl+cmd+t``
+ 复杂的代码块添加注释；
#### 关于typescript
+ 主要为了类型检查和编辑器代码提示；
+ 传递给自定义组件的props类型务必使用interface接口约定具体参数类型
	```js
		/* 函数组件 */
		interface EmptyProps {
			label?: string
			align?: string
			flexVerticalAlign?: string
			isRequire?: boolean
			labelWidth?: number
		}
		/* Class组件 */
		interface LoginProps extends RouteComponentProps<{}> {
			form: any
			userService: UserService
			globalService: GlobalService
			userStore: UserStore
		}
	```
+ 能不用any尽量不用any，特别是自己定义的用于前端展示和表单提交的数据；

#### 关于mobx
+ 除了全局状态数据用mobx管理，复杂页面及表单的状态数据也建议用mobx管理（功能迭代复杂以后便于维护）；
+ 通过getter方法、函数存取状态数据；
#### 其他规范
+ service异步接口统一使用async await语法
```js
  public login = async () => {
    const res = await this.userService.login()
    if (res.status === 0) {
      this.userStore.login(res.data)
    }
    this.props.history.push('/main/home')
  }
```
+ 常量统一使用大写+下划线方式命名定义进行语义化；全局常量统一放入beans下；

##### 完整规范参考：[开发规范](https://www.yuque.com/zneky6/sonvup/ath2f9)

## git操作规范
+ 每个人在各自分支开发，以主分支_作者方式命名自己分支 ``dev_luolei``
+ 个人代码合到主分支：每个人在各自分支开发好了,先将最新的主分支代码合并到自己分支，有冲突解决冲突，解决冲突以后然后再在gitlab上提交pull requst，由组长进行codereview以后进行合并;
+ [git研发流程](https://wiki.haizhi.com/pages/viewpage.action?pageId=8618679)
+ commit message格式要求：type（类型）:subject（描述）``git commit -am 'fix:登录按钮点击无效'``；type使用下面7种标识:
  + feat：新功能（feature）
  + fix：修补bug
  + improve：功能改进
  + docs：文档（documentation）
  + style： 格式（不影响代码运行的变动）
  + refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  + test：增加测试
  + chore：构建过程或辅助工具的变动
  + perf：优化相关，比如提示性能、体验
  + revert：回滚到上一个版本
  + bulid：影响生产系统或外部依赖性的更改
  + ci：持续集成修改	
# vscode编辑器设置
+ js格式化使用prettier插件
+ stylus格式化使用Manta's Stylus Supremacy 插件
##### 详情参考：[代码风格规范](https://www.yuque.com/zneky6/sonvup/wxraik)
# tips
#### 关于service和store
* Class组件内使用：已在全局实例中挂载，只用通过@inject注解声明依赖，即可在props中获取；
* Hook组件使用：import方式引入实例，直接安单例对象使用实例方法；
#### 组件
+ 不参与页面渲染的变量同时又要获取实时值需要用useRef定义，取.current值；
+ 非路由页面的Class组件想要从props中获取全局router的引用，需要用withRouter包装；
+ Class组件内使用的mobx状态数据要想响应式更新，需求用mbox-react的observer包装；
+ 函数组件内使用的mobx状态数据要想响应式更新，需求用mobx-react-lite的observer包装；
#### stylus
+ :global全局样式下绝对路径前面需要添加~
  ```css
		 bg-contain('~src/assets/info_ok.svg')
	```
+ 组件通过css-modules引入的样式文件中使用到全局的_mixins的函数时，需要再顶部import引入；（webpack会进行tree shaking处理，不会重复编译）
	```js
		@import '~src/styles/_mixins.styl'
	```






