const express = require('express');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const app = express();
const users = [];
let uniqID = 0;
const dataPath = path.join(__dirname, 'users_data.json')

app.use(express.json())
const userSchema = joi.object({
  firstName: joi.string().min(1).required(),
  secondName: joi.string().min(1).required(),
  age: joi.number().min(0).max(150).required(),
  city: joi.string().min(1)
})

app.get('/users', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const dataUsers = JSON.parse(data);
  res.send({ dataUsers });
});

app.get('/users/:id', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  const dataUsers = JSON.parse(data);
  const userid = +req.params.id;
  const user = dataUsers.find(user => user.id === userid);
  if (user) {
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null })
  }
});

app.post('/users', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  let dataUsers = JSON.parse(data);
  const result = userSchema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details});
  }
  if (dataUsers.length == 0) {
    const uniqID = 1;
    dataUsers.push({
      id: uniqID,
      ...req.body
    });
    fs.writeFileSync(dataPath, JSON.stringify(dataUsers, null, 2));
    res.send({ id: uniqID });
  } else {
    const newId = dataUsers.length + 1
    dataUsers.push({
      id: newId,
      ...req.body
    });
    fs.writeFileSync(dataPath, JSON.stringify(dataUsers, null, 2));
    res.send({ id: newId });
  }
});

app.put('/users/:id', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  let dataUsers = JSON.parse(data);
  const result = userSchema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details});
  }
  const userid = +req.params.id;
  const user = dataUsers.find(user => user.id === userid);
  if (user) {
    const { firstName, secondName, age, city} = req.body;
    user.firstName = firstName;
    user.secondName = secondName;
    user.age = age,
    user.city = city
    fs.writeFileSync(dataPath, JSON.stringify(dataUsers, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null })
  }
});

app.delete('/users/:id', (req, res) => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  let dataUsers = JSON.parse(data);
  const userid = +req.params.id;
  const user = dataUsers.find(user => user.id === userid);
  if (user) {
    const userIndex = dataUsers.indexOf(user);
    dataUsers.splice(userIndex, 1);
    fs.writeFileSync(dataPath, JSON.stringify(dataUsers, null, 2));
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null })
  }
});

app.listen(3000);