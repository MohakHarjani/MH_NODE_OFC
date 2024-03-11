const express = require('express');
const path = require('path')
const { dbconn } = require('./database')

const cors = require("cors");

const app = express();

//====================================================================================================================
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: 'true' }))
app.use(express.json())

//===============================================================================================================

app.get('/', (req, res) => { res.send('Hi from port 8080') })

//================================================================================================================

//get all books....
app.get('/book/all', (req, res) => {

    const sql = 'SELECT * FROM BOOK'
    dbconn.query(sql, (err, result) => {

        res.setHeader('Content-Type', 'application/json')

        if (err) 
        {
            res.status(404).send({
                message : err.message
            })
        }
        else 
        {
            res.status(200).send({
                books : result,
                message : 'Fetched all books successfully'
            });
        }
    })
})
//=============================================================================================================================

//get a specific book
app.get('/book/:id', (req, res) => {

    const bookId = req.params.id;

    const sql = 'SELECT * FROM BOOK WHERE BOOKID= ?';
    dbconn.query(sql, [bookId], (err, result) => {

        res.setHeader('Content-Type', 'application/json')

        if (err) {
            console.log(err)
            res.status(404).send({
                message : err.message
            })
        }
        else {
            console.log(result)
            if (result.length == 0) {
                res.status(404).send({
                    message : 'Cannot get book with id = ' + bookId + " :( "
                })
            }
            else {
                
                res.status(200).send({
                    book : result[0],
                    message : `Found book of id = ${bookId} successfully`
                });
            }
        }
    })
})
// //==========================================================================================================================

//post a book
app.post('/book', (req, res) => {

    const book = req.body
    console.log(book)

    const { bookId, bookName, bookPrice } = book;

    const sql = 'INSERT INTO BOOK VALUES (?,?,?)';
    dbconn.query(sql, [bookId, bookName, bookPrice], (err, result) => {

        res.setHeader('Content-Type', 'application/json');

        if (err) {
            console.log(err.message)
            res.status(400).send({
                message : err.message
            })
        }
        else {
            res.status(200).send({
                book,
                message : 'Book posted successfully'

            });
        }
    })
})
// //==========================================================================================================================
//delete a book
app.delete('/book/:id', (req, res) => {

    const bookId = req.params.id;
    const sql = 'DELETE FROM BOOK WHERE BOOKID=?';
    dbconn.query(sql, [bookId], (err, result) => {


        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err.message)
            res.status(400).send({
                message : err.message
            })
        }
        else {
            console.log(result)
            res.status(200).send({
                message : `Book with ${bookId} deleted..`
            });
        }
    })

})
// //===============================================================================================================================

//update a book

app.put('/book', (req, res) => {

    // let bookId = req.params.id;
    const book = req.body;
    const { bookId, bookName, bookPrice } = book;

    const sql = 'UPDATE BOOK SET BOOKNAME = ?, BOOKPRICE = ? WHERE BOOKID = ?';
    dbconn.query(sql, [bookName, bookPrice, bookId], (err, result) => {

       
        res.setHeader('Content-Type', 'application/json')
        if (err) {
            res.status(400).send({
                message : err.message
            })
        }
        else {
           
            res.status(200).send({
                book,
                message : 'Book updated successfully'
            });
        }

    })
})
//==========================================================================================
app.listen(8080, () => {
    console.log('Server started on port 8080')
});