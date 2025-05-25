function switchTab(mode){
    if(mode === 'ord' && data.bunny.unlocked && data.bunny.enabled) return switchTab('bunny')

    DOM(`${data.nav.current}Page`).style.display = 'none'

    data.nav.current = mode
    DOM(`${mode}Page`).style.display = 'flex'

    if(!tabsWithoutSubtabs.includes(mode)) switchSubtab(data.nav.subtabs[mode], mode)

    if(mode === 'collapse') checkCollapseUnlockHTML()
}

const tabsWithoutSubtabs = ['ord', 'ach', 'bunny']

const defaultSubTabs = {
    "markup": "factor",
    "boosters": "upgrades",
    "collapse": "cardinals",
    "realm": "realmUpgrades",
    "obliterate": "pringles",
    "settings": "settingsGame",
}

function switchSubtab(tab, mode){
    if(!isTabUnlocked(tab)) return

    DOM(`${data.nav.subtabs[mode]}SubPage`).style.display = 'none'
    DOM(`${tab}SubPage`).style.display = 'flex'
    data.nav.subtabs[mode] = tab

    // Special Markup Rules
    if(mode === 'markup'){
        if(tab === "factor") DOM("mobilefactorShiftButton").style.display = isMobileMode() ? 'block' : 'none'
    }

    // Special Boosters Rules
    if(mode === "boosters"){
        updateAutomationTabHTML()

        if(tab==="upgrades") checkSpecialBUPs()
        if(tab==="hierarchies") checkSpecialHUPs()

        if(tab==="overflow"){
            DOM(`bp6Container`).style.display = hasAOMilestone(2) ? 'block' : 'none'
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
        if(tab==='cUpgrades' && data.obliterate.times > 0) {
            checkAllUnlocks(0, true)
            updateAllDrainHTML()
        }
        if(tab==='sluggish' && data.obliterate.times > 0) checkAllUnlocks(1, true)
        if(tab==='darkness'){
            updateDUPHTML(1)
            updateDUPHTML(2)
            DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
        }
        if(tab==="baseless"){
            updateAlephNullHTML()
            checkANRUnlockHTML()
            DOM(`baselessEnterText`).innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`
            updateBaselessEnterHTML(data.baseless.mode, true)
        }
        if(tab === 'hyper') updateHyperchargeBottomTextHTML()
        if(tab === "purification") {
            if(!data.omega.tutorial){
                createAlert('Tutorial Time!', 'In order to gain ℶ<sub>&omega;</sub> you must enter a Purification and reach a never-before-reached Factor Boost within that Purification! This means ℶ<sub>&omega;</sub> is NOT farmable! Have fun!', 'Thanks for the tips!')
                data.omega.tutorial = true
            }
            if(data.obliterate.times > 0) updateAllAOMHTML()
        }
    }

    // Special Realm Rules
    if(mode === "realm"){
        if(tab === "realmAutomation"){
            for (let i = 0; i < 3; i++) {
                DOM(`realmAuto${i}`).style.display = isRealmAutomationUnlocked(i) ? 'block' : 'none'
                DOM(`realmAutoText${i}`).style.display = isRealmAutomationUnlocked(i) ? 'block' : 'none'
                updateRealmAutomationHTML(i)
            }
        }
    }

    // Special Obliteration Rules
    if(mode === "obliterate"){
        if(tab === 'energy' && !hasDrawnTree) drawTree()
        if(tab === 'passive') updatePassiveEnergyText()

        DOM(`obliterateInfoContainer`).style.display = tab !== 'passive' ? 'flex' : 'none'
    }

    // Special Settings Rules
    if(mode === "settings"){
        DOM(`technicalTab`).style.display = getSimpleSetting('technicalSettingsToggle') ? 'block' : 'none'
        if(tab === 'settingsUI'){
            DOM(`gwaifySettingContainer`).style.display = data.gword.unl ? 'flex' : 'none'
            DOM('bunnyToggle').style.display = data.bunny.unlocked ? 'block' : 'none'
        }

        const display = isMobileMode() ? `flex` : `block`
        DOM(`sidebar0`).style.display = tab !== 'settingsThemes' || getSimpleSetting('sidebarsInThemes') ? display : 'none'
        DOM(`sidebar1`).style.display = tab !== 'settingsThemes' || getSimpleSetting('sidebarsInThemes') ? display : 'none'

        if(!isMobileMode()) DOM(`game`).style.width = tab !== 'settingsThemes' || getSimpleSetting('sidebarsInThemes') ? 'calc(100% - 32rem)' : '100%'
    }
}

function isTabUnlocked(t){
    switch (t) {
        case 'dynamic': return data.markup.shifts === 7 || data.chal.active[5] || data.baseless.baseless

        case 'chal': return data.boost.unlocks[0]
        case 'incrementy': return data.boost.unlocks[1]
        case 'hierarchies': return data.boost.unlocks[2]
        case 'overflow': return data.boost.unlocks[3]

        case 'darkness': return hasSluggishMilestone(2)
        case 'hyper': return data.boost.unlocks[4] || hasPassiveUpgrade(20)
        case 'baseless': return data.boost.unlocks[4] || hasPassiveUpgrade(20)
        case 'purification': return hasPassiveHypercharge(3) || hasPassiveUpgrade(22)

        case 'realmChal': return hasRealmUnlock(0)
        case 'realmIncrementy': return hasRealmUnlock(1)
        case 'realmHierarchies': return hasRealmUnlock(2)

        default: return true
    }
}

let getSubtab = (mode) => data.nav.subtabs[mode]