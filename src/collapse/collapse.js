let collapseTab = "cardinals"
function switchCollapseTab(t){
    DOM(`${boostTab}SubPage`).style.display = `none`
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
function updateAlephHTML(i){
    DOM(`aleph${i}`).innerHTML = `You have <font color='#20da45'><b>${format(data.collapse.alephs[i])} ℵ<sub>${i+1}</sub></b></font>, ${alephData[i].text} <font color='#20da45'><b>${format(alephData[i].effect())}x</b></font>`
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

function collapse(first = false){
    if (first){
        data.collapse.cardinals = 3
        ++data.collapse.times
        DOM('collapseNav').style.display = 'block'
        collapseReset()
        return createAlert("You have Collapsed!", "Congratulations! You can now Factor Boost beyond FB34! Cardinals are gained based on how many FBs you have before Collapse.", "Got it!")
    }
    if (data.boost.times >= 34){
        data.collapse.cardinals += cardinalGain()
        ++data.collapse.times
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

