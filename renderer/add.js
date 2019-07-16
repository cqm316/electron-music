const { ipcRenderer } = require('electron')
const { $ } = require('./helper')
const path = require('path')
let musicFilesPath = []

$('select-muisc').addEventListener('click',()=>{
    ipcRenderer.send('open-music-file');
})

$('add-muisc').addEventListener('click',()=>{
    if(musicFilesPath)
        ipcRenderer.send('add-tracks',musicFilesPath);
})

const renderListHtml = (pathes) => {
    const musicList = $('musicList')
    const musicItemsHtml = pathes.reduce((html,music) =>{
        html += `<li class="list-group-item">${path.basename(music)}</li>`
        return html
    },'')
    musicList.innerHTML =  `<ul class="list-group">${musicItemsHtml}</ul>`
}

ipcRenderer.on('selected-file', (event, path) => {
    if(Array.isArray(path)) {
        renderListHtml(path)
        musicFilesPath = path
    }
})
