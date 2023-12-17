// The entry point for Ordinal Display
function ordinalDisplay(type, ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true) {
    let ordinal =
        d ? `${type}<sub>${displayOrd(ord, Math.floor(over), base, trim)}</sub>`
        : `${type}<sub>${displayInfiniteOrd(ord, Math.floor(over), base, trim)}</sub>`

    return gwaifyOrdinal(ordinal)
}

// Changes the Ordinal's Trim
function changeTrim(x){
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ord.trim = Math.floor(x)
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`
}

// Secret gwa Theme
function gwaifyOrdinal(ord){
    if(!data.gword.enabled) return ord
    return ord.replaceAll('H', "<img src='https://cdn.discordapp.com/emojis/1117560267560206436.gif?size=48&quality=lossless'>")
        .replaceAll("&psi;<sub>1</sub>", "<img src='https://cdn.discordapp.com/emojis/925185146481704990.webp?size=32'>")
        .replaceAll("&psi;", "<img src='https://cdn.discordapp.com/emojis/929933686353297479.webp?size=32'>")
        .replaceAll("Ω<sub>2</sub>","<img src='https://cdn.discordapp.com/emojis/854483367600193566.webp?size=24'>")
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
        .replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
        .replaceAll('+2', "+<img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'>")
        .replaceAll('2+', "<img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'>+")
        .replaceAll('<sup>2</sup>', "<sup><img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'></sup>")
        .replaceAll('<sub>2</sub>', "<sub><img src='https://cdn.discordapp.com/emojis/970019428391591976.webp?size=24'></sub>")
        .replaceAll('+1', "+<img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'>")
        .replaceAll('2+', "+<img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'>+")
        .replaceAll('<sup>1</sup>', "<sup><img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'></sup>")
        .replaceAll('<sub>1</sub>', "<sub><img src='https://cdn.discordapp.com/emojis/926324253270360154.webp?size=24'></sub>")
}

// Updates the Ordinal's HTML
function updateOrdHTML(){
    if((!data.sToggles[14] || (data.sToggles[14] && !data.ord.isPsi)) && calculateSimpleHardy().gte(Number.MAX_VALUE)){
        if(data.ord.color){
            let date = Date.now()/100
            return DOM("ordinal").innerHTML = `${colorWrap(ordinalDisplay("H"), HSL(date))} ${colorWrap(`(${data.ord.base})`, HSL(date))}`
        }
        return DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})`
    }
    if(data.ord.color){
        let date = Date.now()/100
        return DOM(`ordinal`).innerHTML = `${colorWrap(`${ordinalDisplay("H")} (${data.ord.base})=${(getHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`, HSL(date))}`
    }
    DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${(getHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`
}
