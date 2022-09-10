function updateMarkupHTML(){
    DOM("powersText").innerText = `You have ${formatWhole(data.markup.powers)} Ordinal Powers`
    DOM("markupButton").innerHTML = data.ord.ordinal>=100?`Markup and gain ${formatWhole(data.ord.ordinal)} Ordinal Powers`:`ω<sup>2</sup> is required to Markup...`
}
function markup(){
    if(!data.ord.ordinal>=100) return
    data.markup.powers = data.markup.powers.plus(D(data.ord.ordinal))
    data.ord.ordinal = 0
    data.ord.over = 0
}