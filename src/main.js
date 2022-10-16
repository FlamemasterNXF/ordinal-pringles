const TABS = ["markup", "boost", "ach", "settings"]
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')

    initAchs()
    initBUPs()
}
function loadUnlockedHTML(){
    DOM('boostNav').style.display = data.boost.times>0?'block':'none'
    DOM('factorBoostButton').style.display = data.boost.times>0?'inline-block':'none'
}

let timesToLoop = [0,0, 0,0]
function tick(diff){
    if(!data.ord.isPsi && data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = 4
    }

    //region automation
    for (let i = 0; i < 2; i++) timesToLoop[i] += diff*data.autoLevels[i]*factorBoost()*bup5Effect()*data.dy.level
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]]?1*bup5Effect():0

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){
            i===0?successor(timesToLoop[i]/1000):maximize()
            timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
        }
    }

    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3)) buyMaxAuto()
    if(timesToLoop[3]>=1 && data.ord.isPsi) markup(timesToLoop[3]*diff)
    //endregion
}
function mainLoop() {
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = Math.max((Date.now() - data.lastTick), 0)
    let uDiff = diff/1000

    if(data.dy.gain > 0 && data.dy.level < data.dy.cap) data.dy.level += uDiff*dyGain()
    if(data.boost.hasBUP[9]) data.markup.powers += 20*uDiff

    tick(diff)
    data.lastTick = Date.now()

    checkAchs()
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
    loadUnlockedHTML()
}