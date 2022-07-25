
const express = require('express');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser')
//const sanitize = require('mongo-sanitize');


const monclient = new MongoClient("mongodb://localhost:27017/")
monclient.connect()
const db = monclient.db("saves")
const app = express()
app.use(bodyParser.json())
app.use(express.static("build"))

app.post('data/add', async (req, res) => {
    let obj = req.body
    let entry = req.body.value
    let findinDB = await db.collection('entries').find({ value: entry }).toArray()

    if (findinDB.length == 0)
        await db.collection('entries').insertOne(obj)
})

app.post('data/delete', async (req, res) => {
    let entry = req.body.value
    let findinDB = await db.collection('entries').find({ value: entry }).toArray()

    if (findinDB.length != 0)
        await db.collection('entries').deleteOne({ _id: findinDB[0]._id })
})


app.get('data/all', async (req, res) => {
    let findinDB = await db.collection('entries').find({}).project({ _id: 0 }).toArray()
    res.json(findinDB)
})


app.listen(3001, () => console.log("Server started"))