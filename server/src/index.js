import express from 'express';
import dotev from 'dotenv';
import cors from 'cors';
// const routes = require('./routes/index');

dotev.config();
const app = express();

// Connect DB
// const db = require('./config');
// db.connect();

app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});