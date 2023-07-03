let collapseTab = "cardinals"
function switchCollapseTab(t){
    if(isTabUnlocked(t)){
        if(t === "autoPrestige") updateAutoPrestigeHTML()
        DOM(`${collapseTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        collapseTab = t
    }
}

function updateCollapseHTML(){
    DOM(`cardinalsText`).innerText = `You have ${format(data.collapse.cardinals)} Cardinals`
    DOM(`collapseButton`).innerText = `Collapse for ${format(cardinalGain())} Cardinals`

    for (let i = 0; i < data.collapse.hasCUP.length; i++) {
        if(data.collapse.hasCUP[i]) DOM(`cup${i}`).innerText = `${cupData[i].text}\n\nCurrently: ${i==1?'^':''}${i===1 ? format(cupData[i].effect()+drainEffect(i)) : format(cupData[i].effect()*drainEffect(i))}${i!==1?'x':''}`
    }

    DOM("collapseButton").style.color = data.ord.isPsi && data.ord.ordinal >= BHO_VALUE ? '#fff480' : '#20da45'

    updateDarknessHTML()
}
function updateAutoPrestigeHTML(){
    for (let i = 0; i < data.collapse.apEnabled.length; i++) {
        DOM(`t3AutoText${i}`).innerHTML = `Your <span style='color: #20da45'>${apData[i].name} AutoPrestiger</span> is clicking the ${apData[i].button} button${apData[i].plural ? 's' : ''} <span style='color: #2da000'>20 times/second</span> ${apData[i].hasReq ? `, but only if ${apData[i].requirement}` : ''}`
        DOM(`t3AutoToggle${i}`).innerText = `${apData[i].name} AutoPrestiger: ${boolToReadable(data.collapse.apEnabled[i], 'EDL')}`
    }
}
function initAlephs(){
    const container = DOM('alephContainer')
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        let el = document.createElement('t')
        el.className = 'alephText'
        el.id = `aleph${i}`
        el.innerHTML = `You have <span style='color:#20da45'><b>${format(data.collapse.alephs[i])} ℵ<sub>${i+1}</sub></b></span>, ${alephData[i].text} <span style='color: #20da45'><b>${format(alephEffect(i))}x</b></span>`
        container.append(el)
    }
}
function initCUPS(){
    const container = DOM('cUpgradesSubPage')
    for (let i = 0; i < data.collapse.hasCUP.length/4; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow'
        row.id = `cupRow${i}`
        container.append(row)
        for (let j = 0; j < 4; j++) {
            let id = j+(i*4)
            let innerContainer = document.createElement('div')
            innerContainer.className = 'cupContainer'
            innerContainer.id = `cupContainer${id}`

            let el = document.createElement('button')
            el.className = 'cup'
            el.id = `cup${id}`
            el.innerText = `${cupData[id].text}\n\n${format(cupData[id].cost)} Cardinals`
            el.addEventListener("click", ()=>buyCardinalUpgrade(id))
            innerContainer.append(el)

            if(id != 7){
                let drain = document.createElement('button')
                drain.className = 'drain'
                drain.id = `drain${id}`
                drain.innerText = `Drain this Cardinal Upgrade (${data.darkness.drains[id]})\n${format(drainCost(id))} Negative Charge`
                drain.addEventListener("click", ()=>buyDrain(id))
                innerContainer.append(drain)
            }


            id != 7 ? row.append(innerContainer) : container.append(innerContainer)
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
    DOM(`aleph${i}`).innerHTML = `You have <span style='color: #20da45'><b>${format(data.collapse.alephs[i])} ℵ<sub>${i+1}</sub></b></span>, ${alephData[i].text} <span style='color: #20da45'><b>${format(alephEffect(i))}x</b></span>`
}
function updateTotalAlephHTML(){
    DOM(`alephTotal`).innerHTML = `You have <span style='color: #20da45'><b>${format(getTotalAlephs())} Total ℵ</b></span>, multiplying Cardinal gain by <span style='color: #20da45'><b>${format(alephTotalEffect())}x</b></span>`
}
function updateUnlockHTML(mode, i){
    switch (mode) {
        case 0:
            DOM(`cup${i}`).style.background = data.collapse.hasCUP[i] ? "#0e3000" : "black"
            if(i == 5) DOM(`bp5Container`).style.display = data.collapse.hasCUP[5] ? 'flex' : 'none'
            break;
        case 1:
            DOM(`sluggish${i}`).style.background = data.collapse.hasSluggish[i] ? "#0e3000" : "black"
            if(i == 1) DOM('darkTab').innerText = data.collapse.hasSluggish[2] ? 'Darkness' : '???'
            break;
        default:
            console.error("Invalid \"mode\" at \"updateUnlockHTML\"");
    }
}
function checkUnlocks(mode, i, preview = false){
    if (preview) return updateUnlockHTML(mode, i)
    switch (mode) {
        case 0:
            data.collapse.hasCUP[i] = true
            updateUnlockHTML(0, i)
            break;
        case 1:
            if(data.boost.times <= sluggishData[i].req && !data.collapse.hasSluggish[i]){
                data.collapse.hasSluggish[i] = true
                data.collapse.cardinals += 3*i
                createAlert("Congratulations!", `You have completed a Sluggish Milestone!\nYour completion has been rewarded with ${3*i} free Cardinals!`, 'Great!')
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
    DOM('darkTab').innerText = data.collapse.hasSluggish[2] ? 'Darkness' : '???'
    DOM('autoPrestigeTab').innerText = data.collapse.hasSluggish[3] ? 'AutoPrestigers' : '???'
    DOM('t2AutoText2').style.display = data.collapse.hasSluggish[2] ? 'block' : 'none'
    DOM('t2AutoText3').style.display = data.collapse.hasSluggish[2] ? 'block' : 'none'
    DOM('t2AutoText4').style.display = data.collapse.hasSluggish[3] ? 'block' : 'none'
    DOM('auto4').style.display = data.collapse.hasSluggish[2] ? 'block' : 'none'
    DOM('auto5').style.display = data.collapse.hasSluggish[2] ? 'block' : 'none'
    DOM('auto6').style.display = data.collapse.hasSluggish[3] ? 'block' : 'none'
}

let cardinalGain = () => data.boost.times < 34 ? 0 : (((Math.sqrt(data.boost.times-34) * Math.log2((data.boost.times-34)+2))*Math.sqrt(data.boost.times-34))+3)*alephTotalEffect()
let alephEffect = (i) => data.collapse.alephs[i] > 0 ? alephData[i].effect()*cupEffect(6) : 1
let cupEffect = (i) => data.collapse.hasCUP[i] ?
    i===1 ? Math.max(cupData[i].effect()+drainEffect(i), 1)
    : Math.max(cupData[i].effect()*drainEffect(i), 1)
    : 1

function getTotalAlephs(){
    let total = 0
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        total += data.collapse.alephs[i]
    }
    return total
}
let alephTotalEffect = () => Math.max(1, Math.sqrt(getTotalAlephs()))

let alephData = [
    {text: "multiplying Autoclickers by", effect: ()=> Math.sqrt(data.collapse.alephs[0]+1)*3},
    {text: "multiplying Autobuyers by", effect: ()=> Math.log10(10+(90*data.collapse.alephs[1]))},
    {text: "multiplying Ordinal Power gain by", effect: ()=> Math.log2(data.collapse.alephs[2]+2)*3},
    {text: "multiplying Incrementy gain by", effect: ()=> Math.pow(data.collapse.alephs[3]+1, 1/4)},
    {text: "multiplying Dynamic Cap by", effect: ()=> (Math.sqrt(data.collapse.alephs[4]+1)*2)+hupData[9].effect()},
    {text: "multiplying the SGH effect by", effect: ()=> Math.pow(data.collapse.alephs[5]+1, 1/4)},
    {text: "multiplying Booster Power gain by", effect: ()=> Math.sqrt(data.collapse.alephs[6]+4)/2},
    {text: "multiplying the IUP3 effect by", effect: ()=> (Math.sqrt(data.collapse.alephs[7]+4)*2)+hupData[9].effect()},
]
let cupData = [
    {text: "Total Charge Boosts AutoBuyers", cost: 9, effect: ()=> Math.max(data.incrementy.totalCharge/2, 1)},
    {text: "Square AutoClicker speeds", cost: 27, effect: ()=> 2},
    {text: "Challenges 1-7 provide greatly reduced boosts when at zero completions", cost: 81, effect: ()=> 0.2*8},
    {text: "Ordinal Powers boost AutoBuyers and AutoClickers", cost: 243, effect: ()=> Math.pow(data.markup.powers, 1/256)},
    {text: "Incrementy boosts its own gain", cost: 2187, effect: ()=> Math.max(1, Math.log10(data.incrementy.amt))}, //TODO: Add a safety function
    {text: "Unlock a 3rd Overcharge Effect and boost Overcharge's 1st Effect", cost: 196608, effect: ()=> 3},
    {text: "Unspent Cardinals boost Alephs", cost: 3e9, effect: ()=> Math.log2(data.collapse.cardinals)},
    {text: "Gain 1% of best Cardinals gained on Collapse every second", cost: 4e13, effect: ()=> 1},
]
let sluggishData = [
    {text: "Uncap the Ordinal, gain 1% of Ordinal Powers gained on Markup every second and you always have one free Maximize and Successor AutoClicker", req: 34},
    {text: "Keep Challenges and Incrementy unlocked through Collapse", req: 29},
    {text: "Unlock an AutoBuyer for Charge, an AutoBuyer for RUP1-3, and Unlock Darkness", req: 24},
    {text: "Unlock an AutoBuyer for Repeatable Hierarchy Upgrades, AutoPrestigers for Factor Shift and Factor Boost, keep UP1-6 and Darkness Upgrades on Collapse, and unlock a new row of Booster Upgrades", req: 12},
    {text: "Unlock 4 new Hierarchy Upgrades, keep Hierarchies unlocked through Collapse, and keep Challenge completions on Collapse", req: 2},
]
let apData = [
    {name: "Factor Shift", button: "Shift", requirement: "", hasReq: false, plural: false},
    {name: "Factor Boost", button: "Boost", requirement: "you can\'t get a Sluggish Milestone", hasReq: true, plural: false},
]

function collapse(first = false){
    if (first){
        data.collapse.cardinals = 3
        data.collapse.bestCardinalsGained = 3
        ++data.collapse.times
        ++data.boost.times
        DOM('collapseNav').style.display = 'block'
        checkUnlocks(1, 0)
        collapseReset()
        boosterUnlock()
        makeExcessOrdMarks()
        return createAlert("You have Collapsed!", "Congratulations! You can now Factor Boost beyond FB34! Cardinals are gained based on how many FBs you have before Collapse.", "Got it!")
    }
    if (data.ord.ordinal >= BHO_VALUE || data.boost.times > 33){
        if(cardinalGain() > data.collapse.bestCardinalsGained) data.collapse.bestCardinalsGained = cardinalGain()
        data.collapse.cardinals += cardinalGain()
        ++data.collapse.times
        checkAllUnlocks(1)
        boosterUnlock()
        checkCollapseUnlockHTML()
        return collapseReset()
    }
    createAlert("Failure", "Insufficent Ordinal.", "Oops.")
}
function collapseReset(){
    boosterRefund()

    data.boost.amt = 0
    data.boost.total = 0
    data.boost.times = 0
    data.boost.hasBUP = Array(15).fill(false)
    data.boost.isCharged = Array(15).fill(false)
    data.boost.unlocks = Array(4).fill(false)
    boosterUnlock()

    DOM('factorBoostButton').style.display = 'none'

    data.chal.decrementy = D(1)
    data.chal.html = -1
    if(!data.collapse.hasSluggish[4]) data.chal.completions = Array(8).fill(0)
    data.chal.active = Array(8).fill(false)
    if(!data.collapse.hasSluggish[4]) data.chal.totalCompletions = 0
    updateAllChalHTML()

    data.incrementy.amt = 0
    if(data.collapse.hasSluggish[3]){
        data.incrementy.hasIUP[0] = false
        data.incrementy.hasIUP[1] = false
        data.incrementy.hasIUP[2] = false
    }
    else { data.incrementy.hasIUP = Array(9).fill(false) }
    data.incrementy.rebuyableAmt = Array(3).fill(0)
    data.incrementy.rebuyableCosts = [20, 1000, 100]
    data.incrementy.charge = 0
    data.incrementy.totalCharge = 0
    updateIncrementyHTML()
    if(!data.collapse.hasSluggish[3]){
        for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
            DOM(`iup${i}`).style.color = '#8080FF'
        }
    }

    data.hierarchies.ords[0].ord = 1
    data.hierarchies.ords[0].over = 0
    data.hierarchies.ords[1].ord = 1
    data.hierarchies.ords[1].over = 0
    data.hierarchies.rebuyableAmt = Array(6).fill(0)
    data.hierarchies.hasUpgrade = Array(10).fill(false)
    updateHierarchiesHTML()
    updateHierarchyPurchaseHTML()

    resetDarkness()

    data.overflow.bp = 1
    data.overflow.oc = 1
}

function collapseCardinals(){
    if (data.collapse.cardinals == 0) return createAlert("Failure", "No Cardinals to Collapse.", "Oops.")
    if(data.collapse.times == 1){
        for (let i = 0; i < 3; i++) {
            data.collapse.alephs[i] = 1
            updateAlephHTML(i)
        }
        data.collapse.cardinals = 0
        updateTotalAlephHTML()
        return createAlert("A little help!", "Since this your first Collapse, you have been given exactly one of the first three Alephs because they are the most helpful! From now on Aleph gain will be random.", "Thanks!")
    }

    let usedCardinals = Math.floor(data.collapse.cardinals)
    if (usedCardinals >= 1000) usedCardinals = Math.floor(usedCardinals/8)*8
    data.collapse.cardinals -= usedCardinals

    if(usedCardinals < 1000){
        while (usedCardinals > 0){
            const aleph = getRandom(0,8)
            ++data.collapse.alephs[aleph]
            updateAlephHTML(aleph)

            --usedCardinals
        }
    }
    else{
        for (let i = 0; i < data.collapse.alephs.length; i++) {
            data.collapse.alephs[i] += Math.floor(usedCardinals/8)
            updateAlephHTML(i)
        }
    }
    updateTotalAlephHTML()
}

function buyCardinalUpgrade(i){
    if(data.collapse.cardinals >= cupData[i].cost && !data.collapse.hasCUP[i]){
        data.collapse.cardinals -= cupData[i].cost
        checkUnlocks(0, i)
    }
}

function toggleT3Auto(i){
    data.collapse.apEnabled[i] = !data.collapse.apEnabled[i]
    DOM(`t3AutoToggle${i}`).innerText = `${apData[i].name} AutoPrestiger: ${boolToReadable(data.collapse.apEnabled[i], 'EDL')}`
}

