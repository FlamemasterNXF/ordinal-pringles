// Displays Ordinals when the value of ord is less than NUMBER.MAX_VALUE
function displayOrd(ord,over,base,trim = data.ord.trim) {
    if(data.sToggles[13]) return displayVeblenOrd(ord,over,base,trim)
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)
    if(ord === data.ord.ordinal && ord.gt(Number.MAX_VALUE)) return displayInfiniteOrd(ord, over, base, trim)
    if(ord === data.ord.ordinal) ord = Number(ord)

    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base)+1e-14)
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayOrd(ord-firstAmount, over, base, trim - 1)
    return finalOutput
}

// Displays Ordinals using Psi when the value of ord is less than NUMBER.MAX_VALUE
function displayPsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag)) return "Ω"
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsiOrd(ord, trim, base)
    ord = Math.floor(ord)
    if(ord === BHO_VALUE) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    let maxOrdMarks = (3**(ordMarks.length-1))*4
    if(maxOrdMarks < Infinity && new Decimal(ord).gt(new Decimal(maxOrdMarks.toString()))) {
        return displayPsiOrd(maxOrdMarks) + "x" + format(ord/Number(maxOrdMarks),2)
    }
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput.replaceAll('undefined', '')}`
}