let bupData = [
    {
        desc: "Each Factor's effect is doubled",
        cost: 1,
        eff: () => 2,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Boost OP gain by 5x",
        cost: 5,
        eff: () => 5,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "The Ordinal Base is always 5 in Challenges",
        cost: 72,
        eff: () => 5,
        baseEff: () => data.ord.base,
        bottomRow: false
    },
    {
        desc: "Dynamic Gain is multiplied by your C5 completions in C1-C4",
        cost: 53,
        eff: () => Math.max(Math.pow(2, data.chal.completions[4]), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Every 10 Darkness Upgrades purchased reduces Hierarchy Bases by 1",
        cost: 3522,
        eff: () => Math.min(6, Math.floor(getTotalDUPs()/10)),
        baseEff: () => 0,
        bottomRow: true
    },

    {
        desc: "Unlock the Max All AutoBuyer",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Boosters Boost Tier 1 and Tier 2 Automation",
        cost: 4,
        eff: () => Math.max(Math.sqrt(data.boost.total)*getAOREffect(6), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Gain 10x OP at Ordinal Base 5 or higher",
        cost: 73,
        eff: () => 10,
        baseEff: () => 0,
        bottomRow: false
    },
    {
        desc: "The Ordinal Base boosts Factors (higher is better)",
        cost: 74,
        eff: () => Math.max(1,data.ord.base-2),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Each SGH Buyable Purchased boosts the SGH Effect Exponent",
        cost: 3522,
        eff: () => Math.sqrt(getTotalHBuyables(true)),
        baseEff: () => 0,
        bottomRow: true
    },

    {
        desc: "Unlock the Markup AutoBuyer",
        cost: 1,
        eff: () => 1,
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Gain 20 Free OP/s",
        cost: 8,
        eff: () => 20*getOverflowEffect(1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "Gain 3 free levels of each Factor",
        cost: 16,
        eff: () => 3,
        baseEff: () => 0,
        bottomRow: false
    },
    {
        desc: "Boosters boost Dynamic gain if the Ordinal Base is less than 6",
        cost: 66,
        eff: () => Math.max(Math.log2(data.boost.amt), 1),
        baseEff: () => 1,
        bottomRow: false
    },
    {
        desc: "The Total ℵ effect applies to Incrementy gain",
        cost: 3562,
        eff: () => alephTotalEffect()*getOverflowEffect(6),
        baseEff: () => 1,
        bottomRow: true
    },
]

let chargedBUPData = [
    {
        desc: "Each Factor's effect is Quadrupled",
        eff: () => 4,
        bottomRow: false
    },
    {
        desc: "Boost OP gain by 500x",
        eff: () => 500,
        bottomRow: false
    },
    {
        desc: "The Base is always 4 in Challenges",
        eff: () => 4,
        bottomRow: false
    },
    {
        desc: "Dynamic Gain is multiplied by your C5 completions",
        eff: () => Math.max(Math.pow(2, data.chal.completions[4]), 1),
        bottomRow: false
    },
    {
        desc: "Every 10 Darkness Upgrades or Drains purchased reduces Hierarchy Bases by 1",
        eff: () => Math.min(6, Math.floor((data.darkness.totalDrains+getTotalDUPs())/10)),
        bottomRow: true
    },

    {
        desc: "The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 3x1)",
        eff: () => Math.sqrt(factorEffect(6)),
        bottomRow: false
    },
    {
        desc: "Boosters Boost Tier 1 and 2 Automation at a much higher rate",
        eff: () => Math.max(Math.sqrt(data.boost.total)*3*getAOREffect(6), 1),
        bottomRow: false
    },
    {
        desc: "Gain 100x OP at Ordinal Base 4 or higher",
        eff: () => 100,
        bottomRow: false
    },
    {
        desc: "The Base boosts Factors but lower Base is better",
        eff: () => Math.max(1,(-data.ord.base + 6)),
        bottomRow: false
    },
    {
        desc: "Each SGH, FGH, and Incrementy Buyable Purchased boosts the SGH Effect Exponent",
        eff: () => Math.sqrt(getTotalHBuyables(false)+getTotalIBuyables()),
        bottomRow: true
    },

    {
        desc: "The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 2x1)",
        eff: () => Math.sqrt(factorEffect(6)),
        bottomRow: false
    },
    {
        desc: "Gain Free OP/s based on your Base",
        eff: () => Math.max(20*(-data.ord.base+11)*getOverflowEffect(1), 1),
        bottomRow: false
    },
    {
        desc: "Gain 4 free levels of each Factor",
        eff: () => 4,
        bottomRow: false
    },
    {
        desc: "Boosters boost Dynamic Gain",
        eff: () => Math.max(Math.log2(data.boost.amt), 1),
        bottomRow: false
    },
    {
        desc: "The Total ℵ effect is multiplied by Darkness Upgrade 1 and applied to Incrementy gain",
        eff: () => alephTotalEffect()*dupEffect(0)*getOverflowEffect(6),
        bottomRow: true
    },
]

let getBUPCosts = (i) => bupData[i].cost
function getBUPEffect(i) {
    // Special Case for BUPs 5 and 10
    if((i === 5) || (i === 10) ){
        if(data.boost.isCharged[5] && data.boost.isCharged[10] && data.hierarchies.hasUpgrade[3]) return chargedBUPData[5].eff()**2
        if(data.boost.isCharged[5] || data.boost.isCharged[10]) return chargedBUPData[5].eff()
    }

    if(data.boost.isCharged[i]) return chargedBUPData[i].eff()
    if(data.boost.hasBUP[i]) return bupData[i].eff()
    return bupData[i].baseEff()
}
let getBaseBUPDesc = (i) => `${bupData[i].desc}<br>${getBUPCosts(i)} Boosters`
function getBUPDesc(i, showNextLevel = false){
    if(data.boost.isCharged[i]) return chargedBUPData[i].desc
    if(data.boost.hasBUP[i]) return showNextLevel ? chargedBUPData[i].desc : getBaseBUPDesc(i)
    return getBaseBUPDesc(i)
}

function initBUPs(){
    let rows = [DOM('bupColumn0'), DOM('bupColumn1'), DOM('bupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < 5; n++) {
            let bup = document.createElement('button')
            bup.className = data.boost.isCharged[total] ? 'chargedBUP' : data.boost.hasBUP[total] ? 'boughtBUP' : 'bup'
            bup.id = `bup${total}`
            bup.innerHTML = `${getBUPDesc(total)}`

            rows[i].append(bup)
            ++total
        }
    }
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        let bottomRow = i===4 || i===9 || i===14
        DOM(`bup${i}`).addEventListener('click', ()=>buyBUP(i, bottomRow, true))
        DOM(`bup${i}`).addEventListener('mouseenter', ()=>showNextBUPLevelEffect(i, true))
        DOM(`bup${i}`).addEventListener('mouseleave', ()=>showNextBUPLevelEffect(i, false))
    }
    for (let i = 0; i < data.boost.unlocks.length; i++) {
        DOM(`bu${i}`).className = data.boost.unlocks[i] ? 'boughtBUP' : 'bup'
    }

    checkSpecialBUPs()
}

function checkSpecialBUPs(){
    DOM(`bup4`).style.display = hasSluggishMilestone(3) ? `block` : `none`
    DOM(`bup9`).style.display = hasSluggishMilestone(3) ? `block` : `none`
    DOM(`bup14`).style.display = hasSluggishMilestone(3) ? `block` : `none`
    DOM(`bu4`).style.display = hasSluggishMilestone(3) ? `block` : `none`
}

function updateBoostersHTML(){
    DOM('boosterText').innerHTML = data.boost.unlocks[1] > 0 ?
        `You have <span style="color: ${getCSSVariable('boosters-text-boosters-color')}; font-family: DosisSemiBold, serif">${format(data.boost.amt)} Boosters</span> (${format(data.boost.total)} total) and <span style="color: ${getCSSVariable('boosters-text-charge-color')}; font-family: DosisSemiBold, serif">${data.incrementy.charge} Charge</span> (${data.incrementy.totalCharge} total)`
        : `You have <span style="color: ${getCSSVariable('boosters-text-boosters-color')}; font-family: DosisSemiBold, serif">${format(data.boost.amt)} Boosters</span> (${format(data.boost.total)} total)`
    DOM('boosterTimesText').innerHTML = `You have <span style="color: ${getCSSVariable('boosters-text-boost-count-color')}">Boosted</span> ${data.boost.times} times`
    DOM("factorText2").innerText = `Your Challenges are multiplying AutoBuyer speed by a total of ${format(chalEffectTotal())}x`

    if(getSubtab('boosters') === 'auto2') updateAllAutomationHTML()
    if(getSubtab('boosters') === 'chal') updateAllChalHTML()
    if(getSubtab('boosters') === 'incrementy') updateIncrementyHTML()
    if(getSubtab('boosters') === 'hierarchies') updateHierarchiesHTML()
    if(getSubtab('boosters') === 'overflow') updateOverflowHTML()

    DOM("chalTab").innerText = data.boost.unlocks[0]?'Challenges':'???'
    DOM("incrementyTab").innerText = data.boost.unlocks[1]?'Incrementy':'???'
    DOM("hierarchiesTab").innerText = data.boost.unlocks[2]?'Hierarchies':'???'
    DOM("overflowTab").innerText = data.boost.unlocks[3]?'Overflow':'???'

    if(data.chal.active[6] || data.chal.active[7]) updateStatusHTML()
}

function updateAllBUPHTML(){
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        DOM(`bup${i}`).innerHTML = `${getBUPDesc(i)}`
    }
}

function showNextBUPLevelEffect(i, showNextLevel) {
    if (data.incrementy.totalCharge === 0) showNextLevel = false

    DOM(`bup${i}`).style.color = showNextLevel || data.boost.isCharged[i] && data.boost.unlocks[1]
        ? getCSSVariable('charged-BUP-text-color')
        : getCSSVariable('unbought-BUP-text-color')
    DOM(`bup${i}`).innerHTML = `${getBUPDesc(i, showNextLevel)}`
}

function updateBUPInfoText(){
    let bottomAddon = hasSluggishMilestone(3) ? `Bottom-Row <span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">Upgrades</span> are unique and currently cost <span style="color: ${getCSSVariable('BUP-help-text-charge-color')}">${getBottomRowChargeCost()} Charge</span> to <span style="color: ${getCSSVariable('BUP-help-text-charge-color')}">Supercharge.</span><br>` : ``
    let superchargeAddon = data.boost.unlocks[1] ? `Purchased <span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">Upgrades</span> can be <span style="color: ${getCSSVariable('BUP-help-text-charge-color')}">Supercharged</span> for <span style="color: ${getCSSVariable('BUP-help-text-charge-color')}">1 Charge!</span><br>` : ``
    let text = `${superchargeAddon}${bottomAddon}<span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">Upgrades</span> must be bought in <span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">descending order</span>. Attempting to buy an <span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">Upgrade</span> will also attempt to buy all <span style="color: ${getCSSVariable('BUP-help-text-upgrade-color')}">Upgrades</span> above it.`
    return DOM('bupBottomText').innerHTML = text
}

function boosterReset(){
    data.ord.ordinal = D(0)
    data.ord.over = D(0)
    data.ord.base = data.chal.active[2]?15:10
    data.ord.isPsi = false
    data.markup.powers = D(0)
    data.markup.shifts = 0
    data.dy.level = D(1)
    data.dy.gain = D(0)
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    data.chal.decrementy = D(1)
    data.successorClicks = 0
}

const boosterGain = () => inPurification(0) ? (getAOREffect(3)) * getBulkBoostAmt() : ((data.boost.times * getBulkBoostAmt()) + (getBulkBoostAmt() * (getBulkBoostAmt() + 1) / 2));
function boost(f=false, auto=false, hotkey=false){
    if(!f && !auto && isBaseless()){
        realmBoost()
        return
    }

    if(data.boost.times === 33 && data.collapse.times === 0 && data.obliterate.times === 0) return collapse(true)
    if((!data.ord.isPsi || data.ord.ordinal.lt(boostReq())) && (auto || hotkey)) return
    if((!data.ord.isPsi || data.ord.ordinal.lt(boostReq())) && !f) return

    if(data.boost.times === 0){
        DOM('boostNav').style.display = 'block'
        DOM(getAdaptiveButton('factorBoostButton')).style.display = 'inline-block'
    }

    let bulkBoostAmt = getBulkBoostAmt();
    if (auto && data.boost.times < 2 && !hasSluggishMilestone(4)) bulkBoostAmt = Math.min(2 - data.boost.times, bulkBoostAmt) // do not automatically boost past SM2

    data.boost.amt += boosterGain()
    data.boost.total += boosterGain()
    data.boost.times += bulkBoostAmt
    if (data.boost.times >= 30 && data.boost.times < 30 + bulkBoostAmt && data.collapse.times === 0 && data.obliterate.times === 0) createAlert('Congratulations!', `You've Factor Boosted 30 times! Something new is right around the corner, but these last 4 Boosts will be the hardest...`, 'Onwards!')
    /*for(let i=1;i<=bulkBoostAmt;i++) {
        data.boost.amt += data.boost.times+1
        data.boost.total += data.boost.times+1
        ++data.boost.times

        if(data.boost.times === 30 && data.collapse.times === 0) createAlert('Congratulations!', `You've Factor Boosted 30 times! Something new is right around the corner, but these last 4 Boosts will be the hardest...`, 'Onwards!')
    }*/
    data.boost.amt = Math.min(data.boost.amt, Number.MAX_VALUE)
    data.boost.total = Math.min(data.boost.total, Number.MAX_VALUE)
    data.boost.times = Math.min(data.boost.times, Number.MAX_VALUE)
    boosterUnlock()
    boosterReset()
    updateStatusHTML()
}

function boostReq(n = data.boost.times){
    if(data.boost.times === 0 && !hasSluggishMilestone(0)) return D(GRAHAMS_VALUE)
    if(n >= 34) return D(BHO_VALUE).times(D(3).pow(n-33))
    let scaling = n < 30 ? 1 : Math.floor(100*(n/15))
    return n < 33 ? D(3 ** (n+1) * 4 * 10 * scaling) : D(BHO_VALUE)
}

//Credit to ryanleonels
let boostLimit = () => (data.collapse.times === 0 && data.obliterate.times === 0) ? 33 : Infinity;
function getBulkBoostAmt(){
    if (!getSimpleSetting('bulkBoosting') || !data.ord.isPsi || data.ord.ordinal.lte(boostReq()) || data.boost.times >= Number.MAX_VALUE) return 1
    let maxBoost = data.boost.times
    while (data.ord.ordinal.gte(boostReq(maxBoost)) && maxBoost < boostLimit()) {
        maxBoost++
        if (maxBoost >= 34) {
            maxBoost = 34 + Decimal.floor(Decimal.log(data.ord.ordinal.div(BHO_VALUE),3).add(0.000000000001)).toNumber()
            break
        }
    }
    return Math.min(Math.max(maxBoost - data.boost.times, 1), Number.MAX_VALUE)
}
//End credit

function buyBUP(n, bottomRow, useCharge, isAuto = false){
    updateHierarchyPurchaseHTML()
    if(data.boost.hasBUP[n]) return useCharge ? chargeBUP(n, bottomRow) : null

    /*
        Force purchasing of BUPs in order, but only in columns
        Attempts to purchase lower BUPs if they aren't available
    */
    if((n % 5 !== 0 && !data.boost.hasBUP[n-1]) && !isAuto){
        for (let i = 0; i < n % 5; i++) {
            let index = (i % 5) + (5 * Math.floor(n / 5))
            buyBUP(index, bottomRow, false)
        }
    }

    if (data.boost.amt < getBUPCosts(n)) return
    data.boost.amt -= getBUPCosts(n)
    data.boost.hasBUP[n] = true

    DOM(`bup${n}`).className = 'boughtBUP'
    if(inPurification(2)) updateAllBUPHTML()
}

function boosterRefund(c=false){
    if(data.baseless.baseless) return
    respecCharge(c)
    updateHierarchyPurchaseHTML()
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        data.boost.hasBUP[i] = false
        DOM(`bup${i}`).className = 'bup'
        showNextBUPLevelEffect(i, false)
    }
    data.boost.amt = data.boost.total
    c?boosterReset():chalExit()
}

// TODO: Refactor / Cleanup
function updateBoosterUnlockState(i, condition){
    DOM(`bu${i}`).className = condition ? 'boughtBUP' : 'bup'
    data.boost.unlocks[i] = condition
}

function boosterUnlock(){
    updateBoosterUnlockState(0, chalTabUnlocked())
    updateBoosterUnlockState(1, incrementyTabUnlocked())
    updateBoosterUnlockState(2, hierarchiesTabUnlocked())
    updateBoosterUnlockState(3, overflowTabUnlocked())
    updateBoosterUnlockState(4, (data.boost.total >= 12246 && hasSluggishMilestone(3)) || hasPassiveUpgrade(20) || data.boost.unlocks[4])
}

function chalTabUnlocked(){
    return data.boost.total>=6 || hasSluggishMilestone(1);
}

function incrementyTabUnlocked(){
    return data.boost.total>=91 || hasSluggishMilestone(1);
}

function hierarchiesTabUnlocked(){
    return data.boost.total>=325 || hasSluggishMilestone(4);
}

function overflowTabUnlocked(){
    return data.boost.total>=465 || data.boost.unlocks[4];
}

function getTotalBUPs(){
    let total = 0
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        if (data.boost.hasBUP[i]) ++total
    }
    return total
}
function getTotalSupercharges(){
    let total = 0
    for (let i = 0; i < data.boost.isCharged.length; i++) {
        if (data.boost.isCharged[i]) ++total
    }
    return total
}

function switchBoostTab(){
    isBaseless() ? switchTab('realm') : switchTab('boosters')
}
