function updateDarknessHTML(){
    DOM('nchargeText1').innerText = `You have ${format(data.darkness.negativeCharge)} Negative Charge [+${format(negativeChargeGain())}/s], which is capped by Incrementy at ${format(negativeChargeCap())}`
    DOM('nchargeText2').innerText = `Your Negative Charge divides Incrementy gain by /${format(negativeChargeEffect(false))} and Incrementy effect by /${format(negativeChargeEffect(true))}`
}

function updateDarknessControlHTML(mode){
    switch (mode) {
        case 0:
            DOM('dupC0').innerText = `${boolToReadable(!data.darkness.negativeChargeEnabled, 'EDL')} Negative Charge gain`
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
    for (let i = 0; i < 3; i++) {
        updateDarknessControlHTML(i)        
    }
}

let negativeChargeGain = () => data.darkness.darkened && data.darkness.negativeChargeEnabled ? Math.max(0, Math.log10(data.chal.decrementy+1)/5) : 0
let negativeChargeCap = () => Math.pow(data.incrementy.amt, 1/3)

function negativeChargeEffect(eff){
    if(eff == false) return Math.sqrt(data.darkness.negativeCharge+1)/sacrificedChargeEffect()
    if(eff == true) return Math.log10(data.darkness.negativeCharge+10)/sacrificedChargeEffect()
 }

let sacrificedChargeEffect = () => data.darkness.sacrificedCharge > 0 ? (data.darkness.sacrificedCharge+1)*2 : 1

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
        ? createConfirmation('Are you certain?', 'Exiting the Darkness will stop the generation of Negative Charge and Decrementy (you can still buy Dark Upgrades) and force a Booster Reset.', 'No thanks.', 'For sure!', darken)
        : createConfirmation('Are you certain?', 'Darkening will preform a Booster Reset and trap you in Challenge 8. Darkening will also Invert the effect of Booster Power effect 3. However, you will also gain the ability to generate Negative Charge.', 'No thanks.', 'For sure!', darken)
}
function darken(){
    data.darkness.darkened ? chalExit() : chalEnter(7)

    DOM('darken').innerText = data.darkness.darkened ? 'Enter the Darkness' : 'Escape'
    data.darkness.darkened = !data.darkness.darkened

    DOM('bp2Description').innerText = data.darkness.darkened ? 'Multiplying Decrementy Gain by ' : 'Dividing Decrementy Gain by '
}