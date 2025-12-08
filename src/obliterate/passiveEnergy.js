const passiveUpgradeData = [
    "The first Sluggish Milestone is now permanent<br>Requires 1 Obliteration",
    "The second Sluggish Milestone is now permanent<br>Requires 2 Obliterations",
    "The third Sluggish Milestone is now permanent<br>Requires 3 Obliterations",
    "The fourth Sluggish Milestone is now permanent<br>Requires 4 Obliterations",
    "The fifth Sluggish Milestone is now permanent<br>Requires 5 Obliterations",

    "The first and second Cardinal Upgrades are now permanent",
    "The third and fourth Cardinal Upgrades are now permanent",
    "The fifth and sixth Cardinal Upgrades are now permanent",
    "The seventh Cardinal Upgrade is now permanent",
    "The eighth Cardinal Upgrade and all Drains are now permanent",

    "The first and second Darkness Upgrade's levels are now permanent",
    "The third Darkness Upgrade's levels are now permanent",
    "Your best Decrementy, Entropy, and Depth are now permanent",
    "The top-row Baselessness Upgrades' levels are now permanent",
    "The bottom-row Baselessness Upgrades' levels are now permanent",

    "Eternal Boosts are now permanent",
    "Infinite Boosts are now permanent",
    "Obscure Boosts are now permanent",
    "Inferior Boosts are now permanent",
    "Everything within Baseless Realms is now permanent",

    "The bottom-row Booster Unlock is now permanently unlocked",
    "All Hypercharges are now permanent",
    "Purification is now permanently unlocked",
    "Unlock a permanent AutoBuyer for ℵ<sub>0</sub> Upgrades",
    "Unlock a permanent AutoBuyer for ℵ<sub>&omega;</sub> Upgrades",
]

let passiveEnergyEffects = [
    () => (1+getTotalPassiveEnergy())**10,
    () => 1.5**getTotalPassiveEnergy()
]

let updatePassiveEnergyText = () => DOM(`passiveEnergyText`).innerHTML = `You have <span style="font-family: DosisSemiBold; color: ${getCSSVariable('passive-energy-text-passive-energy-color')}">${getCurrentPassiveEnergy()} Passive Energy</span><br><span style="font-size: 0.9rem">You have <span style="color: ${getCSSVariable('passive-energy-text-passive-energy-color')}">${getTotalPassiveEnergy()} Total Passive Energy</span>, multiplying <span style="color: ${getCSSVariable('passive-energy-text-autobuyer-color')}">AutoBuyer speed by ${format(getPassiveEnergyEffect(0))}x</span> and <span style="color: ${getCSSVariable('passive-energy-text-aleph-omega-color')}">ℵ<sub>&omega;</sub> gain by ${format(getPassiveEnergyEffect(1))}x</span></span>`
function initPassiveEnergyUpgrades(){
    let total = 0
    for (let i = 0; i < 5; i++) {
        let row = document.createElement('div')
        row.className = 'flexBox'
        row.id = `peupRow${i}`
        DOM(`passiveUpgradeContainer`).append(row)

        for (let j = 0; j < 5; j++) {
            const classNames = i > 0 ? ['boughtPassiveUpgrade', 'passiveUpgrade'] : ['passiveUnlocked', 'passiveUnlock']

            let upgrade = document.createElement('button')
            upgrade.id = `peup${total}`
            upgrade.innerHTML = `${passiveUpgradeData[total]}`
            upgrade.className = hasPassiveUpgrade(total) ? classNames[0] : classNames[1]
            DOM(`peupRow${i}`).append(upgrade)

            if(i === 0){
                const color = hasPassiveUpgrade(total) ? getCSSVariable('bought-passive-energy-upgrade-border-color') : getCSSVariable('passive-energy-upgrade-border-color')
                if(j === 0) upgrade.style.borderLeft = `2px solid ${color}`
                if(j === 4) upgrade.style.borderRight = `2px solid ${color}`
            }

            ++total
        }
    }

    // Weird Workaround
    for (let i = 5; i < passiveUpgradeData.length; i++) {
        DOM(`peup${i}`).addEventListener("click", ()=>buyPEUP(i))
    }
}

function updatePEUPUnlocks(){
    for (let i = 0; i < 5; i++) {
        DOM(`peup${i}`).className = hasPassiveUpgrade(i) ? 'passiveUnlocked' : 'passiveUnlock'
    }
}
function buyPEUP(i){
    if(getCurrentPassiveEnergy() < 1 || hasPassiveUpgrade(i)) return

    if(i % 5 === 0 || hasPassiveUpgrade(i-1)){
        //--data.obliterate.passiveEnergy
        data.obliterate.hasPassiveUpgrade[i] = true

        DOM(`peup${i}`).className = 'boughtPassiveUpgrade'
        updatePassiveEnergyText()
    }
}

function passiveRespecConfirm(){
    if(!getSimpleSetting('peupRespecConfirmation')) return respecPassiveUpgrades()
    createConfirmation('Are you certain?', 'This will force an Obliteration reset!', 'Nope!', 'Yeah', respecPassiveUpgrades)
}
function respecPassiveUpgrades(bypassReset = false){
    //data.obliterate.passiveEnergy = getTotalFractalEnergyInvested(true)
    for (let i = 5; i < data.obliterate.hasPassiveUpgrade.length; i++) {
        DOM(`peup${i}`).className = 'passiveUpgrade'
        data.obliterate.hasPassiveUpgrade[i] = false
    }
    if(!bypassReset) obliterateReset()

    updatePassiveEnergyText()
}
function getTotalPassiveEnergyInvested(){
    let fromUpgrades = 0
    for (let i = 5; i < data.obliterate.hasPassiveUpgrade.length; i++) {
        if(hasPassiveUpgrade(i)) ++fromUpgrades
    }
    return fromUpgrades
}
let getBasePassiveEnergy = () => getTotalFractalEnergyInvested(true) + getTotalStableEnergy()
let getCurrentPassiveEnergy = () => getBasePassiveEnergy() - getTotalPassiveEnergyInvested()
let getTotalPassiveEnergy = () => getCurrentPassiveEnergy() + getTotalPassiveEnergyInvested()

function hasPassiveUpgrade(i) {
    if(i < 5) return data.obliterate.times > i
    return data.obliterate.hasPassiveUpgrade[i]
}

function completedPassiveUpgradeRows(){
    let rows = 0
    for (let i = 0; i < passiveUpgradeData.length; i++) {
        let index = 4+5*i
        if(hasPassiveUpgrade(index)) ++rows
    }
    return rows
}
let isAOMilestonePermanent = (i) => i < completedPassiveUpgradeRows()

let getPassiveEnergyEffect = (i) => passiveEnergyEffects[i]()

boostManager.register({
    name: 'Passive Energy Effect 1',
    target: 'All AutoBuyers',
    sign: 'x',
    color: graphColors.passiveEnergy,
    effect: () => getPassiveEnergyEffect(0),
    shouldDisplay: () => data.obliterate.times > 0
})
boostManager.register({
    name: 'Passive Energy Effect 2',
    target: 'ℵω',
    sign: 'x',
    color: graphColors.passiveEnergy,
    effect: () => getPassiveEnergyEffect(1),
    shouldDisplay: () => data.obliterate.times > 0
})