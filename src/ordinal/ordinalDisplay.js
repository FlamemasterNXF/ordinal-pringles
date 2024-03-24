let ordinalDisplayTrim = (n=1) => (data.ord.displayType === "BMS" || data.ord.displayType === "Y-Sequence") ? data.ord.trim : n

// The entry point for Ordinal Display
function ordinalDisplay(type='', ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true, forcePsi=false) {
    let ordinal = "Oops! You shouldn't see this!"

    if(data.ord.displayType === "Buchholz"){
        ordinal = d
            ? displayOrd(ord, Math.floor(over), base, trim, forcePsi)
            : displayInfiniteOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "Veblen"){
        ordinal = d
            ? displayVeblenOrd(ord, Math.floor(over), base, trim, forcePsi)
            : displayInfiniteVeblenOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "BMS"){
        ordinal = d
            ? displayBMSOrd(ord, Math.floor(over), base, trim, 0, true, forcePsi)
            : displayInfiniteBMSOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "Y-Sequence"){
        ordinal = d
            ? displayYSeqOrd(ord, Math.floor(over), base, trim, 0, true, forcePsi)
            : displayInfiniteYSeqOrd(ord, Math.floor(over), base, trim)
    }

    if (type !== '') {
        ordinal = `${type}<sub>${ordinal}</sub>`
    }

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
    let baselessCutoff = false;
    if (data.baseless.baseless) {
        if (format(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base)) === "Infinity") baselessCutoff = true; // disable Hardy value for baselessness once entering ExpantaNum range (due to library performance issues that will eventually freeze/crash the game)
    }
    if((!data.sToggles[13] && (data.ord.isPsi || calculateSimpleHardy().gte(Number.MAX_VALUE))) || baselessCutoff) {
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

function displayOrdMarks(x){
    let ordMark = "Oops! You shouldn't see this!"

    x = D(Decimal.floor(D(x).add(0.000000000001)))

    if(data.ord.displayType === "Buchholz"){
        ordMark = x.lt(ordMarks.length)
            ? ordMarks[x.toNumber()].replace(/x/, '').replace(/y/, 'ω')
            : infiniteOrdMarks(x).replace(/x/, '').replace(/y/, 'ω')
    }

    if(data.ord.displayType === "Veblen"){
        ordMark = x.lt(ordMarks.length)
            ? ordMarksVeblen[x.toNumber()].replace(/x/, '0').replace(/y/, 'φ(1)')
            : infiniteOrdMarksVeblen(x).replace(/x/, '0').replace(/y/, 'φ(1)')
    }

    if(data.ord.displayType === "BMS"){
        ordMark = x.lt(ordMarks.length)
            ? ordMarksBMS[x.toNumber()]
            : infiniteOrdMarksBMS(x)
    }

    if(data.ord.displayType === "Y-Sequence"){
        ordMark = x.lt(ordMarks.length)
            ? ordMarksBMS[x.toNumber()]
            : infiniteOrdMarksBMS(x)
        let n = ordMark.split(')(').length
        ordMark = BMS2RowToYSeq(ordMark, n)
    }

    return gwaifyOrdinal(ordMark)
}

function displayBoostReq(n = data.boost.times){
    if (n < 33) return ordinalDisplay('', boostReq(n), data.ord.over, data.ord.base, ((data.ord.displayType === "BMS") || (data.ord.displayType === "Y-Sequence")) ? Math.max(data.ord.trim, 3) : 3, true, true)
    return displayOrdMarks(n + 7)
}
