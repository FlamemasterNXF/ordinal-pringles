// Displays Ordinals using Veblen when the value of ord is less than NUMBER.MAX_VALUE
function displayVeblenOrd(ord,over,base,trim = data.ord.trim) {
    if(data.ord.isPsi) return displayPsiVeblenOrd(ord, trim)
    if(ord === data.ord.ordinal && ord.gt(Number.MAX_VALUE)) return displayInfiniteVeblenOrd(ord, over, base, trim)
    if(ord === data.ord.ordinal) ord = Number(ord)

    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base)+1e-14)
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&phi;(1)"
    if (magnitude > 1) finalOutput = "&phi;("+displayVeblenOrd(magnitude, 0, base)+")"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayVeblenOrd(ord-firstAmount, over, base, trim - 1)
    if(data.gword.enabled) finalOutput = finalOutput.replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
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
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&phi;(1)"
    if (magnitude.gt(1)) finalOutput = "&phi;("+displayInfiniteVeblenOrd(magnitude, 0, base)+")"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayInfiniteVeblenOrd(ord.sub(firstAmount), over, base, trim - 1)
    if(data.gword.enabled) finalOutput = finalOutput.replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
    return finalOutput
}

// Displays Ordinals using Veblen and Psi when the value of ord is less than NUMBER.MAX_VALUE
function displayPsiVeblenOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).gt(BHO_VALUE)) return displayPsiOrd(ord, trim, base) // not yet supported
    ord = Math.floor(ord)
    if(ord === BHO_VALUE) {
        let finalOutput = "&psi;(&phi;(1,Ω+1))"
        if(data.gword.enabled) finalOutput=finalOutput
            .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
            .replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    let maxOrdMarks = (3**(ordMarksVeblen.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiVeblenOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    if(ord === 0) return "0"
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarksVeblen[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarksVeblen[Math.min(magnitude,ordMarksVeblen.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiVeblenOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiVeblenOrd(ord-magnitudeAmount+1, trim-1))
    if(data.gword.enabled) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("&phi;","<img src='https://cdn.discordapp.com/emojis/916425545770745856.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

/*
    Displays Ordinals using Veblen and Psi when the value of ord is greater than NUMBER.MAX_VALUE
    CURRENTLY UNSUPPORTED: BHO_VALUE is less than NUMBER.MAX_VALUE, and Veblen is not defined based BHO_VALUE
*/
function displayInfinitePsiVeblenOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    throw('Unsupported Method! (How did you get here?)')
}