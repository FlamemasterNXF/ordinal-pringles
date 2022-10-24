function autoCost(n) {
    return 100*2**data.autoLevels[n]
}

function buyAuto(n) {
    if(data.chal.active[0] && data.autoLevels[n] >= 1) return
    if (data.markup.powers < autoCost(n)) return
    data.markup.powers -= autoCost(n)
    ++data.autoLevels[n]
}
function buyMaxAuto() {
    if(data.chal.active[0] && (data.autoLevels[0] >= 1 || data.autoLevels[1] >= 1)) return

    const bulkSucc = Math.floor(Math.log2(data.markup.powers / 100))
    const bulkBuySucc = data.chal.active[0]?1:Math.max(bulkSucc - data.autoLevels[0], 0)
    data.autoLevels[0] += bulkBuySucc
    if (bulkBuySucc > 0) data.markup.powers -= 100 * (2 ** (data.autoLevels[0] - 1))
    for (const i in [1, 2, 3, 4, 5, 6, 7, 8, 9]) if (bulkBuySucc > i + 1) data.markup.powers -= 100 * (2 ** (data.autoLevels[0] - (i + 2)))

    const bulkMax = Math.floor(Math.log2(data.markup.powers / 100))
    const bulkBuyMax = data.chal.active[0]?1:Math.max(bulkMax - data.autoLevels[1], 0)
    data.autoLevels[1] += bulkBuyMax
    if (bulkBuyMax > 0) data.markup.powers -= 100 * (2 ** (data.autoLevels[1] - 1))
    for (const i in [1, 2, 3, 4, 5, 6, 7, 8, 9]) if (bulkBuyMax > i + 1) data.markup.powers -= 100 * (2 ** (data.autoLevels[1] - (i + 2)))
    buyAuto(0)
    buyAuto(1)

    /*for (let i in new Array(7).fill(0)) {
        i = Number(i)
        while ((game.ordinalPoints >= factorCost(i) || game.opIsPsi) && factorCost(i) != Infinity) buyFactor(i)
    }*/
}


function factorCost(n){
    return (10**(n+1))**(2**data.factors[n])
}
function hasFactor(n){
    return data.markup.shifts >= n
}
function factorEffect(n){
    if(data.chal.active[1] || data.factors[n] < 1) return 1
    const mult = data.boost.hasBUP[0]?2:1
    const add = data.boost.hasBUP[10]?3:0
    return ((data.factors[n]+(1+add))*mult*bup7Effect())*(Math.max(1+(data.markup.shifts-n-1)/10, 1)**[1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][data.markup.shifts])
}
function factorBoost(){
    let mult = 1
    for (let i = 0; i < data.factors.length; i++) {
        mult *= factorEffect(i)
    }
    return mult
}
function buyFactor(n){
    if(data.chal.active[1]) return
    if(data.markup.powers < factorCost(n)) return
    data.markup.powers -= factorCost(n)
    ++data.factors[n]
}
function buyMaxFactor(){
    if(data.chal.active[1]) return
    if(data.ord.isPsi) return data.factors = [9,8,7,7,6,6,6]
    for (let i = 0; i < data.factors.length; i++){
        if(!hasFactor(i)) break
        while (data.markup.powers >= Math.pow(10 ** (i + 1), Math.pow(2, data.factors[i]))) buyFactor(i);
    }
}

function dyGain(){
    if(data.chal.active[6]) return 0
    if(data.chal.active[4]) {
        let m = 0
        for (let i = 0; i < data.boost.hasBUP.length; i++) if(data.boost.hasBUP[i]) ++m
        return data.dy.gain*m*2
    }
    return data.dy.gain*bup11Effect()
}
