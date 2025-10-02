let getDepthUpgradeBaseLevel = (i) => data.darkness.bestDepth - (i + 1)
let getDepthUpgradeExtraLevels = () => getEUPEffect(1, 3, true)
let getDepthUpgradeLevel = (i) => getDepthUpgradeBaseLevel(i) + getDepthUpgradeExtraLevels()

let isDepthUpgradeUnlocked = (i) => getDepthUpgradeLevel(i) > 0

function getDepthUpgradeEffect(i){
    if(!isDepthUpgradeUnlocked(i) || inPurification(0)) return depthUpgradeData[i].baseEffect
    return Math.max(depthUpgradeData[i].effect(), depthUpgradeData[i].baseEffect)
}

let depthUpgradeData = [
    {
        text: 'Your best Entropy boosts your Stable Decrementy',
        sign: 'x',
        baseEffect: 1,
        effect: () => 1+(Math.log10(Math.sqrt(data.darkness.bestEntropy+1) * getDepthUpgradeLevel(0)))/10
    },
    {
        text: 'Cardinals provide free Light',
        sign: '+',
        baseEffect: 0,
        effect: () => Decimal.floor(Decimal.log10(Decimal.sqrt(data.collapse.cardinals+1).times(getDepthUpgradeLevel(1)))).toNumber()
    },
    {
        text: 'Depths increase the Entropy gain exponent further',
        sign: '+',
        baseEffect: 0,
        effect: () => getDepthUpgradeLevel(2)
    }
]

function initDepthUpgradeHTML(){
    const container = DOM(`depthUpgradeContainer`)
    for (let i = 0; i < depthUpgradeData.length; i++) {
        let dup = document.createElement('button')
        dup.className = 'depthUpgrade'
        dup.id = `depthUpgrade${i}`
        container.appendChild(dup)
        updateDepthUpgradeHTML(i)
    }
}

function updateDepthUpgradeHTML(i){
    DOM(`depthUpgrade${i}`).innerHTML = isDepthUpgradeUnlocked(i)
        ? `${depthUpgradeData[i].text} (${getDepthUpgradeBaseLevel(i)} + ${getDepthUpgradeExtraLevels()})<br>Currently: ${formatEffect(getDepthUpgradeEffect(i), depthUpgradeData[i].sign)}`
        : `${depthUpgradeData[i].text}<br>Unlocks upon reaching Depth ${i+2}`
}
function updateAllDepthUpgradeHTML(){
    for (let i = 0; i < depthUpgradeData.length; i++) {
        updateDepthUpgradeHTML(i)
    }
}

function updateDarknessHTML(){
    updateAllDUPHTML()
    updateAllDepthUpgradeHTML()
    updateDarknessButton()
    updateDarknessResourcesHTML()
}

let getDarknessText = () => `You are trapped in Challenge 8 and there is ${format(data.chal.decrementy)} Decrementy [${format(decrementyGain())}x/s]`
function updateDarknessControlHTML(mode){
    switch (mode) {
        case 0:
            DOM('dupC0').innerText = `${formatBool(!data.darkness.negativeChargeEnabled, 'EDT')} Negative Charge gain`
            break;
        case 1:
            DOM('dupC1').innerText = `Reset Negative Charge`
            break;
        default:
            break;
    }
}
function updateAllDarknessControlHTML(){
    for (let i = 0; i < 2; i++) {
        updateDarknessControlHTML(i)
    }
}

function getDUPLevelText(i){
    if(getExtraDUPLevels(i) > 0) return `(${data.darkness.levels[i]} + ${getExtraDUPLevels(i)})`
    return `(${data.darkness.levels[i]})`
}
function updateDUPHTML(i){
    DOM(`dup${i}`).innerText = `${dupData[i].text} ${getDUPLevelText(i)}\nRequires ${format(dupData[i].cost())} Stable Decrementy\nCurrently: ${formatEffect(dupEffect(i), dupData[i].sign)}`
}
function updateAllDUPHTML(){
    for (let i = 0; i < data.darkness.levels.length; i++) {
        updateDUPHTML(i)
    }
}

function makeDrainLevelText(i){
    if(hasPassiveHypercharge(4)) return `(${getDrainLevel(i)}) <span style="font-size: 0.7rem">[${data.darkness.drains[i]}]</span>`
    return `(${getDrainLevel(i)})`
}

function updateDrainHTML(i){
    DOM(`drain${i}`).innerHTML = `Drain this Cardinal Upgrade ${makeDrainLevelText(i)}<br>${format(drainCost(i))} Negative Charge`
}
function updateAllDrainHTML(){
    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }
}

function updateDarknessButton(){
    let statusText = data.darkness.darkened
        ? `Escape the Darkness`
        : `Enter the Darkness, trapping yourself in Challenge 8`

    let depthText = data.darkness.darkened
        ? `<br><br>You are currently in Depth ${getDepth()}<br>This Depth increases your Entropy exponent by +${getDepth()}<br>This Depth multiplies your Light's decay speed by ${2**(getDepth()-1)}x<br>You must consume ${format(getLightNeededForDepth())} more Light to enter the next Depth`
        : `<br><br>Your highest ever Depth is Depth ${data.darkness.bestDepth}`

    DOM('darken').innerHTML = statusText+depthText
}

function getStableDecrementy(){
    const multipliers = getDepthUpgradeEffect(0)*getHyperchargeEffect(11)
    return Decimal.floor(Decimal.log10(data.darkness.bestDecrementy.plus(1))).times(multipliers).toNumber()
}

function getLight(){
    const bonus = getDepthUpgradeEffect(1)
    const base = Decimal.floor(Decimal.log10(data.incrementy.bestIncrementy.plus(1))).plus(bonus).toNumber()
    return 30+base*2
}
function getLightChange(){
    return 2**(getDepth()-1)
}

function getEntropy(){
    let exponent = 3 + getDepth()*getDepthUpgradeEffect(2) + getHyperchargeEffect(6)
    if(data.darkness.darkened){
        const amount = (getLight()-data.darkness.currentLight)**exponent
        if(amount > data.darkness.bestEntropy) data.darkness.bestEntropy = amount
        return amount
    }
    return 0
}
function getEntropyEffect(){
    return Math.max(1, Math.pow(getEntropy(), 1/4))
}

function getDepth(){
    return data.darkness.depth
}
function getDepthRequirement(depth = getDepth()){
    if(depth > 5) return 60*2**depth
    return 60
}
function getPreviouslyConsumedLight(){
    let amount = 0
    for (let i = getDepth(); i > 1; i--) {
        amount += getDepthRequirement(i)
    }
    return amount
}
function getLightNeededForDepth(){
    return getDepthRequirement()-(getLight()-data.darkness.currentLight-getPreviouslyConsumedLight())
}

function updateDarknessResourcesHTML(){
    let entropyText = data.darkness.darkened
        ? `You have ${format(getEntropy())} Entropy, multiplying Negative Charge gain by ${format(getEntropyEffect())}`
        : `Your best Entropy in Darkness is ${format(data.darkness.bestEntropy)}`

    let lightText = data.darkness.darkened
        ? `You have ${format(data.darkness.currentLight)} Light [-${getLightChange()}/s], when it reaches 0 the Darkness will win`
        : `Your best Incrementy is ${format(data.incrementy.bestIncrementy)}, creating ${getLight()} Light`

    DOM(`darknessResources`).innerHTML = `You have ${format(data.chal.decrementy)} Decrementy<br><br>
        Your best Decrementy is ${format(data.darkness.bestDecrementy)}, creating ${format(getStableDecrementy())} Stable Decrementy
        <br><br>${lightText}
        <br><br>${entropyText}`
}

function negativeChargeGain(){
    if(!data.darkness.darkened || !data.darkness.negativeChargeEnabled) return 0

    const base = Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5)
    const mult = getEntropyEffect() * iup10Effect() * getRealmChallengeEffect(3)

    return base * mult
}

function negativeChargeEffect(incrementyEffectNerf) {
    if (incrementyEffectNerf) return hasHypercharge(2) ? 1 : Decimal.max(1, Decimal.log10(data.darkness.negativeCharge + 10))
    return Decimal.max(1, Decimal.sqrt(data.darkness.negativeCharge + 1))
}

function drainEffect(i){
    if(getDrainLevel(i) === 0 || i === 7) return i===1 ? 0 : 1
    if(i === 1) return Math.max(0, drain1Effect())
    return Math.max(drainData[i].effect(), 1)
}
let drainCost = (i) => ((10**(1+(data.darkness.totalDrains/2)))*(getDrainLevel(i)+1))/getHyperchargeEffect(7)
let getDrainLevel = (i) => hasPassiveHypercharge(4)
    ? Math.max(...data.darkness.drains)+getEUPEffect(1, 4, true)
    : data.darkness.drains[i]
let drainData = [
    { effect: () => 2*getDrainLevel(0) },
    { effect: () => drain1Effect() },
    { effect: () => 1.5*getDrainLevel(2) },
    { effect: () => 2*getDrainLevel(3) },
    { effect: () => 5*getDrainLevel(4) },
    { effect: () => 1.2*getDrainLevel(5) },
    { effect: () => 2*getDrainLevel(6) },
]

let dupEffect = (i) => inPurification(0) ? 1 : Math.max(1, dupData[i].effect())
function dupScaling (i){
    const divisor = 2.2 - Math.min(0.2, data.darkness.levels[i]/10)
    return Math.pow(data.darkness.levels[i]+1, 1/divisor)
}

let dupData = [
    {
        text: "Multiply AutoBuyer speed",
        sign: 'x',
        extraLevels: () => Math.floor(getNormalANREffect(2)),
        cost: ()=> D(65).pow(dupScaling(0)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? (1.5*purificationEffect(0))**(getTotalDUPLevels(0)*1.75) : 1
    },
    {
        text: 'Double Dynamic Cap',
        sign: 'x',
        extraLevels: () => Math.floor(iup11Effect()+getNormalANREffect(2)),
        cost: ()=> D(55).pow(dupScaling(1)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? 2**getTotalDUPLevels(1) : 1
    },
    {
        text: `Multiply both Hierarchy Effect exponents`,
        sign: 'x',
        extraLevels: () => Math.floor(getNormalANREffect(2)),
        cost: ()=> D(300).pow(dupScaling(2)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? (0.0175*(getTotalDUPLevels(2)*2.75)**2+1): 1
    }
]

function buyDrain(i) {
    if (!hasCUP(i)) return showNotification("The Cardinal Upgrade must be purchased before being drained!")
    if (data.darkness.negativeCharge < drainCost(i)) return showNotification("Insufficient Negative Charge")

    data.darkness.negativeChargeSpent += drainCost(i)
    data.darkness.negativeCharge -= drainCost(i)
    ++data.darkness.drains[i]
    ++data.darkness.totalDrains

    updateAllDrainHTML()
}

function buyDUP(i){
    if(D(getStableDecrementy()).gte(dupData[i].cost())){
        ++data.darkness.levels[i]
        updateDUPHTML(i)
    }
}
let getTotalDUPs = () => getTotalDUPLevels(0)+getTotalDUPLevels(1)+getTotalDUPLevels(2)

function darknessControl(mode){
    if(data.baseless.baseless) return showNotification('You cannot access Darkness Controls in the Baseless Realms!')
    updateDarknessControlHTML(0)
    if(mode===4){
        data.overflow.thirdEffect = !data.overflow.thirdEffect
        DOM('bp2Description').innerText = data.overflow.thirdEffect ? 'Dividing Decrementy Gain by ' : 'Multiplying Decrementy Gain by '
        DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
    }
    if(mode===0) data.darkness.negativeChargeEnabled = !data.darkness.negativeChargeEnabled
    if(mode===1){
        data.darkness.negativeCharge = 0
        if(data.darkness.negativeChargeEnabled) darknessControl(0)
    }
    updateDarknessControlHTML(mode)
}

function darkenConfirm(){
    if(!getSimpleSetting('darknessConfirmation')) return darkenControl()
    data.darkness.darkened
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy and force a Booster Reset.', 'No thanks.', 'For sure!', darkenControl)
        : createConfirmation('Are you certain?', 'Darkening will perform a Booster Reset and trap you in Challenge 8. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darkenControl)
}
function darkenControl(force = false){
    if(data.baseless.baseless) return
    if(getSimpleSetting('darknessBoost')) boost()
    data.darkness.darkened && !force ? chalExit(true) : chalEnter(7, true)
    data.darkness.darkened = !data.darkness.darkened

    data.darkness.currentLight = getLight()
    data.darkness.depth = data.darkness.darkened ? 1 : 0

    if(data.darkness.darkened && hasPassiveHypercharge(3)){
        data.markup.shifts = 7
        data.ord.base = 3
        data.ord.ordinal = D(4)
        data.ord.isPsi = true
    }

    updateStatusHTML()
}

function respecDrains(){
    data.darkness.negativeCharge += data.darkness.negativeChargeSpent
    data.darkness.negativeChargeSpent = 0
    data.darkness.totalDrains = 0
    for (let i = 0; i < data.darkness.drains.length; i++) {
        data.darkness.drains[i] = 0
        updateDrainHTML(i)
    }
}

let getExtraDUPLevels = (i) => dupData[i].extraLevels()
let getTotalDUPLevels = (i) => data.darkness.levels[i]+getExtraDUPLevels(i)
