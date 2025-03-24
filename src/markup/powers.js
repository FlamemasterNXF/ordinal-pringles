function opMult(){
    let mult = getBUPEffect(1)

    let baseReq = data.boost.isCharged[6] ? 4 : 5
    mult += data.ord.base >= baseReq ? getBUPEffect(7) : 0

    return D(mult).times(alephEffect(2))
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    if(D(ord).eq(data.ord.ordinal) && D(ord).gte(Number.MAX_VALUE)) return opCap
    if(D(ord).eq(data.ord.ordinal)) ord = Number(ord)
    if (ord < base) return Decimal.add(ord, over).toNumber()
    let pow = Math.floor(Math.log(ord + 0.1) / Math.log(base))
    let divisor = Math.pow(base, pow)
    let mult = Math.floor((ord + 0.1) / divisor)
    return Math.min(opCap, 10 ** Math.min(opCap, opGain(pow, base, 0)) * mult + Math.min(opCap, opGain(ord - divisor * mult, base, over)))
}
let cappedOPGain = () => Decimal.min(opCap, D(opGain()).times(opMult()))

let uncappedOPGain = () => getEUPEffect(4, 0)
    ? D(opCap).mul(D(data.ord.ordinal).pow(getGUPEffect(2)+1))
    : 1