# 使用tailwindcss开发当前项目

- 安装tailwindcss
npm install tailwindcss @tailwindcss/cli

- 配置tailwindcss
npx @tailwindcss/cli -i ./src/tailwind-base.css -o ./src/public.css --watch

- 引入public.css
在html文件中引入public.css文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public.css">
</head>
<body>
    <div class="bg-red-500">
        这是一个红色的div
    </div>
</body>
</html>
```
