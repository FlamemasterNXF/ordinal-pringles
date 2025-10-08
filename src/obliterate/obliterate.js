let isObliterationUnlocked = () => hasAOMilestone(4) || data.obliterate.times > 0
let canObliterate = (n = data.obliterate.times) => isObliterationUnlocked() && data.incrementy.amt.gte(getObliterateReq(n))

function getObliterateReq(n = data.obliterate.times){
    let mult = Decimal.pow(2, n)
    let divisor = Math.max(1, 6-n/10)
    return D("1e825").pow(1+n/divisor).times(mult)
}
function getBulkableObliterations(){
    let bulkAmount = data.obliterate.times
    while (canObliterate(bulkAmount)) bulkAmount++
    return bulkAmount - data.obliterate.times
}

let getNextFractalEnergyReq = () => getObliterateReq(data.obliterate.times+getBulkableObliterations())

function getFractalEnergyGain(){
    return getBulkableObliterations()
}

function updateObliterateHTML(){
    DOM('obliterateButton').style.display = isObliterationUnlocked() && (!isMobileMode() || isMobileNavMaximized) ? 'block' : 'none'

    DOM(`energyText`).innerHTML = `You have ${format(data.obliterate.energy)} <span style="${getCSSVariable('energy-text-energy-color')}">Fractal Energy</span>`

    if(canObliterate()){
        DOM(`obliterateButton`).style.color = getCSSVariable('obliterate-button-available-text-color')
        DOM(`obliterateButton`).innerHTML = `Obliterate your Ordinal for ${getFractalEnergyGain()} Fractal Energy<br><span style="font-size: 0.7rem">Next at ${format(getNextFractalEnergyReq())} Incrementy</span>`
    }
    else{
        DOM(`obliterateButton`).style.color = getCSSVariable('obliterate-button-default-text-color')
        DOM(`obliterateButton`).innerHTML = `Obliterate your Ordinal for 1 Fractal Energy<br><span style="font-size: 0.7rem">Requires ${format(getObliterateReq())} Incrementy</span>`
    }

    if(getSubtab('obliterate') === 'pringles') updateCanBuyPringleHTML()
}

function obliterateConfirm(){
    if(!getSimpleSetting('obliterationConfirmation')) return obliterate()
    if(data.obliterate.times === 0)
        createConfirmation('Are you absolutely certain?', `Obliterating will reset EVERYTHING prior in exchange for Fractal Energy. There is no going back, but new content will be unlocked to make your Ordinal grow faster than ever.`, 'No Way!', 'To the Future!', obliterate)
    else
        createConfirmation('Are you absolutely certain?', `Obliterating will reset EVERYTHING prior in exchange for Fractal Energy. There is no going back.`, 'No Way!', 'Onward!', obliterate)
}
function obliterate(){
    if(!canObliterate()) return showNotification("Insufficient Incrementy!")

    DOM('obliterateNav').style.display = 'block'

    data.obliterate.energy += getBulkableObliterations()
    data.obliterate.times += getBulkableObliterations()

    obliterateReset()
    boosterUnlock()
}

function obliterateReset(){
    data.boost.unlocks[4] = false
    data.incrementy.bestIncrementy = D(0)

    data.collapse.times = 0
    data.collapse.cardinals = D(0)
    data.collapse.bestCardinalsGained = D(0)
    data.collapse.alephs = Array(alephData.length).fill(D(0))
    data.collapse.hasCUP = Array(8).fill(false)
    data.collapse.hasSluggish = Array(5).fill(false)
    if(getSimpleSetting('obliterationAutomationDisable')) data.collapse.apEnabled = Array(3).fill(false)

    data.darkness.darkened = false
    data.darkness.negativeCharge = 0
    if(!hasPassiveUpgrade(9)){
        data.darkness.negativeChargeSpent = 0
        data.darkness.totalDrains = 0
        data.darkness.drains = Array(7).fill(0)
    }
    if(!hasPassiveUpgrade(10)){
        data.darkness.levels[0] = 0
        data.darkness.levels[1] = 0
    }
    if(!hasPassiveUpgrade(11)) data.darkness.levels[2] = 0
    if(!hasPassiveUpgrade(12)){
        data.darkness.bestDecrementy = D(0)
        data.darkness.bestDepth = 1
        data.darkness.bestEntropy = 0
    }
    if(getSimpleSetting('obliterationNegativeChargeReset')) data.darkness.negativeChargeEnabled = false

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