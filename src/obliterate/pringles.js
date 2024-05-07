let pringleData = [
    {
        color: '#6ba000',
        colorDesc: 'Green',
        name: 'Flavorful',
        desc: 'Boosts the First Cardinal Upgrade',
        eff: () => D(data.obliterate.pringleAmount[0]),
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        cost: () => D(1e10).pow((data.obliterate.pringleAmount[0]+1)*Math.sqrt(data.obliterate.pringleAmount[0]+1))
    },
    {
        color: '#73af80',
        colorDesc: 'Green',
        name: 'Crispy',
        desc: 'Boosts the Second Cardinal Upgrade',
        eff: () => D(data.obliterate.pringleAmount[1]/100),
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        cost: () => D(1e30).pow((data.obliterate.pringleAmount[1]+1)*Math.sqrt(data.obliterate.pringleAmount[1]+1))
    },
    {
        color: '#2e8c76',
        colorDesc: 'Green',
        name: 'Popular',
        desc: 'Boosts the Fifth Cardinal Upgrade',
        eff: () => D(data.obliterate.pringleAmount[2]),
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        cost: () => D(1e40).pow((data.obliterate.pringleAmount[2]+1)*Math.sqrt(data.obliterate.pringleAmount[2]+1))
    },
    {
        color: '#2d834f',
        colorDesc: 'Green',
        name: 'Beloved',
        desc: 'Boosts the Sixth Cardinal Upgrade',
        eff: () => D(Math.sqrt(data.obliterate.pringleAmount[3]+1)),
        resNames: 'Incrementy',
        resLocation: [['incrementy', 'amt']],
        cost: () => D(1e6).pow((data.obliterate.pringleAmount[3]+1)*Math.sqrt(data.obliterate.pringleAmount[3]+1))
    },
    {
        color: '#2da000',
        colorDesc: 'Green',
        name: 'Perfected',
        desc: 'Boosts the Seventh Cardinal Upgrade',
        eff: () => D(data.obliterate.pringleAmount[4]*3),
        resNames: 'of all the Green Pringles',
        resLocation: [['obliterate', 'pringleAmount', '0'], ['obliterate', 'pringleAmount', '1'], ['obliterate', 'pringleAmount', '2'], ['obliterate', 'pringleAmount', '3']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[4]))
    },

    {
        color: '#ae3510',
        colorDesc: 'Orange',
        name: 'Flavorful',
        desc: 'Boosts AutoClicker Speeds',
        eff: () => D(10).pow(data.obliterate.pringleAmount[5]),
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        cost: () => D(1e10).times(Math.pow(2, data.obliterate.pringleAmount[5]))
    },
    {
        color: '#ae8910',
        colorDesc: 'Orange',
        name: 'Crispy',
        desc: 'Boosts ℵ<sub>0</sub> Gain',
        eff: () => D(data.obliterate.pringleAmount[6]*2),
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        cost: () => D(1e10).times(Math.pow(12, data.obliterate.pringleAmount[6]))
    },
    {
        color: '#b07a37',
        colorDesc: 'Orange',
        name: 'Popular',
        desc: 'Boosts the Third ℵ<sub>0</sub> Rebuyable',
        eff: () => D((data.obliterate.pringleAmount[7]/100)*5),
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        cost: () => D(1e10).times(Math.pow(6, data.obliterate.pringleAmount[7]))
    },
    {
        color: '#b6924f',
        colorDesc: 'Orange',
        name: 'Beloved',
        desc: 'Boosts the Second ℵ<sub>0</sub> Rebuyable',
        eff: () => D(data.obliterate.pringleAmount[8]),
        resNames: 'Booster Power',
        resLocation: [['overflow', 'bp']],
        cost: () => D(1e10).times(Math.pow(3, data.obliterate.pringleAmount[8]))
    },
    {
        color: '#ae6610',
        colorDesc: 'Orange',
        name: 'Perfected',
        desc: 'Boosts the First ℵ<sub>0</sub> Effect',
        eff: () => D((data.obliterate.pringleAmount[9]/100)*5),
        resNames: 'of all the Orange Pringles',
        resLocation: [['obliterate', 'pringleAmount', '5'], ['obliterate', 'pringleAmount', '6'], ['obliterate', 'pringleAmount', '7'], ['obliterate', 'pringleAmount', '8']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[9]))
    },

    {
        color: '#c2508f',
        colorDesc: 'Pink-Purple',
        name: 'Flavorful',
        desc: "Reduces the Second Incrementy Rebuyable's Cost Scaling",
        eff: () => D(data.obliterate.pringleAmount[10]/100),
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        cost: () => D(1e6).times(Math.pow(2, data.obliterate.pringleAmount[10]))
    },
    {
        color: '#b90d55',
        colorDesc: 'Pink-Purple',
        name: 'Crispy',
        desc: "Reduces the Third Incrementy Rebuyable's Cost Scaling",
        eff: () => D(data.obliterate.pringleAmount[11]/100),
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        cost: () => D(1e6).times(Math.pow(20, data.obliterate.pringleAmount[11]))
    },
    {
        color: '#92009a',
        colorDesc: 'Pink-Purple',
        name: 'Popular',
        desc: "Reduces the Fourth Incrementy Rebuyable's Cost Scaling",
        eff: () => D(data.obliterate.pringleAmount[12]/4),
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        cost: () => D(1e6).times(Math.pow(10, data.obliterate.pringleAmount[12]))
    },
    {
        color: '#af1fad',
        colorDesc: 'Pink-Purple',
        name: 'Beloved',
        desc: "Reduces the Sixth Incrementy Rebuyable's Cost Scaling",
        eff: () => D(data.obliterate.pringleAmount[13]/5),
        resNames: 'ℵ<sub>0</sub>',
        resLocation: [['baseless', 'alephNull']],
        cost: () => D(1e6).times(Math.pow(5, data.obliterate.pringleAmount[13]))
    },
    {
        color: '#f542a4',
        colorDesc: 'Pink-Purple',
        name: 'Perfected',
        desc: "Reduces the Fifth Incrementy Rebuyable's Cost Scaling",
        eff: () => D(data.obliterate.pringleAmount[14]/3),
        resNames: 'of all the Pink-Purple Pringles',
        resLocation: [['obliterate', 'pringleAmount', '10'], ['obliterate', 'pringleAmount', '11'], ['obliterate', 'pringleAmount', '12'], ['obliterate', 'pringleAmount', '13']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[14]))
    },

    {
        color: '#0091a2',
        colorDesc: 'Blue',
        name: 'Flavorful',
        desc: "Boosts the FGH Effect",
        eff: () => D(10).pow(2*data.obliterate.pringleAmount[15]),
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        cost: () => D(1e30).pow(Math.sqrt(data.obliterate.pringleAmount[15]+1))
    },
    {
        color: '#3e7eab',
        colorDesc: 'Blue',
        name: 'Crispy',
        desc: "Boosts FGH Gain",
        eff: () => D(10).pow(2*data.obliterate.pringleAmount[16]),
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        cost: () => D(1e10).pow(Math.sqrt(data.obliterate.pringleAmount[16]+1))
    },
    {
        color: '#0073bb',
        colorDesc: 'Blue',
        name: 'Popular',
        desc: "Boosts the SGH Effect",
        eff: () => D(10).pow(50*data.obliterate.pringleAmount[17]),
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        cost: () => D(1e20).pow(Math.sqrt(data.obliterate.pringleAmount[17]+1))
    },
    {
        color: '#2b3cab',
        colorDesc: 'Blue',
        name: 'Beloved',
        desc: "Boosts SGH Gain",
        eff: () => D(10).pow(2*data.obliterate.pringleAmount[18]),
        resNames: 'Cardinals',
        resLocation: [['collapse', 'cardinals']],
        cost: () => D(1e40).pow(Math.sqrt(data.obliterate.pringleAmount[18]+1))
    },
    {
        color: '#3d40fd',
        colorDesc: 'Blue',
        name: 'Perfected',
        desc: "Boosts the Hierarchy Rebuyable Caps",
        eff: () => D(100).times(data.obliterate.pringleAmount[19]),
        resNames: 'of all the Blue Pringles',
        resLocation: [['obliterate', 'pringleAmount', '15'], ['obliterate', 'pringleAmount', '16'], ['obliterate', 'pringleAmount', '17'], ['obliterate', 'pringleAmount', '18']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[19]))
    },


    {
        color: '#a8ad0b',
        colorDesc: 'Green',
        name: 'Limited Edition',
        desc: "Boosts Cardinal Gain",
        eff: () => D(10).pow(data.obliterate.pringleAmount[20]),
        resNames: 'of all the Green Pringles',
        resLocation: [['obliterate', 'pringleAmount', '0'], ['obliterate', 'pringleAmount', '1'], ['obliterate', 'pringleAmount', '2'], ['obliterate', 'pringleAmount', '3']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[20]))
    },
    {
        color: '#77361c',
        colorDesc: 'Orange',
        name: 'Limited Edition',
        desc: "Boosts Dynamic Cap",
        eff: () => D(10).pow(data.obliterate.pringleAmount[21]*10),
        resNames: 'of all the Orange Pringles',
        resLocation: [['obliterate', 'pringleAmount', '5'], ['obliterate', 'pringleAmount', '6'], ['obliterate', 'pringleAmount', '7'], ['obliterate', 'pringleAmount', '8']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[21]))
    },
    {
        color: '#d065c7',
        colorDesc: 'Pink-Purple',
        name: 'Limited Edition',
        desc: "Reduces Charge Cost",
        eff: () => D(data.obliterate.pringleAmount[22]/100),
        resNames: 'of all the Pink-Purple Pringles',
        resLocation: [['obliterate', 'pringleAmount', '10'], ['obliterate', 'pringleAmount', '11'], ['obliterate', 'pringleAmount', '12'], ['obliterate', 'pringleAmount', '13']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[22]))
    },
    {
        color: '#0ea87a',
        colorDesc: 'Blue',
        name: 'Limited Edition',
        desc: "Boosts Incrementy Gain",
        eff: () => D(10).pow(data.obliterate.pringleAmount[23]*10),
        resNames: 'of all the Blue Pringles',
        resLocation: [['obliterate', 'pringleAmount', '15'], ['obliterate', 'pringleAmount', '16'], ['obliterate', 'pringleAmount', '17'], ['obliterate', 'pringleAmount', '18']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[23]))
    },
    {
        color: '#ce0b0b',
        colorDesc: 'Red',
        name: 'Barbecue',
        desc: "Boosts AutoBuyer Speed",
        eff: () => D(10).pow(data.obliterate.pringleAmount[24]*10),
        resNames: 'of all the Inner-Circle Pringles',
        resLocation: [['obliterate', 'pringleAmount', '20'], ['obliterate', 'pringleAmount', '21'], ['obliterate', 'pringleAmount', '2'], ['obliterate', 'pringleAmount', '23']],
        cost: () => Decimal.max(1, D(1).times(data.obliterate.pringleAmount[24]))
    },
]

function initPringleAlchemy(){
    let canvas = DOM('pringleCanvas')
    let context = canvas.getContext('2d')

    // Draw the Top Left Circle
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#5b5b5b`
    context.beginPath();
    context.arc(150, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(0, 600)
    context.line
    context.beginPath();
    context.arc(150, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Top Right Circle
    context.moveTo(1000, 0)
    context.line
    context.beginPath();
    context.arc(850, 145, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Bottom Left Circle
    context.moveTo(1000, 600)
    context.line
    context.beginPath();
    context.arc(850, 455, 140, 0, 2 * Math.PI);
    context.stroke();

    // Draw the Center Circle
    context.moveTo(500, 300)
    context.line
    context.beginPath();
    context.arc(500, 300, 240, 0, 2 * Math.PI);
    context.stroke();

    initPringles()
}
function initPringles(){
    for (let i = 0; i < pringleData.length; i++) {
        DOM(`pringle${i}`).addEventListener("mouseenter", (e) => displayPringleButton(e, pringleData[i], i))
        DOM(`pringle${i}`).addEventListener("click", () => buyPringle(pringleData[i], i))
        DOM(`pringle${i}`).style.border = `2px solid ${pringleData[i].color}`
    }
}

function displayPringleButton(event, pringleData, i, type = 'pringleButton'){
    let button = DOM(type)

    button.style.display = `block`
    button.style.left = `${event.pageX}px`
    button.style.top = `${event.pageY}px`

    button.style.color = pringleData.color
    if(type === 'pringleButton') updatePringleButtonText(pringleData, i)
    if(type === 'purityButton') updatePurityButtonText(pringleData, i)
}
function updatePringleButtonText(pringleData, i){
    DOM('pringleButton').innerHTML = `The ${pringleData.name}${i !== 24 ? ` ${pringleData.colorDesc}` : ''} Pringle [${data.obliterate.pringleAmount[i]}]<br><b>${pringleData.desc} [${getPringleEffectText(pringleData, i)}]</b><br>It costs <b>${format(pringleData.cost())} ${pringleData.resNames}</b> to craft<br>${getPringleAssignmentText(i)}<br><i style="font-size: 0.85rem; color: gray">Click this Pringle to Craft it!</i>`
}

let getPringleEffectText = (pringleData, i) =>
    `${pringleData.colorDesc === 'Pink-Purple' ? '-' : ''}${format(getPringleEffect(i))}${pringleData.colorDesc !== 'Pink-Purple' ? 'x' : ''}`
function getPringleAssignmentText(i){
    if(i === 24) return `It requires no Assignment`

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

function buyPringle(pringleData, index){
    for (let i = 0; i < pringleData.resLocation.length; i++) {
        let location = data
        for (let j = 0; j < pringleData.resLocation[i].length; j++) {
            location = location[pringleData.resLocation[i][j]]
        }
        if(D(location).lt(pringleData.cost())) return
    }

    for (let i = 0; i < pringleData.resLocation.length; i++) {
        let location = 'data'
        for (let j = 0; j < pringleData.resLocation[i].length; j++) {
            location += `['${[pringleData.resLocation[i][j]]}']`
        }
        if(location !== `data['incrementy']['amt']`) eval(`${location} -= pringleData.cost().toNumber()`)
    }
    ++data.obliterate.pringleAmount[index]
    updatePringleButtonText(pringleData, index)
}

let getPringleEffect = (i, number = false) => number
    ? getPringleEffect(i).toNumber()
    : isPringleAssigned(i) || i === 24 ? Decimal.max(1, (pringleData[i].eff()).times(getPurityStrength(getPringleAssignment(i)))): D(1)