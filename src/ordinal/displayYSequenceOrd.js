//Converts BMS to Y Sequence

function BMS1RowToYSeq(output, trim = data.ord.trim) {
    if (trim <= 0) return "(...)"
    let trimmed = false
    let outputList = output.replace("...", "").split(")(")
    let n = outputList.length
    if (output.includes("...") || n > trim) trimmed = true
    if (n > trim) outputList.length = trim
    outputList[0] = outputList[0].replace("(", "")
    outputList[outputList.length-1] = outputList[outputList.length-1].replace(")", "")
    for (let i = 0; i < outputList.length; i++) outputList[i] = parseInt(outputList[i]) + 1
    return "(" + outputList.toString()+ (trimmed ? ",...)" : ")")
}

function BMS2RowToYSeq(output, trim = data.ord.trim) {
    if (trim <= -1) return "(...)"
    if (trim <= 0) return "(1,...)"
    if (trim <= 1) return "(1,2,...)"
    let trimmed = false
    let outputList = output.replace("...", "").split(")(")
    let n = outputList.length
    if (output.includes("...") || n > trim) trimmed = true
    if (n > trim) outputList.length = trim
    outputList[0] = outputList[0].replace("(", "")
    outputList[outputList.length-1] = outputList[outputList.length-1].replace(")", "")
    let outputList1 = []
    let outputList2 = []
    for (let i = 0; i < outputList.length; i++) {
        outputList1[i] = parseInt(outputList[i].split(",")[0])
        outputList2[i] = parseInt(outputList[i].split(",")[1])
    }
    let outputListY1 = [2, 4]
    let outputListY2 = [0, 1]
    outputList = [1,2,4]
    // assumption: always start with (0,0)(1,1) and having no further entries below (1,1) - as is the case with our psi ordinals
    for (let i = 2; i < outputList1.length; i++) {
        if (outputListY1.length <= outputList1[i]) {
            outputListY1[outputList1[i]] = outputListY1[outputList1[i]-1] + outputList2[i] + 1
            outputListY2[outputList1[i]] = outputList2[i]
            outputList[i+1] = outputListY1[outputList1[i]]
        } else {
            outputList[i+1] = outputListY1[outputList1[i]] + (outputList2[i] - outputListY2[outputList1[i]])
        }
    }
    return "(" + outputList.toString()+ (trimmed ? ",...)" : ")")
}

function displayHugeYSeqOrd(ord, over, base, trim = data.ord.trim) {
    ord = D(ord).add(0.000000000001).floor()
    if (ord.lt(BO_VALUE) && D(ord.layer).lte(D(BO_VALUE).layer)) return displayYSeqOrd(ord, over, base, trim)
    if (trim <= 0) return "(...)"
    if (trim <= 1) return "(1,...)"
    if (trim <= 2) return "(1,2,...)"
    if (trim <= 3) return "(1,2,4,...)"
    let YSeq = "(1,2,4,8)"; // ψ(Ω_ω)
    if ((ord.gt(BO_VALUE) || D(ord.layer).gt(D(BO_VALUE).layer)) && !capOrdinalAtBO) {
        let ordLayer = D(ord.layer).plus(D(ord.mag).gte(D(BO_VALUE).mag) ? 0 : -1)
        let omegaSubscript = ordLayer.div(2).add(1.5).floor()
        // Y-sequence from 3-row BMS is too complicated, simply return 1 value per ordinal level (much like Hardy)
        if (omegaSubscript.gte(3)) YSeq = "(1,2,4,8,12,14)"; // ψ(Ω_Ω)
        if (omegaSubscript.gte(4)) YSeq = "(1,2,4,8,12,14,11,15)"; // ψ(Ω_{Ω+1})
        if (omegaSubscript.gte(6)) YSeq = "(1,2,4,8,12,14,11,16,21,23)"; // ψ(Ω_{Ω2})
        if (omegaSubscript.gte(9)) YSeq = "(1,2,4,8,12,14,14)"; // ψ(Ω_{Ω²})
        if (omegaSubscript.gte(27)) YSeq = "(1,2,4,8,12,14,16)"; // ψ(Ω_{Ω^Ω})
        if (omegaSubscript.gte(PSI_VALUE)) YSeq = "(1,2,4,8,12,15)"; // ψ(Ω_Ω₂)
        if (omegaSubscript.gte(Decimal.tetrate(PSI_VALUE,3))) YSeq = "(1,2,4,8,12,15,9)"; // ψ(I) = OFP
    }
    let trimmed = false
    let outputList = YSeq.slice(1,-1).split(",")
    let n = outputList.length
    if (n > trim) {
        trimmed = true
        outputList.length = trim
    }
    return "(" + outputList.toString()+ (trimmed ? ",...)" : ")")
}

// Displays Ordinals using Y-Sequence when the value of ord is less than NUMBER.MAX_VALUE
function displayYSeqOrd(ord, over, base, trim = data.ord.trim, depth = 0, final = true, forcePsi = false) {
    if ((data.ord.isPsi || forcePsi) && D(ord).gte(BO_VALUE)) return displayHugeYSeqOrd(ord, over, base, trim)
    let BMSOutput = trimBMSFinalOutput(displayBMSOrd(ord, over, base, trim, depth, final, forcePsi), trim)
    if ((data.ord.isPsi || forcePsi) && D(ord).toNumber() >= 0 && D(ord).toNumber() < 4) return ["(1)","(1,2)","(1,2,3)","(1,2,3,3)"][Math.floor(D(ord).toNumber())]
    return (D(ord).toNumber() >= 1) ? ((data.ord.isPsi || forcePsi) ? BMS2RowToYSeq(BMSOutput, trim - 1) : BMS1RowToYSeq(BMSOutput, trim)) : "()"
}

// Displays Ordinals using Y-Sequence when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfiniteYSeqOrd(ord, over, base, trim = data.ord.trim, depth = 0, final = true, recursionDepth = 0){
    let BMSOutput = trimBMSFinalOutput(displayInfiniteBMSOrd(ord, over, base, trim, depth, final, recursionDepth), trim)
    return D(ord).gte(1) ? BMS1RowToYSeq(BMSOutput, trim) : "()"
}
