**此项目展示Next14添加Next-Auth实现登录认证和Session获取。**

**update: 添加Github OAuth2.0登录获取code功能**

## 依赖版本

|           | 说明                   | version       |
| --------- | ---------------------- | ------------- |
| next      | next框架               | 14.2.2        |
| next-auth | next-auth权限验证      | 5.0.0-beta.15 |
| react     | React包                | 18            |
| react-dom | React与DOM相关的操作包 | 18            |
| zod       | 模式验证               | 3.22.4        |
| bcrypt    | 加解密工具             | 5.1.1         |
| dotenv    | 从文件加载环境变量     | 16.4.5        |
| mysql2    | Nodejs mysql库         | 3.9.2         |

## 实现功能
Next-auth： 自定义密码，Github Providers功能。

用户使用账号密码登录，正确获取session中的用户信息。

Github Oauth登录，正确回调，并得到Oauth 授权码code。

## feature
Next-auth：Credentials/Github providers.

User log in and fetch auth session info.

Github oauth log in and call back correctly(call back get the oauth code).

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```



