//step 1:get node fs package
const fs = require("node:fs");

//step 2:create a readable stream
//const readableStream = fs.createReadStream('input.txt');

//step 3:set the encoding to be utf8. 
//readableStream.setEncoding('UTF8');

//step 2 & 3: combined - create readable stream with given encoding and buffer size.
const readableStream = fs.createReadStream("./text_files/file_1.txt",
{encoding:"utf-8",
 highWaterMark:1 //default buffer size is 64kb, change it to 5bytes
});

//step 4: open writable stream you wish to write streamed data to file
const writableStream = fs.createWriteStream("./output_text_files/file_2.txt");

//stream internally extends from event emitter 
//so we can register a listener
//step 5: register a event listener to listen to streamed data when available in buffer
readableStream.on("data",(chunk)=>{

    //step 6: log the data to console, if you wish to display as well as write to a file.
    console.log(chunk);
    //step 7: to write streamed data to another file using writable stream.
    writableStream.write(chunk);
})

//step 8: register a listener to listen to stream end event
readableStream.on('end',function() {
    console.log('read stream has ended');
    
 });
 
//step 9: register a listener to listen to stream error event. 
 readableStream.on('error', function(err) {
    console.log('error while reading a stream..')
    console.log(err.stack);
 });
 
 console.log("Program Ended");