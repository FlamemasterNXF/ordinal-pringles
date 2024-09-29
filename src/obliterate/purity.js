function initPurityPlane(){
    let canvas = DOM('purityCanvas')
    let context = canvas.getContext('2d')

    // Draw the Initial Plane
    context.moveTo(0, 0)
    context.line
    context.strokeStyle = `#5b5b5b`
    context.strokeRect(45, 275, 600, 0);

    // Draw the Points
    let containers = [
        DOM('ppXContainer0'),
        DOM('ppXContainer1'),
    ]

    for (let i = 0; i < 5; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `purityPoint${i}`
        //point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        setupPurityPoint(i, point)
        containers[0].append(point)
    }
    for (let i = 0; i < 5; i++) {
        let point = document.createElement('div')
        point.className = 'purityPoint'
        point.id = `purityPoint${5+i}`
        //point.style.marginBottom = '0.5rem'
        point.style.marginLeft = i > 0 ? '2.35rem' : '0rem'
        setupPurityPoint(5+i, point)
        containers[1].append(point)
    }
}

function setupPurityPoint(i, point){
    if(isPurityPointUnlocked(i)) point.style.borderColor = '#949494'
    if(isPurityPointAssigned(i)){
        point.style.borderColor = pringleData[data.purity.assignment[i]].color
        if(data.sToggles[18]) point.innerText = `${data.purity.assignment[i]}`
    }

    point.addEventListener('mouseover', (e) => displayPringleButton(e, null, i, 'pringleButton'))
    point.addEventListener('click', () => assignPringle(i, 1))
}

function updateAllMiscPringleColors(mode){
    for (let i = 0; i < 10; i++) {
        DOM(`${mode}Pringle${i}`).style.borderColor = isPringleAssigned(i) ? '#5b5b5b' : getPringleData(i).color
    }
}

function updatePurityText(i) {
    let pringle = getPurityPringleData(i)

    DOM(`pringleButton`).innerHTML = isPurityPointUnlocked(i) ?
        isPurityPointAssigned(i) ? `This Point provides ${format(getPurityStrength(i)*100)}% Pringle Purity<br>The <b style='color: ${pringle.color}'>${pringle.name} ${pringle.name === 'Barbecue' ? '' : pringle.colorDesc} Pringle</b> is currently <b>ASSIGNED</b> here!<br><span style="font-size: 0.85rem">${pringle.desc.replaceAll('Boosts', 'Boosting').replaceAll('Reduces', 'Reducing')} [${getPringleEffectText(pringle, data.purity.assignment[i])}]</span>`
            : `This Point provides ${format(getPurityStrength(i)*100)}% Pringle Purity<br>This Point is currently <b>UNUSED</b><br><span style="font-size: 0.85rem">Click a Pringle in the box and then this Point to Assign it here!</span>`
        : `This Point will provide ${format(getPurityStrength(i)*100)}% Pringle Purity<br>This Point is currently <b>LOCKED</b><br><span style="font-size: 0.85rem">Click this Point to unlock it for 1 Fractal Energy!</span>`
}

function assignPringle(i, type, skipUpdate = false){
    /*
        TYPE 0: 'Queue' Pringle for Assignment
        TYPE 1: Assign Pringle
        TYPE 2: Unassign Pringle
     */

    if(type === 0) data.purity.pringleQueued = i
    if(type === 1){
        if(isPringleAssigned(data.purity.pringleQueued)) return
        if(!isPurityPointUnlocked(i)) buyPurityPoint(i)
        if(data.purity.isAssigned[i] === true) assignPringle(i, 2)

        if(data.purity.pringleQueued > -1) {
            data.purity.isAssigned[i] = true
            data.purity.assignment[i] = data.purity.pringleQueued
            DOM(`purityPoint${i}`).style.borderColor = pringleData[data.purity.pringleQueued].color
            if(data.sToggles[18]) DOM(`purityPoint${i}`).innerText = `${data.purity.assignment[i]}`
            data.purity.pringleQueued = -1
        }
        updatePurityText(i)
    }
    if(type === 2){
        DOM(`purityPoint${i}`).style.borderColor = '#949494'
        if(data.sToggles[18]) DOM(`purityPoint${i}`).innerText = ''
        data.purity.isAssigned[i] = false
        data.purity.assignment[i] = false
        if(!skipUpdate) updatePurityText(i)
    }
}

function buyPurityPoint(i){
    if(data.obliterate.energy < 1 || data.purity.isUnlocked[i]) return

    data.purity.isUnlocked[i] = true
    spendFractalEnergy()

    DOM(`purityPoint${i}`).style.borderColor = '#949494'
    updatePassiveEnergyText(i)
}

function getPurityStrength(i){
    if(i < 5) return (i+1)*0.2
    if(i >= 5) return 1-(i-5)*0.2
    return 0.96
}
let isPurityPointUnlocked = (i) => data.purity.isUnlocked[i]
let isPurityPointAssigned = (i) => data.purity.isAssigned[i]
let getPurityPringleData = (i) => pringleData[data.purity.assignment[i]]

function getAssignedPurityPoints(){
    let total = 0
    for (let i = 0; i < data.purity.isAssigned.length; i++) {
        if(data.purity.isAssigned[i]) ++total
    }
    return total
}