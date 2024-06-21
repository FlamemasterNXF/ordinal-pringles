let instabilityEffectData = [
    () => getInstabilityConstant() / 100,
    () => getInstabilityConstant() / 10,
]

// Near Carbon-Copy of the Functions as used in Purity.js
function initInstabPringleBox(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            let pringle = document.createElement('div')
            let index = j+(i*6)
            pringle.className = 'instabilityPringle'
            pringle.id = `instabPringle${index}`
            pringle.style.borderColor = isPringleDarkened(index) ? '#5b5b5b' : pringleData[index].color
            pringle.addEventListener('mouseenter', (e) => displayPringleButton(e,pringleData[index], index, 'instabButton'))
            //pringle.addEventListener('click', () => assignPringle(index, 0))
            if(data.sToggles[18]) pringle.innerText = `${index}`
            DOM(`iPringleBox${i}`).append(pringle)
        }
    }
}
function updateInstabButtonText(pringle, i){
    DOM(`instabButton`).innerHTML = `This is the <b style="color: ${pringle.color}">${pringle.name} ${pringle.colorDesc} Pringle</b><br>It ${pringle.desc}`
}


function updateInstabilityText(){
    DOM(`instabilityText`).innerHTML = `There is <span style="color: #f769ffe1; font-size: 1.1rem">${formatWhole(data.instability.instability)} Instability</span>`
    DOM(`instabilityConstantText`).innerHTML = data.instability.enabled
        ? `Your <span style="color: #ff69bbe1">Instability Constant</span> is <span style="color: #ff69bbe1;">${getInstabilityConstant()}</span><br>It <span style="color: #ad7cf9e1">reduces</span> the <span style="color: #ad7cf9e1">Incrementy gain exponent</span> by <span style="color: #ff69bbe1">${format(getInstabilityEffect(0))}</span> and <span style="color: #f769ffe1">raises</span> the <span style="color: #f769ffe1">Decrementy gain exponent</span> by <span style="color: #ff69bbe1">${format(getInstabilityEffect(1))}</span>`
        : `Your Instability Constant is ${getInstabilityConstant()}<br>It reduces the Incrementy gain exponent by ${format(getInstabilityEffect(0))} and raises the Decrementy gain exponent by ${format(getInstabilityEffect(1))}`
    DOM(`unstableDrain`).innerHTML = `Sacrifice ${format(getUnstableDrainCost())} Negative Charge to the Unstable Drain (${getUnstableDrainLevel()})<br>This will yield one Instability, but increase the cost of all Drains`
}

function instabilityControl(){
    data.instability.enabled = !data.instability.enabled
    DOM(`instabilityControl`).innerText = `${formatBool(!data.instability.enabled, 'EDT')} Instability`
    updateInstabilityText()
}

let isPringleDarkened = () => false
let getInstabilityConstant = () => data.instability.total
let getInstabilityEffect = (i) => data.instability.enabled ? instabilityEffectData[i]() : 0
let getUnstableDrainLevel = () => data.instability.unstableDrains
let getUnstableDrainCost = (i) => (10**(1+(data.darkness.totalDrains/2)))*(getUnstableDrainLevel()+1)
