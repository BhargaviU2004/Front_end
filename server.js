const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
let recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf-8'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  user ? res.redirect('/post.html') : res.send('Login failed');
});

app.post('/post-recipe', (req, res) => {
  const { title, description } = req.body;
  recipes.push({ title, description });
  fs.writeFileSync('recipes.json', JSON.stringify(recipes));
  res.redirect('/');
});

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
