let extraT1 = () => data.collapse.hasSluggish[0] ? 1 : 0
function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`

    DOM("markupButton").innerHTML = data.ord.isPsi&&data.ord.ordinal===GRAHAMS_VALUE&&data.boost.times===0?`Base 2 is required to go further...`:
        data.ord.isPsi?`Markup and gain ${displayPsiOrd(data.ord.ordinal+1, 4)} (I)`:
        calculateHardy()>=10240?`Markup and gain ${formatWhole(opGain()*opMult())} Ordinal Powers (I)`:`H<sub>ω<sup>2</sup></sub>(${data.ord.base}) is required to Markup...`

    DOM("factorShiftButton").innerHTML = data.ord.base===3?data.boost.times>0?`Perform a Factor Shift<br>Requires: ?????`:`Preform a Factor Shift<br>Requires: Graham's Number (H<sub>ψ(Ω<sup>Ω</sup>ω)</sub>(3))`:
        `Perform a Factor Shift<br>Requires: ${format(getFSReq())} Ordinal Powers`
    DOM("auto0").innerText = `Successor AutoClicker\nCosts ${format(autoCost(0))} Ordinal Powers`
    DOM("auto1").innerText = `Maximize AutoClicker\nCosts ${format(autoCost(1))} Ordinal Powers`
    DOM("autoText").innerText = `Your ${formatWhole(data.autoLevels[0]+extraT1())} Successor Autoclickers click the Successor button ${formatWhole(data.chal.active[4]?(data.autoLevels[0]+extraT1())*factorBoost()/data.dy.level:(data.autoLevels[0]+extraT1())*factorBoost()*data.dy.level)} times/second\nYour ${formatWhole(data.autoLevels[1]+extraT1())} Maximize Autoclickers click the Maximize button ${formatWhole(data.chal.active[4]?(data.autoLevels[1]+extraT1())*factorBoost()/data.dy.level:(data.autoLevels[1]+extraT1())*factorBoost()*data.dy.level)} times/second`

    for (let i = 0; i < data.factors.length; i++) {
        DOM(`factor${i}`).innerText = hasFactor(i)?`Factor ${i+1} [${data.boost.hasBUP[10]?formatWhole(data.factors[i]+3):formatWhole(data.factors[i])}] ${formatWhole(factorEffect(i))}x\nCost: ${formatWhole(factorCost(i))} Ordinal Powers`:`Factor ${i+1}\nLOCKED`
    }
    DOM("factorText").innerText = `Your Factors are multiplying AutoClicker speed by a total of ${formatWhole(factorBoost())}x`

    DOM("factorShiftButton").style.borderColor = data.ord.base===3&&data.boost.times===0?`#0000ff`:`#785c13`
    DOM("factorShiftButton").style.color = data.ord.base===3&&data.boost.times===0?`#8080FF`:`goldenrod`

    DOM("dynamicTab").innerText = data.markup.shifts===7||data.chal.active[4]?'Dynamic':'???'
    DOM("dynamicText").innerText = `Your Dynamic Factor is ${data.chal.active[4]?'dividing':'multiplying'} AutoClickers by ${format(data.dy.level, 3)}\nIt increases by ${format(dyGain())}/s, and caps at ${format(data.dy.cap)}`
    DOM("dynamicText2").innerText = `Your Dynamic Factor is ${format(data.dy.level, 3)} [+${format(dyGain())}/s]. It caps at ${format(data.dy.cap)}`

    DOM("factorBoostButton").innerHTML = `Perform ${getBulkBoostAmt() < 2 ? "a Factor Boost" : getBulkBoostAmt()+" Factor Boosts"} [+${boostersAtGivenFB(data.boost.times+getBulkBoostAmt())-boostersAtGivenFB(data.boost.times)}]<br>Requires ${displayPsiOrd(boostReq(), 3)}`
    DOM("factorBoostButton").style.color = data.ord.isPsi&&data.ord.ordinal>=boostReq()?'#fff480':'#8080FF'

    if(data.sToggles[6]) updateProgressBar()
}
let markupTab = "factor"
function switchMarkupTab(t){
    DOM(`${markupTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`
    markupTab = t
}
function markup(n=1){
    if(data.boost.times===0 && data.ord.isPsi && data.ord.ordinal === 109) return
    if(calculateHardy()<10240 && !data.ord.isPsi) return
    if(data.ord.isPsi){ data.ord.ordinal+=n; return data.markup.powers = 4e256}

    if(data.chal.active[6]) data.markup.powers = 0
    data.ord.isPsi = false
    data.markup.powers += totalOPGain()
    data.ord.ordinal = 0
    data.ord.over = 0
    data.successorClicks = 0
}
function opMult(){
    let mult = bup1Effect()

    let baseReq = data.boost.isCharged[6] ? 4 : 5
    mult += data.ord.base >= baseReq ? bup6Effect() : 0

    return mult*alephEffect(2)
}
function opGain(ord = data.ord.ordinal, base = data.ord.base, over = data.ord.over) {
    //if(data.ord.isPsi && base === 3){
    //    return Math.round(ord / 1e270 + 1) * 1e270
    //}
    if (ord < base) return ord + over
    let pow = Math.floor(Math.log(ord + 0.1) / Math.log(base))
    let divisor = Math.pow(base, pow)
    let mult = Math.floor((ord + 0.1) / divisor)
    return 10 ** opGain(pow, base, 0) * mult + opGain(ord - divisor * mult, base, over)
}
let totalOPGain = () => Math.min(4e256, opGain()*opMult())

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 5e100, Infinity, Infinity]
function getFSReq(){
    const reqScale = data.chal.active[6] ? (totalBUPs()/2)+1.5 : 1
    const req = fsReqs[data.markup.shifts]**reqScale

    return req > 1e256 ? 1e256 : req
}

function factorShift(){
    if(data.markup.shifts === 7){
        if(data.ord.isPsi && data.ord.ordinal >= GRAHAMS_VALUE && data.boost.times == 0) return boost(true)
        else return createAlert("Failure", "Insufficient Ordinal", "Dang.")
    }

    const req = getFSReq()

    if(data.markup.powers < req) return createAlert("Failure", "Insufficient Ordinal Powers", "Dang.")
    if(!data.chal.active[3] && !(data.boost.hasBUP[2] && checkAllIndexes(data.chal.active, true))) --data.ord.base
    ++data.markup.shifts

    if(data.markup.shifts === 7 && !data.chal.active[4]){
        data.dy.level = 4
        data.dy.gain = 0.002
        DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))
    }

    if(data.chal.active[4]){ data.dy.gain = 0.002; DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic')) }


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