const opCap = new Decimal(4e256)

function opMult(){
    let mult = getBUPEffect(1)

    let baseReq = data.boost.isCharged[6] ? 4 : 5
    mult += data.ord.base >= baseReq ? getBUPEffect(7) : 0

    return D(mult).times(getAlephEffect(2))
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    if(ord.gt(Number.MAX_VALUE)) return opCap
    if(ord.lt(base)) return ord.add(over)

    const pow = Decimal.floor(Decimal.ln(ord.plus(1)).div(Math.log(base)))
    if (pow.lte(0)) return over

    const divisor = Decimal.pow(base, pow)
    const mult = Decimal.floor(ord.plus(1).div(divisor))

    const reducedOrd = ord.sub(divisor.times(mult))
    if (reducedOrd.eq(ord)) return over

    return Decimal.min(opCap, D(10).pow(opGain(pow, base, 0))).times(mult).plus(opGain(reducedOrd, base, over))
}
let cappedOPGain = () => Decimal.min(opCap, opGain().times(opMult()))

function uncappedOPGain() {
    if(getEUPEffect(4, 0)) return opCap.mul(D(data.ord.ordinal).pow(getGUPEffect(2) + 1))
    return opCap
}