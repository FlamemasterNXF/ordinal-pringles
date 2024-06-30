let singularityNames = ["Singularity", "Ringularity"]
function updateAllSingularityHTML(){
    for (let i = 0; i < data.sing.level.length; i++) {
        updateSingularityHTML(i)
    }
}
function updateSingularityHTML(n){
    DOM(`singCostText`).innerHTML = `You have <span style="color: goldenrod">${data.incrementy.charge} Charge</span>`
    for (let i = 0; i < data.sing.hasEverHadFunction.length; i++) {
        if(hasSingFunction(i) && !hasPermanentFunction(i)) DOM(`singFunction${i}`).style.color = '#00ce0a'
        if(hasPermanentFunction(i)) DOM(`singFunction${i}`).style.color = '#00ceb6'
        if(!hasSingFunction(i)) DOM(`singFunction${i}`).style.color = 'darkgray'
        if(data.sing.hasEverHadFunction[i] && singFunctions[i].hasEffect){
            hasPermanentFunction(i) ? DOM(`singFunction${i}`).innerHTML = `<span style="color: #0bce8a">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, 3, false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
                : DOM(`singFunction${i}`).innerHTML = `<span style="color: #80ce0b">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
        }
    }
    checkPermanentFunction(6)
    updateSingFunctionHTML(7)
    updateSingFunctionHTML(8)
    updateAllSingLevelHTML()
}
function updateAllSingLevelHTML(){
    for (let i = 0; i < data.sing.level.length; i++) {
        updateSingLevelHTML(i)
    }
}
function updateSingLevelHTML(n){
    DOM(`sing${n}Level`).innerHTML = `Your ${singularityNames[n]} has a density of <b>${data.sing.level[n] >= 0 ? ordinalDisplay('H', data.sing.level[n], 0, 10, ordinalDisplayTrim(3), false) : `H<sub>0</sub>`}</b> (10)`
    DOM(`sing${n}Level2`).innerHTML = `Your ${singularityNames[n]}'s highest ever density was <b>${data.sing.highestLevel[n] > 0 ? ordinalDisplay('H', data.sing.highestLevel[n], 0, 10, ordinalDisplayTrim(3), false) : `H<sub>0</sub>`}</b> (10)`

    for (let i = 0; i < 3; i++) {
        let index = (n*3)+i
        DOM(`sing${n}Effect${i}`).innerHTML = `Your ${singularityNames[n]} is ${singEffects[index].desc()} <b>${format(singEffects[index].effect(), 3)}</b>`
    }
}
function updateSingFunctionHTML(i){
    if(i >= data.sing.hasEverHadFunction.length) return
    if(data.sing.hasEverHadFunction[i]){
        DOM(`singFunction${i}`).innerHTML =
            `<span style="color: #80ce0b">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
        if((i+1 < data.sing.hasEverHadFunction.length) && !data.sing.hasEverHadFunction[i+1] && !i+1 >= getTotalSingDensity())
            DOM(`singFunction${i+1}`).innerHTML = `<span style="color: #80ce0b">Total Singularity Density ${ordinalDisplay('H', singFunctions[i+1].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ?????????????????????????`
    }
}
function checkPermanentFunction(i){
    if(hasPermanentFunction(i))
        DOM(`singFunction${i}`).innerHTML = `<span style="color: #0bce8a">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
}
function checkPermanentFunctions(){
    for (let i = 0; i < singFunctions.length; i++) {
        if(singFunctions[i].canBePerm) checkPermanentFunction(i)
    }
}

function loadSingularityHTML(){
    updateAllSingLevelHTML()
    for (let i = 0; i < data.sing.level.length; i++) {
        DOM(`singSlider${i}`).max = Math.max(1, maxSingLevel(i))
        DOM(`singSlider${i}`).value = data.sing.level[i]
    }
}

function initSingularityFunctions(){
    for (let i = 0; i < singFunctions.length; i++) {
        if(!data.sing.hasEverHadFunction[i+1] && data.sing.hasEverHadFunction[i]) lastSingFunctionUnlockedIndex = i
        let el = document.createElement('t')
        el.className = `singFunction`
        el.id = `singFunction${i}`

        el.innerHTML = hasPermanentFunction(i) ?
            `<span style="color: #0bce9a">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
            : data.sing.hasEverHadFunction[i]
            ? `<span style="color: #80ce0b">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ${singFunctions[i].hasUnlock ? `${singFunctions[i].unlockDescription} ${singFunctions[i].hasEffect ? 'and' : ''}` : ''} ${singFunctions[i].hasEffect ? `${singFunctions[i].effectDescription} ${format(singFunctions[i].effect())}` : ``}`
            : data.sing.hasEverHadFunction[i-1] || i===0 ? `<span style="color: #80ce0b">Total Singularity Density ${ordinalDisplay('H', singFunctions[i].requiredLevel, 0, 10, ordinalDisplayTrim(3), false)}:</span> ?????????????????????????` : `?????????????????????????`
        DOM(`singFunctionContainer`).append(el)
    }
}

let lastSingFunctionUnlockedIndex = 0
let singEffects = [
    {desc: () => "raising Cardinal gain to the", effect: () => (1 + (Math.sqrt(data.sing.level[0])/100)+(getEUPEffect(1, 3, true)))*alephEffect(8)},
    {desc: () => `${hasTreeUpgrade(102) ? 'Increasing' : 'Decreasing'} the Decrementy gain exponent by`, effect: () => Math.sqrt(data.sing.level[0])/50},
    {desc: () => "raising AutoBuyer speed to the", effect: () => (1-Math.pow(data.sing.level[0], 1/2)/100)+(getEUPEffect(1, 4, true))},

    {desc: () => "among", effect: () => 1},
    {desc: () => `us`, effect: () => 1},
    {desc: () => "is a randomtuba", effect: () => 1},
]
let maxSingLevel = (i) => data.sing.level[i] > 299 ? 300 : Math.min(300, data.incrementy.charge+data.sing.level[i])

function changeSingLevel(i, single = false){
    if(inPurification(3)) return
    DOM(`singSlider${i}`).max = Math.max(1, maxSingLevel(i))

    const change = single ? data.sing.level[i] + 1 : parseInt(DOM(`singSlider${i}`).value)
    const cost = change-data.sing.level[i]
    if(single && data.incrementy.charge === 0) return createAlert('Failure', 'Insufficient Charge!', 'Oops')
    if(!single && data.incrementy.charge - cost < 0) return createAlert('Failure', 'Insufficient Charge!', 'Oops')

    if(single) --data.incrementy.charge
    if(!single && data.sing.level[i] > change) data.incrementy.charge += data.sing.level[i]-change
    if(!single && data.sing.level[i] < change) data.incrementy.charge -= cost
    data.sing.level[i] = change

    updateSingFunctionUnlocks()

    if(data.sing.level > data.sing.highestLevel[i]) data.sing.highestLevel[i] = data.sing.level[i]

    updateSingLevelHTML(i)
}

function updateSingFunctionUnlocks(){
    if(getTotalSingDensity() > singFunctions[lastSingFunctionUnlockedIndex].requiredLevel || lastSingFunctionUnlockedIndex === 0){
        for (let i = lastSingFunctionUnlockedIndex; i < singFunctions.length; i++) {
            if(getTotalSingDensity() >= singFunctions[i].requiredLevel){
                data.sing.hasEverHadFunction[i] = true
                updateSingFunctionHTML(i)
            }
        }
    }
}

/*
    i is the option, n is the Singularity
*/
function singControl(i, n){
    if(inPurification(3)) return
    if(i === 0){
        data.sing.level[n] = data.sing.level[n]+maxSingLevel(n)
        data.incrementy.charge -= maxSingLevel(n)
        if(data.sing.level[n] > data.sing.highestLevel[n]) data.sing.highestLevel[n] = data.sing.level[n]
        updateSingFunctionUnlocks()
    }
    if(i === 1){
        data.incrementy.charge += data.sing.level[n]
        data.sing.level[n] = 0
    }
    if(i === 2) changeSingLevel(n, true)
    updateSingLevelHTML(n)
    DOM(`singSlider${n}`).value = data.sing.level[n]
}

let singFunctions = [
    {requiredLevel: 1, hasUnlock: true, unlockDescription: 'Gain two free Boosters on Collapse and unlock a Booster Upgrade AutoBuyer', canBePerm: true, permReq: () => hasAOMilestone(0)},
    {requiredLevel: 10, hasUnlock: true, unlockDescription: 'The 7th Cardinal Upgrade now affects the Total ℵ Effect. Drains are now kept on Collapse.', canBePerm: true, permReq: () => hasAOMilestone(0)},
    {requiredLevel: 20, hasUnlock: false, unlockDescription: null, hasEffect: true, effectDescription: 'Negative Charge multiplies ℵ<sub>5</sub> by', effect: () => Math.max(1, Math.log10(data.darkness.negativeCharge)), canBePerm: true, permReq: () => hasAOMilestone(0)},
    {requiredLevel: 35, hasUnlock: true, unlockDescription: 'Unlock an AutoBuyer for Supercharge', hasEffect: true, effectDescription: 'Total Boosters over 12246 multiply the second Overcharge Effect by', effect: () => Math.max(1, Math.log10(Math.max(1, data.boost.total-12246))/2), canBePerm: false, permReq: () => false},
    {requiredLevel: 50, hasUnlock: true, unlockDescription: 'Double the effect of IUP4', hasEffect: true, effectDescription: 'RUP2 multiplies Dynamic Cap (at an extremely reduced rate) by', effect: () => Math.min(Math.max(1, Decimal.log10(iup2Effect()).toNumber()), Number.MAX_VALUE), canBePerm: false, permReq: () => false},
    {requiredLevel: 65, hasUnlock: false, unlockDescription: null, hasEffect: true, effectDescription: 'Negative Charge multiplies the Total ℵ effect by', effect: () => Math.max(1, Math.log2(data.darkness.negativeCharge)), canBePerm: false, permReq: () => false},
    {requiredLevel: 72, hasUnlock: true, unlockDescription: 'Unlock Purification', canBePerm: true, permReq: () => data.incrementy.totalCharge > 71},
    {requiredLevel: 80, hasUnlock: true, unlockDescription: 'The second Darkness Buyable now Quadruples the Dynamic Cap', canBePerm: false, permReq: () => false},
    {requiredLevel: 100, hasUnlock: true, unlockDescription: 'Reduce the Base in the Forgotten Realm by 15 for every ℶ<sub>&omega;</sub> Milestone obtained', hasEffect: true, effect: () => 15*checkAllIndexes(aomArray(), true), canBePerm: false, permReq: () => false},
    {requiredLevel: 300, hasUnlock: true, unlockDescription: 'Unlock a Ringularity, but cap the Singularity\'s Density at H<sub>&omega;<sup>2</sup>3</sub>', canBePerm: true, permReq: () => data.incrementy.totalCharge > 299},
]

let hasPermanentFunction = (i) => singFunctions[i].permReq()
let hasSingFunction = (i) => getTotalSingDensity() >= singFunctions[i].requiredLevel || hasPermanentFunction(i)
let getSingFunctionEffect = (i) => hasSingFunction(i) ? singFunctions[i].effect() : 1

function getTotalSingDensity(){
    let total = 0
    for (let i = 0; i < data.sing.level.length; i++) {
        total += data.sing.level[i]
    }
    return total
}
