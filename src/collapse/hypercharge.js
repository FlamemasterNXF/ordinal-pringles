// Each group of three is a row
let hyperChargeUpgradeData = [
    {
        description: "Total Charge boosts Cardinal Gain",
        sign: 'x',
        effect: () => data.incrementy.totalCharge + 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "The 7th Cardinal Upgrade applies to the Total ℵ Effect",
        sign: 'x',
        effect: () => getCUPEffect(6),
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Negative Charge now boosts Incrementy Gain and no longer reduces its effect",
        sign: 'x',
        effect: () => negativeChargeEffect(false),
        baseEffect: () => 1,
        cost: 10,
    },

    {
        description: "Total Charge boosts IUP4",
        sign: '+',
        effect: () => Math.max(1, Math.floor(Math.sqrt(data.incrementy.totalCharge)/1.5)),
        baseEffect: () => 1,
        cost: 12,
    },
    {
        description: "Boosters boost Hierarchy Effects",
        sign: 'x',
        effect: () => data.boost.amt + 1,
        baseEffect: () => 1,
        cost: 12,
    },
    {
        description: "RUP2 now applies to Dynamic Cap, but at a reduced rate",
        sign: 'x',
        effect: () => Decimal.max(1, Decimal.sqrt(iupEffects[1]())),
        baseEffect: () => 1,
        cost: 12,
    },

    {
        description: "Total Charge provides free Anti-Darkness levels",
        sign: '+',
        effect: () => Math.floor(Math.log2(data.incrementy.totalCharge+1)),
        baseEffect: () => 0,
        cost: 12,
    },
    {
        description: "Cardinals reduce Drain costs",
        sign: '/',
        effect: () => Decimal.max(Decimal.log2(data.collapse.cardinals+1), 1),
        baseEffect: () => 1,
        cost: 12,
    },
    {
        description: "Negative Charge boosts the Total ℵ Effect",
        sign: 'x',
        effect: () => Math.max(1, Math.log2(data.darkness.negativeCharge+1)),
        baseEffect: () => 1,
        cost: 12,
    },

    {
        description: "Cardinals increase the Overcharge gain exponent",
        sign: '+',
        effect: () => Decimal.log10(1e100).div(150).toNumber(),
        baseEffect: () => 0,
        cost: 24,
    },
    {
        description: "Negative Charge boosts ℵ<sub>0</sub> gain",
        sign: 'x',
        effect: () => Math.max(1, Math.pow(data.darkness.negativeCharge, 1/6)),
        baseEffect: () => 1,
        cost: 24,
    },
    {
        description: "Deeper Darkness Depths boost the Decrementy gain exponent",
        sign: '+',
        effect: () => (data.darkness.depth+1)**2,
        baseEffect: () => 0,
        cost: 24,
    },

    {
        description: "Negative Charge boosts Hierarchy Effects",
        sign: 'x',
        effect: () => Math.max(1, Math.sqrt(data.darkness.negativeCharge)),
        baseEffect: () => 1,
        cost: 100,
    },
    {
        description: "Reduce the Base in the Forgotten Realm by 15 for every ℶ<sub>&omega;</sub> Milestone obtained",
        sign: '-',
        effect: () => 15*checkAllIndexes(aomArray(), true),
        baseEffect: () => 0,
        cost: 100,
    },
    {
        description: "ℵ<sub>&omega;</sub> enhances the Pringle Purity of each Point",
        sign: 'x',
        effect: () => Math.sqrt(Math.max(1, Math.log10(data.omega.alephOmega))),
        baseEffect: () => 1,
        cost: 100,
    },
]

let hyperChargeQOLData = [
    {
        description: "Gain two free Boosters on Collapse and unlock a BUP AutoBuyer",
    },
    {
        description: "Keep Drains on Collapse and Automatically Max Hierarchy Buyables",
    },
    {
        description: "Unlock a Supercharge AutoBuyer",
    },
    {
        description: "Unlock Purification and the Base is always 3 in Darkness",
    },
    {
        description: "All Drain amounts are equal to your highest Drain amount",
    },
]

let hyperChargeRequirementData = [ 0, 0, 36, 72, 300 ]
let hyperChargeRowUnlockData = [
    () => data.obliterate.times > 0 // TODO: Attach this to a EUP probably
]

function updateHyperchargeBottomTextHTML(){
    let base = `If a Hypercharge is in row one or the Hypercharge above it is purchased it is considered a <span style=color: ${getCSSVariable('stable-hypercharge-text-color')}>Stable Hypercharge</span><br>Only one Hypercharge from each row may be purchased. You must purchase at least one Hypercharge in a given row to access the row beneath it.<br>Purchasing a Hypercharge in a row will also unlock that row's <span style=color: ${getCSSVariable('unlocked-passive-hypercharge-text-color')}>Passive Hypercharge</span> for free.`
    if(data.obliterate.times > 0) base += `<br>Since you have Obliterated, <span style="color: ${getCSSVariable('hypercharge-energy-text-color')}"> Stable Energy</span> can be used to activate a secondary Hypercharge from each row. These secondary Hypercharges are never naturally Stable.`
    DOM(`hyperchargeBottomText`).innerHTML = base
}

function updateHyperChargeRequirementHTML(i){
    DOM(`hyperChargeRequirement${i}`).className = data.incrementy.totalCharge >= hyperChargeRequirementData[i]
        ? 'hyperChargeRequirement'
        : 'lockedHyperChargeRequirement'
}

function updateHyperChargeRowHTML(i){
    const unlocked = i < 4 ? true : hyperChargeRowUnlockData[i-4]()
    DOM(`hyperChargeRow${i}`).style.display = unlocked ? 'flex' : 'none'
}

let shouldDisplaySecondary = (i) => data.obliterate.times > 0 && hasHyperchargeRow(Math.floor(i/3))
let shouldDisplayStabilizer = (i) => data.obliterate.times > 0 && !isHyperchargeStable(i) && hasHypercharge(i)
function getHyperChargeUpgradeText(i, forceHideSecondary = false){
    let text = `${hyperChargeUpgradeData[i].description}`
    let end = !hasHypercharge(i)
        ? `<br>${formatWhole(hyperChargeUpgradeData[i].cost)} Charge`
        : `<br>Currently: ${formatSign(hyperChargeUpgradeData[i].effect(), hyperChargeUpgradeData[i].sign)}`
    let secondary = !hasHypercharge(i) && shouldDisplaySecondary(i) && !forceHideSecondary
        ? `<span style="color: ${getCSSVariable('secondary-hypercharge-cost-text-color')}"> and ${getSecondaryHyperchargeCost()} Stable Energy</span>` : ''
    let stabilizer = shouldDisplayStabilizer(i) ? `<br><b style="color: ${getCSSVariable('forceful-hypercharge-stabilization-cost-text-color')}">Stabilize for 1 Unbounded Energy</b>` : ''
    let isStabilized = shouldForceHyperchargeStable(i) ? `<br><b style="color: ${getCSSVariable('forceful-hypercharge-stabilization-text-color')}">Forcefully Stabilized</b>` : ''
    return text+end+secondary+stabilizer+isStabilized
}
function previewHyperchargeEffectHTML(i, shouldDisplay){
    if(hasHypercharge(i)) return
    const preview = shouldDisplay ? `<br>Potential: ${formatSign(hyperChargeUpgradeData[i].effect(), hyperChargeUpgradeData[i].sign)}` : ''
    DOM(`hyperChargeUpgrade${i}`).innerHTML = getHyperChargeUpgradeText(i)+preview
}
function updateHyperChargeTextHTML(i, type, customElement = null, forceHideSecondary = false){
    let element = customElement ? customElement : DOM(`hyperCharge${type}${i}`)
    if(type === 'Upgrade'){
        element.innerHTML = getHyperChargeUpgradeText(i, forceHideSecondary)
        element.className = isHyperchargeStable(i) ? 'stableHypercharge' : hasHypercharge(i) ? isHyperchargeSecondary(i) ? 'secondaryHypercharge' : 'boughtHypercharge' : 'unboughtHypercharge'
 }
    if(type === 'QOL') element.className = hasPassiveHypercharge(i) ? 'hyperChargeQOL' : 'lockedHyperChargeQOL'
}
function updateAllHyperchargeHTML(forceUpdate = false){
    for (let i = 0; i < data.hyper.hasUpgrade.length/3; i++) {
        updateHyperChargeRowHTML(i)
    }
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHypercharge(i) && !forceUpdate) continue
        updateHyperChargeTextHTML(i, 'Upgrade')
    }
    if(forceUpdate) updateAllPassiveHyperchargeHTML()
}
function updateAllPassiveHyperchargeHTML(){
    for (let i = 0; i < data.hyper.hasPassiveHypercharge.length; i++) {
        updateHyperChargeTextHTML(i, 'QOL')
    }
}

function initHyperchargeHTML(){
    const container = DOM(`hyperUpgradeContainer`)
    for (let i = 0; i < hyperChargeUpgradeData.length/3; i++) {
        let row = document.createElement("div")
        row.className = 'row flexBox'
        row.id = `hyperChargeRow${i}`
        row.style.position = 'relative'

        if(hyperChargeRequirementData[i] !== 0){
            let requirement = document.createElement('span')
            requirement.className = 'hyperChargeRequirement'
            requirement.id = `hyperChargeRequirement${i}`
            requirement.innerText = `${hyperChargeRequirementData[i]} Total Charge`
            row.appendChild(requirement)
        }

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let upgrade = document.createElement("button")

            upgrade.className = "hyperChargeUpgrade"
            upgrade.id = `hyperChargeUpgrade${index}`
            upgrade.onclick = () => buyHypercharge(index)
            upgrade.onmouseenter = () => previewHyperchargeEffectHTML(index, true)
            upgrade.onmouseleave = () => previewHyperchargeEffectHTML(index, false)

            updateHyperChargeTextHTML(index, 'Upgrade', upgrade)
            row.appendChild(upgrade)
        }

        let qol = document.createElement("button")
        qol.className = "hyperChargeQOL"
        qol.id = `hyperChargeQOL${i}`
        qol.innerHTML = hyperChargeQOLData[i].description
        row.appendChild(qol)

        let respec = document.createElement("button")
        respec.className = "hyperChargeRespec"
        respec.id = `hyperChargeRespec${i}`
        respec.innerHTML = 'Respec this row and all beneath it'
        respec.onclick = () => respecHyperchargeRow(i)
        row.appendChild(respec)

        container.appendChild(row)
        if (i < hyperChargeUpgradeData.length/3){
            let line = document.createElement("div")
            line.className = "hyperChargeLine"
            container.appendChild(line)
        }

        if(hyperChargeRequirementData[i] !== 0) updateHyperChargeRequirementHTML(i)
        updateHyperChargeTextHTML(i, 'QOL')
    }
}

function hasHyperchargeRow(row){
    const rowStart = row * 3
    const rowEnd = rowStart + 3
    return data.hyper.hasUpgrade.slice(rowStart, rowEnd).includes(true)
}

function hasPassiveHypercharge(row){
    return hasHyperchargeRow(row) || data.hyper.hasPassiveHypercharge[row]
}

function hasSecondaryHyperchargeInRow(row){
    const rowStart = row * 3
    const rowEnd = rowStart + 3
    return data.hyper.isUpgradeSecondary.slice(rowStart, rowEnd).includes(true)
}

function hasAllPreviousHyperchargeRows(row){
    for (let i = 0; i < row; i++) {
        if(!hasHyperchargeRow(i)) return false
    }
    return true
}

function canBuySecondaryHypercharge(i){
    return data.obliterate.times > 0 && getStableEnergy(0) >= getSecondaryHyperchargeCost() && hasHyperchargeRow(i) && !hasSecondaryHyperchargeInRow(i)
}

function buyHypercharge(i){
    const hyperchargeData = hyperChargeUpgradeData[i]
    const row = Math.floor(i / 3)
    if(hasHypercharge(i)) return stabilizeHypercharge(i, row)
    if(hasHyperchargeRow(row) && !canBuySecondaryHypercharge(row)) return
    if(!hasAllPreviousHyperchargeRows(row) || data.incrementy.charge < hyperchargeData.cost) return

    if(canBuySecondaryHypercharge(row)){
        data.stability.energy[0] -= getSecondaryHyperchargeCost()
        data.hyper.isUpgradeSecondary[i] = true
    }
    data.incrementy.charge -= hyperchargeData.cost
    data.hyper.hasUpgrade[i] = true
    data.hyper.hasPassiveHypercharge[row] = true

    if(data.obliterate.times > 0) {
        for (let j = i+1; j < i+3; j++) {
            let index = j
            updateHyperChargeTextHTML(index, 'Upgrade')
            if(index % 3 === 2) break
        }
    }
    updateHyperChargeTextHTML(i, 'Upgrade')
    updateHyperChargeTextHTML(row, 'QOL')
}

function stabilizeHypercharge(i){
    if(isHyperchargeStable(i) || getStableEnergy(2) < 1) return
    --data.stability.energy[2]
    data.hyper.shouldForceStable[i] = true
    updateHyperChargeTextHTML(i, 'Upgrade')
}

function respecHyperchargeRow(row){
    for (let i = row; i < data.hyper.hasUpgrade.length/3; i++) {
        const rowStart = i * 3
        const rowEnd = rowStart + 3
        for (let j = rowStart; j < rowEnd; j++) {
            if(data.hyper.isUpgradeSecondary[j]){
                data.hyper.isUpgradeSecondary[j] = false
                data.stability.energy[0] += 1
            }
            if(data.hyper.shouldForceStable[j]){
                data.hyper.shouldForceStable[j] = false
                ++data.stability.energy[2]
            }
            data.hyper.hasUpgrade[j] = false
            updateHyperChargeTextHTML(j, 'Upgrade', null, true)
        }
        updateHyperChargeTextHTML(i, 'QOL')
    }
    collapseReset()
}

function isHyperchargeStable(i){
    if(!hasHypercharge(i)) return false
    if ((i < 3 && !isHyperchargeSecondary(i)) || shouldForceHyperchargeStable(i)) return true
    return data.hyper.hasUpgrade[i - 3] && !isHyperchargeSecondary(i)
}
function getStableHypercharges(){
    let count = 0
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHypercharge(i)) continue
        if(isHyperchargeStable(i)) ++count
    }
    return count
}
let getStableHyperchargeEffect = () => 1+getStableHypercharges()/100

let hasHypercharge = (i) => data.hyper.hasUpgrade[i]
let getHyperchargeEffect = (i) => hasHypercharge(i) ? hyperChargeUpgradeData[i].effect() : hyperChargeUpgradeData[i].baseEffect()

function getTotalChargeInHypercharge(){
    let amt = 0
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHypercharge(i)) continue;
        amt += hyperChargeUpgradeData[i].cost
    }
    return amt
}

let getSecondaryHyperchargeCost = () => 1
let isHyperchargeSecondary = (i) => data.hyper.isUpgradeSecondary[i]
let shouldForceHyperchargeStable = (i) => data.hyper.shouldForceStable[i]