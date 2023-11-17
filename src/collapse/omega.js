const purificationData = [
    {
        name: "Obscurity",
        desc: "Each Factor Boost yields only one Booster and Darkness Upgrades are useless",
        boostDesc: "Boosting the effect base of the first Darkness Upgrade by",
        eff: () => 1
    },
    {
        name: "Infinity",
        desc: "Alephs except ℵ<sub>1</sub> are useless, Dynamic Factor divides AutoBuyer speed, and IUP3 is disabled",
        boostDesc: "Boosting ℵ<sub>1</sub>, ℵ<sub>2</sub>, and ℵ<sub>8</sub> by",
        eff: () => 1
    },
    {
        name: "Eternity",
        desc: "Each BUP purchased doubles all other BUP costs and increases the Boost requirement scaling",
        boostDesc: "Boosting Overcharge and Booster Power gain by",
        eff: () => 1
    },
    {
        name: "Inferiority",
        desc: "Incrementy, its upgrades, Charge, and Hierarchies are disabled",
        boostDesc: "Boosting the first and fifth Cardinal Upgrade by",
        eff: () => 1
    }
]
const aoRebuyableData = [
    {
        desc: "ℵ<sub>0</sub> SLIGHTLY boosts ℶ<sub>&omega;</sub> gain",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>0</sub> boosts ℵ<sub>&omega;</sub> gain",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> divides Dynamic Factor gain while Purification 02 is active",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> reduces the Boost req scaling increases while Purification 03 is active",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> multiplies AutoBuyer speed AGAIN while Purification 01 or 04 are active",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> boosts Purification 01 and 04s effects",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> boosts the second BUP in the second column",
        eff: () => 1
    },
    {
        desc: "ℵ<sub>&omega;</sub> boosts the last Cardinal Upgrade",
        eff: () => 1
    },
    /*{
        desc: "ℵ<sub>&omega;</sub> boosts RUP1",
        eff: () => 1
    }
     */
]
const aoMilestoneData = [
    {
        desc: "The first three Singularity Functions are now always active, and unlock a new Singularity Function",
        req: 1
    },{
        desc: "Purification 02 now boosts ℵ<sub>5</sub>",
        req: 96
    },{
        desc: "Purification 03 now boosts the first Overcharge effect",
        req: 96
    },{
        desc: "Unlock a new row of Incrementy Rebuyables",
        req: 96
    },{
        desc: "ℵ<sub>0</sub> now also boosts the RUP2 base and the SGH Successor at a reduced rate",
        req: 96,
        eff: () => 1
    },{
        desc: "Unlock Ω Purification",
        req: 96
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
        el.innerHTML = `<span style="color: #ce0b0b">Purification of ${purificationData[i].name}</span><br><span style="color: #ce390b">Best Factor Boost: <b>${data.omega.bestFBInPurification[i]}</b></span><br><span style="color: darkred">${purificationData[i].desc}</brspan><br><span style="color: #ce460b">${purificationData[i].boostDesc} ${format(purificationData[i].eff())}x</span>`
        //el.addEventListener("click", ()=>enterPurification(i))
        container.append(el)
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
            el.innerHTML = `<span style="color: #ce280b">${aoRebuyableData[id].desc} (${formatWhole(data.omega.aoRebuyables[id])})</span><br>Cost: ${96} ℵ<sub>&omega;</sub><br>Currently: ${format(aoRebuyableData[id].eff())}x`
            //el.addEventListener("click", ()=>enterPurification(i))
            row.append(el)
        }
        container.append(row)
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
            let el = document.createElement('button')
            el.className = 'aoMilestone'
            el.id = `aoM${id}`
            el.innerHTML = `<span style="color: #c2052c">${aoMilestoneData[id].desc}</span><br>Requires: ${aoMilestoneData[id].req} ℶ<sub>&omega;</sub>`
            //el.addEventListener("click", ()=>enterPurification(i))
            row.append(el)
        }
        container.append(row)
    }
}

function updatePurificationHTML(){
    DOM(`alephOmega`).innerHTML = `<span style="font-size: 1.1rem">You have <span style="color: #ce0b0b">${format(data.omega.alephOmega)} ℵ<sub>&omega;</sub></span>, multiplying <span style="color: #ce0b0b">AutoBuyer Speed by ${format(aoEffects[0]())}x</span>, <span style="color: #ce0b0b">ℵ<sub>0</sub> gain by ${format(aoEffects[1]())}x</span>, and the <span style="color: #ce0b0b">Hierarchy Effect Cap by ${format(aoEffects[2]())}x</span></span><br>You have <span style="color: #ce0b0b">${format(data.omega.remnants)} ℶ<sub>&omega;</sub></span>, producing <span style="color: #ce0b0b">${format(aoGain())} ℵ<sub>&omega;</sub>/s</span>`
}

let aoGain = () => data.omega.remnants/1000
let aoEffects = [
    () => 1,
    () => 1,
    () => 1
]

let hasAOMilestone = (i) => data.omega.remnants >= aoMilestoneData[i].req