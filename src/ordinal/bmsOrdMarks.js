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
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(3,2)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,1)(3,2)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(4,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(3,2)(4,1)(5,1)(3,2)(4,1)(5,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(4,0)",
    "(0,0)(1,1)(2,2)(3,2)(4,1)(5,1)(4,1)",
];

// Generates OrdMarksBMS up to the ordMarksXBMS limit (Ω₂^(Ω^(Ω+1))) ON DEMAND
function infiniteOrdMarksBMS(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    //if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return ordMarksXBMS[ordMarksXBMS.length - 1];
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return infiniteOrdMarks1BMS(magnitude, layer);
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

function powerOfOmegaBMS(ord,trim = data.ord.trim) {
    ord = Math.floor(ord)
    if(trim <= 0) return `...`
    if(ord>=PSI_VALUE) return "(3,2)(4,1)(5,2)"
    const magnitude = Math.floor(Math.log(ord)/Math.log(3)+1e-14)
    const magnitudeAmount = 3**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "(3,2)"
    if (magnitude >= 18) finalOutput += "(4,1)(5,1)(5,1)"
    if (magnitude >= 9) finalOutput += "(4,1)(5,1)(5,1)"
    if ((magnitude % 9) >= 6) finalOutput += "(4,1)(5,1)"
    if ((magnitude % 9) >= 3) finalOutput += "(4,1)(5,1)"
    if ((magnitude % 3) >= 2) finalOutput += "(4,1)"
    if ((magnitude % 3) >= 1) finalOutput += "(4,1)"
    if (amount > 1) finalOutput += finalOutput
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += powerOfOmegaBMS(ord-firstAmount, trim - 1)
    return finalOutput
}

function ordMarksX1BMS(index) {
    index = D(index).add(0.000000000001).floor()
    if (index.eq(PSI_VALUE)) {
        return "(0,0)(1,1)(2,2)(3,2)(4,1)(5,2)";
    }
    let pow1 = powerOfOmegaBMS(index)
    //console.log(index+" "+pow1)
    return "(0,0)(1,1)(2,2)"+pow1;
}

// Generates OrdMarksBMS above the ordMarksXBMS limit ψ(Ω₂^(Ω^(Ω+1))) up to ψ(Ω₂^Ω₂) ON DEMAND
function infiniteOrdMarks1BMS(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksXStart1)) return infiniteOrdMarksBMS(magnitude, layer)
    if (magnitude.gte(ordMarksXStart2)) return infiniteOrdMarks2BMS(magnitude, layer)
    let i = Decimal.floor(Decimal.ln(magnitude.div(ordMarksXStart1)).div(Decimal.ln(3))).add(ordMarksXIndex1)
    //console.log(magnitude + " " + layer)
    if (!layer) {
        let finalOutput = renderBMS(ordMarksX1BMS(i), layer) + infiniteOrdMarks1BMS(magnitude.sub(ordMarksXStart1.mul(D(3).pow(i.sub(ordMarksXIndex1)))), layer+3)
        return `${finalOutput.replaceAll('undefined', '')}`
    } else {
        let finalOutput = renderBMS(ordMarksX1BMS(i), layer, 1) + infiniteOrdMarks1BMS(magnitude.sub(ordMarksXLength1.mul(D(3).pow(i.sub(ordMarksXIndex1)))), layer+2)
        return `${finalOutput.replaceAll('undefined', '')}`
    }
    return "gwa"; // you've been gwa-ed
}
//(W2^indexPow)indexMul+indexRem
//indexPow: (3,2) + powerOfOmegaBMS shifted +1
//indexMul 2: repeat indexPow
//indexMul >= 3: powerOfOmegaBMS shifted +1 with (4,2) replaced by (4,1)
//then continue with indexRem
function ordMarksX2BMS(index, layer = 0) {
    if (layer >= data.ord.trim) return ""
    index = D(index).add(0.000000000001).floor()
    if (!layer && index.lte(PSI_VALUE)) return ordMarksX1BMS(index)
    if (layer && index.lte(0)) return ""
    let indexPow = Decimal.floor(Decimal.ln(index.div(PSI_VALUE+1)).div(Decimal.ln(PSI_VALUE))).add(1)
    if (index.lt(PSI_VALUE+1)) indexPow = D(0)
    let indexPow1 = D(1)
    if (indexPow.gt(0)) indexPow1 = D(PSI_VALUE+1).mul(Decimal.pow(PSI_VALUE,indexPow.sub(1)))
    let indexMul = index.div(indexPow1).floor()
    let indexRem = index.sub(indexPow1.mul(indexMul))
    let finalOutput = "";
    if (indexPow.eq(0) && layer) return powerOfOmegaBMS(index)
    let indexPowOutput = "(3,2)" + renderBMS(powerOfOmegaBMS(indexPow.toNumber()), 1)
    finalOutput = indexPowOutput
    if (indexMul.eq(2)) finalOutput += indexPowOutput
    if (indexMul.gte(3) && indexMul.lt(27)) {
        if (indexMul.gte(18)) finalOutput += "(4,1)(5,1)"
        if (indexMul.gte(9)) finalOutput += "(4,1)(5,1)"
        if (indexMul.mod(9).gte(6)) finalOutput += "(4,1)"
        if (indexMul.mod(9).gte(3)) finalOutput += "(4,1)"
        if (indexMul.mod(3).gte(2)) finalOutput += indexPowOutput
        if (indexMul.mod(3).gte(1)) finalOutput += indexPowOutput
    }
    if (indexMul.gte(27)) finalOutput += ("(4,1)" + renderBMS(powerOfOmegaBMS(indexMul.toNumber()), 1).slice(5,-1))
    if (!indexRem.eq(index)) finalOutput += ordMarksX2BMS(indexRem, layer+1)
    if (!layer) finalOutput = "(0,0)(1,1)(2,2)" + finalOutput;
    //console.log("pow="+indexPow.toString()+" pow1="+indexPow1.toString()+" mul="+indexMul.toString()+" rem="+indexRem.toString()+" index="+index.toString()+" layer="+layer.toString())
    return `${finalOutput.replaceAll('undefined', '')}`
}

// Generates OrdMarksBMS above ψ(Ω₂^Ω₂) up to ψ(Ω_ω) ON DEMAND
function infiniteOrdMarks2BMS(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksXStart2)) return infiniteOrdMarks1BMS(magnitude, layer)
    if (magnitude.gte(ordMarksBO) || D(magnitude.layer).gt(ordMarksBO.layer)) return infiniteOrdMarksBOBMS(magnitude, layer)
    let i1 = magnitude.div(ordMarksXStart2).mul(2).plus(1).div(3)
    let i = Decimal.floor(Decimal.ln(i1).div(Decimal.ln(3))).add(ordMarksXIndex2)
    let finalOutput = "gwa";
    if (!layer) {
        let nextMagnitude = magnitude.sub(ordMarksXStart2.mul(D(3).pow(i.sub(ordMarksXIndex2))))
        finalOutput = renderBMS(ordMarksX2BMS(i), layer) + (nextMagnitude.eq(magnitude) ? "" : infiniteOrdMarks2BMS(nextMagnitude, layer+3))
    } else {
        let nextMagnitude = magnitude.sub(ordMarksXLength2.mul(D(3).pow(i.sub(ordMarksXIndex2))))
        finalOutput = renderBMS(ordMarksX2BMS(i), layer, 1) + (nextMagnitude.eq(magnitude) ? "" : infiniteOrdMarks2BMS(nextMagnitude, layer+2))
    }
    return `${finalOutput.replaceAll('undefined', '')}`
}

// Generates OrdMarksBMS at (or above) ψ(Ω_ω) ON DEMAND
function infiniteOrdMarksBOBMS(magnitude, layer = 0)
{
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksBO) && D(magnitude.layer).lte(ordMarksBO.layer)) return infiniteOrdMarks2BMS(magnitude, layer)
    if ((magnitude.gt(ordMarksBO) || D(magnitude.layer).gt(ordMarksBO.layer)) && !capOrdinalAtBO) {
        let magnitudeLayer = D(magnitude.layer).plus(D(magnitude.mag).gte(ordMarksBO.mag) ? 1 : 0)
        let omegaSubscript = magnitudeLayer.div(2).add(1.5).floor()
        // 3-row BMS is too complicated, simply return 1 value per ordinal level (much like Hardy)
        if (omegaSubscript.gte(Decimal.tetrate(PSI_VALUE,3))) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(2,0,0)"; // ψ(I) = OFP
        if (omegaSubscript.gte(PSI_VALUE)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(1,1,0)(2,2,1)(3,2,1)(4,2,0)"; // ψ(Ω_Ω₂)
        if (omegaSubscript.gte(27)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(1,1,0)(2,2,1)(3,2,1)(4,1,0)(4,1,0)"; // ψ(Ω_{Ω^Ω})
        if (omegaSubscript.gte(9)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(1,1,0)(2,2,1)(3,2,1)(4,1,0)(3,2,1)(4,1,0)"; // ψ(Ω_{Ω²})
        if (omegaSubscript.gte(6)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(1,1,0)(2,2,1)(3,2,1)(4,1,0)(3,2,0)(4,3,1)(5,3,1)(6,1,0)"; // ψ(Ω_{Ω2})
        if (omegaSubscript.gte(4)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)(1,1,0)(2,2,1)(3,2,1)(4,1,0)(3,2,0)(4,3,0)"; // ψ(Ω_{Ω+1})
        if (omegaSubscript.gte(3)) return "(0,0,0)(1,1,1)(2,1,1)(3,1,0)"; // ψ(Ω_Ω)
    }
    return "(0,0,0)(1,1,1)"; // ψ(Ω_ω)
}

// End Credit
