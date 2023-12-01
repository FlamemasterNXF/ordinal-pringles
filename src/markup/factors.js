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
    buyAuto(0)
    buyAuto(1)

    if (data.chal.active[0]) return

    let bulkSucc = Math.floor(Math.log2(1 + (data.markup.powers / (100 * (2 ** data.autoLevels[0])))))
    data.markup.powers -= (((2 ** bulkSucc) - 1) * 100 * (2 ** data.autoLevels[0]))
    data.autoLevels[0] += bulkSucc

    let bulkMax = Math.floor(Math.log2(1 + (data.markup.powers / (100 * (2 ** data.autoLevels[1])))))
    data.markup.powers -= (((2 ** bulkMax) - 1) * 100 * (2 ** data.autoLevels[1]))
    data.autoLevels[1] += bulkMax
}


function factorCost(n){
    return (10**(n+1))**(2**data.factors[n])
}
function hasFactor(n){
    return data.markup.shifts >= n+1 || data.baseless.shifts >= n+1
}
function factorEffect(n){
    const mult = bup0Effect()
    const add = hasFactor(n)?bup10Effect():0
    if(data.chal.active[1] || data.factors[n] < 1) return 1+add*mult
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
    if(data.markup.powers < factorCost(n) || data.chal.active[1] || !hasFactor(n)) return
    data.markup.powers -= factorCost(n)
    ++data.factors[n]
}
function buyMaxFactor(){
    if(data.chal.active[1]) return
    if(data.ord.isPsi) return data.factors = [9,8,7,7,6,6,6]
    if(data.baseless.baseless){
        for (let i = data.baseless.shifts-1; i >= 0; i--){
            if(!hasFactor(i)) break
            while (data.markup.powers >= Math.pow(10 ** (i + 1), Math.pow(2, data.factors[i]))) buyFactor(i);
        }
        return
    }
    for (let i = data.markup.shifts-1; i >= 0; i--){
        if(!hasFactor(i)) break
        while (data.markup.powers >= Math.pow(10 ** (i + 1), Math.pow(2, data.factors[i]))) buyFactor(i);
    }
}
function buyMaxT1(){
    if(data.autoLevels[0] === 0 && data.collapse.times === 0) buyAuto(0)
    if(data.autoLevels[1] === 0 && data.collapse.times === 0) buyAuto(1)
    buyMaxFactor()
    buyMaxAuto()
}

function dyGain(){
    if(data.chal.active[6]) return 0

    //Could move this to a separate function if needed
    data.dy.cap = Math.min(D(40).mul(iup5Effect()).mul(alephEffect(4)).mul(dupEffect(1)).mul(getSingFunctionEffect(4)).toNumber(), Number.MAX_VALUE)

    let boost = 1
    if(data.ord.base < 6 || data.boost.isCharged[11]) boost = bup11Effect()

    if(data.chal.active[4]) {
        let m = 0
        let m2 = data.chal.active[5]?1:(5**data.chal.completions[4])
        for (let i = 0; i < data.boost.hasBUP.length; i++) if(data.boost.hasBUP[i]) ++m
        m = Math.max(m, 1)
        data.dy.cap = 40*(5**m)*(5**data.chal.completions[4])
        return data.dy.gain*((5**m)*m2)
    }

    if(data.chal.active[0]||data.chal.active[1]||data.chal.active[2]||data.chal.active[3]||data.chal.active[5]) return Math.min(D(data.dy.gain).mul(boost).mul(iup2Effect()).mul(bup3Effect()).toNumber(), Number.MAX_VALUE)

    return calcDyGain()
}

/*
 NOTE: The above function contains special logic for challenge cases, as this function was not added until v0.3
*/
function calcDyGain(){
    let chargeBoost = data.boost.isCharged[3] ? bup3Effect() : 1
    let ao2 = inPurification(1) ? getAOREffect(2) : 1
    let boost = (data.ord.base < 6 || data.boost.isCharged[11]) ? bup11Effect() : 1
    return Math.min(D(data.dy.gain).mul(boost).mul(iup2Effect()).mul(dynamicShiftMultipliers[1]()).mul(chargeBoost).div(ao2).toNumber(), Number.MAX_VALUE)
}