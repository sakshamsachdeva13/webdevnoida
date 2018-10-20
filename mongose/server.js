const express = require('express')
const mongoose = require('mongoose')
const app = express()
  
 mongoose.connect('mongodb://localhost:27017')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/public' , express.static(__dirname + '/public'))

const Schema = mongoose.Schema ;

const userschema = new Schema({
    name : String , 
    age : Number , 
    course : String ,

})

const usermodel = mongoose.model('usercoll1' , userschema);
app.get('/' ,(req , res) => {

    usermodel.find().exec().then(result => {console.log(result);
    res.send(result);
    }
).catch(err => console.log(err))
})

app.post('/' , (req , res) => {

    new usermodel({
        name : req.body.name , 
        age : req.body.age,
        course : req.body.course 
    }).save().then(result => {console.log(result)
      res.redirect('/');
    })
    .catch(err => console.log(err));
})

app.listen(9000 , () => {
    console.log('server has been started');
})