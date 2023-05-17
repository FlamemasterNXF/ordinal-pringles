let collapseTab = "cardinals"
function switchCollapseTab(t){
    DOM(`${collapseTab}SubPage`).style.display = `none`
    DOM(`${t}SubPage`).style.display = `flex`

    collapseTab = t
}

function updateCollapseHTML(){
    DOM(`cardinalsText`).innerText = `You have ${format(data.collapse.cardinals)} Cardinals`
    DOM(`collapseButton`).innerText = `Collapse for ${format(cardinalGain())} Cardinals`
}
function initAlephs(){
    const container = DOM('cardinalsSubPage')
    for (let i = 0; i < data.collapse.alephs.length; i++) {
        let el = document.createElement('t')   
        el.className = 'alephText'
        el.id = `aleph${i}`
        el.innerHTML = `You have <font color='#20da45'><b>${format(data.collapse.alephs[i])} ℵ<sub>${i+1}</sub></b></font>, ${alephData[i].text} <font color='#20da45'><b>${format(alephData[i].effect())}x</b></font>`
        container.append(el)
    }
}
function initCUPS(){
    const container = DOM('cUpgradesSubPage')
    for (let i = 0; i < data.collapse.hasCUP.length/4; i++) {
        let row = document.createElement('div')
        row.className = 'cupRow'
        row.id = `cupRow${i}`
        container.append(row)
        for (let j = 0; j < 4; j++) {
            let id = j+(i*4)
            let el = document.createElement('button')
            el.className = 'cup'
            el.id = `cup${id}`       
            el.innerText = `${cupData[id].text}\n\n${format(cupData[id].cost)} Cardinals`    
            el.addEventListener("click", ()=>buyCardinalUpgrade(id))
            row.append(el)
        }
    }
}
function initSluggish(){
    const container = DOM('sluggishContainer')
    for (let i = 0; i < data.collapse.hasSluggish.length; i++) {
        let el = document.createElement('button')
        el.className = 'sluggish'
        el.id = `sluggish${i}`
        el.innerText = `${sluggishData[i].req} Factor Boosts\n\n${sluggishData[i].text}`
        container.append(el)
    }
    checkAllSluggish(true)
}

function updateAlephHTML(i){
    DOM(`aleph${i}`).innerHTML = `You have <font color='#20da45'><b>${format(data.collapse.alephs[i])} ℵ<sub>${i+1}</sub></b></font>, ${alephData[i].text} <font color='#20da45'><b>${format(alephData[i].effect())}x</b></font>`
}
function updateSluggishHTML(i){
    DOM(`sluggish${i}`).style.background = data.collapse.hasSluggish[i] ? "#0e3000" : "black"
}
function checkSluggishMilestone(i, prev){ 
    if (prev && data.collapse.hasSluggish[i]){
        updateSluggishHTML(i)
    }
    if(!prev && data.boost.times <= sluggishData[i].req){
         data.collapse.hasSluggish[i] = true 
         updateSluggishHTML(i)
    }
}
function checkAllSluggish(prev = false){
    for (let i = 0; i < data.collapse.hasSluggish.length; i++) {
        checkSluggishMilestone(i, prev)        
    }
}

let cardinalGain = () => data.boost.times < 34 ? 0 : Math.sqrt(data.boost.times-34)+3

let alephData = [
    {text: "multiplying Autoclickers by", effect: ()=> 1},
    {text: "multiplying Autobuyers by", effect: ()=> 1},
    {text: "multiplying Ordinal Power gain by", effect: ()=> 1},
    {text: "multiplying Incrementy gain by", effect: ()=> 1},
    {text: "multiplying Dynamic Cap by", effect: ()=> 1},
    {text: "multiplying the SGH effect by", effect: ()=> 1},
    {text: "multiplying Booster Power gain by", effect: ()=> 1},
    {text: "multiplying the IUP3 effect by", effect: ()=> 1},
]
let cupData = [
    {text: "Total Charge Boosts AutoBuyers", cost: 100, effect: ()=> 1},
    {text: "Square AutoClicker speeds", cost: 100, effect: ()=> 1},
    {text: "Challenges 1-7 provide greatly reduced boosts when at zero completions", cost: 100, effect: ()=> 1},
    {text: "Ordinal Powers boost AutoBuyers and AutoClickers", cost: 100, effect: ()=> 1},
    {text: "Incrementy boosts its own gain", cost: 100, effect: ()=> 1},
    {text: "Unlock a 3rd Overcharge Effect", cost: 100, effect: ()=> 1},
    {text: "Unspent Cardinals boost Alephs", cost: 100, effect: ()=> 1},
    {text: "Gain 1% of best Cardinals gained on Collapse every second", cost: 100, effect: ()=> 1},
]
let sluggishData = [
    {text: "Gain 1% of Ordinal Powers gained on Markup every second and you always have one free Maximize AutoClicker", req: 34},
    {text: "Unlock Darkness and keep Challenges and Incrementy unlocked through Collapse", req: 29},
    {text: "Unlock an AutoBuyer for Charge, an AutoBuyer for RUP1-3, and 4 new Hierarchy Upgrades", req: 24},
    {text: "Unlock an AutoBuyer for Repeatable Hierarchy Upgrades, AutoPrestigers for Factor Shift and Factor Boost, and you can bulk complete Challenges", req: 12},
    {text: "Unlock a new row of Booster Upgrades, keep Hierarchies unlocked through Collapse, and keep Challenge completions on Collapse", req: 2},
    {text: "Uncap Ordinal Powers, keep UP1-6 and Darkness Upgrades on Collapse, and unlock an AutoBuyer for Booster Upgrades", req: 1},
]

function collapse(first = false){
    if (first){
        data.collapse.cardinals = 3
        ++data.collapse.times
        ++data.boost.times
        DOM('collapseNav').style.display = 'block'
        checkSluggishMilestone(0)
        collapseReset()
        return createAlert("You have Collapsed!", "Congratulations! You can now Factor Boost beyond FB34! Cardinals are gained based on how many FBs you have before Collapse.", "Got it!")
    }
    if (data.boost.times >= 34){
        data.collapse.cardinals += cardinalGain()
        ++data.collapse.times
        checkAllSluggish()
        return collapseReset()
    }
    createAlert("Failure", "Insufficent Factor Boosts. (You need at least 34 to Collapse!)", "Oops.")
}
function collapseReset(){
    boosterRefund()

    data.boost.amt = 0
    data.boost.total = 0
    data.boost.times = 0
    data.boost.hasBUP = Array(12).fill(false)
    data.boost.isCharged = Array(12).fill(false)
    data.boost.unlocks = Array(4).fill(false)

    data.chal.decrementy = 1
    data.chal.html = -1
    data.chal.completions = Array(8).fill(0)
    data.chal.active = Array(8).fill(0)
    totalCompletions = 0

    data.incrementy.amt = 0
    data.incrementy.hasIUP = Array(9).fill(false)
    data.incrementy.rebuyableAmt = Array(3).fill(0)
    data.incrementy.rebuyableCosts = [20, 1000, 100]
    data.incrementy.charge = 0
    data.incrementy.totalCharge = 0

    data.hierachies.ords[0].ord = 1
    data.hierachies.ords[0].over = 0
    data.hierachies.ords[0].base = 10
    data.hierachies.ords[1].ord = 1
    data.hierachies.ords[1].over = 0
    data.hierachies.ords[1].base = 10
    data.hierachies.rebuyableAmt = Array(6).fill(0)
    data.hierachies.hasUpgrade = Array(6).fill(false)

    data.overflow.bp = 1
    data.overflow.oc = 1
}

function collapseCardinals(){
    if (data.collapse.cardinals == 0) return createAlert("Failure", "No Cardinals to Collapse.", "Oops.")
    if(data.collapse.times == 1){
        for (let i = 0; i < 3; i++) {
            data.collapse.alephs[i] = 1
            updateAlephHTML(i)            
        }
        data.collapse.cardinals = 0
        return createAlert("A little help!", "Since this your first Collapse, you have been given exactly one of the first three Alephs because they are the most helpful! From now on Aleph gain will be random.", "Thanks!")
    }

    let usedCardinals = Math.floor(data.collapse.cardinals)
    data.collapse.cardinals -= usedCardinals

    if(usedCardinals < 1000){
        while (usedCardinals > 0){
            const aleph = getRandom(0,8)
            ++data.collapse.alephs[aleph]
            updateAlephHTML(aleph)   

            --usedCardinals
        }
    }
    else{
        for (let i = 0; i < data.collapse.alephs.length; i++) {
            data.collapse.alephs[i] += Math.floor(usedCardinals/8)         
            updateAlephHTML(i)   
        }
    }
}

function buyCardinalUpgrade(i){
    if(data.collapse.cardinals >= cupData[i].cost && !data.collapse.hasCUP[i]){
        data.collapse.cardinals -= cupData[i].cost
        data.collapse.hasCUP[i] = true
    }
}

