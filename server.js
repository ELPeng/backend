const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()




// // Make sure you place body-parser before your CRUD handlers!
// app.use(bodyParser.urlencoded({extended: true}))
// app.listen(3000, function(){
//     console.log('listening on 3000')
//     console.log(__dirname)
// })
// app.get('/', (req, res) =>{
//     res.sendFile(__dirname + '/index.html')
// })
// app.post('/quotes', (req, res) =>{
//     console.log(req.body)
// })


//Using Callbacks
/* 
MongoClient.connect('mongodb+srv://EPUser:bcdQhxIZ0FE6LICU@cluster0.6s3mh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})
*/

MongoClient.connect('mongodb+srv://EPUser:bcdQhxIZ0FE6LICU@cluster0.6s3mh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended: true})) 
        app.listen(3000, function(){
            console.log('listening on 3000')
            console.log(__dirname)
        })
        app.get('/', (req, res) =>{
            const cursor = db.collection('quotes').find().toArray()
                .then(results =>{
                    res.render('index.ejs', {quotes: results})
                })
                .catch(error => console.error(error))
            
            // console.log(cursor)
            // res.sendFile(__dirname + '/index.html')
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result =>{
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))
