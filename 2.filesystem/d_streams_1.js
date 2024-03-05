// fs.createReadStream(path.join(__dirname,"file1.html")).pipe(res);  //Writing in result object
const fs = require('fs')
//=============================================================================================
const readableStream = fs.createReadStream("./text_files/file_1.txt",
{
    encoding:"utf-8",
    highWaterMark:5 //default buffer size is 64kb, change it to 5bytes
});

const writableStream = fs.createWriteStream("./output_text_files/file_2.txt");

readableStream.pipe(writableStream);
//=====================================================================================================