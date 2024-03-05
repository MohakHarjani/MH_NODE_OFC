const fs = require("node:fs/promises"); //this is imp
//===============================================================================================
function asyncFileReadUsingPromise()
{
    fs.readFile("./text_files/file_1.txt","utf-8") //"not" directly passing the callback as a 3rd param
    .then(data=>console.log(data))
    .catch(error=>console.log(error));
}

//============================================================================================
async function asyncFileReadUsingAwait()
{
    try{
    const data = await fs.readFile("./text_files/file_1.txt","utf-8")
    console.log(data)
    }
    catch(error)
    {
        console.log(error);
    }
}

//==============================================================================

console.log('Before file read.......');

// asyncFileReadUsingAwait();
asyncFileReadUsingPromise();

console.log('After file read....');
