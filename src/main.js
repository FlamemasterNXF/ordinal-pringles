function mainLoop() {
    // Calculate diff and usableDiff
    if(data.lastTick === 0) data.lastTick = Date.now()
    let diff = data.offline ? Math.max((Date.now() - data.lastTick), 0) : 50
    // Used for Offline Progress
    let uDiff = diff/1000

    if(data.dy.gain > 0 && data.dy.level < data.dy.cap) data.dy.level = Math.min(data.dy.cap, data.dy.level+uDiff*dyGain())
    if(data.boost.hasBUP[11]) data.markup.powers += bup9Effect()*uDiff

    if(data.chal.active[7]) data.chal.decrementy = Decimal.max(1, data.chal.decrementy.mul(decrementyGain().pow(uDiff)))

    if(data.ord.isPsi && data.boost.unlocks[1]) data.incrementy.amt = data.incrementy.amt.plus(incrementyGain().times(uDiff))
    if(data.boost.unlocks[3]) {
        data.overflow.bp += getOverflowGain(0)*uDiff
        data.overflow.oc += getOverflowGain(1)*uDiff
    }

    if(data.collapse.hasCUP[7]) data.collapse.cardinals += (data.collapse.bestCardinalsGained/100)*uDiff
    if(data.collapse.hasSluggish[0] && calculateHardy()>10240 && !data.ord.isPsi && data.markup.powers < 4e256) data.markup.powers += (totalOPGain()/100)*uDiff

    data.darkness.negativeCharge = Math.min(negativeChargeCap(), data.darkness.negativeCharge+negativeChargeGain()*uDiff)

    // Run the tick() function to calculate things that rely on normal diff
    tick(diff)

    // Update lastTick
    data.lastTick = Date.now()

    // Check for hotkey usage
    if (controls["s"].pressed) successor(1, true);
    if (controls["m"].pressed) maximize();
    if (controls["i"].pressed) markup();
    if (controls["f"].pressed) { buyMaxFactor(); buyMaxAuto(); }
    if (controls["h"].pressed) factorShift();
    if (controls["b"].pressed) boost(false, true);
    if (controls["c"].pressed) collapseConfirm(true);

    // Update Achievements
    checkAchs()

    // Update HTML
    uHTML.update()
}


window.onload = function () {
    let extra = false
    try { extra = load() } catch(e){ console.log('New Save!\nIf you\'re seeing this, welcome :)') }
    console.log(extra)
    uHTML.load()

    if(extra) fixOldSavesP2()

    if(data.collapse.times > 0) makeExcessOrdMarks()
}

window.setInterval(function () {
    mainLoop()
}, 50);
