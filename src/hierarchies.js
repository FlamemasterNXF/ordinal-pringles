function updateHierarchiesHTML(){
    for (let i = 0; i < data.hierachies.ords.length; i++) {
        DOM(`h${i}Text`).innerHTML =  `${ordinalDisplay(data.hierachies.ords[i].type, data.hierachies.ords[i].ord, data.hierachies.ords[i].over, data.hierachies.ords[i].base)} (${data.ord.base})`
        DOM(`h${i}Info`).innerText = `(+${hierarchyGains()[i]}/s)`
    }
    DOM('hierarchyInfo').innerText = `Both Hierarchies are Maximized instantly. Their Successor gains are based on AutoBuyer speed.`
}

let hierarchyGains = () => [ Math.max(Math.floor(Math.sqrt(t2Auto())), 1), Math.max(Math.floor(Math.log10(t2Auto()+1)), 1) ]

function increaseHierarchies(diff){
    for (let i = 0; i < data.hierachies.ords.length; i++) {
        let n = hierarchyGains()[i]*diff/1000
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