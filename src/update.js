//Important Constants for Loading
const TABS = ["markup", "boost", "collapse", "ach", "settings"]
const SETTINGS_DESCS = ["Booster Refund Confirmation", "Challenge Confirmation", "Challenge Completion Popup", "Factor Shift confirmation", "Factor Boost confirmation", "Charge Refund Confirmation", "Boost Progress Bar", "ability to Bulk Boost"]

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

        if(data.markup.shifts === 7 || data.chal.active[4]) DOM('dynamicTab').addEventListener('click', _=> switchMarkupTab('dynamic'))

        if(data.boost.unlocks[1])('bupBottomText').innerText = 'Click a purchased Upgrade to Supercharge it!\nThe Unlockables Column does not consume Boosters'
        DOM('bp2Description').innerText = data.overflow.thirdEffect ? 'Dividing Decrementy Gain by ' : 'Multiplying Decrementy Gain by '
        DOM('progressBarContainer').style.display = data.sToggles[6] ? 'flex' : 'none'
        DOM('darken').innerText = data.darkness.darkened ? 'Escape' : 'Enter the Darkness'

        checkCollapseUnlockHTML()
        updateTotalAlephHTML()
        updateAllDarknessControlHTML()
        updateAllDUPHTML()
        loadSingularityHTML()

        //Load Settings
        for (let i = 0; i < data.sToggles.length; i++) {
            DOM(`settingsToggle${i}`).innerText = `Toggle the ${SETTINGS_DESCS[i]} [${boolToReadable(data.sToggles[i])}]`
        }
        DOM(`offlineProgressToggle`).innerText = `Toggle Offline Progress [${boolToReadable(data.offline)}]`
        DOM(`versionText`).innerText = `You're playing Ordinal Pringles v${VERSION}: ${VERSION_NAME}\n Last Update: ${VERSION_DATE}`

        //Initalize all Tabs
        initAchs()
        initBUPs()
        initChals()
        initIUPs()
        initHierarchies()
        initAlephs()
        initCUPS()
        initSluggish()
    }
}

function isTabUnlocked(t){
    switch (t) {
        case 'chal': return data.boost.unlocks[0]
        case 'incrementy': return data.boost.unlocks[1]
        case 'hierarchies': return data.boost.unlocks[2]
        case 'overflow': return data.boost.unlocks[3]

        case 'darkness': return data.collapse.hasSluggish[2]
        case 'autoPrestige': return data.collapse.hasSluggish[3]
        case 'sing': return data.boost.unlocks[4]

        default: return true
    }
}