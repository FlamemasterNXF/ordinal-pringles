function updateHierarchiesHTML(){
    for (let i = 0; i < data.hierachies.ords.length; i++) {
        DOM(`h${i}Text`).innerHTML =  `${ordinalDisplay(data.hierachies.ords[i].type, data.hierachies.ords[i].ord, data.hierachies.ords[i].over, data.hierachies.ords[i].base, 3, false)} (${data.hierachies.ords[i].base})`
        DOM(`h${i}Info`).innerText = `(+${format(hierarchyData[i].gain())}/s), ${hierarchyData[i].text}`
        DOM(`h${i}Effect`).innerText = `${format(hierarchyData[i].effect())}`
    }
    if (data.hierachies.hasUpgrade[0]) DOM("hup0").innerHTML = `${hupData[0].text}<br>${displayHierarchyOrd(hupData[0].cost, 0, data.hierachies.ords[0].base, 3)} FGH<br><font color='#424242'><b>Currently: ${hupData[0].effect()}x</b></font>`
    if (data.hierachies.hasUpgrade[3]) DOM("hup3").innerHTML = `${hupData[3].text}<br>${displayHierarchyOrd(hupData[3].cost, 0, data.hierachies.ords[1].base, 3)} SGH<br><font color='#424242'><b>Currently: ${hupData[3].effect()}x</b></font>`
}
function updateHBBuyableHTML(i){
    const el = DOM(`hb${i}`)
    const cost = i < 3 ? 'FGH' : 'SGH'
    const ord = i < 3 ? 0 : 1


    el.innerHTML = i == 2 || i==5 ? `${hbData[i].text} (${formatWhole(data.hierachies.rebuyableAmt[i])})<br>${format(hbData[i].cost())} Incrementy<br>Currently: ${format(hbData[i].effect())}x`
    : `${hbData[i].text} (${formatWhole(data.hierachies.rebuyableAmt[i])})<br>${displayHierarchyOrd(hbData[i].cost(), 0, data.hierachies.ords[ord].base, 3)} ${cost}<br>Currently: ${format(hbData[i].effect())}x`
}
function updateHUPHTML(i){
    const el = DOM(`hup${i}`)
    const cost = i < 3 ? 'FGH' : 'SGH'
    const ord = i < 3 ? 0 : 1


    el.innerHTML = `${hupData[i].text}<br>${displayHierarchyOrd(hupData[i].cost, 0, data.hierachies.ords[ord].base, 3)} ${cost}<br><font color='#424242'><b>Bought!</b></font>`
}

function initHierarchies(){
    // Buyables
    let columns = [DOM('h0Buyables'), DOM('h1Buyables')]
    let total = 0
    for (let i = 0; i < columns.length; i++) {
        let cost = i == 0 ? 'FGH' : 'SGH'
        for (let n = 0; n < 3; n++) {
            let hb = document.createElement('button')
            hb.className = `hb${i}`
            hb.id = `hb${total}`

            hb.innerHTML = n < 2 ? `${hbData[total].text} (${formatWhole(data.hierachies.rebuyableAmt[total])})<br>${displayHierarchyOrd(hbData[total].cost(), 0, data.hierachies.ords[i].base)} ${cost}<br>Currently: ${format(hbData[total].effect())}x`
            : `${hbData[total].text} (${formatWhole(data.hierachies.rebuyableAmt[total])})<br>${format(hbData[total].cost())} Incrementy<br>Currently: ${format(hbData[total].effect())}x`
            
            columns[i].append(hb)
            ++total
        }
    }

    // Upgrades
    let columns2 = [DOM('h0Upgrades'), DOM('h1Upgrades')]
    let total2 = 0
    for (let i = 0; i < columns.length; i++) {
        let cost = i == 0 ? 'FGH' : 'SGH'
        for (let n = 0; n < 3; n++) {
            let hup = document.createElement('button')
            hup.className = ' hup'
            hup.id = `hup${total2}`

            data.hierachies.hasUpgrade[total2] ? hup.innerHTML = `${hupData[total2].text}<br>${displayHierarchyOrd(hupData[total2].cost, 0, data.hierachies.ords[i].base)} ${cost}<br><font color='#424242'><b>Bought!</b></font>`
            : hup.innerHTML = `${hupData[total2].text}<br>${displayHierarchyOrd(hupData[total2].cost, 0, data.hierachies.ords[i].base)} ${cost}`
            
            columns2[i].append(hup)
            ++total2
        }
    }

    for (let i = 0; i < data.hierachies.rebuyableAmt.length; i++) {
        DOM(`hb${i}`).addEventListener('click', ()=>buyHBuyable(i))
        DOM(`hup${i}`).addEventListener('click', ()=>buyHUP(i))
    }
}


let hierarchyData = [
    { text:"Multiplying Incrementy Gain by", effect: ()=> Math.max((Math.log10(data.hierachies.ords[0].ord+1)*hbData[1].effect())**Math.sqrt(1+dupData[2].effect()), 1), 
        gain: ()=> hierarchyGainBases[0]()*hierarchyGainGlobalMults() },
    { text:"Dividing Charge Requirement by", effect: ()=> Math.max((Math.log10(data.hierachies.ords[1].ord+1)*hbData[4].effect()*alephEffect(5))**Math.sqrt(1+dupData[2].effect()), 1), 
        gain: ()=> hierarchyGainBases[1]()*hierarchyGainGlobalMults() }
]
let hierarchyGainBases = [
    () => Math.max(Math.floor(Math.pow(data.incrementy.amt, 1/3)), 1), 
    () => Math.max(Math.floor(Math.pow(t2Auto()+1, 1/4)), 1)
]
let hierarchyGainGlobalMults = () => hupData[2].effect()*hupData[5].effect()*hbData[0].effect()*hbData[3].effect()*getOverflowEffect(3)

let hbData = [
    { text:"Boost FGH and SGH gain based on Challenge Completions", cost: ()=> getHBBuyableCost(0), effect: ()=> Math.max(1, Math.sqrt(data.chal.totalCompletions+1)*data.hierachies.rebuyableAmt[0]) },
    { text:"Boost FGH effect based on Challenge Completions", cost: ()=> getHBBuyableCost(1), effect: ()=> Math.max(1, Math.log10(data.chal.totalCompletions+1)*data.hierachies.rebuyableAmt[1]) },
    { text:"Boost Incrementy Upgrade 3\'s effect based on FGH", cost: ()=> getHBBuyableCost(2), effect: ()=> Math.max(1, Math.pow(data.hierachies.ords[0].ord+1, 1/16)*data.hierachies.rebuyableAmt[2]) },
    { text:"Boost FGH and SGH gain based on Total Boosters", cost: ()=> getHBBuyableCost(3), effect: ()=> Math.max(1, Math.sqrt((data.boost.total+1)/20)*data.hierachies.rebuyableAmt[3]) },
    { text:"Boost SGH effect based on Challenge Completions", cost: ()=> getHBBuyableCost(4), effect: ()=> Math.max(1, Math.log10(data.chal.totalCompletions+1)*data.hierachies.rebuyableAmt[4]) },
    { text:"Boost Incrementy Upgrade 3\'s effect based on SGH", cost: ()=> getHBBuyableCost(5), effect: ()=> Math.max(1, Math.pow(data.hierachies.ords[1].ord+1, 1/16)*data.hierachies.rebuyableAmt[5]) }
]
let hupData = [
    // Effcects of 1 mean that it is a true/false effect.
    { text:"The Challenge Boost is Improved", cost: 1e10, effect: ()=> data.hierachies.hasUpgrade[0] ? 2 : 1 },
    { text:"Incrementy Upgrade 6 is Improved", cost: 1e20, effect: ()=> 1 },
    { text:"Booster Upgrade 1x4 boosts Hierarchy Successors", cost: 1e30, effect: ()=> data.hierachies.hasUpgrade[2] ? bup3Effect()**2 : 1 },
    { text:"Total Charge Boosts AutoBuyers", cost: 1e10, effect: ()=> data.hierachies.hasUpgrade[3] ? data.incrementy.totalCharge/2 : 1 },
    { text:"Incrementy Upgrade 2 is Improved", cost: 1e20, effect: ()=> 1 },
    { text:"Booster Upgrade 2x4 boosts Hierarchy Successors", cost: 1e30, effect: ()=> data.hierachies.hasUpgrade[5] ? bup7Effect()**3 : 1 },
]

function increaseHierarchies(diff){
    for (let i = 0; i < data.hierachies.ords.length; i++) {
        let n = hierarchyData[i].gain()*diff/1000
        // Successor
        if (data.hierachies.ords[i].ord % data.hierachies.ords[i].base === data.hierachies.ords[i].base - 1) data.hierachies.ords[i].over+=n
        else data.hierachies.ords[i].ord+=n
        
        //Maximize
        if (data.hierachies.ords[i].ord % data.hierachies.ords[i].base === data.hierachies.ords[i].base - 1 && data.hierachies.ords[i].over >= 1) {
            while(data.hierachies.ords[i].over + data.hierachies.ords[i].base >= data.hierachies.ords[i].base * 2 && data.hierachies.ords[i].ord % data.hierachies.ords[i].base ** 2 !== 0){
                data.hierachies.ords[i].over -= Math.ceil((data.hierachies.ords[i].over + data.hierachies.ords[i].base) / 2 - 0.1)
                data.hierachies.ords[i].ord += data.hierachies.ords[i].base
            }
    
            if (data.hierachies.ords[i].ord % data.hierachies.ords[i].base ** 2 !== 0) data.hierachies.ords[i].ord += data.hierachies.ords[i].over
            data.hierachies.ords[i].over = 0
        }
    }
}

function getHBBuyableCost(i){
    if(i == 2 || i==5) return 1e12*(data.hierachies.rebuyableAmt[i]+1*10**(1+data.hierachies.rebuyableAmt[i]))
    if(i < 3) return (data.hierachies.rebuyableAmt[i]+1*10**(1+data.hierachies.rebuyableAmt[i]))
    return (data.hierachies.rebuyableAmt[i]+1*10**(1+data.hierachies.rebuyableAmt[i]))
}

function buyHBuyable(i){
    const cost = hbData[i].cost()

    if(data.incrementy.amt > cost && (i == 2 || i == 5)){
        data.incrementy.amt -= cost
        ++data.hierachies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
    if(data.hierachies.ords[0].ord > cost && i < 3){
        data.hierachies.ords[0].ord -= cost
        ++data.hierachies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
    if(data.hierachies.ords[1].ord > cost && i > 2){
        data.hierachies.ords[1].ord -= cost
        ++data.hierachies.rebuyableAmt[i]
        updateHBBuyableHTML(i)
    }
}

function buyHUP(i){
    if(data.hierachies.hasUpgrade[i]) return
    const cost = hupData[i].cost

    if(data.hierachies.ords[0].ord > cost && i < 2){
        data.hierachies.ords[0].ord -= cost
        data.hierachies.hasUpgrade[i] = true
        updateHUPHTML(i)
    }
    else if(data.hierachies.ords[1].ord > cost && i > 2 && i < 5){
        data.hierachies.ords[1].ord -= cost
        data.hierachies.hasUpgrade[i] = true
        updateHUPHTML(i)
    }
}