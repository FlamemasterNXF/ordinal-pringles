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

        if(t==="upgrades") checkSpecialBUPs()
        if(t==="auto2") checkAutobuyerDisplay()
        if(t==="hierarchies") checkSpecialHUPs()
        if(t==='incrementy') DOM(`iupRow3`).style.display = ocData[3].special.effect() ? `flex` : `none`

        if (t==="upgrades" && data.boost.unlocks[1]){
            DOM('bupBottomText').innerText = data.collapse.hasSluggish[3]
                ? `Click a purchased Upgrade to Supercharge it! The cost to Supercharge a bottom-row Upgrade is currently ${getBottomRowChargeCost()} Charge.\nThe Unlockables Column does not consume Boosters`
                : 'Click a purchased Upgrade to Supercharge it!\nThe Unlockables Column does not consume Boosters'
            DOM('chargeRefund').style.display = 'block'
        }
        else{
            DOM('bupBottomText').innerText = 'The Unlockables Column does not consume Boosters'
            DOM('chargeRefund').style.display = 'none'
        }
        boostTab = t
    }

    // Special Collapse Rules
    if(mode === "collapse"){
        if(t === "cardinals" && omegaUnlocked()) t = "pureAlephs"
        if(t === "cUpgrades" && omegaUnlocked()) t = "pUpgrades"
        if(t === "sluggish" && inOC(4)) t = "appeasements"
        DOM(`collapseInfoContainer`).style.display =
            t==='omega'||t==='appeasements' || t==='pUpgrades' || t==='pureAlephs'
            ? 'none' : 'flex'

        if(t==='darkness'){
            updateDUPHTML(1)
            updateDUPHTML(2)
            DOM('dupC4').innerHTML = `Invert the third Booster Power effect<br><span style="font-size: 0.7rem">Currently: ${data.overflow.thirdEffect ? 'Dividing': 'Multiplying'}</span>`
        }
        if(t==='sing' && !data.sing.tutorial){
            createAlert('Tutorial Time!', 'Increase the Singularity\'s Density with the slider! Each increase will grant you a boost to Cardinal gain, with every few increases unlocking a new Singularity Function! Singularity Functions can boost or unlock things. But beware, growing your Singularity costs Charge!', 'Thanks for the tips!')
            data.sing.tutorial = true
        }
        if(t==="baseless"){
            updateAlephNullHTML()
            DOM(`baselessEnterText`).innerHTML = `${data.baseless.baseless ? 'Exit' : 'Enter'}`
        }
        if(t === "autoPrestige") updateAutoPrestigeHTML()

        DOM(`${collapseTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        collapseTab = t
    }

    // Special Settings Rules
    if(mode === "settings"){
        DOM(`${settingsTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`
        settingsTab = t
    }
}

function isTabUnlocked(t){
    switch (t) {
        case 'dynamic': return data.markup.shifts === 7 || data.chal.active[4] || data.baseless.baseless

        case 'chal': return data.boost.unlocks[0]
        case 'incrementy': return data.boost.unlocks[1]
        case 'hierarchies': return data.boost.unlocks[2]
        case 'overflow': return data.boost.unlocks[3]

        case 'darkness': return data.collapse.hasSluggish[2]
        case 'autoPrestige': return data.collapse.hasSluggish[3]
        case 'sing': return data.boost.unlocks[4]
        case 'baseless': return data.boost.unlocks[4]
        case 'omega': return data.boost.unlocks[4]

        default: return true
    }
}