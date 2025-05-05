let timesToLoop = [0,0, 0,0]

function tick(diff){
    // TODO: PSI Check, probably doesn't need to be on tick()
    if(!data.ord.isPsi && data.ord.ordinal.gte(PSI_VALUE) && data.ord.base === 3) {
        data.ord.isPsi = true
        data.ord.ordinal = D(4)
    }

    // Check for Challenge Completion
    chalComplete()
    completeRealmChallenge()

    //Automation Tier 1
    for (let i = 0; i < 2; i++) timesToLoop[i] = D(timesToLoop[i]).add(!data.chal.active[5]
        ? D(diff).mul(D(data.autoLevels[i]).add(extraT1())).mul(getAutoClickerSpeed()).mul(data.dy.level).div(data.chal.decrementy)
        : D(diff).mul(D(data.autoLevels[i]).add(extraT1())).mul(getAutoClickerSpeed()).div(data.dy.level).div(data.chal.decrementy))

    timesToLoop[2] = isAutomationUnlocked(0, 0) ? D(1) : D(0)
    timesToLoop[3] = isAutomationUnlocked(0, 1) ? getAutoBuyerSpeed() : D(0)

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
                data.ord.over = D(0)
                successor(Decimal.max(Decimal.min(Decimal.floor(D(timesToLoop[0]).div(1000)), D(data.ord.base).mul(Decimal.floor(D(timesToLoop[1]).div(1000))))),0,true)
            } else {
                if (Decimal.floor(D(timesToLoop[0]).div(1000)).gte(D(data.ord.base).sub(D(data.ord.ordinal).mod(data.ord.base)))) { // stop at ordinal % (base - 1) and spill the rest to over
                    let ord1 = D(data.ord.base).sub(data.ord.ordinal.mod(data.ord.base)).sub(1) //(data.ord.base - (data.ord.ordinal % data.ord.base)) - 1
                    successor(ord1)
                    let ordOver = (Decimal.floor(D(timesToLoop[0]).div(1000)).sub(ord1).toNumber())
                    if (isFinite(ordOver)) data.ord.over = D(data.ord.over).add(ordOver)
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
    if(timesToLoop[2].gte(1) && (data.markup.powers.lt(fsReqs[data.markup.shifts]) || data.ord.base === 3 || data.baseless.baseless) && getAutomationEnabled(0, 0)){
        buyMaxT1()
    }

    // Markup Autobuyer
    let collapseCheck = data.ord.ordinal.lt(BHO_VALUE) || data.collapse.times > 0 || hasSluggishMilestone(0)
    let boostCheck = data.boost.times > 0 || hasSluggishMilestone(0)
    if(timesToLoop[3].gte(1) && data.ord.isPsi && getAutomationEnabled(0, 1) && !boostCheck && data.ord.isPsi) data.ord.ordinal = D(GRAHAMS_VALUE)
    if(timesToLoop[3].gte(1) && data.ord.isPsi && getAutomationEnabled(0, 1) && collapseCheck && boostCheck) markup(timesToLoop[3].times(diff/1000))
    if(isRealmAutomationEnabled(1)) mockMarkup()

    // Automation Tier 2: Post-Collapse
    if(hasSluggishMilestone(2) && getAutomationEnabled(1, 0)) sacrificeIncrementy() //Charge Autobuyer
    if(hasSluggishMilestone(2) && getAutomationEnabled(1, 1)){ // Repeatable IUP Autobuyer
        for (let i = 0; i < 100; i++) {
            for (let i = 0; i < 3; i++) {
                buyRUP(i)
            }
        }
        if(hasAOMilestone(3)){
            for (let i = 9; i < 12; i++) {
                buyRUP(i)
            }
        }
    }
    if(hasSluggishMilestone(3) && getAutomationEnabled(1, 2)){ // Repeatable HUP Autobuyer
        for (let i = 0; i < data.hierarchies.rebuyableAmt.length; i++) {
            if(hasPassiveHypercharge(1)) data.hierarchies.rebuyableAmt[i] = getMaxHBBuyableLevel(i).toNumber()
            else buyHBuyable(i)
        }
    }
    if(getAutomationEnabled(1, 3)){ // BUP + Supercharge AutoBuyer
        if(!data.boost.hasBUP[10] || chargeAutoCheck(10)) buyBUP(10, false, getAutomationEnabled(1, 4), true)
        if(!data.boost.hasBUP[5] || chargeAutoCheck(5)) buyBUP(5, false, getAutomationEnabled(1, 4), true)
        if(!data.boost.hasBUP[0] || chargeAutoCheck(0)) buyBUP(0, false, getAutomationEnabled(1, 4), true)
        for (let i = 1; i < 5; i++) {
            let isBottom = i===4
            for (let j = 0; j < 3; j++) {
                if(!data.boost.hasBUP[i+(5*j)] || chargeAutoCheck(i+(5*j))) buyBUP(i+(5*j), isBottom, getAutomationEnabled(1, 4), true)
            }
        }
    }

    if(hasPassiveUpgrade(23) && getAutomationEnabled(1, 5) && isTabUnlocked('baseless')){
        for (let i = 0; i < metaANBuyableData.length; i++) {
            buyANR(i, 'meta')
        }
        for (let i = 0; i < normalANBuyableData.length; i++) {
            buyANR(i, 'normal')
        }
    }

    if(hasPassiveUpgrade(24) && getAutomationEnabled(1, 6) && isTabUnlocked('purification')){
        for (let i = 0; i < data.omega.aoRebuyables.length; i++) {
            buyAOR(i)
        }
    }

    // Automation Tier 3
    let inSluggish = false
    if (data.boost.times === 2 && hasSluggishMilestone(4)) inSluggish = true
    if(hasSluggishMilestone(3) && getAutomationEnabled(2, 0) && data.ord.base > 3 && data.markup.shifts < 7) factorShift(true)
    if(hasSluggishMilestone(3) && getAutomationEnabled(2, 1) && data.boost.times < boostLimit() && !inSluggish) boost(false, true)
    if(hasAOMilestone(0) && getAutomationEnabled(2, 2) && data.baseless.baseless && !inAnyRealmChallenge()) dynamicShift()

    // Increase Hierarchies
    if(data.boost.unlocks[2] && !inPurification(2) && !inPurification(3)) increaseHierarchies(diff)

    // TODO: Check for "Base is Always 5/4 in Challenges", probably doesn't need to be on tick()
    if(data.chal.active.includes(true) && !data.chal.active[6]) data.ord.base = getBUPEffect(2)

    // Unlock Booster Features
    boosterUnlock()
}

// Used for Charge AutoBuyer
let chargeAutoCheck = (i) => !data.boost.isCharged[i] && getAutomationEnabled(1, 4)
