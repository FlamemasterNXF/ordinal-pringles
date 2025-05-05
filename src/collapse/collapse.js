function updateCollapseHeaderHTML(){
    if(getSubtab('collapse') === 'cUpgrades' && hasSluggishMilestone(2)){
        DOM(`cardinalsText`).innerHTML = `You have ${format(data.collapse.cardinals)} Cardinals <span style="color: ${getCSSVariable('collapse-text-negative-charge-color')}">and ${format(data.darkness.negativeCharge)} Negative Charge</span><br><span style="font-size: 0.8rem; color: ${getCSSVariable('collapse-text-best-cardinals-color')}">Your best Collapse yielded ${format(data.collapse.bestCardinalsGained)} Cardinals</span>`
    }
    else if(getSubtab('collapse') === 'darkness'){
        const negativeChargeType = hasHypercharge(2) ? 'multiplying' : 'dividing'
        let text = `You have ${format(data.collapse.cardinals)} Cardinals<span style="color: ${getCSSVariable('collapse-text-negative-charge-color')}">, ${format(data.chal.decrementy)} Decrementy, and ${format(data.darkness.negativeCharge)} Negative Charge [+${format(negativeChargeGain())}/s]</span><br><span style="font-size: 0.9rem; color: ${getCSSVariable('negative-charge-text-color')}">Your Negative Charge is ${negativeChargeType} Incrementy gain by ${format(negativeChargeEffect(false))}`
        text += hasHypercharge(2) ? '</span>' : ` and Incrementy\'s effect by ${format(negativeChargeEffect(true))}</span>`
        DOM(`cardinalsText`).innerHTML = text
    }
    else if(getSubtab('collapse') === 'hyper'){
        DOM('cardinalsText').innerHTML = `<span style="color: ${getCSSVariable('hypercharge-charge-text-color')}">You have ${formatWhole(data.incrementy.charge)} Charge</span>${data.obliterate.times > 0 ? `<span style="color: ${getCSSVariable('hypercharge-energy-text-color')}">, ${data.stability.energy[0]} Stable Energy, and ${data.stability.energy[2]} Unbounded Energy</span>` : ''}<br><span style="font-size: 0.9rem; color: ${getCSSVariable('normal-hypercharge-text-color')}">You have ${getStableHypercharges()} Stable Hypercharges, <span style="color: ${getCSSVariable('stable-hypercharge-text-color')}">raising Incrementy gain to the ${format(getStableHyperchargeEffect())}</span></span>`
    }
    else if(getSubtab('collapse') === 'baseless'){
        DOM(`cardinalsText`).innerHTML = `<span style="color: ${getCSSVariable('aleph-null-text-primary-color')}; font-size: 1rem;">You have <span style="color: ${getCSSVariable('aleph-null-text-amount-color')}">${format(data.baseless.alephNull)} ℵ<sub>0</sub></span>${makeAlephNullEffectText()}<span style="font-size: 0.9rem; font-family: DosisLight, sans-serif">${makeRealmEnhancementText()}</span></span>`
    }
    else{
        DOM(`cardinalsText`).innerHTML = `You have ${format(data.collapse.cardinals)} Cardinals<br><span style="font-size: 0.8rem; color: ${getCSSVariable('collapse-text-best-cardinals-color')}">Your best Collapse yielded ${format(data.collapse.bestCardinalsGained)} Cardinals</span>`
    }
}
function updateCollapseHTML(){
    DOM(getAdaptiveButton(`collapseButton`)).innerText = `Collapse for ${format(cardinalGain())} Cardinals (C)`

    for (let i = 0; i < data.collapse.hasCUP.length-1; i++) {
        if(hasCUP(i)) updateCUPTextHTML(i)
    }
    if(hasCUP(7)) DOM(`cup7`).innerText = `${cupData[7].text}\n\nCurrently: ${format(cupData[7].effect())}%`

    DOM(getAdaptiveButton("collapseButton")).style.display = data.boost.times > 33 || data.collapse.times > 0 || data.obliterate.times > 0 ? 'block' : 'none'
    DOM(getAdaptiveButton("collapseButton")).style.color = data.ord.isPsi && data.ord.ordinal.gte(BHO_VALUE) || data.boost.times > 33 ? getCSSVariable('collapse-button-available-text-color') : getCSSVariable('collapse-button-default-text-color')

    if(data.baseless.baseless) DOM(`baseless`).children[2].innerHTML = `<br><br>You will gain <span style="color: ${getCSSVariable('baseless-realm-gain-text-color')}">${format(getAlephNullGain())} ℵ<sub>0</sub></span> if you exit now<br><span style="font-size: 0.9rem">Your <span style="color: ${getCSSVariable('baseless-realm-gain-text-color')}">ℵ<sub>0</sub></span> gain multipier is currently ${format(getBaselessMult(data.baseless.mode)*dynamicShiftMultipliers[0]())}</span>`

    updateTotalAlephHTML()
    updateDarknessHTML()
    updatePurificationTabHTML()
    if(data.nav.subtabs.collapse === 'hyper') updateAllHyperchargeHTML()
    if(isBaseless()) updateRealmBoostersHTML()
    updateCollapseHeaderHTML()
}

function updateCUPTextHTML(i){
    DOM(`cup${i}`).innerText = hasCUP(i)
        ? `${cupData[i].text}\n\nCurrently: ${i===1?'^':''}${i===1 ? format(cupData[i].effect()+drainEffect(i)) : format(cupData[i].effect()*drainEffect(i))}${i!==1?'x':''}`
        : `${cupData[i].text}\n\n${format(cupData[i].cost)} Cardinals`

}
function updateAllCUPTextHTML(){
    for (let i = 0; i < data.collapse.hasCUP.length; i++) {
        updateCUPTextHTML(i)
    }
}
function initAlephs(){
    const container = DOM('alephContainer')
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        let el = document.createElement('t')
        el.className = 'alephText'
        el.id = `aleph${i}`
        el.innerHTML = `You have <span style='color: ${getCSSVariable('aleph-text-amount-color')}'><b>${format(getAlephAmount(i))} ℵ<sub>${i+1}</sub></b></span>, ${alephData[i].text} <span style='color: ${getCSSVariable('aleph-text-effect-color')}'><b>${format(getAlephEffect(i))}x</b></span>`
        container.append(el)
    }
}
function initCUPS(){
    const container = DOM('cUpgradesSubPage')
    for (let i = 0; i < data.collapse.hasCUP.length/4; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow row'
        row.id = `cupRow${i}`
        container.append(row)
        for (let j = 0; j < 4; j++) {
            let id = j+(i*4)
            let innerContainer = document.createElement('div')
            innerContainer.className = id < 7 ? 'cupContainer' : 'flexBox'
            innerContainer.id = `cupContainer${id}`


            let el = document.createElement('button')
            el.className = 'cup'
            el.id = `cup${id}`
            el.innerText = `${cupData[id].text}\n\n${format(cupData[id].cost)} Cardinals`
            el.addEventListener("click", ()=>buyCardinalUpgrade(id))
            innerContainer.append(el)

            if(id !== 7){
                let drain = document.createElement('button')
                drain.className = 'drain'
                drain.id = `drain${id}`
                drain.innerHTML = `Drain this Cardinal Upgrade ${makeDrainLevelText(id)}<br>${format(drainCost(id))} Negative Charge`
                drain.addEventListener("click", ()=>buyDrain(id))
                innerContainer.append(drain)
            }
            else{
                let el = document.createElement('button')
                el.id = `drainReset`
                el.innerText = `Respec Drains`
                el.addEventListener('click', ()=>respecDrains())
                innerContainer.append(el)
            }


            id !== 7 ? row.append(innerContainer) : container.append(innerContainer)
        }
    }
    checkAllUnlocks(0, true)
}
function initSluggish(){
    const container = DOM('sluggishContainer')
    for (let i = 0; i < data.collapse.hasSluggish.length; i++) {
        let el = document.createElement('button')
        el.className = 'sluggish'
        el.id = `sluggish${i}`
        el.innerText = `${sluggishData[i].req} Factor Boosts\n\n${sluggishData[i].text}`
        container.append(el)
    }
    checkAllUnlocks(1, true)
}

function updateAlephHTML(i){
    DOM(`aleph${i}`).innerHTML = `You have <span style='color: ${getCSSVariable('aleph-text-amount-color')}'><b>${format(getAlephAmount(i))} ℵ<sub>${i+1}</sub></b></span>, ${alephData[i].text} <span style='color: ${getCSSVariable('aleph-text-effect-color')}'><b>${format(getAlephEffect(i))}x</b></span>`
}
function updateAllAlephHTML(){
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        updateAlephHTML(i)
    }
}
function updateTotalAlephHTML(){
    DOM(`alephTotal`).innerHTML = `You have <span style='color: ${getCSSVariable('aleph-total-text-amount-color')}'><b>${format(getTotalAlephs())} Total ℵ</b></span>, multiplying Cardinal gain by <span style='color: ${getCSSVariable('aleph-total-text-effect-color')}'><b>${format(alephTotalEffect())}x</b></span>`
    DOM(`omega2Text`).innerHTML = ordinalDisplay("", BHO_VALUE, 0, 3, data.ord.trim, true, true)
}
function updateUnlockHTML(mode, i){
    switch (mode) {
        case 0:
            DOM(`cup${i}`).className = hasCUP(i) ? 'boughtCUP' : 'cup'
            if(i === 5) DOM(`bp5Container`).style.display = hasCUP(5) ? 'block' : 'none'
            break;
        case 1:
            DOM(`sluggish${i}`).className = hasSluggishMilestone(i) ? 'completeSluggish' : 'sluggish'
            if(i === 1) DOM('darkTab').innerText = hasSluggishMilestone(2) ? 'Darkness' : '???'
            break;
        default:
            console.error("Invalid \"mode\" at \"updateUnlockHTML\"");
    }
}

function hasCUP(i){
    if(data.collapse.hasCUP[i]) return true

    if(i < 2) return hasPassiveUpgrade(5)
    if(i < 4) return hasPassiveUpgrade(6)
    if(i < 6) return hasPassiveUpgrade(7)
    if(i === 6) return hasPassiveUpgrade(8)
    if(i === 7) return hasPassiveUpgrade(9)
}
let hasSluggishMilestone = (i) => data.collapse.hasSluggish[i] || hasPassiveUpgrade(i)

function checkUnlocks(mode, i, preview = false){
    if (preview) return updateUnlockHTML(mode, i)
    switch (mode) {
        case 0:
            data.collapse.hasCUP[i] = true
            updateUnlockHTML(0, i)
            break;
        case 1:
            if(data.boost.times <= sluggishData[i].req && !hasSluggishMilestone(i)){
                data.collapse.hasSluggish[i] = true
                data.collapse.cardinals = data.collapse.cardinals.plus(3*i)
                showNotification(`You have completed a Sluggish Milestone${data.collapse.times > 1 ? `and your completion has been rewarded with ${3*i} free Cardinals!` : '!'}`)
                updateUnlockHTML(1, i)
            }
            break;
        default:
            console.error("Invalid \"mode\" at \"checkUnlocks\"");
    }
}
function checkAllUnlocks(mode, prev = false){
    switch (mode) {
        case 0:
            for (let i = 0; i < data.collapse.hasCUP.length; i++) checkUnlocks(0, i, prev)
            break;
        case 1:
            for (let i = 0; i < data.collapse.hasSluggish.length; i++) checkUnlocks(1, i, prev)
            break;
        default:
            console.error("Invalid \"mode\" at \"checkAllUnlocks\"");
    }
}
function checkCollapseUnlockHTML(){
    DOM('darkTab').innerText = hasSluggishMilestone(2) ? 'Darkness' : '???'
    DOM('hyperTab').innerText = data.boost.unlocks[4] ? 'Hypercharge' : '???'
    DOM('baselessTab').innerText = data.boost.unlocks[4] ? 'Baselessness' : '???'
    DOM('purificationTab').innerText = isTabUnlocked('purification') ? 'Purification' : '???'
}

function cardinalGain(){
    if(data.boost.times < 34) return D(0)
    let gain = Decimal.sqrt(data.boost.times-34)
            .times(Decimal.log2((data.boost.times-34)+2)).times(Decimal.sqrt(data.boost.times-34)).plus(3)
            .times(alephTotalEffect()).times(iup12Effect()).times(getAOMEffect(4)).times(getPringleEffect(2))
            .times(getStableEnergyEffect(1, 0)).times(getHyperchargeEffect(0)).times(getRealmChallengeEffect(2))
    return gain.pow(getEUPEffect(1, 5))
}

let getAlephAmount = (i) => data.collapse.alephs[i].plus(getAlephNullEffect(0))

function getAlephEffect(i){
    if(getAlephAmount(i).eq(0) || (inPurification(1) && i !== 0) || !alephData[i].unl()) return D(1)
    return alephData[i].effect().times(getCUPEffect(6, false)).times(getRealmChallengeEffect(0))
        .times(getAlephNullEffect(1))
}

function getCUPEffect(i, number = true){
    if(number) return getCUPEffect(i, false).toNumber()

    if(!hasCUP(i)) return D(1)
    if(i === 1) return Decimal.max(D(cupData[i].effect()).plus(drain1Effect()), 1)
    return Decimal.max(D(cupData[i].effect()).times(drainEffect(i)), 1)
}
/*
let getCUPEffect = (i) => hasCUP(i) ?
    i===1 ? Math.min(Math.max(cupData[i].effect()+drain1Effect(), 1), Number.MAX_VALUE)
    : Math.min(Math.max(cupData[i].effect()*drainEffect(i), 1), Number.MAX_VALUE)
    : 1
 */

let drain1Effect = () =>
    getDrainLevel(1) > 50 ? ((getDrainLevel(1)-50)/128)+2.5+(1.25*2)+0.625+0.3125+0.15625
    : getDrainLevel(1) > 40 ? ((getDrainLevel(1)-40)/64)+2.5+(1.25*2)+0.625+0.3125
    : getDrainLevel(1) > 30 ? ((getDrainLevel(1)-30)/32)+2.5+(1.25*2)+0.625
    : getDrainLevel(1) > 20 ? ((getDrainLevel(1)-20)/16)+2.5+(1.25*2)
    : getDrainLevel(1) > 10 ? ((getDrainLevel(1)-10)/8)+2.5+1.25
    : getDrainLevel(1) > 5 ? ((getDrainLevel(1)-5)/4)+2.5 : getDrainLevel(1)/2

function getTotalAlephs(){
    let total = D(0)
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        total = total.plus(getAlephAmount(i))
    }
    return total
}
let alephTotalEffect = () => Decimal.max(1, Decimal.sqrt(getTotalAlephs())).times(getHyperchargeEffect(8)).times(getHyperchargeEffect(1))

let alephData = [
    {text: "multiplying Autoclickers by", effect: ()=> Decimal.sqrt(getAlephAmount(0).plus(1)).times(3).times(purificationEffect(1)), unl: () => true},
    {text: "multiplying Autobuyers by", effect: ()=> Decimal.log10(D(10).plus((getAlephAmount(1).times(90)))).times(purificationEffect(1)), unl: () => true},
    {text: "multiplying Ordinal Power gain by", effect: ()=> Decimal.log2(getAlephAmount(2).plus(2)).times(3), unl: () => true},
    {text: "multiplying Incrementy gain by", effect: ()=> Decimal.pow(getAlephAmount(3).plus(1), 1/4), unl: () => true},
    {text: "multiplying Dynamic Cap by", effect: ()=> ((Decimal.sqrt(getAlephAmount(4).plus(1)).times(2)).plus(hupData[9].effect())).times(getAOMEffect(1)), unl: () => true},
    {text: "multiplying the SGH effect by", effect: ()=> Decimal.pow(getAlephAmount(5).plus(1), 1/4), unl: () => true},
    {text: "multiplying Booster Power gain by", effect: ()=> Decimal.sqrt(getAlephAmount(6).plus(4)).div(2), unl: () => true},
    {text: "multiplying the IUP3 effect by", effect: ()=> (Decimal.sqrt(getAlephAmount(7).plus(4)).times(2).times(purificationEffect(1))).plus(hupData[9].effect()), unl: () => true},
    {text: "multiplying Dynamic Gain by", effect: ()=> Decimal.log2(getAlephAmount(8)), unl: () => hasAOMilestone(1)},
]
let cupData = [
    {text: "Total Charge Boosts AutoBuyers", cost: 9, effect: ()=> Math.max((data.incrementy.totalCharge/2)*purificationEffect(3)*getPringleEffect(0, true), 1)},
    {text: "Square AutoClicker speeds", cost: 27, effect: ()=> 2+getPringleEffect(1, true)},
    {text: "Challenge Completions multiply AutoBuyer speed", cost: 81, effect: ()=> 1+getTotalChallengeCompletions()},
    {text: "Ordinal Powers boost AutoBuyers and AutoClickers", cost: 243, effect: ()=> Math.max(1, Decimal.log10(data.markup.powers.plus(1)).div(10).toNumber())},
    {text: "Incrementy boosts its own gain", cost: 2187, effect: ()=> Math.min(Decimal.max(1, Decimal.log10(data.incrementy.amt.plus(1))).mul(purificationEffect(3)).mul(getPringleEffect(0)).toNumber(), Number.MAX_VALUE)}, //TODO: Add a safety function
    {text: "Unlock a 3rd Overcharge Effect and boost Overcharge's 1st Effect", cost: 196608, effect: ()=> 3*getPringleEffect(0, true)},
    {text: "Unspent Cardinals boost Alephs", cost: 3e9, effect: ()=> Decimal.max(1, Decimal.log2(data.collapse.cardinals).times(getAOMEffect(3)).times(getPringleEffect(2)))},
    {text: "Gain a percent of best Cardinals gained on Collapse every second", cost: 1e13, effect: ()=> getAOREffect(7)},
]
let sluggishData = [
    {text: "Uncap the Ordinal, you can pass Graham's Number without Boosting, gain 1% of Ordinal Powers gained on Markup every second, and you always have one free Maximize and Successor AutoClicker", req: 34},
    {text: "Keep Challenges and Incrementy unlocked through Collapse", req: 29},
    {text: "Unlock an AutoBuyer for Charge, an AutoBuyer for RUP1-3, and Unlock Darkness", req: 24},
    {text: "Unlock an AutoBuyer for Repeatable Hierarchy Upgrades, AutoPrestigers for Factor Shift and Factor Boost, keep UP1-6 and Darkness Upgrades on Collapse, and unlock a new row of Booster Upgrades", req: 12},
    {text: "Unlock 4 new Hierarchy Upgrades, keep Hierarchies unlocked through Collapse, and keep Challenge completions on Collapse", req: 2},
]

let collapseConfirm = (auto = false) =>
    getSimpleSetting('collapseConfirmation')
    ? createConfirmation('Are you certain?', `Collapsing will reset everything prior and Darkness!`, 'No Way!', 'Go Ahead!', collapse)
    : collapse(false, auto)

function collapse(first = false, auto = false){
    if(data.baseless.baseless) return
    if (first){
        data.collapse.cardinals = D(3)
        data.collapse.bestCardinalsGained = D(3)
        ++data.collapse.times
        ++data.boost.times
        DOM('collapseNav').style.display = 'block'
        checkUnlocks(1, 0)
        collapseReset()
        boosterUnlock()
        makeExcessOrdMarks()
        return createAlert("You have Collapsed!", "Congratulations! You can now Factor Boost beyond FB34! Cardinals are gained based on how many FBs you have before Collapse.", "Got it!")
    }
    if ((data.ord.ordinal.gte(BHO_VALUE) && data.ord.isPsi) || data.boost.times > 33){
        if(cardinalGain().gt(data.collapse.bestCardinalsGained)) data.collapse.bestCardinalsGained = cardinalGain()
        data.collapse.cardinals = data.collapse.cardinals.plus(cardinalGain())
        ++data.collapse.times
        checkAllUnlocks(1)
        boosterUnlock()
        checkCollapseUnlockHTML()
        return collapseReset()
    }
    if (!auto) showNotification("Insufficent Ordinal")
}
function boostersOnCollapse(){
    let sing = hasPassiveHypercharge(0) ? 2 : 0
    return 0+sing
}
function collapseReset(){
    for (let i = 0; i < data.hierarchies.ords.length; i++) {
        data.hierarchies.ords[i].ord = D(1)
        data.hierarchies.ords[i].over = D(0)
    }
    data.hierarchies.rebuyableAmt = Array(6).fill(0)
    data.hierarchies.hasUpgrade = Array(10).fill(false)
    updateHierarchiesHTML()
    updateHierarchyPurchaseHTML()

    boosterRefund()

    data.boost.amt = boostersOnCollapse()
    data.boost.total = boostersOnCollapse()
    data.boost.times = 0
    data.boost.hasBUP = Array(15).fill(false)
    data.boost.isCharged = Array(15).fill(false)
    data.boost.unlocks = Array(4).fill(false).concat(data.boost.unlocks[4])
    boosterUnlock()

    DOM(getAdaptiveButton('factorBoostButton')).style.display = 'inline-block'

    data.chal.decrementy = D(1)
    data.chal.html = -1
    if(!hasSluggishMilestone(4)) data.chal.completions = Array(8).fill(0)
    data.chal.active = Array(8).fill(false)
    if(!hasSluggishMilestone(4)) data.chal.totalCompletions = 0
    updateAllChalHTML()

    data.incrementy.amt = D(0)
    if(hasSluggishMilestone(3)){
        data.incrementy.hasIUP[0] = false
        data.incrementy.hasIUP[1] = false
        data.incrementy.hasIUP[2] = false
    }
    else { data.incrementy.hasIUP = Array(12).fill(false) }

    data.incrementy.rebuyableAmt = Array(6).fill(0)
    data.incrementy.charge = data.boost.unlocks[4] ? data.incrementy.totalCharge-getTotalChargeInHypercharge() : 0
    data.incrementy.totalCharge = data.boost.unlocks[4] ? data.incrementy.totalCharge : 0
    updateIncrementyHTML()
    if(!hasSluggishMilestone(3)) {
        for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
            DOM(`iup${i}`).className = 'iup'
        }
    }

    resetDarkness()

    data.overflow.bp = 1
    data.overflow.oc = 1
}

function collapseCardinals(){
    if (data.collapse.cardinals.eq(0)) return showNotification("No Cardinals to Collapse")
    if(data.collapse.times === 1 && data.obliterate.times === 0){
        for (let i = 0; i < 3; i++) {
            data.collapse.alephs[i] = D(1)
            updateAlephHTML(i)
        }
        data.collapse.cardinals = data.collapse.cardinals.sub(3)
        updateTotalAlephHTML()
        return createAlert("A little help!", "Since this your first Collapse, you have been given exactly one of the first three Alephs because they are the most helpful! From now on Aleph gain will be random.", "Thanks!")
    }

    let usedCardinals = Decimal.floor(data.collapse.cardinals)
    if (usedCardinals.gte(1000)) usedCardinals = Decimal.floor(usedCardinals.div(8)).times(8)
    data.collapse.cardinals = data.collapse.cardinals.sub(usedCardinals)

    if(usedCardinals.lt(1000)){
        while (usedCardinals.gt(0)){
            const aleph = getRandom(0,8)
            data.collapse.alephs[aleph] = data.collapse.alephs[aleph].plus(1)
            updateAlephHTML(aleph)

            usedCardinals = usedCardinals.sub(1)
        }
    }
    else{
        let nUnlock = 0
        for (let i = 0; i < data.collapse.alephs.length; i++) {
            if (alephData[i].unl()) nUnlock++
        }
        for (let i = 0; i < data.collapse.alephs.length; i++) {
            if (alephData[i].unl()) data.collapse.alephs[i] = data.collapse.alephs[i].plus(Decimal.floor(usedCardinals.div(nUnlock)))
            updateAlephHTML(i)
        }
    }
    updateTotalAlephHTML()
}

function buyCardinalUpgrade(i){
    if(data.collapse.cardinals.gte(cupData[i].cost) && !hasCUP(i)){
        data.collapse.cardinals = data.collapse.cardinals.sub(cupData[i].cost)
        checkUnlocks(0, i)
    }
}

