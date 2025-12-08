/*
    This code ALSO needs a refactor!
    I hate this
    -Flame, 11/24/23
*/

const overflowData = [
    {
        name: 'Booster Power',
        sourceName: 'Excess Boosters',
        source: () => Math.max(0, data.boost.total-boostersAtGivenFB(29)),
        gain: () => (Math.sqrt(getOverflowSource(0))/10)*(getAlephEffect(6).toNumber())*purificationEffect(2),
        total: () => data.overflow.bp,
        effects: [
            {
                desc: 'Multiplying the Challenge Boost to AutoBuyers',
                effect: () => Math.pow(data.overflow.bp, 1/8),
                target: 'All Challenges'
            },
            {
                desc: 'Multiplying Passive OP gain',
                effect: () => Math.sqrt(data.overflow.bp)*(opMult().toNumber()),
                target: 'Free OP',
                descriptor: ' (based on your total OP multiplier)'
            },
            {
                desc: 'Multiplying Decrementy Gain',
                effect: () => Math.sqrt(data.overflow.bp+1),
                target: 'Decrementy Gain',
            }
        ]
    },
    {
        name: 'Overcharge',
        sourceName: 'Excess Charge',
        source: () => Math.max(0, data.incrementy.totalCharge-12),
        gain: () => (Math.pow(getOverflowSource(1), 0.5 + getHyperchargeEffect(9))/10)*purificationEffect(2),
        total: () => data.overflow.oc,
        effects: [
            {
                desc: 'Multiplying Hierarchy Successor speed',
                effect: () => Math.max(1, Math.sqrt(data.overflow.oc)*getCUPEffect(5)*getAOMEffect(2)),
                target: 'Hierarchy Gain'
            },
            {
                desc: 'Multiplying all Booster Power effects',
                effect: () => Math.max(1, Math.log10(data.overflow.oc+1)),
                target: ['Booster Power Effect 1', 'Booster Power Effect 2', 'Booster Power Effect 3']
            },
            {
                desc: 'Dividing Darkness Upgrade costs',
                effect: () => Math.max(1, 1+Math.pow(data.overflow.oc, 1/16)/10),
                target: 'Darkness Upgrade Costs',
                unlocked: () => hasCUP(5),
                sign: '/'
            },
            {
                desc: 'Multiplying the effect of the third bottom-row Booster Upgrade',
                effect: () => Math.max(1, Math.pow(data.overflow.oc, 1/4)),
                target: () => data.boost.isCharged[14] ? 'Charged BUP3x5' : 'BUP3x5',
                unlocked: () => hasAOMilestone(2)
            }
        ]
    }
]

function getOverflowEffect(i){
    if(data.overflow.bp === 1 && i < 3 && data.overflow.oc === 1) return 1
    switch (i) {
        case 0:
            return Math.max(1, (Math.pow(data.overflow.bp, 1/8))*getOverflowEffect(4))
        case 1:
            return Math.max(1, (Math.sqrt(data.overflow.bp)*(opMult().toNumber()))*getOverflowEffect(4))
        case 2:
            return Math.max(1, (Math.sqrt(data.overflow.bp+1))*getOverflowEffect(4))
        case 3:
            return data.overflow.oc > 1 ? Math.max(1, Math.sqrt(data.overflow.oc)*getCUPEffect(5)*getAOMEffect(2)) : 1
        case 4:
            return data.overflow.oc > 1 ? Math.max(1, Math.log10(data.overflow.oc+1)) : 1
        case 5:
            return data.overflow.oc > 1 && hasCUP(5) ? Math.max(1, 1+Math.pow(data.overflow.oc, 1/16)/10) : 1
        case 6:
            return data.overflow.oc > 1 && hasAOMilestone(2) ? Math.max(1, Math.pow(data.overflow.oc, 1/4)) : 1
        default: return NaN
    }
}

let getOverflowName = (i) => overflowData[i].name
let getOverflowSourceName = (i) => overflowData[i].sourceName
let getOverflowSource = (i) => overflowData[i].source()
let getOverflowGain = (i) => overflowData[i].gain()
let getOverflowTotal = (i) => overflowData[i].total()

const getOverflowEffectSign = (i, j) => overflowData[i].effects[j].sign ?? 'x'

function isOverflowEffectUnlocked(i, j) {
    const effect = overflowData[i].effects[j]
    return effect.unlocked !== undefined ? effect.unlocked() : true
}
function getOverflowEffectNew(i, j){
    return isOverflowEffectUnlocked(i, j) ? overflowData[i].effects[j].effect() : 1
}

function initOverflowHTML(){
    const gainContainer = DOM(`overflowGainContainer`)
    const effectContainer = DOM(`overflowEffectContainer`)
    for (let i = 0; i < overflowData.length; i++) {
        let targets = []

        let gainText = document.createElement('span')
        gainText.className = 'centeredTexts'
        gainText.id = `overflow${i}Gain`
        gainContainer.appendChild(gainText)

        let effectsContainer = document.createElement('div')
        effectsContainer.className = 'column flexBox'

        let totalText =  document.createElement('b')
        totalText.className = 'centeredTexts'
        totalText.id = `overflow${i}Total`
        totalText.style.color = getCSSVariable(`${normalToDashed(getOverflowName(i))}-total-text-color`)

        effectsContainer.appendChild(totalText)
        for (let j = 0; j < overflowData[i].effects.length; j++) {
            let effectText = document.createElement('span')
            effectText.className = 'centeredTexts'
            effectText.id = `overflow${i}effect${j}`
            effectText.style.marginBottom = '0.25rem'
            effectsContainer.appendChild(effectText)

            const effect = overflowData[i].effects[j]
            const effectName = `${getOverflowName(i)} Effect ${j+1}`
            targets.push(effectName)
            boostManager.register({
                name: effectName,
                target: i === 1 && j === 3 ? effect.target() : effect.target,
                sign: getOverflowEffectSign(i, j),
                color: graphColors.overflow,
                effect: () => getOverflowEffectNew(i, j),
                shouldDisplay: () => isOverflowEffectUnlocked(i, j)
            })
        }
        effectContainer.appendChild(effectsContainer)

        boostManager.register({
            name: getOverflowName(i),
            target: targets,
            color: graphColors.overflow,
            shouldDisplay: () => isTabUnlocked('overflow'),
        })
    }
}

function updateOverflowHTML(){
    for (let i = 0; i < overflowData.length; i++) {
        DOM(`overflow${i}Gain`).innerHTML = `You have ${format(getOverflowSource(i))} ${getOverflowSourceName(i)}, producing <b style="color: ${getCSSVariable(`${normalToDashed(getOverflowName(i))}-text-color`)}">${format(getOverflowGain(i))} ${getOverflowName(i)}/s</b>`
        DOM(`overflow${i}Total`).innerText = `Your ${format(getOverflowTotal(i))} ${getOverflowName(i)} is`
        for (let j = 0; j < overflowData[i].effects.length; j++) {
            const effect = overflowData[i].effects[j]
            if(effect.unlock !== undefined) DOM(`overflow${i}effect${j}`).style.display = isOverflowEffectUnlocked(i, j) ? 'block' : 'none'
            if(!isOverflowEffectUnlocked(i, j)) continue

            const descriptor = effect.descriptor ?? ''
            const sign = getOverflowEffectSign(i, j)
            DOM(`overflow${i}effect${j}`).innerHTML = `${effect.desc} by <b style="color: ${getCSSVariable(`${normalToDashed(getOverflowName(i))}-text-color`)}">${formatEffect(getOverflowEffectNew(i, j), sign)}</b>${descriptor}`
        }
    }
}

let maxNonOverflowBoosters = boostersAtGivenFB(29)
let getExtraBoosters = () => Math.max(0, data.boost.total-maxNonOverflowBoosters)
let getExtraCharge = () => Math.max(0, data.incrementy.totalCharge-12)

function getBoosterPowerGain(){
    return (Math.sqrt(getExtraBoosters())/10)*(getAlephEffect(6).toNumber())*purificationEffect(2)
}

function getOverchargeGain(){
    const exponent = 0.5 + getHyperchargeEffect(9)
    return (Math.pow(getExtraCharge(), exponent)/10)*purificationEffect(2)
}

boostManager.register({
    name: 'Darkness Upgrade Costs',
    target: ['DUP1', 'DUP2', 'DUP3'],
    color: graphColors.decrementy,
    shouldDisplay: () => isTabUnlocked('overflow')
})