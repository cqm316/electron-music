exports.$ = (id) =>{
    return document.getElementById(id)
}

exports.converDuration = (time) => {
    //计算分钟 单数返回‘01’，多位数‘010’
    const minutes = "0" + Math.floor(time / 60)
    //计算秒数 单数返回‘02’，多位数‘020’
    const second = "0" + Math.floor(time - minutes * 60)
    console.log(minutes,second)
    return minutes.substr(-2) + ":" + second.substr(-2)
}
