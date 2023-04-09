function updateOverflowHTML(){
    DOM(`boosterText2`).innerText =  `You have ${getExtraBoosters()} Excess Boosters, producing`
    DOM(`boosterPower`).innerText = ` 0 Booster Power/s`
    DOM(`bpTotal`).innerText = `Your ${format(data.overflow.bp)} Booster Power is`
}

const overflowEffectRequirements = [1e3, 1e10, 1e100]

let maxNonOverflowBoosters = boostersAtGivenFB(27)
let getExtraBoosters = () => data.boost.total-maxNonOverflowBoosters