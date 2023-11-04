/*

    ALL CREDIT GOES TO ryanleonels ON DISCORD FOR EVERYTHING BEFORE THE "LEGACY" SECTION
    Source: https://ordinal-pringles-dark-mode.glitch.me/src/etc/progressBar.js

 */

function OPtoOrd(x, b, trim=0) {
    x = D(x)
    if (x.lt(0.000000000001) || trim >= 12) return 0;
    if (x.gte(1e256) && b===3) return 3**27
    let exp = Decimal.floor(Decimal.log10(x).add(0.000000000001));
    if (validInBase(exp, b)) {
        let coef = Decimal.floor(x.div(Decimal.pow(10,exp)).add(0.000000000001));
        if (coef.gte(b)) return Decimal.pow(b,Decimal.add(OPtoOrd(exp, b, trim+1),1));
        return Decimal.pow(b,OPtoOrd(exp, b, trim+1)).mul(coef).add(OPtoOrd(x.sub(coef.mul(Decimal.pow(10,exp))), b, trim+1));
    } else {
        return Decimal.pow(b,OPtoOrd(exp, b, trim+1));
    }
}

function validInBase(x, b) {
    return x
        .toString()
        .split("")
        .every(dig => {
            return Number(dig) < b - 0.5 || dig === "e" || dig === ".";
        });
}

function inNonPsiChallenge() {
    if (data.chal.html === -1) return false
    if (data.chal.completions[data.chal.html] >= 3) return false
    if (data.chal.html === 1) return (!data.chal.completions[data.chal.html])
    return true
}

function getTargetBoost() {
    if (data.boost.times >= boostLimit()) return data.boost.times
    return Math.min(data.boost.times + getBulkBoostAmt() - (data.ord.ordinal.lt(boostReq()) || !data.sToggles[7] ? 1 : 0), boostLimit() - 1)
}
function getTargetOrdinal() {
    if (data.chal.html !== -1) {
        let chalGoal = chalGoals[data.chal.html][data.chal.completions[data.chal.html]]
        if (chalGoal !== Infinity) {
            if (data.chal.html===1) {
                if (!data.chal.completions[data.chal.html]) chalGoal = 4e256
                else return D(chalGoal)
            }
            let currentOP = (data.chal.html === 7 || data.darkness.darkened) ? 0 : data.markup.powers;
            return D(OPtoOrd((chalGoal - currentOP) / opMult(), data.ord.base))
        }
    }

    if (data.boost.times >= 33 && data.collapse.times === 0) return D(BHO_VALUE)
    return D(boostReq(getTargetBoost()))
}
function getBarPercent(){
    if((!data.ord.isPsi) && !inNonPsiChallenge()) return D(0)
    if (data.ord.isPsi && inNonPsiChallenge()) return D(100)
    if(data.ord.ordinal.div(getTargetOrdinal()).times(100).gte(100)) return 100
    return Decimal.min(D(100), data.ord.ordinal.div(getTargetOrdinal()).times(100))
}
function getTimeEstimate(){
    if(!data.ord.isPsi && !inNonPsiChallenge()) return "Unknown... "
    if (data.ord.isPsi && inNonPsiChallenge()) return "0s"

    if(getTargetOrdinal().lt(data.ord.ordinal))return "0s"
    let autoSpeed = Decimal.max(1, (data.ord.isPsi ? t2Auto() : D(data.autoLevels[0]+extraT1()*t1Auto()*(data.chal.active[4] ? (1/data.dy.level) : data.dy.level)).div(data.chal.decrementy)))
    return formatTime(Decimal.max((getTargetOrdinal().sub(data.ord.ordinal)).div(autoSpeed), D(0)))
}
function updateProgressBar(){
    DOM("progressBar").style.width = Math.min(100, getBarPercent()) + "%"
    if(!data.ord.isPsi && !inNonPsiChallenge()) return DOM("progressBar").innerHTML = "???"

    if(getTargetOrdinal().eq(Infinity)) return DOM("progressBar").innerHTML = "???"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%:&nbsp;" + getTimeEstimate().replaceAll(" ","&nbsp;") + "&nbsp;est."
}

/* Legacy
function getBarPercent(){
    if(!data.ord.isPsi) return 0
    return Math.min(100, (data.ord.ordinal / boostReq()) * 100)
}
function updateProgressBar(){
    DOM("progressBar").style.width = getBarPercent() + "%"
    DOM("progressBar").innerHTML = getBarPercent().toFixed(2) + "%"
}
 */
