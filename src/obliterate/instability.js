let unstableFactorData = [
    {
        desc: "Boosts Incrementy gain",
        sign: "x",
        baseEff: () => 1,
        eff: () => ((getUnstableFactorLevel(0)+1)**10)**1 // Oh no
    },
    {
        desc: "Increases the Decrementy gain exponent",
        sign: "+",
        baseEff: () => 0,
        eff: () => 0.5*getUnstableFactorLevel(1)
    },
    {
        desc: "Boosts Cardinal gain",
        sign: "x",
        baseEff: () => 1,
        eff: () => 5**getUnstableFactorLevel(2)
    },
]
let instabilityConstantData = [
    {
        desc: "Reducing the Base in the Forgotten Realm by",
        sign: "-",
        baseEff: () => 0,
        eff: () => Math.min(10, getInstabilityConstant()),
        unl: () => true
    },
    {
        desc: "Increasing the OP gain exponent by",
        sign: "+",
        baseEff: () => 0,
        eff: () => getInstabilityConstant()/10,
        unl: () => getEUPEffect(4, 0)
    },
    {
        desc: "Boosting AutoBuyer speed by",
        sign: "x",
        baseEff: () => 1,
        eff: () => (1+getInstabilityConstant())**6,
        unl: () => getEUPEffect(4, 0)
    },
]

function makeInstabilityConstantText(){
    let text = ''
    for (let i = 0; i < instabilityConstantData.length; i++) {
        if(instabilityConstantData[i].unl()) text += `<br>${instabilityConstantData[i].desc} <span style="color: #bb84ff">${instabilityConstantData[i].sign !== 'x' ? instabilityConstantData[i].sign : ''}${format(getInstabilityConstantEffect(i))}${instabilityConstantData[i].sign === 'x' ? instabilityConstantData[i].sign : ''}</span>`
    }
    return text
}

function updateInstabilityText(){
    DOM(`instabilityText`).innerHTML = `<span style="color: #8569ff">There is ${format(data.obliterate.instability)} Instability</span>`
    DOM(`instabilityConstantText`).innerHTML = `Your <span style="color: #bb84ff">Instability Constant</span> of <span style="color: #bb84ff">${format(getInstabilityConstant())}</span> is${makeInstabilityConstantText()}`
}

function initUnstableFactors(){
    for (let i = 0; i < data.obliterate.unstableFactors.length; i++) {
        let factor = document.createElement('button')
        factor.className = 'unstableFactor'
        factor.id = `uf${i}`
        factor.addEventListener('click', () => buyUnstableFactor(i))
        DOM(`unstableFactorContainer`).append(factor)
        updateUnstableFactorHTML(i)
    }
}

function updateUnstableFactorHTML(i){
    DOM(`uf${i}`).innerHTML = `<span style="color: #ac69ff">Unstable</span> Factor ${i+1} [${data.obliterate.unstableFactors[i]}]<br>${unstableFactorData[i].desc}<br>Currently: <span style="color: #ac69ff">${unstableFactorData[i].sign !== 'x' ? unstableFactorData[i].sign : ''}${format(getUnstableFactorEffect(i))}${unstableFactorData[i].sign === 'x' ? unstableFactorData[i].sign : ''}</span>`
}
function updateAllUnstableFactorHTML(){
    for (let i = 0; i < data.obliterate.unstableFactors.length; i++) {
        updateUnstableFactorHTML(i)
    }
}

function buyUnstableFactor(i){
    if(data.obliterate.instability === 0) return

    --data.obliterate.instability
    ++data.obliterate.unstableFactors[i]

    updateInstabilityText()
    updateUnstableFactorHTML(i)
}

function respecUnstableFactors(){
    data.obliterate.instability = getInstabilityConstant() + data.obliterate.instability
    for (let i = 0; i < data.obliterate.unstableFactors.length; i++) {
        data.obliterate.unstableFactors[i] = 0
    }
    updateInstabilityText()
    updateAllUnstableFactorHTML()

    collapseReset()
}

let getUnstableFactorLevel = (i) => data.obliterate.unstableFactors[i]
let getUnstableFactorEffect = (i) => getUnstableFactorLevel(i) > 0 && isUnstableFactorEnabled(i) ? unstableFactorData[i].eff() : unstableFactorData[i].baseEff()
let isUnstableFactorEnabled = (i) => data.obliterate.unstableFactorState[i]
function getInstabilityConstant() {
    let total = 0
    for (let i = 0; i < data.obliterate.unstableFactors.length; i++) {
        total += data.obliterate.unstableFactors[i]
    }
    return total
}
let getInstabilityConstantEffect = (i) => getInstabilityConstant() > 0 && instabilityConstantData[i].unl() ? instabilityConstantData[i].eff() : instabilityConstantData[i].baseEff()