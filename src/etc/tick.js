let timesToLoop = [0,0, 0,0]

let t1Auto = () => (factorBoost()*bup5Effect()*alephEffect(0))**cupEffect(1)*cupEffect(3)*singBoostToBaseless()

let t2AutoPure = () => 1*chalEffectTotal()*bup5Effect()*incrementyMult()*iup6Effect()*bup48Effect()*hupData[5].effect()
    *alephEffect(1)*cupEffect(0)*cupEffect(3)*dupEffect(0)

let t2Auto = () => t2AutoPure()**singEffects[2].effect()


function tick(diff){
    // TODO: PSI Check, probably doesn't need to be on tick()
    if(!data.ord.isPsi && data.ord.ordinal.gte(PSI_VALUE) && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = D(4)
    }

    // Check for Challenge Completion
    chalComplete()

    //Automation Tier 1
    for (let i = 0; i < 2; i++) timesToLoop[i] += !data.chal.active[4]
        ? (diff*(data.autoLevels[i]+extraT1())*t1Auto()*data.dy.level)/data.chal.decrementy
        : (diff*(data.autoLevels[i]+extraT1())*t1Auto()/data.dy.level)/data.chal.decrementy

    for (let i = 2; i < 4; i++) timesToLoop[i] = data.boost.hasBUP[autoUps[i-2]]
        ? t2Auto()
        : 0

    if(Math.floor(timesToLoop[0]/1000) >= 1){
        successor(timesToLoop[0]/1000)
        timesToLoop[0] -= Math.floor(timesToLoop[0]/1000)*1000
    }
    if(isNaN(timesToLoop[0]) || timesToLoop[0] < 0) timesToLoop[0] = 0

    if(Math.floor(timesToLoop[1]/1000) >= 1){
        maximize()
        timesToLoop[1] -= Math.floor(timesToLoop[1]/1000)*1000
    }
    if(isNaN(timesToLoop[1]) || timesToLoop[1] < 0) timesToLoop[1] = 0

    // Automation Tier 2
    // BuyMax Autobuyer
    if(timesToLoop[2]>=1 && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3 || data.baseless.baseless) && data.autoStatus.enabled[0]){
        buyMaxT1()
    }

    // Markup Autobuyer
    let collapseCheck = data.ord.ordinal.lt(BHO_VALUE) || data.collapse.times > 0
    let boostCheck = data.boost.times > 0
    if(timesToLoop[3] >= 1 && data.ord.isPsi && data.autoStatus.enabled[1] && !boostCheck && data.ord.isPsi) data.ord.ordinal = D(GRAHAMS_VALUE)
    if(timesToLoop[3]>=1 && data.ord.isPsi && data.autoStatus.enabled[1] && collapseCheck && boostCheck) markup(timesToLoop[3]*diff/1000)

    // Automation Tier 2: Post-Collapse
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[2]) sacrificeIncrementy() //Charge Autobuyer
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[3]){ // Repeatable IUP Autobuyer
        for (let i = 0; i < 3; i++) {
            buyIUP(i, true)
        }
    }
    if(data.collapse.hasSluggish[3] && data.autoStatus.enabled[4]){ // Repeatable HUP Autobuyer
        for (let i = 0; i < data.hierarchies.rebuyableAmt.length; i++) {
            buyHBuyable(i)
        }
    }
    if(hasSingFunction(0) && data.autoStatus.enabled[5]){ // BUP + Supercharge AutoBuyer
        if(!data.boost.hasBUP[5] || chargeAutoCheck()) buyBUP(5, false, data.autoStatus.enabled[6]&&hasSingFunction(3))
        if(!data.boost.hasBUP[10] || chargeAutoCheck()) buyBUP(10, false, data.autoStatus.enabled[6]&&hasSingFunction(3))
        if(!data.boost.hasBUP[0] || chargeAutoCheck()) buyBUP(0, false, data.autoStatus.enabled[6]&&hasSingFunction(3))
        for (let i = 1; i < 5; i++) {
            let isBottom = i===4
            for (let j = 0; j < 3; j++) {
                if(!data.boost.hasBUP[i+(5*j)] || chargeAutoCheck()) buyBUP(i+(5*j), isBottom, data.autoStatus.enabled[6]&&hasSingFunction(3))
            }
        }
    }

    // Automation Tier 3
    let inSluggish = false
    if (data.boost.times === 2 && !data.collapse.hasSluggish[4]) inSluggish = true
    if(data.collapse.hasSluggish[3] && data.collapse.apEnabled[0] && data.ord.base > 3) factorShift()
    if(data.collapse.hasSluggish[3] && data.collapse.apEnabled[1] && data.boost.times < boostTimesLimit && !inSluggish) boost(false, true)

    // Increase Hierarchies
    if(data.boost.unlocks[2]) increaseHierarchies(diff)

    // TODO: Check for "Base is Always 5/4 in Challenges", probably doesn't need to be on tick()
    if(data.chal.active.includes(true) && data.boost.hasBUP[2]) data.ord.base = bup2Effect()

    // Unlock Booster Features
    boosterUnlock()
}

// Used for Charge AutoBuyer
let chargeAutoCheck = (i) => !data.boost.isCharged[i] && data.autoStatus.enabled[6] && hasSingFunction(3)
