const purificationData = [
    {
        name: "Eternity",
        alt: "Eternal",
        desc: "Each Factor Boost yields only one Booster and Darkness Upgrades are useless",
        boostDesc: "Boosting the effect base of the first Darkness Upgrade by",
        eff: () => (1+data.omega.bestFBInPurification[0]/1000)*getAOREffect(5)
    },
    {
        name: "Infinity",
        alt: "Infinite",
        desc: "Alephs except ℵ<sub>1</sub> are useless, Dynamic Factor divides AutoBuyer speed, and RUP2, RUP3, and IUP3 are disabled",
        boostDesc: "Boosting ℵ<sub>1</sub>, ℵ<sub>2</sub>, and ℵ<sub>8</sub> by",
        eff: () => Math.sqrt(data.omega.bestFBInPurification[1]),
        special: () => inPurification(1) ? data.dy.level : D(1)
    },
    {
        name: "Obscurity",
        alt: "Obscure",
        desc: "Your Markup AutoBuyer is equivalent to your FGH successor, your Hierarchies cannot grow, and Charge boosts FGH Successor",
        boostDesc: "Boosting Overcharge gain, Booster Power gain, and both Hierarchy Successors by",
        eff: () => data.omega.bestFBInPurification[2]/10,
    },
    {
        name: "Inferiority",
        alt: "Inferior",
        desc: "Incrementy, its upgrades, and Hierarchies are disabled, and Charge cannot be used",
        boostDesc: "Boosting the first and fifth Cardinal Upgrade by",
        eff: () => ((data.omega.bestFBInPurification[3]))*getAOREffect(5)
    }
]
const aoRebuyableData = [
    {
        desc: "SLIGHTLY boost ℶ<sub>&omega;</sub> gain",
        eff: () => (1+getAORLevel(0)/10)*getOverflowEffect(6),
        costBase: 50,
        symbol: 'x',
        req: () => true,
        extraLevels: () => anRebuyableData[4].eff()
    },
    {
        desc: "Boost ℵ<sub>&omega;</sub> gain",
        eff: () => getAORLevel(1)/2+1,
        costBase: 25,
        symbol: 'x',
        req: () => true,
        extraLevels: () => 0
    },
    {
        desc: "ℵ<sub>&omega;</sub> divides Dynamic Factor gain while Purification of Infinity is active",
        eff: () => Math.log10(10+data.omega.alephOmega)*(getAORLevel(2)+1),
        costBase: 125,
        symbol: '/',
        req: () => inPurification(1),
        extraLevels: () => anRebuyableData[4].eff()
    },
    {
        desc: "Double the amount of Boosters gained in an Eternal Boost",
        eff: () => 2**getAORLevel(3),
        costBase: 150,
        symbol: 'x',
        req: () => inPurification(0),
        extraLevels: () => anRebuyableData[4].eff()+getEUPEffect(2, 6, true)
    },
    {
        desc: "ℵ<sub>&omega;</sub> multiplies AutoBuyer speed while Purification of Obscurity or Inferiority are active",
        eff: () => Math.sqrt(getAOEffect(0))*Math.sqrt(getAORLevel(4)+1)*getEUPEffect(2, 7, true),
        costBase: 200,
        symbol: 'x',
        req: () => inPurification(2) || inPurification(3),
        extraLevels: () => anRebuyableData[4].eff()
    },
    {
        desc: "ℵ<sub>&omega;</sub> boosts Purification of Inferiority's effects",
        eff: () => Math.log2(2+data.omega.alephOmega)*(getAORLevel(5)+1),
        costBase: 400,
        symbol: 'x',
        req: () => true,
        extraLevels: () => 0
    },
    {
        desc: "ℵ<sub>&omega;</sub> boosts the second BUP in the second column",
        eff: () => Math.log10(10+data.omega.alephOmega)*(getAORLevel(6)+1),
        costBase: 300,
        symbol: 'x',
        req: () => true,
        extraLevels: () => 0
    },
    {
        desc: "Boost the last Cardinal Upgrade by +1%",
        eff: () => 1+getAORLevel(7),
        costBase: 600,
        symbol: '+',
        req: () => true,
        extraLevels: () => 0
    },
]
const aoMilestoneData = [
    {
        desc: "The first three Singularity Functions are now Persistent, unlock a new Singularity Function, and unlock a Dynamic Shift AutoPrestiger",
        req: 200
    },{
        desc: "Purification of Infinity now boosts ℵ<sub>5</sub>, and unlock a new Aleph that is not effected by the seventh Cardinal Upgrade",
        req: 500,
        eff: () => hasAOMilestone(1) ? purificationEffect(1) : 1
    },{
        desc: "Purification of Obscurity now boosts the first Overcharge effect, and unlock two new Overcharge effects",
        req: 750,
        eff: () => hasAOMilestone(2) ? purificationEffect(2) : 1
    },{
        desc: "Purification of Inferiority now boosts the seventh Cardinal Upgrade, and unlock a new row of Incrementy Rebuyables",
        req: 1000,
        eff: () => hasAOMilestone(3) ? purificationEffect(3) : 1
    },{
        desc: "Boosters boost Cardinal Gain, unlock two new ℵ<sub>0</sub> Rebuyables, and unlock<span style='color: #9d58c9'> Obliteration</span>",
        req: 1750,
        eff: () => hasAOMilestone(4) ? data.boost.amt : 1
    },
]

function initPurification(){
    initPurifications()
    initAORebuyables()
    initAOMilestones()
}
function initPurifications(){
    const container = DOM('purificationContainer')
    for (let i = 0; i < data.omega.purificationIsActive.length; i++) {
        let el = document.createElement('button')
        el.className = 'purification'
        el.id = `purification${i}`
        el.addEventListener("click", ()=>enterPurification(i))
        container.append(el)
        updatePurificationHTML(i)
    }
}
function initAORebuyables(){
    const container = DOM('aoRebuyableContainer')
    for (let i = 0; i < data.omega.aoRebuyables.length/4; i++) {
        let row = document.createElement('div')
        row.className = `aoRow`
        row.id = `aoRRow${i}`
        for (let j = 0; j < 4; j++ ){
            let id = i*4+j
            let el = document.createElement('button')
            el.className = 'aoRebuyable'
            el.id = `aoR${id}`
            el.addEventListener("click", ()=>buyAOR(id))
            row.append(el)
        }
        container.append(row)
    }
    for (let i = 0; i < data.omega.aoRebuyables.length; i++) {
        updateAORHTML(i)
    }
}
function initAOMilestones(){
    const container = DOM('aoMilestoneContainer')
    for (let i = 0; i < aoMilestoneData.length/3; i++) {
        let row = document.createElement('div')
        row.className = `aoRow`
        row.id = `aoMRow${i}`
        for (let j = 0; j < 3; j++ ){
            let id = i*3+j
            if (id === 5) break
            let el = document.createElement('button')
            el.className = 'aoMilestone'
            el.id = `aoM${id}`
            el.innerHTML = `<span style="color: #c2052c">${aoMilestoneData[id].desc}</span><br>Requires: ${aoMilestoneData[id].req} ℶ<sub>&omega;</sub>`
            //el.addEventListener("click", ()=>enterPurification(i))
            row.append(el)
        }
        container.append(row)
    }
    updateAllAOMHTML()
}

function updatePurificationTabHTML(){
    if(alephOmegaCap() > data.omega.bestRemnants) data.omega.bestRemnants = alephOmegaCap()
    DOM(`alephOmega`).innerHTML = `<span style="font-size: 1.1rem">You have <span style="color: #ce0b0b">${format(data.omega.alephOmega)} ℵ<sub>&omega;</sub></span>, multiplying <span style="color: #ce0b0b">AutoBuyer Speed by ${format(getAOEffect(0))}x</span> and <span style="color: #ce0b0b">ℵ<sub>0</sub> gain by ${format(getAOEffect(1))}x</span></span><br>You have <span style="color: #ce0b0b">${format(alephOmegaCap())} ℶ<sub>&omega;</sub></span>, producing <span style="color: #ce0b0b">${format(aoGain())} ℵ<sub>&omega;</sub>/s</span> until ℵ<sub>&omega;</sub> reaches ℶ<sub>&omega;</sub>`
    if(inAnyPurification()) DOM(`purification${data.omega.whichPurification}`).innerHTML = `<span style="color: #ce0b0b">Purification of ${purificationData[data.omega.whichPurification].name}</span><br><span style="color: #ce390b">You will gain ${formatWhole(pureBoostGain())} more Boosts if you exit now (Highest Boost: ${data.omega.bestFBInPurification[data.omega.whichPurification]})</span><br><span style="color: darkred">${purificationData[data.omega.whichPurification].desc}</brspan><br><span style="color: #ce460b">${purificationData[data.omega.whichPurification].boostDesc} ${format(purificationData[data.omega.whichPurification].eff())}x</span>\``
    updateAllAORHTML()
}
function updatePurificationHTML(i){
    DOM(`purification${i}`).innerHTML = `<span style="color: #ce0b0b">Purification of ${purificationData[i].name}</span><br><span style="color: #ce390b">Highest ${purificationData[i].alt} Boost: <b>${data.omega.bestFBInPurification[i]}</b></span><br><span style="color: darkred">${purificationData[i].desc}</brspan><br><span style="color: #ce460b">${purificationData[i].boostDesc} ${format(purificationData[i].eff())}x</span>`
    DOM(`purification${i}`).style.backgroundColor = data.omega.purificationIsActive[i] ? `#120303` : `black`
}
function updatePossiblePurificationHTML(){
    if(data.omega.whichPurification === 0) updateAllDUPHTML()
    if(data.omega.whichPurification === 1) updateAllAlephHTML()
    if(data.omega.whichPurification === 2) updateAllBUPHTML()
}
function updateAORHTML(i){
    DOM(`aoR${i}`).innerHTML = `<span style="color: #ce280b">${aoRebuyableData[i].desc} (${formatWhole(getAORLevel(i))})</span><br>Cost: ${format(getAORCost(i))} ℵ<sub>&omega;</sub><br>Currently: ${aoRebuyableData[i].symbol !== 'x' ? aoRebuyableData[i].symbol : ''}${format(getAOREffect(i))}${aoRebuyableData[i].symbol === 'x' ? 'x' : ''} ${aoRebuyableData[i].req() ? '' : `(${formatBool(aoRebuyableData[i].req(), 'AU')})`}`
}
function updateAllAORHTML(){
    for (let i = 0; i < data.omega.aoRebuyables.length; i++) {
        updateAORHTML(i)
    }
}
function updateAOMilestoneHTML(i){
    DOM(`aoM${i}`).style.backgroundColor = hasAOMilestone(i) ? `#120303` : `black`
}
function updateAllAOMHTML(){
    for (let i = 0; i < aoMilestoneData.length; i++) {
        updateAOMilestoneHTML(i)
    }
}
function updateAllPurificationHTML(){
    for (let i = 0; i < data.omega.bestFBInPurification.length; i++) {
        updatePurificationHTML(i)
    }
}


function enterPurification(i){
    if(inAnyPurification() && (i === data.omega.whichPurification)) return exitPurification(i)
    if(inAnyPurification()) exitPurification(i,true)

    if(i === 3){
        singControl(1, 0)
        darknessControl(3)
    }

    data.omega.whichPurification = i
    data.omega.purificationIsActive[i] = true

    // Emulate Cardinal Gain
    if(cardinalGain() > data.collapse.bestCardinalsGained) data.collapse.bestCardinalsGained = cardinalGain()
    data.collapse.cardinals += cardinalGain()
    collapseReset()

    updatePossiblePurificationHTML()
    updatePurificationHTML(i)
    updateHeaderHTML()
}
function exitPurification(i, swap = false) {
    updateAllAOMHTML()
    if (data.boost.times > data.omega.bestFBInPurification[data.omega.whichPurification]) data.omega.bestFBInPurification[data.omega.whichPurification] = data.boost.times
    if (!swap) {
        if (cardinalGain() > data.collapse.bestCardinalsGained) data.collapse.bestCardinalsGained = cardinalGain()
        data.collapse.cardinals += cardinalGain()
        collapseReset()
    }

    data.omega.purificationIsActive = Array(data.omega.purificationIsActive.length).fill(false)

    if (swap) updatePurificationHTML(data.omega.whichPurification)
    updatePossiblePurificationHTML()

    data.omega.whichPurification = -1

    updatePurificationHTML(i)
    updateHeaderHTML()
}

function buyAOR(i){
    if(data.omega.alephOmega < getAORCost(i)) return
    data.omega.alephOmega -= getAORCost(i)
    ++data.omega.aoRebuyables[i]
    updateAORHTML(i)
    updateAllAOMHTML()
}

let aoGain = () => (alephOmegaCap()/1000)*getAOREffect(1)
let aoEffects = [
    () => data.omega.alephOmega*getEUPEffect(2, 0, true),
    () => Math.sqrt(data.omega.alephOmega)*getEUPEffect(2, 2, true),
]

let alephOmegaCap = () => (data.omega.bestFBInPurification[0]+data.omega.bestFBInPurification[1]+data.omega.bestFBInPurification[2]+data.omega.bestFBInPurification[3]+getEUPEffect(2, 8, true))*getAOREffect(0)*getEUPEffect(2, 1, true)
let pureBoostGain = () => Math.max(0, (data.boost.times-data.omega.bestFBInPurification[data.omega.whichPurification]))
let getAOEffect = (i) => Math.max(aoEffects[i](), 1)
let hasAOMilestone = (i) => data.omega.bestRemnants >= aoMilestoneData[i].req || isAOMilestonePermanent(i)
let inAnyPurification = () => data.omega.purificationIsActive.includes(true)
let inPurification = (i) => data.omega.purificationIsActive[i]
let purificationEffect = (i) => Math.max(purificationData[i].eff(), 1)
let getAOREffect = (i) => getAORLevel(i) > 0 ? Math.max(1, aoRebuyableData[i].eff()) : 1
let getAORCost = (i) => ((aoRebuyableData[i].costBase/100+1)**data.omega.aoRebuyables[i])*aoRebuyableData[i].costBase
let getAORLevel = (i) => data.omega.aoRebuyables[i] + aoRebuyableData[i].extraLevels()
let getAOMEffect = (i) => Math.max(1, aoMilestoneData[i].eff())
let aomArray = () => [hasAOMilestone(0), hasAOMilestone(1), hasAOMilestone(2), hasAOMilestone(3), hasAOMilestone(4)]