const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Blockchain, Block} = require('./blockchain');

const app = express();
const port = 5000;
const blockchain = new Blockchain();

app.use(bodyParser.json());
app.use(cors());

app.get('/blocks', (req, res) => {
  res.send(blockchain.chain);
});

app.post('/addBlock', (req, res) => {
  const { data } = req.body;
  const newBlock = new Block(
    blockchain.chain.length,
    Date.now().toString(),
    data,
    blockchain.getLatestBlock().hash
  );
  blockchain.addBlock(newBlock);
  res.send(newBlock);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
