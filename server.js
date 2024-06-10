const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let staticData = [];

app.post('/create', (req, res) => {
  console.log('Create:', req.body);
  staticData.push(req.body);
  res.status(201).send({ message: 'Created', data: req.body });
});

app.get('/read/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = staticData.find(data => data.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ message: 'Not found' });
  }
});

app.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = staticData.findIndex(data => data.id === id);
  if (index !== -1) {
    staticData[index] = { ...staticData[index], ...req.body };
    console.log('Update:', staticData[index]);
    res.send({ message: 'Updated', data: staticData[index] });
  } else {
    res.status(404).send({ message: 'Not found' });
  }
});

app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = staticData.findIndex(data => data.id === id);
  if (index !== -1) {
    const deletedData = staticData.splice(index, 1);
    console.log('Delete:', deletedData);
    res.send({ message: 'Deleted', data: deletedData });
  } else {
    res.status(404).send({ message: 'Not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
