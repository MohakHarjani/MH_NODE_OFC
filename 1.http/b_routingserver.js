const http = require('http')
const fs = require('node:fs');
const path = require('path');


const server = http.createServer((req, res)=>{

    let url = req.url;
    console.log('Request URL => ' + url);

    if (url === '/')
    {
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })
        res.end('<h1>This is home page</h1>')
    }
    else if (url === '/about')
    {
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        })
        res.end('This is plain text info...')  
    }
    else if (url === '/user')
    {
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        })
        const user = { name : 'Mohak', salary : 35000 };
        const userJsonString = JSON.stringify(user);
        res.end(userJsonString)  //we can send only string/buffer in res.end()...cannot send obj directly
    }
    else if (url === '/userForm')
    {
        res.writeHead(200, { 'Content-Type' : 'text/html'})
        const htmlString = fs.readFileSync(path.join(__dirname, 'templates/userForm.html'))
        res.end(htmlString);

    }
    else
    {
        res.writeHead(404);
        res.end('ERROR...404 NOT FOUND')
    }

})

server.listen(8080, ()=>{
    console.log('Server started at port 8080')
})



