const express = require('express');
const chatController = require('./controllers/chatController');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(cors());

app.options('/:room', cors());

app.get('/:room', chatController.getMessages, (req, res) => {
  return res.json(res.locals.messages);
});

app.post('/:room', chatController.postMessage, (req, res) => {
  return res.json(res.locals.message);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log(`server listening on port ${PORT}...`));
