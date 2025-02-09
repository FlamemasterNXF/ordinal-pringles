// Each group of three is a row
let hyperChargeUpgradeData = [
    {
        description: "Some boost",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Another boost",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Wow, boost",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },

    {
        description: "Definitely not a boost",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Super duper boost",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 10,
    },
    {
        description: "Boots",
        effect: () => 1,
        baseEffect: () => 1,
        cost: 5000000000000,
    },
]

let hyperChargeQOLData = [
    {
        description: "Quality of Life",
        effect: () => 1,
        baseEffect: () => 1,
    },
    {
        description: "Quality of Death",
        effect: () => 1,
        baseEffect: () => 1,
    },
]

function initHyperchargeHTML(){
    const container = DOM(`hyperUpgradeContainer`)
    for (let i = 0; i < hyperChargeUpgradeData.length/3; i++) {
        let row = document.createElement("div")
        row.className = 'row flexBox'

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let upgrade = document.createElement("button")

            upgrade.className = "hyperChargeUpgrade"
            upgrade.id = `hyperChargeUpgrade${index}`
            upgrade.innerHTML = `${hyperChargeUpgradeData[index].description}<br>${formatWhole(hyperChargeUpgradeData[index].cost)} Charge`

            row.appendChild(upgrade)
        }

        let qol = document.createElement("button")
        qol.className = "hyperChargeQOL"
        qol.id = `hyperChargeQOL${i}`
        qol.innerHTML = hyperChargeQOLData[i].description
        row.appendChild(qol)

        container.appendChild(row)
        if (i < 4){
            let line = document.createElement("div")
            line.className = "hyperChargeLine"
            container.appendChild(line)
        }
    }
}