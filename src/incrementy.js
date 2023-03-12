function updateIncrementyHTML(){
}

let incrementyMult = () => Math.max(1, Math.sqrt(data.incrementy.amt))
let incrementyGain = () => data.ord.isPsi ? (Math.log10(data.ord.ordinal+1) / 10)*iup1Effect()*iup3Effect() : 0

const iupDesc = ['Double Incrementy Gain', 'Add 1 to the Dynamic Gain Multiplier', 'Dynamic Factor boosts Incrementy gain',
                 'Dynamic Gain is 100x Faster', 'Incrementy boosts Dynamic Cap at a reduced rate', 'Dynamic boosts AutoBuyers at a reduced rate']
const iupCosts = [1, 1, 1, 1e10, 1e20, 1e30]
function initIUPs(){
    let rows = [DOM('iupRow0'), DOM('iupRow1')]
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

let iup1Effect = () => Math.max(1, 2**data.incrementy.rebuyableAmt[0])
let iup2Effect = () => 1+data.incrementy.rebuyableAmt[1]
let iup3Effect = () => data.incrementy.rebuyableAmt[2] > 0 ? (Math.max(1, Math.sqrt(data.dy.level)))*(1+(data.incrementy.rebuyableAmt[2]/10)) : 1
let iupEffects = [iup1Effect, iup2Effect, iup3Effect]