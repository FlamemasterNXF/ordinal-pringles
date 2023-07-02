const ordMarks = [
    "&psi;(Ωx)",
    "&psi;(Ω<sup>2</sup>x)",
    "&psi;(Ω<sup>y</sup>)",
    "&psi;(Ω<sup>Ω</sup>x)",
    "&psi;(Ω<sup>Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω+y</sup>)",
    "&psi;(Ω<sup>Ω2</sup>x)",
    "&psi;(Ω<sup>Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω2+y</sup>)",
    "&psi;(Ω<sup>Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub>x)",
]
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]

function makeExcessOrdMarks(){
    const length = ordMarks.length-1

    // Generates OrdMarks up to BHO*3^41
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>)x)")

    // Generates OrdMarks up to BHO*3^82
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^123
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>)")
}

function displayOrd(ord,over,base,trim = data.ord.trim) {
    if(data.ord.isPsi) return displayPsiOrd(ord, trim)

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
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function displayHierarchyOrd(ord,over,base,trim = data.ord.trim) {
    ord = Math.floor(ord)
    over = Math.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord+over
    const magnitude = Math.floor(Math.log(ord)/Math.log(base))
    const magnitudeAmount = base**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "&omega;"
    if (magnitude > 1) finalOutput += "<sup>"+displayHierarchyOrd(magnitude, 0, base)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + displayHierarchyOrd(ord-firstAmount, over, base, trim - 1)
    return finalOutput
}

/*function displayPsiOrd(ord, trim) {
    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    ord = Math.floor(ord)
    const main = Math.floor(ord/4)
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    const finalOutput = ordMarks[magnitude]
        .replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
        .replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    return `${finalOutput}`
}
*/

function displayPsiOrd(ord, trim) {
    ord = Math.floor(ord)
    if(ord == BHO_VALUE) return "&psi;(Ω<sub>2</sub>)"

    if(ord === 0) return ""
    if(trim <= 0) return "..."
    if(ord < 4) return extraOrdMarks[ord]
    const magnitude = Math.floor(Math.log(ord/4)/Math.log(3))
    const magnitudeAmount = 4*3**magnitude
    let finalOutput = ordMarks[Math.min(magnitude,ordMarks.length-1)]
    if(finalOutput.includes("x"))finalOutput = finalOutput.replace(/x/, displayPsiOrd(ord-magnitudeAmount, trim-1))
    if(finalOutput.includes("y"))finalOutput = finalOutput.replace(/y/, displayPsiOrd(ord-magnitudeAmount+1, trim-1))
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    if (ord >= base**3) return Infinity
    let f2 = Math.floor(ord/base**2)
    const f1 = Math.floor((ord-(f2*base**2))/base)
    const f0 = Math.floor((ord-(f2*base**2)-(f1*base)))+over
    let value = base+f0
    value = D(value).times(Decimal.pow(2,f1))
    while(f2 > 0) {
        value = Decimal.pow(2, value).times(value)
        f2--
    }
    if(isNaN(value)) value = Infinity
    return value
}

function ordinalDisplay(type, ord=data.ord.ordinal, over=data.ord.over, base=data.ord.base, trim=data.ord.trim, d=true) {
    return (
        d ? `${type}<sub>${displayOrd(ord, Math.floor(over), base, trim)}</sub>`
        : `${type}<sub>${displayHierarchyOrd(ord, Math.floor(over), base, trim)}</sub>`
    )
}

function successor(n = 1, m=false) {
    if(data.chal.active[6] && data.successorClicks >= 1000 && m) return
    if(data.ord.isPsi) return
    if(m)++data.successorClicks

    if (data.ord.ordinal % data.ord.base === data.ord.base - 1 && data.ord.ordinal < Number.MAX_SAFE_INTEGER) data.ord.over+=n
    else data.ord.ordinal+=n
}

function maximize() {
    if(data.ord.isPsi) return
    if (data.ord.ordinal % data.ord.base === data.ord.base - 1 && data.ord.over >= 1) {
        while(data.ord.over + data.ord.base >= data.ord.base * 2 && data.ord.ordinal % data.ord.base ** 2 !== 0){
            data.ord.over -= Math.ceil((data.ord.over + data.ord.base) / 2 - 0.1)
            data.ord.ordinal += data.ord.base
        }

        if (data.ord.ordinal % data.ord.base ** 2 !== 0) data.ord.ordinal += data.ord.over
        data.ord.over = 0
    }
}

function changeTrim(x){
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ord.trim = Math.floor(x)
}

function updateOrdHTML(){
    if(data.ord.isPsi || calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base) > 1.79e308 || isNaN(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base)))
        DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})`
    else
        DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${format(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`
}
