function updateIncrementyHTML(){
}

let incrementyMult = () => Math.max(1, Math.sqrt(data.incrementy.amt))
let incrementyGain = () => data.ord.isPsi ? Math.log10(data.ord.ordinal+1) / 10 : 0

const iupDesc = ['Double Incrementy Gain', 'Multiply Incrementy Gain by 1.1', 'Dynamic Factor boosts Incrementy gain',
                 'Dynamic Gain is 100x Faster', 'Incrementy boosts Dynamic Cap at a reduced rate', 'Dynamic boosts AutoBuyers at a reduced rate']
const iupCosts = [100, 1000, 1, 1, 1, 1]
function initIUPs(){
    let rows = [DOM('iupRow0'), DOM('iupRow1')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        let r = i == 0 ? true : false
        for (let n = 0; n < 3; n++) {
            let iup = document.createElement('button')
            iup.className = 'iup'
            iup.id = `iup${total}`
            iup.innerText = r ? `${iupDesc[total]} (${formatWhole(data.incrementy.rebuyableAmt[total])})\n${format(iupCosts[total])} Incrementy`
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
    if(data.incrementy.hasIUP[i] || data.incrementy.amt < iupCosts[i]) return

    r ? ++data.incrementy.rebuyableAmt[i] : data.incrementy.hasIUP[i] = true
    data.incrementy.amt -= iupCosts[i]

    r ? DOM(`iup${i}`).innerText = `${iupDesc[i]} (${formatWhole(data.incrementy.rebuyableAmt[i])})\n${format(iupCosts[i])} Incrementy`
    : DOM(`iup${i}`).style.color = '#f542a4'
}