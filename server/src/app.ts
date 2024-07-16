import imageRouter from  './routers/image'
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());


app.use('/api', imageRouter);
app.get('/', (req, res) => {
console.log(`default??`);
  res.send('check');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
