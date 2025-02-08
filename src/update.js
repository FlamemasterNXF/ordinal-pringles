const uHTML = {
    update(){
        updateOrdHTML()
        updateMarkupHTML()
        updateBoostersHTML()
        updateCollapseHTML()
        updateObliterateHTML()
        updateAdaptiveHTML()
    },
    load(){
        //Show and Hide things, based on data
        DOM('boostNav').style.display = data.boost.times>0 || data.collapse.times>0 || data.obliterate.times>0?'block':'none'
        DOM('collapseNav').style.display = data.collapse.times > 0 || data.obliterate.times>0?'block':'none'
        DOM('obliterateNav').style.display = data.obliterate.times > 0 ?'block':'none'
        DOM(getAdaptiveButton('factorBoostButton')).style.display = data.boost.times>0 || data.collapse.times>0 || data.obliterate.times>0?'inline-block':'none'
        DOM('obliterateButton').style.display = hasAOMilestone(4) || data.obliterate.times > 0 ? 'block' : 'none'

        if(data.markup.shifts === 7 || data.chal.active[4]) DOM('dynamicTab').addEventListener('click', _=> switchSubtab('dynamic', 'markup'))

        DOM('bp2Description').innerText = data.overflow.thirdEffect ? 'Dividing Decrementy Gain by ' : 'Multiplying Decrementy Gain by '
        DOM('progressBarContainer').style.display = data.sToggles[6] ? 'flex' : 'none'
        DOM('darken').innerText = data.darkness.darkened ? 'Escape' : 'Enter the Darkness'

        checkCollapseUnlockHTML()
        updateTotalAlephHTML()
        updateAllDarknessControlHTML()
        updateAllDUPHTML()
        loadSingularityHTML()
        updateBaselessEnterHTML(data.baseless.mode, true)
        updateDynamicShiftHTML()

        //Load Settings
        loadSettings()
        DOM(`versionText`).innerText = `You're playing Ordinal Pringles v${VERSION}: ${VERSION_NAME}\n Last Update: ${VERSION_DATE}`

        //Initialize all Tabs
        initAchs()
        initBUPs()
        initAutomation()
        initChals()
        initIUPs()
        initHierarchies()
        initAlephs()
        initCUPS()
        initSluggish()
        initSingularityFunctions()
        initANRebuyables()
        initPurification()
        initPassiveEnergyUpgrades()
        initPringleAlchemy()
        initPurityPlane()
        initUnstableFactors()

        //Load Tab Displays
        switchTab(data.nav.current)
    }
}

let isMobileMode = () => window.matchMedia("(max-width: 960px)").matches

function getAdaptiveButton(name){
    return isMobileMode() ? `mobile${name}` : name
}

function updateAdaptiveHTML(){
    if(isMobileMode()){
        DOM(`header`).style.borderTopLeftRadius = isObliterationUnlocked() ? '0px' : '16px'
        DOM(`header`).style.borderLeft = isObliterationUnlocked() ? '1px solid gray' : '2px solid gray'
    }
}