let stableEnergyData = [
    {
        name: 'Stable',
        desc: 'Stabilize',
        cost: 1,
        effects: [
            {
                desc: 'Multiplying Incrementy gain',
                sign: 'x',
                effect: () => 1,
                baseEffect: () => 1,
            },
            {
                desc: 'Stable Energy can be used to purchase a Second Hypercharge in each row',
                isAbnormal: true,
            }
        ]
    },
    {
        name: 'Condensed',
        desc: 'Condense',
        cost: 3,
        effects: [
            {
                desc: 'Multiplying Cardinal gain',
                sign: 'x',
                effect: () => 1,
                baseEffect: () => 1,
            },
            {
                desc: 'Increasing the Decrementy gain exponent',
                sign: '+',
                effect: () => 0,
                baseEffect: () => 0,
            },
        ]
    },
    {
        name: 'Unbounded',
        desc: 'Collapse',
        cost: 3,
        effects: [
            {
                desc: 'Reducing the Base in the Forgotten Realm',
                sign: '-',
                effect: () => 0,
                baseEffect: () => 0,
            },
            {
                desc: '???',
                sign: 'x',
                effect: () => 1,
                baseEffect: () => 1,
            },
            {
                desc: 'Unbounded Energy can be used to make any Hypercharge Stable',
                isAbnormal: true,
            }
        ]
    },
]

function makeStabilityText(i){
    let previousName = i === 0 ? 'Fractal' : stableEnergyData[i-1].name
    let text = `<span style="color: #9765b2">${stableEnergyData[i].desc} ${stableEnergyData[i].cost} ${previousName} Energy to gain 1 ${stableEnergyData[i].name} Energy</span><br><br><span style="color: #b87dd9">You currently have ${getStableEnergy(i)}</span>, it is:`
    for (let j = 0; j < stableEnergyData[i].effects.length; j++) {
        let data =  stableEnergyData[i].effects[j]
        if(data.isAbnormal){
            text += `<br><span style="color: #a88fcc">${data.desc}</span>`
        }
        else{
            text += `<br><span style="color: #a27dd9">${data.desc}</span> by <span style="color: #a27dd9">${formatSign(getStableEnergyEffect(i, j), data.sign)}</span>`
        }
    }
    return text
}

function initStabilityHTML(){
    const container = DOM('stabilityContainer')
    for (let i = 0; i < stableEnergyData.length; i++) {
        let stability = document.createElement('button')
        stability.className = 'stability'
        stability.id = `stability${i}`
        stability.innerHTML = makeStabilityText(i)
        container.appendChild(stability)
    }
}

let getStableEnergy = (i) => data.stability.energy[i]
let getStableEnergyEffect = (i, j) => getStableEnergy(i) > 0 ? stableEnergyData[i].effects[j].effect() : stableEnergyData[i].effects[j].baseEffect()