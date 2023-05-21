function updateDarknessHTML(){
    DOM('nchargeText1').innerText = `You have ${format(data.darkness.negativeCharge)} Negative Charge [+${format(negativeChargeGain())}/s], which is capped by Incrementy at ${format(negativeChargeCap())}`
    DOM('nchargeText2').innerText = `Your Negative Charge divides Incrementy gain by /${format(negativeChargeEffect(false))} and Incrementy effect by /${format(negativeChargeEffect(true))}`
}

let negativeChargeGain = () => data.darkness.darkened && data.darkness.negativeChargeEnabled ? Math.max(0, Math.log10(data.chal.decrementy+1)/5) : 0
let negativeChargeCap = () => Math.pow(data.incrementy.amt, 1/3)

function negativeChargeEffect(eff){
    if(eff == false) return Math.sqrt(data.darkness.negativeCharge+1)
    if(eff == true) return Math.log10(data.darkness.negativeCharge+10)
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