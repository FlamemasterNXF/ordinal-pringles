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
        description: "Total Charge provides free Stabilization levels",
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
        description: "Charge boosts the first ℵ<sub>&omega;</sub> Upgrade",
        sign: 'x',
        effect: () => 1+Math.log10(data.incrementy.charge+1)/10,
        baseEffect: () => 1,
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

function updateHyperChargeRequirementHTML(i){
    DOM(`hyperChargeRequirement${i}`).style.color =
        data.incrementy.totalCharge > hyperChargeRequirementData[i] ? 'goldenrod' : 'gray'
}

function updateHyperChargeRowHTML(i){
    const unlocked = i < 4 ? true : hyperChargeRowUnlockData[i-4]()
    DOM(`hyperChargeRow${i}`).style.display = unlocked ? 'flex' : 'none'
}

function getHyperChargeUpgradeText(i){
    let text = `${hyperChargeUpgradeData[i].description}`
    let end = !hasHyperCharge(i)
        ? `<br>${formatWhole(hyperChargeUpgradeData[i].cost)} Charge`
        : `<br>Currently: ${formatSign(hyperChargeUpgradeData[i].effect(), hyperChargeUpgradeData[i].sign)}`
    return text+end
}
function updateHyperChargeTextHTML(i, type, customElement = null){
    let element = customElement ? customElement : DOM(`hyperCharge${type}${i}`)
    if(type === 'Upgrade'){
        element.innerHTML = getHyperChargeUpgradeText(i)
        element.style.color = hasHyperCharge(i) ? '#d5ad00' : 'gray'
    }
    if(type === 'QOL') element.style.color = hasHyperQOL(i) ? '#aed500' : 'gray'
}
function updateAllUnlockedHyperchargeHTML(){
    for (let i = 0; i < data.hyper.hasUpgrade.length/3; i++) {
        updateHyperChargeRowHTML(i)
    }
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHyperCharge(i)) continue
        updateHyperChargeTextHTML(i, 'Upgrade')
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

function hasPassiveHypercharge(row){
    const rowStart = row * 3
    const rowEnd = rowStart + 3
    return data.hyper.hasUpgrade.slice(rowStart, rowEnd).includes(true)
}

function hasAllPreviousHyperchargeRows(row){
    for (let i = 0; i < row; i++) {
        if(!hasPassiveHypercharge(i)) return false
    }
    return true
}

function buyHypercharge(i){
    const hyperchargeData = hyperChargeUpgradeData[i]
    const row = Math.floor(i / 3)
    if(hasPassiveHypercharge(row) || !hasAllPreviousHyperchargeRows(row) || data.incrementy.charge < hyperchargeData.cost) return

    data.incrementy.charge -= hyperchargeData.cost
    data.hyper.hasUpgrade[i] = true
    updateHyperChargeTextHTML(i, 'Upgrade')
    updateHyperChargeTextHTML(row, 'QOL')
}

function respecHyperchargeRow(row){
    for (let i = row; i < data.hyper.hasUpgrade.length/3; i++) {
        const rowStart = i * 3
        const rowEnd = rowStart + 3
        for (let j = rowStart; j < rowEnd; j++) {
            data.hyper.hasUpgrade[j] = false
            updateHyperChargeTextHTML(j, 'Upgrade')
        }
        updateHyperChargeTextHTML(i, 'QOL')
    }
    collapseReset()
}

function isHyperchargeStable(i){
    if (i < 3) return true
    return data.hyper.hasUpgrade[i - 3]
}
function getStableHypercharges(){
    let count = 0
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHyperCharge(i)) continue
        if(isHyperchargeStable(i)) ++count
    }
    return count
}
let getStableHyperchargeEffect = () => 1+getStableHypercharges()/100

let hasHyperCharge = (i) => data.hyper.hasUpgrade[i]
let hasHyperQOL = (i) => checkArrayBetween(data.hyper.hasUpgrade, i*3, (i+1)*3, true)
let getHyperchargeEffect = (i) => hasHyperCharge(i) ? hyperChargeUpgradeData[i].effect() : hyperChargeUpgradeData[i].baseEffect()

function getTotalChargeInHypercharge(){
    let amt = 0
    for (let i = 0; i < data.hyper.hasUpgrade.length; i++) {
        if(!hasHyperCharge(i)) continue;
        amt += hyperChargeUpgradeData[i].cost
    }
    return amt
}