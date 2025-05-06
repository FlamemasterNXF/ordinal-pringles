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
        // Load Themes
        loadTheme()

        //Show and Hide things, based on data
        DOM('boostNav').style.display = data.boost.times>0 || data.collapse.times>0 || data.obliterate.times>0?'block':'none'
        DOM('collapseNav').style.display = data.collapse.times > 0 || data.obliterate.times>0?'block':'none'
        DOM('obliterateNav').style.display = data.obliterate.times > 0 ?'block':'none'
        DOM(getAdaptiveButton('factorBoostButton')).style.display = data.boost.times>0 || data.collapse.times>0 || data.obliterate.times>0?'inline-block':'none'
        DOM('obliterateButton').style.display = isObliterationUnlocked() ? 'block' : 'none'

        if(data.markup.shifts === 7 || data.chal.active[5]) DOM('dynamicTab').addEventListener('click', _=> switchSubtab('dynamic', 'markup'))

        DOM('bp2Description').innerText = data.overflow.thirdEffect ? 'Dividing Decrementy Gain by ' : 'Multiplying Decrementy Gain by '
        DOM('darken').innerText = data.darkness.darkened ? 'Escape' : 'Enter the Darkness'

        checkCollapseUnlockHTML()
        updateTotalAlephHTML()
        updateAllDarknessControlHTML()
        updateAllDUPHTML()
        updateBaselessEnterHTML(data.baseless.mode, true)
        updateDynamicShiftHTML()

        //Load Settings
        initSettings()
        DOM(`versionText`).innerText = `You're playing Ordinal Pringles v${VERSION}: ${VERSION_NAME}\n Last Update: ${VERSION_DATE}`
        DOM('progressBarContainer').style.display = getSimpleSetting('boostBar') ? 'flex' : 'none'

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
        initDepthHTML()
        initHyperchargeHTML()
        initANRebuyables()
        initPurification()
        initPassiveEnergyUpgrades()
        initPringleAlchemy()
        initPurityPlane()
        initStabilityHTML()
        updateGwaHTML()
        initThemeHTML()
        initBunnyHTML()

        //Load Tab Displays
        switchTab(data.nav.current)
    }
}