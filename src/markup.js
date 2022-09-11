function markupReq(){
    return 100-(data.markup.shifts*10)
}
function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = data.ord.ordinal>=markupReq()?`Markup and gain ${formatWhole(data.ord.ordinal)} Ordinal Powers`:`ω<sup>2</sup> is required to Markup...`
    DOM("factorShiftButton").innerText = `Preform a Factor Shift\nRequires: ${format(fsReqs[data.markup.shifts])} Ordinal Powers`
}
function markup(){
    if(!data.ord.ordinal>=markupReq()) return
    data.markup.powers = data.markup.powers.plus(D(data.ord.ordinal))
    data.ord.ordinal = 0
    data.ord.over = 0
}

const fsReqs = [200, 1000, 1e4, 3.5e5, 1e12, 1e21, 1e100, /*1.095e272*/ Infinity]
function factorShift(){
    if(!data.markup.powers.gte(fsReqs[data.markup.shifts]) && !data.markup.shifts < 7) return
    --data.ord.base
    ++data.markup.shifts

    data.ord.ordinal = 0
    data.ord.over = 0
    data.markup.powers = D(0)
}