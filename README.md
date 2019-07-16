什么是Process - 进程 ？

同一时间可以进行多个程序，每个运行的程序就是进程

举个栗子：
在浏览器上，打开浏览器，就是一个主进程
Main Process 每个打开的tab页签，就是渲染进程
Renderer Process

主进程和渲染进程的特点

主进程 - Main Process
·可以使用和系统对接的Electron API - 
创建菜单，上传文件等等
·创建渲染进程 - Renderer Process
·全面支持Node.js
·只有一个作为整个程序的入口点

渲染进程 - Renderer Process
·可以有多个，每个对应一个窗口
·每个都是一个单独的进程
·全面支持Node.js和DOM API
·可以使用一部分Electron提供的API


进程之间的通讯方式
·Electron 使用IPC（interprocess communication）
在进程之间进行通讯
和Chromium完全一致

为什么要进程之间的通讯
主进程在完成一些操作的时候需要通知渲染进程


数据持久化的方式
·使用数据软件
·使用HTML5提供的浏览器对象
·使用本地文件
npm install electron-store --save


//帮助生成独立的id
npm install uuid --save

把源代码转换成安装包的过程，称之为打包(packing)

Electron
 · 手动打包
 · Electron packager
 · Electron builder
 
 npm install electron-builder --save-dev
