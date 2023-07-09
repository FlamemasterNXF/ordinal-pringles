function updateSingularityHTML(){
    DOM(`singAutoText`).innerHTML = `Your <span style="color: #80ceff">Markup AutoBuyer</span> speed is <span style="color: #8080FF">${format(t2Auto())}`
}
function updateSingLevelHTML(){
    DOM(`singLevel`).innerHTML = `Your Singularity has a density of <b>${data.sing.level > 0 ? ordinalDisplay('H', data.sing.level, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singLevel2`).innerHTML = `Your Singularity's highest ever density was <b>${data.sing.level > 0 ? ordinalDisplay('H', data.sing.highestLevel, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singEffect`).innerHTML = `Your Singularity is raising Cardinal Gain to the <b>${format(mainSingEffect(), 3)}</b>`
}

function loadSingularityHTML(){
    updateSingLevelHTML()
    DOM(`singSlider`).max = Math.max(1, data.sing.highestLevel*2)
    DOM(`singSlider`).value = data.sing.level
}

let mainSingEffect = () => 1 + Math.sqrt(data.sing.level)/1000

function changeSingLevel(){
    data.sing.level = parseInt(DOM(`singSlider`).value)

    if(data.sing.level > data.sing.highestLevel) data.sing.highestLevel = data.sing.level
    DOM(`singSlider`).max = Math.max(1, data.sing.highestLevel*2)

    updateSingLevelHTML()
}

function singControl(i){
    if(i === 0) data.sing.level = data.sing.highestLevel
    if(i === 1) data.sing.level = data.sing.highestLevel //TBD
    if(i === 2) data.sing.level = 0
    updateSingLevelHTML()
}