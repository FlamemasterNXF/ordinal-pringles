const TABS = ["markup"]
let diff
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')
}
function tick(diff){
    let timesToLoop = [0, 0]
    timesToLoop[0] = (1000*data.autoLevels[0])
    timesToLoop[1] = (1000*data.autoLevels[1])
    timesToLoop[0] += diff*data.autoLevels[0]*factorBoost()
    timesToLoop[1] += diff*data.autoLevels[1]*factorBoost()

    if (Math.floor(timesToLoop[0]/1000) >= 1) {
        successor(Math.floor(timesToLoop[0]/1000))
        timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
    }
    if (Math.floor(timesToLoop[1]/1000) >= 1) {
        maximize(Math.floor(timesToLoop[1]/1000))
        timesToLoop[1] -= Math.floor(timesToLoop[1]/1000)*1000
    }
}
function mainLoop() {
    if(isNaN(data.offline.time)) data.offline.time = 0
    diff = data.offline.toggled ? (Date.now() - data.time) / 1000 : getRandom(0.048, 0.053)
    data.offline.time = Math.max(data.offline.time - OFFLINE.boost() * diff, 0)
    data.time += diff * OFFLINE.boost
    data.time = Date.now()

    tick(diff)
    uHTML.update()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "s") successor()
    if (key === "m") maximize()
}, false);

window.setInterval(function () {
    mainLoop()
}, 50);
window.onload = function () {
    try { load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    loadTabs()
}