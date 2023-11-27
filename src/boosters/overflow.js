/*
    This code ALSO needs a refactor!
    I hate this
    -Flame, 11/24/23
*/

function updateOverflowHTML(){
    DOM(`boosterText2`).innerText =  `You have ${getExtraBoosters()} Excess Boosters, producing`
    DOM(`boosterPower`).innerText = ` ${format(getOverflowGain(0))} Booster Power/s`
    DOM(`bpTotal`).innerText = `Your ${format(data.overflow.bp)} Booster Power is`

    DOM(`chargeText2`).innerText =  `You have ${getExtraCharge()} Excess Charge, producing`
    DOM(`overCharge`).innerText = ` ${format(getOverflowGain(1))} Overcharge/s`
    DOM(`ocTotal`).innerText = `Your ${format(data.overflow.oc)} Overcharge is`

    for (let i = 0; i < 8; i++) {
        DOM(`bp${i}Effect`).innerText = (i===2 && data.overflow.thirdEffect) || i===5 ? `/${format(getOverflowEffect(i))}` : `${format(getOverflowEffect(i))}x`
    }
}

let maxNonOverflowBoosters = boostersAtGivenFB(29)
let getExtraBoosters = () => Math.max(0, data.boost.total-maxNonOverflowBoosters)
let getExtraCharge = () => Math.max(0, data.incrementy.totalCharge-12)

function getOverflowGain(i){
    if (i === 0) return (Math.sqrt(getExtraBoosters())/10)*alephEffect(6)*purificationEffect(2)
    return (Math.sqrt(getExtraCharge())/10)*purificationEffect(2)
}

function getOverflowEffect(i, depth=0){
    if(data.overflow.bp === 1 && i < 3 && data.overflow.oc === 1) return 1
    switch (i) {
        case 0:
            return Math.max(1, (Math.pow(data.overflow.bp, 1/8))*getOverflowEffect(4))
        case 1:
            return Math.max(1, (Math.sqrt(data.overflow.bp)*opMult())*getOverflowEffect(4))
        case 2:
            return Math.max(1, (Math.sqrt(data.overflow.bp+1))*getOverflowEffect(4))
        case 3:
            return data.overflow.oc > 1 ? Math.max(1, Math.sqrt(data.overflow.oc)*cupData[5].effect()*getAOMEffect(2)) : 1
        case 4:
            return data.overflow.oc > 1 ? Math.max(1, Math.log10(data.overflow.oc+1))*getSingFunctionEffect(3) : 1
        case 5:
            return data.overflow.oc > 1 && data.collapse.hasCUP[5] ? Math.max(1, Math.pow(data.overflow.oc, 1/16)) : 1

        case 6:
            return data.overflow.oc > 1 && data.omega.bestRemnants >= 750 ? Math.max(1, 1+(Math.log2(2+data.overflow.oc)/100)) : 1
        case 7:
            return data.overflow.oc > 1 && hasAOMilestone(2) ? Math.max(1, Math.pow(data.overflow.oc, 1/4)) : 1
        default: return NaN
    }
}