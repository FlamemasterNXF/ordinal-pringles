function updateIncrementyHTML(){
    DOM("incrementyText").innerText = `You have ${format(data.incrementy.amt)} Incrementy [+${format(incrementyGain())}/s], multiplying AutoBuyer speed by ${format(incrementyMult())}\nYou gain Incrementy based on your Ordinal, but only above Ψ(Ω)${!getDepth() > 1 ? 'and while you are not in any Challenges' : ''}`;
    DOM(`iup0`).innerText = `[RUP1] ${iupDesc[0]} (${formatWhole(data.incrementy.rebuyableAmt[0])}+${iup7Effect()})\n${format(getRebuyableCost(0))} Incrementy\nCurrently: ${format(iupEffects[0]())}x`
    DOM(`iup1`).innerText = `[RUP2] ${iupDesc[1]} (${formatWhole(data.incrementy.rebuyableAmt[1])})\n${format(getRebuyableCost(1))} Incrementy\nCurrently: ${format(iupEffects[1]())}x`
    DOM(`iup2`).innerText = `[RUP3] ${iupDesc[2]} (${formatWhole(data.incrementy.rebuyableAmt[2])})\n${format(getRebuyableCost(2))} Incrementy\nCurrently: ${format(iupEffects[2]())}x`
    DOM(`iup9`).innerText = `[RUP4] ${iupDesc[9]} (${formatWhole(data.incrementy.rebuyableAmt[3])})\n${format(getRebuyableCost(3))} Incrementy\nCurrently: ${format(iupEffects[9]())}x`
    DOM(`iup10`).innerText = `[RUP5] ${iupDesc[10]} (${formatWhole(data.incrementy.rebuyableAmt[4])})\n${format(getRebuyableCost(4))} Incrementy\nCurrently: ${format(iupEffects[10]())}x`
    DOM(`iup11`).innerText = `[RUP6] ${iupDesc[11]} (${formatWhole(data.incrementy.rebuyableAmt[5])})\n${format(getRebuyableCost(5))} Incrementy\nCurrently: ${format(iupEffects[11]())}x`
    DOM('chargeButton').innerText = `Sacrifice ${format(chargeReq())} Incrementy for 1 Charge\nYou have ${data.incrementy.charge} Charge (${data.incrementy.totalCharge} total)`
}
function switchIUPText(i, mode){
    mode ? DOM(`iup${i}`).innerHTML = `[UP${i-2}] ${iupDesc[i]}<br>Currently: ${format(iupEffects[i]())}`
    : DOM(`iup${i}`).innerHTML = `[UP${i-2}] ${iupDesc[i]}<br>${format(iupCosts[i])} Incrementy`
}

let incrementyMult = () => Decimal.max(1, Decimal.pow(Decimal.sqrt(data.incrementy.amt).add(10), 1/4).mul(Decimal.pow(data.incrementy.amt, 1/16)).div(negativeChargeEffect(true)))
function incrementyGain() {
    const areChallengesClear = checkAllIndexes(data.chal.active, true) === 0 || (data.darkness.darkened && getDepth() > 1)
    if (!data.ord.isPsi || !areChallengesClear || inPurification(3)) return D(0)

    let ord = D(data.ord.ordinal)

    let base = Decimal.log10(ord.plus(1)).div(10)
    let iupMults = base.times(iup1Effect()).times(iup3Effect()).times(iup4Effect())
    let otherMults = iupMults.times(getHierarchyEffect(0)).times(getAlephEffect(3)).times(getCUPEffect(4)).times(getBUPEffect(14))
        .times(getAOEffect(2)).times(getStableEnergyEffect(0, 0))
    if(hasHypercharge(2)) return otherMults.times(negativeChargeEffect(false)).pow(getStableHyperchargeEffect())
    return otherMults.div(negativeChargeEffect(false)).pow(getStableHyperchargeEffect())
}

const iupDesc = ['Double Incrementy Gain', 'Triple Dynamic Gain', 'Dynamic Factor boosts Incrementy gain',
    'Total Factor Boosts boost Incrementy Gain', 'Incrementy Multiplies the Dynamic Cap at a reduced rate (does not apply in C6)', 'Dynamic boosts AutoBuyers at a reduced rate',
    'Challenge Completions provide free levels of Repeatable Upgrade 1', 'Repeatable Upgrade 2 is boosted by Challenge Completions', 'Total Repeatable Upgrade 3 levels boosts Upgrade 3',
    'Double Negative Charge gain', 'Gain a level of the second Darkness Upgrade', 'Boost Cardinal gain'
]
const iupCosts = [1, 1, 1, 2e6, 2e5, 1e10, 3e4, 1e8, 1e12, 1e100, 1e150, 1e200]
let rebuyableCostBases = [20, 1000, 100, 1e150, 1e150, 1e150]
let rebuyableCostScalings = [
    () => Math.max(1, 2),
    () => Math.max(1, 2),
    () => Math.max(1, 2),
    () => Math.max(1, 30),
    () => Math.max(1, 40),
    () => Math.max(1, 10),
]

let getRebuyableCost = (i) => Decimal.sqrt(rebuyableCostScalings[i]()*(rebuyableCostScalings[i]()*data.incrementy.rebuyableAmt[i]+1)).mul(Decimal.pow((rebuyableCostScalings[i]()*data.incrementy.rebuyableAmt[i]+1)/Math.E, (rebuyableCostScalings[i]()*data.incrementy.rebuyableAmt[i]+1)/2)).ceil().times(rebuyableCostBases[i])
function initIUPs(){
    let rows = [DOM('iupRow0'), DOM('iupRow1'), DOM('iupRow2'), DOM('iupRow3'),]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let r = i === 0 || i === 4
        for (let n = 0; n < 3; n++) {
            let iup = document.createElement('button')
            iup.id = `iup${total}`
            iup.innerHTML = r ? `[UP${total-2}] ${iupDesc[total]} (${formatWhole(data.incrementy.rebuyableAmt[total])})<br>${format(getRebuyableCost(total))} Incrementy\nCurrently: ${format(iupEffects[total]())}x`
            : `[UP${total-2}] ${iupDesc[total]}<br>${format(iupCosts[total])} Incrementy`
            rows[i].append(iup)
            ++total
        }
    }
    for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
        if(i > 2 && i < 9){
            DOM(`iup${i}`).addEventListener('mouseenter', ()=>switchIUPText(i, true))
            DOM(`iup${i}`).addEventListener('mouseleave', ()=>switchIUPText(i, false))
            DOM(`iup${i}`).addEventListener('click', ()=>buyIUP(i))
            DOM(`iup${i}`).className = data.incrementy.hasIUP[i] ? 'boughtIUP' : 'iup'
        }
        else{
            DOM(`iup${i}`).addEventListener('click', ()=>buyRUP(i))
            DOM(`iup${i}`).className = 'rebuyableIUP'
        }
    }
}

function buyIUP(i){
    if(data.incrementy.hasIUP[i] || data.incrementy.amt.lt(iupCosts[i])) return

    data.incrementy.hasIUP[i] = true
    data.incrementy.amt = data.incrementy.amt.sub(iupCosts[i])

    DOM(`iup${i}`).className = 'boughtIUP'
}
function buyRUP(i){
    let reb = i > 2 ? i-6 : i
    if(data.incrementy.amt.lt(getRebuyableCost(reb))) return
    data.incrementy.amt = data.incrementy.amt.sub(getRebuyableCost(reb))
    ++data.incrementy.rebuyableAmt[reb]

    DOM(`iup${i}`).innerText = `${iupDesc[i]} (${formatWhole(data.incrementy.rebuyableAmt[reb])})\n${format(getRebuyableCost(reb))} Incrementy\nCurrently: ${format(iupEffects[i]())}x`
}
function getTotalIBuyables(){
    let total = 0
    for (let i = 0; i < data.incrementy.rebuyableAmt.length; i++) {
        total += data.incrementy.rebuyableAmt[i]
    }
    return D(total).add(iup7Effect()).toNumber()
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
let iup1Effect = () => Decimal.max(1, D(2+getNormalANREffect(1, true)).pow(D(data.incrementy.rebuyableAmt[0]).add(iup7Effect())))
let iup2Effect = () =>  inPurification(1) ? 1 : Decimal.max(1, D(3).pow(data.incrementy.rebuyableAmt[1]).mul(iup8Effect()))
let iup3Effect = () => data.incrementy.rebuyableAmt[2] > 0 && !inPurification(1) && !inPurification(3) ? (Decimal.max(1, Decimal.sqrt(data.dy.level))).mul(1+(data.incrementy.rebuyableAmt[2])) : D(1)
let iup4Effect = () => data.incrementy.hasIUP[3] && !inPurification(3) ? Decimal.max(1, data.boost.times) : D(1)
let iup5Effect = () => data.incrementy.hasIUP[4] && !inPurification(3) ? data.hierarchies.hasUpgrade[6] ? Decimal.max(1, Decimal.pow(data.incrementy.amt, 1/8).add(1))
: Decimal.max(1, Decimal.pow(data.incrementy.amt, 1/16).add(1)) : D(1)
let iup6Effect = () => data.incrementy.hasIUP[5] && !inPurification(1) && !inPurification(3) ? Decimal.max(1, Decimal.sqrt(data.dy.level.add(1))).mul(iup9Effect()).mul(hbData[2].effect()).mul(hbData[5].effect()).mul(getAlephEffect(7)) : D(1)
let iup7Effect = () => data.incrementy.hasIUP[6] && !inPurification(3) ? Decimal.floor(data.chal.totalCompletions/3).plus(getHyperchargeEffect(3)) : D(0)
let iup8Effect = () => data.incrementy.hasIUP[7] && !inPurification(3) ? Decimal.max(1, 1+data.chal.totalCompletions/3) : D(1)
let iup9Effect = () => data.incrementy.hasIUP[8] && !inPurification(3) ? data.hierarchies.hasUpgrade[1] ? Decimal.max(1, data.incrementy.rebuyableAmt[2]/3)
: Decimal.max(1, Decimal.sqrt(data.incrementy.rebuyableAmt[2])) : D(1)

let iup10Effect = () => 2**data.incrementy.rebuyableAmt[3]
let iup11Effect = () =>  data.incrementy.rebuyableAmt[4]
let iup12Effect = () => data.incrementy.rebuyableAmt[5] > 0 ? data.incrementy.rebuyableAmt[5]+1 : 1

let iupEffects = [iup1Effect, iup2Effect, iup3Effect, iup4Effect, iup5Effect, iup6Effect, iup7Effect, iup8Effect, iup9Effect, iup10Effect, iup11Effect, iup12Effect]


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

function sacrificeIncrementy(){
    if(data.incrementy.amt.gte(chargeReq())){
        // if(data.incrementy.totalCharge < 1) initBUPHover()
        data.incrementy.amt = data.incrementy.amt.sub(chargeReq())
        ++data.incrementy.totalCharge
        ++data.incrementy.charge

        DOM('chargeRefund').style.display = 'block'
    }
    if(data.incrementy.totalCharge === 72) checkCollapseUnlockHTML()
}

//let chargeReq = () => (10**(6+((data.incrementy.totalCharge+data.darkness.sacrificedCharge)*(2+Math.floor((data.incrementy.totalCharge+data.darkness.sacrificedCharge)/12)))))/hierarchyData[1].effect()
let chargeCostBase = () => 10
function chargeReq() {
    let chargeExp = 6+((data.incrementy.totalCharge+data.darkness.sacrificedCharge)*(2+Math.floor((data.incrementy.totalCharge+data.darkness.sacrificedCharge)/12)));
    chargeExp -= Decimal.log10(getHierarchyEffect(1));
    return D(chargeCostBase()).pow(chargeExp);
}
