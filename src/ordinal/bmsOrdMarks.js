// Used for BMS Ordinals up to W_2
const ordMarksBMS = [
    "(0,0)(1,1)",
    "(0,0)(1,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)(2,1)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(2,1)(3,1)(2,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,1)(2,1)(3,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(3,1)(3,0)",
    "(0,0)(1,1)(2,1)(3,1)(4,0)",
    "(0,0)(1,1)(2,2)",
]

// Misc. BMS Ordinals used for various purposes
const extraOrdMarksBMS = ["","(0,0)","(0,0)(1,0)","(0,0)(1,0)(1,0)"]

// Adds OrdMarksBMS up to BHO*3^616 to the ordMarksBMS Array
function makeExcessOrdMarksBMS(){
    const excessOrdMarksBMS = ordMarksBMS.slice()
    excessOrdMarksBMS[0] = "(0,0)(1,1)(2,1)";
    excessOrdMarksBMS[1] = "(0,0)(1,1)(2,1)(2,1)";

    const length = excessOrdMarksBMS.length-1

    // Generates OrdMarksBMS up to BHO*3^41
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)"+renderBMS(excessOrdMarksBMS[i], 3, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,1)(4,2)")

    // Generates OrdMarksBMS up to BHO*3^82
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,1)(4,2)"+renderBMS(excessOrdMarksBMS[i], 5, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,1)(4,2)(5,1)(6,2)")

    // Generates OrdMarksBMS up to BHO*3^123
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,1)(4,2)(5,1)(6,2)"+renderBMS(excessOrdMarksBMS[i], 7, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)")

    // Generates OrdMarksBMS up to BHO*3^164
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)"+renderBMS(excessOrdMarksBMS[i], 3, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)")

    // Generates OrdMarksBMS up to BHO*3^205
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)"+renderBMS(excessOrdMarksBMS[i], 5, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,1)(6,2)")

    // Generates OrdMarksBMS up to BHO*3^246
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,1)(6,2)"+renderBMS(excessOrdMarksBMS[i], 7, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)")

    // Generates OrdMarksBMS up to BHO*3^287
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)"+renderBMS(excessOrdMarksBMS[i], 5, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)")

    // Generates OrdMarksBMS up to BHO*3^328
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)"+renderBMS(excessOrdMarksBMS[i], 7, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,1)(8,2)")

    // Generates OrdMarksBMS up to BHO*3^369
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,1)(8,2)"+renderBMS(excessOrdMarksBMS[i], 9, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)")

    // Generates OrdMarksBMS up to BHO*3^410
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)"+renderBMS(excessOrdMarksBMS[i], 7, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)(7,1)(8,2)")

    // Generates OrdMarksBMS up to BHO*3^451
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)(7,1)(8,2)"+renderBMS(excessOrdMarksBMS[i], 9, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)(7,1)(8,2)(9,1)(10,2)")

    // Generates OrdMarksBMS up to BHO*3^493
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(3,1)(4,2)(5,2)(5,1)(6,2)(7,2)(7,1)(8,2)(9,1)(10,2)"+renderBMS(excessOrdMarksBMS[i], 11, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,0)")
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)")

    // Generates OrdMarksBMS up to BHO*3^534
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)"+renderBMS(excessOrdMarksBMS[i], 3, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)(3,1)(4,2)")

    // Generates OrdMarksBMS up to BHO*3^575
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)(3,1)(4,2)"+renderBMS(excessOrdMarksBMS[i], 5, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)(3,1)(4,2)(5,1)(6,2)")

    // Generates OrdMarksBMS up to BHO*3^616
    for (let i = 0; i < length; i++) {
        ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)(3,1)(4,2)(5,1)(6,2)"+renderBMS(excessOrdMarksBMS[i], 7, 2))
    }
    ordMarksBMS.push("(0,0)(1,1)(2,2)(3,2)(4,1)(3,1)(4,2)(5,2)")
}

// CREDIT TO https://ordinal-pringles-dark-mode.glitch.me/

// An extension of OrdMarksBMS, goes up to FB156,765,267,918,903
const ordMarksXBMS = [
    "(0,0)(1,1)(2,2)",
    "(0,0)(1,1)(2,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)",
];

// Generates OrdMarksBMS up to the ordMarksXBMS limit (FB156,765,267,918,903) ON DEMAND
function infiniteOrdMarksBMS(magnitude, layer = 0) {
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return ordMarksXBMS[ordMarksXBMS.length - 1];
    if (D(magnitude).floor().lt(ordMarksBMS.length - 1) && !layer) return ordMarksBMS[D(magnitude).floor().toNumber()];
    magnitude = D(magnitude).add(0.000000000001).floor()
    //console.log(magnitude + " " + layer)
    if (!layer) {
        let i = 0
        while (i < ordMarksXBMS.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXStart[i + 1])) i++
        let finalOutput = renderBMS(ordMarksXBMS[i], layer) + infiniteOrdMarksBMS(magnitude.sub(ordMarksXStart[i]), layer+3)

        return `${finalOutput.replaceAll('undefined', '')}`
    } else {
        if (magnitude.lt(1)) return ""
        const excessOrdMarksBMS = ordMarksBMS.slice()
        excessOrdMarksBMS[0] = "(0,0)(1,1)(2,1)";
        excessOrdMarksBMS[1] = "(0,0)(1,1)(2,1)(2,1)";
        if (magnitude.lt(41)) return renderBMS(excessOrdMarksBMS[Decimal.floor(magnitude.add(0.000000000001)).toNumber() - 1], layer, 2)
        let i = 0
        while (i < ordMarksXBMS.length - 1 && magnitude.add(0.000000000001).gte(ordMarksXLength[i + 1])) i++
        let finalOutput = renderBMS(ordMarksXBMS[i], layer, 1) + infiniteOrdMarksBMS(magnitude.sub(ordMarksXLength[i]), layer+2)
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    return "gwa"; // you've been gwa-ed
}

// End Credit