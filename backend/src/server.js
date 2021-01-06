import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://127.0.0.1:27017';

const dbName = 'test1'
let db

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)

  db = client.db(dbName)
  console.log(`Connected MongoDB: ${mongoUrl} at Database: ${dbName}`)
})

// var claims = [{
//     "text": "Brush teeth",
//     "isVerified": false,
//     "isConfirmed": false,
//     "id": "h4539kv4-44j7-avr2-9l00-1f576biwa369"
// },
// {
//     "text": "Buy ham",
//     "isVerified": true,
//     "isConfirmed": true,
//     "id": "c25b1aaa-zw33-vyui-8954-255g670kjreq"
// },
// {
//     "text": "Buy eggs",
//     "isVerified": true,
//     "isConfirmed": false,
//     "id": "43238hsb-kf0u-37v2-plan-04ovap3lc85b"
// },
// {
//     "text": "Buy bacon",
//     "isVerified": false,
//     "isConfirmed": true,
//     "id": "c3agh633-avyi-d25g-e043-00002ch6k4n1"
// }]

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/claims', (req, res) => {
  db.collection("claims").find({}).toArray().then((values) => { res.status(200).json(values); })
});

app.post('/create-claim', (req, res) => {
  const { name, amount } = req.body;
  const claimToAdd = {
    text: name,
    isVerified: false,
    isConfirmed: false,
    amount: amount,
    id: uuidv4(),
    date: Date.now(),
  }
  return db.collection('claims').insertOne(claimToAdd).then((newClaim) => {
    if (newClaim) {
      res.status(200).json({ message: 'Success', newClaim: claimToAdd });
    }
    else {
      res.status(400).json({ message: 'Cannot add claim.' });
    }
  })
})

app.post('/verify-claim', (req, res) => {
  const { claim } = req.body;
  return db.collection('claims').findOneAndUpdate(
    { id: claim.id },
    {
      $set: { 'isConfirmed': claim.isConfirmed, 'isVerified': true }
    },
    { returnNewDocument: true }
  ).then((updatedClaim) => {
    if (updatedClaim.value) {
      res.status(200).json({ message: 'Success', updatedClaim: updatedClaim.value });
    }
    else {
      res.status(400).json({ message: 'There is no claim with that id' });
    }
  })
})

app.listen(8080, () => console.log("Server listening on port 8080"));