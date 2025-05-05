let isObliterationUnlocked = () => hasAOMilestone(4) || data.obliterate.times > 0
function updateObliterateHTML(){
    DOM('obliterateButton').style.display = isObliterationUnlocked() && (!isMobileMode() || isMobileNavMaximized) ? 'block' : 'none'

    DOM(`energyText`).innerHTML = `You have ${format(data.obliterate.energy)} <span style="${getCSSVariable('energy-text-energy-color')}">Fractal Energy</span>`
    DOM(`obliterateButton`).innerHTML = `Obliterate your Ordinal for 1 Fractal Energy<br><span style="font-size: 0.7rem">Requires ${format(getObliterateReq())} Incrementy</span>`
    DOM(`obliterateButton`).style.color = data.incrementy.amt.gte(getObliterateReq())
        ? getCSSVariable('obliterate-button-available-text-color')
        : getCSSVariable('obliterate-button-default-text-color')

    if(getSubtab('obliterate') === 'pringles') updateCanBuyPringleHTML()
}

function getObliterateReq(n = data.obliterate.times){
    let mult = n > 0 ? Math.pow(2, n) : 1
    let base = n > 0 ? D("1e750") : D("1e700")
    let divisor = n >= 20 ? 10 - Math.floor((n-10)/10) : 10
    return base.pow(1+n/divisor).times(mult)
}

function obliterateConfirm(){
    if(!getSimpleSetting('obliterationConfirmation')) return obliterate()
    if(data.obliterate.times === 0)
        createConfirmation('Are you absolutely certain?', `Obliterating will reset EVERYTHING prior in exchange for ONE Fractal Energy. There is no going back, but new content will be unlocked to make your Ordinal grow faster than ever.`, 'No Way!', 'To the Future!', obliterate)
    else
        createConfirmation('Are you absolutely certain?', `Obliterating will reset EVERYTHING prior in exchange for ONE Fractal Energy. There is no going back.`, 'No Way!', 'Onward!', obliterate)
}
function obliterate(){
    if(data.incrementy.amt.lt(getObliterateReq())) return showNotification("Insufficient Incrementy!")

    DOM('obliterateNav').style.display = 'block'
    obliterateReset()

    ++data.obliterate.energy
    ++data.obliterate.times
    ++data.obliterate.instability
    boosterUnlock()
}

function obliterateReset(){
    data.boost.unlocks[4] = false

    data.collapse.times = 0
    data.collapse.cardinals = D(0)
    data.collapse.bestCardinalsGained = D(0)
    data.collapse.alephs = Array(alephData.length).fill(D(0))
    data.collapse.hasCUP = Array(8).fill(false)
    data.collapse.hasSluggish = Array(5).fill(false)
    if(getSimpleSetting('obliterationAutomationDisable')) data.collapse.apEnabled = Array(3).fill(false)

    data.darkness.negativeCharge = 0
    data.darkness.sacrificedCharge = 0
    data.darkness.negativeChargeSpent = 0
    data.darkness.totalDrains = 0
    if(!hasPassiveUpgrade(10)) data.darkness.levels[0] = 0
    if(!hasPassiveUpgrade(10)) data.darkness.levels[1] = 0
    if(!hasPassiveUpgrade(12)) data.darkness.levels[2] = 0
    data.darkness.drains = Array(7).fill(0)
    if(getSimpleSetting('obliterationNegativeChargeReset')) data.darkness.negativeChargeEnabled = false
    data.darkness.darkened = false
    if(!hasPassiveUpgrade(11)) data.darkness.stabilization = 0

    if(!hasPassiveUpgrade(21)){
        for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
            data.hyper.hasUpgrade[i] = false
            if(data.hyper.isUpgradeSecondary[i]){
                data.hyper.isUpgradeSecondary[i] = false
                ++data.stability.energy[0]
            }
            if(data.hyper.shouldForceStable[i]){
                data.hyper.shouldForceStable[i] = false
                ++data.stability.energy[2]
            }
        }
        for (let i = 0; i < data.hyper.hasPassiveHypercharge.length; i++){
            data.hyper.hasPassiveHypercharge[i] = false
        }
    }

    data.baseless.alephNull = 0
    data.baseless.baseless = false
    data.baseless.shifts = 0
    data.baseless.bestOrdinalInMode = Array(3).fill(0)

    if(!hasPassiveUpgrade(13)) data.baseless.metaANR = Array(data.baseless.metaANR.length).fill(0)
    if(!hasPassiveUpgrade(14)) data.baseless.normalANR = Array(data.baseless.normalANR.length).fill(0)

    if(!hasPassiveUpgrade(19)){
        data.baselessRealm.amt = 0
        data.baselessRealm.total = 0
        data.baselessRealm.times = 0
        data.baselessRealm.hasBUP = Array(12).fill(false)
        data.baselessRealm.unlocks = Array(4).fill(false)
        data.baselessRealm.completions = Array(6).fill(0)
        data.baselessRealm.chalActive = -1
        data.baselessRealm.incrementy = 0
        data.baselessRealm.rupLevels = Array(6).fill(0)
        data.baselessRealm.hasUpgrade = Array(11).fill(false)
        data.baselessRealm.hierarchy = {ord: 0, over: 0}
        // GUP Percentages should persist, for QOL data.baselessRealm.gupPercentage = Array(3).fill(0)
        data.baselessRealm.hupLevels = Array(3).fill(0)
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

    if(getSimpleSetting('obliterationAutomationDisable')){
        for (let i = 0; i < data.autoStatus.enabled.length; i++) {
            data.autoStatus.enabled[i] = false
        }
    }

    switchTab(data.nav.current)

    updateAutomationTabHTML()
    updateAllAlephHTML()
    updateAllCUPTextHTML()
    checkAllUnlocks(0, true)
    checkAllUnlocks(1, true)
    updateStabilizationHTML()
    updateAllHyperchargeHTML(true)
    updateAllANRHTML()
    updateRealmHTML()
    updateAllRealmBUPHTML()
    updateAllAORHTML()
    updateAllPurificationHTML()
}

function spendFractalEnergy(n = 1){
    data.obliterate.energy -= n
    //data.obliterate.passiveEnergy += n
}

function getTotalFractalEnergyInvested(considerPurity = false){
    let total = 0
    for (let i = 0; i < data.obliterate.energyUpgrades.length; i++) {
        let ids = getDataIDFromTreeID(data.obliterate.energyUpgrades[i])
        total += energyUpgradeData[ids[0]][ids[1]].cost
    }
    if (considerPurity) total += (data.purity.isUnlocked.slice(0,10).filter(i=>i).length - 2)
    return total
}