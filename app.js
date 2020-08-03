const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
})

//record notes
let recordNotes = () => {
    rl.question('write a note...', (note)=>{
        console.log(note);
        fs.writeFile('NewFile.txt', note, (err)=>{
             if (err) throw err;
             console.log(`File was created`);
            })
        rl.close();
    })
}

recordNotes();

//create new file
const createFile = (filePath, fileContent) => {
    fs.writeFile(filePath, fileContent, (err)=>{
        if (err) throw err;
        console.log(`New File was created`);
    })
}

//create new directory
const createDirectory = (filePath, err) => {
    fs.mkdir(filePath, (err)=>{
        if (err) throw err;
        console.log(`directory was created`);
    })
}

//list all files in directory
const listDirectory = (filePath, err) => {
    fs.readdir(filePath, (err, files) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log(`List of files in ${filePath}:`); 
          files.forEach(file => { 
            console.log(file); 
          }) 
        } 
      }) 
}

//read files
const readFile = (filePath, encoding, err)=>{
    fs.readFile(filePath, encoding, (err, data)=>{
        if (err) throw err;
        console.log(data);
    })
}


//tests
createFile('working.txt', 'just some texts');
createDirectory('tasks')
createDirectory('Important')
readFile('working.txt', 'utf8')
listDirectory('tasks')
