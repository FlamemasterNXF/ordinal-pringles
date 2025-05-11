let darknessTimeout
function doDepthThreeEffect(){
    if (!darknessTimeout) {
        darknessTimeout = setTimeout(() => {
            darken()
            darknessTimeout = null
        }, getStabilizationEffect(3) * 1000)
    }
}

function mainLoop() {
    // Calculate diff and usableDiff
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = getSimpleSetting('offlineProgress') ? Math.max((Date.now() - data.lastTick), 0) : 50
    // Used for Offline Progress
    let uDiff = diff/1000

    if((data.dy.gain.gt(0) || isBaseless() && hasRealmUnlock(1)) && data.dy.level.lt(getDyCap())) data.dy.level = Decimal.min(getDyCap(), data.dy.level.add(D(uDiff).mul(dyGain())))
    if(data.boost.hasBUP[11]) data.markup.powers = data.markup.powers.plus(getBUPEffect(11)*uDiff)

    if(data.chal.active[7]) data.chal.decrementy = Decimal.max(1, data.chal.decrementy.mul(decrementyGain().pow(uDiff)))

    if(data.ord.isPsi && data.boost.unlocks[1]) data.incrementy.amt = data.incrementy.amt.plus(incrementyGain().times(uDiff))
    if(getDepth() > 1){
        data.incrementy.amt = data.incrementy.amt.div(getDepthNerf(2).times(uDiff))
        if(data.incrementy.amt.lt(getDepthBuff(2))) doDepthThreeEffect()
    }
    if(data.boost.unlocks[3]) {
        data.overflow.bp += getBoosterPowerGain()*uDiff
        data.overflow.oc += getOverchargeGain()*uDiff
    }

    if(hasCUP(7)) data.collapse.cardinals = data.collapse.cardinals.plus((data.collapse.bestCardinalsGained.div(100)).times(getCUPEffect(7)).times(uDiff))

    if(hasSluggishMilestone(0) && calculateSimpleHardy().gte(10240) && !data.ord.isPsi && data.markup.powers.lt(4e256)) data.markup.powers = data.markup.powers.plus((cappedOPGain().div(100)).times(uDiff))
    if(isTabUnlocked('hierarchies')) checkHierarchyMilestones()

    if(alephOmegaCap() > 0 && data.omega.alephOmega < alephOmegaCap()) data.omega.alephOmega += aoGain()*uDiff
    if(data.omega.alephOmega > alephOmegaCap()) data.omega.alephOmega = alephOmegaCap()

    data.darkness.negativeCharge = Math.min(Number.MAX_VALUE, data.darkness.negativeCharge+negativeChargeGain()*uDiff)

    if(isBaseless() && hasRealmUnlock(1)) data.baselessRealm.incrementy += getRealmIncrementyGain()*uDiff
    if(isBaseless() && hasRealmUnlock(2)) data.baselessRealm.hierarchy.ord += getRealmHierarchyGain()*uDiff

    if(getCurrentPassiveEnergy() < 0){
        respecPassiveUpgrades(true)
        createAlert('Uh oh!', 'You invested Passive Energy which you just lost in a respec, so much that your Passive Energy became negative! For this reason, your Passive Energy Upgrades have been reset. Don\'t worry, no resets were triggered!', 'Ok, thanks!')
    }

    // Run the tick() function to calculate things that rely on normal diff
    tick(diff)

    // Update lastTick
    data.lastTick = Date.now()

    // Check for hotkey usage
    if (controls["s"].pressed) successor(1, true);
    if (controls["m"].pressed) maximize();
    if (controls["i"].pressed) markup();
    if (controls["f"].pressed) { buyMaxFactor(); buyMaxAuto(); }
    if (controls["h"].pressed && !data.baseless.baseless) factorShift();
    if (controls["h"].pressed && data.baseless.baseless) dynamicShift();
    if (controls["b"].pressed) boost(false, false, true);
    if (controls["c"].pressed && (data.collapse.times > 0 || data.obliterate.times > 0)) collapseConfirm(true);

    // Update Achievements
    checkAchievements()

    // Update HTML
    uHTML.update()
}


window.onload = function () {
    let extra = false
    try { extra = load(true) } catch(e){ console.log("New Save! If you're seeing this, welcome :)") }

    uHTML.load()

    if(extra) fixOldSavesAfterLoad()
    if(data.collapse.times > 0 || data.obliterate.times > 0) makeExcessOrdMarks()

    initializeCloudSaving()

    window.setInterval(function () {
        mainLoop()
    }, 50);
}
