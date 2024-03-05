const express = require('express');
const app = express();
const path = require('path')


 app.use(express.urlencoded({extended:'true'}))
 app.use(express.json())



app.get('/index', (req, res)=>{

    res.sendFile(path.join(__dirname, "frontend/index1.html"))

})

app.get('/home', (req, res)=>{

    res.sendFile(path.join(__dirname, 'templates', 'home.html'))

})

app.get('/user/register', (req, res)=>{

     res.sendFile(path.join(__dirname, 'templates', 'user_form.html'))

})

app.get('/user/show', (req, res)=>{

    const query = req.query
    let user = {
        firstName : query.firstName,
        lastName : query.lastName
    }
    res.send(JSON.stringify(user))


})
app.post('/user/show', (req, res)=>{

    const user = req.body;
    console.log('INSIDE SERVER...')
    console.log(user);
    res.send(JSON.stringify(user))


})

app.listen(8080, ()=>{
    console.log('Server started on port 8080')
});