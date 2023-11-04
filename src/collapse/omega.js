/*
const ocData = [
    {
        name: "Infinite Light",
        desc: "Every Factor Boost yields only one Booster and Darkness Upgrades are disabled",
        goal: () => Math.floor(158*(Math.pow(data.omega.completions[0]+1, 1/2))),
        special: {
            desc: "Total OC Completions Boost Cardinal Upgrade 1",
            req: 5,
            showEffect: true,
            effect: () => Math.sqrt(getTotalOCs()),
        }
    },
    {
        name: "Lost Infinities",
        desc: "Alephs except ℵ<sub>1</sub> are useless, Dynamic Factor divides AutoBuyer speed, and IUP3 is disabled",
        goal: () => Math.floor(180*(Math.pow(data.omega.completions[1]+1, 1/2))),
        special: {
            desc: "ℵ<sub>2</sub> and ℵ<sub>1</sub> are greatly boosted based on total OC completions",
            req: 5,
            showEffect: true,
            effect: () => Math.sqrt(getTotalOCs()),
        }
    },
    {
        name: "Infinite Mind",
        desc: `Your Singularity is locked at a density of &omega;<sup>4</sup> and only its effect to AutoBuyers works, every Booster Upgrade purchased divides the Singularity's density by 1.25 and decuples all other Booster Upgrade costs, and every Booster Upgrade Supercharged doubles Singularity Density (to a max of 1e4)`,
        goal: () => Math.floor(154*(Math.pow(data.omega.completions[2]+1, 1/2))),
        special: {
            desc: "Boost Overcharge gain based on total OC completions",
            req: 5,
            showEffect: true,
            effect: () => Math.sqrt(getTotalOCs()),
        }
    },
    {
        name: "Finite",
        desc: "Incrementy Gain is disabled and Incrementy Upgrades are useless. Entering this Challenge temporarily resets your Charge, you will get it back upon exiting (Sacrificed Charge is not effected)",
        goal: () => Math.floor(43*(Math.pow(data.omega.completions[3]+1, 1/6))),
        special: {
            desc: "Unlock a new row of Incrementy Upgrades",
            req: 5,
            showEffect: false,
            effect: () => data.omega.completions[3] > 4,
        }
    },
    {
        name: "Ω",
        desc: "You are trapped within all previous Omega Challenges, but things long kept a secret will be revealed...",
        goal: () => 34,
        special: {
            desc: "???",
            req: 1,
            showEffect: false,
            effect: () => 1,
        }
    },
]
let appeasementData = [
    {desc: 'It responds to this tiny gift with a tiny reward.<br>Nullify any increases to Booster Upgrade costs'},
    {desc: 'It demands more, but gives a slightly stronger reward.<br>Gain 1 working level of the first Darkness Upgrade for every Appeasement completed', effect: ()=> hasAppeasement(1) ? 5 : 0},
    {desc: 'It seems to expect more. It flaunts its endless power in this reward.<br>Gain 1 free Charge every 5 Factor Boosts', effect: ()=>hasAppeasement(2) ? (Math.floor(data.boost.times / 5)) : 0},
    {desc: 'It is pleased and gives a far more powerful gift.<br>Divide the Singularity Density by 1.01 every 2 Factor Boosts', effect: ()=>hasAppeasement(3) ? 1.01*(Math.floor(data.boost.times / 2)): 1},
    {desc: 'It is satisfied.<br>Increase Booster gain by 1 every 10 Factor Boosts and unlock the last great secrets.', effect: ()=>hasAppeasement(4) ? (Math.floor(data.boost.times / 10)) : 0},
]
let pupData = [
    {text: "Factor Boosts boost ℵ<sub>&omega;</sub> gain", symbol: 'x', cost: 0, effect: ()=> Math.sqrt(data.boost.times), min: 1},
    {text: "ℵ<sub>&omega;</sub> boosts the second Booster Upgrade in the second column", symbol: 'x', cost: 96, effect: ()=> 1+(data.omega.alephOmega)/1000, min: 1},
    {text: "Factor Boosts boost the ℵ<sub>&omega;</sub> effect", symbol: 'x', cost: 96, effect: ()=> data.boost.times/2, min: 1},
    {text: "ℵ<sub>&omega;</sub> reduces the Supercharge multiplier to Singularity Density", symbol: '-', cost: 96, effect: ()=> data.omega.alephOmega/10, min: 0},
    {text: "ℵ<sub>&omega;</sub> divides Dynamic's effect", symbol: '/', cost: 96, effect: ()=> 1+(data.omega.alephOmega), min: 1},
    {text: "Factor Boosts provide free &omega; Remnants", cost: 96, symbol: '+', effect: ()=> data.boost.times, min: 0},
    {text: "&omega; Remnants boost the ℵ<sub>&omega;</sub> effect", symbol: 'x', cost: 96, effect: ()=> Math.sqrt(data.omega.remnants), min: 1},
]
const totalOCEffects = [
    {
        desc: `increasing the second Cardinal Upgrade's effect by `,
        effect: () => getTotalOCs() > 0 ? getTotalOCs()/10 : 0
    },
    {
        desc: `multiplying your Singularity's boost to Cardinal gain by `,
        effect: () => getTotalOCs() > 0 ? 1+Math.sqrt(getTotalOCs()+1)/50 : 1
    },
    {
        desc: `multiplying the Hierarchy effect cap by `,
        effect: () => getTotalOCs() > 0 ? 10**getTotalOCs() : 1
    }
]

function initOCs(){
    updateOCEffectsHTML()
    const container = DOM(`ocContainer`)
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow'
        row.id = `ocRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+(i*3)
            if(id < 5){
                let el = document.createElement('button')
                el.className = 'oc'
                el.id = `oc${id}`
                el.innerHTML = `<b><span style="color: indianred">${id !== 4 ? `${numToRoman(id+1)}: Challenge of the ${ocData[id].name}` : `${numToRoman(id+1)}: The ${ocData[id].name} Challenge`}</span></b><br><span style="color: orangered">${ocData[id].desc}</span><br><br><span style="color: orange">At <span style="color: orangered">${ocData[id].special.req}</span> Completions: ${ocData[id].special.desc} ${ocData[id].special.showEffect ? `[${format(getOCEffect(id))}x]` : ``}</span><br><br><span style="color: red">Completions: ${data.omega.completions[id]}</span><br><span style="color: red">Requirement for next Completion: Factor Boost ${(ocData[id].goal())}</span>`
                el.addEventListener('click', () => ocConfirm(id))
                row.append(el)
            }
        }
        container.append(row)
    }
    updateOCInHTML()

    initPUPS()
    initAppeasements()
}
function initAppeasements(){
    const container = DOM('appeasementContainer')
    for (let i = 0; i < data.omega.hasAppeasement.length; i++) {
        let el = document.createElement('button')
        el.className = 'appeasement'
        el.id = `appeasement${i}`
        el.innerHTML = i === 4
            ? `Complete <b>??? Omega Challenges</b><br><br>${appeasementData[i].desc}`
            : `Complete <b>Omega Challenge ${numToRoman(i+1)} ${ocData[i].special.req} times</b><br><br>${appeasementData[i].desc}`
        container.append(el)
    }
    revealAppeasementHTML()
}
function initPUPS(){
    const container = DOM('pUpgradesSubPage')
    for (let i = 0; i < 2; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow'
        row.id = `pupRow${i}`
        container.append(row)
        for (let j = 0; j < 4; j++) {
            let id = j+(i*4)
            if(id === 7) return

            let el = document.createElement('button')
            el.className = 'pup'
            el.id = `pup${id}`
            el.innerHTML = `${pupData[id].text}<br><br>Requires: ${format(pupData[id].cost)} Boosters`
            el.addEventListener("click", ()=>buyPureUpgrade(id))
            row.append(el)
        }
    }
}
function updateOCEffectsHTML(){
    DOM(`ocInfo`).innerHTML = `You have completed ${getTotalOCs()} Omega Challenges<br><span style="font-size: 0.9rem; color: darkorange">Your completions are ${totalOCEffects[0].desc}${format(totalOCEffects[0].effect())}, ${totalOCEffects[1].desc}${format(totalOCEffects[1].effect())}, and ${totalOCEffects[2].desc}${format(totalOCEffects[2].effect())}</span>`
}
function updateOCInHTML(){
    //Pretty Lazy Function -\_('')_/-
    //Pretty Lazy shrug ascii too

    for (let i = 0; i < data.omega.active.length; i++) {
        DOM(`oc${i}`).style.background = data.omega.active[i] ? `#1B0D0D` : `black`
    }
}
function updateOCHTML(i){
    const el = DOM(`oc${i}`)
    el.innerHTML = `<b><span style="color: indianred">${i !== 4 ? `${numToRoman(i+1)}: Challenge of the ${ocData[i].name}` : `${numToRoman(i+1)}: The ${ocData[i].name} Challenge`}</span></b><br><span style="color: orangered">${ocData[i].desc}</span><br><br><span style="color: orange">At <span style="color: orangered">${ocData[i].special.req}</span> Completions: ${ocData[i].special.desc} ${ocData[i].special.showEffect ? `[${format(getOCEffect(i))}x]` : ``}</span><br><br><span style="color: red">Completions: ${data.omega.completions[i]}</span><br><span style="color: red">Requirement for next Completion: Factor Boost ${(ocData[i].goal())}</span>`
}

function revealAppeasementHTML(){
    DOM(`cardinalsTab`).innerText = omegaUnlocked() ? `Pure Alephs` : `Alephs`
    DOM(`cardinalsTab`).style.color = omegaUnlocked() ? `#ce0b0b` : `#20da45`
    DOM(`cardinalsTab`).style.border = omegaUnlocked() ? `2px solid darkred` : `2px solid #2da000`
    DOM(`cupsTab`).innerText = omegaUnlocked() ? `Pure Upgrades` : `Cardinal Upgrades`
    DOM(`cupsTab`).style.color = omegaUnlocked() ? `#ce0b0b` : `#20da45`
    DOM(`cupsTab`).style.border = omegaUnlocked() ? `2px solid darkred` : `2px solid #2da000`
    DOM(`smTab`).innerText = inOC(4) ? `Appeasements` : `Sluggishness`
    DOM(`smTab`).style.color = inOC(4) ? `#ce0b0b` : `#20da45`
    DOM(`smTab`).style.border = inOC(4) ? `2px solid darkred` : `2px solid #2da000`

    DOM(`appeasementsBottomText`).innerText = omegaUnlocked() ? `You have Appeased... something` : `This Challenge is impossible to complete on your own.\nYou must fully Appease whatever strange deity watches this realm first...`

    DOM(`markupButton`).style.color = inOC(4) && !omegaUnlocked() ? `#ce0b0b` : `goldenrod`
    DOM(`markupButton`).style.border = inOC(4) && !omegaUnlocked() ? `2px solid darkred` : `2px solid #785c13`

    updateRemnantHTML()
    updateAllPureHTML(0)
    updateAllPureHTML(1)
}

function updateRemnantHTML(){
    DOM(`remnantTotal`).children[0].innerHTML = `${format(data.omega.remnants+getPUPEffect(5))} &omega; Remnants`
    DOM(`remnantTotal`).children[1].innerHTML = `${format(alephOmegaProduction())}`
}
function updateAlephOmegaHTML(){
    DOM(`alephOmega`).children[0].children[0].innerHTML = `${format(data.omega.alephOmega, 3)} ℵ<sub>&omega;</sub>`
    DOM(`alephOmega`).children[1].children[0].innerText = `${format(getAlephOmegaEffect(0), 5)}x`
}
function updatePureHTML(i, mode){
    if(mode === 0){
        DOM(`pup${i}`).style.backgroundColor = data.omega.hasPUP[i] ? `#110000` : `black`
        DOM(`pup${i}`).innerHTML = `${pupData[i].text}<br><br>${data.omega.hasPUP[i] ? `Currently: ${pupData[i].symbol !== 'x' ? pupData[i].symbol : ''}${format(getPUPEffect(i))}${pupData[i].symbol === 'x' ? pupData[i].symbol : ''}` : `Requires: ${format(pupData[i].cost)} Boosters`}`
    }
    if(mode === 1) DOM(`appeasement${i}`).style.backgroundColor = data.omega.hasAppeasement[i] ? `#110000` : `black`
}
function updateAllPureHTML(mode){
    let array = mode === 0 ? data.omega.hasPUP : data.omega.hasAppeasement
    for (let i = 0; i < array.length; i++) {
        updatePureHTML(i, mode)
    }
}

function ocConfirm(i){
        createConfirmation("Are you sure?", `${inAnyOC() ? 'Exiting' : 'Entering'} an Omega Challenge will preform a Collapse, force you to exit any Baseless Realms, and reset your Singularity!`, "No chance.", "Of course!", ocControl, i)
}
function ocControl(i){
    updateOCHTML(i)
    updateOCEffectsHTML()
    updateAllAlephHTML()
    singControl(1)

    //if(inOC() && i !== data.omega.selected) return swapOC(i)

    data.omega.selected = i
    if(i === 4) data.omega.active = Array(5).fill(!data.omega.active[4])
    else data.omega.active[i] = !data.omega.active[i]

    data.omega.tempComps = inAnyOC() ? data.omega.completions[i] : 0

    omegaReset()

    if(data.omega.selected === 3 || data.omega.selected === 4){
        const oldCharge = data.incrementy.totalCharge
        data.incrementy.totalCharge = inAnyOC() ? 0 : data.omega.oldCharge
        data.incrementy.charge = inAnyOC() ? 0 : data.omega.oldCharge
        data.omega.oldCharge = oldCharge
    }

    if(data.omega.selected === 4 && !inAnyOC()){
        data.omega.remnants = 0
        data.omega.alephOmega = 0
        data.omega.hasPUP = Array(7).fill(false)
        data.omega.hasAppeasement = Array(5).fill(false)
    }

    if(i === 4 && inAnyOC()) checkAppeasements()

    revealAppeasementHTML()
    updateHeaderHTML()
}

function checkOCComps(i){
    if(!inAnyOC() || !data.ord.isPsi) return
    if(data.boost.times >= ocData[i].goal()) ++data.omega.completions[i]
    updateHeaderHTML()
}
function omegaReset(){
    if(data.baseless.baseless) baselessControl()
    data.ord.ordinal.gte(BHO_VALUE) || data.boost.times > 33 ? collapse(): collapseReset()
    returnOCs()
    updateOCInHTML()
}

function checkAppeasements(){
    for (let i = 0; i < data.omega.hasAppeasement.length-1; i++) {
        if(data.omega.completions[i] > ocData[i].special.req){
            data.omega.hasAppeasement[i] = true
            updatePureHTML(i, 1)
        }
    }
    data.omega.hasAppeasement[4] = getTotalOCs() > Infinity
    updatePureHTML(4, 1)
}
function buyPureUpgrade(i){
    if(data.boost.total >= pupData[i].cost && !data.omega.hasPUP[i]){
        data.omega.hasPUP[i] = true
        updatePureHTML(i, 0)
    }
}
function remnantSacrifice(i){
    if(i === 0){
        if(data.boost.amt === 0) return
        --data.boost.amt
        ++data.omega.remnants
    }
    if(i === 1){
        if(getTotalOCs() === 0) return
        sacrificeOC()
        ++data.omega.remnants
    }
    updateRemnantHTML()
}
function sacrificeOC(){
    for (let i = 0; i < data.omega.completions.length; i++) {
        if(data.omega.completions[i] > 0){
            --data.omega.completions[i]
            ++data.omega.sacrificedComps[i]
            updateOCHTML(i)
            updateOCEffectsHTML()
            return
        }
    }
}
function returnOCs(){
    for (let i = 0; i < data.omega.completions.length; i++) {
        if(data.omega.sacrificedComps[i] > 0){
            data.omega.completions[i] += data.omega.sacrificedComps[i]
            data.omega.sacrificedComps[i] = 0
            updateOCHTML(i)
        }
    }
    updateOCEffectsHTML()
}

function getTotalOCs() {
    let total = 0
    for (let i = 0; i < data.omega.completions.length; i++) {
        total += data.omega.completions[i]
    }
    return total
}

let inOC = (i) => data.omega.active[i]
let inAnyOC = () => data.omega.active.includes(true)
let getOCEffect = (i) => data.omega.completions[i] > ocData[i].special.req ? Math.max(ocData[i].special.effect()) : 1
let oc1Effect = () => inOC(1) && data.dy.level >= 1 ? data.dy.level/getPUPEffect(4) : 1
let oc2Effects = [
    () => totalBUPs() > 0 && inOC(2) ? Math.min(1e4, (1e4 / (2*totalBUPs()) * (totalCharges() > 0 ? (2-getPUPEffect(3))*totalCharges() : 1))/appeasementData[3].effect()) : 1e4,
    () => totalBUPs() > 0 && !hasAppeasement(0) && inOC(2) ? 10*totalBUPs() : 1,
]

let alephOmegaProduction = () => omegaUnlocked() ? ((data.omega.remnants+getPUPEffect(5))/1000)*getPUPEffect(0) : 0
let getAlephOmegaEffect =(i) => omegaUnlocked() ? Math.max(1, alephOmegaEffects[i]()) : 1
let alephOmegaEffects = [
    () => (1+(data.omega.alephOmega/1000))*getPUPEffect(2)*getPUPEffect(6)
]

let getPUPEffect = (i) => data.omega.hasPUP[i] && omegaUnlocked() ? Math.max(pupData[i].min, pupData[i].effect()) : pupData[i].min
let hasAppeasement = (i) => omegaUnlocked() && data.omega.hasAppeasement[i]

let omegaUnlocked = () => inOC(4) && data.omega.hasAppeasement[4]

let ocsUnlocked = () => data.incrementy.totalCharge > 71 || inAnyOC() || getTotalOCs() > 0
*/