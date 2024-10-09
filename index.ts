import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';

const app = express();

let list: any[] = [];

app.use(bodyParser.json());
app.post('/api/student/add', (req, res) => {
  const uid = nanoid();
  list.push({ ...req.body, uid });
  res.json({ success: true, object: uid });
});
app.post('/api/student/delete', (req, res) => {
  const uid = req.body.uid;
  list = list.filter((item) => item.uid !== uid);
  res.json({ success: true });
});
app.post('/api/student/update', (req, res) => {
  const uid = req.body.uid;
  const index = list.findIndex((item) => item.uid === uid);
  if (index >= 0) list[index] = { ...req.body, uid };
  res.json({ success: true });
});
app.get('/api/student/page', (req, res) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const page = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
  res.json({ success: true, object: {
    pageNum, pageSize, page, total: list.length,
  } });
});
app.all('*', (req, res) => {
  res.statusCode = 404;
  res.send('404');
});

const PORT = 9999;
app.listen(PORT);
console.log(`server works on ${PORT} port...`);
