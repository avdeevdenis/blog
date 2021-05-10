***Локальный запуск сервера:***
```
"dev": "nodemon -e ts -w ./src/server -x npm run watch:server",
"watch:server": "ts-node --project tsconfig.server.json src/server/server.ts"
```

https://stackoverflow.com/a/43699117

<br>
<br>

***Сборка статических клиентских файлов:***
```
"build:client": "next build"
```
Стандартная nextjs сборка клиенстких файлов в папку ./out.

<br>
<br>

***Сборка серверных файлов:***
```
"build:server": "tsc --project tsconfig.server.json"
```
Используем доработанный `tsconfig.server.json` для компиляции серверного typescript-based кода и встроенный в typescript конвертер ts -> js. В результате получаем собранный js-файл в папке, указанной в `compilerOptions.outDir`.

[Установка Next.js с использованием клиентского сервера Express и TypeScript](https://medium.com/nuances-of-programming/установка-next-js-с-использованием-клиентского-сервера-express-и-typescript-e849938809c2)

<br>
<br>

***Собираем целиком проект для продакшена:***
```
"build": "npm run build:client && npm run build:server"
```
Сочетает в себе сбор клиентских файлов средствами `nextjs` и серверных файлов средствами `tsc`.

<br>
<br>

***Запуск сайта в продакшене***
```
"prod": "NODE_ENV=production node build/server.js"
```
Запуск происходит с установкой переменной окружения `NODE_ENV=production` и запуском собранного js-файла, являющегося точкой входа в express-сервер.
