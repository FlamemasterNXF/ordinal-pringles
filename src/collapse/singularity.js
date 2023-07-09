function updateSingularityHTML(){
    DOM(`singAutoText`).innerHTML = `Your <span style="color: #80ceff">Markup AutoBuyer</span> speed is <span style="color: #8080FF">${format(t2Auto())}`
}
function updateSingLevelHTML(){
    DOM(`singLevel`).innerHTML = `Your Singularity has a density of <b>${data.sing.level > 0 ? ordinalDisplay('H', data.sing.level, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singLevel2`).innerHTML = `Your Singularity's highest ever density was <b>${data.sing.highestLevel > 0 ? ordinalDisplay('H', data.sing.highestLevel, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singEffect`).innerHTML = `Your Singularity is raising Cardinal Gain to the <b>${format(mainSingEffect(), 3)}</b> and dividing the Markup Autobuyer's speed by ${format(singAutoEffect())}`
}

function loadSingularityHTML(){
    updateSingLevelHTML()
    DOM(`singSlider`).max = Math.max(1, maxSingLevel())
    DOM(`singSlider`).value = data.sing.level
}

let mainSingEffect = () => 1 + Math.sqrt(data.sing.level)/1000
let singAutoEffect = () => data.sing.level > 0 ? Math.max(2**data.sing.level) : 1
let maxSingLevel = () => Math.log2(t2AutoPure())

function changeSingLevel(single = false){
    DOM(`singSlider`).max = Math.max(1, maxSingLevel())

    if(data.sing.level + 1 > maxSingLevel() && single)
        return createAlert('I wouldn\'t recommend that!', 'If you grow your Singularity any further you will destroy your Markup AutoBuyer!', 'Oops!')
    data.sing.level = single ? data.sing.level + 1 : parseInt(DOM(`singSlider`).value)

    if(data.sing.level > data.sing.highestLevel) data.sing.highestLevel = data.sing.level

    updateSingLevelHTML()
}

function singControl(i){
    if(i === 0) data.sing.level = data.sing.highestLevel
    if(i === 1){
        data.sing.level = data.sing.level = maxSingLevel()
        if(data.sing.level > data.sing.highestLevel) data.sing.highestLevel = data.sing.level
    }
    if(i === 2) data.sing.level = 0
    if(i === 3) changeSingLevel(true)
    updateSingLevelHTML()
    DOM(`singSlider`).value = data.sing.level
}