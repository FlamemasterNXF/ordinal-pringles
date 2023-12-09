// Increases the Ordinal Successor
function successor(n = 1, m=false) {
    if(data.chal.active[6] && data.successorClicks >= 1000 && m) return
    if(data.ord.isPsi) return
    if(m)++data.successorClicks
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.ordinal.lt(Number.MAX_SAFE_INTEGER) && isFinite(D(data.ord.over).plus(n))) data.ord.over+=D(n).toNumber()
    else data.ord.ordinal = data.ord.ordinal.plus(n)
}

// Maximizes the Ordinal
function maximize() {
    if(data.ord.isPsi) return
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.over >= 1) {
        while(data.ord.over + data.ord.base >= data.ord.base * 2 && data.ord.ordinal.mod(data.ord.base ** 2) !== 0){
            data.ord.over -= Math.ceil((data.ord.over + data.ord.base) / 2 - 0.1)
            data.ord.ordinal = data.ord.ordinal.plus(data.ord.base)
        }
        if (data.ord.ordinal.mod(data.ord.base ** 2) !== 0 && data.ord.over > 0) data.ord.ordinal = data.ord.ordinal.plus(data.ord.over)
        data.ord.over = 0
    }
}

// Converts an Ordinal to a Number
function numberFromOrdinal(string, base) {
    const ungwa = string.replaceAll("<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>", "&omega;")

    const initial = ungwa.replaceAll("&omega;", `${base}`).replaceAll('<sup>', ').pow(')
        .replaceAll('</sup>', ').mul(').replaceAll('...', '').replaceAll('+', ').add(')
    const secondary = "D(" + initial.replaceAll('+...', '').replaceAll('*...', '')
    //.replaceAll('.mul().add(', '')

    if(secondary.charAt(secondary.length-5) === '.'){
        const noTrailing = secondary.substring(0, secondary.length-5)

        if(noTrailing.charAt(noTrailing.length-6) === '.'){ // Rare Edge Case
            const noTrailing2 = noTrailing.substring(0, noTrailing.length-6)
            return eval(noTrailing2)
        }

        return eval(noTrailing)
    }

    if(secondary.charAt(secondary.length-6) === '.'){ // Rare Edge Case
        const noTrailing = secondary.substring(0, secondary.length-6)
        return eval(noTrailing)
    }
}
