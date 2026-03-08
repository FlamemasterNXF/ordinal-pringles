/*
    [
        desc: string
        sign: string

        cost: Number
        effect: Decimal()
        baseEffect?: Number (defaults to 1)
        target?: string

        isUnlock?: True

        extraReq?: Boolean()
        extraReqDesc?: string
    ]
*/
const energyUpgradeData = [
    [
        {
            desc: 'Total Fractal Energy boosts AutoBuyers and you always have three free ℵ<sub>1</sub>-ℵ<sub>8</sub>',
            sign: 'x',
            cost: 0,
            effect: () => D(10).pow(Math.min(data.obliterate.times, 5)).times(D(2).pow(Math.max(0, data.obliterate.times-5))),
            target: 'All AutoBuyers'
        }
    ],
    [
        {
            desc: 'Total Fractal Energy increases the Decrementy gain exponent',
            sign: '+',
            cost: 1,
            effect: () => data.obliterate.times > 1 ? D(1.5).times(Math.log2(data.obliterate.times)) : D(1),
            baseEffect: 0,
            target: 'Decrementy Exponent'
        },
        {
            desc: 'Total Fractal Energy provides free levels of the first ℵ<sub>0</sub> Rebuyable',
            sign: '+',
            cost: 1,
            effect: () => Math.floor(Math.sqrt(data.obliterate.times)),
            target: 'ℵ0 Rebuyable 1'
        },
        {
            desc: 'Total Fractal Energy is now a Realm Enhancement',
            sign: 'x',
            cost: 1,
            effect: () => D(1),
            isUnlock: true,
        },
        {
            desc: 'Total Fractal Energy provides free levels of the second-row Darkness Upgrades',
            sign: '+',
            cost: 1,
            effect: () => Math.floor(Math.log2(data.obliterate.times)),
            baseEffect: 0,
            target: ['Depth Upgrade 1', 'Depth Upgrade 2']
        },
        {
            desc: 'If you have a Row Five Hypercharge, each Stable Hypercharge provides two free Drains',
            sign: '+',
            cost: 2,
            effect: () => hasPassiveHypercharge(4) ? getStableHypercharges()*2 : 0,
            baseEffect: 0,
        },
        {
            desc: 'The Stable Hypercharge Effect applies to Cardinal Gain',
            sign: '^',
            cost: 2,
            effect: () => getStableHyperchargeEffect(),
            target: 'Cardinals',

            specialNodeReq: 105
        },
        {
            desc: 'The Stable Hypercharge Effect applies to AutoClicker speed',
            sign: '^',
            cost: 2,
            effect: () => getStableHyperchargeEffect(),
            baseEffect: 0,
            target: 'All AutoClickers',

            specialNodeReq: 105
        },
    ],
    [
        {
            desc: 'Total Fractal Energy boosts the first ℵ<sub>ω</sub> effect',
            sign: 'x',
            cost: 1,
            effect: () => D(data.obliterate.times+1),
            target: 'ℵω Effect 1'
        },
        {
            desc: 'Total Fractal Energy boosts the ℵ<sub>ω</sub> cap',
            sign: 'x',
            cost: 1,
            effect: () => D(1).plus(data.obliterate.times/4),
            target: 'ℵω Cap'
        },
        {
            desc: 'Total Fractal Energy boosts the second ℵ<sub>ω</sub> Effect',
            sign: 'x',
            cost: 1,
            effect: () => D(1).plus(data.obliterate.times/4),
            target: 'ℵω Effect 2'
        },
        {
            desc: "While nothing is being Purified, ℵ<sub>ω</sub> Upgrades three to five provide a combined boost to AutoBuyers",
            sign: 'x',
            cost: 1,
            effect: () => D(getAOREffect(2)).plus(getAOREffect(3)).plus(getAOREffect(4)),
            target: 'All AutoBuyers'
        },
        {
            desc: 'While the Obscure are being Purified, Total Fractal Energy boost the FGH Successor',
            sign: 'x',
            cost: 1,
            effect: () => D(data.obliterate.times).times(3),
            target: 'Hierarchy Gain'
        },
        {
            desc: 'While the Infinite are being Purified, Total Fractal Energy divides Dynamic Factor Gain',
            sign: '/',
            cost: 1,
            effect: () => D(data.obliterate.times/2).plus(1),
            target: 'Dynamic Gain'
        },
        {
            desc: 'While the Eternal are being Purified, total Fractal Energy provides free levels of the fourth ℵ<sub>ω</sub> Rebuyable',
            sign: '+',
            cost: 2,
            effect: () => Decimal.floor(data.obliterate.times/2).plus(1),
            baseEffect: 0,
            target: 'ℵω Rebuyable 4'
        },
        {
            desc: 'While the Inferior are being Purified, total Fractal Energy greatly boosts the fifth ℵ<sub>ω</sub> Rebuyable',
            sign: 'x',
            cost: 2,
            effect: () => D(data.obliterate.times),
            target: 'ℵω Rebuyable 5'
        },
        {
            desc: 'Cardinals provide free ℶ<sub>ω</sub>',
            sign: '+',
            cost: 3,
            effect: () => Decimal.log10(data.collapse.cardinals.plus(1)),
            baseEffect: 0,
            target: 'ℶω'
        },
    ],
    [
        {
            desc: `Total Fractal Energy boosts the <span style="color: ${getCSSVariable('pringle-2-color')}">Perfected Green</span> Pringle`,
            sign: 'x',
            cost: 1,
            effect: () => D(data.obliterate.times+1),
            target: 'Pringle 2'
        },
        {
            desc: `Total Fractal Energy boosts the <span style="color: ${getCSSVariable('pringle-7-color')}">Crunchy Blue</span> Pringle`,
            sign: 'x',
            cost: 1,
            effect: () => D(1.3).pow(data.obliterate.times),
            target: 'Pringle 7'
        },
        {
            desc: `Total Fractal Energy boosts the <span style='color: ${getCSSVariable('pringle-5-color')}'>Perfected Orange</span> Pringle`,
            sign: 'x',
            cost: 1,
            effect: () => D(data.obliterate.times/10).plus(1),
            target: 'Pringle 5'
        },
        {
            desc: `Total Fractal Energy boosts the <span style='color: ${getCSSVariable('pringle-9-color')}'>Barbecue</span> Pringle`,
            sign: 'x',
            cost: 1,
            effect: () => D(2).pow(data.obliterate.times),
            target: 'Pringle 9'
        },
        {
            desc: "Factor Boosts no longer reset ANYTHING and [COMING SOON]",
            sign: 'x',
            cost: 5,
            effect: () => D(1),
            isUnlock: true,
        },
    ],
    [
        {
            desc: "Uncap Ordinal Power gain, but it is not affected by any of its boosts past 4e256",
            sign: 'x',
            cost: 1,
            effect: () => D(1),
            isUnlock: true,
        },
    ]
]

function eupHasExtraReq(i, j) {
    const eup = energyUpgradeData[i][j]
    return eup.extraReq !== undefined
}

function isEUPExtraReqSatisfied(i, j){
    if(!eupHasExtraReq(i, j)) return true
    const eup = energyUpgradeData[i][j]
    return eup.extraReq()
}

function getEUPNodeRequirement(nodeID, dataIDs) {
    const eup = energyUpgradeData[dataIDs[0]][dataIDs[1]]
    if(dataIDs[1] === 0) return 0
    if(eup.specialNodeReq === undefined) return nodeID-1
    return eup.specialNodeReq
}

function getEUPIDString(i, j){
    if(i === 0) return 0

    const fixedFollower = j + 1
    const digits = Math.floor(Math.log10(fixedFollower))+1
    const middle = digits === 1 ? '0' : ''

    if(digits > 2) return console.error(`Bad EUP Access: i of ${i} and j of ${j}`)

    return `${i}${middle}${fixedFollower}`
}

function getEUPID(i, j){
    const id = getEUPIDString(i, j)
    return Number(id)
}

function isEUPUnlock(i, j){
    if(energyUpgradeData[i][j].isUnlock === undefined) return false
    return energyUpgradeData[i][j].isUnlock
}

function getEUPBaseEffect(i, j){
    if(energyUpgradeData[i][j].baseEffect === undefined) return 1
    return energyUpgradeData[i][j].baseEffect
}

function getEUPEffect (i, j, noDecimal = false) {
    if(noDecimal) return getEUPEffect(i, j).toNumber()

    const treeID = getEUPID(i, j)
    const baseEffect = getEUPBaseEffect(i, j)

    if(isEUPUnlock(i, j)) return hasTreeUpgrade(treeID)

    if(hasTreeUpgrade(treeID)) return Decimal.max(baseEffect, energyUpgradeData[i][j].effect())
    return D(baseEffect)
}

function updateEUPDescriptionHTML(id){
    const identifiers = getDataIDFromTreeID(id)
    const node = energyUpgradeData[identifiers[0]][identifiers[1]]
    DOM(`energyTreeText`).innerHTML = `<span style="color: ${getCSSVariable('energy-tree-node-id-text-color')}">Upgrade ${id}:</span> <span style="color: ${getCSSVariable('energy-tree-node-description-text-color')}">${node.desc}</span><br>${hasTreeUpgrade(id) ? isEUPUnlock(identifiers[0], identifiers[1]) ? `<span style="color: ${getCSSVariable('energy-tree-node-effect-text-color')}"> Unlocked!` : `<span style="color: ${getCSSVariable('energy-tree-node-effect-text-color')}"> Currently: ${formatEffect(getEUPEffect(identifiers[0], identifiers[1]), node.sign)}` : canPurchaseTreeUpgrade(id, identifiers) ? `<span style="color: ${getCSSVariable('energy-tree-node-activation-text-color')}">Can be Activated for</span> <span style="color: ${getCSSVariable('energy-tree-node-cost-text-color')}">${node.cost} Fractal Energy</span>` : `<span style="color: ${getCSSVariable('energy-tree-node-prereq-text-color')}">You must first Activate Upgrade ${getEUPNodeRequirement(id, identifiers)}${eupHasExtraReq(identifiers[0], identifiers[1]) ? node.extraReqDesc : ''}</span>`}`
}

function purchaseEUP(id, node){
    data.obliterate.energy -= node.cost
    data.obliterate.energyUpgrades.push(id)
    //if(data.obliterate.passiveEnergy + getTotalPassiveEnergyInvested() < getTotalFractalEnergyInvested(true)) data.obliterate.passiveEnergy += node.cost
    setNodeColor(id)
}

function registerEUPs(){
    for (let i = 0; i < energyUpgradeData.length; i++) {
        for (let j = 0; j < energyUpgradeData[i].length; j++) {
            if(energyUpgradeData[i][j].target !== undefined){
                const index = getTreeIDFromDataID(i, j)
                boostManager.register({
                    name: `EUP${index}`,
                    target: energyUpgradeData[i][j].target,
                    sign: energyUpgradeData[i][j].sign,
                    color: graphColors.energyTree,
                    effect: () => getEUPEffect(i, j),
                    shouldDisplay: () => hasTreeUpgrade(index),
                })
            }
        }
    }
}
