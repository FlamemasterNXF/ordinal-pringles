// Used for Veblen Ordinals up to W_2
const ordMarksVeblen = [
    "&phi;(1,x)", //"ε<sub>x</sub>"
    "&phi;(2,x)", //"ζ<sub>x</sub>"
    "&phi;(y,0)",
    "&phi;(1,0,x)", //"Γ<sub>x</sub>"
    "&phi;(1,1,x)",
    "&phi;(1,2,x)",
    "&phi;(1,y,0)",
    "&phi;(2,0,x)",
    "&phi;(2,1,x)",
    "&phi;(2,2,x)",
    "&phi;(2,y,0)",
    "&phi;(y,0,0)",
    "&phi;(1,0,0,x)",
    "&phi;(1,0,1,x)",
    "&phi;(1,0,2,x)",
    "&phi;(1,0,y,0)",
    "&phi;(1,1,0,x)",
    "&phi;(1,1,1,x)",
    "&phi;(1,1,2,x)",
    "&phi;(1,1,y,0)",
    "&phi;(1,2,0,x)",
    "&phi;(1,2,1,x)",
    "&phi;(1,2,2,x)",
    "&phi;(1,2,y,0)",
    "&phi;(1,y,0,0)",
    "&phi;(2,0,0,x)",
    "&phi;(2,0,1,x)",
    "&phi;(2,0,2,x)",
    "&phi;(2,0,y,0)",
    "&phi;(2,1,0,x)",
    "&phi;(2,1,1,x)",
    "&phi;(2,1,2,x)",
    "&phi;(2,1,y,0)",
    "&phi;(2,2,0,x)",
    "&phi;(2,2,1,x)",
    "&phi;(2,2,2,x)",
    "&phi;(2,2,y,0)",
    "&phi;(2,y,0,0)",
    "&phi;(y,0,0,0)",
    "&phi;(1@y)",
    "&phi;(1{x:0}0)", //"&psi;(&phi;(1,Ω+1)) / "&psi;(ε<sub>Ω+1</sub>)"
]

// Misc. Veblen Ordinals used for various purposes
const extraOrdMarksVeblen = ["","&phi;(1)","&phi;(&phi;(1))","&phi;(&phi;(2))"]

const excessOrdMarksVeblen = [
    "1{x",
    "1{x,0",
    "1{x,0,0",
    "1{1@y",
    "x{1@(1,0)",
    "x{1@(1,1)",
    "x{1@(1,2)",
    "1{1@(1,y)",
    "x{1@(2,0)",
    "x{1@(2,1)",
    "x{1@(2,2)",
    "1{1@(2,y)",
    "1{1@(y,0)",
    "x{1@(1,0,0)",
    "x{1@(1,0,1)",
    "x{1@(1,0,2)",
    "1{1@(1,0,y)",
    "x{1@(1,1,0)",
    "x{1@(1,1,1)",
    "x{1@(1,1,2)",
    "1{1@(1,1,y)",
    "x{1@(1,2,0)",
    "x{1@(1,2,1)",
    "x{1@(1,2,2)",
    "1{1@(1,2,y)",
    "1{1@(1,y,0)",
    "x{1@(2,0,0)",
    "x{1@(2,0,1)",
    "x{1@(2,0,2)",
    "1{1@(2,0,y)",
    "x{1@(2,1,0)",
    "x{1@(2,1,1)",
    "x{1@(2,1,2)",
    "1{1@(2,1,y)",
    "x{1@(2,2,0)",
    "x{1@(2,2,1)",
    "x{1@(2,2,2)",
    "1{1@(2,2,y)",
    "1{1@(2,y,0)",
    "1{1@(y,0,0)",
    "1{1@(1@y)",
]

// Adds OrdMarksVeblen up to BHO*3^616 to the ordMarksVeblen Array
function makeExcessOrdMarksVeblen(){
    const length = excessOrdMarksVeblen.length

    // Generates OrdMarksVeblen up to BHO*3^41
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;("+excessOrdMarksVeblen[i]+":0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{x:0}0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^82
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{"+excessOrdMarksVeblen[i]+":0}0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{x:0}0:0}0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^123
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{"+excessOrdMarksVeblen[i]+":0}0:0}0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{x:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^164
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;("+excessOrdMarksVeblen[i]+":0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{x:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^205
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{"+excessOrdMarksVeblen[i]+":0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{x:0}0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^246
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{"+excessOrdMarksVeblen[i]+":0}0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{x:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^287
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{"+excessOrdMarksVeblen[i]+":0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{x:0}0:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^328
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{"+excessOrdMarksVeblen[i]+":0}0:0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{1{x:0}0:0}0:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^369
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{1{"+excessOrdMarksVeblen[i]+":0}0:0}0:0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{x:0:0}0:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^410
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{"+excessOrdMarksVeblen[i]+":0:0}0:0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{1{x:0}0:0:0}0:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^451
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{1{"+excessOrdMarksVeblen[i]+":0}0:0:0}0:0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{1{1{x:0}0:0}0:0:0}0:0:0}0:0:0}0)")

    // Generates OrdMarksVeblen up to BHO*3^493
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{1{1{"+excessOrdMarksVeblen[i]+":0}0:0}0:0:0}0:0:0}0:0:0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{y:}0}0)")
    ordMarksVeblen.push("&phi;(1{x{1,0:}0}0)")

    // Generates OrdMarksVeblen up to BHO*3^534
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;("+excessOrdMarksVeblen[i]+"{1,0:}0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{x:0}0{1,0:}0}0)")

    // Generates OrdMarksVeblen up to BHO*3^575
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{"+excessOrdMarksVeblen[i]+":0}0{1,0:}0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{1{x:0}0:0}0{1,0:}0}0)")

    // Generates OrdMarksVeblen up to BHO*3^616
    for (let i = 1; i < length; i++) {
        ordMarksVeblen.push("&phi;(1{1{"+excessOrdMarksVeblen[i]+":0}0:0}0{1,0:}0}0)")
    }
    ordMarksVeblen.push("&phi;(1{1{x:0:0}0{1,0:}0}0)")
}

// CREDIT TO https://ordinal-pringles-dark-mode.glitch.me/

// An extension of OrdMarksVeblen, goes up to FB156,765,267,918,903
const ordMarksXVeblen = [
    "x:0}0", // 1{ - :0}0
    "x:0:0}0", // 1{ - :0:0}0
    "1{1{y:}0}0",
    "x{1,0:}0}0", // 1{ - {1,0:}0}0
    "x{1,1:}0}0",
    "x{1,2:}0}0",
    "1{1{1,y:}0}0",
    "x{2,0:}0}0",
    "x{2,1:}0}0",
    "x{2,2:}0}0",
    "1{1{2,y:}0}0",
    "1{1{y,0:}0}0",
    "x{1,0,0:}0}0",
    "x{1,0,1:}0}0",
    "x{1,0,2:}0}0",
    "1{1{1,0,y:}0}0",
    "x{1,1,0:}0}0",
    "x{1,1,1:}0}0",
    "x{1,1,2:}0}0",
    "1{1{1,1,y:}0}0",
    "x{1,2,0:}0}0",
    "x{1,2,1:}0}0",
    "x{1,2,2:}0}0",
    "1{1{1,2,y:}0}0",
    "1{1{1,y,0:}0}0",
    "x{2,0,0:}0}0",
    "x{2,0,1:}0}0",
    "x{2,0,2:}0}0",
    "1{1{2,0,y:}0}0",
    "x{2,1,0:}0}0",
    "x{2,1,1:}0}0",
    "x{2,1,2:}0}0",
    "1{1{2,1,y:}0}0",
    "x{2,2,0:}0}0",
    "x{2,2,1:}0}0",
    "x{2,2,2:}0}0",
    "1{1{2,2,y:}0}0",
    "1{1{2,y,0:}0}0",
    "1{1{y,0,0:}0}0",
    "1{1{1{y}0:}0}0",
    "x{1;0:}0}0",
];

// Generates OrdMarksVeblen up to the ordMarksXVeblen limit (FB156,765,267,918,903) ON DEMAND
function infiniteOrdMarksVeblen(magnitude, layer = 0) {
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return "&phi;(1{" + ordMarksXVeblen[ordMarksXVeblen.length - 1] + ")";
    if (D(magnitude).floor().lt(ordMarksVeblen.length - 1) && !layer) return ordMarksVeblen[D(magnitude).floor().toNumber()];
    magnitude = D(magnitude).add(0.000000000001).floor()
    //console.log(magnitude + " " + layer)
    if (!layer) {
        let i = 0
        while (i < ordMarksXVeblen.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXStart[i + 1])) i++
        let finalOutput = ordMarksXVeblen[i].replaceAll("x", infiniteOrdMarksVeblen(magnitude.sub(ordMarksXStart[i]), layer+1))

        return `&phi;(${finalOutput.replaceAll('undefined', '')})`
    } else {
        if (magnitude.lt(41)) return excessOrdMarksVeblen[Decimal.floor(magnitude.add(0.000000000001)).toNumber()]
        let i = 0
        while (i < ordMarksXVeblen.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXLength[i + 1])) i++
        let finalOutput = ordMarksXVeblen[i].replaceAll("x", infiniteOrdMarksVeblen(magnitude.sub(ordMarksXLength[i]), layer+1))
        return `1{${finalOutput.replaceAll('undefined', '')}`
    }
    return "gwa"; // you've been gwa-ed
}

// End Credit
