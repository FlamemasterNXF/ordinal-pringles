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
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^82
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^123
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>x)")

    // Generates OrdMarks up to BHO*3^164
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^205
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^246
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>x))")

    // Generates OrdMarks up to BHO*3^287
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^328
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x))))")

    // Generates OrdMarks up to BHO*3^369
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>x)))")

    // Generates OrdMarks up to BHO*3^410
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))))")

    // Generates OrdMarks up to BHO*3^451
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))))")

    // Generates OrdMarks up to BHO*3^493
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>y</sup>)")
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>x)")

    // Generates OrdMarks up to BHO*3^534
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0, 6)+"Ω<sub>2</sub><sup>Ω</sup>"+ordMarks[i].slice(6))
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x))")

    // Generates OrdMarks up to BHO*3^575
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+")")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>x)))")

    // Generates OrdMarks up to BHO*3^616
    for (let i = 0; i < length; i++) {
        ordMarks.push(ordMarks[i].slice(0,6)+"Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub>&psi;<sub>1</sub>(Ω<sub>2</sub>"+ordMarks[i].slice(6)+"))")
    }
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>))")
}

// CREDIT TO https://ordinal-pringles-dark-mode.glitch.me/

const ordMarksX = [
    "&psi;(Ω<sub>2</sub>x)",
    "&psi;(Ω<sub>2</sub><sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup></sup>)",
];

const ordMarksXStart = [
    40, // Ω₂
    163, // Ω₂²
    532, // Ω₂^ω
    533, // Ω₂^Ω
    1643, // Ω₂^(Ω+1)
    4973, // Ω₂^(Ω+2)
    14963, // Ω₂^(Ω+ω)
    14964, // Ω₂^(Ω2)
    44937, // Ω₂^(Ω2+1)
    134856, // Ω₂^(Ω2+2)
    404613, // Ω₂^(Ω2+ω)
    404614, // Ω₂^(Ωω)
    404615, // Ω₂^(Ω²)
    1213892, // Ω₂^(Ω²+1)
    3641723, // Ω₂^(Ω²+2)
    10925216, // Ω₂^(Ω²+ω)
    10925217, // Ω₂^(Ω²+Ω)
    32775699, // Ω₂^(Ω²+Ω+1)
    98327145, // Ω₂^(Ω²+Ω+2)
    294981483, // Ω₂^(Ω²+Ω+ω)
    294981484, // Ω₂^(Ω²+Ω2)
    884944501, // Ω₂^(Ω²+Ω2+1)
    2654833552, // Ω₂^(Ω²+Ω2+2)
    7964500705, // Ω₂^(Ω²+Ω2+ω)
    7964500706, // Ω₂^(Ω²+Ωω)
    7964500707, // Ω₂^(Ω²2)
    23893502172, // Ω₂^(Ω²2+1)
    71680506567, // Ω₂^(Ω²2+2)
    215041519752, // Ω₂^(Ω²2+ω)
    215041519753, // Ω₂^(Ω²2+Ω)
    645124559311, // Ω₂^(Ω²2+Ω+1)
    1935373677985, // Ω₂^(Ω²2+Ω+2)
    5806121034007, // Ω₂^(Ω²2+Ω+ω)
    5806121034008, // Ω₂^(Ω²2+Ω2)
    17418363102077, // Ω₂^(Ω²2+Ω2+1)
    52255089306284, // Ω₂^(Ω²2+Ω2+2)
    156765267918905, // Ω₂^(Ω²2+Ω2+ω)
    156765267918906, // Ω₂^(Ω²2+Ωω)
    156765267918907, // Ω₂^(Ω²ω)
    156765267918908, // Ω₂^(Ω^ω)
    156765267918909, // Ω₂^(Ω^Ω)
];

const ordMarksXLength = [
    41, // Ω₂
    123, // Ω₂²
    369, // Ω₂^ω
    370, // Ω₂^Ω
    1110, // Ω₂^(Ω+1)
    3330, // Ω₂^(Ω+2)
    9990, // Ω₂^(Ω+ω)
    9991, // Ω₂^(Ω2)
    29973, // Ω₂^(Ω2+1)
    89919, // Ω₂^(Ω2+2)
    269757, // Ω₂^(Ω2+ω)
    269758, // Ω₂^(Ωω)
    269759, // Ω₂^(Ω²)
    809277, // Ω₂^(Ω²+1)
    2427831, // Ω₂^(Ω²+2)
    7283493, // Ω₂^(Ω²+ω)
    7283494, // Ω₂^(Ω²+Ω)
    21850482, // Ω₂^(Ω²+Ω+1)
    65551446, // Ω₂^(Ω²+Ω+2)
    196654338, // Ω₂^(Ω²+Ω+ω)
    196654339, // Ω₂^(Ω²+Ω2)
    589963017, // Ω₂^(Ω²+Ω2+1)
    1769889051, // Ω₂^(Ω²+Ω2+2)
    5309667153, // Ω₂^(Ω²+Ω2+ω)
    5309667154, // Ω₂^(Ω²+Ωω)
    5309667155, // Ω₂^(Ω²2)
    15929001465, // Ω₂^(Ω²2+1)
    47787004395, // Ω₂^(Ω²2+2)
    143361013185, // Ω₂^(Ω²2+ω)
    143361013186, // Ω₂^(Ω²2+Ω)
    430083039558, // Ω₂^(Ω²2+Ω+1)
    1290249118674, // Ω₂^(Ω²2+Ω+2)
    3870747356022, // Ω₂^(Ω²2+Ω+ω)
    3870747356023, // Ω₂^(Ω²2+Ω2)
    11612242068069, // Ω₂^(Ω²2+Ω2+1)
    34836726204207, // Ω₂^(Ω²2+Ω2+2)
    104510178612621, // Ω₂^(Ω²2+Ω2+ω)
    104510178612622, // Ω₂^(Ω²2+Ωω)
    104510178612623, // Ω₂^(Ω²ω)
    104510178612624, // Ω₂^(Ω^ω)
    104510178612625, // Ω₂^(Ω^Ω)
];

/*
    Generates Ordinals up to Factor Boost FB156,765,267,918,903
    That's an Ordinal Value of 3.3982083289425593e74796041325934
/   If you ever need to expand this you're insane
 */
function infiniteOrdMarks(magnitude, layer = 0) {
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return ordMarksX[ordMarksX.length - 1];
    if (D(magnitude).floor().lt(ordMarks.length - 1) && !layer) return ordMarks[D(magnitude).floor().toNumber()];
    magnitude = D(magnitude).add(0.000000000001).floor()
    //console.log(magnitude + " " + layer)
    if (!layer) {
        let i = 0
        while (i < ordMarksX.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXStart[i + 1])) i++
        let finalOutput = ordMarksX[i].replaceAll("x", infiniteOrdMarks(magnitude.sub(ordMarksXStart[i]), layer+1))
        return `${finalOutput.replaceAll('undefined', '')}`
    } else {
        if (magnitude.lt(1)) return "x"
        if (magnitude.lt(41)) return ordMarks[Decimal.floor(magnitude.add(0.000000000001)).toNumber()-1].split('(')[1].split(')')[0]
        let i = 0
        while (i < ordMarksX.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXLength[i + 1])) i++
        let finalOutput = ordMarksX[i].replaceAll("&psi;", "&psi;<sub>1</sub>").replaceAll("x", infiniteOrdMarks(magnitude.sub(ordMarksXLength[i]), layer+1))
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    return "gwa"; // you've been gwa-ed
}

// End Credit

function displayOrd(ord,over,base,trim = data.ord.trim) {
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
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

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
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return finalOutput
}

function numberFromOrdinal(string, base) {
    const ungwa = string.replaceAll("<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>", "&omega;")

    const initial = ungwa.replaceAll("&omega;", `${base}`).replaceAll('<sup>', ').pow(')
        .replaceAll('</sup>', ').mul(').replaceAll('...', '').replaceAll('+', ').add(')
    const secondary = "D(" + initial.replaceAll('+...', '').replaceAll('*...', '')
        //.replaceAll('.mul().add(', '')

    if(secondary.charAt(secondary.length-5) === '.'){
        const noTrailing = secondary.substring(0, secondary.length-5)

        if(noTrailing.charAt(noTrailing.length-6) === '.'){ // Rare Edge Case
            const noTrailing2 = noTrailing.substring(0, noTrailing.length-6)
            return eval(noTrailing2)
        }

        return eval(noTrailing)
    }

    if(secondary.charAt(secondary.length-6) === '.'){ // Rare Edge Case
        const noTrailing = secondary.substring(0, secondary.length-6)
        return eval(noTrailing)
    }
}

function displayHierarchyOrd(ord,over,base,trim = data.ord.trim) {
    ord = Decimal.floor(ord)
    over = Decimal.floor(over)
    if(trim <= 0) return `...`
    if(ord < base) return ord.plus(over)
    const magnitude = Decimal.floor(Decimal.ln(ord).div(Decimal.ln(base)).plus(D(1e-14)))
    const magnitudeAmount = D(base).pow(magnitude)
    const amount = Decimal.floor(ord.div(magnitudeAmount))
    let finalOutput = "&omega;"
    if (magnitude.gt(1)) finalOutput += "<sup>"+displayHierarchyOrd(magnitude, 0, base)+"</sup>"
    if (amount.gt(1)) finalOutput += amount
    const firstAmount = amount.times(magnitudeAmount)
    if(ord.sub(firstAmount).gt(0)) finalOutput += "+" + displayHierarchyOrd(ord.sub(firstAmount), over, base, trim - 1)
    if(data.gword) finalOutput = finalOutput.replaceAll("&omega;","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
                                            .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
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

function displayPsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag)) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    if(D(ord).gt(Number.MAX_VALUE)) return displayInfinitePsiOrd(ord, trim, base)
    ord = Math.floor(ord)
    if(ord == BHO_VALUE) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        if(data.gword) finalOutput=finalOutput
            .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
            .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
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
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function displayInfinitePsiOrd(ord, trim = data.ord.trim, base = data.ord.base) {
    if (D(ord).mag === Infinity || isNaN(D(ord).mag) || base < 1) return data.gword ? "<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>" : "Ω"
    ord = D(Decimal.floor(D(ord).add(0.000000000001)))
    if(ord.eq(BHO_VALUE)) {
        let finalOutput = "&psi;(Ω<sub>2</sub>)"
        if(data.gword) finalOutput=finalOutput
            .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
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
    if(data.gword) finalOutput=finalOutput
        .replaceAll("Ω","<img src='https://cdn.discordapp.com/emojis/967188082434662470.webp?size=24'>")
        .replaceAll("ω","<img src='https://cdn.discordapp.com/emojis/853002327362895882.webp?size=24'>")
    return `${finalOutput.replaceAll('undefined', '')}`
}

function calculateHardy(ord = data.ord.ordinal, over = data.ord.over, base = data.ord.base) {
    ord = Number(ord)
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
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.ordinal.lt(Number.MAX_SAFE_INTEGER) && isFinite(D(data.ord.over).plus(n))) data.ord.over+=D(n).toNumber()
    else data.ord.ordinal = data.ord.ordinal.plus(n)
}

function maximize() {
    if(data.ord.isPsi) return
    if (data.ord.ordinal.mod(data.ord.base) >= data.ord.base - 1 && data.ord.over >= 1) {
        while(data.ord.over + data.ord.base >= data.ord.base * 2 && data.ord.ordinal.mod(data.ord.base ** 2) !== 0){
            data.ord.over -= Math.ceil((data.ord.over + data.ord.base) / 2 - 0.1)
            data.ord.ordinal = data.ord.ordinal.plus(data.ord.base)
        }
        if (data.ord.ordinal.mod(data.ord.base ** 2) !== 0 && data.ord.over > 0) data.ord.ordinal = data.ord.ordinal.plus(data.ord.over)
        data.ord.over = 0
    }
}

function changeTrim(x){
    if (isNaN(Math.floor(x))) return createAlert('Failure', 'Invalid Input.', `Oops.`)
    data.ord.trim = Math.floor(x)
    DOM(`changeOrdLength`).children[0].innerHTML = `[${data.ord.trim}]`
}

function updateOrdHTML(){
    if(data.ord.isPsi || calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base) > 1.79e308 || isNaN(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base))){
        if(data.ord.color){
            let date = Date.now()/100
            return DOM("ordinal").innerHTML = `${colorWrap(ordinalDisplay("H"), HSL(date))} ${colorWrap(`(${data.ord.base})`, HSL(date))}`
        }
        return DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})`
    }
    if(data.ord.color){
        let date = Date.now()/100
        return DOM(`ordinal`).innerHTML = `${colorWrap(`${ordinalDisplay("H")} (${data.ord.base})=${format(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`, HSL(date))}`
    }
    DOM("ordinal").innerHTML = `${ordinalDisplay("H")} (${data.ord.base})=${format(calculateHardy(data.ord.ordinal, data.ord.over, data.ord.base))}`
}
