function switchTab(tab){
    data.nav.last = data.nav.current
    data.nav.current = tab
    DOM(`${data.nav.last}Page`).style.display = 'none'
    DOM(`${tab}Page`).style.display = 'flex'

    if(tab === 'markup' && !isTabUnlocked(boostTab)) switchSubtab('factor', 'markup')
    if(tab === 'boosters' && !isTabUnlocked(boostTab)) switchSubtab('upgrades', 'boosters')
    if(tab === 'collapse'){
        if(!isTabUnlocked(collapseTab)) switchSubtab('cardinals', 'collapse')
        checkCollapseUnlockHTML()
    }
}


let markupTab = "factor"
let boostTab = "upgrades"
let collapseTab = "cardinals"
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
        DOM(`${boostTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        updateAutomationTabHTML()

        if(t==="upgrades") checkSpecialBUPs()
        if(t==="hierarchies") checkSpecialHUPs()

        if(t==="overflow"){
            DOM(`bp6Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
            DOM(`bp7Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
        }

        if (t==="upgrades" && data.boost.unlocks[1]) {
            updateBUPInfoText()
            DOM('chargeRefund').style.display = data.boost.unlocks[1] ? 'block' : 'none'
        }

        if(t==="incrementy"){
            DOM(`iupRow3`).style.display = hasAOMilestone(3) ? `flex` : `none`
        }

        if(t==="overflow"){
            DOM(`bp1Description`).innerText = `Multiplying Passive OP gain by`
            DOM(`bp1Description2`).style.display = ''
        }
        boostTab = t
    }

    // Special Collapse Rules
    if(mode === "collapse"){
        DOM(`collapseInfoContainer`).style.display = t==='purification' ? 'none' : 'flex'

        if(t==='cardinals'){
            DOM(`aleph8`).style.display = hasAOMilestone(1) ? `block` : `none`
        }
        if(t==='cUpgrades' && data.obliterate.times > 0) checkAllUnlocks(0, true)
        if(t==='sluggish' && data.obliterate.times > 0) checkAllUnlocks(1, true)
        if(t==='darkness'){
            updateDUPHTML(1)
            updateDUPHTML(2)
            DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
            DOM(`dupC5`).style.display = data.obliterate.times > 0 ? 'block' : 'none'
            DOM('dupC5').innerHTML = `${formatBool(!data.obliterate.unstableFactorState[1], 'EDT')} the Second Unstable Factor`
        }
        if(t==='sing'){
            if(!data.sing.tutorial){
                createAlert('Tutorial Time!', 'Increase the Singularity\'s Density with the slider! Each increase will grant you a boost to Cardinal gain, with every few increases unlocking a new Singularity Function! Singularity Functions can boost or unlock things. But beware, growing your Singularity costs Charge!', 'Thanks for the tips!')
                data.sing.tutorial = true
            }
            DOM(`singFunction8`).style.display = hasAOMilestone(0) ? `block` : `none`
            DOM(`singularity1`).style.display = /*hasSingFunction(9) ? `flex` :*/ `none`
            checkPermanentFunctions()
        }
        if(t==="baseless"){
            updateAlephNullHTML()
            checkANRUnlockHTML()
            DOM(`baselessEnterText`).innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`
            updateBaselessEnterHTML(data.baseless.mode, true)
        }
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
        if(t === 'instability') updateInstabilityText()

        DOM(`obliterateInfoContainer`).style.display = t === 'energy' ? 'flex' : 'none'

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
        case 'sing': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'baseless': return data.boost.unlocks[4] || hasPassiveUpgrade(19)
        case 'purification': return hasSingFunction(6) || hasPassiveUpgrade(20)

        default: return true
    }
}