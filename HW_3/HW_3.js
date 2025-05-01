//Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.


const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'count_visits.json')

app.get('/', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const dataVisits = JSON.parse(data);
  dataVisits["/"] += 1;
  fs.writeFileSync(dataPath, JSON.stringify(dataVisits, null, 2));
  res.send(`<h1>Главная страница</h1><a href="/about">Перейти на страницу обо мне</a><h3>Количество просмотров ${dataVisits["/"]}</h3>`)});


app.get('/about', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const dataVisits = JSON.parse(data);
  dataVisits["/about"] += 1;
  fs.writeFileSync(dataPath, JSON.stringify(dataVisits, null, 2));
  res.send(`<h1>Страница обо мне</h1><a href="/">Перейти на главную страницу</a><h3>Количество просмотров ${dataVisits["/about"]}</h3>`)});


const port = '3000';

app.listen(port);