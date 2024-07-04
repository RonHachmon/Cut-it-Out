// app.js

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
console.log(`request`);
  res.send('Hello, World! ss');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
