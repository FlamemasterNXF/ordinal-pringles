/*const OFFLINE = {
    boost(){ return data.offline.time+1 },
    needed(){ return data.offline.time > 0 },
    updateHTML(){
        DOM('loadingLayer').style.display = this.needed()?'':'none'
        DOM('gameLayer').style.display = !this.needed()?'':'none'
        DOM('offlineText').innerText = `Offline Time: ${format(data.offline.time)}s\nSimulating time at ${format(this.boost())}x speed`
    }
}
 */