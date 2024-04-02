// Displays Ordinals using Veblen when the value of ord is less than NUMBER.MAX_VALUE
function displayVeblenOrd(ord,over,base,trim = data.ord.trim,forcePsi = false) {
    if(data.ord.isPsi || forcePsi) return displayPsiVeblenOrd(ord, trim)
    if(D(ord).eq(data.ord.ordinal) && D(ord).gt(Number.MAX_VALUE)) return displayInfiniteVeblenOrd(ord, over, base, trim)
    if(D(ord).eq(data.ord.ordinal)) ord = Number(ord)

    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base)+1e-14)
    const magnitudeAmount = base**magnitude
    const amount = Math.floor((ord/magnitudeAmount)+1e-14)
    let finalOutput = "&phi;(1)"
    if (magnitude > 1) finalOutput = "&phi;("+displayVeblenOrd(magnitude, 0, base)+")"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0.1) finalOutput += "+" + displayVeblenOrd(ord-firstAmount, over, base, trim - 1)
    return finalOutput
}

// Displays Ordinals using Veblen when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfiniteVeblenOrd(ord, over, base, trim = data.ord.trim){
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord.lt(base)) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount).plus(D(1e-14)))
    let finalOutput = "&phi;(1)"
    if (magnitude.gt(1)) finalOutput = "&phi;("+displayInfiniteVeblenOrd(magnitude, 0, base)+")"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0.1)) finalOutput += "+" + displayInfiniteVeblenOrd(ord.sub(firstAmount), over, base, trim - 1)
    return finalOutput
}

// Displays Ordinals using Veblen and Psi when the value of ord is less than NUMBER.MAX_VALUE
function displayPsiVeblenOrd(ord, trim = data.ord.trim, base = data.ord.base, aboveBHO = false) {
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsiVeblenOrd(ord, trim, base)
    ord = Math.floor(ord)
    if(trim <= 0) return "..."
    if(ord >= BHO_VALUE) aboveBHO = true
    if(ord === BHO_VALUE) {
        let finalOutput = "&phi;(1@[1,0])"
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    let maxOrdMarks = (3**(ordMarksVeblen.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiVeblenOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    if(ord <= 0) return (aboveBHO ? "1" : "0")
    if(ord < 4) return extraOrdMarksVeblen[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarksVeblen[Math.min(magnitude,ordMarksVeblen.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiVeblenOrd(ord-magnitudeAmount, trim-1, base, aboveBHO))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiVeblenOrd(Math.max(ord-magnitudeAmount+1, 1), trim-1, base, aboveBHO))
    return `${finalOutput.replaceAll('undefined', '')}`
}

/*
    Displays Ordinals using Veblen and Psi when the value of ord is greater than NUMBER.MAX_VALUE
*/
function displayInfinitePsiVeblenOrd(ord, trim = data.ord.trim, base = data.ord.base, aboveBHO = false) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return "Ω"
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    if(trim <= 0) return "..."
    if(ord.gte(BHO_VALUE)) aboveBHO = true
    if(ord.eq(BHO_VALUE)) {
        let finalOutput = "&phi;(1@[1,0])"
        return `${finalOutput}`
    }
    /*let maxOrdMarks = (D(3).pow(ordMarksXStart[ordMarksXStart.length-1])).times(4) //(D(3).pow(ordMarks.length-1)).times(4)
    if(D(ord).gt(maxOrdMarks)) {
        return displayInfinitePsiVeblenOrd(maxOrdMarks) + "x" + format(ord.div(maxOrdMarks),2)
    }*/
    if(ord.lte(0)) return (aboveBHO ? "1" : "0")
    if(ord.lt(4)) return extraOrdMarksVeblen[ord]
    const magnitude = Decimal.floor(Decimal.ln(ord.div(4)).div(Decimal.ln(3)))
    const magnitudeAmount = D(4).times(Decimal.pow(3, magnitude))
    let finalOutput = infiniteOrdMarksVeblen(magnitude) //Decimal.min(magnitude,ordMarksXStart[ordMarksXStart.length-1])
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayInfinitePsiVeblenOrd(ord.sub(magnitudeAmount), trim-1, base, aboveBHO))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayInfinitePsiVeblenOrd(Decimal.max(ord.sub(magnitudeAmount).plus(1), D(1)), trim-1, base, aboveBHO))
    return `${finalOutput.replaceAll('undefined', '')}`
}
