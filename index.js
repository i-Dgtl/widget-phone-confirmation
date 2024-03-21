// Подключение библиотек
const app = require('express')(); // наше приложение app работает на базе Express
const bodyParser = require('body-parser');
const axios = require('axios');
const nunjucks = require('nunjucks');

// Входящие HTTP запросы обрабатываются библиотекой body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// nunjucks рендерит файлы из папки "views"
nunjucks.configure('views', { express: app });

// Порт, на котором работает наше приложение
const port = 3001;

// Ответ на клиентский запрос к главной странице приложения
app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/success', (req, res) => {
  res.render('success.html');
});

app.post('/sendPhoneNumber', (req, res) => {
  const phoneNumber = req.body.phoneNumber; // номер пользователя из тела запроса

  res.render('widget.html', {
    phoneNumber: phoneNumber,
  }); // передаем номер телефона пользователя на страницу с виджетом
});

app.post('/sendAuthKeyFunc', (req, res) => {
  //console.log(req.body);
  res.sendStatus(200);

  axios({
    method: 'post',
    url: 'https://direct.i-dgtl.ru/api/v1/verifier/widget/send',
    headers: { Authorization: 'Basic YOUR_API_KEY' },
    data: {
      key: req.body.key,
    },
  }).then((response) => {
    console.log(response.data);
  });
});

app.post('/checkVerification', (req, res) => {
  console.log(req.body);

  axios({
    method: 'post',
    url: 'https://direct.i-dgtl.ru/api/v1/verifier/widget/check',
    headers: { Authorization: 'Basic YOUR_API_KEY' },
    data: {
      key: req.body.key,
    },
  }).then((response) => {
    console.log(response.data);
    res.send(response.data);
  });
});

// Приложение будет слушать запросы на указанном выше порте
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
