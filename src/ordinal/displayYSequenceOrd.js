//Converts BMS to Y Sequence

function BMS1RowToYSeq(output, trim = data.ord.trim) {
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

// Displays Ordinals using Y-Sequence when the value of ord is less than NUMBER.MAX_VALUE
function displayYSeqOrd(ord, over, base, trim = data.ord.trim, depth = 0, final = true) {
    let BMSOutput = trimBMSFinalOutput(displayBMSOrd(ord, over, base, trim, depth, final), trim)
    if (data.ord.isPsi && D(ord).toNumber() >= 0 && D(ord).toNumber() < 4) return ["(1)","(1,2)","(1,2,3)","(1,2,3,3)"][Math.floor(D(ord).toNumber())]
    return (D(ord).toNumber() >= 1) ? (data.ord.isPsi ? BMS2RowToYSeq(BMSOutput, trim - 1) : BMS1RowToYSeq(BMSOutput, trim)) : "()"
}

// Displays Ordinals using Y-Sequence when the value of ord is greater than NUMBER.MAX_VALUE
function displayInfiniteYSeqOrd(ord, over, base, trim = data.ord.trim, depth = 0, final = true, recursionDepth = 0){
    let BMSOutput = trimBMSFinalOutput(displayInfiniteBMSOrd(ord, over, base, trim, depth, final, recursionDepth), trim)
    return D(ord).gte(1) ? BMS1RowToYSeq(BMSOutput, trim) : "()"
}
