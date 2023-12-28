// Used for Ordinals up to W_2
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
// Misc. Ordinals used for various purposes
const extraOrdMarks = ["","ω","ω<sup>ω</sup>","ω<sup>ω<sup>2</sup></sup>"]

// Adds OrdMarks up to BHO*3^616 to the ordMarks Array
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

    makeExcessOrdMarksVeblen() // Called from veblenOrdMarks.js
    makeExcessOrdMarksBMS() // Called from bmsOrdMarks.js
}

// CREDIT TO https://ordinal-pringles-dark-mode.glitch.me/

// An extension of OrdMarks, goes up to FB156,765,267,918,903
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

// Denotes when each index of ordMarksX begins
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

// Denotes how long each index of ordMarksX lasts
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

// Generates OrdMarks up to the ordMarksX limit (FB156,765,267,918,903) ON DEMAND
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