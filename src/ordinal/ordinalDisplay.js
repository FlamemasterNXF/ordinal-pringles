// The entry point for Ordinal Display
function ordinalDisplay(type='', ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true) {
    let ordinal = "Oops! You shouldn't see this!"

    if(data.ord.displayType === "Buchholz"){
        ordinal = d
            ? displayOrd(ord, Math.floor(over), base, trim)
            : displayInfiniteOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "Veblen"){
        ordinal = d
            ? displayVeblenOrd(ord, Math.floor(over), base, trim)
            : displayInfiniteVeblenOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "BMS"){
        ordinal = d
            ? displayBMSOrd(ord, Math.floor(over), base, trim)
            : displayInfiniteBMSOrd(ord, Math.floor(over), base, trim)
    }

    if(data.ord.displayType === "Y-Sequence"){
        ordinal = d
            ? displayYSeqOrd(ord, Math.floor(over), base, trim)
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
    if(!data.sToggles[13] && (data.ord.isPsi || calculateSimpleHardy().gte(Number.MAX_VALUE))) {
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

    if(data.ord.displayType === "Buchholz"){
        ordMark = x < ordMarks.length
            ? ordMarks[x].replace(/x/, '').replace(/y/, 'ω')
            : (x <= ordMarksXStart[ordMarksXStart.length-1]
                ? infiniteOrdMarks(x).replace(/x/, '').replace(/y/, 'ω')
                : infiniteOrdMarks(ordMarksXStart[ordMarksXStart.length-1])+'x'+format(Decimal.pow(3,x-ordMarksXStart[ordMarksXStart.length-1]))
              )
    }

    if(data.ord.displayType === "Veblen"){
        ordMark = x < ordMarks.length
            ? ordMarksVeblen[x].replace(/x/, '0').replace(/y/, 'φ(1)')
            : (x <= ordMarksXStart[ordMarksXStart.length-1]
                ? infiniteOrdMarksVeblen(x).replace(/x/, '0').replace(/y/, 'φ(1)')
                : infiniteOrdMarksVeblen(ordMarksXStart[ordMarksXStart.length-1])+'x'+format(Decimal.pow(3,x-ordMarksXStart[ordMarksXStart.length-1]))
              )
    }

    if(data.ord.displayType === "BMS"){
        ordMark = x < ordMarks.length
            ? ordMarksBMS[x]
            : (x <= ordMarksXStart[ordMarksXStart.length-1]
                ? infiniteOrdMarksBMS(x)
                : infiniteOrdMarksBMS(ordMarksXStart[ordMarksXStart.length-1])+'x'+format(Decimal.pow(3,x-ordMarksXStart[ordMarksXStart.length-1]))
              )
    }

    if(data.ord.displayType === "Y-Sequence"){
        ordMark = x < ordMarks.length
            ? ordMarksBMS[x]
            : (x <= ordMarksXStart[ordMarksXStart.length-1]
                ? infiniteOrdMarksBMS(x)
                : infiniteOrdMarksBMS(ordMarksXStart[ordMarksXStart.length-1])
              )
        let n = ordMark.split(')(').length
        ordMark = BMS2RowToYSeq(ordMark, n)
        if (x > ordMarksXStart[ordMarksXStart.length-1]) ordMark = ordMark+'x'+format(Decimal.pow(3,x-ordMarksXStart[ordMarksXStart.length-1]))
    }

    return gwaifyOrdinal(ordMark)
}

function displayBoostReq(n = data.boost.times){
    if (n < 33) return ordinalDisplay('', boostReq(n), data.ord.over, data.ord.base, ((data.ord.displayType === "BMS") || (data.ord.displayType === "Y-Sequence")) ? Math.max(data.ord.trim, 3) : 3)
    return displayOrdMarks(n + 7)
    if (n < ordMarks.length - 7) return ordMarks[n+7].replace(/x/, '').replace(/y/, 'ω')
    if (n <= ordMarksXStart[ordMarksXStart.length-1] - 7) return infiniteOrdMarks(n+7).replace(/x/, '').replace(/y/, 'ω')
    return infiniteOrdMarks(ordMarksXStart[ordMarksXStart.length-1])+'x'+format(Decimal.pow(3,n-ordMarksXStart[ordMarksXStart.length-1]+7))
}
