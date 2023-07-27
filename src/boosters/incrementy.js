function updateIncrementyHTML(){
    DOM("incrementyText").innerText = `You have ${format(data.incrementy.amt)} Incrementy [+${format(incrementyGain())}/s], multiplying AutoBuyer speed by ${format(incrementyMult())}\nYou gain Incrementy based on your Ordinal, but only above Ψ(Ω). You cannot gain Incrementy in Challenges.`;
    DOM(`iup0`).innerText = `[RUP1] ${iupDesc[0]} (${formatWhole(data.incrementy.rebuyableAmt[0])}+${iup7Effect()})\n${format(getRebuyableCost(0))} Incrementy\nCurrently: ${format(iupEffects[0]())}x`
    DOM(`iup1`).innerText = `[RUP2] ${iupDesc[1]} (${formatWhole(data.incrementy.rebuyableAmt[1])})\n${format(getRebuyableCost(1))} Incrementy\nCurrently: ${format(iupEffects[1]())}x`
    DOM(`iup2`).innerText = `[RUP3] ${iupDesc[2]} (${formatWhole(data.incrementy.rebuyableAmt[2])})\n${format(getRebuyableCost(2))} Incrementy\nCurrently: ${format(iupEffects[2]())}x`
    DOM('chargeButton').innerText = `Sacrifice ${format(chargeReq())} Incrementy for 1 Charge\nYou have ${data.incrementy.charge} Charge (${data.incrementy.totalCharge} total)`
}
function switchIUPText(i, mode){
    mode ? DOM(`iup${i}`).innerText = `[UP${i-2}] ${iupDesc[i]}\nCurrently: ${format(iupEffects[i]())}`
    : DOM(`iup${i}`).innerText = `[UP${i-2}] ${iupDesc[i]}\n${format(iupCosts[i])} Incrementy`
}

let incrementyMult = () => Math.max(1, ((Math.pow(Decimal.sqrt(data.incrementy.amt).toNumber()+10, 1/4))*Decimal.pow(data.incrementy.amt, 1/16).toNumber())/negativeChargeEffect(true))
function incrementyGain() {
    if (!data.ord.isPsi || checkAllIndexes(data.chal.active, true) > 0) return D(0)

    let base = Decimal.log10(data.ord.ordinal.plus(1)).div(10)
    let iupMults= base.times(iup1Effect()).times(iup3Effect()).times(iup4Effect())
    let otherMults = iupMults.times(hierarchyData[0].effect()).times(alephEffect(3)).times(cupEffect(4)).times(sBUP2Effect())
    return otherMults.div(negativeChargeEffect(false))
}

const iupDesc = ['Double Incrementy Gain', 'Triple Dynamic Gain', 'Dynamic Factor boosts Incrementy gain',
                 'Total Factor Boosts boost Incrementy Gain', 'Incrementy Multiplies the Dynamic Cap at a reduced rate (does not affect C5)', 'Dynamic boosts AutoBuyers at a reduced rate',
                 'Challenge Completions provide free levels of Repeatable Upgrade 1', 'Repeatable Upgrade 2 is boosted by Challenge Completions', 'Total Repeatable Upgrade 3 levels boosts Upgrade 3']
const iupCosts = [1, 1, 1, 2e6, 2e5, 1e10, 3e4, 1e8, 1e12]
let rebuyableCostBases = [20, 1000, 100]

let getRebuyableCost = (i) => Decimal.sqrt(2*(2*data.incrementy.rebuyableAmt[i]+1)).mul(Decimal.pow((2*data.incrementy.rebuyableAmt[i]+1)/Math.E, (2*data.incrementy.rebuyableAmt[i]+1)/2)).ceil().times(rebuyableCostBases[i])
function initIUPs(){
    let rows = [DOM('iupRow0'), DOM('iupRow1'), DOM('iupRow2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let r = i == 0 ? true : false
        for (let n = 0; n < 3; n++) {
            let iup = document.createElement('button')
            iup.className = 'iup'
            iup.id = `iup${total}`
            iup.innerText = r ? `[UP${total-2}] ${iupDesc[total]} (${formatWhole(data.incrementy.rebuyableAmt[total])})\n${format(getRebuyableCost(total))} Incrementy\nCurrently: ${format(iupEffects[total]())}x`
            : `[UP${total-2}] ${iupDesc[total]}\n${format(iupCosts[total])} Incrementy`
            rows[i].append(iup)
            ++total
        }
    }
    for (let i = 0; i < data.incrementy.hasIUP.length; i++) {

        if(i > 2){
            DOM(`iup${i}`).addEventListener('mouseenter', ()=>switchIUPText(i, true))
            DOM(`iup${i}`).addEventListener('mouseleave', ()=>switchIUPText(i, false))
            DOM(`iup${i}`).addEventListener('click', ()=>buyIUP(i))
            DOM(`iup${i}`).style.color = data.incrementy.hasIUP[i]?'#f542a4':'#8080FF'
        }
        else{
            DOM(`iup${i}`).addEventListener('click', ()=>buyRUP(i))
            DOM(`iup${i}`).style.color = '#8080FF'
        }
    }
}

function buyIUP(i){
    if(data.incrementy.hasIUP[i] || data.incrementy.amt.lt(iupCosts[i])) return

    data.incrementy.hasIUP[i] = true
    data.incrementy.amt = data.incrementy.amt.sub(iupCosts[i])

    DOM(`iup${i}`).style.color = '#f542a4'
}
function buyRUP(i){
    if(data.incrementy.amt.lt(getRebuyableCost(i))) return

    data.incrementy.amt = data.incrementy.amt.sub(getRebuyableCost(i))
    ++data.incrementy.rebuyableAmt[i]

    DOM(`iup${i}`).innerText = `${iupDesc[i]} (${formatWhole(data.incrementy.rebuyableAmt[i])})\n${format(getRebuyableCost(i))} Incrementy\nCurrently: ${format(iupEffects[i]())}x`
}
function getTotalIBuyables(){
    let total = 0
    for (let i = 0; i < data.incrementy.rebuyableAmt.length; i++) {
        total += data.incrementy.rebuyableAmt[i]
    }
    return total+iup7Effect()
}

let iup1Effect = () => Math.max(1, (2+alephNullEffects[0]())**(data.incrementy.rebuyableAmt[0] + iup7Effect()))
let iup2Effect = () => Math.max(1, (3**data.incrementy.rebuyableAmt[1])*iup8Effect())
let iup3Effect = () => data.incrementy.rebuyableAmt[2] > 0 ? (Math.max(1, Math.sqrt(data.dy.level)))*(1+(data.incrementy.rebuyableAmt[2])) : 1
let iup4Effect = () => data.incrementy.hasIUP[3] ? Math.max(1, data.boost.times) : 1
let iup5Effect = () => data.incrementy.hasIUP[4] ? data.hierarchies.hasUpgrade[6] ? Math.max(1, Decimal.pow(data.incrementy.amt, 1/8).toNumber()+1)
: Math.max(1, Decimal.pow(data.incrementy.amt, 1/16).toNumber()+1) : 1
let iup6Effect = () => data.incrementy.hasIUP[5] ? Math.max(1, Math.sqrt(data.dy.level+1))*iup9Effect()*hbData[2].effect()*hbData[5].effect()*alephEffect(7) : 1
let iup7Effect = () => data.incrementy.hasIUP[6] ? Math.floor(data.chal.totalCompletions/3)*(hasSingFunction(4) ? 2 : 1) : 0
let iup8Effect = () => data.incrementy.hasIUP[7] ? Math.max(1, 1+data.chal.totalCompletions/3) : 1
let iup9Effect = () => data.incrementy.hasIUP[8] ? data.hierarchies.hasUpgrade[1] ? Math.max(1, data.incrementy.rebuyableAmt[2]/3)
: Math.max(1, Math.sqrt(data.incrementy.rebuyableAmt[2])) : 1

let iupEffects = [iup1Effect, iup2Effect, iup3Effect, iup4Effect, iup5Effect, iup6Effect, iup7Effect, iup8Effect, iup9Effect]


function chargeBUP(i, bottomRow){
    if(!data.incrementy.charge > 0 || data.boost.isCharged[i]) return
    if(bottomRow && data.incrementy.charge < getBottomRowChargeCost()) return

    data.boost.isCharged[i] = true
    data.incrementy.charge -= bottomRow ? getBottomRowChargeCost() : 1

    if(bottomRow){
        ++data.boost.bottomRowCharges
        DOM('bupBottomText').innerText = `Click a purchased Upgrade to Supercharge it! The cost to Supercharge a bottom-row Upgrade is currently ${getBottomRowChargeCost()} Charge.\nThe Unlockables Column does not consume Boosters`
    }

    DOM(`bup${i}`).className = 'chargedBUP'
    DOM(`bup${i}`).innerText = `${chargedBUPDesc[i]}`
    DOM(`bup${i}`).style.color = 'goldenrod'
}
let getBottomRowChargeCost = () => 13+(12*data.boost.bottomRowCharges)

function respecCharge(c=false){
    if(data.baseless.baseless) return
    let indexes = []
    for (let i = 0; i < data.boost.isCharged.length; i++) {
        if (data.boost.isCharged[i]) indexes.push(i)
        data.boost.isCharged[i] = false
        DOM(`bup${i}`).className = 'bup'
        DOM(`bup${i}`).innerText = `${bupDesc[i]}\n${bupCosts[i]} Boosters`
        DOM(`bup${i}`).style.color = `#8080FF`
    }
    data.incrementy.charge = data.incrementy.totalCharge-data.sing.level
    data.boost.bottomRowCharges = 0
    if(data.collapse.hasSluggish[3]) DOM('bupBottomText').innerText = `Click a purchased Upgrade to Supercharge it! The cost to Supercharge a bottom-row Upgrade is currently ${getBottomRowChargeCost()} Charge.\nThe Unlockables Column does not consume Boosters`
    if(!c) chalExit()
}

function sacrificeIncrementy(){
    if(data.incrementy.amt.gte(chargeReq())){

        if(data.incrementy.totalCharge < 1) initBUPHover()

        data.incrementy.amt = data.incrementy.amt.sub(chargeReq())
        ++data.incrementy.totalCharge
        ++data.incrementy.charge

        DOM('chargeRefund').style.display = 'block'
    }
}

//let chargeReq = () => (10**(6+((data.incrementy.totalCharge+data.darkness.sacrificedCharge)*(2+Math.floor((data.incrementy.totalCharge+data.darkness.sacrificedCharge)/12)))))/hierarchyData[1].effect()
function chargeReq() {
    let chargeExp = 6+((data.incrementy.totalCharge+data.darkness.sacrificedCharge)*(2+Math.floor((data.incrementy.totalCharge+data.darkness.sacrificedCharge)/12)));
    chargeExp -= Math.log10(hierarchyData[1].effect());
    return D(10).pow(chargeExp);
}
