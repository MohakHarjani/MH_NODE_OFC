const http = require('node:http')
const url = require('node:url')
const {URL} = require('node:url');


const server = http.createServer((req, res)=>{

    console.log("URL OF REQUEST => " + req.url);
    console.log("HOSTNAME OF REQUEST => " + req.headers.host)


    //second param is true to parse the query params
    let myUrl = url.parse(req.url, true);  //this contains the path after :8080 => "/", "/home"...not the
    let myPath = myUrl.pathname
    let myHost = myUrl.hostname; //hostname and some other fields will be null as "myUrl" does not contain hostIP
    let myRequest = myUrl.req;
    let myQuery = myUrl.query;//object
    let mySearch = myUrl.search; //string
    
    console.log(myUrl);
    console.log(myPath);
    console.log(myHost);
    console.log(myRequest);
    console.log(myQuery);
    console.log(mySearch);

    // console.log(myQuery.firstName + ", " + myQuery.lastName);
    const firstName = myQuery.firstName;
    const lastName = myQuery.lastName;
    res.writeHead(200, {
        'Content-Type' : 'text/html',
    })

    res.write(`<h3>Hi ${firstName} ${lastName}</h3>`)
    res.end()




})

server.listen(5000, ()=>{
    console.log('Server listening on port 5000')
})
// const http = require('node:http');
// const url = require('node:url');
 
 
// let server = http.createServer((req,res)=>{
 
//     console.log(req.url);
//     console.log(req.headers.host);
 
//    let p = url.parse(req.url,true);
 
 
//    console.log('req headers:host'+req.headers.host);
//    console.log('req headers:'+req.headers.date);
//    console.log(p.pathname);
//    console.log(p.search);
// //   console.log(p);
 
//    let q = p.query;
//    console.log(q);
//    console.log(q.name+' '+q.surname);
//    const name = q.name;
//    const surname = q.surname;
 
//    res.writeHead(200,{'Content-Type':'text/html'});
//    res.write('<h3>Hello '+name+' '+surname+' ! </h3>');
//    res.end();
// });
 
// server.listen(3000,()=>{
//     console.log('server listening on port 3000');
// })