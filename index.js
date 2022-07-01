const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3svww.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const billCollection = client.db("Power-hack").collection("bills");

        app.get('/bills', async (req, res) => {
            const result = await billCollection.find().toArray()
            res.send(result)
        })
        
        app.post('/bills', async (req, res) => {
            const query = req.body
            const result = await billCollection.insertOne(query)
            res.send(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World! I am here')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})