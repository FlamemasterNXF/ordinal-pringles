const rupData = [
    {
        desc: 'Double Incrementy Gain',
        costBase: 20,
        costScaling: 2,
        effect: () => Decimal.max(1, D(2+getNormalANREffect(1, true)).pow(D(data.incrementy.rebuyableAmt[0]).add(getIUPEffect(3)))),
        target: 'Incrementy Gain'
    },
    {
        desc: 'Triple Dynamic Gain',
        costBase: 1000,
        costScaling: 2,
        effect: () => inPurification(1) ? 1 : Decimal.max(1, D(3).pow(data.incrementy.rebuyableAmt[1]).mul(getIUPEffect(4))),
        target: 'Dynamic Gain'
    },
    {
        desc: 'Dynamic Factor boosts Incrementy Gain',
        costBase: 100,
        costScaling: 2,
        effect: () => !inPurification(1) && !inPurification(3) ? (Decimal.max(1, Decimal.sqrt(data.dy.level))).mul(1+(data.incrementy.rebuyableAmt[2])) : D(1),
        target: 'Dynamic Gain'
    },

    {
        desc: 'Double Negative Charge gain',
        costBase: 1e150,
        costScaling: 30,
        effect: () => 2**data.incrementy.rebuyableAmt[3],
        target: 'Negative Charge'
    },
    {
        desc: 'Gain a free level of the second Darkness Upgrade',
        costBase: 1e150,
        costScaling: 40,
        effect: () => data.incrementy.rebuyableAmt[4],
        target: 'DUP2 Levels',

        effectBase: 0,
        sign: '+'
    },
    {
        desc: 'Boost Cardinal gain',
        costBase: 1e150,
        costScaling: 10,
        effect: () => data.incrementy.rebuyableAmt[5]+1,
        target: 'Cardinals'
    }
]

const iupData = [
    {
        desc: 'Total Factor Boosts boost Incrementy Gain',
        cost: 2e6,
        effect: () => Decimal.max(1, data.boost.times),
        target: 'Incrementy Gain'
    },
    {
        desc: 'Incrementy Multiplies the Dynamic Cap at a reduced rate (void in C6)',
        cost: 2e5,
        effect: () => data.hierarchies.hasUpgrade[6] ? Decimal.max(1, Decimal.pow(data.incrementy.amt, 1/8).add(1))
            : Decimal.max(1, Decimal.pow(data.incrementy.amt, 1/16).add(1)),
        target: 'Dynamic Cap'
    },
    {
        desc: 'Dynamic boosts AutoBuyers at a reduced rate',
        cost: 1e10,
        effect: () => !inPurification(1) ?
            Decimal.max(1, Decimal.sqrt(data.dy.level.add(1))).mul(getIUPEffect(5)).mul(hbData[2].effect())
                .mul(hbData[5].effect()).mul(getAlephEffect(7))
            : D(1),
        target: 'All AutoBuyers'
    },
    {
        desc: 'Challenge Completions provide free levels of RUP1',
        cost: 3e4,
        effect: () => Decimal.floor(data.chal.totalCompletions/3).plus(getHyperchargeEffect(3)),
        target: 'RUP1 Levels',

        sign: '+',
        baseEffect: 0
    },
    {
        desc: 'Challenge Completions boost RUP2',
        cost: 1e8,
        effect: () => D(1+data.chal.totalCompletions/3),
        target: 'RUP2'
    },
    {
        desc: 'RUP3 levels boost UP3',
        cost: 1e12,
        effect: () => Decimal.max(1, data.incrementy.rebuyableAmt[2]/3),
        target: 'IUP3'
    }
]

function getRUPEffect(i){
    const base = rupData[i].effectBase !== undefined ? rupData[i].effectBase : i > 2 ? 1 : D(1)
    return data.incrementy.rebuyableAmt[i] > 0 ? rupData[i].effect() : base
}
function getRUPSign(i){
    return rupData[i].sign ? rupData[i].sign : 'x'
}

function getIUPEffect(i){
    const base = iupData[i].baseEffect ?? D(1) // I remembered the ?? operator existed!
    return data.incrementy.hasIUP[i] && !inPurification(3) ? iupData[i].effect() : base
}
function getIUPSign(i){
    return iupData[i].sign ? iupData[i].sign : 'x'
}

function initIUPs(){
    const container = DOM('incrementyUpgradeContainer')
    for (let i = 0; i < 2; i++) {
        const type = i > 0 ? 'iup' : 'rup'
        for (let j = 0; j < 2; j++) {
            const row = document.createElement('div')
            row.className = 'row flexBox'
            for (let k = 0; k < 3; k++) {
                const id = k+j*3
                const upgrade = document.createElement('button')

                upgrade.id = type+id
                upgrade.className = i > 0 ? data.incrementy.hasIUP[id] ? 'boughtIUP' : 'iup' : 'rebuyableIUP'

                if(i > 0) upgrade.addEventListener('click', ()=> buyIUP(id))
                else upgrade.addEventListener('click', ()=> buyRUP(id))

                boostManager.register({
                    name: type.toUpperCase()+(id+1),
                    target: i > 0 ? iupData[id].target : rupData[id].target,
                    sign: i > 0 ? getIUPSign(id) : getRUPSign(id),
                    color: graphColors.incrementy,
                    effect: () => i > 0 ? getIUPEffect(id) : getRUPEffect(id),
                    shouldDisplay: () => i > 0 ? data.incrementy.hasIUP[id] : data.incrementy.rebuyableAmt[id] > 0
                })

                row.appendChild(upgrade)
            }
            container.appendChild(row)
        }
    }
}

function updateIncrementyHTML(){
    DOM("incrementyText").innerText = `You have ${format(data.incrementy.amt)} Incrementy [+${format(incrementyGain())}/s], multiplying AutoBuyer speed by ${format(incrementyMult())}\nYou gain Incrementy based on your Ordinal, but only above Ψ(Ω) and while you are not in any Challenges`;
    for (let i = 0; i < data.incrementy.rebuyableAmt.length; i++) {
        if(i > 2) DOM(`rup${i}`).style.display = hasAOMilestone(3) ? 'block' : 'none'
        if(i > 2 && !hasAOMilestone(3)) continue
        const extraLevels = i === 0 ? `+${getIUPEffect(3)}` : ''
        DOM(`rup${i}`).innerText = `[RUP${i+1}] ${rupData[i].desc} (${format(data.incrementy.rebuyableAmt[i])}${extraLevels})\n${format(getRebuyableCost(i))} Incrementy\nCurrently: ${formatEffect(getRUPEffect(i), getRUPSign(i))}`
    }
    for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
        const finisher = data.incrementy.hasIUP[i] ? `Currently: ${formatEffect(getIUPEffect(i), getIUPSign(i))}` : `${format(iupData[i].cost)} Incrementy`
        DOM(`iup${i}`).innerText = `[IUP${i+1}] ${iupData[i].desc}\n${finisher}`
    }
    DOM('chargeButton').innerText = `Sacrifice ${format(chargeReq())} Incrementy for 1 Charge\nYou have ${data.incrementy.charge} Charge (${data.incrementy.totalCharge} total)`
}

function incrementyMult() {
    const base = Decimal.pow(Decimal.sqrt(data.incrementy.amt).add(10), 1 / 4)
    const multiplier = Decimal.pow(data.incrementy.amt, 1 / 16)
    return Decimal.max(1, base.mul(multiplier).div(negativeChargeEffect(true)))
}

function incrementyGain() {
    const areChallengesClear = checkAllIndexes(data.chal.active, true) === 0
    if (!data.ord.isPsi || !areChallengesClear || inPurification(3)) return D(0)

    let ord = D(data.ord.ordinal)

    let base = Decimal.log10(ord.plus(1)).div(10)
    let iupMults = base.times(getRUPEffect(0)).times(getRUPEffect(2)).times(getIUPEffect(0))
    let otherMults = iupMults.times(getHierarchyEffect(0)).times(getAlephEffect(3)).times(getCUPEffect(4)).times(getBUPEffect(14))
        .times(getAOEffect(2)).times(getStableEnergyEffect(0, 0))
    if(hasHypercharge(2)) return otherMults.times(negativeChargeEffect(false)).pow(getStableHyperchargeEffect())
    return otherMults.div(negativeChargeEffect(false)).pow(getStableHyperchargeEffect())
}

function getRebuyableCost(i) {
    // We don't talk about this one
    return Decimal.sqrt(rupData[i].costScaling * (rupData[i].costScaling * data.incrementy.rebuyableAmt[i] + 1)).mul(Decimal.pow((rupData[i].costScaling * data.incrementy.rebuyableAmt[i] + 1) / Math.E, (rupData[i].costScaling * data.incrementy.rebuyableAmt[i] + 1) / 2)).ceil().times(rupData[i].costBase);
}

function buyIUP(i){
    if(data.incrementy.hasIUP[i] || data.incrementy.amt.lt(iupData[i].cost)) return

    data.incrementy.hasIUP[i] = true
    data.incrementy.amt = data.incrementy.amt.sub(iupData[i].cost)

    DOM(`iup${i}`).className = 'boughtIUP'
}
function buyRUP(i){
    if(data.incrementy.amt.lt(getRebuyableCost(i))) return
    data.incrementy.amt = data.incrementy.amt.sub(getRebuyableCost(i))
    ++data.incrementy.rebuyableAmt[i]
}
function getTotalIBuyables(){
    let total = 0
    for (let i = 0; i < data.incrementy.rebuyableAmt.length; i++) {
        total += data.incrementy.rebuyableAmt[i]
    }
    return D(total).add(getIUPEffect(3)).toNumber()
}

/*
        Pain
        -Flame, 8/26/23
 */
/*
        I really need to fix this
        - Flame, again, 22/11/23
        Wait that date doesn't exist
        - Flame, 11/24/23
 */
/*
        YIPEEEEEEEEEEEEE HERE WE GO AGAIN
        - Flame, once again, 11/24/23
*/
/*
        Hi chat!!
        - flamecaster96 05/07/24
 */
/*
        I am still here in the year of our lord twenty twenty-five
        - me
 */
/*
        Today I reworked the IUP/RUP code, removing the giant block of code these comments were referring to
        - Flame, 11/18/25
 */

function chargeBUP(i, bottomRow){
    if(data.boost.isCharged[i] || inPurification(3)) return
    if(!data.incrementy.charge > 0) return
    if(bottomRow && data.incrementy.charge < getBottomRowChargeCost()) return

    data.boost.isCharged[i] = true
    data.incrementy.charge -= bottomRow ? getBottomRowChargeCost() : 1

    if(bottomRow){
        ++data.boost.bottomRowCharges
        updateBUPInfoText()
    }

    DOM(`bup${i}`).className = 'chargedBUP'
    DOM(`bup${i}`).innerText = `${getBUPDesc(i)}`
    showNextBUPLevelEffect(i)
}
let getBottomRowChargeCost = () => 13+(12*data.boost.bottomRowCharges)

function respecCharge(c=false){
    if(data.baseless.baseless) return

    for (let i = 0; i < data.boost.isCharged.length; i++) {
        data.boost.isCharged[i] = false
        DOM(`bup${i}`).className = data.boost.hasBUP[i] ? 'boughtBUP' : 'bup'
        DOM(`bup${i}`).innerHTML = `${getBUPDesc(i)}`
    }
    data.incrementy.charge = data.incrementy.totalCharge-getTotalChargeInHypercharge()
    data.boost.bottomRowCharges = 0
    if(hasSluggishMilestone(3)) updateBUPInfoText()
    if(!c) chalExit()
}

function buyCharge(){
    if(data.incrementy.amt.gte(chargeReq())){
        data.incrementy.amt = data.incrementy.amt.sub(chargeReq())
        ++data.incrementy.totalCharge
        ++data.incrementy.charge

        DOM('chargeRefund').style.display = 'block'
    }
    if(data.incrementy.totalCharge === 72) checkCollapseUnlockHTML()
}

function chargeReq() {
    let chargeExp = 6+((data.incrementy.totalCharge)*(2+Math.floor((data.incrementy.totalCharge)/12)))
    chargeExp -= Decimal.log10(getHierarchyEffect(1))
    return D(10).pow(chargeExp)
}

boostManager.register({
    name: 'RUP1 Levels',
    target: 'RUP1',
    color: graphColors.incrementy,
    shouldDisplay: () => data.incrementy.rebuyableAmt[0] > 0
})

boostManager.register({
    name: 'Incrementy Gain',
    target: 'Incrementy',
    sign: '+/s',
    color: graphColors.incrementy,
    effect: () => incrementyGain(),
    shouldDisplay: () => isTabUnlocked('incrementy')
})
boostManager.register({
    name: 'Incrementy',
    target: 'All AutoBuyers',
    sign: 'x',
    color: graphColors.incrementy,
    effect: () => incrementyMult(),
    shouldDisplay: () => isTabUnlocked('incrementy')
})

boostManager.register({
    name: 'Charge Requirement',
    color: graphColors.incrementy,
    shouldDisplay: () => isTabUnlocked('hierarchies')
})
