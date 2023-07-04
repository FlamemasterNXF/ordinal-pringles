let boostTab = "upgrades"
function switchBoostTab(t){
    if(isTabUnlocked(t)){
        DOM(`${boostTab}SubPage`).style.display = `none`
        DOM(`${t}SubPage`).style.display = `flex`

        if(t==="upgrades") checkSpecialBUPs()
        if(t==="hierarchies") checkSpecialHUPs()

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
}

const bupDesc = ['Each Factor\'s effect is doubled', 'Boost OP gain by 5x', 'The Ordinal Base is always 5 in Challenges', 'Dynamic Gain is multiplied by your C5 completions in C1-C4', 'Every 10 Darkness Upgrades purchased reduces Hierarchy Bases by 1',
    'Unlock Max All AutoBuyer', 'Boosters Boost Tier 1 and 2 automation', 'Gain 10x OP at Ordinal Base 5 or higher', 'The Ordinal Base boosts Factors (higher is better)', 'Each SGH Buyable Purchased boosts the SGH Effect Exponent',
    'Unlock Markup AutoBuyer', 'Gain 20 Free OP/s', 'Gain 3 free levels of each Factor', 'Boosters boost Dynamic gain if the Ordinal Base is less than 6', 'The Total ℵ effect applies to Incrementy gain']
const bupCosts = [1, 5, 72, 53, 3522,
    1, 4, 73, 74, 3522,
    1, 8, 16, 66, 3562,
]
function initBUPs(){
    let rows = [DOM('bupColumn0'), DOM('bupColumn1'), DOM('bupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < 5; n++) {
            let bup = document.createElement('button')

            if(data.boost.isCharged[total]){
                bup.className = 'chargedBUP'
                bup.id = `bup${total}`
                bup.innerText = `${chargedBUPDesc[total]}`
            }
            else{
                bup.className = 'bup'
                bup.id = `bup${total}`
                bup.innerText = `${bupDesc[total]}\n${bupCosts[total]} Boosters`
            }
            rows[i].append(bup)
            ++total
        }
    }
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        let bottomRow = i===4 || i===9 || i===14
        DOM(`bup${i}`).addEventListener('click', ()=>buyBUP(i, bottomRow))
        DOM(`bup${i}`).addEventListener('mouseenter', ()=>revealChargeEffect(i, true))
        DOM(`bup${i}`).addEventListener('mouseleave', ()=>revealChargeEffect(i, false))
        DOM(`bup${i}`).style.backgroundColor = data.boost.hasBUP[i]?'#002480':'black'
    }
    for (let i = 0; i < data.boost.unlocks.length; i++) {
        DOM(`bu${i}`).style.backgroundColor = data.boost.unlocks[i]?'#002480':'black'
    }

    checkSpecialBUPs()

    if(data.incrementy.totalCharge > 0) initBUPHover()
}
function initBUPHover(){
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        const index = i
        DOM(`bup${i}`).addEventListener('mouseover', () => revealChargeEffect(index));
    }
}
function checkSpecialBUPs(){
    DOM(`bup4`).style.display = data.collapse.hasSluggish[3] ? `block` : `none`
    DOM(`bup9`).style.display = data.collapse.hasSluggish[3] ? `block` : `none`
    DOM(`bup14`).style.display = data.collapse.hasSluggish[3] ? `block` : `none`
    DOM(`bu4`).style.display = data.collapse.hasSluggish[3] ? `block` : `none`
}

const chargedBUPDesc = ['Each Factor\'s effect is Quadrupled', 'Boost OP gain by 500x', 'The Ordinal Base is always 4 in Challenges', 'Dynamic Gain is multiplied by your C5 completions', 'Every 10 Darkness Upgrades or Drains purchased reduces Hierarchy Bases by 1',
    'The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 3x1)', 'Boosters Boost Tier 1 and 2 Automation at a much higher rate', 'Gain 100x OP at Ordinal Base 4 or higher', 'The Base boosts Factors but lower Base is better', 'Each SGH, FGH, and Incrementy Buyable Purchased boosts the SGH Effect Exponent',
    'The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 2x1)', 'Gain Free OP/s based on your Base', 'Gain 4 free levels of each Factor', 'Boosters boost Dynamic Gain', 'The Total ℵ effect is multiplied by Darkness Upgrade 1 and applied to Incrementy gain']

/*
    I hate this code. The only thing worse is the code for Hierarchies and Incrementy, which I wrote when I couldn't
    remember how half of JS worked after not programming in it for many months. There's no excuse for this.
    The code above this comment is *okay*. It's not terrible but not great. Beyond this is horrifying.
    If I could time travel and do one thing I would kick my past self for writing this. WHAT IS THIS???
    I am going to refactor this at some point. For now, I will be lazy and continue to add to the spaghetti :):
    -Flame, 6/29/23, while writing the code for v0.1.2
 */

let bup0Effect = () => data.boost.hasBUP[0] ? data.boost.isCharged[0] ? 4 : 2 : 1
let bup1Effect = () => data.boost.hasBUP[1] ? data.boost.isCharged[1] ? 500 : 5 : 1
let bup2Effect = () => data.chal.active[6] ? 10 - data.markup.shifts : data.boost.isCharged[2] ? 4 : 5
let bup3Effect = () => data.boost.hasBUP[3] ? Math.max(Math.pow(2, data.chal.completions[4]), 1) : 1
function bup48Effect(){
    if(data.boost.isCharged[5] && data.boost.isCharged[10] && data.hierarchies.hasUpgrade[4]) return Math.sqrt(factorEffect(6))**2
    if(data.boost.isCharged[5] || data.boost.isCharged[10]) return Math.sqrt(factorEffect(6))
    return 1
}
let bup5Effect = () => data.boost.hasBUP[6] ? data.boost.isCharged[6] ? Math.max(Math.sqrt(data.boost.total)*3, 1) : Math.max(Math.sqrt(data.boost.total), 1) : 1
let bup6Effect = () => data.boost.hasBUP[7] ? data.boost.isCharged[7] ? 100 : 10 : 0
let bup7Effect = () => data.boost.hasBUP[8] ? data.boost.isCharged[8] ? Math.max(1,(-data.ord.base + 6)) : Math.max(1,data.ord.base-2) : 1
let bup9Effect = () => data.boost.hasBUP[11] ? data.boost.isCharged[11] ? Math.max(20*(-data.ord.base+11)*getOverflowEffect(1), 1) : 20*getOverflowEffect(1) : 1
let bup10Effect = () => data.boost.hasBUP[12] ? data.boost.isCharged[12] ? 4 : 3 : 0
let bup11Effect = () => data.boost.hasBUP[13] ? Math.max(Math.log2(data.boost.amt), 1) : 1

let sBUP0Effect = () => data.boost.hasBUP[4] ? data.boost.isCharged[4] ? Math.floor((data.darkness.totalDrains+getTotalDUPs())/10)
    : Math.floor(getTotalDUPs()/10)
    : 0
let sBUP1Effect = () => data.boost.hasBUP[9] ? data.boost.isCharged[9]
    ? Math.sqrt(getTotalHBuyables(false)+getTotalIBuyables())
    : Math.sqrt(getTotalHBuyables(true))
    : 1
let sBUP2Effect = () => data.boost.hasBUP[14] ? data.boost.isCharged[14] ? alephTotalEffect()*dupEffect(0)
    : alephTotalEffect()
    : 1

const autoNames = ['Max All', 'Markup', 'Sacrifice for Charge', 'three RUP', 'Hierarchy Buyable']
const autoDisplayNames = ['Max All', 'Markup', 'Charge', 'RUP', 'Hierarchy Buyable']
const autoRequirements = [', but only if you can\'t Factor Shift', ', but only if you\'re past Ψ(Ω)', '', ', but only if you can\'t afford a Charge', '']
const autoUps = [5, 10]
function updateBoostersHTML(){
    DOM('boosterText').innerHTML = data.boost.unlocks[1] > 0 ?
        `You have <span style="color: #8080FF; font-family: DosisSemiBold">${(data.boost.amt)} Boosters</span> (${(data.boost.total)} total) and <span style="color: goldenrod; font-family: DosisSemiBold">${data.incrementy.charge} Charge</span> (${data.incrementy.totalCharge} total)`
        : `You have <span style="color: #8080FF; font-family: DosisSemiBold">${(data.boost.amt)} Boosters</span> (${(data.boost.total)} total)`
    DOM('boosterTimesText').innerHTML = `You have <span style="color: #8080FF">Boosted</span> ${data.boost.times} times`
    //DOM('bup3').innerText = `${bupDesc[3]}\n[${format(bup3Effect())}x]\n53 Boosters`
    //DOM('bup5').innerText = `${data.boost.isCharged[5]?chargedBUPDesc[5]:bupDesc[5]}\n[${format(bup5Effect())}x]\n${data.boost.isCharged[5]?'':bupCosts[5]} Boosters`
    //DOM('bup7').innerText = `${data.boost.isCharged[7]?chargedBUPDesc[7]:bupDesc[7]}\n[${format(bup7Effect())}x]\n${data.boost.isCharged[7]?'':bupCosts[7]} Boosters`
    //DOM('bup11').innerText = `${data.boost.isCharged[11]?chargedBUPDesc[11]:bupDesc[11]}\n[${format(bup11Effect())}x]\n${data.boost.isCharged[11]?'':bupCosts[11]} Boosters`
    for (let i = 0; i < data.autoStatus.enabled.length; i++) {
        DOM(`t2AutoText${i}`).innerHTML = `Your <span style="color: #80ceff">${autoDisplayNames[i]} AutoBuyer</span> is clicking the ${autoNames[i]} button${i === 3 || i === 4 ? 's' : ''} <span style="color: #8080FF">${i < 2 ? format(t2Auto()) : 20} times/second</span>${autoRequirements[i]}`
        DOM(`auto${i+2}`).innerText = data.boost.hasBUP[autoUps[i]] || i > 1 ?`${autoDisplayNames[i]} AutoBuyer: ${boolToReadable(data.autoStatus.enabled[i], 'EDL')}`:`${autoDisplayNames[i]} AutoBuyer: LOCKED`

    }
    DOM("factorText2").innerText = `Your Challenges are multiplying AutoBuyer speed by a total of ${format(chalEffectTotal())}x`

   updateIncrementyHTML()
   updateHierarchiesHTML()
   updateOverflowHTML()

    DOM("chalTab").innerText = data.boost.unlocks[0]?'Challenges':'???'
    DOM("incrementyTab").innerText = data.boost.unlocks[1]?'Incrementy':'???'
    DOM("hierarchiesTab").innerText = data.boost.unlocks[2]?'Hierarchies':'???'
    DOM("overflowTab").innerText = data.boost.unlocks[3]?'Overflow':'???'
    DOM(`chalIn`).innerText = data.chal.active[7]?`You are in Challenge 8 and there is ${format(data.chal.decrementy)} Decrementy`:`You are in Challenge ${data.chal.html+1}`
}

function revealChargeEffect(i, showCharge) {
    DOM(`bup${i}`).style.color = showCharge || data.boost.isCharged[i] && data.boost.unlocks[1] ? 'goldenrod' : '#8080FF'
    DOM(`bup${i}`).innerText = showCharge || data.boost.isCharged[i] ? chargedBUPDesc[i] : `${bupDesc[i]}\n${bupCosts[i]} Boosters`
    //DOM('bupBottomText').innerText = `This Upgrade's Supercharged effect is \'${chargedBUPDesc[i]}\'\nThe Unlockables Column does not consume Boosters`
}

function boosterReset(){
    data.ord.ordinal = 0
    data.ord.over = 0
    data.ord.base = data.chal.active[2]?15:10
    data.ord.isPsi = false
    data.markup.powers = 0
    data.markup.shifts = 0
    data.dy.level = 1
    data.dy.gain = 0
    data.dy.cap = 40
    for (let i = 0; i < data.factors.length; i++) {
        data.factors[i] = 0
    }
    for (let i = 0; i < data.autoLevels.length; i++) {
        data.autoLevels[i] = 0
    }
    data.chal.decrementy = D(1)
    data.successorClicks = 0
}

const boostTimesLimit = 156
function boost(f=false, auto=false){
    if(data.boost.times === 33 && data.collapse.times === 0) return createConfirmation("Are you certain?", "This will perform a Collapse, which will reset EVERYTHING you've done so far in exchange for three Cardinals. The next layer awaits....", "Not yet.", "To the beyond!", collapse, true)
    if((!data.ord.isPsi || data.ord.ordinal < boostReq()) && auto) return
    if((!data.ord.isPsi || data.ord.ordinal < boostReq()) && !f) return createAlert("Failure", "Insufficient Ordinal", "Dang.")

    if(data.boost.times === boostTimesLimit) return createAlert("The End... for now!", "You've reached the current Endgame!", "Thanks!")

    if(data.boost.times === 0){
        DOM('boostNav').style.display = 'block'
        DOM('factorBoostButton').style.display = 'inline-block'
    }

    let bulkBoostAmt = getBulkBoostAmt();
    if (auto && data.boost.times < 2 && !hasSluggish[4]) bulkBoostAmt = Math.min(2 - data.boost.times, bulkBoostAmt) // do not automatically boost past SM2
    for(let i=1;i<=bulkBoostAmt;i++) {
        data.boost.amt += data.boost.times+1
        data.boost.total += data.boost.times+1
        ++data.boost.times

        if(data.boost.times === 30 && data.collapse.times === 0) createAlert('Congratulations!', `You've Factor Boosted 30 times! Something new is right around the corner, but these last 4 Boosts will be the hardest...`, 'Onwards!')
    }
    boosterUnlock()
    boosterReset()
}
function boostReq(n = data.boost.times){
    if(data.boost.times === 0) return GRAHAMS_VALUE
    if(n >= 34) return BHO_VALUE*3**(n-33)
    let scaling = n < 30 ? 1 : Math.floor(100*(n/15))
    return n < 33 ? (3 ** (n+1) * 4 * 10 * scaling) : BHO_VALUE
}
//Credit to ryanleonels
let boostLimit = () => (data.collapse.times === 0) ? 33 : Infinity;
function getBulkBoostAmt(){
    if (!data.sToggles[7] || !data.ord.isPsi || data.ord.ordinal <= boostReq()) return 1
    let maxBoost = data.boost.times
    while (data.ord.ordinal >= boostReq(maxBoost) && maxBoost < boostLimit()) maxBoost++
    return Math.max(maxBoost - data.boost.times, 1)
    //return Math.round(Math.log(data.ord.ordinal/40)/Math.log(3)) - data.boost.times
}
//End credit
function buyBUP(i, bottomRow){
    updateHierarchyPurchaseHTML()
    if(data.boost.hasBUP[i]) return chargeBUP(i, bottomRow)
    if(data.boost.amt < bupCosts[i]) return
    if(i % 5 !== 0 && !data.boost.hasBUP[i-1]) return // Force you to buy them in order, but only in columns

    data.boost.hasBUP[i] = true
    data.boost.amt -= bupCosts[i]

    DOM(`bup${i}`).style.backgroundColor = '#002480'

}

function boosterRefund(c=false){
    respecCharge(c)
    updateHierarchyPurchaseHTML()
    //let indexes = []
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        //if (data.boost.hasBUP[i]) indexes.push(i)
        data.boost.hasBUP[i] = false
        DOM(`bup${i}`).style.backgroundColor = 'black'
    }
    /*for (let i = 0; i < indexes.length; i++){
        data.boost.amt += bupCosts[indexes[i]]
    }*/
    data.boost.amt = data.boost.total
    c?boosterReset():chalExit()
}

function boosterUnlock(){
    if(chalTabUnlocked()){ data.boost.unlocks[0] = true; DOM(`bu0`).style.backgroundColor = '#002480'; }
    if(incrementyTabUnlocked()){ data.boost.unlocks[1] = true; DOM(`bu1`).style.backgroundColor = '#002480';  }
    if(hierarchiesTabUnlocked()){ data.boost.unlocks[2] = true; DOM(`bu2`).style.backgroundColor = '#002480'; }
    if(overflowTabUnlocked()){ data.boost.unlocks[3] = true; DOM(`bu3`).style.backgroundColor = '#002480'; }
}

function chalTabUnlocked(){
    return data.boost.total>=6 || data.collapse.hasSluggish[1];
}

function incrementyTabUnlocked(){
    return data.boost.total>=91 || data.collapse.hasSluggish[1];
}

function hierarchiesTabUnlocked(){
    return data.boost.total>=325 || data.collapse.hasSluggish[4];
}

function overflowTabUnlocked(){
    return data.boost.total>=465;
}

function toggleAuto(i){
    if(!data.boost.hasBUP[autoUps[i]] && i < 2) return
    data.autoStatus.enabled[i] = !data.autoStatus.enabled[i]
}

function totalBUPs(){
    let total = 0
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        if (data.boost.hasBUP[i]) ++total
    }
    return total
}
