// Each group of three is a row
let hyperChargeUpgradeData = [
    {
        description: "Charge boosts Cardinal Gain",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "The 7th Cardinal Upgrade applies to the Total ℵ Effect",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Negative Charge now boosts Incrementy Gain and no longer reduces its effect",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },

    {
        description: "Charge boosts IUP4",
        sign: '+',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Boosters boost Hierarchy Effects",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "RUP2 now applies to Dynamic Cap, but at a reduced rate",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 5000000000000,
    },

    {
        description: "Charge boosts all Stabilization effects",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "CUP3 now instead provides effective Challenge completions",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Negative Charge boosts the Total ℵ Effect",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 5000000000000,
    },

    {
        description: "Charge boosts the first ℵ<sub>&omega;</sub> Upgrade",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Negative Charge boosts ℵ<sub>0</sub> gain",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Deeper Darkness Depths enhance the Depth Buffs",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 5000000000000,
    },

    {
        description: "Negative Charge boosts Hierarchy Effects",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 100,
    },
    {
        description: "Reduce the Base in the Forgotten Realm by 15 for every ℶ<sub>&omega;</sub> Milestone obtained",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 100,
    },
    {
        description: "The Barbecue Pringle is boosted by all other Pringles",
        sign: 'x',
        effect: () => 1,
        baseEffect: () => 1,
        cost: 100,
    },
]

let hyperChargeQOLData = [
    {
        description: "Gain two free Boosters on Collapse and unlock a BUP AutoBuyer",
        effect: () => 1,
        baseEffect: () => 1,
    },
    {
        description: "Keep Drains on Collapse and Automatically Max Hierarchy Buyables",
        effect: () => 1,
        baseEffect: () => 1,
    },
    {
        description: "Unlock a Supercharge AutoBuyer",
        effect: () => 1,
        baseEffect: () => 1,
    },
    {
        description: "Unlock Purification and the Base is always 3 in Darkness",
        effect: () => 1,
        baseEffect: () => 1,
    },
    {
        description: "All Drain amounts are equal to your highest Drain amount (maybe)",
        effect: () => 1,
        baseEffect: () => 1,
    },
]

let hyperChargeRequirementData = [ 72, 8000, 9600, 5.12e5, 1 ]

function updateHyperChargeRequirementHTML(i){
    DOM(`hyperChargeRequirement${i}`).style.color =
        data.incrementy.totalCharge > hyperChargeRequirementData[i] ? 'goldenrod' : 'gray'
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

function initHyperchargeHTML(){
    const container = DOM(`hyperUpgradeContainer`)
    for (let i = 0; i < hyperChargeUpgradeData.length/3; i++) {
        let row = document.createElement("div")
        row.className = 'row flexBox'
        row.style.position = 'relative'

        let requirement = document.createElement('span')
        requirement.className = 'hyperChargeRequirement'
        requirement.id = `hyperChargeRequirement${i}`
        requirement.innerText = `${hyperChargeRequirementData[i]} Total Charge`
        row.appendChild(requirement)

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let upgrade = document.createElement("button")

            upgrade.className = "hyperChargeUpgrade"
            upgrade.id = `hyperChargeUpgrade${index}`

            updateHyperChargeTextHTML(index, 'Upgrade', upgrade)
            row.appendChild(upgrade)
        }

        let qol = document.createElement("button")
        qol.className = "hyperChargeQOL"
        qol.id = `hyperChargeQOL${i}`
        qol.innerHTML = hyperChargeQOLData[i].description
        row.appendChild(qol)

        container.appendChild(row)
        if (i < hyperChargeUpgradeData.length/3){
            let line = document.createElement("div")
            line.className = "hyperChargeLine"
            container.appendChild(line)
        }

        updateHyperChargeRequirementHTML(i)
        updateHyperChargeTextHTML(i, 'QOL')
    }
}

let hasHyperCharge = (i) => data.hyper.hasUpgrade[i]
let hasHyperQOL = (i) => checkArrayBetween(data.hyper.hasUpgrade, i*3, (i+1)*3, true)