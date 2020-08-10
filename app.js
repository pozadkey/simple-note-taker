const readline = require('readline');
const fs = require('fs');
const events = require('events');
const path = require('path');

//write note and create new file
createFile = (filePath, note) => {
    fs.writeFile(filePath, note, (err)=>{
        if (err) throw err;
        else
        myEmitter.emit('create')
    })
}

//createFile('demo.js', 'testing')
//create new directory
newDirectory = (folder, err)=>{
    fs.mkdir(folder, (err)=>{
        if (err) throw err;
        else
        console.log(`created!`);
    })
}

//move files into topics
organizeFiles = (topic, file) => {
    const currentPath = path.join(__dirname, file);
    const newPath = path.join(__dirname, topic, file )
    fs.rename(currentPath, newPath, (err)=>{
        if (!fs.existsSync(newPath) || !fs.existsSync(file)){
            fs.open(file, 'w+', (err)=>{
                if (err) throw err
                else
                fs.mkdirSync(topic)
            })
        }
        else
        console.log(`${file} moved into ${topic} folder!`);
        
    })
}


//list all files in directory
listDirectory = (filePath, err) => {
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
readFile = (filePath, encoding, err)=>{
    fs.readFile(filePath, encoding, (err, data)=>{
        if (err) throw err;
        else console.log(data);
    })
}

//edit and update file
editFile = (filePath, note, err)=>{
    fs.appendFile(filePath, note, (err)=>{
        if (err) throw err;
        else
        console.log(`file updated successfully!`);
    })
}

//delete file
deleteFile = (folder, file, err) => {
    let filePath = path.join('.','/', folder, file)
    fs.unlink(filePath, (err, loc)=>{
        let loc = path.join('.','/', folder)
        if (err) throw err;
        else if (loc){
            fs.unlink(folder, (err)=>{
                if (err) throw err;
                myEmitter.emit('last-folder')
            })
        }
        else 
        myEmitter.emit('delete')
        
    })
}




//get summary
noteSummary = (filePath) => {
    const file = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    })
    
    file.on('line', (line)=>{
        myEmitter.emit('summary', line.slice(-5) )
    })
}

const myEmitter = new events.EventEmitter();

//edit and uodate note
editFile = (filePath, note, err)=>{
    fs.appendFile(filePath, note, (err)=>{
        if (err) throw err;
        else
        myEmitter.emit('edit', note)
    })
}

//listeners
myEmitter.on('create',()=>{
    console.log(`file created!`);
    
})

myEmitter.on('edit', (note)=>{
    console.log(`${note} was edited`);
})

myEmitter.on('delete', ()=>{
    console.log(`file deleted!`);
})

myEmitter.on('summary', (sum)=>{
    console.log(`summary: .....${sum}`);
})

myEmitter.on('last-folder',()=>{
    console.log(`folder deleted`);
})
















