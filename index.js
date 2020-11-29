const fs = require('fs');

//edit this array with filenames to be ignored (unimportant logs)
const ignoredFiles = ['PlanetSide2.log', 'H1Z1 PlayClient (Live)Startup.log', 'GameCore.log', 'LoadedAssets.log', 'SyncLoadedAssets.log', 'Preload.log', 'DirectAssets.log'];
//edit this array with values you want to search for
const logSearches = [];

//returns a list of directories in a specified path
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}


console.log(getDirectories('logs'));
const logFolders = getDirectories('logs');
let logFiles = [];

//dumps the contents of every log file found to logFiles
for(let i = 0; i < logFolders.length; i++) {
    const logs = fs.readdirSync(`./logs/${logFolders[i]}`);
    for(let file of logs) {
        if(!ignoredFiles.includes(file)) {
            console.log(`./logs/${logFolders[i]}/${file}`)
            logFiles.push(fs.readFileSync(`./logs/${logFolders[i]}/${file}`, 'utf8'))
        }
    }
}

//searches logFiles for each value specified in logSearches
for(let i = 0; i < logFiles.length; i++) {
    for(let j = 0; j < logSearches.length; j++) {
        if(logFiles[i].toLowerCase().includes(logSearches[j])) {
            console.log(logFiles[i])
        }
    }
}

console.log(logFiles.length)