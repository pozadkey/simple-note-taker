const http = require('http')
const url = require('url')
const controller = require('./controller')
const path = require('path')
const fs = require('fs')
const events = require('events')

const myEmitter = new events.EventEmitter();


module.exports = http.createServer((req, res)=>{
    const urlPath = url.parse(req.url).pathname
    if (req.url == urlPath && req.method == 'GET')
    {
        controller.readNote(req, res) 
    }
    else if (req.url == urlPath && req.method == 'POST')
    {
        controller.addNote(req, res)
    }
    else if (req.url == urlPath && req.method == 'PUT')
    {
        controller.editNote(req, res)
    }
    else if (req.url == urlPath && req.method == 'DELETE')
    {
        controller.deleteNote(req, res)
    }

    else {
        controller.errorInfo(req, res)
    }

})


