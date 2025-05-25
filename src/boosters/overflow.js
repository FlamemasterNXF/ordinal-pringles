/*
    This code ALSO needs a refactor!
    I hate this
    -Flame, 11/24/23
*/

function updateOverflowHTML(){
    DOM(`boosterText2`).innerText =  `You have ${format(getExtraBoosters())} Excess Boosters, producing`
    DOM(`boosterPower`).innerText = ` ${format(getBoosterPowerGain())} Booster Power/s`
    DOM(`bpTotal`).innerText = `Your ${format(data.overflow.bp)} Booster Power is`

    DOM(`chargeText2`).innerText =  `You have ${getExtraCharge()} Excess Charge, producing`
    DOM(`overCharge`).innerText = ` ${format(getOverchargeGain())} Overcharge/s`
    DOM(`ocTotal`).innerText = `Your ${format(data.overflow.oc)} Overcharge is`

    for (let i = 0; i < 7; i++) {
        DOM(`bp${i}Effect`).innerText = (i===2 && data.overflow.thirdEffect) || i===5 ? `/${format(getOverflowEffect(i))}` : `${format(getOverflowEffect(i))}x`
    }
}

let maxNonOverflowBoosters = boostersAtGivenFB(29)
let getExtraBoosters = () => Math.max(0, data.boost.total-maxNonOverflowBoosters)
let getExtraCharge = () => Math.max(0, data.incrementy.totalCharge-12)

function getBoosterPowerGain(){
    return (Math.sqrt(getExtraBoosters())/10)*(getAlephEffect(6).toNumber())*purificationEffect(2)
}

function getOverchargeGain(){
    const exponent = 0.5 + getHyperchargeEffect(9)
    return (Math.pow(getExtraCharge(), exponent)/10)*purificationEffect(2)
}

function getOverflowEffect(i){
    if(data.overflow.bp === 1 && i < 3 && data.overflow.oc === 1) return 1
    switch (i) {
        case 0:
            return Math.max(1, (Math.pow(data.overflow.bp, 1/8))*getOverflowEffect(4))
        case 1:
            return Math.max(1, (Math.sqrt(data.overflow.bp)*(opMult().toNumber()))*getOverflowEffect(4))
        case 2:
            return Math.max(1, (Math.sqrt(data.overflow.bp+1))*getOverflowEffect(4))
        case 3:
            return data.overflow.oc > 1 ? Math.max(1, Math.sqrt(data.overflow.oc)*getCUPEffect(5)*getAOMEffect(2)) : 1
        case 4:
            return data.overflow.oc > 1 ? Math.max(1, Math.log10(data.overflow.oc+1)) : 1
        case 5:
            return data.overflow.oc > 1 && hasCUP(5) ? Math.max(1, Math.pow(data.overflow.oc, 1/16)) : 1
        case 6:
            return data.overflow.oc > 1 && hasAOMilestone(2) ? Math.max(1, Math.pow(data.overflow.oc, 1/4)) : 1
        default: return NaN
    }
}