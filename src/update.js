//Important Constants for Loading
const TABS = ["markup", "boost", "collapse", "ach", "settings"]

const uHTML = {
    update(){
        updateOrdHTML()
        updateMarkupHTML()
        updateBoostersHTML()
        updateCollapseHTML()
    },
    load(){
        //Load Tab Displays
        for (let i = 0; i < TABS.length; i++) {
            DOM(`${TABS[i]}Page`).style.display = 'none'
        }
        switchTab('ord')

        //Show and Hide things, based on data
        DOM('boostNav').style.display = data.boost.times>0 || data.collapse.times>0?'block':'none'
        DOM('collapseNav').style.display = data.collapse.times>0?'block':'none'
        DOM('factorBoostButton').style.display = data.boost.times>0 || data.collapse.times>0?'inline-block':'none'

        if(data.markup.shifts === 7 || data.chal.active[4]) DOM('dynamicTab').addEventListener('click', _=> switchSubtab('dynamic', 'markup'))

        if(data.boost.unlocks[1])('bupBottomText').innerText = 'Click a purchased Upgrade to Supercharge it!\nThe Unlockables Column does not consume Boosters'
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
        initChals()
        initIUPs()
        initHierarchies()
        initAlephs()
        initCUPS()
        initSluggish()
        initSingularityFunctions()
        initANRebuyables()
        initPurification()
    }
}