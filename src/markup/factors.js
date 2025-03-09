function autoCost(n) {
    return D(100).times(D(2).pow(data.autoLevels[n]))
}

function buyAuto(n) {
    if(data.chal.active[0] && data.autoLevels[n] >= 1) return
    if (data.markup.powers.lt(autoCost(n))) return
    data.markup.powers = data.markup.powers.sub(autoCost(n))
    ++data.autoLevels[n]
}
function buyMaxAuto() {
    buyAuto(0)
    buyAuto(1)

    if (data.chal.active[0]) return

    let bulkSucc = Decimal.floor(Decimal.log2(D(1).plus(data.markup.powers.div(D(100).times(D(2).pow(data.autoLevels[0]))))))
    data.markup.powers = data.markup.powers.sub(((D(2).pow(bulkSucc)).sub(1)).times(100).times(D(2).pow(data.autoLevels[0])))
    data.autoLevels[0] += bulkSucc.toNumber()

    let bulkMax = Decimal.floor(Decimal.log2(D(1).plus(data.markup.powers.div(D(100).times(D(2).pow(data.autoLevels[1]))))))
    data.markup.powers = data.markup.powers.sub(((D(2).pow(bulkMax)).sub(1)).times(100).times(D(2).pow(data.autoLevels[1])))
    data.autoLevels[1] += bulkMax.toNumber()
}


function factorCost(n, imaginary = false){
    if(imaginary) return (D(10).pow(n+1)).pow(D(2).pow(data.imaginary.factors[n]))
    return (D(10).pow(n+1)).pow(D(2).pow(data.factors[n]))
}
function hasFactor(n, imaginary = false){
    if(imaginary) return data.imaginary.shifts >= n+1
    return data.markup.shifts >= n+1 || data.baseless.shifts >= n+1
}
function factorEffect(n, imaginary = false) {
    const mult = getBUPEffect(0)
    let add = hasFactor(n, imaginary) ? getBUPEffect(12) : 0

    if(imaginary && data.imaginary.factors[n] < 1) return 1+add*mult
    if((data.chal.active[1] || data.factors[n] < 1) && !imaginary) return 1+add*mult

    if(imaginary) return ((data.imaginary[n]+(1+add))*mult*getBUPEffect(8))*(Math.max(1+(data.imaginary.shifts-n-1)/10, 1)**[1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][data.imaginary.shifts])
    return ((data.factors[n]+(1+add))*mult*getBUPEffect(8))*(Math.max(1+(data.markup.shifts-n-1)/10, 1)**[1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][data.markup.shifts])
}
function totalFactorEffect(){
    let mult = 1
    for (let i = 0; i < data.factors.length; i++) {
        mult *= factorEffect(i)
        mult *= factorEffect(i, true)
    }
    return mult
}
function buyFactor(n, imaginary = false){
    if(data.markup.powers.lt(factorCost(n, imaginary)) || data.chal.active[1] || !hasFactor(n, imaginary)) return
    data.markup.powers = data.markup.powers.sub(factorCost(n, imaginary))

    if(imaginary) ++data.imaginary.factors[n]
    else ++data.factors[n]
}
function buyMaxFactor(){
    if(data.chal.active[1]) return

    for (let i = data.imaginary.shifts-1; i >= 0; i--){
        if(!hasFactor(i, true)) break
        while (data.markup.powers.gte(Decimal.pow(10 ** (i + 1), Decimal.pow(2, data.factors[i])))) buyFactor(i, true);
    }

    if(data.baseless.baseless){
        for (let i = data.baseless.shifts-1; i >= 0; i--){
            if(!hasFactor(i, false)) break
            while (data.markup.powers.gte(Decimal.pow(10 ** (i + 1), Decimal.pow(2, data.factors[i])))) buyFactor(i, false);
        }
        return
    }

    for (let i = data.markup.shifts-1; i >= 0; i--){
        if(!hasFactor(i, false)) break
        while (data.markup.powers.gte(Decimal.pow(10 ** (i + 1), Decimal.pow(2, data.factors[i])))) buyFactor(i, false);
    }
}
function buyMaxT1(){
    if(data.autoLevels[0] === 0 && data.collapse.times === 0) buyAuto(0)
    if(data.autoLevels[1] === 0 && data.collapse.times === 0) buyAuto(1)
    buyMaxFactor()
    buyMaxAuto()
}