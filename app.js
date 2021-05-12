const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Pizza_schema = require('./extend/schema');
const app = express();

const port = 4000;
   

    const url = 'mongodb://Makanta:password71@cluster0-shard-00-00.ja3ps.mongodb.net:27017,cluster0-shard-00-01.ja3ps.mongodb.net:27017,cluster0-shard-00-02.ja3ps.mongodb.net:27017/Pizza-oder?ssl=true&replicaSet=atlas-4moo8m-shard-0&authSource=admin&retryWrites=true&w=majority'
       mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true})
       .then(response => {
        app.listen(port, () => {console.log(`Listening for requests on port ${port}`)});
       })
       .catch(err => {console.log('there was an error while connecting to a database')});

    app.set('view engine', 'ejs');

     app.use(express.static('public'));

     app.use(express.urlencoded({extended : true}))


    app.get('/', (req, res) => {
        Pizza_schema.find().sort({createdAt : -1})
        .then(pizza => {
            res.render('index', {title : '| home',pizzas : pizza})
        })
        .catch(err => res.send('there were errors while finding the pizza'))
      
    });

    app.post('/new-pizza', (req, res) => {
        const save_new_pizza = new Pizza_schema(req.body);
        save_new_pizza.save()
        .then(results => {res.redirect('/')})
        .catch(err => {res.send(err)});
    });

    app.get('/add', (req, res) => {res.render('add', {title : 'new pizza'})})

app.get('/details/:id', (req, res) => {
 const id = req.params.id;
   Pizza_schema.findById(id)
   .then(pizza => {
       res.render('details', {title : '| detail', pizza : pizza})
   })
   .catch(err => res.send('Could not find the pizza id'))
});

app.delete('/details/:id', (req, res) => {
    const id = req.params.id;
      Pizza_schema.findByIdAndDelete(id)
      .then(pizza => {
          res.json({redirect : '/'})
      })
      .catch(err => res.send('Could not find the pizza to delete'))
   });

   app.get('/edit-pizza/:id', (req, res) => {
       const id = req.params.id;
       Pizza_schema.findById(id)
       .then(pizza => { res.render('edit', {title : '| Update pizza details', pizza : pizza})})
        .catch(err => res.send('Error occured while finding pizza'))
    })

  app.post('/edit-pizza/:id', (req, res) => {
      const id = req.params.id;
        Pizza_schema.findByIdAndUpdate({_id : id}, req.body)
        .then(results => {res.redirect('/')})
        .catch(err => res.send('Ooops we could not update pizza details'))
      
  })