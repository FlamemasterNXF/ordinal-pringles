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
            //pringle.style.borderColor = isPringleDarkened(index) ? '#5b5b5b' : pringleData[index].color
            pringle.addEventListener('mouseenter', (e) => displayPringleButton(e,pringleData[index], index, 'instabButton'))
            pringle.addEventListener('click', () => darkenPringle(index))
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

function darkenPringle(i){
    if(isPringleAssigned(i) || isPringleDarkened(i)) return

    DOM(`instabPringle${i}`).style.borderColor = `#232323`
    data.instability.isDarkened[i] = true
    ++data.instability.instability
    ++data.instability.total
    updateInstabilityText()
}

function respecDarkPringles(){
    data.instability.total = data.instability.unstableDrains
    data.instability.instability = data.instability.unstableDrains
    data.instability.isDarkened = Array(data.instability.isDarkened.length).fill(false)
    respecDestabilizedBUPs(true)
    obliterateReset()
    updateAllMiscPringleColors('instab')
    updateInstabilityText()
}

function buyUnstableDrain(){
    if(data.darkness.negativeCharge < getUnstableDrainCost()) return

    data.instability.chargeSpent += getUnstableDrainCost()
    data.darkness.negativeCharge -= getUnstableDrainCost()
    ++data.instability.unstableDrains
    ++data.darkness.totalDrains

    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }

    ++data.instability.total
    ++data.instability.instability
    updateInstabilityText()
}

function respecUnstableDrain(){
    data.instability.total -= data.instability.unstableDrains
    data.instability.instability -= data.instability.unstableDrains

    data.darkness.negativeCharge += data.instability.chargeSpent
    data.instability.chargeSpent = 0
    data.darkness.totalDrains -= data.instability.unstableDrains
    data.instability.unstableDrains = 0

    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }

    respecDestabilizedBUPs(true)

    updateInstabilityText()
}

function destabBUP(i){
    if(data.boost.isDestab[i]) return
    if(!data.instability.instability > 0) return

    data.boost.isDestab[i] = true
    data.instability.instability -= 1

    DOM(`bup${i}`).className = 'destabBUP'
    DOM(`bup${i}`).innerText = `${getBUPDesc(i)}`
    DOM(`bup${i}`).style.background = `black`
    DOM(`bup${i}`).style.color = `rgba(228,105,255,0.88)`
}

function respecDestabilizedBUPs(forceObliteration = false){
    if(data.baseless.baseless) return
    for (let i = 0; i < data.boost.isDestab.length; i++) {
        data.boost.isDestab[i] = false
        DOM(`bup${i}`).className = 'chargedBUP'
        DOM(`bup${i}`).innerHTML = `${getBUPDesc(i)}`
        DOM(`bup${i}`).style.color = `#8080FF`
    }
    data.instability.instability = data.instability.total

    if(!forceObliteration) collapseReset()
}

let isPringleDarkened = (i) => data.instability.isDarkened[i]
let getInstabilityConstant = () => data.instability.total
let getInstabilityEffect = (i) => data.instability.enabled ? instabilityEffectData[i]() : 0
let getUnstableDrainLevel = () => data.instability.unstableDrains
let getUnstableDrainCost = () => (100**(1+(data.darkness.totalDrains)))**((getUnstableDrainLevel())+1)
