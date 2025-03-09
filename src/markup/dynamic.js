function getDyCap() {
    if(data.chal.active[4]){
        let c5 = getC5Effect()
        return D(40*(5**c5)*(5**data.chal.completions[4]))
    }
    return D(40).mul(iup5Effect()).mul(alephEffect(4)).mul(dupEffect(1)).mul(getSingFunctionEffect(4))
        .mul(getPringleEffect(3)).mul(getHyperchargeEffect(5))
}

function dyGain(){
    if(data.chal.active[6]) return 0

    let boost = 1
    if(data.ord.base < 6 || data.boost.isCharged[13]) boost = getBUPEffect(13)

    if(data.chal.active[4]) {
        let c5 = getC5Effect()
        let c6 = data.chal.active[5] ? 1 :(5**data.chal.completions[4])
        return data.dy.gain.mul((5**c5)*c6)
    }

    if(data.chal.active[0]||data.chal.active[1]||data.chal.active[2]||data.chal.active[3]||data.chal.active[5]) return D(data.dy.gain).mul(boost).mul(iup2Effect()).mul(getBUPEffect(3)).mul(getPringleEffect(3)).toNumber()

    return calcDyGain()
}

/*
 NOTE: The above function contains special logic for challenge cases, as this function was not added until v0.3
*/
function calcDyGain(){
    let chargeBoost = data.boost.isCharged[3] ? getBUPEffect(3) : 1
    let ao2 = inPurification(1) ? getAOREffect(2)+getEUPEffect(2, 5) : 1
    let boost = (data.ord.base < 6 || data.boost.isCharged[13]) ? getBUPEffect(13) : 1
    return D(data.dy.gain).mul(boost).mul(iup2Effect()).mul(dynamicShiftMultipliers[1]()).mul(chargeBoost).div(ao2)
}