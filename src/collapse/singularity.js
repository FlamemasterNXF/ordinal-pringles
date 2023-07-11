function updateSingularityHTML(){
    DOM(`singCostText`).innerHTML = `You have <span style="color: goldenrod">${data.incrementy.charge} Charge</span>`
}
function updateSingLevelHTML(){
    DOM(`singLevel`).innerHTML = `Your Singularity has a density of <b>${data.sing.level > 0 ? ordinalDisplay('H', data.sing.level, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singLevel2`).innerHTML = `Your Singularity's highest ever density was <b>${data.sing.highestLevel > 0 ? ordinalDisplay('H', data.sing.highestLevel, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singEffect`).innerHTML = `Your Singularity is raising Cardinal Gain to the <b>${format(mainSingEffect(), 3)}</b>`
}
function updateSingFunctionHTML(i){
    if(data.sing.hasEverHadFunction[i]){
        DOM(`singFunction${i}`).innerHTML =
            `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${singFunctions[i].effect()}` : ``}`
        if(data.sing.hasEverHadFunction.length < i+1)
            DOM(`singFunction${i+1}`).innerHTML = `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ?????????????????????????`
    }
}

function loadSingularityHTML(){
    updateSingLevelHTML()
    DOM(`singSlider`).max = Math.max(1, maxSingLevel())
    DOM(`singSlider`).value = data.sing.level
}

function initSingularityFunctions(){
    for (let i = 0; i < singFunctions.length; i++) {
        if(!data.sing.hasEverHadFunction[i+1] && data.sing.hasEverHadFunction[i]) lastSingFunctionUnlockedIndex = i
        let el = document.createElement('t')
        el.className = `singFunction`
        el.id = `singFunction${i}`
        el.innerHTML = data.sing.hasEverHadFunction[i]
            ? `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${singFunctions[i].effect()}` : ``}`
            : data.sing.hasEverHadFunction[i-1] || i===0 ? `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ?????????????????????????` : `?????????????????????????`
        DOM(`singFunctionContainer`).append(el)
    }
}

let lastSingFunctionUnlockedIndex = 0
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

    if(data.sing.level > singFunctions[lastSingFunctionUnlockedIndex].requiredLevel || lastSingFunctionUnlockedIndex === 0){
        for (let i = lastSingFunctionUnlockedIndex; i < singFunctions.length; i++) {
            if(data.sing.level >= singFunctions[i].requiredLevel){
                data.sing.hasEverHadFunction[i] = true
                updateSingFunctionHTML(i)
            }
        }
    }

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

class SingularityFunction {
    constructor(requiredLevel, hasUnlock, unlockDescription = null, hasEffect = false, effectDescription = null, effect=null) {
        this.requiredLevel = requiredLevel
        this.hasUnlock = hasUnlock
        this.hasEffect = hasEffect
        this.unlockDescription = unlockDescription
        this.effectDescription = effectDescription
        this.effect = () => effect
    }
}

let hasSingFunction = (i) => data.sing.level >= singFunctions[i].requiredLevel
const singFunctions = [
    new SingularityFunction(10, true, 'The 7th Cardinal Upgrade now affects the Total ℵ Effect. Drains are now kept on Collapse.'),
    new SingularityFunction(12, true, 'Gain two free Boosters on Collapse and unlock a Booster Upgrade AutoBuyer'),
    new SingularityFunction(15, true, 'Keep Hierarchy Upgrades on Collapse', true, 'Negative Charge multiplies ℵ<sub>5</sub> by', 1),
    new SingularityFunction(20, true, 'Unlock an AutoBuyer for Supercharge', true, 'Total Boosters over 12246 multiply the second Overcharge Effect by', 1),
    new SingularityFunction(25, true, 'If you have the third Cardinal Upgrade double the effect of IUP4', true, 'RUP2 multiplies Dynamic Cap (at an extremely reduced rate) by', 1),
    new SingularityFunction(40, false, null, true, 'Negative Charge multiplies the Total ℵ effect by', 1),
    new SingularityFunction(50, true, 'The second Darkness Buyable now Quadruples the Dynamic Cap'),
]