const http = require('http');

//====================================================================================================
//this one handler with catch every request
//"8080/", "8080/abc/"
const server = http.createServer((req, res)=>{

    res.writeHead(200, {
        'Content-Type' : 'text/html'
    })

    res.write('<h1>Hi from port:8080</h1>')  //connection is not closed yet...
    res.end()   //now connection ends

})
//=============================================================================================================
server.listen(8080, ()=>{
    console.log('Server started at port 8080')
});












