let stableEnergyData = [
    {
        name: 'Stable',
        desc: 'Stabilize',
        cost: 1,
        effects: [
            {
                desc: 'Multiplying Incrementy gain',
                sign: 'x',
                effect: () => (1+getStableEnergy(0))**10,
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
                effect: () => 7**getStableEnergy(1),
                baseEffect: () => 1,
            },
            {
                desc: 'Increasing the Decrementy gain exponent',
                sign: '+',
                effect: () => getStableEnergy(1),
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
                effect: () => Math.min(10, getStableEnergy(2)), // I don't think this cap will be reached, but safety ig
                baseEffect: () => 0,
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
    let text = `<span style="color: #9765b2">${stableEnergyData[i].desc} ${stableEnergyData[i].cost} ${previousName} Energy to gain 1 ${stableEnergyData[i].name} Energy</span><br><br><b style="color: #b87dd9">You currently have ${getStableEnergy(i)}</b>, it is:`
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
    const bigContainer = DOM('stabilityContainer')
    for (let i = 0; i < stableEnergyData.length; i++) {
        let container = document.createElement('div')
        container.className = 'flexBox column'
        container.id = `stabilityContainer${i}`

        let stability = document.createElement('button')
        stability.className = 'stability'
        stability.id = `stability${i}`
        stability.innerHTML = makeStabilityText(i)
        stability.onclick = () => buyStability(i)
        container.appendChild(stability)

        let respec = document.createElement('button')
        respec.className = 'stabilityRespec'
        respec.id = `stabilityRespec${i}`
        respec.innerText = `Reset your ${stableEnergyData[i].name} Energy, regaining your ${ i === 0 ? 'Fractal' : stableEnergyData[i-1].name} Energy`
        respec.onclick = () => confirmStabilityRespec(i)
        container.appendChild(respec)

        bigContainer.appendChild(container)
    }
}

function updateStabilityHTML(i){
    DOM(`stability${i}`).innerHTML = makeStabilityText(i)
}

let getStableEnergyCurrency = (i) => i === 0 ? data.obliterate.energy : data.stability.energy[i-1]
function buyStability(i){
    let currency = getStableEnergyCurrency(i)
    let energyData = stableEnergyData[i]
    if(currency < energyData.cost) return

    if(i === 0) spendFractalEnergy(energyData.cost)
    else{
        data.stability.energy[i-1] -= energyData.cost
        updateStabilityHTML(i-1)
    }

    ++data.stability.energy[i]
    updateStabilityHTML(i)
}

function confirmStabilityRespec(i){
    if(!getSimpleSetting('stabilizationRespecConfirmation')) return respecStability(i)
    createConfirmation('Are you certain?', 'This will force a Collapse reset!', 'Nope!', 'Yeah', respecStability, i)
}

function respecStability(i){
    if(i === 0){
        data.obliterate.energy += data.stability.energy[0]
        //data.obliterate.passiveEnergy -= data.stability.energy[0]
    }
    else{
        data.stability.energy[i-1] += data.stability.energy[i]*stableEnergyData[i].cost
        updateStabilityHTML(i-1)
    }

    data.stability.energy[i] = 0
    updateStabilityHTML(i)

    collapseReset()
}

let getStableEnergy = (i) => data.stability.energy[i]
let getStableEnergyEffect = (i, j) => getStableEnergy(i) > 0 ? stableEnergyData[i].effects[j].effect() : stableEnergyData[i].effects[j].baseEffect()