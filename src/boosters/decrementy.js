function getDecrementyExponent(){
    let base = 1+1+hupData[4].effect()+getNormalANREffect(0, true)+getStableEnergyEffect(1, 1)
        +getStabilizationEffect(0)+getHyperchargeEffect(11)+getEUPEffect(1, 0, true)
    return base
}
function decrementyGain() {
    const exponent = getDecrementyExponent()
    const base = D(0.000666).times((data.markup.powers.plus(1)).pow(0.2).times(2).pow(exponent))
    const overflow = data.overflow.thirdEffect ? base.div(getOverflowEffect(2)) : base.times(getOverflowEffect(2))
    const logged = getDepth() > 0 && getDepthNerf(1) > 1 ? Decimal.log(overflow, getDepthNerf(1)) : overflow
    return (logged).pow(20)
}