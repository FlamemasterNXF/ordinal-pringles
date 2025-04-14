const chalDesc = [
    "You can only buy 1 of each AutoClicker", "You can't buy Factors",
    "The Base is 5 higher", "Factor Shifts don't reduce the base", "Dynamic divides AutoClicker speed, and each Booster Upgrade bought and completion of this Challenge multiplies Dynamic Gain and Cap by 5",
    "All previous Challenges at once EXCEPT Challenge 5", "You gain no Dynamic, Booster Upgrades increase Factor Shift requirements, Booster Upgrade 1x3 is disabled, and you can only manually click Successor 1000 times per Markup",
    "You exponentially gain Decrementy that divides AutoClicker Speed (resets on Markup), keep no OP on Markup, and you're trapped in Challenge 7"
]
const chalGoals = [
    [1e32, 1e223, 4e256, Infinity], //4e256 works as a stand in for Epsilon Naught here
    [4, 6377292, 125524238436, Infinity], //this one is in Ordinal value, [1] and [2] are post-Epsilon-Naught
    [1e200, 1e214, 1e256, Infinity],
    [1e32, 5e113, 1.5e119, Infinity],
    [4e256, 4e256, 4e256, Infinity], //4e256 works as a stand in for Epsilon Naught here
    [1.02e33, 1e44, 4.75e108, Infinity],
    [1.05e13, 4.18e18, 1.02e20, Infinity],
    [3.0e10, 6.0e10, 2.4e11, Infinity],
]

function initChals(){
    const rows = [DOM('chalRow0'), DOM('chalRow1'), DOM('chalRow2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < chalDesc.length/3; n++) {
            if(total === 8) break
            let chal = document.createElement('button')
            chal.className = 'challenge'
            chal.id = `chal${total}`
            chal.innerText = `Loading...`
            rows[i].append(chal)
            ++total
        }
    }
    for (let i = 0; i < data.chal.completions.length; i++) {
        DOM(`chal${i}`).addEventListener('click', ()=> getSimpleSetting('challengeConfirmation') ?
            createConfirmation("Are you sure?", "Entering a Challenge will perform a Booster Reset!", "No chance.", "Of course!", chalEnter, i)
        :chalEnter(i))
        updateChalHTML(i)
    }
    updateStatusHTML()
}
function updateAllChalHTML(){
    for (let i = 0; i < data.chal.active.length; i++) {
        updateChalHTML(i)
    }
}
function updateChalHTML(i){
    DOM(`chal${i}`).style.backgroundColor = data.chal.active[i]?'#002480':data.chal.completions[i]===3?'#83620b':'black'
    DOM(`chal${i}`).style.borderColor = data.chal.completions[i] === 3 ? '#5e4608' : '#1e47d0'
    DOM(`chal${i}`).style.color = (data.chal.completions[i] !== 3 || data.chal.active[i]) ? '#8080FF' : 'black'
    DOM(`chal${i}`).innerHTML = `Challenge ${i+1}<br>${chalDesc[i]}<br><br>Goal: ${format(chalGoals[i][data.chal.completions[i]])} OP<br>Reward: Factor ${i+1} slightly boosts Tier 2 Automation<br>Completions: ${data.chal.completions[i]}/3`
    DOM(`chal1`).innerHTML = `Challenge 2<br>${chalDesc[1]}<br><br>Goal: ${data.chal.completions[1] === 3 ? 'Infinity' : ordinalDisplay('', chalGoals[1][data.chal.completions[1]], 0, 3, data.ord.trim, true, true)}<br>Reward: Factor 2 slightly boosts Tier 2 Automation<br>Completions: ${data.chal.completions[1]}/3`
    DOM(`chal7`).innerHTML = `Challenge 8<br>${chalDesc[7]}<br><br>Goal: ${format(chalGoals[7][data.chal.completions[7]])} OP<br>Reward: Dynamic Factor slightly boosts Tier 2 Automation<br>Completions: ${data.chal.completions[7]}/3`
}
function chalEnter(i, force=false){
    if(data.baseless.baseless) return;
    if((data.chal.completions[i] === 3 || data.chal.active.includes(true)) && !force) return

    if(i === 5) for (let j = 0; j < data.chal.active.length-4; j++) data.chal.active[j] = true
    if(i === 7) data.chal.active[6] = true
    data.chal.active[i] = true

    boosterReset()
    if(i === 2 || i === 5) data.ord.base = 15
    //if(data.boost.hasBUP[2]) data.ord.base = 5
    if(i === 4){
        data.dy.gain = D(0.002)
        //DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    }
    if((i === 4 || i === 6 || i === 7) && getSimpleSetting('challengeRefund')){
        showNotification(`Your Booster Upgrades have been refunded to help with the Challenge. Feel free to rebuy them, but remember the debuff!`)
        boosterRefund(true)
    }

    for (let j = 0; j < data.chal.active.length; j++) {
        updateChalHTML(j)
    }
    data.chal.html = i
    updateStatusHTML()
}
function chalExit(darkness = false){
    if(data.darkness.darkened && data.chal.active[7] && !darkness) darken(true)
    for (let i = 0; i < data.chal.active.length; i++) {
        data.chal.active[i] = false
        updateChalHTML(i)
    }
    data.chal.html = -1
    boosterReset()
    updateStatusHTML()
}
//TODO: This exists because of how createConfirmation works. Change it.
function chalExitConfirm(){
    if(checkAllIndexes(data.chal.active, true) === 0) return
    createConfirmation("Are you sure?", "Leaving a Challenge early will force a Booster Reset and you will get no rewards!", "No way!", "Of course!", chalExit)
}
function chalComplete(){
    if(data.chal.html === -1 || data.darkness.darkened) return
    const currency = data.chal.html===1?data.ord.ordinal:data.markup.powers
    const ex = data.chal.html===1?data.ord.isPsi:true
    if(currency>=chalGoals[data.chal.html][data.chal.completions[data.chal.html]] && ex){
        ++data.chal.completions[data.chal.html]
        ++data.chal.totalCompletions
        if(getSimpleSetting('challengePopup')) showNotification(`You have Completed Challenge ${data.chal.html+1}x${data.chal.completions[data.chal.html]}!`)
        chalExit()
    }
}

let chalEffect = i => 0.25*data.chal.completions[i]
function chalEffectTotal(){
    let mult = D(0)
    for (let i = 0; i < data.chal.completions.length-1; i++) {
        mult = mult.add(D(factorEffect(i)).mul(chalEffect(i)))
    }
    mult = mult.add(D(data.dy.level).mul(chalEffect(7)))

    let base = D(mult).mul(hupData[0].effect()).mul(getOverflowEffect(0))
    let cup = data.collapse.hasCUP[2] ? D(getCUPEffect(2)) : D(0)
    return Decimal.max(Decimal.pow(base,2).add(cup), 1)
}

function getC5Effect(){
    let boosterUpgradesNum = 0 // Could be replaced with "const boosterUpgradesNum = data.boost.hasBUP.filter(hasUpgrade => hasUpgrade === true).length"
    for (let i = 0; i < data.boost.hasBUP.length; i++) if (data.boost.hasBUP[i]) ++boosterUpgradesNum // This line could be removed if the variable above is replaced
    return boosterUpgradesNum + 1
}
