let extraT1 = () => hasSluggishMilestone(0) ? 1 : 0
function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`

    DOM("markupButton").innerHTML =
        data.ord.isPsi && data.ord.ordinal.gte(BHO_VALUE) ? `Markup and increase your Ordinal` :
        data.ord.isPsi && data.ord.ordinal.eq(GRAHAMS_VALUE)&&data.boost.times===0&&!hasSluggishMilestone(0)?`Base 2 is required to go further...`:
        data.ord.isPsi?`Markup and gain ${ordinalDisplay('', data.ord.ordinal.plus(1), data.ord.over, data.ord.base, ((data.settings.ordinalDisplayMode === "BMS") || (data.settings.ordinalDisplayMode === "Y-Sequence")) ? Math.max(data.ord.trim, 4) : 4)} (I)`:
        data.ord.ordinal.gte(data.ord.base**2)?`Markup and gain ${formatWhole(cappedOPGain())} Ordinal Powers (I)`:`${ordinalDisplay("H", data.ord.base**2, 0, data.ord.base, ordinalDisplayTrim(), false)}(${data.ord.base}) is required to Markup...`

    DOM(getAdaptiveButton("factorShiftButton")).innerHTML = data.ord.base===3?data.boost.times>0||hasSluggishMilestone(0)?`Perform a Factor Shift<br><span style="font-size: 0.7rem">Requires OFP</span>`
            :`Perform a Factor Shift<br><span style="font-size: 0.7rem">Requires Graham's Number (H<sub>ψ(Ω<sup>Ω</sup>ω)</sub>(3))</span>`:
        `Perform a Factor Shift (H)<br><span style="font-size: 0.7rem">Requires ${format(getFSReq())} Ordinal Powers</span>`
    DOM("autoclicker0").innerText = `Successor AutoClicker\nCosts ${format(autoCost(0))} Ordinal Powers`
    DOM("autoclicker1").innerText = `Maximize AutoClicker\nCosts ${format(autoCost(1))} Ordinal Powers`
    let succSpeed = !data.chal.active[5]
        ? D(data.autoLevels[0]).add(extraT1()).mul(getAutoClickerSpeed()).mul(data.dy.level).div(data.chal.decrementy)
        : D(data.autoLevels[0]).add(extraT1()).mul(getAutoClickerSpeed()).div(data.dy.level).div(data.chal.decrementy)
    let maxSpeed = !data.chal.active[5]
        ? D(data.autoLevels[1]).add(extraT1()).mul(getAutoClickerSpeed()).mul(data.dy.level).div(data.chal.decrementy)
        : D(data.autoLevels[1]).add(extraT1()).mul(getAutoClickerSpeed()).div(data.dy.level).div(data.chal.decrementy)
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0]+extraT1())} Successor Autoclickers click the Successor button ${formatWhole(succSpeed)} times/second\nYour ${formatWhole(data.autoLevels[1]+extraT1())} Maximize Autoclickers click the Maximize button ${formatWhole(maxSpeed)} times/second`

    for (let i = 0; i < data.factors.length; i++) {
        DOM(`factor${i}`).innerText = hasFactor(i)?`Factor ${i+1} [${data.boost.hasBUP[11]?formatWhole(data.factors[i]+getBUPEffect(12)):formatWhole(data.factors[i])}] ${formatWhole(factorEffect(i))}x\nCost: ${formatWhole(factorCost(i))} Ordinal Powers`:`Factor ${i+1}\nLOCKED`
    }
    DOM("factorText").innerText = `Your Factors are multiplying AutoClicker speed by a total of ${formatWhole(totalFactorEffect())}x`

    DOM(getAdaptiveButton("factorShiftButton")).style.color = data.ord.base===3&&data.boost.times===0&&!hasSluggishMilestone(0)
        ? getCSSVariable('factor-boost-button-default-text-color')
        : getCSSVariable('factor-shift-button-default-text-color')

    DOM("dynamicTab").innerText = data.markup.shifts===7||data.chal.active[5]||data.baseless.baseless?'Dynamic':'???'
    DOM("dynamicText").innerText = `Your Dynamic Factor is ${data.chal.active[5]?'dividing':'multiplying'} AutoClickers by ${format(data.dy.level, 3)}\nIt increases by ${format(dyGain())}/s, and caps at ${format(getDyCap())}`
    DOM("dynamicText2").innerText = `Your Dynamic Factor is ${format(data.dy.level, 3)} [+${format(dyGain())}/s]. It caps at ${format(getDyCap())}`

    DOM(getAdaptiveButton("factorBoostButton")).innerHTML = `Perform ${getBulkBoostAmt() < 2 ? `${inAnyPurification() ? `an` : `a`} ${boostName()} Boost` : getBulkBoostAmt()+` ${boostName()} Boosts`} [+${format(boosterGain())}] (B)${data.boost.times + getBulkBoostAmt() - 1 < 34 ? `<br>Requires ${displayBoostReq()}` : ''}`
    DOM(getAdaptiveButton("factorBoostButton")).style.color = data.ord.isPsi&&data.ord.ordinal.gte(boostReq())
        ? getCSSVariable('factor-boost-button-available-text-color')
        : getCSSVariable('factor-boost-button-default-text-color')

    if(getSimpleSetting('boostBar')) updateProgressBar()
}
function boostName(){
    if(!inAnyPurification()) return `Factor`
    return purificationData[data.omega.whichPurification].alt
}

function markup(n=D(1)){
    if(data.boost.times===0 && data.ord.isPsi && data.ord.ordinal.eq(GRAHAMS_VALUE) && !hasSluggishMilestone(0)) return
    if(data.ord.ordinal.lt(data.ord.base**2) && !data.ord.isPsi) return
    if(data.ord.isPsi){
        data.ord.ordinal = data.ord.ordinal.plus(n);
        if (capOrdinalAtBO && data.ord.base===3 && data.ord.ordinal.gt(BO_VALUE)) data.ord.ordinal = D(BO_VALUE)
        return data.markup.powers = uncappedOPGain()
    }

    if(data.chal.active[7]){
        data.markup.powers = D(0)
        data.chal.decrementy = D(1)
    }
    data.ord.isPsi = false
    data.markup.powers = data.markup.powers.plus(cappedOPGain())
    data.ord.ordinal = D(0)
    data.ord.over = D(0)
    data.successorClicks = 0
}

function mockMarkup(){
    if(data.markup.powers.gte(opCap)) data.markup.powers = uncappedOPGain()
    else data.markup.powers = data.markup.powers.plus(cappedOPGain())
}

function calcOrdPoints(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over, trim = 0) {
    const opBase = D(10)
    if (trim >= 10) return D(0)
    if (ord.lte(1)) return D(1)
    if (ord.lt(base)) return ord.add(over)

    const slogged = Decimal.slog(ord, base)

    if (slogged.lt(base)) {
        const powerOfOmega = Decimal.floor(Decimal.log(ord.add(0.1), base))
        if (powerOfOmega.lte(0)) return D(1)

        const highestPower = Decimal.pow(base, powerOfOmega)
        const powerMultiplier = Decimal.floor(ord.add(0.1).div(highestPower))

        const reduced = ord.sub(highestPower.times(powerMultiplier))
        const first = Decimal.pow(opBase, calcOrdPoints(powerOfOmega, base, D(0), trim))

        const second = ord.lt(Decimal.tetrate(base, 3)) && reduced.neq(ord)
            ? calcOrdPoints(reduced, base, over, trim + 1)
            : D(0)

        return first.times(powerMultiplier).add(second)
    }

    if (slogged.eq(ord) || slogged.lte(1)) return D(1)

    const inner = calcOrdPoints(slogged, base, D(0), trim)
    return opBase.tetrate(inner)
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 5e100, Infinity, Infinity]
function getFSReq(){
    if (data.markup.shifts >= 7 && data.ord.base > 3) return Infinity // avoid phantom 1e256 on FS7
    if (data.ord.isPsi && data.ord.ordinal.gte(GRAHAMS_VALUE) && data.boost.times === 0 && !data.collapse.hasSluggish[0]) return D(0) // avoid being stuck on Graham's Number
    const reqScale = data.chal.active[6] ? (getTotalBUPs()/2)+1.5 : 1
    const req = fsReqs[data.markup.shifts]**reqScale

    return req > 1e256 ? 1e256 : req
}

function factorShiftConfirm(){
    if(data.baseless.baseless) factorShift()
    if(data.markup.powers.lt(getFSReq()))  return

    createConfirmation('Are you sure?', 'Performing a Factor Shift will reduce your Base by 1 and unlock a new Factor, but it will reset your Ordinal, Ordinal Powers, Factors, and Automation!', 'No Way!', 'Yes, lets do this.', factorShift)
}

function factorShift(isAuto = false){
    if(data.baseless.baseless){
        if(!isAuto) dynamicShift()
        return
    }
    if(data.markup.shifts === 7 && !isAuto){
        if(data.ord.isPsi && data.ord.ordinal.gte(GRAHAMS_VALUE) && data.boost.times === 0) return boost(true)
        else return //createAlert("Failure", "Insufficient Ordinal", "Dang.")
    }

    const req = getFSReq()

    if(data.markup.powers.lt(req)) return //createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
    if(!data.chal.active[3] && !(data.boost.hasBUP[2] && checkAllIndexes(data.chal.active, true) && !data.darkness.darkened)) --data.ord.base
    if(data.markup.shifts < 7) ++data.markup.shifts

    if(data.markup.shifts === 7 && !data.chal.active[5]){
        data.dy.level = D(4)
        data.dy.gain = D(0.002)
    }

    if(data.chal.active[5]) data.dy.gain = D(0.002)

    fsReset()
}

function fsReset(){
    data.ord.ordinal = D(0)
    data.ord.over = D(0)
    data.markup.powers = D(0)
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
}
