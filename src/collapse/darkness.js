function updateDarknessHTML(){
    updateAllDUPHTML()
    updateStabilizationHTML()
    if(data.darkness.darkened) updateDarknessDepthHTML()
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


let stabilizationEffects = [
    {
        effect: () => 0.5*getStabilizationLevels(),
        baseEffect: () => 0,
        desc: 'Increase the Decrementy gain exponent after Ψ(Ω)',
        sign: '+',
    },
    {
        effect: () => 0.1*getStabilizationLevels(),
        baseEffect: () => 0,
        desc: 'Reduce the Decrementy reduction factor',
        sign: '-',
    },
    {
        effect: () => 5**getStabilizationLevels(),
        baseEffect: () => 1,
        desc: 'Decrease the Darkness-ending Incrementy threshold',
        sign: '/',
    },
    {
        effect: () => getStabilizationLevels(),
        baseEffect: () => 0,
        desc: 'After Incrementy reaches the threshold, you are given a grace period',
        sign: 's',
    }
]
let extraStabilizationLevels = () => getHyperchargeEffect(6)+getEUPEffect(1, 3, true)
let getStabilizationLevels = () => data.darkness.stabilization+extraStabilizationLevels()
function getStabilizationCost(){
    const stabilization = data.darkness.stabilization + 1
    const exponent = Math.pow(stabilization, 1/2+(stabilization-2)/11)
    return Decimal.pow(1e6, exponent)
}
function getStabilizationEffect(i, ui = false) {
    if((getDepth() < i || getStabilizationLevels() === 0) && !ui) return stabilizationEffects[i].baseEffect()
    return stabilizationEffects[i].effect()
}
function makeStabilizationText(){
    let text = ''
    for (let i = 0; i < stabilizationEffects.length; i++) {
        const doFormat = i !== 3
        text += i < 3 ? `<br><b>While in Depth ${i+1} or below:</b> ` : `<br><b>While in Depth ${i+1}:</b> `
        text += `${stabilizationEffects[i].desc} [${formatSign(getStabilizationEffect(i, true), stabilizationEffects[i].sign, doFormat)}]`
    }
    return text
}
function updateStabilizationHTML(){
    const levelsText = extraStabilizationLevels() > 0 ? ` + ${extraStabilizationLevels()}` : ''
    DOM(`dbup`).innerHTML = `<b>Anti-Darkness</b> (${data.darkness.stabilization}${levelsText})${makeStabilizationText()}<br><br>Cost: ${format(getStabilizationCost())} Cardinals`
}

function buyStabilization(){
    if(data.collapse.cardinals.lt(getStabilizationCost())) return
    data.collapse.cardinals = data.collapse.cardinals.sub(getStabilizationCost())
    ++data.darkness.stabilization
}

let depthEffects = [
    {
        buff: '',
        nerf: 'You are trapped in Challenge 8',
    },
    {
        buff: 'Greatly boost Negative Charge gain',
        nerf: ', but Decrementy gain is greatly reduced',
        buffEffect: {
            desc: 'Negative Charge gain is enhanced',
            hideEffect: true,
            // NOTE: Due to how this "buff" works, it's actual value should never be queried.
        },
        nerfEffect: {
            desc: 'Decrementy reduction factor: ', // TODO: This is actually a log, should I say so in-game?
            effect: () => 2-getStabilizationEffect(1)
        },
    },
    {
        buff: 'You can now gain Incrementy',
        nerf: `, but it Decays based on your Decrementy and can end Darkness`,
        buffEffect: { // This is scuffed because I didn't want to add the ability to make two nerfs just for this :p
            desc: 'Darkness ends if Incrementy reaches: ',
            effect: () => incrementyGain().div(getStabilizationEffect(2)),
            baseEffect: Infinity
        },
        nerfEffect: {
            desc: `Decay factor: `,
            effect: () => Decimal.log10(data.chal.decrementy+1).pow(getDepthNerf(3))
        }
    },
    {
        buff: 'Decrementy gain exponent is boosted by Cardinals',
        nerf: `, but all Decrementy nerfs and Decay are intensified`,
        buffEffect: {
            desc: 'Decrementy gain exponent increase: ',
            effect: () => Decimal.log10(data.collapse.cardinals+1),
            baseEffect: 0,
        },
        nerfEffect: {
            desc: 'Decay is greatly intensified',
            effect: () => 2,
            hideEffect: true,
        },
    }
]
function updateDarknessDepthHTML(){
    let starter = data.darkness.darkened ? 'Exit' : 'Enter'
    let text = `${starter} the Darkness (Depth ${data.darkness.depth+1})<br><br>You will be trapped in Challenge 8`
    for (let i = 1; i < data.darkness.depth+1; i++) {
        let currentDepth = depthEffects[i]
        if(currentDepth.buffEffect !== undefined){
            text += `<br><span style="color: ${getCSSVariable('darkness-button-depth-effect-text-color')}">${currentDepth.buffEffect.desc}</span>`
            if(!currentDepth.buffEffect.hideEffect) text += format(getDepthBuff(i))
        }
        if(currentDepth.nerfEffect !== undefined){
            text += `<br><span style="color: ${getCSSVariable('darkness-button-depth-effect-text-color')}">${currentDepth.nerfEffect.desc}</span>`
            if(!currentDepth.nerfEffect.hideEffect) text += format(getDepthNerf(i))
        }
    }
    DOM('darken').innerHTML = text
}
function updateDepthSelectHTML(i){
    DOM(`depthDescriptor`).innerHTML = `<span style="color: ${getCSSVariable('depth-description-depth-text-color')}">Depth ${i + 1}${i < 3 ? ' and below' : ''}:</span> ${depthEffects[i].buff}${depthEffects[i].nerf}`
}
function setDarknessDepth(i){
    if(data.darkness.darkened) return
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

let getDepth = () => data.darkness.darkened ? data.darkness.depth : -1
let getDepthNerf = (i) => getDepth() >= i ? depthEffects[i].nerfEffect.effect() : 1
let getDepthBuff = (i) => getDepth() >= i ? depthEffects[i].buffEffect.effect() : depthEffects[i].buffEffect.baseEffect

function negativeChargeGain(){
    if(!data.darkness.darkened || !data.darkness.negativeChargeEnabled) return 0

    let base = getDepth() > 0
        ? Math.max(0, Decimal.log2(data.chal.decrementy.plus(1))**3)
        : Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5)

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
    if(i===0) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(2)
    if(i===1) return D(10).pow(D(4).pow(data.darkness.levels[i]+1).pow(D(1.5)))
    if(i===2) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(3)
}

let dupData = [
    {
        text: "Multiply AutoBuyer speed by 1.5x",
        sign: 'x',
        extraLevels: () => getNormalANREffect(2),
        cost: ()=> D(1e30).times(dupScaling(0)).pow(1/getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? (1.5*purificationEffect(0))**(getTotalDUPLevels(0)) : 1
    },
    {
        text: 'Double Dynamic Cap',
        sign: 'x',
        extraLevels: () => Math.floor(iup11Effect()+getNormalANREffect(2)),
        cost: ()=> D(1e15).times(dupScaling(1)).pow(1/getOverflowEffect(5)),
        effect: ()=> isTabUnlocked('darkness') ? 2**getTotalDUPLevels(1) : 1
    },
    {
        text: `Multiply both Hierarchy Effect exponents`,
        sign: 'x',
        extraLevels: () => getNormalANREffect(2),
        cost: ()=> D(1e100).times(dupScaling(2)).pow(1/getOverflowEffect(5)),
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
    updateDarknessControlHTML(mode)
}

function darkenConfirm(){
    if(!getSimpleSetting('darknessConfirmation')) return darken()
    data.darkness.darkened
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy and force a Booster Reset.', 'No thanks.', 'For sure!', darken)
        : createConfirmation('Are you certain?', 'Darkening will perform a Booster Reset and trap you in Challenge 8. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darken)
}
function darken(force = false){
    if(data.baseless.baseless) return
    data.darkness.darkened && !force ? chalExit(true) : chalEnter(7, true)
    data.darkness.darkened = !data.darkness.darkened

    if(data.darkness.darkened && hasPassiveHypercharge(3)){
        data.markup.shifts = 7
        data.ord.base = 3
        data.ord.ordinal = D(4)
        data.ord.isPsi = true
    }

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
        const passiveSave = i < 2 ? hasPassiveUpgrade(10) : hasPassiveUpgrade(12)
        data.darkness.levels[i] = (passiveSave || hasSluggishMilestone(3)) ? data.darkness.levels[i] : 0
    }

    if(!data.boost.unlocks[4]) data.darkness.negativeCharge = 0
    if(!hasPassiveHypercharge(1)) data.darkness.drains = Array(7).fill(0)
    if(!hasPassiveHypercharge(1)) data.darkness.totalDrains = 0

    //data.darkness.negativeChargeEnabled = false
    updateDarknessHTML()
    updateAllDUPHTML()
    updateAllDrainHTML()
    updateDarknessDepthHTML()
}

let getExtraDUPLevels = (i) => dupData[i].extraLevels()
let getTotalDUPLevels = (i) => data.darkness.levels[i]+getExtraDUPLevels(i)
