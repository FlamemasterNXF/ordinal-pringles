let baseAutoClickerSpeed = () => (mainAutoClickerBoost())
    .mul(inAnyRealmChallenge() ? getRealmBUPEffect(3) : 1).mul(getRealmBUPEffect(5)).mul(getRealmBUPEffect(6))
    .mul(getRealmBUPEffect(9)).mul(getRealmBUPEffect(10)).mul(getRealmBUPEffect(11))
    .mul(getRealmIncrementyEffect()).mul(getGUPEffect(0))

let mainAutoClickerBoost = () => inRealmChallenge(1) || inRealmChallenge(4) ? D(totalFactorEffect()) :
    D(totalFactorEffect()).mul(getBUPEffect(6)).mul(getAlephEffect(0)).pow(getCUPEffect(1))
        .mul(getCUPEffect(3)).mul(getTotalRealmEnhancement()).mul(getPringleEffect(3))

let autoClickerExponent = () => getMetaANREffect(1)+getEUPEffect(1, 6, true)

function getAutoClickerSpeed(){
    if(inRealmChallenge(5)) return data.dy.level
    return baseAutoClickerSpeed().pow(autoClickerExponent())
}