const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/vwdb_1?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1')
.then(()=>{
    console.log('Connected to database :)')
})
.catch((err)=>{
    console.log('Connection to database failed :( ' + err)
})

app.use(express.json())
app.use(express.urlencoded())
//==============================================================================================
const userSchema = mongoose.Schema({

    _id : Number,
    name : String,
    password : String, 
    profession : String
})

//model is like a class
const User = mongoose.model('User', userSchema);

//===================================================================================================

// const user1 = new User({
//     _id : 1,
//     name : 'Mohak Harjani',
//     password : '1234',
//     profession : 'unemployed'
// })
// const user2 = new User({
//     _id : 2,
//     name : 'Kshitij Kaul',
//     password : '789',
//     profession : 'teacher'
// })


//save documents to collection
// user1.save().then((res)=>{

//     console.log(res);

// }, (err)=>{

//     console.log(err)

// })

// user2.save().then((res)=>{

//     console.log(res);

// }, (err)=>{

//     console.log(err)

// })

//==================================================================

app.get('/', (req, res)=>{

    res.sendFile(path.join(__dirname, "/views/userForm.html"))
})

//==================================================================================================================
app.post('/user', (req, res)=>{

    const user = req.body;
    const newUser = new User({
      _id : user.id,
      name : user.name,
      password : user.password,
      profession : user.profession
    })
    newUser.save().then((result)=>
    { 
        console.log(result); 
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send({
            user,
            message : 'User added successfully'
        })
    })
    .catch((err)=>{ console.log(err) })

})
//============================================================================================
app.get('/user/all', (req, res)=>{


    res.setHeader('Content-Type', 'application/json')
    User.find().then((result)=>{
        let bookList = result.map((book)=>{

            return ({
                id : book._id,
                name : book.name,
                password : book.password,
                profession : book.profession
            })

        })
        res.status(200).send(JSON.stringify(bookList));

    })
})
//============================================================================

app.get('/user/:id/:name', (req, res)=>{

    let id = req.params.id;
    let name = req.params.name;

    res.setHeader('Content-Type', 'application/json')
    User.find({_id : id, name : name}).then((result)=>{
        let bookList = result.map((book)=>{

            return ({
                id : book._id,
                name : book.name,
                password : book.password,
                profession : book.profession
            })

        })
        res.status(200).send(JSON.stringify(bookList));

    })
})
//==============================================================================================

app.delete('/user/:id', (req, res)=>{
    let id = req.params.id;
    User.deleteOne({_id : id})
    .then((result)=>{
        console.log(result);
        res.status(200).send({
            message : 'Deleted user of id ' + id + " successfully"
        })
    })
    .catch((err)=>{
        res.status(404).send({
            message : 'Delete Request Failed.. ' + err
        })
    })

})

//==================================================================================================

app.put('/user/:id', (req, res)=>{




    let id = (req.params.id);
    let uiUser = req.body;
    let dbUser = {
        // _id : uiUser.id,
        name : uiUser.name,
        password : uiUser.password,
        profession : uiUser.profession
    }

    console.log(dbUser);
    User.updateOne({_id : uiUser.id}, {
        _id : uiUser.id,
        name : uiUser.name,
        password : uiUser.password,
        profession : uiUser.profession
    })
    .then((result)=>{
        console.log(result);
        res.status(200).send({
            message : 'User updated successfully'
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).send({message : 'Update request failed... ' + err})

    })
})
app.listen(8080, ()=>{
    console.log('Server started at port 8080')
})