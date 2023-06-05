const express = require('express');
const userRouter = require('./routes/user.route');
const cors = require('cors');

const app = express();
app.use(express.json(
  {limit: '50mb'}
));
app.use(express.urlencoded(
  {limit: '50mb', extended: true}
));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});



const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World! Welcome to Instapay')
});

app.post('/fingerprint', (req, res) => {

  console.log(req.body);
    
    const { fingerprint } = req.body;
    console.log(fingerprint);
    res.send('Fingerprint received');
});

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})