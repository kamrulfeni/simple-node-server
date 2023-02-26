const express = require('express');
cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('Simple Node Server Running');
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sakib', email: 'sakib@gmail.com' },
    { id: 3, name: 'Rakib', email: 'rakib@gmail.com' },
    { id: 4, name: 'Janker', email: 'janker@gmail.com' },
];



const uri = "mongodb+srv://username:password@cluster0.vvaslnb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'hahia Mahi', email: 'kjjja@gmail.com' }
        //   const result = await userCollection.insertOne(user);
        //   console.log(result);
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.post('/users', async (req, res) => {

            console.log('Post API called');
            const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            // console.log(user)
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://dbUser9:<password>@cluster0.vvaslnb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// app.get('/users', (req, res) => {
//     if(req.query.name){
//         // filter user by query
//       const search = req.query.name;
//       const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//       res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
//     // console.log(req.query);

// });

// app.post('/users', (req, res) => {

//     console.log('Post API called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user)
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`simple not server running on port ${port}`);
})