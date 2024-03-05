const fs = require('node:fs')

//==============================================================================================
function syncFileRead()
{
    const readContent = fs.readFileSync("./text_files/file_1.txt","utf-8");
    console.log(readContent);
}
//=================================================================================================
function asyncFileRead()
{
    fs.readFile("./text_files/file_1.txt","utf-8",(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });

}
//========================================================================================================

console.log('BEFORE FILE READ...')

// syncFileRead()

asyncFileRead()

console.log('AFTER FILE READ...')