function updateDarknessHTML(){
    updateAllDUPHTML()
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
    DOM(`dup${i}`).innerText = `${dupData[i].text} ${getDUPLevelText(i)}\nRequires ${format(dupData[i].cost())} Stable Decrementy\nCurrently: ${formatSign(dupEffect(i), dupData[i].sign)}`
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

function updateDarknessResourcesHTML(){
    let entropyText = data.darkness.darkened
        ? `You have ${format(getEntropy())} Entropy, multiplying Negative Charge gain by ${format(getEntropyEffect())}`
        : `Your best Entropy in Darkness is ${format(data.darkness.bestEntropy)}`

    let lightText = data.darkness.darkened
        ? `You have ${format(data.darkness.currentLight)} Light [-${getLightChange()}/s], when it reaches 0 the Darkness will win`
        : `Your best Incrementy is ${format(data.incrementy.bestIncrementy)}, creating ${getLight()} Light`

    DOM(`darknessResources`).innerHTML = `You have ${format(data.chal.decrementy)} Decrementy<br><br>
        Your best Decrementy is ${format(data.darkness.bestDecrementy)}, creating ${getStableDecrementy()} Stable Decrementy
        <br><br>${lightText}
        <br><br>${entropyText}`
}

function getStableDecrementy(){
    return Decimal.floor(Decimal.log10(data.darkness.bestDecrementy))
}

function getLight(){
    return Decimal.floor(Decimal.log10(data.incrementy.bestIncrementy))
}
function getLightChange(){
    return 2**(getDepth()-1)
}

function getEntropy(){
    let exponent = 3+getDepth()
    if(data.darkness.darkened) return (getLight()-data.darkness.currentLight)**exponent
    return 0
}
function getEntropyEffect(){
    return 1
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

// TODO: Change these effects which once applied to stabilization
// let extraStabilizationLevels = () => getHyperchargeEffect(6)+getEUPEffect(1, 3, true)

function negativeChargeGain(){
    if(!data.darkness.darkened || !data.darkness.negativeChargeEnabled) return 0

    let base = Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5)

    return base * iup10Effect() * getRealmChallengeEffect(3)
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
    if(i===0) return D(30).times(data.darkness.levels[i]+1)
    if(i===1) return D(40).times(data.darkness.levels[i]+1)
    if(i===2) return D(30).times(data.darkness.levels[i]+1)
}

let dupData = [
    {
        text: "Multiply AutoBuyer speed by 1.5x",
        sign: 'x',
        extraLevels: () => getNormalANREffect(2),
        cost: ()=> D(300).times(dupScaling(0)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? (1.5*purificationEffect(0))**(getTotalDUPLevels(0)) : 1
    },
    {
        text: 'Double Dynamic Cap',
        sign: 'x',
        extraLevels: () => Math.floor(iup11Effect()+getNormalANREffect(2)),
        cost: ()=> D(150).times(dupScaling(1)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? 2**getTotalDUPLevels(1) : 1
    },
    {
        text: `Multiply both Hierarchy Effect exponents`,
        sign: 'x',
        extraLevels: () => getNormalANREffect(2),
        cost: ()=> D(800).times(dupScaling(2)).div(getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? 0.0175*getTotalDUPLevels(2)**2+1: 1
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
    if(mode===2){
        if(data.incrementy.charge > 0 && !inPurification(3)){
            --data.incrementy.charge
            --data.incrementy.totalCharge
            ++data.darkness.sacrificedCharge
        }
    }
    if(mode===3){
        boosterReset()
        data.incrementy.totalCharge += data.darkness.sacrificedCharge
        data.incrementy.charge += data.darkness.sacrificedCharge
        data.darkness.sacrificedCharge = 0
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
