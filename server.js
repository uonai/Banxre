const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('dbCompiled.json')
const port = process.env.PORT || 3000
const middlewares = jsonServer.defaults()
const db = require('./db');
const dbFolder = './api/';
const fs = require('fs');

// database file
file = './dbCompiled.json';

// backups folder
fileBackup = './backups/dbBackup';

 // create a backup of old DB
function CreateBackup(file){
    timestamp = new Date().getTime().toString();
    fileRandom = timestamp;
    fs.renameSync(file, fileBackup + fileRandom + '.json');
};

function CreateFile(){
    fs.writeFile('./dbCompiled.json', '{"opening":[]', function(err) {
        if(err) {
            return console.log(err);
        } 
         console.log("Database created!");
    }); 
};

// join together JSON files to create new DB.JSON
function FileAppend(file){  
    fs.readdir(dbFolder, (err, files) => {
        files.forEach(file => {
            appendFile = './api/' + file;
            apiName = file;
            file = './dbCompiled.json';
            FileFormatter(appendFile);
        })
        setTimeout(SaveFile, 2000);
    });
};

// extract data from files, compile into single JSON file.
function FileFormatter(appendFile){
    fs.readFile(appendFile, 'utf8', function (err, data){
        if (err) throw err;
            var apiName = appendFile;  
            apiName = apiName.slice(6, -5); 
            console.log(apiName + ' JSON file was added to ' + file);
            fs.appendFile(file, ',"' + apiName + '":' + data, function (err) {
                if (err) throw err; 
            });       
    });      
};

// add missing characters
function SaveFile(){  
    fs.appendFile(file, '}', function (err) {
        if (err) throw err;
        console.log('Database functional!');
    });
};
  

// boot server
CreateBackup(file);
CreateFile(file);
FileAppend(file);
server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running')
});