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
    ordMarks.push("&psi;(Ω<sub>2</sub><sup>Ω</sup>&psi;<sub>1</sub>(Ω<sub>2</sub><sup>2</sup>x))")

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
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>+Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup></sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω2+1</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω2+2</sup>x)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ω2+y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>2+Ωy</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>2</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>2+Ω<sup>y</sup></sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω</sup>y</sup>)",
    "&psi;(Ω<sub>2</sub><sup>Ω<sup>Ω+1</sup></sup>x)",
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
    470295803756784, // Ω₂^(Ω^Ω+1)
    1410887411270409, // Ω₂^(Ω^Ω+2)
    4232662233811284, // Ω₂^(Ω^Ω+ω)
    4232662233811285, // Ω₂^(Ω^Ω+Ω)
    12697986701433913, // Ω₂^(Ω^Ω+Ω+1)
    38093960104301797, // Ω₂^(Ω^Ω+Ω+2)
    114281880312905449, // Ω₂^(Ω^Ω+Ω+ω)
    114281880312905450, // Ω₂^(Ω^Ω+Ω2)
    342845640938716409, // Ω₂^(Ω^Ω+Ω2+1)
    1028536922816149286, // Ω₂^(Ω^Ω+Ω2+2)
    3085610768448447917, // Ω₂^(Ω^Ω+Ω2+ω)
    3085610768448447918, // Ω₂^(Ω^Ω+Ωω)
    3085610768448447919, // Ω₂^(Ω^Ω+Ω²)
    9256832305345343818, // Ω₂^(Ω^Ω+Ω²+1)
    27770496916036031515, // Ω₂^(Ω^Ω+Ω²+2)
    83311490748108094606, // Ω₂^(Ω^Ω+Ω²+ω)
    83311490748108094607, // Ω₂^(Ω^Ω+Ω²+Ω)
    249934472244324283883, // Ω₂^(Ω^Ω+Ω²+Ω+1)
    749803416732972851711, // Ω₂^(Ω^Ω+Ω²+Ω+2)
    2249410250198918555195, // Ω₂^(Ω^Ω+Ω²+Ω+ω)
    2249410250198918555196, // Ω₂^(Ω^Ω+Ω²+Ω2)
    6748230750596755665651, // Ω₂^(Ω^Ω+Ω²+Ω2+1)
    20244692251790266997016, // Ω₂^(Ω^Ω+Ω²+Ω2+2)
    60734076755370800991111, // Ω₂^(Ω^Ω+Ω²+Ω2+ω)
    60734076755370800991112, // Ω₂^(Ω^Ω+Ω²+Ωω)
    60734076755370800991113, // Ω₂^(Ω^Ω+Ω²2)
    182202230266112402973404, // Ω₂^(Ω^Ω+Ω²2+1)
    546606690798337208920277, // Ω₂^(Ω^Ω+Ω²2+2)
    1639820072395011626760896, // Ω₂^(Ω^Ω+Ω²2+ω)
    1639820072395011626760897, // Ω₂^(Ω^Ω+Ω²2+Ω)
    4919460217185034880282757, // Ω₂^(Ω^Ω+Ω²2+Ω+1)
    14758380651555104640848337, // Ω₂^(Ω^Ω+Ω²2+Ω+2)
    44275141954665313922545077, // Ω₂^(Ω^Ω+Ω²2+Ω+ω)
    44275141954665313922545078, // Ω₂^(Ω^Ω+Ω²2+Ω2)
    132825425863995941767635301, // Ω₂^(Ω^Ω+Ω²2+Ω2+1)
    398476277591987825302905970, // Ω₂^(Ω^Ω+Ω²2+Ω2+2)
    1195428832775963475908717977, // Ω₂^(Ω^Ω+Ω²2+Ω2+ω)
    1195428832775963475908717978, // Ω₂^(Ω^Ω+Ω²2+Ωω)
    1195428832775963475908717979, // Ω₂^(Ω^Ω+Ω²ω)
    1195428832775963475908717980, // Ω₂^(Ω^Ω+Ω^ω)
    1195428832775963475908717981, // Ω₂^((Ω^Ω)2)
    3586286498327890427726154014, // Ω₂^((Ω^Ω)2+1)
    10758859494983671283178462113, // Ω₂^((Ω^Ω)2+2)
    32276578484951013849535386410, // Ω₂^((Ω^Ω)2+ω)
    32276578484951013849535386411, // Ω₂^((Ω^Ω)2+Ω)
    96829735454853041548606159305, // Ω₂^((Ω^Ω)2+Ω+1)
    290489206364559124645818477987, // Ω₂^((Ω^Ω)2+Ω+2)
    871467619093677373937455434033, // Ω₂^((Ω^Ω)2+Ω+ω)
    871467619093677373937455434034, // Ω₂^((Ω^Ω)2+Ω2)
    2614402857281032121812366302175, // Ω₂^((Ω^Ω)2+Ω2+1)
    7843208571843096365437098906598, // Ω₂^((Ω^Ω)2+Ω2+2)
    23529625715529289096311296719867, // Ω₂^((Ω^Ω)2+Ω2+ω)
    23529625715529289096311296719868, // Ω₂^((Ω^Ω)2+Ωω)
    23529625715529289096311296719869, // Ω₂^((Ω^Ω)2+Ω²)
    70588877146587867288933890159682, // Ω₂^((Ω^Ω)2+Ω²+1)
    211766631439763601866801670479121, // Ω₂^((Ω^Ω)2+Ω²+2)
    635299894319290805600405011437438, // Ω₂^((Ω^Ω)2+Ω²+ω)
    635299894319290805600405011437439, // Ω₂^((Ω^Ω)2+Ω²+Ω)
    1905899682957872416801215034312393, // Ω₂^((Ω^Ω)2+Ω²+Ω+1)
    5717699048873617250403645102937255, // Ω₂^((Ω^Ω)2+Ω²+Ω+2)
    17153097146620851751210935308811841, // Ω₂^((Ω^Ω)2+Ω²+Ω+ω)
    17153097146620851751210935308811842, // Ω₂^((Ω^Ω)2+Ω²+Ω2)
    51459291439862555253632805926435603, // Ω₂^((Ω^Ω)2+Ω²+Ω2+1)
    154377874319587665760898417779306886, // Ω₂^((Ω^Ω)2+Ω²+Ω2+2)
    463133622958762997282695253337920735, // Ω₂^((Ω^Ω)2+Ω²+Ω2+ω)
    463133622958762997282695253337920736, // Ω₂^((Ω^Ω)2+Ω²+Ωω)
    463133622958762997282695253337920737, // Ω₂^((Ω^Ω)2+Ω²2)
    1389400868876288991848085760013762290, // Ω₂^((Ω^Ω)2+Ω²2+1)
    4168202606628866975544257280041286949, // Ω₂^((Ω^Ω)2+Ω²2+2)
    12504607819886600926632771840123860926, // Ω₂^((Ω^Ω)2+Ω²2+ω)
    12504607819886600926632771840123860927, // Ω₂^((Ω^Ω)2+Ω²2+Ω)
    37513823459659802779898315520371582861, // Ω₂^((Ω^Ω)2+Ω²2+Ω+1)
    112541470378979408339694946561114748663, // Ω₂^((Ω^Ω)2+Ω²2+Ω+2)
    337624411136938225019084839683344246069, // Ω₂^((Ω^Ω)2+Ω²2+Ω+ω)
    337624411136938225019084839683344246070, // Ω₂^((Ω^Ω)2+Ω²2+Ω2)
    1012873233410814675057254519050032738291, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+1)
    3038619700232444025171763557150098214954, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+2)
    9115859100697332075515290671450294644943, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+ω)
    9115859100697332075515290671450294644944, // Ω₂^((Ω^Ω)2+Ω²2+Ωω)
    9115859100697332075515290671450294644945, // Ω₂^((Ω^Ω)2+Ω²ω)
    9115859100697332075515290671450294644946, // Ω₂^((Ω^Ω)2+Ω^ω)
    9115859100697332075515290671450294644947, // Ω₂^((Ω^Ω)ω)
    9115859100697332075515290671450294644948, // Ω₂^(Ω^(Ω+1))
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
    313530535837875, // Ω₂^(Ω^Ω+1)
    940591607513625, // Ω₂^(Ω^Ω+2)
    2821774822540875, // Ω₂^(Ω^Ω+ω)
    2821774822540876, // Ω₂^(Ω^Ω+Ω)
    8465324467622628, // Ω₂^(Ω^Ω+Ω+1)
    25395973402867884, // Ω₂^(Ω^Ω+Ω+2)
    76187920208603652, // Ω₂^(Ω^Ω+Ω+ω)
    76187920208603653, // Ω₂^(Ω^Ω+Ω2)
    228563760625810959, // Ω₂^(Ω^Ω+Ω2+1)
    685691281877432877, // Ω₂^(Ω^Ω+Ω2+2)
    2057073845632298631, // Ω₂^(Ω^Ω+Ω2+ω)
    2057073845632298632, // Ω₂^(Ω^Ω+Ωω)
    2057073845632298633, // Ω₂^(Ω^Ω+Ω²)
    6171221536896895899, // Ω₂^(Ω^Ω+Ω²+1)
    18513664610690687697, // Ω₂^(Ω^Ω+Ω²+2)
    55540993832072063091, // Ω₂^(Ω^Ω+Ω²+ω)
    55540993832072063092, // Ω₂^(Ω^Ω+Ω²+Ω)
    166622981496216189276, // Ω₂^(Ω^Ω+Ω²+Ω+1)
    499868944488648567828, // Ω₂^(Ω^Ω+Ω²+Ω+2)
    1499606833465945703484, // Ω₂^(Ω^Ω+Ω²+Ω+ω)
    1499606833465945703485, // Ω₂^(Ω^Ω+Ω²+Ω2)
    4498820500397837110455, // Ω₂^(Ω^Ω+Ω²+Ω2+1)
    13496461501193511331365, // Ω₂^(Ω^Ω+Ω²+Ω2+2)
    40489384503580533994095, // Ω₂^(Ω^Ω+Ω²+Ω2+ω)
    40489384503580533994096, // Ω₂^(Ω^Ω+Ω²+Ωω)
    40489384503580533994097, // Ω₂^(Ω^Ω+Ω²2)
    121468153510741601982291, // Ω₂^(Ω^Ω+Ω²2+1)
    364404460532224805946873, // Ω₂^(Ω^Ω+Ω²2+2)
    1093213381596674417840619, // Ω₂^(Ω^Ω+Ω²2+ω)
    1093213381596674417840620, // Ω₂^(Ω^Ω+Ω²2+Ω)
    3279640144790023253521860, // Ω₂^(Ω^Ω+Ω²2+Ω+1)
    9838920434370069760565580, // Ω₂^(Ω^Ω+Ω²2+Ω+2)
    29516761303110209281696740, // Ω₂^(Ω^Ω+Ω²2+Ω+ω)
    29516761303110209281696741, // Ω₂^(Ω^Ω+Ω²2+Ω2)
    88550283909330627845090223, // Ω₂^(Ω^Ω+Ω²2+Ω2+1)
    265650851727991883535270669, // Ω₂^(Ω^Ω+Ω²2+Ω2+2)
    796952555183975650605812007, // Ω₂^(Ω^Ω+Ω²2+Ω2+ω)
    796952555183975650605812008, // Ω₂^(Ω^Ω+Ω²2+Ωω)
    796952555183975650605812009, // Ω₂^(Ω^Ω+Ω²ω)
    796952555183975650605812010, // Ω₂^(Ω^Ω+Ω^ω)
    796952555183975650605812011, // Ω₂^((Ω^Ω)2)
    2390857665551926951817436033, // Ω₂^((Ω^Ω)2+1)
    7172572996655780855452308099, // Ω₂^((Ω^Ω)2+2)
    21517718989967342566356924297, // Ω₂^((Ω^Ω)2+ω)
    21517718989967342566356924298, // Ω₂^((Ω^Ω)2+Ω)
    64553156969902027699070772894, // Ω₂^((Ω^Ω)2+Ω+1)
    193659470909706083097212318682, // Ω₂^((Ω^Ω)2+Ω+2)
    580978412729118249291636956046, // Ω₂^((Ω^Ω)2+Ω+ω)
    580978412729118249291636956047, // Ω₂^((Ω^Ω)2+Ω2)
    1742935238187354747874910868141, // Ω₂^((Ω^Ω)2+Ω2+1)
    5228805714562064243624732604423, // Ω₂^((Ω^Ω)2+Ω2+2)
    15686417143686192730874197813269, // Ω₂^((Ω^Ω)2+Ω2+ω)
    15686417143686192730874197813270, // Ω₂^((Ω^Ω)2+Ωω)
    15686417143686192730874197813271, // Ω₂^((Ω^Ω)2+Ω²)
    47059251431058578192622593439813, // Ω₂^((Ω^Ω)2+Ω²+1)
    141177754293175734577867780319439, // Ω₂^((Ω^Ω)2+Ω²+2)
    423533262879527203733603340958317, // Ω₂^((Ω^Ω)2+Ω²+ω)
    423533262879527203733603340958318, // Ω₂^((Ω^Ω)2+Ω²+Ω)
    1270599788638581611200810022874954, // Ω₂^((Ω^Ω)2+Ω²+Ω+1)
    3811799365915744833602430068624862, // Ω₂^((Ω^Ω)2+Ω²+Ω+2)
    11435398097747234500807290205874586, // Ω₂^((Ω^Ω)2+Ω²+Ω+ω)
    11435398097747234500807290205874587, // Ω₂^((Ω^Ω)2+Ω²+Ω2)
    34306194293241703502421870617623761, // Ω₂^((Ω^Ω)2+Ω²+Ω2+1)
    102918582879725110507265611852871283, // Ω₂^((Ω^Ω)2+Ω²+Ω2+2)
    308755748639175331521796835558613849, // Ω₂^((Ω^Ω)2+Ω²+Ω2+ω)
    308755748639175331521796835558613850, // Ω₂^((Ω^Ω)2+Ω²+Ωω)
    308755748639175331521796835558613851, // Ω₂^((Ω^Ω)2+Ω²2)
    926267245917525994565390506675841553, // Ω₂^((Ω^Ω)2+Ω²2+1)
    2778801737752577983696171520027524659, // Ω₂^((Ω^Ω)2+Ω²2+2)
    8336405213257733951088514560082573977, // Ω₂^((Ω^Ω)2+Ω²2+ω)
    8336405213257733951088514560082573978, // Ω₂^((Ω^Ω)2+Ω²2+Ω)
    25009215639773201853265543680247721934, // Ω₂^((Ω^Ω)2+Ω²2+Ω+1)
    75027646919319605559796631040743165802, // Ω₂^((Ω^Ω)2+Ω²2+Ω+2)
    225082940757958816679389893122229497406, // Ω₂^((Ω^Ω)2+Ω²2+Ω+ω)
    225082940757958816679389893122229497407, // Ω₂^((Ω^Ω)2+Ω²2+Ω2)
    675248822273876450038169679366688492221, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+1)
    2025746466821629350114509038100065476663, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+2)
    6077239400464888050343527114300196429989, // Ω₂^((Ω^Ω)2+Ω²2+Ω2+ω)
    6077239400464888050343527114300196429990, // Ω₂^((Ω^Ω)2+Ω²2+Ωω)
    6077239400464888050343527114300196429991, // Ω₂^((Ω^Ω)2+Ω²ω)
    6077239400464888050343527114300196429992, // Ω₂^((Ω^Ω)2+Ω^ω)
    6077239400464888050343527114300196429993, // Ω₂^((Ω^Ω)ω)
    6077239400464888050343527114300196429994, // Ω₂^(Ω^(Ω+1))
];

// Generates OrdMarks up to the ordMarksX limit (Ω₂^(Ω^(Ω+1))) ON DEMAND
function infiniteOrdMarks(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    //if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return ordMarksX[ordMarksX.length - 1];
    if (D(magnitude).gte(ordMarksXStart[ordMarksXStart.length - 1])) return infiniteOrdMarks1(magnitude, layer);
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

let ordMarksXStart1 = new Decimal(ordMarksXStart[ordMarksXStart.length - 1])
let ordMarksXLength1 = new Decimal(ordMarksXLength[ordMarksXLength.length - 1])
let ordMarksXIndex1 = new Decimal(81)

function powerOfOmega(ord,trim = data.ord.trim) {
    ord = Math.floor(ord)
    if(trim <= 0) return `...`
    if(ord < 3) return ord
    if(ord>=PSI_VALUE) return "&psi;<sub>1</sub>(Ω<sub>2</sub>x)"
    const magnitude = Math.floor(Math.log(ord)/Math.log(3)+1e-14)
    const magnitudeAmount = 3**magnitude
    const amount = Math.floor(ord/magnitudeAmount)
    let finalOutput = "Ω"
    if (magnitude > 1) finalOutput += "<sup>"+powerOfOmega(magnitude)+"</sup>"
    if (amount > 1) finalOutput += amount
    const firstAmount = amount*magnitudeAmount
    if(ord-firstAmount > 0) finalOutput += "+" + powerOfOmega(ord-firstAmount, trim - 1)
    return finalOutput
}

function ordMarksX1(index) {
    index = D(index).add(0.000000000001).floor()
    if (index.eq(PSI_VALUE)) {
        return "&psi;(Ω<sub>2</sub><sup>&psi;<sub>1</sub>(Ω<sub>2</sub>x)</sup>)";
    }
    let pow1 = powerOfOmega(index)
    //console.log(index+" "+pow1)
    return "&psi;(Ω<sub>2</sub><sup>"+pow1+"</sup>x)";
}

let ordMarksXStart2 = ordMarksXStart1.mul(new Decimal(3).pow(new Decimal(3**27).sub(ordMarksXIndex1))).mul(3).add(123); // ψ(Ω₂^Ω₂) = ψ(Ω₂^ψ₁(Ω₂^ψ₁(Ω₂^ψ₁(Ω₂²))))
let ordMarksXLength2 = ordMarksXStart2 // essentially the same with start as the "base" is insignificant compared with the numbers involved
let ordMarksXIndex2 = new Decimal(3**27).plus(1)

// Generates OrdMarks above the ordMarksX limit ψ(Ω₂^(Ω^(Ω+1))) up to ψ(Ω₂^Ω₂) ON DEMAND
function infiniteOrdMarks1(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksXStart1)) return infiniteOrdMarks(magnitude, layer)
    if (magnitude.gte(ordMarksXStart2)) return infiniteOrdMarks2(magnitude, layer)
    let i = Decimal.floor(Decimal.ln(magnitude.div(ordMarksXStart1)).div(Decimal.ln(3))).add(ordMarksXIndex1)
    let finalOutput = "gwa";
    if (!layer) {
        finalOutput = ordMarksX1(i).replaceAll("x", infiniteOrdMarks1(magnitude.sub(ordMarksXStart1.mul(D(3).pow(i.sub(ordMarksXIndex1)))), layer+1))
    } else {
        finalOutput = ordMarksX1(i).replaceAll("&psi;", "&psi;<sub>1</sub>").replaceAll("x", infiniteOrdMarks1(magnitude.sub(ordMarksXLength1.mul(D(3).pow(i.sub(ordMarksXIndex1)))), layer+1))
    }
    return `${finalOutput.replaceAll('undefined', '')}`
}

function ordMarksX2(index, layer = 0) {
    if (layer >= data.ord.trim) return ""
    index = D(index).add(0.000000000001).floor()
    if (!layer && index.lte(PSI_VALUE)) return ordMarksX1(index)
    if (layer && index.lte(0)) return ""
    let indexPow = Decimal.floor(Decimal.ln(index.div(PSI_VALUE+1)).div(Decimal.ln(PSI_VALUE))).add(1)
    if (index.lt(PSI_VALUE+1)) indexPow = D(0)
    let indexPow1 = D(1)
    if (indexPow.gt(0)) indexPow1 = D(PSI_VALUE+1).mul(Decimal.pow(PSI_VALUE,indexPow.sub(1)))
    let indexMul = index.div(indexPow1).floor()
    let indexRem = index.sub(indexPow1.mul(indexMul))
    let finalOutput = "";
    if (indexMul.gt(0) && layer) finalOutput = "+"
    if (indexPow.gt(0)) finalOutput += "Ω<sub>2</sub>"
    if (indexPow.gt(1)) finalOutput += ("<sup>" + powerOfOmega(indexPow) + "</sup>")
    if (powerOfOmega(indexMul).toString().includes("+") && indexPow.gt(0)) finalOutput += ("(" + powerOfOmega(indexMul) + ")")
    if (powerOfOmega(indexMul).toString().includes("+") && indexPow.eq(0)) finalOutput += powerOfOmega(indexMul)
    if (!powerOfOmega(indexMul).toString().includes("+") && (indexMul.gt(1) || indexPow.eq(0))) finalOutput += powerOfOmega(indexMul)
    if (!indexRem.eq(index)) finalOutput += ordMarksX2(indexRem, layer+1)
    if (!layer) finalOutput = "&psi;(Ω<sub>2</sub><sup>"+finalOutput+"</sup>"+(finalOutput.includes("x")?"":"x")+")";
    //console.log("pow="+indexPow.toString()+" pow1="+indexPow1.toString()+" mul="+indexMul.toString()+" rem="+indexRem.toString()+" index="+index.toString()+" layer="+layer.toString())
    return `${finalOutput.replaceAll('undefined', '')}`
}

let ordMarksXBO = new Decimal(3**27+1).mul(new Decimal(3**27).pow(3**27-1)).add(1)
let ordMarksBO = ordMarksXStart2.mul(Decimal.pow(3,ordMarksXBO.sub(ordMarksXIndex2).add(1)).div(2).sub(0.5)).add(369) // ψ(Ω_ω) = ψ(Ω₃) = ψ(Ω₂^Ω₂^Ω₂) = ψ(Ω₂^(Ω₂^ψ₁(Ω₂^(Ω₂^ψ₁(Ω₂^(Ω₂^ψ₁(Ω₂^ω))))))

// Generates OrdMarks above ψ(Ω₂^Ω₂) up to ψ(Ω_ω) ON DEMAND
function infiniteOrdMarks2(magnitude, layer = 0) {
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksXStart2)) return infiniteOrdMarks1(magnitude, layer)
    if (magnitude.gte(ordMarksBO) || D(magnitude.layer).gt(ordMarksBO.layer)) return infiniteOrdMarksBO(magnitude, layer)
    let i1 = magnitude.div(ordMarksXStart2).mul(2).plus(1).div(3)
    let i = Decimal.floor(Decimal.ln(i1).div(Decimal.ln(3))).add(ordMarksXIndex2)
    let finalOutput = "gwa";
    if (!layer) {
        let nextMagnitude = magnitude.sub(ordMarksXStart2.mul(D(3).pow(i.sub(ordMarksXIndex2))))
        finalOutput = ordMarksX2(i).replaceAll("x", (nextMagnitude.eq(magnitude) ? "" : infiniteOrdMarks2(nextMagnitude, layer+1)))
    } else {
        let nextMagnitude = magnitude.sub(ordMarksXLength2.mul(D(3).pow(i.sub(ordMarksXIndex2))))
        finalOutput = ordMarksX2(i).replaceAll("&psi;", "&psi;<sub>1</sub>").replaceAll("x", (nextMagnitude.eq(magnitude) ? "" : infiniteOrdMarks2(nextMagnitude, layer+1)))
    }
    return `${finalOutput.replaceAll('undefined', '')}`
}

function powerOfOmega2(index, layer = 0) {
    if (layer >= data.ord.trim) return ""
    index = D(index).add(0.000000000001).floor()
    if (layer && index.lte(0)) return ""
    if (index.lt(PSI_VALUE)) return (layer ? "+" : "") + powerOfOmega(index.toNumber(), data.ord.trim - layer)
    let indexPow = Decimal.floor(Decimal.ln(index).div(Decimal.ln(PSI_VALUE)))
    let indexPow1 = D(PSI_VALUE).pow(indexPow)
    let indexMul = index.div(indexPow1).floor()
    let indexRem = index.sub(indexPow1.mul(indexMul))
    let finalOutput = "";
    if (indexMul.gt(0) && layer) finalOutput = "+"
    if (indexPow.gt(0)) finalOutput += "Ω<sub>2</sub>"
    if (indexPow.gt(1)) finalOutput += ("<sup>" + powerOfOmega2(indexPow) + "</sup>")
    if (powerOfOmega(indexMul).toString().includes("+") && indexPow.gt(0)) finalOutput += ("(" + powerOfOmega(indexMul) + ")")
    if (powerOfOmega(indexMul).toString().includes("+") && indexPow.eq(0)) finalOutput += powerOfOmega(indexMul)
    if (!powerOfOmega(indexMul).toString().includes("+") && (indexMul.gt(1) || indexPow.eq(0))) finalOutput += powerOfOmega(indexMul)
    if (!indexRem.eq(index)) finalOutput += powerOfOmega2(indexRem, layer+1)
    //console.log("pow="+indexPow.toString()+" pow1="+indexPow1.toString()+" mul="+indexMul.toString()+" rem="+indexRem.toString()+" index="+index.toString()+" layer="+layer.toString())
    return `${finalOutput.replaceAll('undefined', '')}`
}

let capOrdinalAtBO = true

// Generates OrdMarks at (or above) ψ(Ω_ω) ON DEMAND
function infiniteOrdMarksBO(magnitude, layer = 0)
{
    if (layer >= data.ord.trim) return ""
    magnitude = D(magnitude).add(0.000000000001).floor()
    if (magnitude.lt(ordMarksBO) && D(magnitude.layer).lte(ordMarksBO.layer)) return infiniteOrdMarks2(magnitude, layer)
    if ((magnitude.gt(ordMarksBO) || D(magnitude.layer).gt(ordMarksBO.layer)) && !capOrdinalAtBO) {
        let magnitudeLayer = D(magnitude.layer).plus(D(magnitude.mag).gte(ordMarksBO.mag) ? 1 : 0)
        let omegaSubscript = magnitudeLayer.div(2).add(1.5).floor()
        if (omegaSubscript.gte(Decimal.tetrate(PSI_VALUE,3))) return "&psi;(I)";
        return "&psi;(Ω<sub>"+powerOfOmega2(omegaSubscript)+"</sub>)";
    }
    return "&psi;(Ω<sub>ω</sub>)";
}

// End Credit
