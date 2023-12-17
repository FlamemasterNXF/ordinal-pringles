// Displays Ordinals when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfiniteOrd(ord, over, base, trim = data.ord.trim){
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord.lt(base)) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&omega;"
    if (magnitude.gt(1)) finalOutput += "<sup>"+displayInfiniteOrd(magnitude, 0, base)+"</sup>"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayInfiniteOrd(ord.sub(firstAmount), over, base, trim - 1)
    return finalOutput
}

// Displays Ordinals using Psi when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfinitePsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return "Ω"
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    if(ord.eq(BHO_VALUE)) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        return `${finalOutput}`
    }
    let maxOrdMarks = (D(3).pow(ordMarksXStart[ordMarksXStart.length-1])).times(4) //(D(3).pow(ordMarks.length-1)).times(4)
    if(D(ord).gt(maxOrdMarks)) {
        return displayInfinitePsiOrd(maxOrdMarks) + "x" + format(ord.div(maxOrdMarks),2)
    }
    if(ord.eq(0)) return ""
    if(trim <= 0) return "..."
    if(ord.lt(4)) return extraOrdMarks[ord]
    const magnitude = Decimal.floor(Decimal.ln(ord.div(4)).div(Decimal.ln(3)))
    const magnitudeAmount = D(4).times(Decimal.pow(3, magnitude))
    let finalOutput = infiniteOrdMarks(Decimal.min(magnitude,ordMarksXStart[ordMarksXStart.length-1])) //ordMarks[Decimal.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayInfinitePsiOrd(ord.sub(magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayInfinitePsiOrd(ord.sub(magnitudeAmount).plus(1), trim-1))
    return `${finalOutput.replaceAll('undefined', '')}`
}