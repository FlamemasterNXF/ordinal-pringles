let timesToLoop = [0,0, 0,0]

let t1Auto = () => D(factorBoost()).mul(bup5Effect()).mul(alephEffect(0)).pow(cupEffect(1)).mul(cupEffect(3)).mul(singBoostToBaseless())

let t2AutoPure = () => D(1).times(chalEffectTotal()).times(bup5Effect()).times(incrementyMult()).times(iup6Effect())
    .times(bup48Effect()).times(hupData[5].effect()).times(alephEffect(1)).times(cupEffect(0)).times(cupEffect(3))
    .times(dupEffect(0))

let t2Auto = () => t2AutoPure().pow(singEffects[2].effect())


function tick(diff){
    // TODO: PSI Check, probably doesn't need to be on tick()
    if(!data.ord.isPsi && data.ord.ordinal.gte(PSI_VALUE) && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = D(4)
    }

    // Check for Challenge Completion
    chalComplete()

    //Automation Tier 1
    for (let i = 0; i < 2; i++) timesToLoop[i] = D(timesToLoop[i]).add(!data.chal.active[4]
        ? D(diff).mul(D(data.autoLevels[i]).add(extraT1())).mul(t1Auto()).mul(data.dy.level).div(data.chal.decrementy)
        : D(diff).mul(D(data.autoLevels[i]).add(extraT1())).mul(t1Auto()).div(data.dy.level).div(data.chal.decrementy))

    timesToLoop[2] = data.boost.hasBUP[autoUps[0]] ? D(1) : D(0)
    timesToLoop[3] = data.boost.hasBUP[autoUps[1]] ? t2Auto() : D(0)

    if(Decimal.floor(D(timesToLoop[0]).div(1000)).gte(1)) {
        successor()
        timesToLoop[0] = D(timesToLoop[0]).sub(1000)
    }
    if(isNaN(D(timesToLoop[0]).toNumber()) || D(timesToLoop[0]).lt(0)) timesToLoop[0] = D(0)

    if(Decimal.floor(D(timesToLoop[1]).div(1000)).gte(1)) {
        maximize()
        timesToLoop[1] = D(timesToLoop[1]).sub(1000)
    }
    if(isNaN(D(timesToLoop[1]).toNumber()) || D(timesToLoop[1]).lt(0)) timesToLoop[1] = D(0)
    if (!data.ord.isPsi) { // the rest of successor / maximize if they can be used (non-psi)
        if (Decimal.floor(D(timesToLoop[0]).div(1000)).gte(1)) { // if there are more successors
            if (Decimal.floor(D(timesToLoop[1]).div(1000)).gte(1)) { // if there are also matching # of maximizes, do both
                data.ord.over = 0
                successor(Decimal.max(Decimal.min(Decimal.floor(D(timesToLoop[0]).div(1000)), D(data.ord.base).mul(Decimal.floor(D(timesToLoop[1]).div(1000))))),0)
            } else {
                if (Decimal.floor(D(timesToLoop[0]).div(1000)).gte(D(data.ord.base).sub(D(data.ord.ordinal).mod(data.ord.base)))) { // stop at ordinal % (base - 1) and spill the rest to over
                    let ord1 = D(data.ord.base).sub(data.ord.ordinal.mod(data.ord.base)).sub(1) //(data.ord.base - (data.ord.ordinal % data.ord.base)) - 1
                    successor(ord1)
                    let ordOver = (Decimal.floor(D(timesToLoop[0]).div(1000)).sub(ord1).toNumber())
                    if (isFinite(ordOver)) data.ord.over += D(ordOver).toNumber()
                } else { // add the rest
                    successor(Decimal.floor(D(timesToLoop[0]).div(1000)))
                }
            }
        }
    }
    timesToLoop[0] = D(timesToLoop[0]).sub(Decimal.floor(D(timesToLoop[0]).div(1000)).mul(1000))
    timesToLoop[1] = D(timesToLoop[1]).sub(Decimal.floor(D(timesToLoop[1]).div(1000)).mul(1000))

    // Automation Tier 2
    // BuyMax Autobuyer
    if(timesToLoop[2].gte(1) && (data.markup.powers < fsReqs[data.markup.shifts] || data.ord.base === 3 || data.baseless.baseless) && data.autoStatus.enabled[0]){
        buyMaxT1()
    }

    // Markup Autobuyer
    let collapseCheck = data.ord.ordinal.lt(BHO_VALUE) || data.collapse.times > 0
    let boostCheck = data.boost.times > 0 || data.collapse.hasSluggish[0]
    if(timesToLoop[3].gte(1) && data.ord.isPsi && data.autoStatus.enabled[1] && !boostCheck && data.ord.isPsi) data.ord.ordinal = D(GRAHAMS_VALUE)
    if(timesToLoop[3].gte(1) && data.ord.isPsi && data.autoStatus.enabled[1] && collapseCheck && boostCheck) markup(timesToLoop[3].times(diff/1000))

    // Automation Tier 2: Post-Collapse
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[2]) sacrificeIncrementy() //Charge Autobuyer
    if(data.collapse.hasSluggish[2] && data.autoStatus.enabled[3]){ // Repeatable IUP Autobuyer
        for (let i = 0; i < 3; i++) {
            buyRUP(i)
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
    if(data.collapse.hasSluggish[3] && data.collapse.apEnabled[0] && data.ord.base > 3) factorShift(true)
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
