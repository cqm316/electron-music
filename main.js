const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const DataStore = require('./renderer/MusicDataStore.js')

const myStore = new DataStore({'name': 'Music Data'})

class AppWindow extends BrowserWindow {
    constructor(config, fileLocation){
        const basicConfig ={
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        }
        const finalConfig = {...basicConfig,...config}
        super(finalConfig)
        this.loadFile(fileLocation)
        this.once('ready-to-show',()=>{
            this.show();
        })
    }
}


app.on('ready',()=>{
    const mainWindow = new AppWindow({},'./renderer/index.html')
    mainWindow.webContents.on('did-finish-load',() =>{
        mainWindow.send('getTracks', myStore.getTracks())
    })
    ipcMain.on('add-music-window',() =>{
        const addWindow = new AppWindow({
            width: 500,
            height: 400,
            parent: mainWindow
        },'./renderer/add.html')
    })

    ipcMain.on('add-tracks',(event, tracks) =>{
        const updatedTracks = myStore.addTrack(tracks).getTracks()
        mainWindow.send('getTracks',updatedTracks)
    })

    ipcMain.on('delete-track',(event, id) =>{
        const updatedTracks = myStore.deleteTrack(id).getTracks()
        mainWindow.send('getTracks',updatedTracks)
    })

    ipcMain.on('open-music-file',(event) =>{
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Music', extensions: ['mp3'] }]
        },(files) => {
            if (files) {
                event.sender.send('selected-file', files)
            }
        })
    })


    // const mainWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // })
    // mainWindow.loadFile('./renderer/index.html')
    // ipcMain.on('add-music-window',() =>{
    //     const addWindow = new BrowserWindow({
    //         width: 500,
    //         height: 400,
    //         webPreferences: {
    //             nodeIntegration: true
    //         },
    //         parent: mainWindow
    //     })
    //     addWindow.loadFile('./renderer/add.html')
    // })
})
