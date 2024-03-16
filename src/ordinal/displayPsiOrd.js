// Displays Ordinals using Psi when the value of ord is less than NUMBER.MAX_VALUE
function displayPsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag)) return "Ω"
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsiOrd(ord, trim, base)
    ord = Math.floor(ord)
    if(trim <= 0) return "..."
    if(ord === BHO_VALUE) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    let maxOrdMarks = (3**(ordMarks.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    if(ord === 0) return ""
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(Math.max(ord-magnitudeAmount+1, 1), trim-1))
    return `${finalOutput.replaceAll('undefined', '')}`
}

// Displays Ordinals using Psi when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfinitePsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return "Ω"
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    if(trim <= 0) return "..."
    if(ord.eq(BHO_VALUE)) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        return `${finalOutput}`
    }
    /*let maxOrdMarks = (D(3).pow(ordMarksXStart[ordMarksXStart.length-1])).times(4) //(D(3).pow(ordMarks.length-1)).times(4)
    if(D(ord).gt(maxOrdMarks)) {
        return displayInfinitePsiOrd(maxOrdMarks) + "x" + format(ord.div(maxOrdMarks),2)
    }*/
    if(ord.eq(0)) return ""
    if(ord.lt(4)) return extraOrdMarks[ord]
    const magnitude = D(ord.layer).gte(Number.MAX_VALUE) ? ord : Decimal.floor(Decimal.ln(ord.div(4)).div(Decimal.ln(3)))
    const magnitudeAmount = D(4).times(Decimal.pow(3, magnitude))
    let finalOutput = infiniteOrdMarks(magnitude) //Decimal.min(magnitude,ordMarksXStart[ordMarksXStart.length-1])
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayInfinitePsiOrd(ord.sub(magnitudeAmount), trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayInfinitePsiOrd(Decimal.max(ord.sub(magnitudeAmount).plus(1), D(1)), trim-1))
    return `${finalOutput.replaceAll('undefined', '')}`
}
