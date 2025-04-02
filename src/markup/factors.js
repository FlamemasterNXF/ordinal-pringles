function autoCost(n) {
    return D(100).times(D(2).pow(data.autoLevels[n]))
}

function buyAuto(n) {
    if(data.chal.active[0] && data.autoLevels[n] >= 1) return
    if(inRealmChallenge(0) || inRealmChallenge(4)) return
    if (data.markup.powers.lt(autoCost(n))) return
    data.markup.powers = data.markup.powers.sub(autoCost(n))
    ++data.autoLevels[n]
}
function buyMaxAuto() {
    buyAuto(0)
    buyAuto(1)

    if (data.chal.active[0] || inRealmChallenge(0) || inRealmChallenge(4)) return

    let bulkSucc = Decimal.floor(Decimal.log2(D(1).plus(data.markup.powers.div(D(100).times(D(2).pow(data.autoLevels[0]))))))
    data.markup.powers = data.markup.powers.sub(((D(2).pow(bulkSucc)).sub(1)).times(100).times(D(2).pow(data.autoLevels[0])))
    data.autoLevels[0] += bulkSucc.toNumber()

    let bulkMax = Decimal.floor(Decimal.log2(D(1).plus(data.markup.powers.div(D(100).times(D(2).pow(data.autoLevels[1]))))))
    data.markup.powers = data.markup.powers.sub(((D(2).pow(bulkMax)).sub(1)).times(100).times(D(2).pow(data.autoLevels[1])))
    data.autoLevels[1] += bulkMax.toNumber()
}


function factorCost(n){
    return (D(10).pow(n+1)).pow(D(2).pow(data.factors[n]))
}
function hasFactor(n){
    return data.markup.shifts >= n+1 || data.baseless.shifts >= n+1
}
function baseFactorEffect(n) {
    const mult = getBUPEffect(0)*getRealmBUPEffect(0)*getRealmBUPEffect(2)*getRealmIUPEffect(10)
    let add = hasFactor(n) ? getBUPEffect(12) + getRealmBUPEffect(1) + getRealmChallengeEffect(5) : 0

    if(data.chal.active[1] || data.factors[n] < 1) return 1+add*mult

    return ((data.factors[n]+(1+add))*mult*getBUPEffect(8))*(Math.max(1+(data.markup.shifts-n-1)/10, 1)**[1, 1, 1, 1, 1.3, 1.9, 2.2, 2.3][data.markup.shifts])
}
function factorEffect(n) {
    return baseFactorEffect(n)
}
function totalFactorEffect(){
    let mult = 1
    for (let i = 0; i < data.factors.length; i++) {
        mult *= factorEffect(i)
    }
    return mult
}
function buyFactor(n){
    if(inRealmChallenge(0) || inRealmChallenge(4)) return
    if(data.markup.powers.lt(factorCost(n)) || data.chal.active[1] || !hasFactor(n)) return
    data.markup.powers = data.markup.powers.sub(factorCost(n))
    ++data.factors[n]
}
function buyMaxFactor(){
    if(data.chal.active[1] || (inRealmChallenge(0) || inRealmChallenge(4))) return

    if(data.baseless.baseless){
        for (let i = data.baseless.shifts-1; i >= 0; i--){
            if(!hasFactor(i)) break
            while (data.markup.powers.gte(Decimal.pow(10 ** (i + 1), Decimal.pow(2, data.factors[i])))) buyFactor(i);
        }
        return
    }

    for (let i = data.markup.shifts-1; i >= 0; i--){
        if(!hasFactor(i)) break
        while (data.markup.powers.gte(Decimal.pow(10 ** (i + 1), Decimal.pow(2, data.factors[i])))) buyFactor(i);
    }
}
function buyMaxT1(){
    if(data.autoLevels[0] === 0 && data.collapse.times === 0) buyAuto(0)
    if(data.autoLevels[1] === 0 && data.collapse.times === 0) buyAuto(1)
    buyMaxFactor()
    buyMaxAuto()
}

function getTotalFactors(){
    let total = 0
    for (let i = 0; i < data.factors.length; i++) {
        total += data.factors[i]
    }
    return total
}