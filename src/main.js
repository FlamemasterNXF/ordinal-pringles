const TABS = ["markup", "boost", "ach", "settings"]
function loadTabs(){
    for (let i = 0; i < TABS.length; i++) {
        DOM(`${TABS[i]}Page`).style.display = 'none'
    }
    switchTab('ord')
}
function initHTML(){
    initAchs()
    initBUPs()
    initChals()
    initIUPs()
    initHierarchies()
}
function loadUnlockedHTML(){
    DOM('boostNav').style.display = data.boost.times>0?'block':'none'
    DOM('factorBoostButton').style.display = data.boost.times>0?'inline-block':'none'
}
function loadSettingsHTML(){
    const descs = ["Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation", "Factor Boost confirmation", "Charge Refund Confirmation"]
    for (let i = 0; i < data.sToggles.length; i++) {
        DOM(`settingsToggle${i}`).innerText = `Toggle the ${descs[i]} [${boolToReadable(data.sToggles[i])}]`
    }
}

let timesToLoop = [0,0, 0,0]

let t2Auto = () => 1*bup5Effect()*chalEffectTotal()*incrementyMult()*iup6Effect()*bup48Effect()*hupData[3].effect()

function tick(diff){
    if(!data.ord.isPsi && data.ord.ordinal >= PSI_VALUE && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = 4
    }

    //region automation
    for (let i = 0; i < 2; i++) timesToLoop[i] += !data.chal.active[4]?(diff*data.autoLevels[i]*factorBoost()*bup5Effect()*data.dy.level)/data.chal.decrementy
        :(diff*data.autoLevels[i]*factorBoost()*bup5Effect()/data.dy.level)/data.chal.decrementy
    
    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]]?t2Auto():0

    for (let i = 0; i < 2; i++) {
        if(Math.floor(timesToLoop[i]/1000) >= 1){
            i===0?successor(timesToLoop[i]/1000):maximize()
            timesToLoop[i] -= Math.floor(timesToLoop[i]/1000)*1000
        }
    }

    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3) && data.autoStatus.enabled[0]){ 
        if (data.autoLevels[0] == 0 || data.autoLevels[1] == 0){
            buyMaxAuto()
            buyMaxFactor() 
            return
        }
        buyMaxFactor() 
        buyMaxAuto()
    }
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1]) markup(timesToLoop[3]*diff/1000)

    if(data.boost.unlocks[2]) increaseHierarchies(diff)
    //endregion

    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = bup2Effect()
    boosterUnlock()
    chalComplete()
}
function mainLoop() {
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = Math.max((Date.now() - data.lastTick), 0)
    let uDiff = diff/1000

    if(data.dy.gain > 0 && data.dy.level < data.dy.cap) data.dy.level = Math.max(data.dy.cap, data.dy.level+uDiff*dyGain())
    if(data.boost.hasBUP[9]) data.markup.powers += bup9Effect()*uDiff
    if(data.chal.active[7]) data.chal.decrementy += decrementyGain(data.chal.decrementy*50)

    if(data.ord.isPsi && data.boost.unlocks[1]) data.incrementy.amt += uDiff*incrementyGain()

    tick(diff)
    data.lastTick = Date.now()

    checkAchs()
    uHTML.update()
}
document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === "s") successor()
    if (key === "m") maximize()
    if (key === "i") markup()
    if (key === "f"){ buyMaxFactor(); buyMaxAuto() }
}, false);

window.setInterval(function () {
    mainLoop()
}, 50);
window.onload = function () {
    let extra = false
    try { extra = load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }

    loadTabs()
    initHTML()
    loadUnlockedHTML()
    loadSettingsHTML()

    if(extra) fixOldSavesP2()
}