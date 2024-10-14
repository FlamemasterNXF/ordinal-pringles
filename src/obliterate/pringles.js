let pringleData = [
    {
        color: '#6ba000',
        colorDesc: 'Green',
        name: 'Flavorful',
        desc: 'Boosts the First, Fifth, and Sixth Cardinal Upgrades',
        sign: 'x',
        eff: () => D(data.obliterate.pringleAmount[0]+3),
        baseValue: 1,
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        costIsDecimal: true,
        cost: () => D(1e10).pow((data.obliterate.pringleAmount[0]+1)*Math.pow(data.obliterate.pringleAmount[0]+1, 1/1.5))
    },
    {
        color: '#73af80',
        colorDesc: 'Green',
        name: 'Crispy',
        desc: 'Boosts the Second Cardinal Upgrade',
        sign: '+',
        eff: () => D((data.obliterate.pringleAmount[1])/100),
        baseValue: 0,
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        costIsDecimal: true,
        cost: () => D(1e30).pow((data.obliterate.pringleAmount[1]+1)*Math.sqrt(data.obliterate.pringleAmount[1]+1))
    },
    {
        color: '#2da000',
        colorDesc: 'Green',
        name: 'Perfected',
        desc: 'Boosts the Seventh Cardinal Upgrade and Boosts Cardinal Gain',
        sign: 'x',
        eff: () => D(data.obliterate.pringleAmount[2]*5).times(getEUPEffect(3, 0)),
        baseValue: 1,
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        costIsDecimal: false,
        cost: () => D(1e6).times(Math.pow(10, data.obliterate.pringleAmount[2]))
    },

    {
        color: '#ae3510',
        colorDesc: 'Orange',
        name: 'Popular',
        desc: 'Boosts AutoClicker Speeds and Dynamic Cap',
        sign: 'x',
        eff: () => D(10).pow(data.obliterate.pringleAmount[3]),
        baseValue: 1,
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        costIsDecimal: false,
        cost: () => D(1e20).times(Math.pow(10, data.obliterate.pringleAmount[3]))
    },
    {
        color: '#ae8910',
        colorDesc: 'Orange',
        name: 'Limited-Edition',
        desc: 'Boosts ℵ<sub>0</sub> Gain',
        sign: 'x',
        eff: () => D(data.obliterate.pringleAmount[4]**2),
        baseValue: 1,
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        costIsDecimal: false,
        cost: () => D(1e20).times(Math.pow(32, data.obliterate.pringleAmount[4]))
    },
    {
        color: '#ae6610',
        colorDesc: 'Orange',
        name: 'Perfected',
        desc: 'Boosts the First ℵ<sub>0</sub> Effect and the Third ℵ<sub>0</sub> Rebuyable',
        sign: '+',
        eff: () => D(data.obliterate.pringleAmount[5]/20).plus(getEUPEffect(3, 2)),
        baseValue: 0,
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        costIsDecimal: false,
        cost: () => D(1e6).times(Math.pow(10, data.obliterate.pringleAmount[5]))
    },

    {
        color: '#0091a2',
        colorDesc: 'Blue',
        name: 'Delicious',
        desc: "Boosts the FGH Effect and SGH Effect",
        sign: 'x',
        eff: () => D(data.obliterate.pringleAmount[6]+(data.obliterate.pringleAmount[6]/10)),
        baseValue: 1,
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        costIsDecimal: true,
        cost: () => D(1e30).pow(Math.sqrt(data.obliterate.pringleAmount[6]+1))
    },
    {
        color: '#3e7eab',
        colorDesc: 'Blue',
        name: 'Crunchy',
        desc: "Boosts FGH and SGH Gain",
        sign: 'x',
        eff: () => D(data.obliterate.pringleAmount[7]**5).times(getEUPEffect(3, 1)),
        baseValue: 1,
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        costIsDecimal: true,
        cost: () => D(1e30).pow(Math.sqrt(data.obliterate.pringleAmount[7]+1))
    },
    {
        color: '#3d40fd',
        colorDesc: 'Blue',
        name: 'Perfected',
        desc: "Boosts the Hierarchy Rebuyable Caps",
        sign: '+',
        eff: () => D(200).times(data.obliterate.pringleAmount[8]),
        baseValue: 0,
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        costIsDecimal: false,
        cost: () => D(1e6).times(Math.pow(10, data.obliterate.pringleAmount[8]))
    },

    {
        color: '#af1fad',
        colorDesc: 'Pink-Purple',
        name: 'Barbecue',
        desc: "Boosts AutoBuyer Speed",
        sign: 'x',
        eff: () => D(10**data.obliterate.pringleAmount[9]).times(getEUPEffect(3, 3)),
        baseValue: 1,
        resNames: 'ℵ<sub>&omega;</sub>',
        resLocation: [['omega', 'bestRemnants']],
        costIsDecimal: false,
        cost: () => D(2000+(100*data.obliterate.pringleAmount[9]+1)*(data.obliterate.pringleAmount[9]+1))
    },
]

function initPringleAlchemy(){
    let canvas = DOM('pringleCanvas')
    let context = canvas.getContext('2d')

    // Draw the Center Circle
    context.moveTo(500, 300)
    context.line
    context.strokeStyle = `#5b5b5b`
    context.beginPath();
    context.arc(500, 300, 200, 0, 2 * Math.PI);
    context.stroke();

    initPringles()
}
function initPringles(){
    for (let i = 0; i < pringleData.length; i++) {
        DOM(`pringle${i}`).addEventListener("mouseenter", (e) => displayPringleButton(e, pringleData[i], i))
        DOM(`pringle${i}`).addEventListener("click", () => buyPringle(pringleData[i], i))
        DOM(`pringle${i}`).style.border = `2px solid ${pringleData[i].color}`
        if(data.sToggles[18]) DOM(`pringle${i}`).innerText = `${i}`
    }
}

function updateCanBuyPringleHTML(){
    for (let i = 0; i < pringleData.length; i++) {
        DOM(`pringle${i}`).style.boxShadow = canBuyPringle(pringleData[i])
            ? `0px 0px 15px ${pringleData[i].color}` : ` 0 5px 15px rgba(0,0,0,0)`
    }
    //DOM(`pringle9`).style.boxShadow = canBuyPringle(pringleData[9]) ? `0px 0px 15px rgba(175, 31, 173, 1)` : ` 0 5px 15px rgba(0,0,0,0.4)`
}

function displayPringleButton(event, pringleData, i, type = 'pringleButton'){
    let button = DOM(type)

    button.style.display = `block`
    button.style.left = `${event.pageX}px`
    button.style.top = `${event.pageY}px`

    button.style.color = pringleData != null ? pringleData.color : '#ffffff'
    if(type === 'pringleButton') pringleData != null ? updatePringleButtonText(pringleData, i) : updatePurityText(i)
}
function updatePringleButtonText(pringleData, i){
    DOM('pringleButton').innerHTML = `The ${pringleData.name}${i !== 9 ? ` ${pringleData.colorDesc}` : ''} Pringle [${data.obliterate.pringleAmount[i]}]<br><b>${pringleData.desc} [${getPringleEffectText(pringleData, i)}]</b><br>It costs <b>${format(pringleData.cost())} ${pringleData.resNames}</b> to craft<br>${getPringleAssignmentText(i)}<br><i style="font-size: 0.85rem; color: gray">Click this Pringle to Craft it!</i>`
}

let getPringleEffectText = (pringleData, i) =>
    pringleData.sign !== 'x' ? `${pringleData.sign}${format(getPringleEffectBaseline(i))}` : `${format(getPringleEffectBaseline(i))}${pringleData.sign}`
function getPringleAssignmentText(i){
    let isAssigned = isPringleAssigned(i)
    return isAssigned ? `It is currently ASSIGNED!` : `It is currently UNASSIGNED`
}

function isPringleAssigned(i){
    let isAssigned = false
    for (let j = 0; j < data.purity.assignment.length; j++) {
        if(!isPurityPointUnlocked(j)) continue;
        if(data.purity.assignment[j] === i) isAssigned = true
    }
    return isAssigned
}
function getPringleAssignment(i){
    if(!isPringleAssigned(i)) return -1
    let assignment = 0
    for (let j = 0; j < data.purity.assignment.length; j++) {
        if(!isPurityPointUnlocked(j)) continue;
        if(data.purity.assignment[j] === i) assignment = j
    }
    return assignment
}

function canBuyPringle(localPringleData){
    for (let i = 0; i < localPringleData.resLocation.length; i++) {
        let location = data
        for (let j = 0; j < localPringleData.resLocation[i].length; j++) {
            location = location[localPringleData.resLocation[i][j]]
        }
        if(D(location).lt(localPringleData.cost())) return false
    }
    return true
}

function buyPringle(localPringleData, index){
    if(!canBuyPringle(localPringleData)) return isPringleAssigned(index)
        ? assignPringle(getPringleAssignment(index), 2, true) : assignPringle(index, 0)

    for (let i = 0; i < localPringleData.resLocation.length; i++) {
        let location = 'data'
        for (let j = 0; j < localPringleData.resLocation[i].length; j++) {
            location += `['${[localPringleData.resLocation[i][j]]}']`
        }
        if(localPringleData.costIsDecimal) eval(`${location} = ${location}.sub(localPringleData.cost())`)
        else eval(`${location} -= localPringleData.cost().toNumber()`)
    }
    ++data.obliterate.pringleAmount[index]
    updatePringleButtonText(localPringleData, index)
    updateCanBuyPringleHTML()
}

let getPringleData = (i) => pringleData[i]

let getPringleEffectBaseline = (i) => Decimal.max(pringleData[i].baseValue, (pringleData[i].eff()))
let getPringleEffect = (i, number = false) => number
    ? getPringleEffect(i).toNumber()
    : (isPringleAssigned(i) && data.obliterate.pringleAmount[i] > 0) ? Decimal.max(pringleData[i].baseValue, getPringleEffectBaseline(i).times(getPurityStrength(getPringleAssignment(i)))): D(pringleData[i].baseValue)