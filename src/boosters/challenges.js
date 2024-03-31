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
        DOM(`chal${i}`).addEventListener('click', ()=>data.sToggles[1]?
            createConfirmation("Are you sure?", "Entering a Challenge will perform a Booster Reset!", "No chance.", "Of course!", chalEnter, i)
        :chalEnter(i))
        updateChalHTML(i)
    }
    updateHeaderHTML()
}
function updateAllChalHTML(){
    for (let i = 0; i < data.chal.active.length; i++) {
        updateChalHTML(i)
    }
}
function updateChalHTML(i){
    DOM(`chal${i}`).style.backgroundColor = data.chal.active[i]?'#002480':data.chal.completions[i]===3?'rgba(0,175,35,0.7)':'black'
    DOM(`chal${i}`).style.color = (!(data.chal.completions[i]===3)||data.chal.active[i])?'#8080FF':'black'
    DOM(`chal${i}`).innerText = `Challenge ${i+1}\n${chalDesc[i]}\n\nGoal: ${format(chalGoals[i][data.chal.completions[i]])} OP\nReward: Factor ${i+1} slightly boosts Tier 2 Automation\nCompletions: ${data.chal.completions[i]}/3`
    DOM(`chal1`).innerHTML = `Challenge 2<br>${chalDesc[1]}<br><br>Goal: ${data.chal.completions[1] === 3 ? 'Infinity' : ordinalDisplay('', chalGoals[1][data.chal.completions[1]], 0, 3, data.ord.trim, true, true)}<br>Reward: Factor 2 slightly boosts Tier 2 Automation<br>Completions: ${data.chal.completions[1]}/3`
    DOM(`chal7`).innerHTML = `Challenge 8<br>${chalDesc[7]}<br><br>Goal: ${format(chalGoals[7][data.chal.completions[7]])} OP<br>Reward: Dynamic Factor slightly boosts Tier 2 Automation<br>Completions: ${data.chal.completions[7]}/3`
}
function chalEnter(i, force=true){
    if((data.chal.completions[i] === 3 || data.chal.active.includes(true)) && !force) return

    if(i === 5) for (let j = 0; j < data.chal.active.length-4; j++) data.chal.active[j] = true
    if(i === 7) data.chal.active[6] = true
    data.chal.active[i] = true

    boosterReset()
    if(i === 2 || i === 5) data.ord.base = 15
    if(data.boost.hasBUP[2]) data.ord.base = 5
    if(i === 4){
        data.dy.gain = 0.002
        //DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    }
    if((i === 4 || i === 6 || i === 7) && data.sToggles[10]){
        createAlert('Forced Refund', `Your Booster Upgrades have been refunded to help with the Challenge. Feel free to rebuy them, but remember the debuff!`, 'Thanks!')
        boosterRefund(true)
    }

    for (let j = 0; j < data.chal.active.length; j++) {
        updateChalHTML(j)
    }
    data.chal.html = i
    updateHeaderHTML()
}
function chalExit(darkness = false){
    if(data.darkness.darkened && data.chal.active[7] && !darkness) darken(true)
    for (let i = 0; i < data.chal.active.length; i++) {
        data.chal.active[i] = false
        updateChalHTML(i)
    }
    data.chal.html = -1
    boosterReset()
    updateHeaderHTML()
}
//TODO: This exists because of how createConfirmation works. Change it.
function chalExitConfirm(){
    if(checkAllIndexes(data.chal.active, true) === 0) return createAlert(`Oops.`, `You have to be in a Challenge to leave it!`, `Sorry :(`)
    createConfirmation("Are you sure?", "Leaving a Challenge early will force a Booster Reset and you will get no rewards!", "No way!", "Of course!", chalExit)
}
function chalComplete(){
    if(data.chal.html === -1 || data.darkness.darkened) return
    const currency = data.chal.html===1?data.ord.ordinal:data.markup.powers
    const ex = data.chal.html===1?data.ord.isPsi:true
    if(currency>=chalGoals[data.chal.html][data.chal.completions[data.chal.html]] && ex){
        ++data.chal.completions[data.chal.html]
        ++data.chal.totalCompletions
        if(data.sToggles[2]) createAlert("Challenge Complete!", `You have Completed Challenge ${data.chal.html+1}x${data.chal.completions[data.chal.html]}!`, 'Awesome!')
        chalExit()
    }
}

let chalEffect = i => 0.25*data.chal.completions[i]
function chalEffectTotal(){
    let mult = 0
    for (let i = 0; i < data.chal.completions.length-1; i++) {
        mult += (factorEffect(i)*chalEffect(i))
    }
    mult += data.dy.level * chalEffect(7)

    let base = (mult)*hupData[0].effect()*getOverflowEffect(0)
    let cup = data.collapse.hasCUP[2] ? cupEffect(2) : 0
    return Math.min(Math.max(base**2+cup, 1), Number.MAX_VALUE)
}
function decrementyGain() {
    const exponent = 1+hupData[4].effect()+getANREffect(2)-singEffects[1].effect()
    const base = D(0.000666).times((D(data.markup.powers+1)).pow(0.2).times(2).pow(exponent))
    const overflow = data.overflow.thirdEffect ? base.div(getOverflowEffect(2)) : base.times(getOverflowEffect(2))
    return (overflow).pow(20) // 20 times per second
}
