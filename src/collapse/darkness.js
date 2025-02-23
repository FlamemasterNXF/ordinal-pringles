function updateDarknessHTML(){
    updateAllDUPHTML()
    updateStabilizationHTML()
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
    DOM(`dup${i}`).innerText = `${dupData[i].text} ${getDUPLevelText(i)}\n${format(dupData[i].cost())} Decrementy\nCurrently: ${formatSign(dupEffect(i), dupData[i].sign)}`
}
function updateAllDUPHTML(){
    for (let i = 0; i < data.darkness.levels.length; i++) {
        updateDUPHTML(i)
    }
}
function updateDrainHTML(i){
    DOM(`drain${i}`).innerText = `Drain this Cardinal Upgrade (${getDrainLevel(i)})\n${format(drainCost(i))} Negative Charge`
}


let stabilizationEffects = [
    {
        effect: () => 0,
        baseEffect: () => 0,
        desc: 'Increase the Decrementy gain exponent after Ψ(Ω)',
        sign: '+',
    },
    {
        effect: () => 1,
        baseEffect: () => 1,
        desc: 'Reduce the Decrementy effects',
        sign: '/',
    },
    {
        effect: () => 1,
        baseEffect: () => 1,
        desc: 'Decrease the Incrementy gain threshold',
        sign: '/',
    },
    {
        effect: () => 1,
        baseEffect: () => 1,
        desc: 'Decrease the Decay speed',
        sign: '/',
    }
]
let getStabilizationCost = () => 1
function makeStabilizationText(){
    let text = ''
    for (let i = 0; i < stabilizationEffects.length; i++) {
        text += `<br><b>While in Depth ${i+1} or below:</b> ${stabilizationEffects[i].desc} [${formatSign(stabilizationEffects[i].effect(), stabilizationEffects[i].sign)}]`
    }
    return text
}
function updateStabilizationHTML(){
    DOM(`dbup`).innerHTML = `<b>Stabilization</b> (${data.darkness.stabilization})${makeStabilizationText()}<br><br>Cost: ${format(getStabilizationCost())} Cardinals`
}

let depthEffects = [
    {
        buff: '',
        nerf: 'You are trapped in Challenge 8',
    },
    {
        buff: 'Decrementy boosts Negative Charge gain',
        nerf: ', but it now effects AutoBuyer speed',
        buffEffect: {
            desc: 'Negative Charge multiplier: ',
            effect: () => 1
        },
        nerfEffect: {
            desc: 'AutoBuyer speed divisor: ',
            effect: () => 1
        },
    },
    {
        buff: 'You can now gain Incrementy in Darkness',
        nerf: `, but if it's gain becomes too slow it Decays`,
        nerfEffect: {
            desc: 'Incrementy/s threshold: ',
            effect: () => 1
        }
    },
    {
        buff: 'Decrementy gain exponent is boosted by Cardinals',
        nerf: `, but all Decrementy nerfs are intensified`,
        buffEffect: {
            desc: 'Decrementy exponent increase: ',
            effect: () => 1,
        },
    }
]
function updateDarknessDepthHTML(){
    let starter = data.darkness.darkened ? 'Exit' : 'Enter'
    let text = `${starter} the Darkness (Depth ${data.darkness.depth+1})<br><br>You will be trapped in Challenge 8`
    for (let i = 1; i < data.darkness.depth+1; i++) {
        let currentDepth = depthEffects[i]
        if(currentDepth.buffEffect !== undefined){
            text += `<br><span style="color: #887bc1">${currentDepth.buffEffect.desc}</span>${format(currentDepth.buffEffect.effect())}`
        }
        if(currentDepth.nerfEffect !== undefined){
            text += `<br><span style="color: #887bc1">${currentDepth.nerfEffect.desc}</span>${format(currentDepth.nerfEffect.effect())}`
        }
    }
    DOM('darken').innerHTML = text
}
function updateDepthSelectHTML(i){
    DOM(`depthDescriptor`).innerHTML = `<span style="color: #9e89f6">Depth ${i + 1} and below:</span> ${depthEffects[i].buff}${depthEffects[i].nerf}`
}
function setDarknessDepth(i){
    data.darkness.depth = i
    updateDarknessDepthHTML()
}
function initDepthHTML(){
    let container = DOM(`depthSelect`)
    for (let i = 0; i < stabilizationEffects.length; i++) {
        let button = document.createElement('button');
        button.className = 'depthButton'
        button.id = `depth${i}`
        button.innerText = `Depth ${i+1}`
        button.addEventListener("mouseenter", (e) => updateDepthSelectHTML(i))
        button.addEventListener("click", (e) => setDarknessDepth(i))
        container.appendChild(button)
    }
    updateDarknessDepthHTML()
}

let negativeChargeGain = () => data.darkness.darkened && data.darkness.negativeChargeEnabled ? Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5)*(iup10Effect()) : 0

function negativeChargeEffect(eff) {
    if (eff === false) return Decimal.max(1, Decimal.sqrt(data.darkness.negativeCharge + 1).div(sacrificedChargeEffect()))
    if (eff === true) return Decimal.max(1, Decimal.log10(data.darkness.negativeCharge + 10).div(sacrificedChargeEffect()))
}

let sacrificedChargeEffect = () => data.darkness.sacrificedCharge > 0 ? (data.darkness.sacrificedCharge+1)*2 : 1

let drainEffect = (i) => getDrainLevel(i) > 0 ? i===1 ? Math.max(0, drain1Effect())
    : Math.max(drainData[i].effect(), 1)
    : i===1 ? 0 : 1
let drainCost = (i) => (10**(1+(data.darkness.totalDrains/2)))*(getDrainLevel(i)+1)
let getDrainLevel = (i) => data.darkness.drains[i]
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
    if(i===0) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(2)
    if(i===1) return D(10).pow(D(4).pow(data.darkness.levels[i]+1).pow(D(1.5)))
    if(i===2) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(3)
}

let dupData = [
    {
        text: "Multiply AutoBuyer speed by 1.5x",
        sign: 'x',
        extraLevels: () => 0,
        cost: ()=> D(1e30).times(dupScaling(0)).pow(1/getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? (1.5*purificationEffect(0))**(getTotalDUPLevels(0)) : 1
    },
    {
        text: 'Double Dynamic Cap',
        sign: 'x',
        extraLevels: () => iup11Effect(),
        cost: ()=> D(1e15).times(dupScaling(1)).pow(1/getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? hasSingFunction(6) ? 4**(getTotalDUPLevels(1)) : 2**data.darkness.levels[1] : 1
    },
    {
        text: `Increase both Hierarchy Effect exponents`,
        sign: '+',
        extraLevels: () => alephNullEffects[1](),
        cost: ()=> D(1e100).times(dupScaling(2)).pow(1/getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? getTotalDUPLevels(2)+1 : 1
    }
]

function buyDrain(i) {
    if (!hasCUP(i)) return showNotification("The Cardinal Upgrade must be purchased before being drained!")
    if (data.darkness.negativeCharge < drainCost(i)) return showNotification("Insufficient Negative Charge")

    data.darkness.negativeChargeSpent += drainCost(i)
    data.darkness.negativeCharge -= drainCost(i)
    ++data.darkness.drains[i]
    ++data.darkness.totalDrains

    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }
}

function buyDUP(i){
    if(data.chal.decrementy.gte(dupData[i].cost())){
        data.chal.decrementy = data.chal.decrementy.sub(dupData[i].cost())
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
    if(mode === 5){
        data.obliterate.unstableFactorState[1] = !data.obliterate.unstableFactorState[1]
        DOM('dupC5').innerHTML = `${formatBool(!data.obliterate.unstableFactorState[1], 'EDT')} the Second Unstable Factor`
    }
    updateDarknessControlHTML(mode)
}

function darkenConfirm(){
    if(!data.sToggles[11]) return darken()
    data.darkness.darkened
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy and force a Booster Reset.', 'No thanks.', 'For sure!', darken)
        : createConfirmation('Are you certain?', 'Darkening will perform a Booster Reset and trap you in Challenge 8. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darken)
}
function darken(force = false){
    if(data.baseless.baseless) return
    data.darkness.darkened && !force ? chalExit(true) : chalEnter(7, true)

    data.darkness.darkened = !data.darkness.darkened
    updateDarknessDepthHTML()
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

function resetDarkness(force = false){
    data.darkness.darkened = false
    for (let i = 0; i < 3; i++) {
        data.darkness.levels[i] = (hasPassiveUpgrade(10+i) || hasSluggishMilestone(3)) ? data.darkness.levels[i] : 0
    }
    data.darkness.negativeCharge = 0
    if(!hasSingFunction(1)) data.darkness.drains = Array(7).fill(0)
    if(!data.boost.unlocks[4]){
        data.darkness.sacrificedCharge = 0
        updateDarknessControlHTML(2)
    }
    if(!hasSingFunction(1)) data.darkness.totalDrains = 0
    //data.darkness.negativeChargeEnabled = false
    updateDarknessHTML()
    updateAllDUPHTML()
    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }
    updateDarknessDepthHTML()
}

let getExtraDUPLevels = (i) => dupData[i].extraLevels()
let getTotalDUPLevels = (i) => data.darkness.levels[i]+getExtraDUPLevels(i)
