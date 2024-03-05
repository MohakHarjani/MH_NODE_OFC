const express = require('express');
const path = require('path')
const { dbconn } = require('./database')


const app = express();

//====================================================================================================================

app.use(express.urlencoded({ extended: 'true' }))
app.use(express.json())

//===============================================================================================================

app.get('/', (req, res) => { res.send('Hi from port 8080') })

//================================================================================================================

//it's important to add this route before "/user/:id" , otherwise /user/register would map to "/user/:id"
app.get('/user/register', (req, res) => {

    res.sendFile(path.join(__dirname, "views/userRegister.html"))

})

//================================================================================================================

//get all users....
app.get('/user/all', (req, res) => {

    const sql = 'SELECT * FROM USER'
    dbconn.query(sql, (err, result) => {

        if (err) {
            console.log(err)
            res.sendStatus(404).send('Cannot get users :(')
        }
        else {
            console.log(result)
            res.setHeader(
                'Content-Type', 'application/json'
            )
            res.send(result);
        }
    })
})
//=============================================================================================================================

//get a specific user
app.get('/user/:id', (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM USER WHERE ID = ? ';
    dbconn.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err)
            res.status(404).send(`<h1>HTTP request failed...ERROR => ${err}</h1>`)
        }
        else {
            console.log(result)
            if (result.length == 0) {
                res.status(404).send('Cannot get users with id = ' + id + " :( ")
            }
            else {
                res.setHeader(
                    'Content-Type', 'application/json'
                )
                res.send(result);
            }
        }
    })
})
//==========================================================================================================================

//post a user
app.post('/user', (req, res) => {

    const user = req.body
    console.log(user)

    const { id, name, password, profession } = user;

    const sql = 'insert into user values(?,?,?,?)';
    dbconn.query(sql, [id, name, password, profession], (err, result) => {

        if (err) {
            console.log(err.message)
            res.status(400).send('<h1>HTTP POST FAILED..' + err.message + '</h1>')
        }
        else {
            res.status(200).send('<h1>POSTED USER SUCCESSFULLY</h1');
        }



    })
})
//==========================================================================================================================
//delete a user
app.delete('/user/:id', (req, res) => {

    const id = req.params.id;
    console.log("User of id " + id + " will be deleted");

    const sql = 'DELETE FROM USER WHERE ID=?';
    dbconn.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err.message)
            res.status(400).send('<h1>HTTP DELETE FAILED..' + err.message + '</h1>')
        }
        else {
            res.status(200).send('<h1>DELETED USER SUCCESSFULLY</h1');
        }
    })

})
//===============================================================================================================================

app.listen(8080, () => {
    console.log('Server started on port 8080')
});