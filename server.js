const express = require('express')
const app = express();
const {MongoClient} = require('mongodb')

async function getuser() {
    const client  = await MongoClient.connect('mongodb://localhost:27017')
const dbname = client.db('userdb')
const dbcol = dbname.collection('dbcol');

return dbcol ;
}

async function insertindb() {
   try {
    const dbcol = await getuser();
    const result = await  dbcol.insertMany([
        {name : 'saksham' , course : 'btech'} , 
        {name : 'medhavi' , course : 'mba'} , 
        {name : 'wasim' , course : 'bcom'}
    ])

    console.log(result);
}
 catch (err) {
     console.log(err);
 }

}

async function deleteuserdb () {
    
    try {
    const dbcol = await getuser();
    const result = dbcol.remove({
        $and : [{name : 'wasim'} , {course : 'bcom'}]
    })

    console.log(result);

}
catch (err) {
    console.log(err);
}
}
async function showdb() {
  try {
    const dbcol = await getuser() 
    const result = await  dbcol.find().toArray();

    console.log(result);
  }
  catch (err) {
      console.log(err);
  }
}

insertindb();
showdb();
deleteuserdb();
