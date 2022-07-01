const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hpa3i.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const infoCollection = client.db('tasks_app').collection('infos');

        app.get('/info', async(req, res)=>{
            const query ={};
            const cursor = infoCollection.find(query);
            const infos= await cursor.toArray();
            res.send(infos);
        });

        app.post('/info', async(req,res)=>{
            const query =req.body;
            const result = await infoCollection.insertOne(query);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello To Do!')
})

app.listen(port, () => {
  console.log(`Tasks app listening on port ${port}`)
})