let baseAutoBuyerSpeed = () => D(1).times(chalEffectTotal()).times(getBUPEffect(6)).times(incrementyMult()).times(iup6Effect())
    .times(getBUPEffect(5)).times(hupData[5].effect()).times(getAlephEffect(1)).times(getCUPEffect(0)).times(getCUPEffect(3))
    .times(dupEffect(0)).times(getAOEffect(0)).times(getPringleEffect(9)).times(getEUPEffect(2, 3))
    .times(inPurification(2) || inPurification(3) ? getAOREffect(4) : 1)
    .times(getEUPEffect(0, 0)).times(getPassiveEnergyEffect(0))

function getAutoBuyerSpeed(){
    if(inPurification(2)) return hierarchyData[0].gain().times(data.incrementy.totalCharge).times(getEUPEffect(2, 4))
    return baseAutoBuyerSpeed().div(getDepthNerf(1)).div(purificationData[1].special())
}