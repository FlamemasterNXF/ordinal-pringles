function updateOverflowHTML(){
    DOM(`boosterText2`).innerText =  `You have ${getExtraBoosters()} Excess Boosters, producing`
    DOM(`boosterPower`).innerText = ` 0 Booster Power/s`
    DOM(`bpTotal`).innerText = `Your ${format(data.overflow.bp)} Booster Power is`

    DOM(`chargeText2`).innerText =  `You have ${getExtraCharge()} Excess Charge, producing`
    DOM(`overCharge`).innerText = ` 0 Overcharge/s`
    DOM(`ocTotal`).innerText = `Your ${format(data.overflow.oc)} Overcharge is`

    for (let i = 0; i < 5; i++) {
        DOM(`bp${i}Effect`).innerText = i==2 ? `/${getOverflowEffect()}` : `${getOverflowEffect()}x`
    }
}

let maxNonOverflowBoosters = boostersAtGivenFB(27)
let getExtraBoosters = () => Math.max(0, data.boost.total-maxNonOverflowBoosters)
let getExtraCharge = () => Math.max(0, data.incrementy.charge-12)

function getOverflowEffect(){
    return 2
}