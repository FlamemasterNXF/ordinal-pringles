let boostTab = "upgrades"
function switchBoostTab(t){
    DOM(`${boostTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`

    if (t=="upgrades" && data.incrementy.totalCharge > 0){
        DOM('bupBottomText').style.color = 'goldenrod'
        DOM('bupBottomText').innerText = 'Click a purchased Upgrade to Supercharge it!\nThe Unlockables Column does not consume Boosters'
        DOM('chargeRefund').style.display = 'block'
    }
    else{
        DOM('bupBottomText').innerText = 'The Unlockables Column does not consume Boosters'
        DOM('chargeRefund').style.display = 'none'
    }
    boostTab = t
}

const bupDesc = ['Each Factor\'s effect is doubled', 'Boost OP gain by 5x', 'The Ordinal Base is always 5 in Challenges', 'Dynamic Gain is multiplied by your C5 completions in C1-C4',
    'Unlock Max All AutoBuyer', 'Boosters Boost Tier 1 and 2 automation', 'Gain 10x OP at Ordinal Base 5 or higher', 'The Ordinal Base boosts Factors (higher is better)',
    'Unlock Markup AutoBuyer', 'Gain 20 Free OP/s', 'Gain 3 free levels of each Factor', 'Boosters boost Dynamic gain if the Ordinal Base is less than 6']
const bupCosts = [1, 5, 72, 53,
    1, 4, 73, 74,
    1, 8, 16, 66]
function initBUPs(){
    let rows = [DOM('bupColumn0'), DOM('bupColumn1'), DOM('bupColumn2')]
    let total = 0
    for (let i = 0; i < rows.length; i++) {
        for (let n = 0; n < bupCosts.length/3; n++) {
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
        DOM(`bup${i}`).addEventListener('click', ()=>buyBUP(i))
        DOM(`bup${i}`).style.backgroundColor = data.boost.hasBUP[i]?'#002480':'black'
    }
    for (let i = 0; i < data.boost.unlocks.length; i++) {
        DOM(`bu${i}`).style.backgroundColor = data.boost.unlocks[i]?'#002480':'black'
    }

    if(data.incrementy.totalCharge > 0) initBUPHover()
}
function initBUPHover(){
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        const index = i
        DOM(`bup${i}`).addEventListener('mouseover', () => revealChargeEffect(index));
    }
}

const chargedBUPDesc = ['Each Factor\'s effect is Quadrupled', 'Boost OP gain by 500x', 'The Ordinal Base is always 4 in Challenges', 'Dynamic Gain is multiplied by your C5 completions',
    'The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 3x1)', 'Boosters Boost Tier 1 and 2 Automation at a much higher rate', 'Gain 100x OP at Ordinal Base 4 or higher', 'The Base boosts Factors but lower Base is better',
    'The AutoBuyers are boosted by Factor 7 (does not stack with Upgrade 2x1)', 'Gain Free OP/s based on your Base', 'Gain 4 free levels of each Factor', 'Boosters boost Dynamic Gain']

let bup0Effect = () => data.boost.hasBUP[0] ? data.boost.isCharged[0] ? 4 : 2 : 1
let bup1Effect = () => data.boost.hasBUP[1] ? data.boost.isCharged[1] ? 500 : 5 : 1
let bup2Effect = () => data.chal.active[6] ? 10 : data.boost.isCharged[2] ? 4 : 5
let bup3Effect = () => data.boost.hasBUP[3] ? Math.max(Math.pow(2, data.chal.completions[4]), 1) : 1
let bup48Effect = () => data.boost.isCharged[4] || data.boost.isCharged[8] ? Math.sqrt(factorEffect(6)) : 1
let bup5Effect = () => data.boost.hasBUP[5] ? data.boost.isCharged[5] ? Math.max(Math.sqrt(data.boost.total)*3, 1) : Math.max(Math.sqrt(data.boost.total), 1) : 1
let bup6Effect = () => data.boost.hasBUP[6] ? data.boost.isCharged[6] ? 100 : 10 : 0
let bup7Effect = () => data.boost.hasBUP[7] ? data.boost.isCharged[7] ? Math.max(1,(-data.ord.base + 6)) : data.ord.base-2 : 1
let bup9Effect = () => data.boost.hasBUP[9] ? data.boost.isCharged[9] ? Math.max(20*(-data.ord.base+11)*getOverflowEffect(1), 1) : 20*getOverflowEffect(1) : 1
let bup10Effect = () => data.boost.hasBUP[10] ? data.boost.isCharged[10] ? 4 : 3 : 0
let bup11Effect = () => data.boost.hasBUP[11] ? Math.max(Math.log2(data.boost.amt), 1) : 1

const autoNames = ['Max All', 'Markup']
const autoRequirements = ['you can\'t Factor Shift', 'you\'re past Ψ(Ω)']
const autoUps = [4, 8]
function updateBoostersHTML(){
    DOM('boosterText').innerText = data.incrementy.totalCharge > 0 ?
        `You have ${(data.boost.amt)} Boosters (${(data.boost.total)} total) and ${data.incrementy.charge} Charge (${data.incrementy.totalCharge} total)`
        : `You have ${(data.boost.amt)} Boosters (${(data.boost.total)} total)`
    DOM('bup3').innerText = `${bupDesc[3]}\n[${format(bup3Effect())}x]\n53 Boosters`
    DOM('bup5').innerText = `${data.boost.isCharged[5]?chargedBUPDesc[5]:bupDesc[5]}\n[${format(bup5Effect())}x]\n${data.boost.isCharged[5]?'':bupCosts[5]} Boosters`
    DOM('bup7').innerText = `${data.boost.isCharged[7]?chargedBUPDesc[7]:bupDesc[7]}\n[${format(bup7Effect())}x]\n${data.boost.isCharged[7]?'':bupCosts[7]} Boosters`
    DOM('bup11').innerText = `${data.boost.isCharged[11]?chargedBUPDesc[11]:bupDesc[11]}\n[${format(bup11Effect())}x]\n${data.boost.isCharged[11]?'':bupCosts[11]} Boosters`
    for (let i = 0; i < data.autoStatus.enabled.length; i++) {
        DOM(`t2AutoText${i}`).innerText = `Your ${autoNames[i]} AutoBuyer is clicking the ${autoNames[i]} button ${format(t2Auto())} times/second, but only if ${autoRequirements[i]}`
        DOM(`auto${i+2}`).innerText = data.boost.hasBUP[autoUps[i]]?`${autoNames[i]} AutoBuyer: ${boolToReadable(data.autoStatus.enabled[i], 'EDL')}`:`${autoNames[i]} AutoBuyer: LOCKED`
    
    }
    DOM("factorText2").innerText = `Your Challenges are multiplying AutoBuyer speed by a total of ${format(chalEffectTotal())}x`

   updateIncrementyHTML()
   updateHierarchiesHTML()
   updateOverflowHTML()

    DOM("chalTab").innerText = data.boost.unlocks[0]?'Challenges':'???'
    DOM("incrementyTab").innerText = data.boost.unlocks[1]?'Incrementy':'???'
    DOM("hierarchiesTab").innerText = data.boost.unlocks[2]?'Hierachies':'???'
    DOM("overflowTab").innerText = data.boost.unlocks[3]?'Overflow':'???'
    DOM(`chalIn`).innerText = data.chal.active[7]?`You are in Challenge 8 and there is ${format(data.chal.decrementy)} Decrementy`:`You are in Challenge ${data.chal.html+1}`
}

function revealChargeEffect(i) {
    DOM('bupBottomText').innerText = `This Upgrade's Supercharged effect is \'${chargedBUPDesc[i]}\'\nThe Unlockables Column does not consume Boosters`
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
    data.chal.decrementy = 1
    data.successorClicks = 0
}

function boost(f=false){
    if(data.boost.times == 33 && data.collapse.times == 0) return createConfirmation("Are you certain?", "This will preform a Collapse, which will reset EVERYTHING you've done so far in exchange for three Cardinals. The next layer awaits....", "Not yet.", "To the beyond!", collapse, true)
    if((!data.ord.isPsi || data.ord.ordinal < boostReq()) && !f) return createAlert("Failure", "Insufficient Ordinal", "Dang.")

    if(data.boost.times === 0){
        DOM('boostNav').style.display = 'block'
        DOM('factorBoostButton').style.display = 'inline-block'
    }

    for(let i=1;i<=getBulkBoostAmt();i++) {
        data.boost.amt += data.boost.times+1
        data.boost.total += data.boost.times+1
        ++data.boost.times
    }

    if(data.boost.times == 30) createAlert('Congratulations!', `You've Factor Boosted 30 times! Something new is right around the corner, but these last 4 Boosts will be the hardest...`, 'Onwards!')

    boosterUnlock()
    boosterReset()
}
function boostReq(){
    if(data.boost.times >= 34) return BHO_VALUE*3**(data.boost.times-33) 
    let scaling = data.boost.times < 30 ? 1 : Math.floor(100*(data.boost.times/15))
    return data.boost.times < 33 ? (3 ** (data.boost.times+1) * 4 * 10 * scaling) : BHO_VALUE
}
function getBulkBoostAmt(){
    return 1
    //return Math.round(Math.log(data.ord.ordinal/40)/Math.log(3)) - data.boost.times
}
function buyBUP(i){
    if(data.boost.hasBUP[i]) return chargeBUP(i)
    if(data.boost.amt < bupCosts[i]) return
    if(i % 4 !== 0 && !data.boost.hasBUP[i-1]) return // Force you to buy them in order, but only in columns

    data.boost.hasBUP[i] = true
    data.boost.amt -= bupCosts[i]

    DOM(`bup${i}`).style.backgroundColor = '#002480'
}

function boosterRefund(c=false){
    respecCharge(c)
    
    let indexes = []
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        if (data.boost.hasBUP[i]) indexes.push(i)
        data.boost.hasBUP[i] = false
        DOM(`bup${i}`).style.backgroundColor = 'black'
    }
    for (let i = 0; i < indexes.length; i++){
        data.boost.amt += bupCosts[indexes[i]]
    }
    c?boosterReset():chalExit()
}

function boosterUnlock(){
    if(data.boost.total>=6 || data.collapse.hasSluggish[1]){ data.boost.unlocks[0] = true; DOM(`bu0`).style.backgroundColor = '#002480'; DOM('chalTab').addEventListener('click', _=> switchBoostTab('chal')) }
    if(data.boost.total>=91 || data.collapse.hasSluggish[1]){ data.boost.unlocks[1] = true; DOM(`bu1`).style.backgroundColor = '#002480';  DOM('incrementyTab').addEventListener('click', _=> switchBoostTab('incrementy')) }
    if(data.boost.total>=325){ data.boost.unlocks[2] = true; DOM(`bu2`).style.backgroundColor = '#002480'; DOM('hierarchiesTab').addEventListener('click', _=> switchBoostTab('hierarchies')) }
    if(data.boost.total>=465){ data.boost.unlocks[3] = true; DOM(`bu3`).style.backgroundColor = '#002480'; DOM('overflowTab').addEventListener('click', _=> switchBoostTab('overflow')) }
}

function toggleAuto(i){
    if(!data.boost.hasBUP[autoUps[i]]) return
    data.autoStatus.enabled[i] = !data.autoStatus.enabled[i]
}

function totalBUPs(){
    let total = 0
    for (let i = 0; i < data.boost.hasBUP.length; i++) {
        if (data.boost.hasBUP[i]) ++total        
    }
    return total
}