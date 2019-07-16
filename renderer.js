const { ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded',()=>{
    //ipcRenderer.send(事件的名称，发送事件的信息)
    ipcRenderer.send('message', 'hello from renderer')
    ipcRenderer.on('reply',(event,arg)=>{
        document.getElementById('message').innerHTML = arg
    })
})
