const readline = require('readline');
const fs = require('fs');
const events = require('events');
const path = require('path');

//launch event emitter
const myEmitter = new events.EventEmitter();

//write note and create new file
createFile = (filename, note) => {
    fs.writeFile(filename, note, (err)=>{
        if (err) throw err;
        else
        myEmitter.emit('create')
    })
}

//read note
readNote = (filename, encoding)=>{
    fs.readFile(filename, encoding, (err, data)=>{
        if (err) throw err;
        else console.log(data);
    })
}

//edit and update note
editFile = (filename, note)=>{
    fs.appendFile(filename, note, (err)=>{
        if (err) throw err;
        else
        myEmitter.emit('edit', filename)
    })
}

//create new directory
createFolder = (folder)=>{
    fs.mkdir(folder, (err)=>{
        if (err) throw err;
        else
        myEmitter.emit(`newFolder`, folder);
    })
}

//move files into topics
categorizeFile = (folder, file) => {
    const currentPath = path.join(__dirname, file);
    const newPath = path.join(__dirname, folder, file )
    fs.rename(currentPath, newPath, (err)=>{
        if (err)
        console.log(`file already exists! `);
        else
        myEmitter.emit('moved', filePath, file)
    })
}

//list all notes in a topic
listNotes = (folder) => {
    fs.readdir(folder, (err, notes)=>{
        if (err) throw err;
        else
        console.log(`List of files in ${folder}:`);
        notes.forEach(note=>{
            console.log(`${note}`);
        })
    })
}

//get summary
noteSummary = (filename) => {
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        terminal: false
    })
    
    file.on('line', (line)=>{
        myEmitter.emit('summary', line.slice(10) )
    })
}

//delete file
deleteFile = (folder, file) => {
    let filePath = path.join('.','/', folder, file)
    fs.unlink(filePath, (err)=>{
        if (err) throw err;
        else 
        myEmitter.emit('delete', file)
    })
}

//export functions
module.exports = {
    read:readNote,
    move:categorizeFile,
    summary:noteSummary,
    allnotes:listNotes,
    createfile:createFile,
    createfolder:createFolder,
    edit:editFile,
    delete:deleteFile
}

//listeners
myEmitter.on('create',()=>{
    console.log(`file created!`);
})

myEmitter.on('newFolder', (folder)=>{
    console.log(`new folder ${folder.toUpperCase()} was created!`);
})

myEmitter.on('edit', (filename)=>{
    console.log(`${filename} was edited`);
})

myEmitter.on('moved', (filePath, file)=>{
    console.log(`${file} moved into ${filePath}!`);
})

myEmitter.on('summary', (sum)=>{
    console.log(`summary: .....${sum}`);
})

myEmitter.on('delete', (file)=>{
    console.log(`${file} was deleted!`);
})

















