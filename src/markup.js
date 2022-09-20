function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = calculateHardy()>=10240?`Markup and gain ${formatWhole(opGain())} Ordinal Powers`:`H<sub>ω<sup>2</sup></sub>(10) is required to Markup...`
    DOM("factorShiftButton").innerText = `Preform a Factor Shift\nRequires: ${format(fsReqs[data.markup.shifts])} Ordinal Powers`
    DOM("auto0").innerText = `Successor AutoClicker\nCosts ${autoCost(0)} Ordinal Powers`
    DOM("auto1").innerText = `Maximize AutoClicker\nCosts ${autoCost(1)} Ordinal Powers`
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0])} Successor AutoClikers click the Successor button ${formatWhole((data.autoLevels[0])*factorBoost())} times/second\nYour ${formatWhole(data.autoLevels[1])} Maximize AutoClikers click the Maximize button ${formatWhole((data.autoLevels[1])*factorBoost())} times/second`

    for (let i = 0; i < data.factors.length; i++) {
        DOM(`factor${i}`).innerText = hasFactor(i+1)?`Factor ${i+1} [${formatWhole(data.factors[i])}] ${formatWhole(factorEffect(i))}x\nCost: ${formatWhole(factorCost(i))} Ordinal Powers`:`Factor ${i+1}\nLOCKED`
    }
    DOM("factorText").innerText = `Your Factors are multiplying AutoClicker speed by a total of ${formatWhole(factorBoost())}x`
}
let markupTab = "auto"
function switchMarkupTab(t){
    DOM(`${markupTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    markupTab = t
}
function markup(){
    if(calculateHardy()<10240) return
    data.markup.powers += opGain()
    data.ord.ordinal = 0
    data.ord.over = 0
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    if(ord > PSI_VALUE && base <= 3){
        return Math.round(ord / 1e270 + 1) * 1e270
    }
    else{
        if (ord < base) return ord + over
        let pow = Math.floor(Math.log(ord + 0.1) / Math.log(base))
        let divisor = Math.pow(base, pow)
        let mult = Math.floor((ord + 0.1) / divisor)
        return Math.min(
            1e258,
            10 ** opGain(pow, base, 0) * mult +
            opGain(ord - divisor * mult, base, over)
        )
    }
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 1e100, /*1.095e272*/ Infinity]
function factorShift(){
    if(data.markup.powers < fsReqs[data.markup.shifts] || data.markup.shifts > 7) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
    --data.ord.base
    ++data.markup.shifts


    data.ord.ordinal = 0
    data.ord.over = 0
    data.markup.powers = 0
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
}