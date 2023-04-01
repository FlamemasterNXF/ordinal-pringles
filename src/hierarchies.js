function updateHierarchiesHTML(){
    for (let i = 0; i < data.hierachies.ords.length; i++) {
        DOM(`h${i}Text`).innerHTML =  `${ordinalDisplay(data.hierachies.ords[i].type, data.hierachies.ords[i].ord, data.hierachies.ords[i].over, data.hierachies.ords[i].base, 3, false)} (${data.hierachies.ords[i].base})`
        DOM(`h${i}Info`).innerText = `(+${hierarchyData[i].gain()}/s), ${hierarchyData[i].text}`
        DOM(`h${i}Effect`).innerText = `${format(hierarchyData[i].effect())}`
    }
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
    //for (let i = 0; i < data.incrementy.hasIUP.length; i++) {
    //    let r = i < 3 ? true : false
    //    DOM(`iup${i}`).addEventListener('click', ()=>buyIUP(i, r))
    //    DOM(`iup${i}`).style.color = data.incrementy.hasIUP[i]?'#f542a4':'#8080FF'
    //}

    // Upgrades
    let columns2 = [DOM('h0Upgrades'), DOM('h1Upgrades')]
    let total2 = 0
    for (let i = 0; i < columns.length; i++) {
        let cost = i == 0 ? 'FGH' : 'SGH'
        for (let n = 0; n < 3; n++) {
            let hup = document.createElement('button')
            hup.className = ' hup'
            hup.id = `hup${total}`
            hup.innerHTML = `${hupData[total2].text}<br>${displayHierarchyOrd(hupData[total2].cost, 0, data.hierachies.ords[i].base)} ${cost}`
            columns2[i].append(hup)
            ++total2
        }
    }
}


let hierarchyData = [
    { text:"Dividing Charge Requirement by", effect: ()=> Math.max(Math.log10(data.hierachies.ords[0].ord+1), 1), 
        gain: ()=> Math.max(Math.floor(Math.sqrt(t2Auto())), 1)*hupData[2].effect()*hupData[5].effect() },
    { text:"Multiplying Incrementy Gain by", effect: ()=> Math.max(Math.log10(data.hierachies.ords[1].ord+1), 1), 
        gain: ()=> Math.max(Math.floor(Math.log10(t2Auto()+1)), 1)*hupData[2].effect()*hupData[5].effect() }
]

let hbData = [
    { text:"Boost FGH and SGH gain based on Challenge Completions", cost: ()=> 10, effect: ()=> 1 },
    { text:"Boost FGH effect based on Challenge Completions", cost: ()=> 10, effect: ()=> 1 },
    { text:"Boost Incrementy Upgrade 3\'s effect based on FGH", cost: ()=> 10, effect: ()=> 1 },
    { text:"Boost FGH and SGH gain based on Total Boosters", cost: ()=> 10, effect: ()=> 1 },
    { text:"Boost SGH effect based on Challenge Completions", cost: ()=> 10, effect: ()=> 1 },
    { text:"Boost Incrementy Upgrade 3\'s effect based on SGH", cost: ()=> 10, effect: ()=> 1 }
]
let hupData = [
    // Effcects of 1 mean that it is a true/false effect.
    { text:"The Challenge Boost is Improved", cost: 10, effect: ()=> data.hierachies.hasUpgrade[0] ? 5 : 1 },
    { text:"Incrementy Upgrade 6 is Improved", cost: 10, effect: ()=> 1 },
    { text:"Booster Upgrade 1x4 boosts Hierarchies while Supercharged", cost: 10, effect: ()=> data.hierachies.hasUpgrade[2] ? bup3Effect() : 1 },
    { text:"Total Charge Boosts AutoBuyers", cost: 10, effect: ()=> data.hierachies.hasUpgrade[3] ? data.incrementy.totalCharge : 1 },
    { text:"Incrementy Upgrade 2 is Improved", cost: 10, effect: ()=> 1 },
    { text:"Booster Upgrade 2x4 boosts Hierarchies while Supercharged", cost: 10, effect: ()=> data.hierachies.hasUpgrade[5] ? bup7Effect() : 1 },
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

function buyHBuyable(i){
    if(data.incrementy){}
}