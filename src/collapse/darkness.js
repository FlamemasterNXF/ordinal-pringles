function updateDarknessHTML(){
    DOM('nchargeText1').innerText = `You have ${format(data.darkness.negativeCharge)} Negative Charge [+${format(negativeChargeGain())}/s], which is capped by Incrementy at ${format(negativeChargeCap())}`
    DOM('nchargeText2').innerText = `Your Negative Charge divides Incrementy gain by /${format(negativeChargeEffect(false))} and Incrementy effect by /${format(negativeChargeEffect(true))}`
}

function updateDarknessControlHTML(mode){
    switch (mode) {
        case 0:
            DOM('dupC0').innerText = `${formatBool(!data.darkness.negativeChargeEnabled, 'EDT')} Negative Charge gain`
            break;
        case 1:
            DOM('dupC1').innerText = `Reset Negative Charge`
            break;
        case 2:
            DOM('dupC2').innerHTML = `Sacrifice 1 Charge<br>Your <b>${data.darkness.sacrificedCharge}</b> Sacrificed Charge is dividing the Negative Charge effects by <b>/${format(sacrificedChargeEffect())}</b>`
            break;
        case 3:
            DOM('dupC3').innerText = `Reset Sacrificed Charge`
            break;
        default:
            break;
    }
}
function updateAllDarknessControlHTML(){
    for (let i = 0; i < 4; i++) {
        updateDarknessControlHTML(i)
    }
}

function updateDUPHTML(i){
    DOM(`dup${i}`).innerText = `${dupData[i].text} (${data.darkness.levels[i]} + ${formatWhole(getExtraDUPLevels(i))})\n${format(dupData[i].cost())} Decrementy\nCurrently: ${format(dupEffect(i))}x`
}
function updateAllDUPHTML(){
    for (let i = 0; i < data.darkness.levels.length; i++) {
        updateDUPHTML(i)
    }
}

function updateDrainHTML(i){
    DOM(`drain${i}`).innerText = `Drain this Cardinal Upgrade (${data.darkness.drains[i]})\n${format(drainCost(i))} Negative Charge`
}

let negativeChargeGain = () => data.darkness.darkened && data.darkness.negativeChargeEnabled ? Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5)*(iup10Effect()) : 0
let negativeChargeCap = () => Math.min(Decimal.pow(data.incrementy.amt, 1/3).toNumber()*(iup10Effect()), Number.MAX_VALUE)

function negativeChargeEffect(eff){
    if(eff === false) return Decimal.sqrt(data.darkness.negativeCharge+1).div(sacrificedChargeEffect())
    if(eff === true) return Decimal.log10(data.darkness.negativeCharge+10).div(sacrificedChargeEffect())
 }

let sacrificedChargeEffect = () => data.darkness.sacrificedCharge > 0 ? (data.darkness.sacrificedCharge+1)*2 : 1

let drainEffect = (i) => data.darkness.drains[i] > 0 ? i===1 ? Math.max(0, drain1Effect())
    : Math.max(drainData[i].effect(), 1)
    : i===1 ? 0 : 1
let drainCost = (i) => (10**(1+(data.darkness.totalDrains/2)))*(data.darkness.drains[i]+1)
let drainData = [
    { effect: () => 2*data.darkness.drains[0] },
    { effect: () => drain1Effect() },
    { effect: () => 1.5*data.darkness.drains[2] },
    { effect: () => 2*data.darkness.drains[3] },
    { effect: () => 5*data.darkness.drains[4] },
    { effect: () => 1.2*data.darkness.drains[5] },
    { effect: () => 2*data.darkness.drains[6] },
]

let dupEffect = (i) => inPurification(0) ? 1 : Math.max(1, dupData[i].effect())
function dupScaling (i){
    if(i===0) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(2)
    if(i===1) return D(10).pow(D(4).pow(data.darkness.levels[i]+1).pow(D(1.5)))
    if(i===2) return D(10).pow(D(3).pow(data.darkness.levels[i]+1)).pow(3)
}
let dupData = [
    { text: "Multiply AutoBuyer speed by 1.5x", cost: ()=> D(1e30).times(dupScaling(0)).pow(1/getOverflowEffect(5)), effect: ()=> (1.5*purificationEffect(0))**(data.darkness.levels[0]+getExtraDUPLevels(0)) },
    { text: 'Double Dynamic Cap', cost: ()=> D(1e15).times(dupScaling(1)).pow(1/getOverflowEffect(5)), effect: ()=> hasSingFunction(6) ? 4**(data.darkness.levels[1]+getExtraDUPLevels(1)) : 2**data.darkness.levels[1]},
    { text: "Multiply both Hierarchy Effect exponents by 1.1x", cost: ()=> D(1e100).times(dupScaling(2)).pow(1/getOverflowEffect(5)), effect: ()=> 1.1**(data.darkness.levels[2]+getExtraDUPLevels(2)) }
]
let extraDUPLevels = [
    () => 0,
    () => iup11Effect(),
    () => alephNullEffects[1]()
]

function buyDrain(i) {
    if (!data.collapse.hasCUP[i]) return createAlert("Failure.", "The Cardinal Upgrade must be purchased before being drained!", "Oops.")
    if (data.darkness.negativeCharge < drainCost(i)) return createAlert("Failure.", "Insufficient Negative Charge", "Dang.")

    data.darkness.chargeSpent += drainCost(i)
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
let getTotalDUPs = () => data.darkness.levels[0]+data.darkness.levels[1]+data.darkness.levels[2]

function darknessControl(mode){
    if(data.baseless.baseless) return createAlert('Illegal Move', 'You cannot access Darkness Controls in the Baseless Realms', 'Dang.')
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
        updateDarknessControlHTML(2)
    }
    updateDarknessControlHTML(mode)
}

function darkenConfirm(){
    if(!data.sToggles[11]) return darken()
    data.darkness.darkened
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy and force a Booster Reset.', 'No thanks.', 'For sure!', darken)
        : createConfirmation('Are you certain?', 'Darkening will preform a Booster Reset and trap you in Challenge 8. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darken)
}
function chargeSacConfirm(){
    if(!data.sToggles[12]) return darknessControl(2)
    createConfirmation('Are you sure?', 'Sacrificing Charge will not only consume 1 Charge but also remove it from the Total Charge amount!', 'Keep it!', 'Begone!', darknessControl, 2)
}
function darken(force = false){
    if(data.baseless.baseless) return
    data.darkness.darkened && !force ? chalExit(true) : chalEnter(7, true)

    DOM('darken').innerText = data.darkness.darkened ? 'Enter the Darkness' : 'Escape'
    data.darkness.darkened = !data.darkness.darkened
}

function respecDrains(){
    data.darkness.negativeCharge += data.darkness.chargeSpent
    data.darkness.chargeSpent = 0
    data.darkness.totalDrains = 0
    for (let i = 0; i < data.darkness.drains.length; i++) {
        data.darkness.drains[i] = 0
        updateDrainHTML(i)
    }
}

function resetDarkness(force = false){
    data.darkness.darkened = false
    if(!data.collapse.hasSluggish[3]) data.darkness.levels = Array(3).fill(0)
    data.darkness.negativeCharge = 0
    if(!hasSingFunction(1)) data.darkness.drains = Array(7).fill(0)
    if(!data.boost.unlocks[4]) data.darkness.sacrificedCharge = 0
    if(!hasSingFunction(1)) data.darkness.totalDrains = 0
    //data.darkness.negativeChargeEnabled = false
    updateDarknessHTML()
    updateAllDUPHTML()
    for (let i = 0; i < drainData.length; i++) {
        updateDrainHTML(i)
    }
    DOM('darken').innerText = data.darkness.darkened ? 'Escape' : 'Enter the Darkness'
}

let getExtraDUPLevels = (i) => extraDUPLevels[i]()
