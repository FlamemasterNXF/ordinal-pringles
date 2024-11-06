function opMult(){
    let mult = getBUPEffect(1)

    let baseReq = data.boost.isCharged[6] ? 4 : 5
    mult += data.ord.base >= baseReq ? getBUPEffect(7) : 0

    return D(mult).times(alephEffect(2))
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    if(D(ord).eq(data.ord.ordinal) && D(ord).gte(Number.MAX_VALUE)) return 4e256
    if(D(ord).eq(data.ord.ordinal)) ord = Number(ord)
    if (ord < base) return Decimal.add(ord, over).toNumber()
    let pow = Math.floor(Math.log(ord + 0.1) / Math.log(base))
    let divisor = Math.pow(base, pow)
    let mult = Math.floor((ord + 0.1) / divisor)
    return Math.min(4e256, 10 ** Math.min(4e256, opGain(pow, base, 0)) * mult + Math.min(4e256, opGain(ord - divisor * mult, base, over)))
}
let totalOPGain = () => Decimal.min(4e256, D(opGain()).times(opMult()))

let uncappedOPGain = () => D(data.ord.ordinal).pow(getInstabilityConstantEffect(1)+getGUPEffect(2))