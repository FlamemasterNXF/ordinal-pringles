function initPurityPlane(){
    let canvas = DOM('purityCanvas')
    let context = canvas.getContext('2d')

    // Draw the Initial Plane
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#5b5b5b`
    context.strokeRect(0, 275, 550, 0);
    context.strokeRect(275, 0, 0, 550);

    // Draw the Circles
    context.moveTo(0, 0)
    context.line
    context.beginPath();
    context.arc(275, 275, 133, 0, 2 * Math.PI);
    context.stroke();
    context.moveTo(0, 0)
    context.line
    context.beginPath();
    context.arc(275, 275, 266, 0, 2 * Math.PI);
    context.stroke();


    // Draw the Points
    let containers = [
        DOM('ppYContainer'),
        DOM('ppXContainer0'),
        DOM('ppXContainer1'),
    ]
    for (let i = 0; i < 9; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `purityPoint${i}`
        point.style.marginTop = i > 0 ? `2.35rem` : `-0.5rem`
        setupPurityPoint(i, point)
        containers[0].append(point)
    }
    for (let i = 0; i < 4; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `purityPoint${9+i}`
        point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        setupPurityPoint(9+i, point)
        containers[1].append(point)
    }
    for (let i = 0; i < 4; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `purityPoint${13+i}`
        point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        setupPurityPoint(13+i, point)
        containers[2].append(point)
    }

    // Initialize the Pringle Boxes
    initPringleBox()
}
function initPringleBox(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            let pringle = document.createElement('div')
            let index = j+(i*6)
            pringle.className = 'purityPringle'
            pringle.id = `purityPringle${index}`
            pringle.style.borderColor = isPringleAssigned(index) ? '#5b5b5b' : pringleData[index].color
            pringle.addEventListener('mouseenter', (e) => displayPringleButton(e,pringleData[index], index, 'purityButton'))
            pringle.addEventListener('click', () => assignPringle(index, 0))
            DOM(`pringleBox${i}`).append(pringle)
        }
    }
}

function setupPurityPoint(i, point){
    if(isPurityPointUnlocked(i)) point.style.borderColor = '#949494'
    if(isPurityPointAssigned(i)) point.style.borderColor = pringleData[data.purity.assignment[i]].color

    point.addEventListener('mouseover', () => updatePurityText(i))
    point.addEventListener('click', () => assignPringle(i, 1))
}

function updatePurityText(i) {
    let pringle = getPurityPringleData(i)

    for (let j = 0; j < 2; j++) {
        DOM(`purityBarBox${j}`).innerHTML = isPurityPointUnlocked(i) ?
            isPurityPointAssigned(i) ? `This Point provides ${format(getPurityStrength(i)*100)}% Pringle Purity<br>The <b style='color: ${pringle.color}'>${pringle.name} ${pringle.colorDesc} Pringle</b> is currently <b>ASSIGNED</b> here!<br><span style="font-size: 0.85rem">${pringle.desc.replaceAll('Boosts', 'Boosting').replaceAll('Reduces', 'Reducing')} [${getPringleEffectText(pringle, data.purity.assignment[i])}]</span>`
                : 'This Point is currently <b>UNUSED</b><br><span style="font-size: 0.85rem">Click a Pringle in the box and then this Point to Assign it here!</span>'
            : 'This Point is currently <b>LOCKED</b><br><span style="font-size: 0.85rem">Click this Point to unlock it for 1 Fractal Energy!</span>'
    }
}

function updatePurityButtonText(pringle, i){
    DOM(`purityButton`).innerHTML = `This is the <b style="color: ${pringle.color}">${pringle.name} ${pringle.colorDesc} Pringle</b><br>It ${pringle.desc}`
}

function assignPringle(i, type){
    /*
        TYPE 0: 'Queue' Pringle for Assignment
        TYPE 1: Assign Pringle
        TYPE 2: Unassign Pringle
     */

    if(type === 0) data.purity.pringleQueued = i
    if(type === 1){
        if(!isPurityPointUnlocked(i)) buyPurityPoint(i)
        if(data.purity.isAssigned[i] === true) assignPringle(i, 2)

        if(data.purity.pringleQueued > -1) {
            data.purity.isAssigned[i] = true
            data.purity.assignment[i] = data.purity.pringleQueued
            DOM(`purityPoint${i}`).style.borderColor = pringleData[data.purity.pringleQueued].color
            DOM(`purityPringle${data.purity.pringleQueued}`).style.borderColor = '#5b5b5b'
            data.purity.pringleQueued = -1
        }
        updatePurityText(i)
    }
    if(type === 2){
        DOM(`purityPringle${data.purity.assignment[i]}`).style.borderColor = getPurityPringleData(i).color
        DOM(`purityPoint${i}`).style.borderColor = '#949494'
        data.purity.isAssigned[i] = false
        data.purity.assignment[i] = 0
        updatePurityText(i)
    }
}

function buyPurityPoint(i){
    if(data.obliterate.energy < 1) return

    data.purity.isUnlocked[i] = true
    --data.obliterate.energy

    DOM(`purityPoint${i}`).style.borderColor = '#949494'
    updatePassiveEnergyText(i)
}

function getPurityStrength(i){
    if(i <= 4) return 0.2*(i+1)
    if(i > 4 && i <= 8) return 1-(0.2*(i-4))
    if(i > 8 && i <= 12) return 0.2*(i-8)
    if(i > 12 && i <= 16) return 1-(0.2*(i-12))
}
let isPurityPointUnlocked = (i) => data.purity.isUnlocked[i]
let isPurityPointAssigned = (i) => data.purity.isAssigned[i]
let getPurityPringleData = (i) => pringleData[data.purity.assignment[i]]