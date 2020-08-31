const http = require('http')
const url = require('url')
const controller = require('./controller')
const path = require('path')
const fs = require('fs')
const events = require('events')

const myEmitter = new events.EventEmitter();

module.exports.readNote=(req, res)=>{
    //pathname of the url
    const urlPath = url.parse(req.url).pathname
    //join the pathname to the current directory
    const filePath = path.join(__dirname, urlPath)
    //read the filepath
    fs.readFile(filePath,'utf8', (err, data)=>{
        if (err) 
        {
            //check for error
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(`file or directory does not exist!`)
            myEmitter.emit('not-found')
        }
        else
        {
            //display content of the file if there is no error
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(data)
            myEmitter.emit('read-note', filePath)
        }    
    })
}

module.exports.addNote=(req, res)=>{
    //get the url path
    const urlPath = url.parse(req.url).pathname,
    //join url to filePath
    filePath = path.join(__dirname, urlPath),
    //get the filePath driectory
    fileDir = path.parse(filePath).dir
    //get base of the directory
    var fileBase = path.parse(fileDir).base
    //check if directory exists
    fs.access(fileBase, err=>{
        if (!err) {
            //if it doesn't exist, create it
            fs.open(filePath, 'w', (err)=>{
                if (err) throw err
                myEmitter.emit('opened')
                res.writeHead(200, {'Content-Type':'text/html'})
                res.end(`Note was created successfully!`)
                myEmitter.emit('add-note')
            })
        }
        else
        {
            //if it does, just create a file
            fs.mkdir(fileBase, (err)=>{
                if (err) {
                    myEmitter.emit('duplicated')   
                }
                else
                    myEmitter.emit('folder-created')
                    fs.open(filePath, 'w', (err)=>{
                        if (err) throw err
                        myEmitter.emit('opened')
                        res.writeHead(200, {'Content-Type':'text/html'})
                        res.end(`Note was created successfully!`)
                        myEmitter.emit('add-note')
                    })
            })
        }
    })
}

module.exports.editNote=(req, res)=>{
    urlPath = url.parse(req.url).pathname,
    filePath = path.join(__dirname, urlPath),
    note = 'this is shown whenever a PUT request is made'
    //add new content to the existing filepath
    fs.appendFile(filePath, ' ' + note, (err, data)=>{
        if (err) throw err;
        //display error
        else
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(note)
        myEmitter.emit('note-edited', filePath)
    })    
}

module.exports.deleteNote=(req, res)=>{
    urlPath = url.parse(req.url).pathname,
    filePath = path.join(__dirname, urlPath)
    //delete the filepath
    fs.unlink(filePath, (err)=>{
        if (err) throw err
        else
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(`${path.basename(filePath)} was deleted!`)
    })
}

//display error if the requested url is invalid/does not exist
module.exports.errorInfo=(req, res)=>{
    res.writeHead(404, {'Content-Type':'text/html'})
    res.end(`oops! the note or directory you are looking for does not exist!`)
}

//events
myEmitter.on('not-found', ()=>{
    console.log(`file or directory does not exist!`);
})

myEmitter.on('read-note', ()=>{
    console.log(`note was read!`);
})

myEmitter.on('duplicated', (note)=>{
    console.log(`File and folder cannot have the same name!`);
})

myEmitter.on('folder-created', (note)=>{
    console.log(`folder created successfully!`);
})

myEmitter.on('opened', (note)=>{
    console.log(`note opened for writing`);
})

myEmitter.on('add-note', (note)=>{
    console.log(`content added!`);
})

myEmitter.on('note-edited', (note)=>{
    console.log(`note edited!`);
})

myEmitter.on('note-deleted', (note)=>{
    console.log(`file deleted!`);
})

