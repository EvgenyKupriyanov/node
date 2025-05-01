//Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');

let countMain = 0;
let countInfo = 0;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    countMain += 1;
    res.end(`<h1>Главная страница</h1><a href="/about">Перейти на страницу обо мне</a><h3>Количество просмотров ${countMain}</h3>`);
  } else if (req.url === '/about'){
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    countInfo += 1;
    res.end(`<h1>Страница обо мне</h1><a href="/">Перейти на главную страницу</a><h3>Количество просмотров ${countInfo}</h3>`);
  } else {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end('<h1>Страница не найдена</h1>');
  }
  });

const port = '3000';

server.listen(port);