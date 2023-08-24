const ocData = [
    /*
    {
        name: "Infinite Mind",
        desc: "If you are past Ψ(Ω) you gain Decrementy based on your Ordinal which divides your AutoBuyer speed. Each Booster Upgrade purchased or Supercharged increases Decrementy gain",
        goal: () => 1000*(data.omega.completions[0]+1),
        special: {
            desc: "Greatly Boost Cardinal Upgrade 1 based on total OC Completions",
            req: 3,
            showEffect: true,
            effect: () => 1,
        }
    },
     */
    {
        name: "Infinite Light",
        desc: "Every Factor Boost yields only one Booster and Darkness Upgrades are disabled",
        goal: () => 100*data.omega.completions[0],
        special: {
            desc: "Greatly Boost Cardinal Upgrade 1 based on total OC Completions",
            req: 5,
            showEffect: false,
            effect: () => 3,
        }
    },
    {
        name: "Lost Infinities",
        desc: "Alephs except ℵ<sub>1</sub> are useless, Dynamic Factor divides AutoBuyer speed, and IUP3 is disabled",
        goal: () => 1000,
        special: {
            desc: "ℵ<sub>2</sub> is greatly boosted based on total OC completions if you’re not Baseless. Otherwise, ℵ<sub>1</sub> is greatly boosted based on total OC completions",
            req: 4,
            showEffect: true,
            effect: () => 1,
        }
    },
    {
        name: "Infinite Mind",
        desc: `Your Singularity is locked at a density of &omega;<sup>4</sup> and only its effect to AutoBuyers works, every Booster Upgrade purchased divides the Singularity's density by 1.25 and decuples all other Booster Upgrade costs, and every Booster Upgrade Supercharged doubles Singularity Density (to a max of 1e4)`,
        goal: () => 1000,
        special: {
            desc: "Boost Booster Power gain and Overcharge gain based on total OC completions",
            req: 6,
            showEffect: true,
            effect: () => 1,
        }
    },
    {
        name: "Finite",
        desc: "Incrementy Gain is disabled and Incrementy Upgrades are useless. Entering this Challenge temporarily resets your Charge, you will get it back upon exiting (Sacrificed Charge is not effected)",
        goal: () => 1000,
        special: {
            desc: "Unlock a new row of Incrementy Upgrades",
            req: 8,
            showEffect: false,
            effect: () => false,
        }
    },
    {
        name: "Ω",
        desc: "You are trapped within all previous Omega Challenges",
        goal: () => 1000,
        special: {
            desc: "Uncap Dynamic Factor and unlock Purity",
            req: 1,
            showEffect: false,
            effect: () => 1,
        }
    },
]
const totalOCEffects = [
    {
        desc: `increasing the second Cardinal Upgrade's effect by `,
        effect: () => 1
    },
    {
        desc: `multiplying your Singularity's boost to Cardinal gain by `,
        effect: () => 1
    },
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
                el.innerHTML = `<b><span style="color: indianred">${id !== 4 ? `${numToRoman(id+1)}: Challenge of the ${ocData[id].name}` : `${numToRoman(id+1)}: The ${ocData[id].name} Challenge`}</span></b><br><span style="color: orangered">${ocData[id].desc}</span><br><br><span style="color: orange">At <span style="color: orangered">${ocData[id].special.req}</span> Completions: ${ocData[id].special.desc} ${ocData[id].special.showEffect ? `[${format(ocData[id].special.effect())}x]` : ``}</span><br><br><span style="color: red">Completions: ${data.omega.completions[id]}</span><br><span style="color: red">Requirement for next Completion: Factor Boost ${(ocData[id].goal())}</span>`
                el.addEventListener('click', () => ocConfirm(id))
                row.append(el)
            }
        }
        container.append(row)
    }
    updateOCInHTML()
}
function updateOCEffectsHTML(){
    DOM(`ocInfo`).innerHTML = `You have completed ${getTotalOCs()} Omega Challenges<br><span style="font-size: 0.9rem; color: darkorange">Your completions are ${totalOCEffects[0].desc}${format(totalOCEffects[0].effect())} and ${totalOCEffects[1].desc}${format(totalOCEffects[1].effect())}</span>`
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
    el.innerHTML = `<b><span style="color: indianred">${i !== 4 ? `${numToRoman(i+1)}: Challenge of the ${ocData[i].name}` : `${numToRoman(i+1)}: The ${ocData[i].name} Challenge`}</span></b><br><span style="color: orangered">${ocData[i].desc}</span><br><br><span style="color: orange">At <span style="color: orangered">${ocData[i].special.req}</span> Completions: ${ocData[i].special.desc} ${ocData[i].special.showEffect ? `[${format(ocData[i].special.effect())}x]` : ``}</span><br><br><span style="color: red">Completions: ${data.omega.completions[i]}</span><br><span style="color: red">Requirement for next Completion: Factor Boost ${(ocData[i].goal())}</span>`
}

function ocConfirm(i){
    if(inOC() && i !== data.omega.selected){
        createConfirmation("Are you sure?", `Swapping Omega Challenges will preform a Collapse, force you to exit any Baseless Realms, and reset your Singularity!`, "No chance.", "Of course!", ocControl, i)
    }
    else{
        createConfirmation("Are you sure?", `${inOC() ? 'Exiting' : 'Entering'} an Omega Challenge will preform a Collapse, force you to exit any Baseless Realms, and reset your Singularity!`, "No chance.", "Of course!", ocControl, i)
    }
}
function ocControl(i){
    updateOCHTML(i)
    updateOCEffectsHTML()
    updateAllAlephHTML()
    singControl(1)

    if(inOC() && i !== data.omega.selected) return swapOC(i)

    data.omega.selected = i
    if(i === 4) data.omega.active = Array(5).fill(!data.omega.active[4])
    else data.omega.active[i] = !data.omega.active[i]

    data.omega.tempComps = inOC() ? data.omega.completions[i] : 0

    omegaReset()

    if(data.omega.selected === 3 || data.omega.selected === 4){
        const oldCharge = data.incrementy.totalCharge
        data.incrementy.totalCharge = inOC() ? 0 : data.omega.oldCharge
        data.incrementy.charge = inOC() ? 0 : data.omega.oldCharge
        data.omega.oldCharge = oldCharge
    }

    updateHeaderHTML()
}
function swapOC(i){
    updateOCHTML(data.omega.selected)
    if(data.omega.selected === 4)  data.omega.active = Array(5).fill(false)
    else data.omega.active[data.omega.selected] = false

    data.omega.selected = i
    if(data.omega.selected === 4) data.omega.active = Array(5).fill(true)
    else data.omega.active[i] = true

    data.omega.tempComps = data.omega.completions[i]

    omegaReset()
    if(data.omega.selected === 3 || data.omega.selected === 4){
        data.incrementy.totalCharge = 0
        data.incrementy.charge = 0
        data.omega.oldCharge = data.incrementy.totalCharge
    }

    updateHeaderHTML()
}

function checkOCComps(i){
    if(!inOC() || !data.ord.isPsi) return
    if(data.boost.times >= ocData[i].goal()) ++data.omega.completions[i]
    updateHeaderHTML()
}
function omegaReset(){
    if(data.baseless.baseless) baselessControl()
    data.ord.ordinal.gte(BHO_VALUE) || data.boost.times > 33 ? collapse(): collapseReset()
    updateOCInHTML()
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
let oc1Effect = () => inOC(1) && data.dy.level >= 1 ? data.dy.level : 1
let oc2Effects = [
    () => totalBUPs() > 0 ? Math.min(1e4, (1e4 / (2*totalBUPs()) * (totalCharges() > 0 ? 2*totalCharges() : 1))) : 1e4,
    () => totalBUPs() > 0 && inOC(2) ? 10*totalBUPs() : 1,
]
let oc2Effect = () => totalBUPs() > 0 ? 1e4 / (1.25*totalBUPs()) : 1e4