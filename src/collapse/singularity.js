function updateSingularityHTML(){
    DOM(`singCostText`).innerHTML = `You have <span style="color: goldenrod">${data.incrementy.charge} Charge</span>`
    for (let i = 0; i < data.sing.hasEverHadFunction.length; i++) {
        if(hasSingFunction(i)) DOM(`singFunction${i}`).style.color = '#00ce0a'
        if(!hasSingFunction(i)) DOM(`singFunction${i}`).style.color = 'darkgray'
        if(data.sing.hasEverHadFunction[i] && singFunctions[i].hasEffect)
            DOM(`singFunction${i}`).innerHTML = `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
    }
}
function updateSingLevelHTML(){
    DOM(`singLevel`).innerHTML = `Your Singularity has a density of <b>${data.sing.level > 0 || inOC(2) ? ordinalDisplay('H', inOC(2) ? oc2Effects[0]() : data.sing.level, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`singLevel2`).innerHTML = `Your Singularity's highest ever density was <b>${data.sing.highestLevel > 0 ? ordinalDisplay('H', data.sing.highestLevel, 0, 10, 3, false) : `H<sub>0</sub>`}</b> (10)`

    for (let i = 0; i < singEffects.length; i++) {
        DOM(`singEffect${i}`).innerHTML = `Your Singularity is ${singEffects[i].desc} <b>${format(singEffects[i].effect(), 3)}</b>`
    }
}
function updateSingFunctionHTML(i){
    if(i >= data.sing.hasEverHadFunction.length) return
    if(data.sing.hasEverHadFunction[i]){
        DOM(`singFunction${i}`).innerHTML =
            `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
        if(!data.sing.hasEverHadFunction[i+1] && !i+1 >= data.sing.level)
            DOM(`singFunction${i+1}`).innerHTML = `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i+1].requiredLevel, 0, 10, 3, false)}:</span> ?????????????????????????`
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
            ? `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
            : data.sing.hasEverHadFunction[i-1] || i===0 ? `<span style="color: #80ce0b">Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ?????????????????????????` : `?????????????????????????`
        DOM(`singFunctionContainer`).append(el)
    }
}

let lastSingFunctionUnlockedIndex = 0
let singEffects = [
    {desc: "raising Cardinal gain to the", effect: () => (1 + Math.sqrt(data.sing.level)/100)*totalOCEffects[1].effect()},
    {desc: "reducing the Decrementy gain exponent by", effect: () => Math.sqrt(inOC(2) ? oc2Effects[0]() : data.sing.level)/50},
    {desc: "raising AutoBuyer speed to the", effect: () => 1-Math.pow(inOC(2) ? oc2Effects[0]() : data.sing.level, 1/2)/100},
]
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

let singFunctions = [
    {requiredLevel: 1, hasUnlock: true, unlockDescription: 'Gain two free Boosters on Collapse and unlock a Booster Upgrade AutoBuyer'},
    {requiredLevel: 10, hasUnlock: true, unlockDescription: 'The 7th Cardinal Upgrade now affects the Total ℵ Effect. Drains are now kept on Collapse.'},
    {requiredLevel: 20, hasUnlock: true, unlockDescription: 'Keep Hierarchy Upgrades on Collapse', hasEffect: true, effectDescription: 'Negative Charge multiplies ℵ<sub>5</sub> by', effect: () => Math.max(1, Math.log10(data.darkness.negativeCharge))},
    {requiredLevel: 35, hasUnlock: true, unlockDescription: 'Unlock an AutoBuyer for Supercharge', hasEffect: true, effectDescription: 'Total Boosters over 12246 multiply the second Overcharge Effect by', effect: () => Math.max(1, Math.log10(Math.max(1, data.boost.total-12246))/2)},
    {requiredLevel: 50, hasUnlock: true, unlockDescription: 'If you have the third Cardinal Upgrade double the effect of IUP4', hasEffect: true, effectDescription: 'RUP2 multiplies Dynamic Cap (at an extremely reduced rate) by', effect: () => data.collapse.hasCUP[2] ? Math.max(1, Math.log10(iup2Effect())) : 1},
    {requiredLevel: 65, hasUnlock: false, unlockDescription: null, hasEffect: true, effectDescription: 'Negative Charge multiplies the Total ℵ effect by', effect: () => Math.max(1, Math.log2(data.darkness.negativeCharge))},
    {requiredLevel: 80, hasUnlock: true, unlockDescription: 'The second Darkness Buyable now Quadruples the Dynamic Cap'},
]

let hasSingFunction = (i) => data.sing.level >= singFunctions[i].requiredLevel
let getSingFunctionEffect = (i) => hasSingFunction(i) ? singFunctions[i].effect() : 1