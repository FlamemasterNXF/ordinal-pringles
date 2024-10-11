const passiveEnergyDescriptions = [
    "The first Sluggish Milestone is now permanent",
    "The second Sluggish Milestone is now permanent",
    "The third Sluggish Milestone is now permanent",
    "The fourth Sluggish Milestone is now permanent",
    "The fifth Sluggish Milestone is now permanent",

    "The first and second Cardinal Upgrades are now permanent",
    "The third and fourth Cardinal Upgrades are now permanent",
    "The fifth and sixth Cardinal Upgrades are now permanent",
    "The seventh Cardinal Upgrade is now permanent",
    "The eighth Cardinal Upgrade is now permanent",

    "The first Darkness Upgrade's levels are now permanent",
    "The second Darkness Upgrade's levels are now permanent",
    "The third Darkness Upgrade's levels are now permanent",
    "The first three Baselessness Upgrades' levels are now permanent",
    "The fourth and fifth Baselessness Upgrades' levels are now permanent",

    "Eternal Boosts are now permanent",
    "Infinite Boosts are now permanent",
    "Obscure Boosts are now permanent",
    "Inferior Boosts are now permanent",

    "Singularity and Baselessness are now permanently unlocked",
    "Purification is now permanently unlocked",
    "Unlock a permanent AutoBuyer for ℵ<sub>0</sub> Upgrades",
    "Unlock a permanent AutoBuyer for ℵ<sub>&omega;</sub> Upgrades",
]

let updatePassiveEnergyText = () => DOM(`passiveEnergyText`).innerHTML = `You have <span style="font-family: DosisSemiBold; color: #bd80ff">${formatWhole(data.obliterate.passiveEnergy)} Passive Energy</span>`
function initPassiveEnergyUpgrades(){
    let total = 0
    for (let i = 0; i < 5; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox'
        row.id = `peupRow${i}`
        DOM(`passiveUpgradeContainer`).append(row)

        let rowUpgrades = i < 3 ? 5 : 4
        for (let j = 0; j < rowUpgrades; j++) {
            let upgrade = document.createElement('button')
            upgrade.className = 'passiveUpgrade'
            upgrade.id = `peup${total}`
            upgrade.innerHTML = `${passiveEnergyDescriptions[total]}`
            upgrade.style.color = hasPassiveUpgrade(total) ? '#e180ff' : 'gray'
            DOM(`peupRow${i}`).append(upgrade)

            ++total
        }
    }

    // Weird Workaround
    for (let i = 0; i < passiveEnergyDescriptions.length; i++) {
        DOM(`peup${i}`).addEventListener("click", ()=>buyPEUP(i))
    }
}

function buyPEUP(i){
    if(data.obliterate.passiveEnergy < 1 || hasPassiveUpgrade(i)) return

    if(((i % 5 === 0 && i !== 20) || i === 19) || hasPassiveUpgrade(i-1)){
        --data.obliterate.passiveEnergy
        data.obliterate.hasPassiveUpgrade[i] = true

        DOM(`peup${i}`).style.color = '#e180ff'
        updatePassiveEnergyText()
    }
}

function passiveRespecConfirm(){
    if(!data.sToggles[17]) return respecPassiveUpgrades()
    createConfirmation('Are you certain?', 'This will force an Obliteration reset!', 'Nope!', 'Yeah', respecPassiveUpgrades)
}
function respecPassiveUpgrades(){
    data.obliterate.passiveEnergy = getTotalEnergyInvested(true)
    for (let i = 0; i < data.obliterate.hasPassiveUpgrade.length; i++) {
        DOM(`peup${i}`).style.color = 'gray'
        data.obliterate.hasPassiveUpgrade[i] = false
    }
    obliterateReset()

    updatePassiveEnergyText()
}
function getTotalPassiveEnergyInvested(){
    let total = 0
    for (let i = 0; i < data.obliterate.hasPassiveUpgrade.length; i++) {
        if(hasPassiveUpgrade(i)) ++total
    }
    return total
}

let hasPassiveUpgrade = (i) => data.obliterate.hasPassiveUpgrade[i]
function completedPassiveUpgradeRows(){
    let rows = 0
    if(hasPassiveUpgrade(4)) ++rows
    if(hasPassiveUpgrade(9)) ++rows
    if(hasPassiveUpgrade(14)) ++rows
    if(hasPassiveUpgrade(18)) ++rows
    if(hasPassiveUpgrade(22)) ++rows
    return rows
}
let isAOMilestonePermanent = (i) => i < completedPassiveUpgradeRows()