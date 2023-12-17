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
