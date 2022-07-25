
const express = require('express');
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";//localhost:27017/
const monclient = new MongoClient(uri);
const ObjectId = require('mongodb').ObjectId;


const app = express()
// app.use(express.static('node_modules'))
// app.use(express.static('public'))
// app.use(express.static('src'))
// app.use(express.static('.gitignore'))
// app.use(express.static('package.json'))
// app.use(express.static('package-lock.json'))
// app.use(express.static('src'))

app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.post('/data/save', async (req, res) => {
 console.log(req)
    await monclient.connect()
    const db = monclient.db("Saves")

    const obj = JSON.parse(req.body);
    let findinDB = await db.collection('entries').find({ [obj]: { "$exists": true } }).toArray();
    if (findinDB.length != 0) {
        await db.collection('entries').insertOne([obj])
    }
    await monclient.close();
    res.redirect("https://www.youtube.com/")
})

app.post('/data/delete', async (req, res) => {

    const obj = JSON.parse(req.body);
    await monclient.connect()
    const db = monclient.db("Saves")
    let findinDB = await db.collection('entries').find({ [obj]: { "$exists": true } }).toArray();
    if (findinDB.length != 0) {
        await db.collection('entries').deleteOne({ _id: [findinDB[0]._id] })
    }
    await monclient.close();
})


app.get('/data/all', async (req, res) => {
    await monclient.connect()
    const db = monclient.db("Saves")
    let findinDB = await db.collection('entries').find().toArray();
    res.json(findinDB)
    await monclient.close();
})


app.listen(3001, () => console.log("Server started"))