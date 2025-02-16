function switchTab(mode){
    DOM(`${data.nav.current}Page`).style.display = 'none'

    data.nav.current = mode
    DOM(`${mode}Page`).style.display = 'flex'

    if(!tabsWithoutSubtabs.includes(mode)) switchSubtab(data.nav.subtabs[mode], mode)

    if(mode === 'collapse') checkCollapseUnlockHTML()
}

const tabsWithoutSubtabs = ['ord', 'ach']

const defaultSubTabs = {
    "markup": "factor",
    "boosters": "upgrades",
    "collapse": "cardinals",
    "obliterate": "pringles",
    "settings": "gameSettings",
}

function switchSubtab(tab, mode){
    if(!isTabUnlocked(tab)) return

    DOM(`${data.nav.subtabs[mode]}SubPage`).style.display = 'none'
    DOM(`${tab}SubPage`).style.display = 'flex'
    data.nav.subtabs[mode] = tab

    // Special Boosters Rules
    if(mode === "boosters"){
        updateAutomationTabHTML()

        if(tab==="upgrades") checkSpecialBUPs()
        if(tab==="hierarchies") checkSpecialHUPs()

        if(tab==="overflow"){
            DOM(`bp6Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
            DOM(`bp7Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
        }

        if (tab==="upgrades" && data.boost.unlocks[1]) {
            updateBUPInfoText()
            DOM('chargeRefund').style.display = data.boost.unlocks[1] ? 'block' : 'none'
        }

        if(tab==="incrementy"){
            DOM(`iupRow3`).style.display = hasAOMilestone(3) ? `flex` : `none`
        }

        if(tab==="overflow"){
            DOM(`bp1Description`).innerText = `Multiplying Passive OP gain by`
            DOM(`bp1Description2`).style.display = ''
        }
    }

    // Special Collapse Rules
    if(mode === "collapse"){
        DOM(`collapseInfoContainer`).style.display = tab==='purification' ? 'none' : 'flex'
        DOM(`mobilecollapseButton`).style.display = isMobileMode() ? 'block' : 'none'

        if(tab==='cardinals'){
            DOM(`aleph8`).style.display = hasAOMilestone(1) ? `block` : `none`
        }
        if(tab==='cUpgrades' && data.obliterate.times > 0) checkAllUnlocks(0, true)
        if(tab==='sluggish' && data.obliterate.times > 0) checkAllUnlocks(1, true)
        if(tab==='darkness'){
            updateDUPHTML(1)
            updateDUPHTML(2)
            DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
            DOM(`dupC5`).style.display = data.obliterate.times > 0 ? 'block' : 'none'
            DOM('dupC5').innerHTML = `${formatBool(!data.obliterate.unstableFactorState[1], 'EDT')} the Second Unstable Factor`
        }
        if(tab==='sing'){
            if(!data.sing.tutorial){
                createAlert('Tutorial Time!', 'Increase the Singularity\'s Density with the slider! Each increase will grant you a boost to Cardinal gain, with every few increases unlocking a new Singularity Function! Singularity Functions can boost or unlock things. But beware, growing your Singularity costs Charge!', 'Thanks for the tips!')
                data.sing.tutorial = true
            }
            DOM(`singFunction8`).style.display = hasAOMilestone(0) ? `block` : `none`
            DOM(`singularity1`).style.display = /*hasSingFunction(9) ? `flex` :*/ `none`
            checkPermanentFunctions()
        }
        if(tab==="baseless"){
            updateAlephNullHTML()
            checkANRUnlockHTML()
            DOM(`baselessEnterText`).innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`
            updateBaselessEnterHTML(data.baseless.mode, true)
        }
        if(tab === "purification") {
            if(!data.omega.tutorial){
                createAlert('Tutorial Time!', 'In order to gain ℶ<sub>&omega;</sub> you must enter a Purification and reach a never-before-reached Factor Boost within that Purification! This means ℶ<sub>&omega;</sub> is NOT farmable! Have fun!', 'Thanks for the tips!')
                data.omega.tutorial = true
            }
            if(data.obliterate.times > 0) updateAllAOMHTML()
        }
    }

    // Special Obliteration Rules
    if(mode === "obliterate"){
        if(tab === 'energy' && !hasDrawnTree) drawTree()
        if(tab === 'passive') updatePassiveEnergyText()
        if(tab === 'instability') updateInstabilityText()

        DOM(`obliterateInfoContainer`).style.display = tab === 'energy' ? 'flex' : 'none'
    }

    // Special Settings Rules
    if(mode === "settings"){
        if(tab === 'ui'){
            DOM(`gwaifySettingContainer`).style.display = data.gword.unl ? 'flex' : 'none'
            DOM(`settingsToggle14`).innerHTML = `${SETTINGS_DESCS[14]} ${settingsColor(data.gword.enabled)}`
        }
    }
}

function isTabUnlocked(t){
    switch (t) {
        case 'dynamic': return data.markup.shifts === 7 || data.chal.active[4] || data.baseless.baseless

        case 'chal': return data.boost.unlocks[0]
        case 'incrementy': return data.boost.unlocks[1]
        case 'hierarchies': return data.boost.unlocks[2]
        case 'overflow': return data.boost.unlocks[3]

        case 'darkness': return hasSluggishMilestone(2)
        case 'sing': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'baseless': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'purification': return hasSingFunction(6) || hasPassiveUpgrade(20)

        default: return true
    }
}

let getSubtab = (mode) => data.nav.subtabs[mode]