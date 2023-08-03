const ocData = [
    {
        name: "Infinite Mind",
        desc: "If you are past Ψ(Ω) you gain Decrementy based on your Ordinal which divides your AutoBuyer speed. Each Booster Upgrade purchased or Supercharged increases Decrementy gain",
        goal: () => 4,
        special: {
            desc: "Greatly Boost Cardinal Upgrade 3 based on total OC Completions",
            req: 3,
            showEffect: true,
            effect: () => 1,
        }
    },
    {
        name: "Eternal Decline",
        desc: "All Booster Upgrades except 2x1 and 3x1 cannot be purchased",
        goal: () => 4,
        special: {
            desc: "Booster Upgrade 2x2's effect is cubed",
            req: 5,
            showEffect: false,
            effect: () => 3,
        }
    },
    {
        name: "Lost Infinities",
        desc: "Alephs are useless and Dynamic Factor divides AutoBuyer speed",
        goal: () => 4,
        special: {
            desc: "Aleph 2 is greatly boosted based on total OC completions if you’re not Baseless. Otherwise, Aleph 1 is greatly boosted based on total OC completions",
            req: 4,
            showEffect: true,
            effect: () => 1,
        }
    },
    {
        name: "Effortless Eternity",
        desc: "The Challenge Boost to AutoBuyers is disabled and Factor Boosts scale much quicker",
        goal: () => 4,
        special: {
            desc: "Boost Booster Power gain and Overcharge gain based on total OC completions",
            req: 6,
            showEffect: true,
            effect: () => 1,
        }
    },
    {
        name: "Finite",
        desc: "Incrementy Gain is disabled and Incrementy Upgrades are useless",
        goal: () => 4,
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
        goal: () => 4,
        special: {
            desc: "Uncap Dynamic Factor, total OC Completions boost Dynamic Gain, and all upgrades that used to boost Dynamic Cap now combine to boost Dynamic Gain",
            req: 1,
            showEffect: true,
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
    for (let i = 0; i < ocData.length/3; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow'
        row.id = `ocRow${i}`

        for (let j = 0; j < 3; j++) {
            let id = j+(i*3)
            let el = document.createElement('button')
            el.className = 'oc'
            el.id = `oc${id}`
            el.innerHTML = `<b><span style="color: indianred">${id !== 5 ? `${numToRoman(id+1)}: Challenge of the ${ocData[id].name}` : `${numToRoman(id+1)}: The ${ocData[id].name} Challenge`}</span></b><br><span style="color: orangered">${ocData[id].desc}</span><br><br><span style="color: orange">At <span style="color: orangered">${ocData[id].special.req}</span> Completions: ${ocData[id].special.desc} ${ocData[id].special.showEffect ? `[${format(ocData[id].special.effect())}x]` : ``}</span><br><br><span style="color: red">Completions: ${data.omega.completions[id]}</span><br><span style="color: red">Requirement for next Completion: ${displayPsiOrd(ocData[id].goal(), 5)}</span>`
            row.append(el)
        }
        container.append(row)
    }
}
function updateOCEffectsHTML(){
    DOM(`ocInfo`).innerHTML = `You have completed ${getTotalOCs()} Omega Challenges<br><span style="font-size: 0.9rem; color: darkorange">Your completions are ${totalOCEffects[0].desc}${format(totalOCEffects[0].effect())} and ${totalOCEffects[1].desc}${format(totalOCEffects[1].effect())}</span>`
}

function getTotalOCs() {
    let total = 0
    for (let i = 0; i < data.omega.completions.length; i++) {
        total += data.omega.completions[i]
    }
    return total
}
