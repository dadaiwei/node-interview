# node-interview

> 基于vue+node+express+mongodb+mongoose的应聘管理系统

## 前提条件：
安装mongodb和node<br>
确保mongo服务开启<br>
使用mongod --config "D:\Mongo\mongo.conf"  --install --serviceName "MongoDB"，此后MongoDB服务开机自启

## 运行步骤
``` bash
### 安装依赖包
npm install

### 生成生产代码
npm run build

### 使用系统
http://localhost:8088
```

### 初始用户名及密码
用户名: develop test market admin   密码：均为123456(可登陆后修改)

### 项目结构
##### server 
config  初始登陆用户名及密码配置文件<br>
models  interviews及users collections的数据类型配置<br>
mongoDB  连接数据库及创建登陆用户<br>
router  interview及user子路由的所有接口<br>
index.js  express起http服务及使用路由<br>
start.js  设定windows系统开机自启服务Start Node-interview,第一次node  start.js及注册服务，后续开机自启

##### dist
vue项目打包文件及服务使用文件

##### src vue项目文件夹
api  interview及user的axios的接口列表<br>
assets  img存放在这里<br>
config  全局配置、侧边栏、搜索条件、表格头部、表格操作按钮<br>
router   vue-router配置<br>
util   error(错误表) global(全局工具函数)<br>
views  vue文件

##### upload 简历上传文件夹

##### 系统预览
###### 登陆
![](https://i.imgur.com/nijmNml.jpg)
###### 面试中
![](https://i.imgur.com/k8d5AB3.png)
###### 部门人才库
![](https://i.imgur.com/MeU2oAN.png)
######  应聘者录入及上传简历
![](https://i.imgur.com/5bIlFxF.png)
###### 编辑应聘者
![](https://i.imgur.com/qvlMK5m.png)
###### 应聘者详情及下载简历
![](https://i.imgur.com/U92wAJv.png)
###### 推荐该应聘者其他部门
![](https://i.imgur.com/wdOnRJz.png)