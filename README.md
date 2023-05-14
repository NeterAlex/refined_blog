# Refined blog

## 简介

`Refined`是前后端分离的个人博客项目，由`React`+`Golang`构建，实现了基本的前台显示和管理系统。

示例站点：[Refined (neteralex.cn)](https://www.neteralex.cn/)

## 快速使用

> Refined 使用`git`管理代码，托管在`github`上，使用`pnpm`作为包管理器

+ 前端：

    + `clone`项目

    + 新建`.env.dev`，在其中填写

      ```bash
      APP_ENV=dev
      NEXT_PUBLIC_API=你的后端api地址
      ```

    + `pnpm run build:dev`构建项目

    + `pnpm run start`启动项目，默认地址：`localhost:3000`

+ 后端：

    + `clone`项目
    + 运行`go mod tidy`和`go mod download`
    + 按下文 #后端配置文件 撰写配置文件
    + `go build`后启动项目，默认地址：`localhost:8022`

## 功能

+ 前台
    + 博客浏览、评论
    + 文章归档（时间线）
    + 全局搜索
    + 登陆注册
    + 用户个人信息编辑

+ 后台管理系统

    + 博客管理
    + 评论管理
    + 用户管理

    + 数据统计

+ 其他

    + 夜间模式
    + `Markdown`支持
    + 响应式 UI 与移动端适配