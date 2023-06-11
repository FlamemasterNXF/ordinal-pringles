function updateDarknessHTML(){
    DOM('nchargeText1').innerText = `You have ${format(data.darkness.negativeCharge)} Negative Charge [+${format(negativeChargeGain())}/s], which is capped by Incrementy at ${format(negativeChargeCap())}`
    DOM('nchargeText2').innerText = `Your Negative Charge divides Incrementy gain by /${format(negativeChargeEffect(false))} and Incrementy effect by /${format(negativeChargeEffect(true))}`
}

function updateDarknessControlHTML(mode){
    switch (mode) {
        case 0:
            DOM('dupC0').innerText = `${boolToReadable(!data.darkness.negativeChargeEnabled, 'EDT')} Negative Charge gain`
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
    DOM(`dup${i}`).innerText = `${dupData[i].text} (${data.darkness.levels[i]})\n${format(dupData[i].cost())} Decrementy\nCurrently: +${format(dupData[i].effect())}x`
}
function updateAllDUPHTML(){
    for (let i = 0; i < data.darkness.levels.length; i++) {
        updateDUPHTML(i)
    }
}

function updateDrainHTML(i){
    DOM(`drain${i}`).innerText = `Drain this Cardinal Upgrade (${data.darkness.drains[i]})\n${format(drainCost(i))} Negative Charge`
}

let negativeChargeGain = () => data.darkness.darkened && data.darkness.negativeChargeEnabled ? Math.max(0, Decimal.log10(data.chal.decrementy.plus(1))/5) : 0
let negativeChargeCap = () => Math.pow(data.incrementy.amt, 1/3)

function negativeChargeEffect(eff){
    if(eff == false) return Math.sqrt(data.darkness.negativeCharge+1)/sacrificedChargeEffect()
    if(eff == true) return Math.log10(data.darkness.negativeCharge+10)/sacrificedChargeEffect()
 }

let sacrificedChargeEffect = () => data.darkness.sacrificedCharge > 0 ? (data.darkness.sacrificedCharge+1)*2 : 1

let drainEffect = (i) => data.darkness.drains[i] > 0 ? Math.max(drainData[i].effect(), 1) : 1
let drainCost = (i) => (10**data.darkness.drains[i])**(1+(data.darkness.totalDrains/10))
let drainData = [
    { effect: () => 2*data.darkness.drains[0] },
    { effect: () => 1.1*data.darkness.drains[1] },
    { effect: () => 1.5*data.darkness.drains[2] },
    { effect: () => 2*data.darkness.drains[3] },
    { effect: () => 5*data.darkness.drains[4] },
    { effect: () => 1.2*data.darkness.drains[5] },
    { effect: () => 2*data.darkness.drains[6] },
]

let dupEffect = (i) => Math.max(1, dupData[i].effect())
let dupData = [
    { text: "Add a 1.2x Multiplier to AutoBuyers", cost: ()=> D(1e30*Math.floor(2*(data.darkness.levels[0]/10))).pow((data.darkness.levels[0]+(D(1)))), effect: ()=> 1.2*data.darkness.levels[0] },
    { text: "Add a 2x Multiplier to Dynamic Gain", cost: ()=> D(1e15*Math.floor(2*(data.darkness.levels[1]/10))).pow((data.darkness.levels[1]+(D(1)))), effect: ()=> 2*data.darkness.levels[1] },
    { text: "Add 0.1 to both Hierarchy Effect exponents", cost: ()=> D(1e100*Math.floor(2*(data.darkness.levels[2]/10))).pow((data.darkness.levels[2]+(D(1)))), effect: ()=> 0.1*data.darkness.levels[2] }
]

function buyDrain(i){
    if(!data.collapse.hasCUP[i]) return createAlert("Failure.", "The Cardinal Upgrade must be purchased before being drained!", "Oops.")
    if(data.darkness.negativeCharge < drainCost(i)) return createAlert("Failure.", "Insufficient Negative Charge", "Dang.")

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

function darknessControl(mode){
    if(mode==0) data.darkness.negativeChargeEnabled = !data.darkness.negativeChargeEnabled
    if(mode==1){
        data.darkness.negativeCharge = 0
        darknessControl(3)
    }
    if(mode==2){
        if(data.incrementy.charge > 0){
            --data.incrementy.charge
            --data.incrementy.totalCharge
            ++data.darkness.sacrificedCharge
        }
    }
    if(mode==3){
        boosterReset()
        data.incrementy.totalCharge += data.darkness.sacrificedCharge
        data.incrementy.charge += data.darkness.sacrificedCharge
        data.darkness.sacrificedCharge = 0
        updateDarknessControlHTML(2)
        if(data.darkness.negativeChargeEnabled) darknessControl(0)
    }
    updateDarknessControlHTML(mode)
}

function darkenConfirm(){
    data.darkness.darkened
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy and force a Booster Reset.', 'No thanks.', 'For sure!', darken)
        : createConfirmation('Are you certain?', 'Darkening will preform a Booster Reset and trap you in Challenge 8. Darkening will also Invert the effect of Booster Power effect 3. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darken)
}
function darken(force = false){
    data.darkness.darkened && !force ? chalExit(true) : chalEnter(7, true)

    DOM('darken').innerText = data.darkness.darkened ? 'Enter the Darkness' : 'Escape'
    data.darkness.darkened = !data.darkness.darkened

    DOM('bp2Description').innerText = data.darkness.darkened ? 'Multiplying Decrementy Gain by ' : 'Dividing Decrementy Gain by '
}