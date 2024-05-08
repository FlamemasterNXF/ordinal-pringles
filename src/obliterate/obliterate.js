function updateObliterateHTML(){
    DOM(`energyText`).innerHTML = `You have ${format(data.obliterate.energy)} <span style="color: #d56cdc">Fractal Energy</span>`
    DOM(`obliterateButton`).innerHTML = `Obliterate your Ordinal for 1 Fractal Energy<br><span style="font-size: 0.7rem">Requires ${format(getObliterateReq())} Incrementy</span>`
    DOM(`obliterateButton`).style.color = data.incrementy.amt.gte(getObliterateReq()) ? '#ff80b9' : '#b06cdc'
}

function getObliterateReq(){
    return D("1e750").pow(1+data.obliterate.times/10)
}

function obliterateConfirm(){
    createConfirmation('Are you absolutely certain?', `Obliterating will reset EVERYTHING prior. There is no going back.`, 'No Way!', 'Onward!', obliterate)
}
function obliterate(){
    if(data.incrementy.amt.lt(getObliterateReq())) return createAlert("Failure", "Insufficient Incrementy.", "Oops.")

    obliterateReset()

    ++data.obliterate.energy
    ++data.obliterate.times
    boosterUnlock()
}

function obliterateReset(){
    data.boost.unlocks[4] = false

    data.collapse.times = 0
    data.collapse.cardinals = 0
    data.collapse.bestCardinalsGained = 0
    data.collapse.alephs = Array(alephData.length).fill(0)
    data.collapse.hasCUP = Array(8).fill(false)
    data.collapse.hasSluggish = Array(5).fill(false)
    data.collapse.apEnabled = Array(2).fill(false)

    data.darkness.negativeCharge = 0
    data.darkness.sacrificedCharge = 0
    data.darkness.chargeSpent = 0
    data.darkness.totalDrains = 0
    for (let i = 0; i < 3; i++) {
        data.darkness.levels = hasPassiveUpgrade(10+i) ? data.darkness.levels : 0
    }
    data.darkness.drains = Array(7).fill(0)
    data.darkness.negativeChargeEnabled = false
    data.darkness.darkened = false

    data.sing.highestLevel = 0
    data.sing.level = 0
    data.sing.hasEverHadFunction = Array(singFunctions.length).fill(false)

    data.baseless.alephNull = 0
    data.baseless.mode = 0
    data.baseless.baseless = false
    data.baseless.shifts = 0
    data.baseless.bestOrdinalInMode = Array(3).fill(0)
    for (let i = 0; i < 3; i++) {
        data.baseless.anRebuyables[i] = hasPassiveUpgrade(13) ? data.baseless.anRebuyables[i] : 0
    }
    for (let i = 3; i < 5; i++) {
        data.baseless.anRebuyables[i] = hasPassiveUpgrade(14) ? data.baseless.anRebuyables[i] : 0
    }

    data.omega.bestRemnants = 0
    data.omega.alephOmega = 1
    for (let i = 0; i < data.omega.bestFBInPurification.length; i++) {
        data.omega.bestFBInPurification[i] = hasPassiveUpgrade(15+i) ? data.omega.bestFBInPurification[i] : 0
    }
    data.omega.purificationIsActive = Array(4).fill(false)
    data.omega.whichPurification = -1
    data.omega.aoRebuyables = Array(8).fill(0)

    collapseReset()

    updateAllAlephHTML()
    updateAllCUPTextHTML()
    checkAllUnlocks(0, true)
    checkAllUnlocks(1, true)
}