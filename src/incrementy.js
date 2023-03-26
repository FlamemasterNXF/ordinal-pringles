function updateIncrementyHTML(){
    DOM("incrementyText").innerText = `You have ${format(data.incrementy.amt)} Incrementy [+${format(incrementyGain())}/s], multiplying AutoBuyer speed by ${format(incrementyMult())}\nYou gain Incrementy based on your Ordinal, but only above Ψ(Ω).`;
    DOM(`iup0`).innerText = `${iupDesc[0]} (${formatWhole(data.incrementy.rebuyableAmt[0])}+${iup7Effect()})\n${format(data.incrementy.rebuyableCosts[0])} Incrementy\nCurrently: ${format(iupEffects[0]())}x`
    DOM(`iup1`).innerText = `${iupDesc[1]} (${formatWhole(data.incrementy.rebuyableAmt[1])})\n${format(data.incrementy.rebuyableCosts[1])} Incrementy\nCurrently: ${format(iupEffects[1]())}x`
    DOM(`iup2`).innerText = `${iupDesc[2]} (${formatWhole(data.incrementy.rebuyableAmt[2])})\n${format(data.incrementy.rebuyableCosts[2])} Incrementy\nCurrently: ${format(iupEffects[2]())}x`
    DOM('chargeButton').innerText = `Sacrifice ${format(chargeReq())} Incrementy for 1 Charge\nYou have ${data.incrementy.charge} Charge (${data.incrementy.totalCharge} total)`
}

let incrementyMult = () => Math.max(1, Math.sqrt(Math.sqrt(data.incrementy.amt)))
function incrementyGain() {
    if (!data.ord.isPsi) return 0

    let base = Math.log10(data.ord.ordinal+1) / 10*iup1Effect()*iup3Effect()*iup4Effect()
    return base*hierarchyEffects[0].effect()
}

const iupDesc = ['Double Incrementy Gain', 'Triple Dynamic Gain', 'Dynamic Factor boosts Incrementy gain',
                 'Total Factor Boosts boost Incrementy Gain', 'Incrementy Multiplies the Dynamic Cap at a reduced rate (does not effect C5)', 'Dynamic boosts AutoBuyers at a reduced rate',
                 'Challenge Completions provide free levels of Repeatable Upgrade 1', 'Repeatable Upgrade 2 is boosted by Challenge Completions', 'Total Repeatable Upgrade 3 levels boosts Upgrade 3']
const iupCosts = [1, 1, 1, 2e6, 2e5, 1e10, 3e4, 1e8, 1e12]
function initIUPs(){
    let rows = [DOM('iupRow0'), DOM('iupRow1'), DOM('iupRow2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let r = i == 0 ? true : false
        for (let n = 0; n < 3; n++) {
            let iup = document.createElement('button')
            iup.className = 'iup'
            iup.id = `iup${total}`
            iup.innerText = r ? `${iupDesc[total]} (${formatWhole(data.incrementy.rebuyableAmt[total])})\n${format(data.incrementy.rebuyableCosts[total])} Incrementy\nCurrently: ${format(iupEffects[total]())}x`
            : `${iupDesc[total]}\n${format(iupCosts[total])} Incrementy`
            rows[i].append(iup)
            ++total
        }
    }
    for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
        let r = i < 3 ? true : false
        DOM(`iup${i}`).addEventListener('click', ()=>buyIUP(i, r))
        DOM(`iup${i}`).style.color = data.incrementy.hasIUP[i]?'#f542a4':'#8080FF'
    }
}

function buyIUP(i, r=false){
    let costArr = r ? data.incrementy.rebuyableCosts : iupCosts
    if(data.incrementy.hasIUP[i] || data.incrementy.amt < costArr[i]) return

    r ? ++data.incrementy.rebuyableAmt[i] : data.incrementy.hasIUP[i] = true
    data.incrementy.amt -= costArr[i]

    if (r) costArr[i] *= (2*data.incrementy.rebuyableAmt[i]+1)

    r ? DOM(`iup${i}`).innerText = `${iupDesc[i]} (${formatWhole(data.incrementy.rebuyableAmt[i])})\n${format(costArr[i])} Incrementy\nCurrently: ${format(iupEffects[i]())}x`
    : DOM(`iup${i}`).style.color = '#f542a4'
}

let iup1Effect = () => Math.max(1, 2**(data.incrementy.rebuyableAmt[0] + iup7Effect()))
let iup2Effect = () => Math.max(1, (3**data.incrementy.rebuyableAmt[1])*iup8Effect())
let iup3Effect = () => data.incrementy.rebuyableAmt[2] > 0 ? (Math.max(1, Math.sqrt(data.dy.level)))*(1+(data.incrementy.rebuyableAmt[2])) : 1
let iup4Effect = () => data.incrementy.hasIUP[3] ? data.boost.times : 1
let iup5Effect = () => data.incrementy.hasIUP[4] ? Math.max(1, Math.pow(data.incrementy.amt, 1/16)+1) : 1
let iup6Effect = () => data.incrementy.hasIUP[5] ? Math.max(1, Math.sqrt(data.dy.level+1))*iup9Effect() : 1
let iup7Effect = () => data.incrementy.hasIUP[6] ? Math.floor(data.chal.totalCompletions/3) : 0
let iup8Effect = () => data.incrementy.hasIUP[7] ? Math.max(1, 1+data.chal.totalCompletions/3) : 1
let iup9Effect = () => data.incrementy.hasIUP[8] ? Math.max(1, Math.sqrt(data.incrementy.rebuyableAmt[2])) : 1
let iupEffects = [iup1Effect, iup2Effect, iup3Effect]


function chargeBUP(i){
    if(!data.incrementy.charge > 0 || data.boost.isCharged[i]) return
    data.boost.isCharged[i] = true
    data.incrementy.charge -= 1

    DOM(`bup${i}`).className = 'chargedBUP'
    DOM(`bup${i}`).innerText = `${chargedBUPDesc[i]}`
}

function respecCharge(c=false){
    let indexes = []
    for (let i = 0; i < data.boost.isCharged.length; i++) {
        if (data.boost.isCharged[i]) indexes.push(i)
        data.boost.isCharged[i] = false
        DOM(`bup${i}`).className = 'bup'
        DOM(`bup${i}`).innerText = `${bupDesc[i]}\n${bupCosts[i]} Boosters`
    }
    data.incrementy.charge = data.incrementy.totalCharge
    if(!c) chalExit()
}

function sacrificeIncrementy(){
    if(data.incrementy.amt >= chargeReq() && data.incrementy.totalCharge < 12){

        if(data.incrementy.totalCharge < 1) initBUPHover()

        data.incrementy.amt -= chargeReq()
        ++data.incrementy.totalCharge
        ++data.incrementy.charge

        DOM('chargeRefund').style.display = 'block'
    }
}

let chargeReq = () => (10**(6+(data.incrementy.totalCharge*2)))/hierarchyEffects[1].effect()