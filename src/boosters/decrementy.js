function getDecrementyExponent(){
    let base = 1+1+hupData[4].effect()+getNormalANREffect(0, true)+getStableEnergyEffect(1, 1)
        +getEUPEffect(1, 0, true)
    return base
}
function decrementyGain() {
    const exponent = getDecrementyExponent()
    const base = D(0.000666).times((data.markup.powers.plus(1)).pow(0.2).times(2).pow(exponent))
    const overflow = shouldInvertBP3() ? base.times(getOverflowEffect(0, 2)) : base.div(getOverflowEffect(0, 2))
    return (overflow).pow(20)
}

boostManager.register({
    name: 'Decrementy Exponent',
    target: 'Decrementy Gain',
    sign: '^',
    color: graphColors.decrementy,
    effect: () => getDecrementyExponent(),
    shouldDisplay: () => isTabUnlocked('chal'),
})
boostManager.register({
    name: `Decrementy Gain`,
    target: 'Decrementy',
    sign: 'x/s',
    color: graphColors.decrementy,
    effect: () => decrementyGain(),
    shouldDisplay: () => isTabUnlocked('chal'),
})
boostManager.register({
    name: `Decrementy`,
    target: ['All AutoClickers', 'Negative Charge', 'Stable Decrementy'],
    sign: '/',
    color: graphColors.decrementy,
    effect: () => data.chal.decrementy,
    shouldDisplay: () => isTabUnlocked('chal'),
})
