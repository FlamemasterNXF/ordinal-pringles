function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'

    if(tab === 'collapse') checkCollapseUnlockHTML()
}


let markupTab = "factor"
let boostTab = "upgrades"
let collapseTab = "cardinals"
let darknessSubtab = "darkness"
let obliterateTab = "pringles"
let settingsTab = "gameSettings"

function switchSubtab(t, mode){
    if(!isTabUnlocked(t)) return

    // Special Markup Rules
    if(mode === "markup"){
        DOM(`${markupTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        markupTab = t
    }

    // Special Boosters Rules
    if(mode === "boosters"){
        if(!isTabUnlocked(boostTab)) switchTab('upgrades', 'boosters')
        DOM(`${boostTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        if(t==="upgrades") checkSpecialBUPs()
        if(t==="auto2") checkAutobuyerDisplay()
        if(t==="hierarchies") checkSpecialHUPs()

        if(t==="overflow"){
            DOM(`bp6Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
            DOM(`bp7Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
        }

        if (t==="upgrades" && data.boost.unlocks[1]) {
            updateBUPInfoText()
            DOM('chargeRefund').style.display = data.boost.unlocks[1] ? 'block' : 'none'
            DOM('destabRefund').style.display = getEUPEffect(4, 0) ? 'block' : 'none'
        }

        if(t==="incrementy"){
            DOM(`iupRow3`).style.display = hasAOMilestone(3) ? `flex` : `none`
        }
        boostTab = t
    }

    // Special Collapse Rules
    if(mode === "collapse"){
        if(!isTabUnlocked(collapseTab)) switchTab('cardinals', 'collapse')
        DOM(`collapseInfoContainer`).style.display = t==='purification' || t==='instability' ? 'none' : 'flex'

        if(t==='cardinals'){
            DOM(`aleph8`).style.display = hasAOMilestone(1) ? `block` : `none`
        }
        if(t==='cUpgrades' && data.obliterate.times > 0) checkAllUnlocks(0, true)
        if(t==='sluggish' && data.obliterate.times > 0) checkAllUnlocks(1, true)
        if(t==='darkness'){
            darknessSubtab = 'darkness'
            updateDUPHTML(1)
            updateDUPHTML(2)
            DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
            DOM('instability').style.display = getEUPEffect(4, 0) ? 'block' : 'none'
        }
        if(t==='instability'){
            darknessSubtab = 'instability'
            updateInstabilityText()
            DOM(`instabilityControl`).innerText = `${formatBool(!data.instability.enabled, 'EDT')} Instability`
            updateAllMiscPringleColors('instab')
        }
        if(t==='sing'){
            if(!data.sing.tutorial){
                createAlert('Tutorial Time!', 'Increase the Singularity\'s Density with the slider! Each increase will grant you a boost to Cardinal gain, with every few increases unlocking a new Singularity Function! Singularity Functions can boost or unlock things. But beware, growing your Singularity costs Charge!', 'Thanks for the tips!')
                data.sing.tutorial = true
            }
            DOM(`singFunction8`).style.display = hasAOMilestone(0) ? `block` : `none`
            checkPermanentFunctions()
        }
        if(t==="baseless"){
            updateAlephNullHTML()
            checkANRUnlockHTML()
            DOM(`baselessEnterText`).innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`
            updateBaselessEnterHTML(data.baseless.mode, true)
        }
        if(t === "autoPrestige") updateAutoPrestigeHTML()
        if(t === "purification") {
            if(!data.omega.tutorial){
                createAlert('Tutorial Time!', 'In order to gain ℶ<sub>&omega;</sub> you must enter a Purification and reach a never-before-reached Factor Boost within that Purification! This means ℶ<sub>&omega;</sub> is NOT farmable! Have fun!', 'Thanks for the tips!')
                data.omega.tutorial = true
            }
            if(data.obliterate.times > 0) updateAllAOMHTML()
        }

        DOM(`${collapseTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        collapseTab = t
    }

    // Special Obliteration Rules
    if(mode === "obliterate"){
        if(t === 'energy' && !hasDrawnTree) drawTree()
        if(t === 'passive') updatePassiveEnergyText()
        if(t === 'purity'){
            if(!data.purity.tutorial){
                createAlert('Tutorial Time!', "Here you can assign Pringles to certain Points on a plane. Each Point provides a certain amount of 'Purity' (Purity is the same thing as 'effect strength'), with Points further from the center having reduced Purity.", 'Thanks for the tips!')
                data.purity.tutorial = true
            }
            updateAllMiscPringleColors('purity')
        }

        DOM(`obliterateInfoContainer`).style.display = t === 'passive' || t === 'pringles' ? 'none' : 'flex'

        DOM(`${obliterateTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        obliterateTab = t
    }

    // Special Settings Rules
    if(mode === "settings"){
        DOM(`${settingsTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        settingsTab = t

        if(t === 'ui'){
            DOM(`gwaifySettingContainer`).style.display = data.gword.unl ? 'block' : 'none'
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
        case 'autoPrestige': return hasSluggishMilestone(3)
        case 'sing': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'baseless': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'purification': return hasSingFunction(6) || hasPassiveUpgrade(20)

        default: return true
    }
}