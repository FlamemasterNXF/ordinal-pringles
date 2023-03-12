function updateIncrementyHTML(){
}

let incrementyMult = () => Math.max(1, Math.sqrt(data.incrementy.amt))
function incrementyGain() {
    if (!data.ord.isPsi) return 0

    let base = Math.log10(data.ord.ordinal+1) / 10*iup1Effect()*iup3Effect()
    return base
}

const iupDesc = ['Double Incrementy Gain', 'Triple Dynamic Gain', 'Dynamic Factor boosts Incrementy gain',
                 'Total Factor Boosts boost Incrementy Gain', 'Incrementy boosts Dynamic Cap at a reduced rate (does not effect C5)', 'Dynamic boosts AutoBuyers at a reduced rate',
                 'Challenge Completions provide free levels of Repeatable Upgrade 1', 'Repeatable Upgrade 2 now boosts Dynamic gain by 10x', 'Total Repeatable Upgrade 3 levels boosts Upgrade 3']
const iupCosts = [1, 1, 1, 1e6, 2e5, 1e10, 3e4, 1e7, 1e8]
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

let iup1Effect = () => Math.max(1, 2**(data.incrementy.rebuyableAmt[0] + iup4Effect()))
let iup2Effect = () => Math.max(1, 3**data.incrementy.rebuyableAmt[1])
let iup3Effect = () => data.incrementy.rebuyableAmt[2] > 0 ? (Math.max(1, Math.sqrt(data.dy.level)))*(1+(data.incrementy.rebuyableAmt[2])) : 1
let iup4Effect = () => data.incrementy.hasIUP[6] ? Math.floor(data.chal.totalCompletions/3) : 0
let iup5Effect = () => data.incrementy.hasIUP[4] ? Math.sqrt(Math.sqrt(Math.max(1, Math.log10(incrementyMult()+1)))) : 1
let iupEffects = [iup1Effect, iup2Effect, iup3Effect]