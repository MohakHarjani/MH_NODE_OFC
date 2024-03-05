
const fs = require("node:fs");

function syncFileWrite()
{
    const content = 'Hi everyone !!'
    fs.writeFileSync("./output_text_files/file1.txt", content);
}
//====================================================================================================================
function asyncFileWrite()   //overrides the content inside existing file, removes the already existing content first
{
    const content = "What a lovely weather..";
    fs.writeFile("./output_text_files/file1.txt",content,(err)=>{
        if(err)
        {
            console.log(err);
        }
        else {
            console.log("Content written in file...");
        }
    });

}
//==================================================================================================================
function asyncFileAppend()
{
    const content = 'I am doing training in NodeJS'
    fs.writeFile("./output_text_files/file1.txt",content, {flag : "a"} ,(err)=>{
        if(err)
        {
            console.log(err);
        }
        else {
            console.log("content appended.");
        }
    });
    

}
//========================================================================================================

console.log('BEFORE FILE WRITING')

// syncFileWrite()
// asyncFileWrite()
asyncFileAppend()
console.log('AFTER COMPLETING FILE WRITING..')
 