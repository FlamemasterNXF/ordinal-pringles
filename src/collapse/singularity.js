function updateSingularityHTML(){
    DOM(`singCostText`).innerHTML = `You have <span style="color: goldenrod">${data.incrementy.charge} Charge</span>`
}
function updateSingLevelHTML(){
    DOM(`singLevel`).innerHTML = `Your Singularity has a density of <b>${data.sing.level > 0 ? ordinalDisplay('H', data.sing.level, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singLevel2`).innerHTML = `Your Singularity's highest ever density was <b>${data.sing.highestLevel > 0 ? ordinalDisplay('H', data.sing.highestLevel, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singEffect`).innerHTML = `Your Singularity is raising Cardinal Gain to the <b>${format(mainSingEffect(), 3)}</b>`
}

function loadSingularityHTML(){
    updateSingLevelHTML()
    DOM(`singSlider`).max = Math.max(1, maxSingLevel())
    DOM(`singSlider`).value = data.sing.level
}

let mainSingEffect = () => 1 + Math.sqrt(data.sing.level)/1000
let maxSingLevel = () => data.incrementy.charge


function changeSingLevel(single = false){
    DOM(`singSlider`).max = Math.max(1, data.incrementy.charge+data.sing.level)

    const change = single ? data.sing.level + 1 : parseInt(DOM(`singSlider`).value)
    const cost = change-data.sing.level
    if(single && data.incrementy.charge === 0) return createAlert('Failure', 'Insufficient Charge!', 'Oops')
    if(!single && data.incrementy.charge - cost < 0) return createAlert('Failure', 'Insufficient Charge!', 'Oops')

    if(single) --data.incrementy.charge
    if(!single && data.sing.level > change) data.incrementy.charge += data.sing.level-change
    if(!single && data.sing.level < change) data.incrementy.charge -= cost
    data.sing.level = change

    if(data.sing.level > data.sing.highestLevel) data.sing.highestLevel = data.sing.level

    updateSingLevelHTML()
}

function singControl(i){
    if(i === 0){
        data.sing.level = maxSingLevel()
        data.incrementy.charge = 0
        if(data.sing.level > data.sing.highestLevel) data.sing.highestLevel = data.sing.level
    }
    if(i === 1){
        data.incrementy.charge += data.sing.level
        data.sing.level = 0
    }
    if(i === 2) changeSingLevel(true)
    updateSingLevelHTML()
    DOM(`singSlider`).value = data.sing.level
}